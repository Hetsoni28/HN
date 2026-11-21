import { NextResponse } from 'next/server';

interface CommitItem {
  repo: string;
  message: string;
  date: string;
  url?: string;
}

const FALLBACK_COMMITS: CommitItem[] = [
  {
    repo: 'HN',
    message: 'feat: optimize Next.js 16 build performance and asset caching',
    date: '2026-10-04T18:30:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
  {
    repo: 'HN',
    message: 'fix: harden Sanity studio configuration and sitemap routes',
    date: '2026-10-04T14:15:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
  {
    repo: 'HN',
    message: 'perf: tune Core Web Vitals and image loading priorities',
    date: '2026-10-03T11:45:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
];

/**
 * One GitHub refresh = 4 API calls (repos + 3 commit lists). Unauthenticated GitHub allows 60 calls/hour,
 * so refresh at most every 10 minutes (~24 calls/hour). A failed refresh is retried after 1 minute.
 */
const TTL_MS = 10 * 60 * 1000;
const FAILURE_TTL_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 6000;

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
  'Content-Type': 'application/json',
};

// Module-level cache: shared by requests served by the same server instance.
let cached: { commits: CommitItem[]; expires: number } | null = null;

async function githubJson(url: string, headers: Record<string, string>) {
  // cache: 'no-store' — this route does its own caching, and Next's fetch cache would retry failures
  // in the background, outside the try/catch below, and log them.
  const res = await fetch(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`);
  return res.json();
}

async function loadCommits(): Promise<CommitItem[]> {
  const headers: Record<string, string> = {
    'User-Agent': 'HN-Digital-Studio/1.0',
    Accept: 'application/vnd.github+json',
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = 'Bearer ' + token;

  // 1. The 3 repositories most recently pushed to
  const reposData = await githubJson(
    'https://api.github.com/users/Hetsoni28/repos?sort=pushed&direction=desc&per_page=3',
    headers,
  );
  const activeRepos: string[] = Array.isArray(reposData) ? reposData.map((r: { name: string }) => r.name) : ['HN'];

  // 2. Latest commits from each, fetched in parallel; one failing repo doesn't sink the rest
  const results = await Promise.allSettled(
    activeRepos.map((repo) => githubJson(`https://api.github.com/repos/Hetsoni28/${repo}/commits?per_page=5`, headers)),
  );

  const allCommits: CommitItem[] = [];
  results.forEach((result, i) => {
    if (result.status !== 'fulfilled' || !Array.isArray(result.value)) return;
    const repo = activeRepos[i];
    for (const item of result.value) {
      if (item?.commit?.message && item?.commit?.author?.date) {
        allCommits.push({
          repo,
          message: item.commit.message.split('\n')[0] || 'Update repository',
          date: item.commit.author.date,
          url: typeof item.html_url === 'string' ? item.html_url : `https://github.com/Hetsoni28/${repo}`,
        });
      }
    }
  });

  // 3. One timeline, newest first
  allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return allCommits.slice(0, 6);
}

export async function GET() {
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.commits, { status: 200, headers: CACHE_HEADERS });
  }

  try {
    const commits = await loadCommits();
    if (commits.length === 0) throw new Error('No commits returned');
    cached = { commits, expires: Date.now() + TTL_MS };
    return NextResponse.json(commits, { status: 200, headers: CACHE_HEADERS });
  } catch (err) {
    // Keep serving the last good result if we have one; otherwise the curated fallback.
    const commits = cached?.commits ?? FALLBACK_COMMITS;
    cached = { commits, expires: Date.now() + FAILURE_TTL_MS };
    console.warn('[api/github] using cached/fallback commits:', err instanceof Error ? err.message : err);
    return NextResponse.json(commits, { status: 200, headers: CACHE_HEADERS });
  }
}
