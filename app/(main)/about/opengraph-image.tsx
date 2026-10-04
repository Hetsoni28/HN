import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function OgCard({ accent, title, subtitle, tags }: { accent: string; title: string; subtitle: string; tags: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ height: '8px', background: accent, width: '100%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
          <div style={{ background: accent, borderRadius: '10px', padding: '8px 18px', fontSize: '16px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>HN Tech</div>
          <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>hntech.in</span>
        </div>
        <div style={{ fontSize: title.length > 30 ? '54px' : '68px', fontWeight: 900, color: '#0F172A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '900px' }}>{title}</div>
        <div style={{ fontSize: '22px', color: '#64748B', lineHeight: 1.5, maxWidth: '800px' }}>{subtitle}</div>
      </div>
      <div style={{ borderTop: '1px solid #E2E8F0', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
        <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>hntech.in</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {tags.map((tag) => (
            <div key={tag} style={{ background: `${accent}20`, border: `1px solid ${accent}40`, borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, color: accent }}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OgImage() {
  return new ImageResponse(
    <OgCard accent="#0051FF" title="About HN Tech" subtitle="A premium technology company building enterprise-grade websites, web apps, SaaS platforms, and AI solutions." tags={['Our Story', 'Team', 'Values']} />,
    { ...size }
  );
}
