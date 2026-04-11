import { useState } from "react";

const BLOGS = [
  { date: "March 25, 2026", tags: ["Tutoring Platform"], title: "Are Online Classes Safe for Students? What Global Experts and Doctors Say", desc: "Online classes have become a key part of modern education. However, many parents still worry about their children's safety, screen time, and overall well-being during virtual learning sessions.", color: "#F97316" },
  { date: "March 17, 2026", tags: ["Tutoring Platform"], title: "10 Shocking Signs Your Child Needs a Tutor (Most Parents Ignore)", desc: "Let's be honest\u2026 If your child often says \u201CI don't understand\u201D\u2026or sits to study but gets distracted within minutes, these could be early warning signs.", color: "#6366F1" },
  { date: "March 16, 2026", tags: ["Tutoring Platform"], title: "Online Tutors for Students in USA, UK & Dubai | Affordable 1-to-1 Tuition", desc: "Finding the right tutor for a child is one of the most important decisions a parent can make. With the rise of online education, quality tutoring is now accessible globally.", color: "#3B82F6" },
  { date: "March 14, 2026", tags: ["Tutoring Platform"], title: "Why Students Lose Interest in Studies (And How to Fix It)", desc: "Many students start their academic journey with curiosity and excitement, but over time some begin to lose motivation. Understanding why this happens is the first step.", color: "#8B5CF6" },
  { date: "March 14, 2026", tags: ["Academic", "CBSE", "Study Tips", "Tutoring Platform"], title: "How to Find the Right Tutor for Your Child in India (2026 Guide)", desc: "Every student learns differently, and choosing the right tutor can make all the difference. This comprehensive guide helps parents navigate the process.", color: "#10B981" },
  { date: "February 27, 2026", tags: ["Academic", "Competitive Exam", "Study Tips"], title: "How to Shift from Board Exams to Entrance Exam Preparation Smoothly", desc: "Board exams are finally over. After months of structured study, a fixed syllabus, and writing-based preparation, students suddenly face a completely different challenge.", color: "#EC4899" },
  { date: "February 20, 2026", tags: ["Academic", "CBSE"], title: "How to Analyse Your Board Exam Performance Without Stress", desc: "Board exams are over. The question papers are submitted. The routine of daily revision has paused. But for many students, the stress hasn't ended.", color: "#14B8A6" },
  { date: "February 12, 2026", tags: ["CBSE"], title: "All the Best to Every Student Appearing for Board Exams 2026", desc: "The board examination season has officially begun. After months of preparation, revision, practice tests, and effort, students across India are ready.", color: "#F59E0B" },
  { date: "February 6, 2026", tags: ["Academic", "CBSE", "Study Tips"], title: "How to Handle a Tough Question Paper Without Panicking", desc: "Every board exam season, students walk out of exam halls saying one sentence: \u201CPaper tough tha.\u201D But here's the truth most students miss.", color: "#EF4444" },
  { date: "February 2, 2026", tags: ["Tutoring Platform"], title: "One-to-One Tutoring in India After Economic Survey 2026", desc: "India's education story has long been measured by enrolment numbers. But the Economic Survey 2025\u201326 reveals a deeper truth about learning outcomes.", color: "#0EA5E9" },
  { date: "January 30, 2026", tags: ["Academic", "CBSE", "Study Tips"], title: "Why Science Feels Easy While Studying but Difficult in Board Exams", desc: "For many students preparing for board exams, Science creates a strange contradiction. While studying, concepts seem clear. In the exam hall, everything changes.", color: "#A855F7" },
  { date: "January 23, 2026", tags: ["Academic", "CBSE", "Study Tips"], title: "Why Students Know Maths Concepts but Still Lose Marks in Board Exams", desc: "For many students preparing for board exams, Maths feels like a strange subject. They understand the concepts but still can't score well.", color: "#22C55E" },
];

const ALL_TAGS = [...new Set(BLOGS.flatMap(b => b.tags))];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? BLOGS.filter(b => b.tags.includes(activeTag)) : BLOGS;
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", paddingTop: "80px" }}>

      {/* Hero */}
      <section style={{ paddingTop: "60px", paddingBottom: "20px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(80px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid #E5E7EB", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "24px" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{"\u2726"}</span>
            </div>
            <span className="font-matter" style={{ fontSize: "12px", fontWeight: 500, color: "#888" }}>Insights & stories from <span style={{ color: "#111", fontWeight: 600 }}>HomeGuru</span></span>
          </div>
          <h1 className="font-season-mix" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#111", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            The HomeGuru <span style={{ color: "#F97316" }}>Blog</span>
          </h1>
          <p className="font-matter" style={{ color: "#999", fontSize: "15px", marginTop: "14px", lineHeight: 1.6 }}>
            Expert advice on learning, tutoring, and academic success.
          </p>
        </div>
      </section>

      {/* Tags */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px 32px" }}>
        <div className="blog-tags-bar" style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => setActiveTag(null)} className="font-matter"
            style={{ padding: "7px 18px", borderRadius: "99px", border: !activeTag ? "1px solid #111" : "1px solid #D1D5DB", background: !activeTag ? "#111" : "#F9FAFB", color: !activeTag ? "#fff" : "#444", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
          >All</button>
          {ALL_TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className="font-matter"
              style={{ padding: "7px 18px", borderRadius: "99px", border: activeTag === tag ? "1px solid #111" : "1px solid #D1D5DB", background: activeTag === tag ? "#111" : "#F9FAFB", color: activeTag === tag ? "#fff" : "#444", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
            >{tag}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px 80px" }}>

        {/* Featured post */}
        {featured && (
          <a href="https://homeguruworld.com/blogs/" style={{ textDecoration: "none", display: "block", marginBottom: "24px" }}>
            <div
              style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Banner */}
              <div style={{ height: "180px", position: "relative", overflow: "hidden", background: "#F5F5F5" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 65% at 50% 110%, ${featured.color}33 0%, ${featured.color}15 25%, transparent 60%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.10) 0%, transparent 55%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 16, left: 24 }}>
                  <span className="font-matter" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 500, color: "#111" }}>Featured</span>
                </div>
                <div style={{ position: "absolute", bottom: 20, left: 28 }}>
                  <span className="font-matter" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 500, color: "#111" }}>Featured</span>
                </div>
              </div>
              <div style={{ padding: "28px 28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span className="font-matter" style={{ fontSize: "12px", color: "#999" }}>{featured.date}</span>
                  {featured.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="font-matter" style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "99px", background: "#F3F4F6", color: "#666" }}>{tag}</span>
                  ))}
                </div>
                <h2 className="font-matter" style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 500, color: "#111", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{featured.title}</h2>
                <p className="font-matter" style={{ margin: 0, fontSize: "14px", color: "#888", lineHeight: 1.7 }}>{featured.desc}</p>
                <span className="font-matter" style={{ display: "inline-block", marginTop: "16px", fontSize: "13px", fontWeight: 500, color: "#F97316" }}>Read article {"\u2192"}</span>
              </div>
            </div>
          </a>
        )}

        {/* Grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {rest.map((blog, idx) => (
            <a key={idx} href="https://homeguruworld.com/blogs/" style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "all 0.25s", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Banner */}
                <div style={{ height: "120px", position: "relative", overflow: "hidden", background: "#F5F5F5" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 65% at 50% 110%, ${blog.color}33 0%, ${blog.color}15 25%, transparent 60%)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.10) 0%, transparent 55%)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.08) 0%, transparent 55%)`, pointerEvents: "none" }} />
                </div>
                <div style={{ padding: "22px 22px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                    <span className="font-matter" style={{ fontSize: "12px", color: "#bbb" }}>{blog.date}</span>
                    {blog.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="font-matter" style={{ fontSize: "10px", fontWeight: 500, padding: "2px 8px", borderRadius: "99px", background: "#F3F4F6", color: "#888" }}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-matter" style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>{blog.title}</h3>
                  <p className="font-matter" style={{ margin: 0, fontSize: "13px", color: "#999", lineHeight: 1.6 }}>{blog.desc.slice(0, 100)}...</p>
                  <span className="font-matter" style={{ display: "inline-block", marginTop: "14px", fontSize: "13px", fontWeight: 500, color: "#F97316" }}>Read more {"\u2192"}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p className="font-matter" style={{ fontSize: "16px", color: "#888" }}>No posts found for this category.</p>
            <button onClick={() => setActiveTag(null)} className="font-matter" style={{ marginTop: "12px", padding: "8px 20px", borderRadius: "99px", border: "none", background: "#111", color: "#fff", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Show all</button>
          </div>
        )}
      </div>

      <style>{`
        .font-season-mix { font-family: 'Season Mix', serif; }
        .font-matter { font-family: 'Matter', sans-serif; }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-tags-bar { justify-content: flex-start !important; overflow-x: auto; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 4px; }
          .blog-tags-bar::-webkit-scrollbar { display: none; }
          .blog-tags-bar button { flex-shrink: 0; }
        }
      `}</style>
    </div>
  );
}
