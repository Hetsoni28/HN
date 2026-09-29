import { NextResponse } from 'next/server';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // Fetch directly from the repo commits endpoint — always includes full commit messages
    const res = await fetch(
      'https://api.github.com/repos/Hetsoni28/HN/commits?per_page=6',
      {
        headers: {
          'User-Agent': 'HN-Portfolio/1.0',
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

    const commits = await res.json();

    const result = commits.map((c: {
      commit: { message: string; author: { date: string } };
      html_url: string;
    }) => ({
      repo: 'HN',
      message: c.commit.message.split('\n')[0], // First line only
      date: c.commit.author.date,
      url: c.html_url,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error('[/api/github] fetch failed:', err);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity' },
      { status: 500 },
    );
  }
}
