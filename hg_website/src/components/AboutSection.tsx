import { ArrowUpRight } from '@phosphor-icons/react';

const stats = [
    { value: "10K+", label: "Verified Tutors" },
    { value: "50+", label: "Subjects Covered" },
    { value: "30K+", label: "Students Taught" },
    { value: "4.9★", label: "Average Rating" },
];

export default function AboutSection() {
    return (
        <section className="relative w-full flex flex-col gap-16" id="about">

            {/* Top split: headline left, body right */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                <div className="flex flex-col gap-5 flex-1">
                    <span className="font-matter text-[11px] font-semibold tracking-[4px] uppercase text-gray-400">
                        About <span style={{ color: '#312E81' }}>Home</span><span style={{ color: '#F97316' }}>Guru</span>
                    </span>
                    <h2 className="font-season-mix text-4xl md:text-[54px] text-black leading-[1.05] tracking-tight">
                        Not just tutoring.<br />
                        <span style={{ color: '#F97316' }}>Personalised</span> learning.
                    </h2>
                </div>
                <div className="flex flex-col gap-6 flex-1 md:pt-14">
                    <p className="font-matter text-[#555] text-lg md:text-xl leading-[1.8]">
                        HomeGuru connects students with the world's best tutors — for any subject, any level, any goal. Built for serious learners who want real results.
                    </p>
                    <a href="/about-us" className="inline-flex items-center gap-2 font-matter font-semibold text-black text-sm group w-fit">
                        <span className="border-b border-black pb-0.5 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors duration-200">Know more about us</span>
                        <ArrowUpRight size={16} className="group-hover:text-orange-500 transition-colors duration-200" />
                    </a>
                </div>
            </div>

            {/* Stats row — responsive grid */}
            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:divide-x md:divide-gray-100 gap-4 md:gap-0">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1 md:px-10 md:first:pl-0">
                        <span className="font-season-mix text-[28px] text-black leading-none tracking-tight">{s.value}</span>
                        <span className="font-matter text-xs text-gray-400 leading-snug">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Pillars — stack on mobile, row on md+ */}
            <div className="flex flex-col md:flex-row gap-4 w-full">

                {/* Card 1 */}
                <div className="relative flex flex-col justify-between p-8 rounded-[28px] overflow-hidden flex-1" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', minHeight: '300px' }}>
                    <span className="absolute top-4 right-5 font-season-mix leading-none select-none pointer-events-none" style={{ fontSize: '100px', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>01</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-season-mix text-[24px] leading-[1.2] text-black">Revolutionary Platform</h3>
                        <p className="font-matter text-sm leading-relaxed text-gray-500">A cutting-edge Ed-tech platform engineered for every kind of learner.</p>
                        <span className="font-matter text-xs font-semibold text-gray-400 mt-1">#1 in India</span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative flex flex-col justify-between p-8 rounded-[28px] overflow-hidden flex-1" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', minHeight: '300px' }}>
                    <span className="absolute top-4 right-5 font-season-mix leading-none select-none pointer-events-none" style={{ fontSize: '100px', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>02</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-season-mix text-[24px] leading-[1.2] text-black">Personalized Learning</h3>
                        <p className="font-matter text-sm leading-relaxed text-gray-500">Tailored 1-on-1 sessions where ambition meets the right guidance, every time.</p>
                        <span className="font-matter text-xs font-semibold text-gray-400 mt-1">Always 1 on 1</span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative flex flex-col justify-between p-8 rounded-[28px] overflow-hidden flex-1" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', minHeight: '300px' }}>
                    <span className="absolute top-4 right-5 font-season-mix leading-none select-none pointer-events-none" style={{ fontSize: '100px', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>03</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-season-mix text-[24px] leading-[1.2] text-black">Passionate Educators</h3>
                        <p className="font-matter text-sm leading-relaxed text-gray-500">10,000+ background-verified tutors committed to helping you reach your goals.</p>
                        <span className="font-season-mix text-[32px] leading-none text-black mt-1">10K+</span>
                    </div>
                </div>

            </div>

        </section>
    );
}
