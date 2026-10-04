import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ height: '8px', background: '#059669', width: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
            <div style={{ background: '#059669', borderRadius: '10px', padding: '8px 18px', fontSize: '16px', fontWeight: 900, color: 'white' }}>HN Tech</div>
            <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Maintenance Plans</span>
          </div>
          <div style={{ fontSize: '64px', fontWeight: 900, color: '#0F172A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px' }}>Your Product Deserves Expert Aftercare.</div>
          <div style={{ fontSize: '22px', color: '#64748B', lineHeight: 1.5, maxWidth: '800px' }}>Monthly plans keeping your website fast, secure, and always up-to-date. Month-to-month, no lock-in.</div>
        </div>
        <div style={{ borderTop: '1px solid #E2E8F0', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F0FDF4' }}>
          <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 600 }}>hntech.in/maintenance</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['From ₹8,000/mo', '99.9% uptime', '48h response'].map((tag) => (
              <div key={tag} style={{ background: '#05996920', border: '1px solid #05996940', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, color: '#059669' }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
