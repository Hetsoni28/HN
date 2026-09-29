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

    interface GitHubPushPayload {
      ref?: string;
      commits?: Array<{ message: string; sha: string }>;
      size?: number;
    }

    const pushEvents = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 6)
      .map((e) => {
        const payload = e.payload as GitHubPushPayload;
        const commits = payload.commits ?? [];

        // Find first commit with a real non-empty message
        const firstRealMsg = commits.find(
          (c) => c.message && c.message.trim().length > 0
        )?.message?.split('\n')[0] ?? '';

        // Build a meaningful fallback using branch name + commit count
        const branch = payload.ref?.replace('refs/heads/', '') ?? 'main';
        const count = payload.size ?? commits.length;
        const fallback =
          count > 0
            ? `Pushed ${count} commit${count !== 1 ? 's' : ''} to ${branch}`
            : `Pushed to ${branch}`;

        return {
          repo: e.repo.name,
          message: firstRealMsg || fallback,
          date: e.created_at,
        };
      });

    return NextResponse.json(pushEvents);
  } catch (err) {
    console.error('[/api/github] fetch failed:', err);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity' },
      { status: 500 },
    );
  }
}
