export default function FinalCTA() {
  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        borderRadius: '32px',
        background: '#FAFAFA',
        border: '1px solid #EBEBEB',
      }}
    >
      {/* Soft light mesh gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.08) 25%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.10) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern overlay */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <defs>
          <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      <div className="relative flex flex-col items-center justify-center gap-7 px-8 py-20 md:py-28 text-center z-10">
        {/* Eyebrow */}
        <span
          className="font-matter text-[11px] font-semibold uppercase tracking-[3px] px-4 py-1.5 rounded-full"
          style={{ color: '#F97316', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)' }}
        >
          Start Today
        </span>

        <h2
          className="font-season-mix text-[32px] md:text-[52px] leading-[1.1] tracking-tight max-w-xl text-[#111]"
        >
          Ready to find your perfect Guru?
        </h2>
        <p
          className="font-matter text-base md:text-lg max-w-md leading-relaxed text-[#666]"
        >
          Join 30,000+ students learning 1-on-1 with verified tutors across every subject.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a href="/find-tutor">
            <button
              className="inline-flex items-center justify-center gap-2 font-matter font-semibold rounded-full px-8 py-4 text-base text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: '#F97316' }}
            >
              Find Your Tutor
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8H13.5M13.5 8L8 2.5M13.5 8L8 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </a>
          <a href="/become-a-tutor">
            <button
              className="inline-flex items-center justify-center font-matter font-semibold rounded-full px-8 py-4 text-base transition-all duration-200 active:scale-95"
              style={{ color: '#111', border: '1px solid #E5E7EB', background: '#fff' }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid #D1D5DB';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid #E5E7EB';
              }}
            >
              Become a Tutor
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
