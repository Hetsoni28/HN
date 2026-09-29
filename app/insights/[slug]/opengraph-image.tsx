import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/content';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_COLORS: Record<string, string> = {
  'AI':                  '#7C3AED',
  'Web Development':     '#0051FF',
  'SaaS':                '#059669',
  'Product Development': '#EA580C',
  'Technology':          '#0891B2',
  'HN Updates':          '#0051FF',
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? 'Insight';
  const excerpt = post?.excerpt ?? 'A practical article from HN Studio';
  const category = post?.category ?? '';
  const author = post?.author?.name ?? 'HN Studio';
  const readTime = post?.readTime;
  const publishedAt = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  const accent = CATEGORY_COLORS[category] ?? '#0051FF';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0F172A',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Accent gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${accent}, #00D2FF)`,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 64px', flex: 1 }}>
          {/* Category + HN */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'auto' }}>
            {category ? (
              <div
                style={{
                  background: `${accent}20`,
                  border: `1px solid ${accent}40`,
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </div>
            ) : (
              <div />
            )}
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              HN Insights
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? '48px' : '60px',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              maxWidth: '950px',
            }}
          >
            {title}
          </div>

          {/* Excerpt */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
              maxWidth: '860px',
            }}
          >
            {excerpt.length > 130 ? excerpt.slice(0, 130) + '…' : excerpt}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: accent,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 900,
                color: 'white',
              }}
            >
              {author.split(' ').map((n) => n[0]).join('')}
            </div>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {author}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {readTime && (
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>
                {readTime} min read
              </span>
            )}
            {publishedAt && (
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>
                {publishedAt}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
