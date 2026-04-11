export default function ResearchUpdatesSection() {
    const blogs = [
        {
            title: "Expanding to UAE",
            date: "March 15, 2025",
            category: "EXPANSION",
            link: "#",
            image: "https://assets.homeguruworld.com/tr:f-auto/images/03117ysv/production/a781d0105845e4e9b69bf336b842cc8964f38929-1008x630.png?w=400"
        },
        {
            title: "Now in United Kingdom",
            date: "March 10, 2025",
            category: "EXPANSION",
            link: "#",
            image: "https://assets.homeguruworld.com/tr:f-auto/images/03117ysv/production/fff4fe106a03242dec49bd27025e1b55a51de0b9-1800x1350.png?w=400"
        },
        {
            title: "Launching in United States",
            date: "March 5, 2025",
            category: "EXPANSION",
            link: "#",
            image: "https://assets.homeguruworld.com/tr:f-auto/images/03117ysv/production/42d675e333219227dd0a6872d6405088722eb6e1-2400x1800.png?w=400"
        }
    ];

    return (
        <section className="flex flex-col items-center gap-14 md:gap-20 py-20 w-full">
            {/* Section Heading */}
            <div className="flex flex-col items-center text-center gap-6 w-full">
                <h2 className="font-season-mix text-3xl md:text-[42px] text-tx leading-[1.2]">
                    Learning Has No Borders.
                </h2>
            </div>

            {/* Blogs Grid */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-[1440px] mx-auto px-6 justify-center items-stretch">
                {blogs.map((blog) => (
                    <div key={blog.link} className="flex-1 min-w-0">
                        <a
                            href={blog.link}
                            style={{ backgroundColor: '#ebebeb' }}
                            className="group flex flex-col h-full p-3 rounded-[36px] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden outline-none"
                        >
                            <div className="rounded-[26px] w-full aspect-[16/10] overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-3 px-5 py-5">
                                <span className="font-matter font-medium text-tx-tertiary text-xs uppercase tracking-wide">
                                    {blog.category}
                                </span>
                                <h3 className="font-matter font-medium text-tx text-xl md:text-2xl line-clamp-2 leading-snug">
                                    {blog.title}
                                </h3>
                                <span className="font-matter font-normal text-tx-tertiary text-sm">
                                    {blog.date}
                                </span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <a href="#global">
                <button className="inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full px-8 py-4 text-lg bg-[#131313] text-white transition-opacity duration-200 hover:opacity-75 active:scale-95">
                    Explore All Regions
                </button>
            </a>
        </section>
    );
}
