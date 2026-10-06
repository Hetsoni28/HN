import { NextResponse } from 'next/server';

export const revalidate = 60;

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

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
  'Content-Type': 'application/json',
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();

  const headers: Record<string, string> = {
    'User-Agent': 'HN-Digital-Studio/1.0',
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    // 1. Dynamically fetch the 3 repositories you most recently pushed to
    const reposRes = await fetch(
      'https://api.github.com/users/Hetsoni28/repos?sort=pushed&direction=desc&per_page=3',
      { headers, signal: controller.signal, next: { revalidate: 60 } }
    );

    if (!reposRes.ok) throw new Error('Failed to fetch repos');
    
    const reposData = await reposRes.json();
    const activeRepos = Array.isArray(reposData) ? reposData.map((r: any) => r.name) : ['HN'];

    // 2. Fetch the latest commits from those dynamic repositories
    const allCommits: CommitItem[] = [];

    for (const repo of activeRepos) {
      const res = await fetch(
        'https://api.github.com/repos/Hetsoni28/' + repo + '/commits?per_page=5',
        { headers, signal: controller.signal, next: { revalidate: 60 } }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item?.commit?.message && item?.commit?.author?.date) {
              allCommits.push({
                repo: repo,
                message: item.commit.message.split('\n')[0] || 'Update repository',
                date: item.commit.author.date,
                url: typeof item.html_url === 'string' ? item.html_url : 'https://github.com/Hetsoni28/' + repo,
              });
            }
          }
        }
      }
    }

    clearTimeout(timeoutId);

    // 3. Sort all commits by date descending to get a unified timeline
    allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const finalCommits = allCommits.slice(0, 6);

    if (finalCommits.length === 0) {
      return NextResponse.json(FALLBACK_COMMITS, { status: 200, headers: CACHE_HEADERS });
    }

    return NextResponse.json(finalCommits, { status: 200, headers: CACHE_HEADERS });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    return NextResponse.json(FALLBACK_COMMITS, { status: 200, headers: CACHE_HEADERS });
  }
}
