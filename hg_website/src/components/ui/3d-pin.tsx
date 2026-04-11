"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg) scale(1)");

  return (
    <a
      className={`relative group/pin z-50 cursor-pointer ${containerClassName ?? ""}`}
      onMouseEnter={() => setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)")}
      onMouseLeave={() => setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)")}
      href={href || "/"}
    >
      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0deg)" }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-lg bg-white border border-gray-200 group-hover/pin:border-gray-300 transition duration-700 overflow-hidden"
        >
          <div className={`relative z-50 ${className ?? ""}`}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
};

export const PinPerspective = ({ title, href }: { title?: string; href?: string }) => (
  <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
    <div className="w-full h-full -mt-7 flex-none inset-0">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <a
          href={href}
          target="_blank"
          className="relative flex space-x-2 items-center z-10 rounded-full py-0.5 px-4 ring-1 ring-black/10"
          style={{ background: '#131313' }}
        >
          <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5 font-matter">
            {title}
          </span>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-400/0 via-orange-400/90 to-orange-400/0 transition-opacity duration-500" />
        </a>
      </div>

      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0)" }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        {[0, 2, 4].map((delay) => (
          <motion.div
            key={delay}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay }}
            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%]"
            style={{ background: 'rgba(249,115,22,0.06)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          />
        ))}
      </div>

      <>
        <motion.div className="absolute right-1/2 bottom-1/2 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" style={{ background: 'linear-gradient(to bottom, transparent, #F97316)' }} />
        <motion.div className="absolute right-1/2 bottom-1/2 translate-y-[14px] w-px h-20 group-hover/pin:h-40" style={{ background: 'linear-gradient(to bottom, transparent, #F97316)' }} />
        <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" style={{ background: '#F97316' }} />
        <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" style={{ background: '#fed7aa' }} />
      </>
    </div>
  </motion.div>
);
