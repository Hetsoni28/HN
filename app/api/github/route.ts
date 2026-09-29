import { NextResponse } from 'next/server';

// Cache for 1 hour — Next.js 15 GET handlers are dynamic by default,
// so we explicitly opt into revalidation-based caching.
export const revalidate = 3600;

interface GitHubPushEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
  };
  created_at: string;
}

export async function GET() {
  try {
    const res = await fetch(
      'https://api.github.com/users/Hetsoni28/events?per_page=10',
      {
        headers: {
          'User-Agent': 'HN-Studio-Portfolio/1.0',
          Accept: 'application/vnd.github+json',
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}` },
        { status: res.status },
      );
    }

    const events: GitHubPushEvent[] = await res.json();

    const pushEvents = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 6)
      .map((e) => ({
        repo: e.repo.name,
        message: e.payload.commits?.[0]?.message ?? '(no commit message)',
        date: e.created_at,
      }));

    return NextResponse.json(pushEvents);
  } catch (err) {
    console.error('[/api/github] fetch failed:', err);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity' },
      { status: 500 },
    );
  }
}
