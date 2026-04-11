"use client";
import { useState, useRef, useCallback } from "react";
import { Timeline } from "@/components/ui/timeline";

const f = 'Matter, sans-serif';

// ── Step 1 Visual — animated registration journey ─────────────────────────
const step1Items = [
  'Create your profile',
  'Set learning goals',
  'Pick your subjects',
  'Choose schedule',
];

function Step1Visual() {
  const [reveal, setReveal] = useState(-1); // -1=idle, 0..3=loading idx, 4=done
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = useCallback(() => {
    if (reveal !== -1) return;
    setReveal(0);
    step1Items.forEach((_, idx) => {
      timers.current.push(setTimeout(() => setReveal(idx + 1), (idx + 1) * 800));
    });
  }, [reveal]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setReveal(-1);
  }, []);

  const progress = reveal === -1 ? 0 : Math.min(reveal, step1Items.length);
  const pct = Math.round((progress / step1Items.length) * 100);

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={reset}
      style={{
        position: 'relative', width: '100%', height: '260px',
        borderRadius: '20px', background: '#FAFAFA', overflow: 'hidden',
        marginTop: '8px', cursor: 'pointer', border: '1px solid #F0F0F0',
      }}
    >
      {/* Grid bg with circle reveal */}
      <div className="sv1-grid" style={{ position: 'absolute', inset: 0, opacity: reveal >= 0 ? 1 : 0 }} />

      {/* Gradient fade at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, #FAFAFA)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Card */}
      <div
        className={reveal >= 0 ? 'sv1-card-in' : ''}
        style={{
          position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
          width: '230px', borderRadius: '16px', background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07)',
          border: '1px solid #EBEBEB', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 3,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: '#111' }}>Your Setup</span>
          <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#aaa', letterSpacing: '0.06em' }}>HOVER ME</span>
        </div>

        {/* Journey items */}
        {step1Items.map((item, idx) => {
          const isLoading = reveal === idx;
          const isDone = reveal > idx;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 28 }}>
              {isLoading ? (
                <div className="sv1-spinner" />
              ) : isDone ? (
                <div className="sv1-check-pop" style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#111', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              ) : (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#F5F5F5',
                  border: '1.5px solid #E5E7EB', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#ccc' }}>0{idx + 1}</span>
                </div>
              )}
              {isDone ? (
                <span className="sv1-text-reveal" style={{ fontFamily: f, fontSize: 12, color: '#333', fontWeight: 500 }}>{item}</span>
              ) : (
                <span style={{ fontFamily: f, fontSize: 12, color: isLoading ? '#bbb' : '#E5E7EB', fontWeight: 400 }}>
                  {isLoading ? item : '—————'}
                </span>
              )}
              {isDone && (
                <div style={{ marginLeft: 'auto', fontSize: 8, fontFamily: f, padding: '2px 7px', borderRadius: 6, background: '#F5F5F5', color: '#888', fontWeight: 600 }}>✓</div>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: f, fontSize: 9, color: '#aaa', fontWeight: 500 }}>Profile Setup</span>
            <span style={{ fontFamily: f, fontSize: 9, color: '#111', fontWeight: 600 }}>{pct}%</span>
          </div>
          <div style={{ width: '100%', height: 3, borderRadius: 2, background: '#F0F0F0' }}>
            <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: '#111', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div style={{
        position: 'absolute', top: 14, right: 16,
        padding: '5px 10px', borderRadius: 10, background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 5, zIndex: 3,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: reveal >= step1Items.length ? '#22C55E' : '#E5E7EB', transition: 'background 0.3s' }} />
        <span style={{ fontFamily: f, fontSize: 9, color: '#888', fontWeight: 500 }}>{reveal >= step1Items.length ? 'Complete!' : '60s signup'}</span>
      </div>

      <style>{`
        .sv1-grid {
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
          animation: sv1GridReveal 1.8s cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: none;
        }
        @keyframes sv1GridReveal {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(150% at 50% 50%); }
        }
        .sv1-card-in {
          animation: sv1SlideUp 0.5s cubic-bezier(0.2,0.9,0.4,1.1) both;
        }
        @keyframes sv1SlideUp {
          0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .sv1-spinner {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          border: 2.5px solid #E5E7EB; border-top-color: #111;
          animation: sv1Spin 0.65s linear infinite;
        }
        @keyframes sv1Spin { to { transform: rotate(360deg); } }
        .sv1-check-pop {
          animation: sv1Pop 0.3s cubic-bezier(0.2,0.9,0.4,1.1) both;
        }
        @keyframes sv1Pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .sv1-text-reveal {
          animation: sv1TextIn 0.35s cubic-bezier(0.2,0.9,0.4,1.1) both;
        }
        @keyframes sv1TextIn {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ── Step 2 Visual — animated tutor matching ───────────────────────────────
const step2Items = [
  'Scanning tutor profiles',
  'Matching your preferences',
  'Ranking by reviews',
];
const step2Tutors = [
  { name: 'Maths Guru', stars: 4 },
  { name: 'Science Pro', stars: 3 },
  { name: 'Code Expert', stars: 3 },
];

function Step2Visual() {
  const [reveal, setReveal] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = useCallback(() => {
    if (reveal !== -1) return;
    setReveal(0);
    step2Items.forEach((_, idx) => {
      timers.current.push(setTimeout(() => setReveal(idx + 1), (idx + 1) * 800));
    });
    // After search steps done, reveal tutors one by one (idx 4,5,6)
    step2Tutors.forEach((_, idx) => {
      timers.current.push(setTimeout(() => setReveal(step2Items.length + idx + 1), (step2Items.length + idx + 1) * 600));
    });
  }, [reveal]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setReveal(-1);
  }, []);

  const searchDone = reveal >= step2Items.length;
  const tutorsRevealed = searchDone ? reveal - step2Items.length : 0;

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={reset}
      style={{
        position: 'relative', width: '100%', height: '260px',
        borderRadius: '20px', background: '#FAFAFA', overflow: 'hidden',
        marginTop: '8px', cursor: 'pointer', border: '1px solid #F0F0F0',
      }}
    >
      {/* Grid bg */}
      <div className="sv1-grid" style={{ position: 'absolute', inset: 0, opacity: reveal >= 0 ? 1 : 0 }} />

      {/* Constellation SVG */}
      <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <line x1="90" y1="60" x2="250" y2="110" stroke="#E5E7EB" strokeWidth="0.7" strokeDasharray="4 3" />
        <line x1="250" y1="110" x2="410" y2="55" stroke="#E5E7EB" strokeWidth="0.7" strokeDasharray="4 3" />
        <line x1="250" y1="110" x2="180" y2="180" stroke="#EBEBEB" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="250" y1="110" x2="340" y2="185" stroke="#EBEBEB" strokeWidth="0.5" strokeDasharray="3 3" />
        <circle cx="90" cy="60" r="3" fill="#D1D5DB" />
        <circle cx="410" cy="55" r="2.5" fill="#D1D5DB" />
        <circle cx="180" cy="180" r="2" fill="#E5E7EB" />
        <circle cx="340" cy="185" r="2" fill="#E5E7EB" />
        <circle cx="45" cy="30" r="1" fill="#E5E7EB" />
        <circle cx="460" cy="140" r="1.2" fill="#EBEBEB" />
        <circle cx="150" cy="30" r="1" fill="#E5E7EB" />
        <circle cx="370" cy="170" r="1" fill="#EBEBEB" />
        <g transform="translate(55,150)" opacity="0.15">
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#999" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#999" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g transform="translate(450,35)" opacity="0.18">
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#aaa" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#aaa" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>

      {/* Gradient fade at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, #FAFAFA)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Card */}
      <div
        className={reveal >= 0 ? 'sv1-card-in' : ''}
        style={{
          position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
          width: '230px', borderRadius: '16px', background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07)',
          border: '1px solid #EBEBEB', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 3,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: '#111' }}>Find Your Guru</span>
          <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#aaa', letterSpacing: '0.06em' }}>HOVER ME</span>
        </div>

        {/* Search steps (phase 1) */}
        {!searchDone && step2Items.map((item, idx) => {
          const isLoading = reveal === idx;
          const isDone = reveal > idx;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 28 }}>
              {isLoading ? (
                <div className="sv1-spinner" />
              ) : isDone ? (
                <div className="sv1-check-pop" style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#111', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              ) : (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#F5F5F5',
                  border: '1.5px solid #E5E7EB', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#ccc' }}>0{idx + 1}</span>
                </div>
              )}
              {isDone ? (
                <span className="sv1-text-reveal" style={{ fontFamily: f, fontSize: 12, color: '#333', fontWeight: 500 }}>{item}</span>
              ) : (
                <span style={{ fontFamily: f, fontSize: 12, color: isLoading ? '#bbb' : '#E5E7EB', fontWeight: 400 }}>
                  {isLoading ? item : '—————'}
                </span>
              )}
              {isDone && (
                <div style={{ marginLeft: 'auto', fontSize: 8, fontFamily: f, padding: '2px 7px', borderRadius: 6, background: '#F5F5F5', color: '#888', fontWeight: 600 }}>✓</div>
              )}
            </div>
          );
        })}

        {/* Tutor results (phase 2) */}
        {searchDone && step2Tutors.map((tutor, i) => {
          if (i >= tutorsRevealed) return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 28, opacity: 0.3 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F0F0F0', flexShrink: 0 }} />
              <div style={{ width: 80, height: 4, borderRadius: 2, background: '#F0F0F0' }} />
            </div>
          );
          return (
            <div key={i} className="sv1-text-reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 28 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: '#111', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: i === 0 ? 1 : 0.5,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: f, fontSize: 10, color: i === 0 ? '#111' : '#bbb', fontWeight: 500 }}>{tutor.name}</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[0,1,2,3,4].map(s => (
                    <div key={s} style={{ width: 5, height: 5, borderRadius: '50%', background: s < tutor.stars ? '#111' : '#E5E7EB' }} />
                  ))}
                </div>
              </div>
              {i === 0 && (
                <div style={{ fontSize: 8, fontFamily: f, padding: '2px 7px', borderRadius: 6, background: '#F5F5F5', color: '#888', fontWeight: 600 }}>Best Match</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating badge */}
      <div style={{
        position: 'absolute', top: 14, right: 16,
        padding: '5px 10px', borderRadius: 10, background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 5, zIndex: 3,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: searchDone && tutorsRevealed >= step2Tutors.length ? '#22C55E' : '#E5E7EB', transition: 'background 0.3s' }} />
        <span style={{ fontFamily: f, fontSize: 9, color: '#888', fontWeight: 500 }}>{searchDone && tutorsRevealed >= step2Tutors.length ? 'Matched!' : 'AI Match'}</span>
      </div>
    </div>
  );
}

// ── Step 3 Visual — animated session launch ───────────────────────────────
const step3Items = [
  'Confirming your Guru',
  'Processing payment',
  'Setting up classroom',
  'Connecting session',
];

function Step3Visual() {
  const [reveal, setReveal] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = useCallback(() => {
    if (reveal !== -1) return;
    setReveal(0);
    step3Items.forEach((_, idx) => {
      timers.current.push(setTimeout(() => setReveal(idx + 1), (idx + 1) * 800));
    });
  }, [reveal]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setReveal(-1);
  }, []);

  const allDone = reveal >= step3Items.length;
  const progress = reveal === -1 ? 0 : Math.min(reveal, step3Items.length);
  const pct = Math.round((progress / step3Items.length) * 100);

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={reset}
      style={{
        position: 'relative', width: '100%', height: '260px',
        borderRadius: '20px', background: '#FAFAFA', overflow: 'hidden',
        marginTop: '8px', cursor: 'pointer', border: '1px solid #F0F0F0',
      }}
    >
      {/* Grid bg */}
      <div className="sv1-grid" style={{ position: 'absolute', inset: 0, opacity: reveal >= 0 ? 1 : 0 }} />

      {/* Wave lines SVG */}
      <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <path d="M0 140 Q60 110 120 130 T240 120 T360 135 T500 115" fill="none" stroke="#E5E7EB" strokeWidth="0.7" />
        <path d="M0 160 Q80 135 160 150 T320 140 T500 150" fill="none" stroke="#EBEBEB" strokeWidth="0.6" />
        <path d="M0 185 Q100 165 200 178 T400 168 T500 180" fill="none" stroke="#F0F0F0" strokeWidth="0.8" />
        <circle cx="40" cy="30" r="1.2" fill="#D1D5DB" />
        <circle cx="130" cy="45" r="1" fill="#E5E7EB" />
        <circle cx="420" cy="35" r="1.5" fill="#D1D5DB" />
        <circle cx="470" cy="160" r="1" fill="#EBEBEB" />
        <circle cx="350" cy="20" r="1" fill="#E5E7EB" />
        <g transform="translate(460,50)" opacity="0.18">
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#999" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#999" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        <g transform="translate(35,80)" opacity="0.12">
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#aaa" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#aaa" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      </svg>

      {/* Gradient fade at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to bottom, transparent, #FAFAFA)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Card */}
      <div
        className={reveal >= 0 ? 'sv1-card-in' : ''}
        style={{
          position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
          width: '230px', borderRadius: '16px', background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07)',
          border: '1px solid #EBEBEB', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 3,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontFamily: f, fontSize: 12, fontWeight: 600, color: '#111' }}>Start Session</span>
          <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#aaa', letterSpacing: '0.06em' }}>HOVER ME</span>
        </div>

        {/* Journey items */}
        {step3Items.map((item, idx) => {
          const isLoading = reveal === idx;
          const isDone = reveal > idx;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 28 }}>
              {isLoading ? (
                <div className="sv1-spinner" />
              ) : isDone ? (
                <div className="sv1-check-pop" style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#111', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              ) : (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#F5F5F5',
                  border: '1.5px solid #E5E7EB', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: f, fontSize: 9, fontWeight: 600, color: '#ccc' }}>0{idx + 1}</span>
                </div>
              )}
              {isDone ? (
                <span className="sv1-text-reveal" style={{ fontFamily: f, fontSize: 12, color: '#333', fontWeight: 500 }}>{item}</span>
              ) : (
                <span style={{ fontFamily: f, fontSize: 12, color: isLoading ? '#bbb' : '#E5E7EB', fontWeight: 400 }}>
                  {isLoading ? item : '—————'}
                </span>
              )}
              {isDone && (
                <div style={{ marginLeft: 'auto', fontSize: 8, fontFamily: f, padding: '2px 7px', borderRadius: 6, background: '#F5F5F5', color: '#888', fontWeight: 600 }}>✓</div>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: f, fontSize: 9, color: '#aaa', fontWeight: 500 }}>Session Setup</span>
            <span style={{ fontFamily: f, fontSize: 9, color: '#111', fontWeight: 600 }}>{pct}%</span>
          </div>
          <div style={{ width: '100%', height: 3, borderRadius: 2, background: '#F0F0F0' }}>
            <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: '#111', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div style={{
        position: 'absolute', top: 14, right: 16,
        padding: '5px 10px', borderRadius: 10, background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 5, zIndex: 3,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: allDone ? '#22C55E' : '#E5E7EB', transition: 'background 0.3s' }} />
        <span style={{ fontFamily: f, fontSize: 9, color: '#888', fontWeight: 500 }}>{allDone ? 'Live!' : '1:1 Live'}</span>
      </div>
    </div>
  );
}

// ── Mini-feature card ──────────────────────────────────────────────────────
function MiniCard({ icon, label, desc }: { icon: React.ReactNode; label: string; desc: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '16px 20px',
        background: '#fff',
        border: '1px solid #F0F0F0',
        borderRadius: '16px',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <span style={{ flexShrink: 0, marginTop: '2px', color: '#6B7280' }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="font-matter" style={{ fontWeight: 600, fontSize: '14px', color: '#111', lineHeight: 1.3 }}>{label}</span>
        <span className="font-matter" style={{ fontSize: '12.5px', color: '#9CA3AF', lineHeight: 1.5 }}>{desc}</span>
      </div>
    </div>
  );
}

// ── Inline Icons ───────────────────────────────────────────────────────────
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

// ── Timeline steps ─────────────────────────────────────────────────────────
const steps = [
  {
    title: "Step 1",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
        <h3 className="font-season-mix text-2xl md:text-3xl text-[#121212]">Register & Set Your Goals</h3>
        <p className="font-matter text-[#6d6d6d] text-sm md:text-base leading-relaxed max-w-lg">
          Sign up in under 60 seconds. Tell us what you want to learn, your level, and when you're free — we handle the rest.
        </p>
        <Step1Visual />
        <div className="hg-mini-grid" style={{ display: 'grid', gap: '8px', marginTop: '4px' }}>
          <MiniCard icon={<IconZap />} label="60-Second Signup" desc="Quick onboarding with zero friction." />
          <MiniCard icon={<IconTarget />} label="Learning Goals" desc="Set subjects, level, and target exams." />
        </div>
      </div>
    ),
  },
  {
    title: "Step 2",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
        <h3 className="font-season-mix text-2xl md:text-3xl text-[#121212]">Browse, Match & Try a Free Demo</h3>
        <p className="font-matter text-[#6d6d6d] text-sm md:text-base leading-relaxed max-w-lg">
          Browse rated profiles or let our AI find your ideal Guru. Schedule a free demo to make sure it's the right fit.
        </p>
        <Step2Visual />
        <div className="hg-mini-grid" style={{ display: 'grid', gap: '8px', marginTop: '4px' }}>
          <MiniCard icon={<IconStar />} label="AI Matchmaking" desc="Smart algorithm considers style, rating & reviews." />
          <MiniCard icon={<IconCalendar />} label="Free Demo Class" desc="Try before you buy — no payment required." />
        </div>
      </div>
    ),
  },
  {
    title: "Step 3",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
        <h3 className="font-season-mix text-2xl md:text-3xl text-[#121212]">Confirm & Start Learning</h3>
        <p className="font-matter text-[#6d6d6d] text-sm md:text-base leading-relaxed max-w-lg">
          Lock in your Guru, make a secure payment, and start regular 1-on-1 classes at your own pace.
        </p>
        <Step3Visual />
        <div className="hg-mini-grid" style={{ display: 'grid', gap: '8px', marginTop: '4px' }}>
          <MiniCard icon={<IconShield />} label="Secure Payments" desc="SSL-encrypted with refund guarantee." />
          <MiniCard icon={<IconBook />} label="Regular 1:1 Classes" desc="Weekly sessions tailored to your pace." />
        </div>
      </div>
    ),
  },
];

export default function StackLayersNew() {
  return (
    <div className="w-full relative">
      <div className="flex flex-col items-center gap-4 mb-4">
        <p className="font-matter font-medium text-xs text-center uppercase tracking-[2px] text-gray-400">
          Your Learning Journey
        </p>
        <h2 className="font-season-mix text-3xl md:text-[42px] leading-[1.2] text-center text-[#121212]">
          Everything you need to succeed
        </h2>
        <p className="font-matter text-center text-gray-400 text-base max-w-md mt-1">
          Three simple steps from sign-up to your first personalised class.
        </p>
      </div>
      <Timeline data={steps} />

      <style>{`
        .hg-mini-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .hg-mini-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
