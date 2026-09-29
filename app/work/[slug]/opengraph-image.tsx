import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/content';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_COLORS: Record<string, string> = {
  'AI / SaaS':      '#7C3AED',
  'Web App':        '#0051FF',
  'Mobile App':     '#059669',
  'E-Commerce':     '#DC2626',
  'SaaS':           '#0070F3',
  'Mobile':         '#059669',
  'default':        '#0051FF',
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title ?? 'Case Study';
  const description = project?.shortDescription ?? 'A digital product built by HN Studio';
  const category = project?.category ?? '';
  const accent = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['default'];
  const tech = project?.technology?.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent bar */}
        <div style={{ height: '8px', background: accent, width: '100%' }} />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px', flex: 1 }}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'auto' }}>
            {/* Category badge */}
            {category && (
              <div
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                  borderRadius: '100px',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </div>
            )}
            {/* HN badge */}
            <div
              style={{
                background: accent,
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 900,
                color: 'white',
              }}
            >
              HN Studio
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 30 ? '56px' : '68px',
              fontWeight: 900,
              color: '#0F172A',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '22px',
              color: '#64748B',
              lineHeight: 1.5,
              maxWidth: '850px',
              marginBottom: '40px',
            }}
          >
            {description.length > 140 ? description.slice(0, 140) + '…' : description}
          </div>

          {/* Tech stack pills */}
          {tech.length > 0 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {tech.map((t: string) => (
                <div
                  key={t}
                  style={{
                    background: '#F1F5F9',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #E2E8F0',
            padding: '20px 64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
          }}
        >
          <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>
            hn.studio/work/{slug}
          </span>
          <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>
            Case Study
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
