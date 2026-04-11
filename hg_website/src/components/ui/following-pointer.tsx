"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const updateRect = () => {
      if (ref.current) setRect(ref.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none", overflow: "visible" }}
      className={`relative ${className ?? ""}`}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
}) => (
  <motion.div
    className="absolute z-50"
    style={{ top: y, left: x, pointerEvents: "none" }}
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* cursor arrow pointing top-left */}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <path d="M3 2L17 9L10 11L7 18L3 2Z" fill="#F97316" stroke="#c2410c" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
    {/* label to the right of cursor */}
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        backgroundColor: "#F97316",
        color: "#000",
        whiteSpace: 'nowrap',
      }}
      className="rounded-full px-2 py-1 text-xs font-matter"
    >
      {title || "Homeguru"}
    </motion.div>
  </motion.div>
);
