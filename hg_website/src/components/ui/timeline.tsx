"use client";
import { motion, useMotionValue, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(() => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = rect.top - windowH * 0.9;
      const end = rect.bottom - windowH * 0.5;
      scrollProgress.set(Math.min(1, Math.max(0, -start / (end - start))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heightTransform = useTransform(scrollProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div ref={ref} style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', paddingBottom: '5rem' }}>
        {data.map((item, index) => (
          <div key={index} className="hg-tl-row">
            {/* Left: dot + label */}
            <div className="hg-tl-label">
              <div style={{ position: 'absolute', left: 0, width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: ['#F9730C','#F0D5BA','#312E81'][index] }} />
              </div>
              <h3 style={{ paddingLeft: '3.5rem', fontSize: 'clamp(1.25rem, 3vw, 2.5rem)', fontWeight: 700, color: '#d1d5db', fontFamily: 'Season Mix, sans-serif' }}>
                {item.title}
              </h3>
            </div>
            {/* Right: content */}
            <div style={{ flex: 1, paddingBottom: '2.5rem' }}>
              {item.content}
            </div>
          </div>
        ))}

        {/* Track line */}
        <div style={{
          position: 'absolute',
          left: '1.25rem', // Center of the 2.5rem dot
          transform: 'translateX(-50%)', // perfect center
          top: 0,
          width: '2px',
          height: height + 'px',
          background: 'linear-gradient(to bottom, transparent 0%, #e5e7eb 10%, #e5e7eb 90%, transparent 99%)',
          overflow: 'hidden',
        }}>
          <motion.div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '2px',
            borderRadius: '9999px',
            height: heightTransform,
            opacity: opacityTransform,
            background: 'linear-gradient(to bottom, #F9730C, #FFA336, #F0D5BA, #CBDBFF, transparent)',
          }} />
        </div>
      </div>

      <style>{`
        .hg-tl-row {
          display: flex;
          justify-content: flex-start;
          padding-top: 3rem;
          gap: 1.5rem;
        }
        .hg-tl-label {
          position: sticky;
          top: 6rem;
          align-self: flex-start;
          display: flex;
          align-items: center;
          z-index: 40;
          min-width: 80px;
          max-width: 120px;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .hg-tl-row {
            padding-top: 5rem;
            gap: 2.5rem;
          }
          .hg-tl-label {
            top: 10rem;
            min-width: 120px;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};
