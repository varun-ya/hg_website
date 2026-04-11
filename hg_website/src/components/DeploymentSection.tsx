export default function DeploymentSection() {
  const features = [
    {
      title: "HomeGuru Cloud",
      description: "Fully managed, automatic scaling, fastest time-to-value",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19c.703 0 1.332-.236 1.832-.633C20.44 17.58 21 16.36 21 15c0-2.21-1.79-4-4-4h-1.45V9.5c0-3.037-2.463-5.5-5.5-5.5S4.55 6.463 4.55 9.5c0 .248.016.492.048.732C3.06 10.46 2 11.603 2 13c0 1.657 1.343 3 3 3h.5" />
          <path d="M12 13v8" />
          <path d="m9 18 3 3 3-3" />
        </svg>
      )
    },
    {
      title: "Private Cloud (VPC)",
      description: "Your security perimeter, our management",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: "On-Premises",
      description: "Full control, air-gapped for regulated industries",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="3" y="2" rx="2" ry="2" />
          <path d="M7 22h10" />
          <path d="M12 18v4" />
          <path d="M12 14v.01" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center gap-12">
      <h2 className="font-season-mix text-3xl md:text-[36px] text-center leading-[135%] text-tx">
        Built to run<br />anywhere your business runs
      </h2>

      <div className="gap-4 lg:gap-6 grid grid-cols-1 lg:grid-cols-3 w-full">
        {features.map((feature, j) => (
          <div key={j} className="flex flex-row items-center gap-5 bg-white p-6 border border-st-secondary rounded-[26px] w-full overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group">
            <div className="flex justify-center items-center backdrop-blur-sm bg-sr-indigo-50/50 rounded-2xl w-[80px] h-[80px] text-sr-indigo-600 transition-colors group-hover:bg-sr-indigo-100/50 shrink-0">
              {feature.icon}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <h3 className="font-matter font-medium text-tx text-[18px] leading-[1.3]">
                {feature.title}
              </h3>
              <p className="font-matter text-tx-secondary text-[15px] leading-snug">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
