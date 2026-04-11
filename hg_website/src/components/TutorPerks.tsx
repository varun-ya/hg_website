"use client";

const perks = [
  { stat: '₹999', label: 'One-Time Registration', desc: 'One flat fee. No hidden charges, no recurring costs.' },
  { stat: 'Weekly', label: 'Payments Without Delay', desc: 'Receive tuition fees every week directly to your account.' },
  { stat: '100%', label: 'Scheduling Flexibility', desc: 'Confirm or deny class requests entirely on your terms.' },
  { stat: '1:1', label: 'Private Online Tuition', desc: 'Fully private sessions — just you and your student.' },
];

export default function TutorPerks() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', width: '100%' }} className="xl-grid-two">

      {/* Left: gradient panel */}
      <div
        style={{
          position: 'relative',
          background: '#FAFAFA',
          border: '1px solid #e8e8e8',
          borderRadius: '32px',
          padding: '48px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '40px',
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        {/* Gradient layers — same as FinalCTA */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 15% 100%, rgba(249,115,12,0.28) 0%, rgba(255,163,54,0.18) 30%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 75% at 85% 100%, rgba(203,219,255,0.55) 0%, rgba(200,215,255,0.3) 30%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(240,213,186,0.4) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Top: badge + headline + sub */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              width: 'fit-content',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'rgba(249,115,22,0.12)',
              color: '#F97316',
              border: '1px solid rgba(249,115,22,0.25)',
              fontFamily: 'Matter, sans-serif',
            }}
          >
            ✦ For Tutors
          </span>

          <h2
            style={{
              fontFamily: "'Season Mix', sans-serif",
              fontSize: 'clamp(36px, 4vw, 52px)',
              color: '#111',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Teach on<br />your terms.
          </h2>

          <p
            style={{
              fontFamily: 'Matter, sans-serif',
              color: '#666',
              fontSize: '16px',
              lineHeight: 1.65,
              maxWidth: '340px',
              margin: 0,
            }}
          >
            Join 200,000+ educators earning weekly on HomeGuru. Set your own schedule, rates, and pace.
          </p>
        </div>

        {/* Bottom: CTA */}
        <a href="#apply" style={{ width: 'fit-content', position: 'relative' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Matter, sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '9999px',
              background: '#111',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            Apply to Teach
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </a>
      </div>

      {/* Right: 2×2 stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {perks.map((p, i) => (
          <div
            key={i}
            style={{
              background: '#F8F8F8',
              border: '1px solid #EBEBEB',
              borderRadius: '24px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
              minHeight: '180px',
              transition: 'box-shadow 0.25s, transform 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.07)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F97316' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span
                style={{
                  fontFamily: "'Season Mix', sans-serif",
                  fontSize: 'clamp(28px, 3vw, 36px)',
                  color: '#111',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {p.stat}
              </span>
              <span style={{ fontFamily: 'Matter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#111', lineHeight: 1.3 }}>
                {p.label}
              </span>
              <span style={{ fontFamily: 'Matter, sans-serif', fontSize: '12px', color: '#999', lineHeight: 1.6 }}>
                {p.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .xl-grid-two { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
