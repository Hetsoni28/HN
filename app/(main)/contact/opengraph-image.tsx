import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0B111E', fontFamily: 'system-ui, sans-serif' }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '64px', flex: 1, position: 'relative' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
            <div style={{ background: '#0051FF', borderRadius: '10px', padding: '8px 18px', fontSize: '16px', fontWeight: 900, color: 'white' }}>HN Tech</div>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>hntech.in</span>
          </div>
          {/* Headline */}
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            {"Let's build something"}
            <br />
            <span style={{ color: '#0051FF' }}>great together.</span>
          </div>
          <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, maxWidth: '700px' }}>
            Fill in the form and we&apos;ll get back to you within 24–48 hours with a clear plan.
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>hntech.in/contact</span>
          <span style={{ fontSize: '16px', color: '#0051FF', fontWeight: 700 }}>24h response guaranteed</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
