import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FlipWords } from '@/components/ui/flip-words';
import { FollowerPointerCard } from '@/components/ui/following-pointer';

/* ── Scroll-driven parallax helpers ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroNew() {
  const motifRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const parallaxCardRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(18);

  const flipWords = ["Maths", "Coding", "Music", "Science", "English", "Chess"];

  /* ── Scroll-driven perspective tilt + extras ── */
  useEffect(() => {
    let rafId: number;
    let targetRotation = 18;
    let targetScale = 0.88;
    let targetOpacity = 0.5;
    let targetY = 40;

    let currentScale = 0.88;
    let currentOpacity = 0.5;
    let currentY = 40;

    const onScroll = () => {
      const progress = Math.min(window.scrollY / 650, 1);
      targetRotation = lerp(18, 0, progress);
      targetScale = lerp(0.88, 1, progress);
      targetOpacity = lerp(0.5, 1, progress);
      targetY = lerp(40, 0, progress);
    };

    const animate = () => {
      rotationRef.current = lerp(rotationRef.current, targetRotation, 0.07);
      currentScale = lerp(currentScale, targetScale, 0.07);
      currentOpacity = lerp(currentOpacity, targetOpacity, 0.07);
      currentY = lerp(currentY, targetY, 0.07);

      if (parallaxCardRef.current) {
        parallaxCardRef.current.style.transform =
          `perspective(1200px) rotateX(${rotationRef.current.toFixed(3)}deg) scale(${currentScale.toFixed(4)}) translateY(${currentY.toFixed(2)}px)`;
        parallaxCardRef.current.style.opacity = currentOpacity.toFixed(3);
        const shadowBlur = lerp(20, 80, 1 - rotationRef.current / 18);
        const shadowSpread = lerp(-10, -20, 1 - rotationRef.current / 18);
        parallaxCardRef.current.style.boxShadow =
          `0 ${shadowBlur.toFixed(0)}px ${(shadowBlur * 1.6).toFixed(0)}px ${shadowSpread.toFixed(0)}px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(motifRef.current, { opacity: 0, scale: 0.5, y: 10, duration: 1, delay: 0.2 })
      .from(badgeRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from(headingRef.current, { opacity: 0, y: 30, duration: 1 }, '-=0.5')
      .from(subheadingRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from(ctaRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.7 }, '-=0.4');
  }, []);

  return (
    <section className="relative flex flex-col pt-28 md:pt-40 pb-24 overflow-visible">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 opacity-30 md:opacity-40 blur-[80px] md:blur-[100px] w-[300px] md:w-[600px] h-[200px] md:h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #A5BBFC 0%, #D5E2FF 40%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="flex flex-1 justify-center items-center mx-auto pb-[6vh] w-[85%] md:w-9/12 max-w-width-mx overflow-visible">
        <div className="relative flex flex-col items-center">
          <div className="z-10 relative flex flex-col items-center gap-5 md:gap-8">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="flex items-center gap-2.5 border border-gray-200 bg-white shadow-sm rounded-full px-4 py-2"
            >
              <div className="flex items-center justify-center bg-orange-500 text-white rounded w-4 h-4 text-[10px] font-bold">✦</div>
              <p className="font-matter font-medium text-gray-500 text-xs tracking-wide" style={{ whiteSpace: 'nowrap' }}>
                India's <span style={{ color: '#111', fontWeight: 600 }}>#1</span> One-on-One Learning Platform
              </p>
            </div>

            {/* Heading */}
            <div className="relative flex flex-col items-center gap-4 mt-6">
              <h1
                ref={headingRef}
                className="relative z-10 font-season-mix text-5xl md:text-6xl lg:text-[72px] text-center leading-[1.15] tracking-tight text-[#111]"
              >
                <span className="block">Learn<FlipWords words={flipWords} duration={2500} /></span>
                <span className="block">1 <span className="text-[#F97316]">on</span> 1 With the Right Tutor.</span>
              </h1>
              <p
                ref={subheadingRef}
                className="relative z-10 max-w-3xl font-matter text-lg md:text-xl text-center leading-relaxed text-gray-500 mt-2"
              >
                Personalised global learning platform for every age, every skill.
              </p>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-row gap-4 mt-8 mb-6 items-center justify-center">
              <a href="/find-tutor" aria-label="Find Your Tutor">
                <button className="inline-flex items-center justify-center cursor-pointer font-matter font-medium rounded-full px-6 py-3 text-base bg-[#131313] text-white transition-opacity duration-200 hover:opacity-75 active:scale-95">
                  Find Your Tutor
                </button>
              </a>
              <a href="/become-a-tutor" aria-label="Become a Tutor">
                <button className="inline-flex items-center justify-center cursor-pointer font-matter font-medium rounded-full px-6 py-3 text-base bg-[#f0f0f0] text-black border border-black transition-opacity duration-200 hover:opacity-75 active:scale-95">
                  Become a Tutor
                </button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex items-center">
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', backgroundColor: '#4F88D9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 600, position: 'relative', zIndex: 4, marginRight: -8 }}>A</div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', backgroundColor: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 600, position: 'relative', zIndex: 3, marginRight: -8 }}>R</div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', backgroundColor: '#0A2156', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 600, position: 'relative', zIndex: 2, marginRight: -8 }}>Z</div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid white', backgroundColor: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 600, position: 'relative', zIndex: 1 }}>A</div>
              </div>
              <p className="font-matter text-sm text-gray-500 font-medium tracking-wide">Loved by <span className="font-semibold text-gray-700">30,000+</span> students worldwide</p>
            </div>

          </div>
        </div>
      </div>

      {/* ═══ PARALLAX SCREENSHOT CARD ═══ */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 'clamp(20px, 5vw, 80px)',
          perspective: '1200px',
          perspectiveOrigin: '50% 0%',
        }}
      >
        <div style={{ width: '90%', maxWidth: '820px' }}>
          <FollowerPointerCard title="Homeguru Student Dashboard">
            <div
              ref={parallaxCardRef}
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '16px',
                border: '4px solid rgb(79,79,79)',
                overflow: 'hidden',
                boxShadow:
                  '0 40px 80px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
                background: '#fff',
                transform: 'perspective(1200px) rotateX(18deg)',
                transformOrigin: '50% 0%',
                willChange: 'transform',
              }}
            >
              <img
                src="/stud-dash-new.png"
                alt="Homeguru Student Dashboard"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          </FollowerPointerCard>
        </div>
      </div>


      <style>{`
        @keyframes livePing {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
