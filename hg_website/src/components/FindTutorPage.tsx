import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Check, UserCheck, Users, BookOpen, Star, GraduationCap, Trophy, Medal, Award, Target, Clock, Lightbulb, Book, Users2 } from "lucide-react";

const TUTORS = [
  { id: 2, name: "Priya Menon", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya", subject: "Python & AI", category: "Coding & AI", level: "Intermediate", rating: 4.8, reviews: 95, price: 1200, students: 210, sessions: 890, language: "English", speaks: ["English (Native)", "Tamil (Native)", "Malayalam"], badge: "Professional", bookings: "Booked 12 times recently", headline: "Full-Stack Dev & AI Researcher | Real-World Projects | 200+ Students", bio: "I love teaching programming and AI concepts in a practical, hands-on way. My courses focus on real-world projects and industry-relevant skills that get you hired.", specialties: ["Python", "Machine Learning", "React", "System Design"] },
  { id: 4, name: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha", subject: "IELTS English", category: "Languages", level: "Expert", rating: 4.7, reviews: 203, price: 900, students: 480, sessions: 2100, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Gujarati"], badge: "Super Tutor", bookings: "Very popular. Booked 17 times recently", headline: "British Council Certified IELTS Trainer | 8.0+ Band Guarantee | 6+ Years", bio: "With 6+ years of IELTS training, I've helped 480+ students achieve their target scores. My personalized approach focuses on identifying weak areas and building confidence.", specialties: ["IELTS Speaking", "IELTS Writing", "Band 7+", "Business English"] },
  { id: 5, name: "Vikram Joshi", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram", subject: "Physics", category: "Academic", level: "Expert", rating: 4.9, reviews: 156, price: 850, students: 290, sessions: 1050, language: "Hindi", speaks: ["Hindi (Native)", "English (Proficient)"], badge: "Professional", bookings: "Booked 10 times recently", headline: "Ex-Allen Faculty | NEET & JEE Physics | Visual Learning Approach", bio: "I specialize in making complex Physics concepts easy to understand through visualization and logic. My students consistently score 95%+ because they understand the 'why'.", specialties: ["NEET Physics", "JEE Physics", "Mechanics", "Electromagnetism"] },
  { id: 6, name: "Ananya Das", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ananya", subject: "Bharatanatyam", category: "Music & Dance", level: "Intermediate", rating: 4.6, reviews: 42, price: 700, students: 89, sessions: 340, language: "English", speaks: ["English (Native)", "Bengali (Native)", "Tamil"], badge: null, bookings: "Booked 5 times recently", headline: "Kalakshetra-Trained Dancer | 15 Years Teaching | Online & Offline", bio: "I make classical dance accessible and joyful for modern learners. My structured lessons blend tradition with contemporary teaching methods to keep students engaged and progressing.", specialties: ["Bharatanatyam", "Classical Dance", "Abhinaya", "Rhythm"] },
  { id: 8, name: "Meera Iyer", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Meera", subject: "French", category: "Languages", level: "Beginner", rating: 4.9, reviews: 78, price: 750, students: 134, sessions: 490, language: "French", speaks: ["French (Native)", "English (Fluent)", "Tamil"], badge: "Super Tutor", bookings: "Super popular. Booked 20+ times recently", headline: "Native French Speaker | DELF B2 Certified | Conversation-First Teaching", bio: "I make French learning conversational and confidence-building from day one. My lessons are tailored to your pace, goals, and interests — whether travel, business, or culture.", specialties: ["Conversational French", "DELF/DALF Prep", "Grammar", "Pronunciation"] },
  { id: 9, name: "Divya Reddy", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Divya", subject: "Vocal Music", category: "Music & Dance", level: "Intermediate", rating: 4.8, reviews: 56, price: 650, students: 98, sessions: 380, language: "Telugu", speaks: ["Telugu (Native)", "Hindi (Fluent)", "English"], badge: null, bookings: "Booked 4 times recently", headline: "Carnatic & Hindustani Vocalist | National Festival Performer | 10+ Years", bio: "I tailor my lessons to each student's musical background and goals. Whether you're a beginner finding your voice or an intermediate student refining technique, I'll guide you.", specialties: ["Carnatic Vocals", "Ragas", "Swaras", "Tala"] },
  { id: 10, name: "Rohan Gupta", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohan", subject: "Data Science", category: "Coding & AI", level: "Expert", rating: 4.6, reviews: 84, price: 1400, students: 145, sessions: 560, language: "English", speaks: ["English (Fluent)", "Hindi (Native)", "Bengali"], badge: "Professional", bookings: "Booked 7 times recently", headline: "Fortune 500 Data Scientist | MSc Statistics ISI Kolkata | Real Data Projects", bio: "I bridge the gap between academic concepts and real-world data problems. You'll work on actual datasets and learn to extract insights that drive business decisions.", specialties: ["Data Science", "Python", "Statistics", "Machine Learning"] },
  { id: 11, name: "Lakshmi S.", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Lakshmi", subject: "NEET Biology", category: "Exams", level: "Expert", rating: 4.9, reviews: 167, price: 900, students: 410, sessions: 1800, language: "Tamil", speaks: ["Tamil (Native)", "English (Fluent)", "Telugu"], badge: "Super Tutor", bookings: "Very popular. Booked 15 times recently", headline: "MBBS Doctor Turned Educator | 6 Years NEET Biology | Diagrams & Mnemonics", bio: "I make cell biology and genetics intuitive through vivid diagrams and proven mnemonics. As a doctor, I bring real clinical insight to NEET preparation that textbooks can't.", specialties: ["Cell Biology", "Genetics", "NEET Bio", "Physiology"] },
  { id: 12, name: "Aarav Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav", subject: "Mathematics", category: "Mathematics", level: "Expert", rating: 4.9, reviews: 189, price: 1000, students: 342, sessions: 1450, language: "English", speaks: ["English (Native)", "Hindi (Fluent)"], badge: "Super Tutor", bookings: "Booked 18 times recently", headline: "IIT Bombay Gold Medalist | JEE & Board Math | Concept-First Approach", bio: "I break down complex math into simple, visual steps. My students don't just memorize — they understand the logic behind every formula and theorem.", specialties: ["Calculus", "Algebra", "JEE Math", "Board Exams"] },
  { id: 13, name: "Ravi Kumar", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi", subject: "Guitar", category: "Music & Dance", level: "Beginner", rating: 5.0, reviews: 72, price: 600, students: 156, sessions: 620, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Kannada"], badge: "Super Tutor", bookings: "Booked 9 times recently", headline: "Berklee-Trained Guitarist | Acoustic & Electric | Play Songs in Week 1", bio: "I get students playing their favorite songs from the very first lesson. My method combines music theory with practical playing so you progress fast and stay motivated.", specialties: ["Acoustic Guitar", "Electric Guitar", "Music Theory", "Fingerstyle"] },
  { id: 14, name: "Kavitha Nair", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Kavitha", subject: "Chemistry", category: "Academic", level: "Expert", rating: 4.7, reviews: 134, price: 800, students: 265, sessions: 980, language: "English", speaks: ["English (Native)", "Malayalam (Native)", "Hindi"], badge: "Professional", bookings: "Booked 11 times recently", headline: "PhD Chemistry | Organic & Inorganic Specialist | NEET & JEE Focused", bio: "Chemistry becomes easy when you see the patterns. I help students visualize reactions and mechanisms so they can solve any problem confidently.", specialties: ["Organic Chemistry", "Inorganic", "Physical Chemistry", "NEET"] },
  { id: 15, name: "Arjun Mehta", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun", subject: "Web Development", category: "Coding & AI", level: "Intermediate", rating: 4.8, reviews: 63, price: 1100, students: 120, sessions: 470, language: "English", speaks: ["English (Fluent)", "Hindi (Native)", "Marathi"], badge: "Professional", bookings: "Booked 8 times recently", headline: "Senior Dev at Flipkart | React, Node, TypeScript | Build Real Products", bio: "I teach web development the way it's done in top tech companies. You'll build production-grade apps and learn industry best practices from day one.", specialties: ["React", "Node.js", "TypeScript", "System Design"] },
  { id: 16, name: "Sanya Kapoor", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sanya", subject: "Spanish", category: "Languages", level: "Beginner", rating: 4.8, reviews: 91, price: 700, students: 178, sessions: 710, language: "Spanish", speaks: ["Spanish (Native)", "English (Fluent)", "Hindi"], badge: null, bookings: "Booked 6 times recently", headline: "Native Speaker from Madrid | DELE Certified | Conversational & Fun", bio: "Learning Spanish should be fun and immersive. I use real conversations, music, and culture to help you speak confidently from the very first class.", specialties: ["Conversational Spanish", "DELE Prep", "Grammar", "Travel Spanish"] },
  { id: 17, name: "Deepak Verma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Deepak", subject: "JEE Advanced", category: "Exams", level: "Expert", rating: 4.9, reviews: 145, price: 1300, students: 310, sessions: 1200, language: "Hindi", speaks: ["Hindi (Native)", "English (Fluent)"], badge: "Super Tutor", bookings: "Booked 14 times recently", headline: "Ex-FIITJEE Faculty | AIR 56 in JEE | Problem-Solving Masterclass", bio: "I've coached 300+ students to crack JEE Advanced. My approach focuses on building problem-solving intuition rather than rote learning.", specialties: ["JEE Advanced", "Physics", "Mathematics", "Problem Solving"] },
  { id: 18, name: "Nisha Agarwal", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Nisha", subject: "Yoga & Meditation", category: "Health & Fitness", level: "Beginner", rating: 4.7, reviews: 88, price: 500, students: 220, sessions: 900, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Sanskrit"], badge: null, bookings: "Booked 7 times recently", headline: "Certified Yoga Instructor | Hatha & Vinyasa | Stress Relief & Flexibility", bio: "Yoga is for everyone. I create personalized sessions that match your body and goals, whether it's stress relief, flexibility, or spiritual growth.", specialties: ["Hatha Yoga", "Vinyasa", "Meditation", "Pranayama"] },
  { id: 19, name: "Suresh Pillai", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Suresh", subject: "History", category: "Social Studies", level: "Expert", rating: 4.8, reviews: 112, price: 750, students: 195, sessions: 820, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Malayalam"], badge: "Professional", bookings: "Booked 9 times recently", headline: "MA History from JNU | UPSC & Board Specialist | Story-Based Teaching", bio: "History isn't about memorizing dates — it's about understanding stories. I bring the past alive through narratives that make concepts stick forever.", specialties: ["Indian History", "World History", "UPSC", "Board Exams"] },
  { id: 20, name: "Pooja Bhatt", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Pooja", subject: "Geography", category: "Social Studies", level: "Intermediate", rating: 4.7, reviews: 76, price: 700, students: 142, sessions: 560, language: "English", speaks: ["English (Native)", "Hindi (Fluent)"], badge: null, bookings: "Booked 6 times recently", headline: "Geography Educator | Maps & Climate Expert | Visual & Interactive", bio: "I use maps, diagrams, and real-world examples to make geography intuitive. My students see the world differently after my classes.", specialties: ["Physical Geography", "Human Geography", "Maps", "Climate"] },
  { id: 21, name: "Tanya Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Tanya", subject: "Art & Drawing", category: "Arts & Crafts", level: "Beginner", rating: 4.9, reviews: 64, price: 600, students: 110, sessions: 430, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Punjabi"], badge: "Super Tutor", bookings: "Booked 8 times recently", headline: "NID Graduate | Sketching, Watercolor & Digital Art | All Ages Welcome", bio: "Art is for everyone. Whether you're 8 or 80, I'll help you discover your creative voice through structured yet fun drawing and painting sessions.", specialties: ["Sketching", "Watercolor", "Digital Art", "Portrait"] },
  { id: 22, name: "Kiran Rao", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Kiran", subject: "Dance", category: "Music & Dance", level: "Intermediate", rating: 4.8, reviews: 53, price: 650, students: 87, sessions: 350, language: "English", speaks: ["English (Native)", "Telugu (Native)", "Hindi"], badge: null, bookings: "Booked 5 times recently", headline: "Contemporary & Bollywood Dance | 12 Years Experience | Stage Performer", bio: "Dance is expression. I blend contemporary techniques with Bollywood energy to create sessions that are both technically strong and incredibly fun.", specialties: ["Contemporary", "Bollywood", "Freestyle", "Choreography"] },
  { id: 23, name: "Amit Saxena", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Amit", subject: "Photography", category: "Photography", level: "Beginner", rating: 4.7, reviews: 47, price: 800, students: 75, sessions: 290, language: "English", speaks: ["English (Fluent)", "Hindi (Native)"], badge: "Professional", bookings: "Booked 4 times recently", headline: "National Geographic Featured | DSLR & Mobile | Composition Masterclass", bio: "Great photos aren't about expensive gear — they're about seeing light and composition. I teach you to capture stunning images with any camera.", specialties: ["Composition", "Lighting", "Portrait", "Landscape"] },
  { id: 24, name: "Neha Kulkarni", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Neha", subject: "Spoken English", category: "Languages", level: "Beginner", rating: 4.9, reviews: 156, price: 600, students: 320, sessions: 1400, language: "English", speaks: ["English (Native)", "Hindi (Fluent)", "Marathi"], badge: "Super Tutor", bookings: "Booked 16 times recently", headline: "Cambridge Certified | Fluency & Confidence Builder | 5+ Years Experience", bio: "I help you speak English confidently in real-life situations — interviews, meetings, and daily conversations. No grammar drills, just real practice.", specialties: ["Fluency", "Pronunciation", "Interview Prep", "Confidence"] },
  { id: 25, name: "Rajesh Iyer", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rajesh", subject: "Science", category: "Science", level: "Expert", rating: 4.8, reviews: 138, price: 850, students: 275, sessions: 1100, language: "English", speaks: ["English (Native)", "Tamil (Native)", "Hindi"], badge: "Professional", bookings: "Booked 11 times recently", headline: "MSc Physics IIT Madras | Board & Competitive Science | Experiment-Based", bio: "Science is best learned by doing. I use virtual experiments and real-world examples to make every concept click. My students love the aha moments.", specialties: ["General Science", "Physics", "Chemistry", "Biology"] },
  { id: 26, name: "Aarav Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav2", subject: "Mathematics", category: "Mathematics", level: "Expert", rating: 4.9, reviews: 201, price: 950, students: 380, sessions: 1600, language: "English", speaks: ["English (Native)", "Hindi (Fluent)"], badge: "Super Tutor", bookings: "Booked 20 times recently", headline: "IIT Delhi | Vedic Math & Olympiad Coach | Makes Math Fun", bio: "Math is a superpower. I use Vedic techniques and puzzle-based learning to make even the toughest topics feel like a game.", specialties: ["Vedic Math", "Olympiad", "Algebra", "Geometry"] },
];

const CATEGORIES = ["Academic", "Coding & AI", "Music & Dance", "Languages", "Exams", "Arts & Crafts", "Business", "Health & Fitness", "Personal Development", "Test Prep", "Science", "Social Studies", "Mathematics", "Engineering", "Design & UX", "Photography", "Finance & Accounting", "Marketing", "Communication", "Competitive Exams", "Robotics", "Environmental Studies"];
const LEVELS = ["Beginner", "Intermediate", "Expert"];
const LANGUAGES = ["English", "Hindi", "French", "Telugu", "Tamil", "Spanish", "German"];
const RATINGS = [4.5, 4.0, 3.5, 3.0];

export default function FindTutorPage() {
  const [search, setSearch] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('subject') || params.get('category') || '';
    }
    return '';
  });
  const [category, setCategory] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || null;
    }
    return null;
  });
  const [level, setLevel] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sort, setSort] = useState("popular");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [categorySearch, setCategorySearch] = useState("");

  const handleBookDemo = (tutorId: number) => {
    if (typeof window === 'undefined') return;
    const isLoggedIn = localStorage.getItem('studentLoggedIn') === 'true' && localStorage.getItem('studentEmail');
    if (isLoggedIn) {
      window.location.href = `/teacher-profile?id=${tutorId}`;
    } else {
      window.location.href = `/student-signup?redirect=${encodeURIComponent(`/teacher-profile?id=${tutorId}`)}`;
    }
  };

  const filteredCategories = CATEGORIES.filter(c => 
    c.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('category')) {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1500);
    }
  }, []);

  const filtered = useMemo(() => {
    let list = TUTORS.filter((t) => {
      if (category && t.category !== category) return false;
      if (level && t.level !== level) return false;
      if (language && t.language !== language) return false;
      if (minRating && t.rating < minRating) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.category.toLowerCase().includes(search.toLowerCase()) && !(t.specialties || []).some((s: string) => s.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.students - a.students);
    return list;
  }, [search, category, level, language, minRating, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, category, level, language, minRating, sort]);

  const clearFilters = () => {
    setCategory(null);
    setLevel(null);
    setLanguage(null);
    setMinRating(null);
    setSearch("");
    setPage(1);
  };

  const FilterPill = ({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children?: React.ReactNode }) => (
    <div style={{ position: "relative" }}>
      <button
        onClick={onClick}
        className="font-matter"
        style={{
          padding: "8px 16px",
          borderRadius: "9999px",
          border: active ? "1px solid #111" : "1px solid #D1D5DB",
          background: active ? "#111" : "#F9FAFB",
          color: active ? "#fff" : "#444",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {label}
        <ChevronDown size={14} style={{ transform: activeDropdown === label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
      </button>
      {activeDropdown === label && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          zIndex: 50,
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          minWidth: "200px",
          padding: "8px 0",
          overflow: "hidden",
        }}>
          {children}
        </div>
      )}
    </div>
  );

  const DropdownItem = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="font-matter"
      style={{
        width: "100%",
        padding: "10px 16px",
        textAlign: "left",
        border: "none",
        background: active ? "#F9FAFB" : "transparent",
        color: active ? "#F97316" : "#444",
        fontSize: "14px",
        fontWeight: active ? 500 : 400,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {label}
      {active && <Check size={14} />}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", overflowX: "hidden" }}>
      {/* Hero / Search Header */}
      <section className="find-tutor-hero" style={{ paddingTop: "140px", paddingBottom: "16px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "300px", background: "radial-gradient(ellipse, rgba(165,187,252,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid #E5E7EB", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "24px" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✦</span>
            </div>
            <span className="font-matter" style={{ fontSize: "12px", fontWeight: 500, color: "#888" }}>Browse <span style={{ color: "#111", fontWeight: 600 }}>50+</span> verified tutors worldwide</span>
          </div>
          <h1 className="font-season-mix hero-title" style={{ fontSize: "clamp(28px, 6vw, 56px)", color: "#111", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
            Find your <span style={{ color: "#F97316" }}>perfect Tutor</span>
          </h1>
          <p className="font-matter hero-subtitle" style={{ color: "#888", fontSize: "clamp(14px, 2.5vw, 16px)", marginTop: "12px", lineHeight: 1.6, maxWidth: "500px", margin: "12px auto 0" }}>
            Personalised 1-on-1 tutoring across every subject. Book a free demo today.
          </p>
          <div className="hero-search-bar" style={{ marginTop: "28px", display: "flex", alignItems: "center", maxWidth: "540px", margin: "28px auto 0", background: "#fff", borderRadius: "9999px", border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "18px", flexShrink: 0 }}>
              <circle cx="11" cy="11" r="7" stroke="#999" strokeWidth="2" />
              <path d="M21 21l-4-4" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, subject, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-matter"
              style={{ flex: 1, border: "none", outline: "none", padding: "14px 16px", fontSize: "14px", background: "transparent", color: "#111" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 16px", color: "#999", fontSize: "18px" }}>×</button>
            )}
          </div>
        </div>
      </section>

      {/* Main 3-Column Layout - All columns with equal height using flex stretch */}
      <section className="find-tutor-content" style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 16px 80px", display: "flex", gap: "24px", alignItems: "stretch", justifyContent: "center", width: "100%", boxSizing: "border-box" }}>
        
        {/* LEFT: Sticky Video Section - Full height column */}
        <div style={{ width: "280px", display: "block", flexShrink: 0 }} className="desktop-spacer">
          <div 
            className="left-sidebar-sticky" 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "40px",
              height: "100%",
            }}
          >
            {/* Intro Video */}
            <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ position: "relative", paddingBottom: "62%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/Ysqu3es1NyE?si=o4sSFMGKLU40xBR5"
                  title="HomeGuru - Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", borderRadius: "16px 16px 0 0" }}
                />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.3 }}>Welcome to HomeGuru</div>
                <div className="font-matter" style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>See how 1-on-1 tutoring works</div>
              </div>
            </div>
            {/* Quick Stats */}
            <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", padding: "18px 20px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", marginBottom: "14px" }}>Platform Stats</div>
              {[
                { icon: <UserCheck size={15} color="#F97316" />, label: "Active Tutors", value: "50+" },
                { icon: <Users size={15} color="#F97316" />, label: "Students Enrolled", value: "2,500+" },
                { icon: <BookOpen size={15} color="#F97316" />, label: "Sessions Completed", value: "10,000+" },
                { icon: <Star size={15} color="#F97316" fill="#F97316" />, label: "Avg. Rating", value: "4.8 / 5.0" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.icon}
                    <span className="font-matter" style={{ fontSize: "13px", color: "#666" }}>{item.label}</span>
                  </div>
                  <span className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{item.value}</span>
                </div>
              ))}
            </div>
            {/* CTA Card */}
            <div style={{ 
              background: '#FAFAFA',
              border: '1px solid #EBEBEB',
              borderRadius: "16px", 
              padding: "20px", 
              color: "#111",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Gradient overlays */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.08) 25%, transparent 60%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.10) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="font-matter" style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>Become a Tutor <GraduationCap size={18} /></span></div>
                <p className="font-matter" style={{ fontSize: "13px", color: "#666", margin: "0 0 14px", lineHeight: 1.5 }}>Share your expertise and earn on your own schedule.</p>
                <button className="font-matter" style={{ width: "100%", padding: "10px 0", borderRadius: "99px", border: "1px solid #E5E7EB", background: "#fff", color: "#111", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#FFF7F0"; e.currentTarget.style.color = "#F97316"; e.currentTarget.style.borderColor = "#F97316"; }} onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#E5E7EB"; }}>Apply Now →</button>
              </div>
            </div>

            {/* Success Stories */}
            <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", padding: "18px 20px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", marginBottom: "14px" }}>Success Stories</div>
              {[
                { name: "Arjun K.", achievement: "Cracked JEE Main", subject: "Physics", rating: "⭐ 5.0" },
                { name: "Priya S.", achievement: "IELTS Band 8.5", subject: "English", rating: "⭐ 4.9" },
                { name: "Rahul M.", achievement: "Got Job at Google", subject: "Python", rating: "⭐ 5.0" },
                { name: "Ananya D.", achievement: "Won Dance Competition", subject: "Bharatanatyam", rating: "⭐ 4.8" },
              ].map((story, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid #F3F4F6" : "none" }}>
                  <div className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#111", marginBottom: "4px" }}>{story.name} - {story.achievement}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="font-matter" style={{ fontSize: "12px", color: "#666" }}>{story.subject} tutoring</span>
                    <span className="font-matter" style={{ fontSize: "11px", color: "#F97316", fontWeight: 500 }}>{story.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: Tutor List - Full height column */}
        <div className="tutor-center-col" style={{ flex: 1, maxWidth: "700px", minWidth: 0, width: "100%", display: "flex", flexDirection: "column" }}>
          {/* Filter Pills Bar */}
          <div className="filter-pills-container" style={{ background: "#fff", borderRadius: "16px 16px 0 0", border: "1px solid #EBEBEB", borderBottom: "1px solid #F3F4F6", position: "relative", zIndex: 50, overflow: "hidden" }}>
            {shimmer && <div className="shimmer-overlay" />}
            <div style={{ display: "flex", gap: "8px", padding: "16px 20px", flexWrap: "nowrap", alignItems: "center", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="hg-tabs-bar">
              <FilterPill label="Categories" active={!!category} onClick={() => { setActiveDropdown(activeDropdown === "Categories" ? null : "Categories"); setCategorySearch(""); }}>
                <div style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6" }}>
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="font-matter"
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#F9FAFB", color: "#111", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ maxHeight: "200px", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="category-scroll">
                  <DropdownItem label="All Categories" active={!category} onClick={() => { setCategory(null); setActiveDropdown(null); }} />
                  {filteredCategories.map(c => (
                    <DropdownItem key={c} label={c} active={category === c} onClick={() => { setCategory(c); setActiveDropdown(null); }} />
                  ))}
                  {filteredCategories.length === 0 && (
                    <div className="font-matter" style={{ padding: "12px 16px", fontSize: "13px", color: "#999" }}>No results</div>
                  )}
                </div>
              </FilterPill>
              <FilterPill label="Rating" active={!!minRating} onClick={() => setActiveDropdown(activeDropdown === "Rating" ? null : "Rating")}>
                <DropdownItem label="Any Rating" active={!minRating} onClick={() => { setMinRating(null); setActiveDropdown(null); }} />
                {RATINGS.map(r => (
                  <DropdownItem key={r} label={`${r}+ Stars`} active={minRating === r} onClick={() => { setMinRating(r); setActiveDropdown(null); }} />
                ))}
              </FilterPill>
              <FilterPill label="Course levels" active={!!level} onClick={() => setActiveDropdown(activeDropdown === "Course levels" ? null : "Course levels")}>
                <DropdownItem label="All Levels" active={!level} onClick={() => { setLevel(null); setActiveDropdown(null); }} />
                {LEVELS.map(l => (
                  <DropdownItem key={l} label={l} active={level === l} onClick={() => { setLevel(l); setActiveDropdown(null); }} />
                ))}
              </FilterPill>
              <FilterPill label="Language" active={!!language} onClick={() => setActiveDropdown(activeDropdown === "Language" ? null : "Language")}>
                <DropdownItem label="Any Language" active={!language} onClick={() => { setLanguage(null); setActiveDropdown(null); }} />
                {LANGUAGES.map(l => (
                  <DropdownItem key={l} label={l} active={language === l} onClick={() => { setLanguage(l); setActiveDropdown(null); }} />
                ))}
              </FilterPill>
              <div style={{ display: "flex", gap: "4px", background: "#F3F4F6", borderRadius: "9999px", padding: "4px", flexShrink: 0 }}>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    border: "none",
                    background: viewMode === "list" ? "#fff" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: viewMode === "list" ? "#111" : "#888",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    border: "none",
                    background: viewMode === "grid" ? "#fff" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: viewMode === "grid" ? "#111" : "#888",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Results list - Takes remaining height */}
          <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderTop: "1px solid #EBEBEB", borderRadius: "0 0 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p className="font-season-mix" style={{ fontSize: "20px", color: "#111" }}>No tutors found</p>
                <p className="font-matter" style={{ color: "#888", fontSize: "14px", marginTop: "8px" }}>Try adjusting your filters.</p>
                <button onClick={clearFilters} className="font-matter" style={{ marginTop: "16px", padding: "8px 20px", borderRadius: "9999px", border: "none", background: "#111", color: "#fff", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Clear filters</button>
              </div>
            ) : viewMode === "list" ? (
              (() => {
                const tutorsPerPage = 4;
                const totalPages = Math.ceil(filtered.length / tutorsPerPage);
                const startIndex = (page - 1) * tutorsPerPage;
                const endIndex = startIndex + tutorsPerPage;
                const pageItems = filtered.slice(startIndex, endIndex);
                const showTutors = pageItems.length > 0;
                return (
                  <>
                    <div style={{ flex: 1 }}>
                      {showTutors ? pageItems.map((t, i) => (
                        <div
                          key={t.id}
                          className="tutor-card-mobile"
                          style={{
                            display: "flex", gap: "0",
                            borderBottom: i < pageItems.length - 1 ? "1px solid #F3F4F6" : "none",
                            transition: "background 0.15s",
                            cursor: "pointer",
                            position: "relative",
                            flexDirection: "row",
                            overflow: "hidden",
                          }}
                          onClick={() => window.location.href = `/teacher-profile?id=${t.id}`}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {/* Card gradient overlays */}
                          {shimmer && <div className="shimmer-overlay" />}
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.08) 25%, transparent 60%)', pointerEvents: 'none' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)', pointerEvents: 'none' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.10) 0%, transparent 55%)', pointerEvents: 'none' }} />
                          {/* LEFT: Avatar */}
                          <div className="tutor-avatar-section" style={{ padding: "28px 20px 28px 28px", flexShrink: 0, position: "relative", zIndex: 1 }}>
                            <div style={{ position: "relative" }}>
                              <img
                                src={t.avatar}
                                alt={t.name}
                                className="tutor-avatar"
                                style={{
                                  width: 72, height: 72, borderRadius: "50%",
                                  objectFit: "cover", border: "2px solid #fff",
                                  display: "block",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                }}
                              />
                              {(t as any).badge && (
                                <div style={{
                                  position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                                  background: (t as any).badge === "Super Tutor" ? "#F97316" : "#3B82F6",
                                  color: "#fff", fontSize: "9px", fontWeight: 500,
                                  padding: "2px 8px", borderRadius: "99px", whiteSpace: "nowrap",
                                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                                }} className="font-matter">
                                  {(t as any).badge === "Super Tutor" ? "⭐ Super" : "Pro"}
                                </div>
                              )}
                            </div>
                            <div className="tutor-rating-mobile" style={{ marginTop: 16, textAlign: "center" }}>
                              <div className="rating-stars" style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
                                {[1,2,3,4,5].map(s => (
                                  <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= Math.round(t.rating) ? "#F97316" : "#E5E7EB"}>
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                ))}
                              </div>
                              <div className="font-matter" style={{ fontWeight: 500, fontSize: "12px", color: "#111", marginTop: "3px" }}>{t.rating}</div>
                              <div className="font-matter" style={{ fontSize: "10px", color: "#999", marginTop: "1px" }}>{t.reviews} reviews</div>
                            </div>
                          </div>
                          {/* CENTER: Info */}
                          <div className="tutor-info-section" style={{ flex: 1, minWidth: 0, padding: "28px 12px 28px 0", position: "relative", zIndex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                              <span className="font-matter" style={{ fontSize: "16px", fontWeight: 600, color: "#111", letterSpacing: "-0.01em" }}>{t.name}</span>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="#F97316"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                            </div>

                            <span className="font-matter" style={{ fontSize: "13px", color: "#F97316", fontWeight: 500 }}>{t.subject}</span>

                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              <span className="font-matter" style={{ fontSize: "12px", color: "#888" }}>Speaks {(t as any).speaks ? (t as any).speaks.slice(0, 2).join(", ") : t.language}
                                {(t as any).speaks && (t as any).speaks.length > 2 ? ` +${(t as any).speaks.length - 2}` : ""}
                              </span>
                            </div>

                            <div style={{ display: "flex", gap: "16px", marginTop: "14px" }}>
                              <span className="font-matter" style={{ fontSize: "12px", color: "#888" }}>
                                <strong style={{ color: "#111" }}>{t.students}</strong> students
                              </span>
                              <span className="font-matter" style={{ fontSize: "12px", color: "#888" }}>
                                <strong style={{ color: "#111" }}>{t.sessions.toLocaleString()}</strong> lessons
                              </span>
                            </div>

                            <p className="font-matter" style={{ fontSize: "13px", color: "#555", lineHeight: 1.6, margin: "14px 0 0" }}>
                              {(t as any).headline || t.subject + " Tutor"}
                            </p>

                            {(t as any).specialties && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
                                {(t as any).specialties.slice(0, 3).map((s: string, si: number) => (
                                  <span key={si} className="font-matter" style={{ background: "rgba(249,115,22,0.06)", color: "#B45309", fontSize: "11px", fontWeight: 500, padding: "4px 12px", borderRadius: "99px", border: "1px solid rgba(249,115,22,0.1)" }}>{s}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* RIGHT: Price + CTAs */}
                          <div className="tutor-price-section" style={{ padding: "28px 28px 28px 12px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "14px", flexShrink: 0, minWidth: 130, position: "relative", zIndex: 1 }}>
                            <button
                              style={{ border: "none", background: "none", cursor: "pointer", padding: 0, position: "absolute", top: "20px", right: "20px" }}
                              onClick={e => {
                                e.stopPropagation();
                                setWishlist(prev => prev.includes(t.id) ? prev.filter(id => id !== t.id) : [...prev, t.id]);
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.includes(t.id) ? "#EF4444" : "none"} stroke={wishlist.includes(t.id) ? "#EF4444" : "#ccc"} strokeWidth="2" style={{ transition: "all 0.2s" }}>
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                              </svg>
                            </button>
                            <div className="tutor-price-info" style={{ textAlign: "right" }}>
                              <div className="font-matter" style={{ fontSize: "22px", fontWeight: 600, color: "#111", lineHeight: 1, letterSpacing: "-0.02em" }}>₹{t.price.toLocaleString()}</div>
                              <div className="font-matter" style={{ fontSize: "11px", color: "#aaa", marginTop: "5px" }}>per lesson</div>
                            </div>
                            <div className="tutor-book-button" style={{ width: "100%" }} onClick={e => e.stopPropagation()}>
                              <button
                                className="font-matter"
                                onClick={() => handleBookDemo(t.id)}
                                style={{
                                  width: "100%",
                                  padding: "10px 24px",
                                  borderRadius: "99px",
                                  border: "1px solid #E5E7EB",
                                  background: "#fff",
                                  color: "#111",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  position: "relative",
                                  zIndex: 1,
                                  whiteSpace: "nowrap",
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = "#F97316";
                                  e.currentTarget.style.color = "#fff";
                                  e.currentTarget.style.borderColor = "#F97316";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = "#fff";
                                  e.currentTarget.style.color = "#111";
                                  e.currentTarget.style.borderColor = "#E5E7EB";
                                }}
                              >
                                Book Demo
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div style={{ textAlign: "center", padding: "60px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <p className="font-season-mix" style={{ fontSize: "20px", color: "#111" }}>More teachers coming soon!</p>
                          <p className="font-matter" style={{ color: "#888", fontSize: "14px", marginTop: "8px" }}>We're adding more qualified tutors to our platform.</p>
                        </div>
                      )}
                    </div>
                    {/* Pagination */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "20px 20px 24px", borderTop: "1px solid #F3F4F6", marginTop: "auto" }}>
                      <button
                        onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                        disabled={page === 1}
                        className="font-matter"
                        style={{ 
                          width: "36px", height: "36px",
                          borderRadius: "50%", 
                          border: "1px solid #E5E7EB", 
                          background: page === 1 ? "#F9FAFB" : "#fff", 
                          color: page === 1 ? "#CCC" : "#555", 
                          cursor: page === 1 ? "default" : "pointer", 
                          fontSize: "14px", 
                          transition: "all 0.15s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        ←
                      </button>
                      {Array.from({ length: Math.ceil(filtered.length / 4) || 1 }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => { setPage(p); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                          className="font-matter"
                          style={{
                            width: "36px", height: "36px",
                            borderRadius: "50%",
                            border: page === p ? "none" : "1px solid #E5E7EB",
                            background: page === p ? "#F97316" : "#fff",
                            color: page === p ? "#fff" : "#555",
                            fontSize: "13px",
                            fontWeight: page === p ? 600 : 400,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => { setPage(p => Math.min(Math.ceil(filtered.length / 4) || 1, p + 1)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                        disabled={page >= Math.ceil(filtered.length / 4) || filtered.length === 0}
                        className="font-matter"
                        style={{ 
                          width: "36px", height: "36px",
                          borderRadius: "50%", 
                          border: "1px solid #E5E7EB", 
                          background: (page >= Math.ceil(filtered.length / 4) || filtered.length === 0) ? "#F9FAFB" : "#fff", 
                          color: (page >= Math.ceil(filtered.length / 4) || filtered.length === 0) ? "#CCC" : "#555", 
                          cursor: (page >= Math.ceil(filtered.length / 4) || filtered.length === 0) ? "default" : "pointer", 
                          fontSize: "14px", 
                          transition: "all 0.15s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        →
                      </button>
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="tutor-grid-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", padding: "20px" }}>
                {filtered.map((t, i) => (
                  <div
                    key={t.id}
                    style={{
                      background: "#FAFAFA",
                      border: "1px solid #EBEBEB",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                      e.currentTarget.style.borderColor = "#D1D5DB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#EBEBEB";
                    }}
                  >
                    {/* Card gradient overlays */}
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.08) 25%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.10) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    <button
                      style={{ position: "absolute", top: "12px", right: "12px", border: "none", background: "none", cursor: "pointer", padding: 0 }}
                      onClick={e => {
                        e.stopPropagation();
                        setWishlist(prev => prev.includes(t.id) ? prev.filter(id => id !== t.id) : [...prev, t.id]);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={wishlist.includes(t.id) ? "#EF4444" : "none"}
                        stroke={wishlist.includes(t.id) ? "#EF4444" : "#bbb"}
                        strokeWidth="2"
                        style={{ transition: "all 0.2s ease", transform: wishlist.includes(t.id) ? "scale(1.1)" : "scale(1)" }}
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    <img src={t.avatar} alt={t.name} style={{
                      width: 56, height: 56, borderRadius: "12px",
                      objectFit: "cover",
                      margin: "0 auto 12px",
                      cursor: "pointer",
                      display: "block",
                    }}
                      onClick={() => window.open(`/teacher-profile?id=${t.id}`, "_blank")} />
                    <p className="font-matter" style={{ fontSize: "14px", fontWeight: 400, color: "#111", margin: "0 0 4px", cursor: "pointer" }} onClick={() => window.open(`/teacher-profile?id=${t.id}`, "_blank")}>{t.name}</p>
                    <p className="font-matter" style={{ fontSize: "12px", color: "#888", margin: "0 0 8px", cursor: "pointer" }} onClick={() => window.open(`/teacher-profile?id=${t.id}`, "_blank")}>{t.subject}</p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "8px 0", fontSize: "12px", color: "#888" }}>
                      <span>⭐ {t.rating}</span>
                      <span>·</span>
                      <span>₹{t.price}/hr</span>
                    </div>
                    <button
                      className="font-matter"
                      onClick={() => handleBookDemo(t.id)}
                      style={{
                        width: "100%",
                        padding: "9px 0",
                        borderRadius: "9999px",
                        border: "1px solid #E5E7EB",
                        background: "#fff",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#111",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        letterSpacing: "0.01em",
                        position: "relative",
                        zIndex: 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F97316";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "#F97316";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#111";
                        e.currentTarget.style.borderColor = "#E5E7EB";
                      }}
                    >
                      Book Demo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Sidebar - Full height column */}
        <aside className="hg-filter-panel" style={{ 
          width: "280px", 
          flexShrink: 0, 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px",
          height: "100%",
        }}>
          {/* Today's Blogs */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EBEBEB", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", marginBottom: "16px" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="font-season-mix" style={{ fontSize: "18px", color: "#111" }}>Today's Blogs</span>
            </div>
            {[
              { title: "How I Cracked JEE in 6 Months", author: "Aarav Sharma", time: "2h ago", color: "#0A2156" },
              { title: "Why Every Student Should Learn Python in 2025", author: "Priya Menon", time: "5h ago", color: "#F97316" },
              { title: "The Secret to Mastering Any Musical Instrument", author: "Ravi Kumar", time: "8h ago", color: "#6366F1" },
              { title: "Tips for Staying Motivated During Exam Season", author: "Sneha Patel", time: "10h ago", color: "#EF4444" },
            ].map((blog, idx) => (
              <div
                key={idx}
                style={{ padding: "20px 24px", borderBottom: "1px solid #F3F4F6", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: blog.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700 }}>{blog.author.charAt(0)}</div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="font-matter" style={{ fontSize: "12px", fontWeight: 500, color: "#111" }}>{blog.author}</span>
                    <span className="font-matter" style={{ fontSize: "11px", color: "#999" }}>{blog.time}</span>
                  </div>
                </div>
                <p className="font-matter" style={{ fontSize: "14px", fontWeight: 400, color: "#111", margin: 0, lineHeight: 1.5 }}>{blog.title}</p>
              </div>
            ))}
            <div style={{ padding: "14px 20px" }}>
              <button className="font-matter" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#F97316", fontWeight: 500 }}>Show more →</button>
            </div>
          </div>
          
          {/* Top Tutors */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EBEBEB", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: "8px" }}>
              <Trophy size={20} color="#F97316" />
              <span className="font-season-mix" style={{ fontSize: "18px", color: "#111" }}>Top Tutors</span>
            </div>
            {[
              { rank: <Trophy size={16} color="#FFD700" />, name: "Ravi Kumar", subject: "Guitar", students: 156, rating: 5, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi" },
              { rank: <Medal size={16} color="#C0C0C0" />, name: "Aarav Sharma", subject: "Mathematics", students: 342, rating: 4.9, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav" },
              { rank: <Medal size={16} color="#CD7F32" />, name: "Vikram Joshi", subject: "Physics", students: 290, rating: 4.9, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram" },
              { rank: <Award size={16} color="#F97316" />, name: "Sneha Patel", subject: "IELTS English", students: 480, rating: 4.7, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha" },
            ].map((tutor, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px 20px",
                  borderBottom: idx < 3 ? "1px solid #F3F4F6" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                  <span style={{ width: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>{tutor.rank}</span>
                  <img src={tutor.avatar} alt={tutor.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1.2px solid #EBEBEB" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.3 }}>{tutor.name}</div>
                  <div className="font-matter" style={{ fontSize: "13px", color: "#888", marginTop: "3px" }}>{tutor.subject} · {tutor.students} students</div>
                  <div className="font-matter" style={{ fontSize: "13px", color: "#F97316", fontWeight: 500, marginTop: "4px", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Star size={13} color="#F97316" fill="#F97316" /> {tutor.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
      
      <style>{`
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255,255,255,0.6) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: shimmerSlide 1.5s ease-out forwards;
          pointer-events: none;
          z-index: 5;
          border-radius: inherit;
        }
        @keyframes shimmerSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .find-tutor-hero { padding-top: 140px; }
        .hg-tabs-bar { 
          display: flex; 
          gap: 8px; 
          padding: 16px 20px; 
          flex-wrap: nowrap; 
          overflow-x: auto; 
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hg-tabs-bar::-webkit-scrollbar { display: none; }
        .category-scroll::-webkit-scrollbar { display: none; }
        .desktop-spacer { display: none !important; }
        .hg-filter-panel { display: none !important; }
        
        /* Hero Search Bar Responsive */
        .hero-search-bar {
          width: 100%;
          max-width: 540px;
        }
        
        /* Filter Pills Container */
        .filter-pills-container {
          position: relative;
        }
        
        /* Tutor Card Mobile Optimizations */
        .tutor-card-mobile {
          min-height: auto;
        }
        
        .tutor-avatar {
          width: 72px;
          height: 72px;
        }
        
        .tutor-avatar-section {
          padding: 16px 12px 16px 16px;
        }
        
        .tutor-info-section {
          padding: 16px 8px 16px 0;
        }
        
        .tutor-price-section {
          padding: 16px 16px 16px 8px;
          min-width: 120px;
        }
        
        .tutor-rating-mobile {
          margin-top: 12px;
        }
        
        /* Make all columns equal height */
        .desktop-spacer, .tutor-center-col, .hg-filter-panel {
          display: flex;
          flex-direction: column;
        }
        
        /* Tutor Grid Mobile Optimizations */
        .tutor-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          padding: 20px;
        }
        
        /* Mobile Specific Styles */
        @media (max-width: 480px) {
          .find-tutor-hero { 
            padding-top: 80px !important; 
            padding-bottom: 20px !important; 
          }
          
          .hero-search-bar {
            margin: 20px 16px 0 !important;
            max-width: calc(100% - 32px) !important;
          }
          
          .find-tutor-content { 
            padding: 0 8px 40px !important; 
          }
          
          .hg-tabs-bar {
            padding: 12px 16px !important;
            gap: 6px !important;
          }
          
          .tutor-grid-container {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 16px !important;
          }
          
                          .tutor-card-mobile {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .tutor-avatar-section {
            padding: 16px !important;
            display: flex !important;
            align-items: flex-start !important;
            gap: 16px !important;
            border-left: none !important;
            border-bottom: none !important;
          }
          
          .tutor-avatar {
            width: 60px !important;
            height: 60px !important;
            flex-shrink: 0 !important;
          }
          
          .tutor-rating-mobile {
            margin-top: 0 !important;
            text-align: left !important;
            flex: 1;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          
          .tutor-rating-mobile .rating-stars {
            justify-content: flex-start !important;
            margin-bottom: 4px !important;
          }
          
          .tutor-info-section {
            padding: 0 16px 16px 16px !important;
            border-left: none !important;
          }
          
          .tutor-price-section {
            padding: 16px !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-top: 1px solid #F3F4F6 !important;
            min-width: auto !important;
            gap: 16px !important;
          }
          
          .tutor-price-info {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .tutor-book-button {
            flex-shrink: 0 !important;
            min-width: 100px !important;
          }
        }
        
        /* Tablet Styles */
        @media (max-width: 768px) and (min-width: 481px) {
          .tutor-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
            gap: 14px !important;
            padding: 18px !important;
          }
          
          .find-tutor-hero { 
            padding-top: 100px !important; 
            padding-bottom: 30px !important; 
          }
          
          .find-tutor-content { 
            padding: 0 12px 60px !important; 
          }
          
          .tutor-avatar {
            width: 68px !important;
            height: 68px !important;
          }
          
          .tutor-avatar-section {
            padding: 16px 10px 16px 14px !important;
          }
          
          .tutor-info-section {
            padding: 16px 6px 16px 0 !important;
          }
          
          .tutor-price-section {
            padding: 16px 14px 16px 6px !important;
            min-width: 110px !important;
          }
        }
        
        /* Large Tablet / Small Desktop */
        @media (max-width: 1023px) and (min-width: 769px) {
          .find-tutor-content { 
            justify-content: center !important; 
          }
          
          .tutor-center-col { 
            max-width: 100% !important; 
          }
        }
        
        /* Desktop Styles */
        @media (min-width: 1024px) {
          .desktop-spacer { 
            display: block !important; 
          }
          
          .hg-filter-panel { 
            display: flex !important; 
            margin-left: 12px; 
          }
          
          .hg-tabs-bar { 
            flex-wrap: wrap !important; 
            overflow-x: visible !important;
            gap: 12px !important;
            padding: 16px 24px !important;
          }
          
          .tutor-avatar {
            width: 88px !important;
            height: 88px !important;
          }
          
          .tutor-avatar-section {
            padding: 20px 16px 20px 20px !important;
          }
          
          .tutor-info-section {
            padding: 20px 12px 20px 0 !important;
          }
          
          .tutor-price-section {
            padding: 20px 20px 20px 12px !important;
            min-width: 140px !important;
            gap: 12px !important;
          }
          
          .tutor-rating-mobile {
            margin-top: 16px !important;
            text-align: center !important;
          }
        }
        
        /* Large Desktop */
        @media (min-width: 1200px) {
          .find-tutor-content {
            max-width: 1300px !important;
          }
        }
      `}</style>
    </div>
  );
}