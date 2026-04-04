export default function SecuritySection() {
  return (
    <section id="become-tutor" className="w-full rounded-[32px] overflow-hidden" style={{ border: '1px solid #0a0a0a' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '500px' }}>
      {/* Left: image */}
      <div style={{ overflow: 'hidden', minHeight: '300px' }}>
        <img
          src="/tutor.png"
          alt="Become a Guru"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Right: content */}
      <div style={{ backgroundColor: '#F3CD83', padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
        <h2 style={{ fontFamily: 'Season Mix, sans-serif', fontWeight: 400, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1', color: '#0a0a0a', margin: 0 }}>
          Become a<br />Guru
        </h2>
        <p style={{ fontFamily: 'Season Mix, sans-serif', fontWeight: 400, fontSize: '16px', color: '#0a0a0a', lineHeight: '1.6', margin: 0, maxWidth: '380px' }}>
          Earn money sharing your expert knowledge with students. Sign up to start tutoring online with HomeGuru.
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Get students directly', 'Flexible teaching hours', 'On-time payments', 'Global reach'].map((item) => (
            <li key={item} style={{ fontFamily: 'Season Mix, sans-serif', fontWeight: 400, fontSize: '16px', color: '#0a0a0a' }}>{item}</li>
          ))}
        </ul>
        <a href="/become-a-tutor" style={{ marginTop: '8px' }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', color: '#fff', fontFamily: 'Matter, sans-serif', fontWeight: 600, fontSize: '16px', padding: '18px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer', opacity: 1, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Become a Guru →
          </button>
        </a>
      </div>
    </div>
    </section>
  );
}
