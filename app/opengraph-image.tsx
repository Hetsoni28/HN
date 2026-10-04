import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0051FF',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: 'auto',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 900,
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            HN
          </div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.05em',
            }}
          >
            HN Tech
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Digital Products
            <br />
            From Ideas to Scale.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 400,
              maxWidth: '700px',
            }}
          >
            Websites · Web Apps · SaaS · Mobile · AI Solutions
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            hntech.in
          </span>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {['Het Soni', 'Neel Patel'].map((name) => (
              <div
                key={name}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 600,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
