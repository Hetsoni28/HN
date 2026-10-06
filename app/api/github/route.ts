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
    headers.Authorization = \Bearer \\;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    // Array of repositories to pull commits from
    const repos = ['HN']; // Add 'new-site' or others here if needed!
    const allCommits: CommitItem[] = [];

    for (const repo of repos) {
      const res = await fetch(
        \https://api.github.com/repos/Hetsoni28/\/commits?per_page=6\,
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
                url: typeof item.html_url === 'string' ? item.html_url : \https://github.com/Hetsoni28/\\,
              });
            }
          }
        }
      }
    }

    clearTimeout(timeoutId);

    // Sort by date descending
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
