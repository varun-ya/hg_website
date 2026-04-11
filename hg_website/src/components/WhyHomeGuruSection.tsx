"use client";
import { useRef } from "react";
import { Lightning, Brain, BookOpen } from "@phosphor-icons/react";

const features = [
  {
    icon: Lightning,
    label: "01",
    title: "Osmium AI Predictive Testing",
    titleJsx: <><span style={{ color: '#F97316' }}>Osmium AI</span> Predictive Testing</>,
    desc: "96B parameter LLM built for education — predicts exam patterns, generates adaptive micro-quizzes, and aligns practice with JEE, NEET, CLAT, and more.",
  },
  {
    icon: Brain,
    label: "02",
    title: "Real-time Doubt Resolution",
    desc: "Ask any question mid-session and get instant, contextual answers powered by AI — so learning never stops.",
  },
  {
    icon: BookOpen,
    label: "03",
    title: "Smart Revision Schedules",
    desc: "Explore 100+ subjects with AI-curated revision plans. From Vedic Math to Music — every session builds toward mastery.",
  },
];

const stats = [
  { value: "98%", label: "Recall rate" },
  { value: "3×", label: "Faster review" },
  { value: "24/7", label: "Available" },
];

export default function WhyHomeGuruSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12">

      {/* Section header */}
      <div className="flex flex-col items-center text-center gap-4 w-full max-w-2xl">
        <h2 className="font-season-mix text-4xl md:text-[52px] leading-[1.1] tracking-tight text-[#111]">
          Save <span style={{ color: '#F97316' }}>hours</span>,<br className="hidden sm:block" /> learn <span style={{ color: '#312E81' }}>smarter</span>.
        </h2>
        <p className="font-matter text-[#888] text-base md:text-lg leading-relaxed">
          From key takeaways to specific questions, we've got you covered.
        </p>
      </div>

      {/* ── Main Feature Card ── */}
      <div
        ref={cardRef}
        className="w-full overflow-hidden"
        style={{ borderRadius: '32px', border: '1px solid #E7E7E7', background: '#F6F6F6' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '520px' }}>

          {/* Left: content */}
          <div className="flex flex-col justify-between gap-8 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full text-xs font-semibold font-matter uppercase tracking-widest"
                style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316', border: '1px solid rgba(249,115,22,0.2)' }}>
                ✦ AI-Powered
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-season-mix text-[28px] md:text-[36px] text-[#111] leading-[1.15] tracking-tight">
                  Instant Session Insights
                </h3>
                <p className="font-matter text-[#666] text-base md:text-lg leading-relaxed max-w-md">
                  Automated recaps with key takeaways, focused review points, and timestamped navigation to jump directly to the most important parts of your lesson.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4 md:gap-0">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-1 pr-6 mr-6 md:pr-8 md:mr-8" style={{ borderRight: i < stats.length - 1 ? '1px solid #E0E0E0' : 'none' }}>
                    <span className="font-season-mix text-[28px] md:text-[38px] text-[#111] leading-none tracking-tight">{s.value}</span>
                    <span className="font-matter text-[11px] uppercase tracking-[2px] text-[#999]">{s.label}</span>
                  </div>
                ))}
              </div>


            </div>
          </div>

          {/* Right: image */}
          <div className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: '400px' }}>
            <img
              src="/videocall-new.png"
              alt="Live tutoring session"
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain', objectPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 3 Feature Cards ── */}
      <div className="hg-feature-grid" style={{ display: 'grid', gap: '16px', width: '100%' }}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="group flex flex-col gap-5 p-6 rounded-[24px] transition-all duration-300"
              style={{ background: '#F6F6F6', border: '1px solid #EBEBEB' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#F6F6F6';
              }}
            >
              {/* Icon + number */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
                  <Icon size={18} color="white" weight="bold" />
                </div>
                <span className="font-matter text-[11px] font-semibold text-[#CCC] tracking-widest">{f.label}</span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h4 className="font-season-mix text-[18px] text-[#111] leading-[1.3]">
                  {(f as any).titleJsx ?? f.title}
                </h4>
                <p className="font-matter text-[13px] text-[#888] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .hg-feature-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .hg-feature-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
