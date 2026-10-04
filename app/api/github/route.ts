import { NextResponse } from 'next/server';

export const revalidate = 3600;

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
  {
    repo: 'HN',
    message: 'feat: expand service schemas and case study documentation',
    date: '2026-10-02T16:20:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
  {
    repo: 'HN',
    message: 'refactor: streamline form pipelines and validation schemas',
    date: '2026-10-01T09:10:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
  {
    repo: 'HN',
    message: 'chore: configure strict TypeScript and security headers',
    date: '2026-09-29T12:00:00Z',
    url: 'https://github.com/Hetsoni28/HN/commits/main',
  },
];

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  'Content-Type': 'application/json',
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();

  const headers: Record<string, string> = {
    'User-Agent': 'HN-Digital-Studio/1.0',
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      'https://api.github.com/repos/Hetsoni28/HN/commits?per_page=6',
      {
        headers,
        signal: controller.signal,
        next: { revalidate: 3600 },
      },
    );

    clearTimeout(timeoutId);

    // Explicitly handle rate limiting (403, 429) or non-OK statuses gracefully
    if (res.status === 403 || res.status === 429 || !res.ok) {
      console.warn(
        `[/api/github] GitHub API responded with status ${res.status}. Serving resilient fallback commits.`,
      );
      return NextResponse.json(FALLBACK_COMMITS, {
        status: 200,
        headers: CACHE_HEADERS,
      });
    }

    const data = await res.json();

    // Validate that response is an array
    if (!Array.isArray(data)) {
      console.warn('[/api/github] Received non-array response from GitHub API. Serving fallback.');
      return NextResponse.json(FALLBACK_COMMITS, {
        status: 200,
        headers: CACHE_HEADERS,
      });
    }

    // Map and validate each commit item
    const commits: CommitItem[] = [];
    for (const item of data) {
      if (
        item &&
        typeof item === 'object' &&
        item.commit &&
        typeof item.commit.message === 'string' &&
        item.commit.author &&
        typeof item.commit.author.date === 'string'
      ) {
        commits.push({
          repo: 'HN',
          message: item.commit.message.split('\n')[0] || 'Update repository',
          date: item.commit.author.date,
          url: typeof item.html_url === 'string' ? item.html_url : 'https://github.com/Hetsoni28/HN',
        });
      }
    }

    if (commits.length === 0) {
      return NextResponse.json(FALLBACK_COMMITS, {
        status: 200,
        headers: CACHE_HEADERS,
      });
    }

    return NextResponse.json(commits, {
      status: 200,
      headers: CACHE_HEADERS,
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === 'AbortError';
    console.warn(
      `[/api/github] Request failed (${isAbort ? 'Timeout' : 'Network error'}). Serving fallback commits.`,
    );
    return NextResponse.json(FALLBACK_COMMITS, {
      status: 200,
      headers: CACHE_HEADERS,
    });
  }
}
