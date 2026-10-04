import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ height: '8px', background: '#7C3AED', width: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
            <div style={{ background: '#7C3AED', borderRadius: '10px', padding: '8px 18px', fontSize: '16px', fontWeight: 900, color: 'white' }}>HN Tech</div>
            <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>vs Freelancer vs Agency</span>
          </div>
          <div style={{ fontSize: '58px', fontWeight: 900, color: '#0F172A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px' }}>Stop Guessing. Pick the Right Partner.</div>
          <div style={{ fontSize: '22px', color: '#64748B', lineHeight: 1.5, maxWidth: '800px' }}>An unfiltered side-by-side comparison across quality, cost, timelines, and accountability.</div>
        </div>
        <div style={{ borderTop: '1px solid #E2E8F0', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC' }}>
          <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>hntech.in/compare</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['HN Tech', 'Freelancer', 'Big Agency'].map((tag) => (
              <div key={tag} style={{ background: '#7C3AED20', border: '1px solid #7C3AED40', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, color: '#7C3AED' }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
