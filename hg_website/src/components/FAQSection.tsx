"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "What subjects do you cover?",
    a: "We cover academics from grades 1–12 (CBSE, ICSE, State boards), competitive exams (JEE, NEET, IELTS), and non-academic subjects like Coding, Music, Dance, Art, Languages, and Yoga — all as 1-on-1 online sessions."
  },
  {
    q: "How are the tutors verified?",
    a: "Every tutor goes through identity verification, educational background checks, a qualification test, a teaching demo evaluation, and continuous performance monitoring before going live on the platform."
  },
  {
    q: "What is the pricing for sessions?",
    a: "Pricing varies by subject, level, and tutor experience — typically ranging from ₹500–2,000 per session. Each tutor sets their own rate, visible on their profile. We also offer flexible packages for long-term learning."
  },
  {
    q: "How can I become a tutor on HomeGuru?",
    a: "Sign up, complete your profile, upload ID verification, pass a qualification test, and pay a one-time ₹499 listing fee (valid for 365 days). Once approved, your profile goes live and you start receiving student inquiries."
  },
  {
    q: "When and how do tutors get paid?",
    a: "Payments for completed sessions are processed weekly. A platform commission may be deducted per session. All sessions and payments must be conducted through HomeGuru."
  },
  {
    q: "How can I contact HomeGuru?",
    a: "Call or WhatsApp us at 90019 90019, email support@homeguruworld.com, or visit www.homeguruworld.com. We're happy to help with anything."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="flex flex-col items-center gap-12 md:gap-16 w-full">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full items-start">
        {/* Left: heading */}
        <div className="flex flex-col gap-4 lg:w-2/5 lg:sticky lg:top-32">
          <div className="flex items-center gap-2 border border-gray-200 bg-white shadow-sm rounded-full px-3 py-1.5 w-fit">
            <div className="flex items-center justify-center rounded w-4 h-4 text-[10px] font-bold text-white" style={{ backgroundColor: '#F97316' }}>?</div>
            <span className="font-matter font-medium text-gray-500 text-xs tracking-wide">FAQs</span>
          </div>
          <h2 className="font-season-mix text-3xl md:text-[42px] leading-[1.2] text-tx">
            Frequently Asked<br /><span style={{ color: '#F97316' }}>Questions</span>
          </h2>
          <p className="font-matter text-[#6d6d6d] text-base md:text-lg leading-relaxed">
            Got questions? We've got answers. Browse through our most commonly asked questions or reach out to us directly.
          </p>
          <p className="font-matter text-[#6d6d6d] text-sm md:text-base mt-4">
            Still have questions?{" "}
            <a href="mailto:support@homeguruworld.com" className="underline underline-offset-2" style={{ color: '#F97316' }}>
              support@homeguruworld.com
            </a>
          </p>
        </div>

        {/* Right: questions */}
        <div className="flex-1 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="w-full rounded-[20px] border border-[#e7e7e7] bg-[#f6f6f6] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-season-mix font-normal text-[#121212] text-base md:text-lg pr-4">{faq.q}</span>
                <span className="text-xl flex-shrink-0 font-medium" style={{ color: '#121212' }}>{open === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-matter text-[#6d6d6d] text-sm md:text-base leading-relaxed px-6 pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
