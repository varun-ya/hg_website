import { useState, useEffect } from "react";
import {
  MapPin, Calendar, CheckCircle, ChevronLeft, ChevronRight, Share2, MoreHorizontal,
  Link as LinkIcon, Star, Award, ShieldCheck, Clock, MessageCircle,
  Languages, BookOpen, TrendingUp, Video
} from "lucide-react";

const TUTORS = [
  {
    id: 1, name: "Aarav Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav",
    subject: "Mathematics", category: "Academic", level: "Expert", rating: 4.9, reviews: 128,
    price: 800, students: 342, sessions: 1200,
    handle: "aarav_maths",
    bio: "IIT Delhi graduate with 8+ years of teaching experience in JEE & board-level Mathematics. Passionate about simplifying complex problems.",
    language: "English", location: "Delhi, India", joinDate: "March 2020",
    responseTime: "< 1 hour", successRate: "98%", website: "aaravsharma.com",
    certifications: [
      { title: "IIT Delhi Alumni", year: "2015", verified: true },
      { title: "JEE Advanced Specialist", year: "2018", verified: true },
      { title: "National Board Examiner", year: "2020", verified: false },
    ],
    about: "I'm passionate about making Mathematics simple and enjoyable. My teaching methodology focuses on conceptual clarity and problem-solving skills. I've helped 300+ students crack JEE and board exams with flying colors. I believe every student has the potential to master math with the right guidance.",
    highlights: ["1200+ sessions completed", "342 active students", "98% success rate", "Expert in JEE & Boards"],
    speaks: ["English", "Hindi"],
    specialties: ["JEE Maths", "Class 11-12 Boards", "Calculus", "Algebra", "Trigonometry"],
    traits: ["Patient", "Methodical", "Conceptual"],
    ratingBreakdown: { clarity: 4.9, preparation: 4.8, punctuality: 5.0, engagement: 4.9 },
    reviews_list: [
      { name: "Raj Kumar", avatar: "R", rating: 5, text: "Excellent teacher! Cleared my JEE doubts in just 2 sessions.", time: "2 weeks ago" },
      { name: "Priya Singh", avatar: "P", rating: 5, text: "Best mathematics tutor I've ever had. Very patient and explains brilliantly. Highly recommended!", time: "1 month ago" }
    ],
    education: [
      { degree: "B.Tech in Mathematics", institution: "IIT Delhi", year: "2015" },
      { degree: "JEE Advanced Faculty", institution: "FIITJEE Institutes", year: "2017–2020" },
    ],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    id: 2, name: "Priya Menon", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya",
    subject: "Python & AI", category: "Coding & AI", level: "Intermediate", rating: 4.8, reviews: 95,
    price: 1200, students: 210, sessions: 890,
    handle: "priya_codes",
    bio: "Full-stack developer & AI researcher. Helping students bridge the gap between theory and real-world industrial projects.",
    language: "English", location: "Bangalore, India", joinDate: "June 2021",
    responseTime: "< 2 hours", successRate: "96%", website: "priya.ai",
    certifications: [
      { title: "Full-Stack Dev Certified", year: "2019", verified: true },
      { title: "Google Cloud Associate", year: "2021", verified: true },
      { title: "ML Specialist", year: "2022", verified: false },
    ],
    about: "I love teaching programming and AI concepts in a practical way. My courses focus on real-world projects and industry-relevant skills. I've mentored 200+ developers who are now working at top tech companies. Learning by doing is my core philosophy.",
    highlights: ["890+ sessions completed", "210 active students", "96% success rate", "Expert in Python & AI"],
    speaks: ["English", "Tamil", "Malayalam"],
    specialties: ["Python", "Machine Learning", "React", "System Design", "Data Science"],
    traits: ["Project-driven", "Structured", "Industry-focused"],
    ratingBreakdown: { clarity: 4.8, preparation: 4.9, punctuality: 4.7, engagement: 4.8 },
    reviews_list: [
      { name: "Arjun Patel", avatar: "A", rating: 5, text: "Great instructor! Learned Python from scratch and built my first project.", time: "3 weeks ago" },
      { name: "Sneha Desai", avatar: "S", rating: 4, text: "Very knowledgeable and patient. Highly recommended for beginners.", time: "2 months ago" }
    ],
    education: [
      { degree: "B.Tech in Computer Science", institution: "NIT Trichy", year: "2019" },
      { degree: "AI Research Intern", institution: "Google Brain", year: "2021" },
    ],
    availability: ["Tue", "Thu", "Sat", "Sun"],
  },
  {
    id: 3, name: "Ravi Kumar", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi",
    subject: "Guitar", category: "Music & Dance", level: "Beginner", rating: 5.0, reviews: 67,
    price: 600, students: 156, sessions: 520,
    handle: "ravi_strums",
    bio: "Professional guitarist with 10 years of performance experience. Trinity Grade 8 certified musician and recording artist.",
    language: "Hindi", location: "Mumbai, India", joinDate: "January 2019",
    responseTime: "< 30 mins", successRate: "99%", website: "raviguitar.in",
    certifications: [
      { title: "Trinity Grade 8", year: "2016", verified: true },
      { title: "Rockschool Certified", year: "2018", verified: true },
      { title: "Music Theory Master", year: "2020", verified: false },
    ],
    about: "I teach guitar with a focus on building strong fundamentals and musical expression. Whether you're a complete beginner or looking to improve, I'll guide you through every step of your musical journey. Music is a language, and I'll help you speak it fluently.",
    highlights: ["520+ sessions completed", "156 active students", "99% success rate", "Professional Performer"],
    speaks: ["Hindi", "English", "Marathi"],
    specialties: ["Acoustic Guitar", "Electric Guitar", "Music Theory", "Fingerpicking", "Rock & Pop"],
    traits: ["Encouraging", "Adaptable", "Creative"],
    ratingBreakdown: { clarity: 5.0, preparation: 4.9, punctuality: 5.0, engagement: 5.0 },
    reviews_list: [
      { name: "Vikram Singh", avatar: "V", rating: 5, text: "Amazing guitar teacher! Learned so much in just a few weeks.", time: "1 week ago" },
      { name: "Anjali Sharma", avatar: "A", rating: 5, text: "Best decision to learn guitar from Ravi. Highly professional!", time: "1 month ago" }
    ],
    education: [
      { degree: "Bachelor in Music", institution: "Gandharva Mahavidyalaya", year: "2014" },
      { degree: "Trinity Grade 8 Certification", institution: "Trinity College London", year: "2016" },
    ],
    availability: ["Mon", "Wed", "Fri", "Sat", "Sun"],
  },
  {
    id: 4, name: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha",
    subject: "IELTS English", category: "Languages", level: "Expert", rating: 4.7, reviews: 203,
    price: 900, students: 480, sessions: 2100,
    handle: "sneha_ielts",
    bio: "British Council certified IELTS trainer. Helping students achieve 8.0+ bands through strategic training and personalized guidance.",
    language: "English", location: "Pune, India", joinDate: "April 2018",
    responseTime: "< 1 hour", successRate: "97%", website: "englishwithsneha.com",
    certifications: [
      { title: "British Council Certified", year: "2017", verified: true },
      { title: "IELTS Expert Trainer", year: "2019", verified: true },
      { title: "ESL Methodology Master", year: "2020", verified: false },
    ],
    about: "With 6+ years of IELTS training experience, I've helped 480+ students achieve their target scores. My personalized approach focuses on identifying weak areas and building confidence. I provide detailed feedback on every practice test and mock exam. Your success is my primary motivation.",
    highlights: ["2100+ sessions completed", "480 active students", "97% success rate", "1.5 band average improvement"],
    speaks: ["English", "Hindi", "Gujarati"],
    specialties: ["IELTS Speaking", "IELTS Writing", "Band 7+", "Academic English", "Test Strategy"],
    traits: ["Supportive", "Detailed", "Results-oriented"],
    ratingBreakdown: { clarity: 4.8, preparation: 4.9, punctuality: 4.7, engagement: 4.6 },
    reviews_list: [
      { name: "Priya Nair", avatar: "P", rating: 5, text: "Sneha helped me score 8.5 in IELTS! Highly professional and supportive.", time: "2 weeks ago" },
      { name: "Rohan Desai", avatar: "R", rating: 5, text: "Best IELTS trainer in Pune. Cleared my exam in first attempt!", time: "1 month ago" }
    ],
    education: [
      { degree: "M.A. in English Literature", institution: "University of Pune", year: "2016" },
      { degree: "CELTA Certification", institution: "British Council", year: "2017" },
    ],
    availability: ["Mon", "Tue", "Thu", "Fri", "Sat"],
  },
  {
    id: 5, name: "Vikram Joshi", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram",
    subject: "Physics", category: "Academic", level: "Expert", rating: 4.9, reviews: 156,
    price: 850, students: 290, sessions: 1050,
    handle: "vikram_physics",
    bio: "NEET & JEE Physics specialist. Former faculty at Allen Career Institute. Making physics intuitive through visualization and logic.",
    language: "Hindi", location: "Kota, India", joinDate: "September 2017",
    responseTime: "< 45 mins", successRate: "98%", website: "physicsbyvikram.com",
    certifications: [
      { title: "Allen Career Institute Faculty", year: "2018", verified: true },
      { title: "NEET/JEE Specialist", year: "2020", verified: true },
      { title: "M.Tech Physics", year: "2015", verified: false },
    ],
    about: "I specialize in making complex Physics concepts easy to understand. With my experience at Allen Career Institute, I know exactly what it takes to crack NEET and JEE. My students consistently score 95%+ in Physics because they understand the 'why' behind the equations.",
    highlights: ["1050+ sessions completed", "290 active students", "98% success rate", "Ex-Allen Faculty"],
    speaks: ["Hindi", "English"],
    specialties: ["NEET Physics", "JEE Physics", "Mechanics", "Electromagnetism", "Optics"],
    traits: ["Analytical", "Visual learner-friendly", "Rigorous"],
    ratingBreakdown: { clarity: 4.9, preparation: 5.0, punctuality: 4.8, engagement: 4.9 },
    reviews_list: [
      { name: "Aditya Kumar", avatar: "A", rating: 5, text: "Vikram sir is an amazing Physics teacher. Scored 180/180 in Physics!", time: "3 weeks ago" },
      { name: "Neha Singh", avatar: "N", rating: 5, text: "Best NEET Physics coaching. Highly recommended!", time: "2 months ago" }
    ],
    education: [
      { degree: "M.Tech in Applied Physics", institution: "IIT Bombay", year: "2015" },
      { degree: "Senior Faculty — Physics", institution: "Allen Career Institute", year: "2017–2022" },
    ],
    availability: ["Mon", "Tue", "Wed", "Fri"],
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function StarRow({ count, filled = true }: { count: number; filled?: boolean }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= count ? "#F97316" : "#E5E7EB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function TeacherProfilePage() {
  const [liked, setLiked] = useState(false);
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "credentials" | "reviews">("about");
  const [bookingStep, setBookingStep] = useState<"initial" | "slots" | "confirm">("initial");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState(4);
  const [scrolled, setScrolled] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calBooked, setCalBooked] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m: number, y: number) => new Date(y, m, 1).getDay();
  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); setSelectedDate(null); setSelectedTime(null); setCalBooked(false); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); setSelectedDate(null); setSelectedTime(null); setCalBooked(false); };
  const today = new Date();
  const isToday = (d: number) => d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
  const getDayName = (d: number) => { const dt = new Date(calYear, calMonth, d); return DAYS[dt.getDay() === 0 ? 6 : dt.getDay() - 1]; };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id") || "4");
      setTeacherId(id);
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);

      // Shimmer loading effect
      setTimeout(() => setShimmerLoading(false), 1200);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const teacher = TUTORS.find((t) => t.id === teacherId) || TUTORS[3];

  // Hardcoded teacher availability: days of week (0=Mon, 1=Tue, ..., 6=Sun) + specific off-dates
  const TEACHER_AVAILABILITY: Record<number, { days: number[]; offDates?: string[] }> = {
    2:  { days: [0, 2, 4] },        // Mon, Wed, Fri
    4:  { days: [0, 1, 3, 5] },     // Mon, Tue, Thu, Sat
    5:  { days: [1, 2, 4] },        // Tue, Wed, Fri
    6:  { days: [0, 3, 5, 6] },     // Mon, Thu, Sat, Sun
    8:  { days: [0, 1, 2, 3, 4] },  // Mon-Fri
    9:  { days: [2, 4, 5] },        // Wed, Fri, Sat
    10: { days: [0, 1, 3] },        // Mon, Tue, Thu
    11: { days: [1, 3, 5] },        // Tue, Thu, Sat
    12: { days: [0, 2, 4, 5] },     // Mon, Wed, Fri, Sat
    13: { days: [0, 1, 5, 6] },     // Mon, Tue, Sat, Sun
    14: { days: [1, 2, 3] },        // Tue, Wed, Thu
    15: { days: [0, 3, 4] },        // Mon, Thu, Fri
    16: { days: [0, 2, 5] },        // Mon, Wed, Sat
    17: { days: [1, 3, 4, 5] },     // Tue, Thu, Fri, Sat
    18: { days: [0, 2, 4, 6] },     // Mon, Wed, Fri, Sun
    19: { days: [0, 1, 3] },        // Mon, Tue, Thu
    20: { days: [2, 4, 5] },        // Wed, Fri, Sat
    21: { days: [0, 3, 5, 6] },     // Mon, Thu, Sat, Sun
    22: { days: [1, 2, 4] },        // Tue, Wed, Fri
    23: { days: [0, 1, 5] },        // Mon, Tue, Sat
    24: { days: [0, 1, 2, 3, 4] },  // Mon-Fri
    25: { days: [1, 3, 5] },        // Tue, Thu, Sat
    26: { days: [0, 2, 4, 5] },     // Mon, Wed, Fri, Sat
  };
  const teacherAvail = TEACHER_AVAILABILITY[teacherId] || { days: [0, 1, 2, 3, 4] };
  const isAvailable = (date: number) => {
    const dt = new Date(calYear, calMonth, date);
    const dayOfWeek = (dt.getDay() + 6) % 7; // 0=Mon
    return teacherAvail.days.includes(dayOfWeek);
  };

  const availableSlots = [
    { date: "Apr 7", day: "Mon", time: "10:00 AM", available: true },
    { date: "Apr 7", day: "Mon", time: "2:00 PM", available: true },
    { date: "Apr 8", day: "Tue", time: "11:00 AM", available: true },
    { date: "Apr 8", day: "Tue", time: "5:00 PM", available: false },
    { date: "Apr 9", day: "Wed", time: "9:00 AM", available: true },
    { date: "Apr 9", day: "Wed", time: "4:00 PM", available: true },
  ];

  const accentColor = "#F97316";
  const bgColor = "#FAFAFA";
  const borderColor = "#EBEBEB";
  const cardBg = "#fff";

  const CalendarWidget = ({ compact = false }: { compact?: boolean }) => {
    const sz = compact ? 36 : 42;
    const fs = compact ? 13 : 14;
    const daysInMonth = getDaysInMonth(calMonth, calYear);
    const firstDay = (getFirstDay(calMonth, calYear) + 6) % 7;
    return (
      <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: "8px" }}>
          <Calendar size={16} color={accentColor} />
          <span className="font-matter" style={{ fontSize: 15, fontWeight: 500, color: "#111" }}>Book a Session</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px" }}>
          <div onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#555", border: `1px solid ${borderColor}` }}>
            <ChevronLeft size={18} />
          </div>
          <span className="font-matter" style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{MONTHS[calMonth]} {calYear}</span>
          <div onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#555", border: `1px solid ${borderColor}` }}>
            <ChevronRight size={18} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "4px 10px" }}>
          {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, i) => (
            <div key={i} className="font-matter" style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#aaa", padding: "6px 0", textTransform: "uppercase", letterSpacing: "0.04em" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "0 10px 10px", gap: "4px" }}>
          {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
          {[...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const td = isToday(date);
            const picked = selectedDate === date;
            const isPast = calYear < today.getFullYear() || (calYear === today.getFullYear() && calMonth < today.getMonth()) || (calYear === today.getFullYear() && calMonth === today.getMonth() && date < today.getDate());
            const avail = !isPast && isAvailable(date);
            return (
              <div
                key={date}
                onClick={() => { if (avail && !calBooked) { setSelectedDate(picked ? null : date); setSelectedTime(null); } }}
                className="font-matter"
                style={{
                  height: sz, borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: fs, fontWeight: 500,
                  background: picked ? "#FFF7F0" : td && avail ? "#F9FAFB" : "#FAFAFA",
                  color: picked ? accentColor : td && avail ? "#111" : !avail ? "#CCC" : "#222",
                  border: picked ? `2px solid ${accentColor}` : td && avail ? "2px solid #111" : `1px solid ${borderColor}`,
                  cursor: !avail || calBooked ? "default" : "pointer",
                  opacity: calBooked && !picked ? 0.3 : !avail ? 0.4 : 1,
                  userSelect: "none",
                }}
                onMouseEnter={e => { if (avail && !calBooked && !picked && !td) { e.currentTarget.style.background = "#EEE"; e.currentTarget.style.borderColor = "#CCC"; } }}
                onMouseLeave={e => { if (!picked && !td) { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = borderColor; } }}
              >
                {date}
              </div>
            );
          })}
        </div>
        {selectedDate && !calBooked && (
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${borderColor}` }}>
            <div className="font-matter" style={{ fontSize: 13, color: "#444", marginBottom: "10px", fontWeight: 500 }}>Select time for {MONTHS[calMonth].slice(0, 3)} {selectedDate}, {calYear}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Clock size={16} color="#888" />
              <input
                type="time"
                value={selectedTime || ""}
                onChange={e => setSelectedTime(e.target.value)}
                className="font-matter"
                style={{ flex: 1, height: 42, borderRadius: "10px", border: `1.5px solid ${selectedTime ? "#111" : borderColor}`, padding: "0 14px", fontSize: 15, fontWeight: 600, color: "#111", background: "#FAFAFA", outline: "none", cursor: "pointer" }}
              />
            </div>
            <div onClick={() => { if (selectedTime) setCalBooked(true); }} className="font-matter" style={{ width: "100%", height: 42, borderRadius: "99px", display: "flex", alignItems: "center", justifyContent: "center", background: selectedTime ? accentColor : "#F3F4F6", color: selectedTime ? "#fff" : "#AAA", fontSize: 13, fontWeight: 600, cursor: selectedTime ? "pointer" : "default" }}>Confirm · {MONTHS[calMonth].slice(0, 3)} {selectedDate}, {selectedTime || "pick time"}</div>
          </div>
        )}
        {calBooked && (
          <div style={{ padding: "14px", borderTop: `1px solid ${borderColor}` }}>
            <div style={{ background: "#F0FDF4", borderRadius: "10px", padding: "16px", border: "1px solid #BBF7D0", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: "6px" }}>🎉</div>
              <div className="font-matter" style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>Session Booked!</div>
              <div className="font-matter" style={{ fontSize: 13, color: "#555", marginTop: "6px" }}>{MONTHS[calMonth]} {selectedDate}, {calYear} at {selectedTime}</div>
              <div className="font-matter" style={{ fontSize: 12, color: "#888", marginTop: "4px" }}>with {teacher.name} · {teacher.subject}</div>
              <div className="font-matter" style={{ fontSize: 12, color: "#10B981", fontWeight: 600, marginTop: "8px" }}>✓ Confirmation sent to your email</div>
            </div>
            <div onClick={() => { setCalBooked(false); setSelectedDate(null); setSelectedTime(null); }} className="font-matter" style={{ textAlign: "center", fontSize: 12, color: "#888", cursor: "pointer", marginTop: "10px" }}>Reschedule →</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: bgColor, paddingTop: "80px" }}>
      {/* Skeleton loading */}
      {shimmerLoading && (
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "76px 16px 80px", display: "flex", gap: "24px", justifyContent: "center" }}>
          <div className="tp-skel-left" style={{ width: "320px", flexShrink: 0, display: "none" }}>
            <div className="tp-skel-box" style={{ height: "200px", borderRadius: "16px", marginBottom: "10px" }} />
            <div className="tp-skel-box" style={{ height: "320px", borderRadius: "16px" }} />
          </div>
          <div style={{ flex: 1, maxWidth: "640px" }}>
            <div className="tp-skel-box" style={{ height: "140px", borderRadius: "16px 16px 0 0" }} />
            <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "0 0 16px 16px", padding: "20px" }}>
              <div className="tp-skel-box" style={{ width: 80, height: 80, borderRadius: "50%", marginTop: "-50px", marginBottom: "16px" }} />
              <div className="tp-skel-box" style={{ width: "60%", height: 24, borderRadius: 8, marginBottom: 10 }} />
              <div className="tp-skel-box" style={{ width: "40%", height: 16, borderRadius: 6, marginBottom: 20 }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <div className="tp-skel-box" style={{ width: 80, height: 32, borderRadius: 99 }} />
                <div className="tp-skel-box" style={{ width: 90, height: 32, borderRadius: 99 }} />
              </div>
              <div className="tp-skel-box" style={{ width: "100%", height: 14, borderRadius: 6, marginBottom: 8 }} />
              <div className="tp-skel-box" style={{ width: "90%", height: 14, borderRadius: 6, marginBottom: 8 }} />
              <div className="tp-skel-box" style={{ width: "70%", height: 14, borderRadius: 6, marginBottom: 20 }} />
              <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 20, display: "flex" }}>
                {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, textAlign: "center" }}><div className="tp-skel-box" style={{ width: 40, height: 20, borderRadius: 6, margin: "0 auto 6px" }} /><div className="tp-skel-box" style={{ width: 50, height: 12, borderRadius: 4, margin: "0 auto" }} /></div>)}
              </div>
            </div>
            <div style={{ marginTop: 12, background: "#fff", border: "1px solid #EBEBEB", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", marginBottom: 20 }}>
                {[1,2,3].map(i => <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center" }}><div className="tp-skel-box" style={{ width: 60, height: 16, borderRadius: 6 }} /></div>)}
              </div>
              <div className="tp-skel-box" style={{ width: "100%", height: 14, borderRadius: 6, marginBottom: 10 }} />
              <div className="tp-skel-box" style={{ width: "95%", height: 14, borderRadius: 6, marginBottom: 10 }} />
              <div className="tp-skel-box" style={{ width: "80%", height: 14, borderRadius: 6 }} />
            </div>
          </div>
          <div className="tp-skel-right" style={{ width: "340px", flexShrink: 0, display: "none" }}>
            <div className="tp-skel-box" style={{ height: 180, borderRadius: 16, marginBottom: 24 }} />
            <div className="tp-skel-box" style={{ height: 200, borderRadius: 16, marginBottom: 24 }} />
            <div className="tp-skel-box" style={{ height: 280, borderRadius: 16 }} />
          </div>
        </div>
      )}

      {/* ── STICKY TOP HEADER ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.9)" : "#fff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${borderColor}`,
        display: "none", alignItems: "center", padding: "0 16px", height: "56px",
        transition: "all 0.2s",
      }}>
        <div style={{ maxWidth: "1300px", width: "100%", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => window.location.href = "/find-tutor"}
            style={{ border: "none", background: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <ChevronLeft size={22} color="#111" />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-matter" style={{ fontSize: "16px", fontWeight: 600, color: "#111", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{teacher.name}</div>
            <div className="font-matter" style={{ fontSize: "13px", color: "#666" }}>{teacher.sessions} Sessions · ⭐ {teacher.rating}</div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button style={{ border: `1px solid ${borderColor}`, background: cardBg, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"} onMouseLeave={e => e.currentTarget.style.background = cardBg}>
              <Share2 size={16} color="#555" />
            </button>
            <button style={{ border: `1px solid ${borderColor}`, background: cardBg, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.background = "#F3F4F6"} onMouseLeave={e => e.currentTarget.style.background = cardBg}>
              <MoreHorizontal size={16} color="#555" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "56px 16px 80px", display: "flex", gap: "24px", alignItems: "stretch", justifyContent: "center" }} className="tp-layout">

        {/* ── LEFT: Sticky Video Section (desktop) ── */}
        <div style={{ width: "320px", display: "none", flexShrink: 0, paddingTop: "20px", paddingBottom: "100px", alignSelf: "stretch" }} className="tp-spacer">
          <div style={{ position: "sticky", top: "96px" }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ position: "relative", paddingBottom: "62%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/Ysqu3es1NyE?si=o4sSFMGKLU40xBR5"
                  title={`${teacher.name} - Introduction`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", borderRadius: "16px 16px 0 0" }}
                />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.3 }}>Meet {teacher.name}</div>
                <div className="font-matter" style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>Watch intro video · {teacher.subject} Tutor</div>
              </div>
            </div>

            {/* Schedule Calendar */}
            <div style={{ marginTop: "10px" }}>
              <CalendarWidget />
            </div>
          </div>
        </div>

        {/* ── CENTER COLUMN ── */}
        <div style={{ flex: 1, maxWidth: "640px", minWidth: 0, display: "flex", flexDirection: "column", paddingTop: "20px" }} className="tp-center">

          {/* ─ PROFILE CARD ─ */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>

            {/* Banner */}
            <div className="tp-banner" style={{ height: "140px", background: "#F5F5F5", position: "relative", overflow: "hidden" }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.28) 0%, rgba(249,115,22,0.12) 25%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.22) 0%, transparent 55%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.16) 0%, transparent 55%)', pointerEvents: 'none' }} />
            </div>

            {/* Avatar + Actions row */}
            <div className="tp-profile-card-inner" style={{ padding: "0 20px", position: "relative", marginBottom: "4px" }}>
              {/* Avatar */}
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="tp-profile-avatar"
                style={{ marginTop: "-52px", width: "104px", height: "104px", borderRadius: "50%", background: "#fff", border: "4px solid #fff", objectFit: "cover", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", position: "relative", zIndex: 2, display: "block" }}
              />

              {/* Action buttons - removed from here, moved below name */}

              {/* Name + handle */}
              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <h1 className="font-season-mix tp-profile-name" style={{ margin: 0, fontSize: "28px", fontWeight: 600, color: "#111", lineHeight: 1.2 }}>{teacher.name}</h1>
                  <CheckCircle size={20} fill={accentColor} color="#fff" />
                  <span style={{ background: accentColor, color: "#fff", fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "99px", border: `1px solid ${accentColor}` }} className="font-matter">{teacher.level}</span>
                </div>
                <p className="font-matter" style={{ margin: "6px 0 0", color: "#666", fontSize: "15px", fontWeight: 400 }}>@{teacher.handle} &middot; {teacher.subject} Tutor</p>
              </div>

              {/* Action buttons */}
              <div className="tp-profile-actions" style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                <button
                  onClick={() => setLiked(!liked)}
                  style={{ border: `1.5px solid ${liked ? "#111" : borderColor}`, background: liked ? "#111" : cardBg, color: liked ? "#fff" : "#111", borderRadius: "99px", padding: "0 20px", height: "36px", fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}
                  className="font-matter"
                >
                  {liked ? "Following" : "Follow"}
                </button>
                <button
                  onClick={() => setBookingStep("slots")}
                  className="font-matter"
                  style={{
                    background: "#fff",
                    color: "#111",
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: "99px",
                    padding: "0 20px",
                    height: "36px",
                    fontWeight: 500,
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#FFF7F0";
                    e.currentTarget.style.color = accentColor;
                    e.currentTarget.style.borderColor = accentColor;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#111";
                    e.currentTarget.style.borderColor = borderColor;
                  }}
                >
                  Book Trial
                </button>
              </div>

              {/* Short bio */}
              <p className="font-matter tp-bio-text" style={{ marginTop: "16px", color: "#555", fontSize: "15px", lineHeight: 1.6, margin: "16px 0 16px" }}>
                {teacher.bio}
              </p>

              {/* Meta chips */}
              <div className="tp-meta-chips" style={{ display: "flex", flexWrap: "wrap", gap: "16px", color: "#666", fontSize: "14px", marginBottom: "16px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }} className="font-matter"><MapPin size={16} /> {teacher.location}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }} className="font-matter"><Clock size={16} /> Responds {teacher.responseTime}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }} className="font-matter"><Calendar size={16} /> Joined {teacher.joinDate}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }} className="font-matter"><LinkIcon size={16} color={accentColor} /><span style={{ color: accentColor }}>{teacher.website}</span></span>
              </div>

              {/* Stats bar */}
              <div className="tp-stats-bar" style={{ display: "flex", gap: "0", borderTop: `1px solid ${borderColor}`, margin: "0 -20px", padding: "20px 20px" }}>
                {[
                  { label: "Students", value: teacher.students },
                  { label: "Sessions", value: teacher.sessions },
                  { label: "Reviews", value: teacher.reviews },
                  { label: "Rating", value: teacher.rating },
                ].map((stat, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? `1px solid ${borderColor}` : "none" }}>
                    <div className="font-matter tp-stat-value" style={{ fontWeight: 600, fontSize: "18px", color: "#111" }}>{i === 3 ? `⭐ ${stat.value}` : stat.value.toLocaleString()}</div>
                    <div className="font-matter" style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trait pills */}
            <div style={{ padding: "16px 20px", borderTop: `1px solid ${borderColor}`, display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {teacher.traits.map((t, i) => (
                <span key={i} className="font-matter" style={{ background: "#F3F4F6", color: "#555", fontSize: "13px", fontWeight: 500, padding: "6px 14px", borderRadius: "99px", border: `1px solid ${borderColor}` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ─ MOBILE VIDEO (hidden on desktop) ─ */}
          <div className="tp-mobile-video" style={{ marginBottom: "12px" }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/Ysqu3es1NyE?si=o4sSFMGKLU40xBR5"
                  title={`${teacher.name} - Introduction`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", borderRadius: "14px 14px 0 0" }}
                />
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>Meet {teacher.name}</div>
                <div className="font-matter" style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>Watch intro video · {teacher.subject} Tutor</div>
              </div>
            </div>
          </div>

          {/* ─ TABS ─ */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
            <div className="tp-tab-bar" style={{ display: "flex", borderBottom: `1px solid ${borderColor}` }}>
              {[
                { id: "about", label: "About" },
                { id: "credentials", label: "Credentials" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="font-matter tp-tab-btn"
                  style={{
                    flex: 1, padding: "16px 0", border: "none", background: "none", cursor: "pointer",
                    fontSize: "15px", fontWeight: activeTab === tab.id ? 500 : 400,
                    color: activeTab === tab.id ? "#111" : "#666", position: "relative", transition: "0.15s",
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "#F9FAFB"; }}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "40px", height: "3px", background: "#111", borderRadius: "2px" }} />
                  )}
                </button>
              ))}
            </div>

            {/* ─ TAB CONTENT ─ */}
            <div style={{ padding: "24px" }}>

              {/* ──── ABOUT TAB ──── */}
              {activeTab === "about" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                  {/* About me */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 600, color: "#111" }}>About me</h3>
                    <p className="font-matter" style={{ margin: 0, fontSize: "15px", color: "#555", lineHeight: 1.6 }}>
                      {showFullAbout ? teacher.about : teacher.about.slice(0, 180) + (teacher.about.length > 180 ? "..." : "")}
                    </p>
                    {teacher.about.length > 180 && (
                      <button className="font-matter" onClick={() => setShowFullAbout(!showFullAbout)} style={{ background: "none", border: "none", color: accentColor, fontSize: "14px", fontWeight: 500, marginTop: "8px", cursor: "pointer", padding: 0 }}>
                        {showFullAbout ? "Show less" : "Read more →"}
                      </button>
                    )}
                  </section>

                  {/* Specialties */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 600, color: "#111", display: "flex", alignItems: "center", gap: "8px" }}>
                      <BookOpen size={18} color={accentColor} /> Specialties
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {teacher.specialties.map((s, i) => (
                        <span key={i} className="font-matter" style={{ background: "#FFF7F0", color: accentColor, fontSize: "14px", fontWeight: 500, padding: "8px 16px", borderRadius: "99px", border: `1px solid #F97316` }}>{s}</span>
                      ))}
                    </div>
                  </section>

                  {/* Languages spoken */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 600, color: "#111", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Languages size={18} color={accentColor} /> I speak
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {teacher.speaks.map((lang, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", minWidth: "100px" }}>{lang}</span>
                          <span className="font-matter" style={{ fontSize: "13px", color: "#666" }}>{i === 0 ? "Native / Fluent" : "Conversational"}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Quick highlights grid */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 600, color: "#111" }}>Quick highlights</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {teacher.highlights.map((h, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#F9FAFB", padding: "14px", borderRadius: "12px", border: `1px solid ${borderColor}` }}>
                          <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span className="font-matter" style={{ fontSize: "14px", fontWeight: 500, color: "#555", lineHeight: 1.4 }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ──── CREDENTIALS TAB ──── */}
              {activeTab === "credentials" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Education timeline */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600, color: "#111" }}>Education & Experience</h3>
                    <div style={{ position: "relative", paddingLeft: "28px" }}>
                      <div style={{ position: "absolute", left: "10px", top: 0, bottom: 0, width: "2px", background: borderColor }} />
                      {teacher.education.map((edu, i) => (
                        <div key={i} style={{ position: "relative", marginBottom: i < teacher.education.length - 1 ? "24px" : 0 }}>
                          <div style={{ position: "absolute", left: "-22px", top: "8px", width: "14px", height: "14px", borderRadius: "50%", background: accentColor, border: "3px solid #fff", boxShadow: "0 0 0 2px " + accentColor }} />
                          <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", lineHeight: 1.4 }}>{edu.degree}</div>
                          <div className="font-matter" style={{ fontSize: "14px", color: "#666", marginTop: "2px" }}>{edu.institution} · {edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Certifications */}
                  <section>
                    <h3 className="font-matter" style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600, color: "#111" }}>Certifications</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {teacher.certifications.map((cert, i) => (
                        <div key={i} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "16px 18px", borderRadius: "12px", border: `1px solid ${borderColor}`, background: "#FAFAFA" }}>
                          <div style={{ background: "#EFF6FF", padding: "10px", borderRadius: "10px", flexShrink: 0 }}>
                            <Award size={22} color="#3B82F6" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className="font-matter" style={{ fontWeight: 500, color: "#111", fontSize: "15px", lineHeight: 1.3 }}>{cert.title}</div>
                            <div className="font-matter" style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>{cert.year}</div>
                          </div>
                          {cert.verified && (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#F0FDF4", padding: "6px 12px", borderRadius: "99px" }}>
                              <ShieldCheck size={14} color="#16A34A" />
                              <span className="font-matter" style={{ fontSize: "12px", color: "#16A34A", fontWeight: 500 }}>Verified</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ──── REVIEWS TAB ──── */}
              {activeTab === "reviews" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Overall rating */}
                  <div style={{ background: "#FFFBF2", borderRadius: "16px", padding: "20px 24px", border: "1px solid #FDE68A" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
                      <div style={{ textAlign: "center" }}>
                        <div className="font-matter" style={{ fontSize: "42px", fontWeight: 600, color: "#111", lineHeight: 1 }}>{teacher.rating}</div>
                        <StarRow count={Math.round(teacher.rating)} />
                        <div className="font-matter" style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>{teacher.reviews} reviews</div>
                      </div>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        {Object.entries(teacher.ratingBreakdown).map(([key, val]) => (
                          <div key={key} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                            <span className="font-matter" style={{ fontSize: "13px", color: "#666", minWidth: "100px", textTransform: "capitalize" }}>{key}</span>
                            <div style={{ flex: 1, height: "6px", background: "#F3F4F6", borderRadius: "99px" }}>
                              <div style={{ width: `${((val as number) / 5) * 100}%`, height: "100%", background: accentColor, borderRadius: "99px" }} />
                            </div>
                            <span className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{val as number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual reviews */}
                  {teacher.reviews_list.map((rev, i) => (
                    <div key={i} style={{ padding: "18px", border: `1px solid ${borderColor}`, borderRadius: "16px", background: cardBg }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: "16px", color: "#555", border: `1px solid ${borderColor}`, flexShrink: 0 }}>{rev.name.charAt(0)}</div>
                          <div>
                            <div className="font-matter" style={{ fontWeight: 500, fontSize: "15px", color: "#111" }}>{rev.name}</div>
                            <StarRow count={rev.rating} />
                          </div>
                        </div>
                        <div className="font-matter" style={{ fontSize: "13px", color: "#999" }}>{rev.time}</div>
                      </div>
                      <p className="font-matter" style={{ margin: 0, fontSize: "15px", color: "#555", lineHeight: 1.6 }}>"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─ BOOKING PANEL (mobile only) ─ */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "14px", marginBottom: "12px", overflow: "hidden" }} className="tp-mobile-book">
            <div
              onClick={() => !calBooked && setShowMobileBooking(!showMobileBooking)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "18px 20px", cursor: "pointer" }}
            >
              <div>
                <div className="font-matter" style={{ fontSize: "20px", fontWeight: 600, color: "#111" }}>{"\u20B9"}{teacher.price}<span style={{ fontSize: "15px", fontWeight: 400, color: "#666" }}>/hr</span></div>
                <div className="font-matter" style={{ fontSize: "13px", color: "#666" }}>Free trial · Next available today</div>
              </div>
              <div
                className="font-matter"
                style={{
                  background: showMobileBooking ? accentColor : "#fff",
                  color: showMobileBooking ? "#fff" : "#111",
                  border: `1.5px solid ${showMobileBooking ? accentColor : borderColor}`,
                  borderRadius: "99px",
                  padding: "0 28px",
                  height: "46px",
                  fontWeight: 500,
                  fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {calBooked ? "✓ Booked" : showMobileBooking ? "Close" : "Book Trial"}
              </div>
            </div>
            {showMobileBooking && !calBooked && (
              <div style={{ padding: "0 16px 16px", animation: "fadeIn 0.2s ease" }}>
                <CalendarWidget />
              </div>
            )}
            {calBooked && (
              <div style={{ padding: "0 16px 16px" }}>
                <div style={{ background: "#F0FDF4", borderRadius: "10px", padding: "14px", border: "1px solid #BBF7D0", textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: "4px" }}>🎉</div>
                  <div className="font-matter" style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>Session Booked!</div>
                  <div className="font-matter" style={{ fontSize: 13, color: "#555", marginTop: "6px" }}>{MONTHS[calMonth]} {selectedDate}, {calYear} at {selectedTime}</div>
                  <div className="font-matter" style={{ fontSize: 12, color: "#888", marginTop: "4px" }}>with {teacher.name} · {teacher.subject}</div>
                  <div className="font-matter" style={{ fontSize: 12, color: "#10B981", fontWeight: 600, marginTop: "8px" }}>✓ Confirmation sent to your email</div>
                </div>
                <div onClick={() => { setCalBooked(false); setSelectedDate(null); setSelectedTime(null); setShowMobileBooking(true); }} className="font-matter" style={{ textAlign: "center", fontSize: 12, color: "#888", cursor: "pointer", marginTop: "10px" }}>Reschedule →</div>
              </div>
            )}
          </div>

          {/* ─ NOT A MATCH section ─ */}
          <div style={{ background: "#FAFAFA", border: `1px solid ${borderColor}`, borderRadius: "16px", overflow: "hidden", marginBottom: "100px", position: "relative" }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 65% at 50% 110%, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.05) 25%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 20% 100%, rgba(139,92,246,0.08) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 55% at 80% 100%, rgba(59,130,246,0.06) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${borderColor}`, position: "relative", zIndex: 1 }}>
              <span className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>Similar tutors you may like</span>
            </div>
            {TUTORS.filter(t => t.id !== teacher.id).slice(0, 3).map((t, idx) => (
              <div
                key={t.id}
                style={{ padding: "16px 20px", borderBottom: idx < 2 ? `1px solid ${borderColor}` : "none", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", transition: "background 0.15s", position: "relative", zIndex: 1 }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                onClick={() => window.location.href = `/teacher-profile?id=${t.id}`}
              >
                <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="font-matter" style={{ fontSize: "14px", fontWeight: 500, color: "#111" }}>{t.name}</span>
                    <CheckCircle size={13} fill={accentColor} color="#fff" />
                  </div>
                  <div className="font-matter" style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>{t.subject} {"\u00B7"} {"\u20B9"}{t.price}/hr {"\u00B7"} {"\u2B50"} {t.rating}</div>
                </div>
                <button
                  className="font-matter"
                  style={{ flexShrink: 0, padding: "7px 16px", borderRadius: "99px", border: `1px solid ${borderColor}`, background: "#fff", fontSize: "12px", fontWeight: 500, color: "#111", cursor: "pointer", transition: "all 0.2s" }}
                  onClick={e => { e.stopPropagation(); window.location.href = `/teacher-profile?id=${t.id}`; }}
                  onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = accentColor; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = borderColor; }}
                >View</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (desktop only) - STICKY & INDEPENDENTLY SCROLLABLE ── */}
        <aside 
          className="tp-sidebar" 
          style={{ 
            width: "340px", 
            flexShrink: 0, 
            position: "sticky",
            top: "96px",
            alignSelf: "flex-start",
            display: "none", 
            flexDirection: "column", 
            gap: "24px",
            paddingTop: "20px",
            paddingBottom: "20px",
            maxHeight: "calc(100vh - 116px)",
            overflowY: "auto"
          }}
        >
          {/* Inner content wrapper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Booking Card */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", padding: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                <span className="font-matter" style={{ fontSize: "20px", fontWeight: 600, color: "#111" }}>{"\u20B9"}{teacher.price}</span>
                <span className="font-matter" style={{ fontSize: "13px", color: "#888" }}>/ 60-min lesson</span>
              </div>
              <div className="font-matter" style={{ fontSize: "12px", color: "#10B981", fontWeight: 500, marginBottom: "16px" }}>{"\u2713"} Free trial available</div>

              {bookingStep === "initial" ? (
                <>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const isLoggedIn = localStorage.getItem('studentLoggedIn') === 'true' && localStorage.getItem('studentEmail');
                        if (isLoggedIn) {
                          setBookingStep("slots");
                        } else {
                          window.location.href = `/student-signup?redirect=${encodeURIComponent(window.location.href)}`;
                        }
                      }
                    }}
                    className="font-matter"
                    style={{ width: "100%", height: "42px", borderRadius: "99px", background: "#fff", color: "#111", fontWeight: 500, fontSize: "14px", border: `1.5px solid ${borderColor}`, cursor: "pointer", marginBottom: "10px", transition: "all 0.2s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#FFF7F0"; e.currentTarget.style.color = accentColor; e.currentTarget.style.borderColor = accentColor; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = borderColor; }}
                  >Book Trial Lesson</button>
                  <p className="font-matter" style={{ fontSize: "11px", color: "#AAA", textAlign: "center", marginTop: "10px" }}>You won't be charged until you confirm</p>
                </>
              ) : bookingStep === "slots" ? (
                <div style={{ animation: "fadeIn 0.25s ease" }}>
                  <div className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#111", marginBottom: "10px" }}>Pick a slot</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "14px" }}>
                    {availableSlots.map((slot, i) => (
                      <button key={i} disabled={!slot.available} onClick={() => setSelectedSlot(`${slot.day} ${slot.time}`)} className="font-matter"
                        style={{ padding: "10px 6px", borderRadius: "10px", border: selectedSlot === `${slot.day} ${slot.time}` ? `2px solid ${accentColor}` : `1px solid ${borderColor}`, background: selectedSlot === `${slot.day} ${slot.time}` ? "#FFF7F0" : cardBg, fontSize: "12px", cursor: slot.available ? "pointer" : "default", opacity: slot.available ? 1 : 0.4, transition: "all 0.15s" }}>
                        <div style={{ fontWeight: 500, color: "#111" }}>{slot.day}</div>
                        <div style={{ color: "#888", marginTop: "2px" }}>{slot.time}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setBookingStep("initial")} className="font-matter" style={{ flex: 1, height: "38px", borderRadius: "99px", border: `1px solid ${borderColor}`, background: cardBg, fontWeight: 500, fontSize: "13px", cursor: "pointer" }}>Back</button>
                    <button onClick={() => selectedSlot && setBookingStep("confirm")} disabled={!selectedSlot} className="font-matter" style={{ flex: 2, height: "38px", borderRadius: "99px", background: selectedSlot ? "#111" : "#F3F4F6", color: selectedSlot ? "#fff" : "#999", border: "none", fontWeight: 500, fontSize: "13px", cursor: selectedSlot ? "pointer" : "default" }}>Continue</button>
                  </div>
                </div>
              ) : (
                <div style={{ animation: "fadeIn 0.25s ease" }}>
                  <div style={{ padding: "12px 14px", borderRadius: "10px", border: `1px solid ${borderColor}`, background: "#F9FAFB", marginBottom: "14px" }}>
                    <div className="font-matter" style={{ fontSize: "11px", color: "#888" }}>Selected slot</div>
                    <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", marginTop: "2px" }}>{selectedSlot}</div>
                  </div>
                  <button onClick={() => alert("Trial lesson booked!")} className="font-matter" style={{ width: "100%", height: "44px", borderRadius: "99px", background: "#10B981", color: "#fff", fontWeight: 500, fontSize: "14px", border: "none", cursor: "pointer" }}>Confirm Booking</button>
                  <button onClick={() => setBookingStep("slots")} className="font-matter" style={{ width: "100%", background: "none", border: "none", color: "#888", marginTop: "10px", cursor: "pointer", fontSize: "12px" }}>Choose another time</button>
                </div>
              )}
            </div>

            {/* Quick stats card */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", padding: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111", marginBottom: "12px" }}>Quick stats</div>
              {[
                { icon: <TrendingUp size={14} color={accentColor} />, label: "Success rate", value: teacher.successRate },
                { icon: <Clock size={14} color={accentColor} />, label: "Response time", value: teacher.responseTime },
                { icon: <Video size={14} color={accentColor} />, label: "Sessions taught", value: `${teacher.sessions}+` },
                { icon: <Star size={14} color={accentColor} fill={accentColor} />, label: "Avg. rating", value: `${teacher.rating} / 5.0` },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${borderColor}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.icon}
                    <span className="font-matter" style={{ fontSize: "13px", color: "#666" }}>{item.label}</span>
                  </div>
                  <span className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Today's Blogs */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${borderColor}` }}>
                <span className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>Today's Blogs</span>
              </div>
              {[
                { title: "How I Cracked JEE in 6 Months", author: "Aarav Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav", time: "2h ago" },
                { title: "Why Every Student Should Learn Python in 2025", author: "Priya Menon", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya", time: "5h ago" },
                { title: "The Secret to Mastering Any Musical Instrument", author: "Ravi Kumar", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi", time: "8h ago" },
                { title: "Tips for Staying Motivated During Exam Season", author: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha", time: "10h ago" },
              ].map((blog, idx) => (
                <div key={idx} style={{ padding: "14px 16px", borderBottom: idx < 3 ? `1px solid ${borderColor}` : "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <img src={blog.avatar} alt={blog.author} style={{ width: 20, height: 20, borderRadius: "50%" }} />
                    <span className="font-matter" style={{ fontSize: "12px", fontWeight: 500, color: "#111" }}>{blog.author}</span>
                    <span className="font-matter" style={{ fontSize: "11px", color: "#bbb" }}>{blog.time}</span>
                  </div>
                  <p className="font-matter" style={{ fontSize: "14px", fontWeight: 400, color: "#111", margin: 0, lineHeight: 1.5 }}>{blog.title}</p>
                </div>
              ))}
              <div style={{ padding: "10px 16px" }}>
                <button className="font-matter" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: accentColor, fontWeight: 500 }}>{"Show more \u2192"}</button>
              </div>
            </div>

            {/* Top Tutors Leaderboard */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "16px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: "6px" }}>
                <Star size={16} color={accentColor} fill={accentColor} />
                <span className="font-matter" style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>Top Tutors</span>
              </div>
              {[
                { rank: 1, name: "Ravi Kumar", subject: "Guitar", students: 156, rating: 5, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi" },
                { rank: 2, name: "Aarav Sharma", subject: "Mathematics", students: 342, rating: 4.9, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav" },
                { rank: 3, name: "Vikram Joshi", subject: "Physics", students: 290, rating: 4.9, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram" },
                { rank: 4, name: "Sneha Patel", subject: "IELTS English", students: 480, rating: 4.7, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha" },
              ].map((t, idx) => (
                <div key={idx} style={{ padding: "14px 16px", borderBottom: idx < 3 ? `1px solid ${borderColor}` : "none", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: idx === 0 ? "#F59E0B" : idx === 1 ? "#9CA3AF" : idx === 2 ? "#CD7F32" : "#F97316", width: "24px", textAlign: "center" }}>#{t.rank}</span>
                    <img src={t.avatar} alt={t.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${borderColor}` }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-matter" style={{ fontSize: "14px", fontWeight: 500, color: "#111", lineHeight: 1.3 }}>{t.name}</div>
                    <div className="font-matter" style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{t.subject} {"\u00B7"} {t.students} students</div>
                  </div>
                  <div className="font-matter" style={{ fontSize: "13px", fontWeight: 500, color: "#F97316", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Star size={12} color="#F97316" fill="#F97316" /> {t.rating}
                  </div>
                </div>
              ))}
              <div style={{ padding: "10px 16px" }}>
                <button className="font-matter" onClick={() => window.location.href = "/find-tutor"} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: accentColor, fontWeight: 500 }}>{"View all rankings \u2192"}</button>
              </div>
            </div>

          </div>
        </aside>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        .tp-spacer { display: none; }
        .tp-sidebar { display: none !important; }
        .tp-mobile-book { display: block; }
        .tp-mobile-video { display: block; }

        /* Desktop */
        @media (min-width: 1024px) {
          .tp-spacer { display: block !important; width: 320px !important; }
          .tp-sidebar { display: flex !important; }
          .tp-mobile-book { display: none !important; }
          .tp-mobile-video { display: none !important; }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .tp-layout { padding: 40px 12px 60px !important; gap: 12px !important; }
          .tp-center { max-width: 100% !important; }
          .tp-profile-actions { position: relative !important; top: auto !important; right: auto !important; margin-top: 12px; }
          .tp-profile-name { font-size: 22px !important; }
          .tp-profile-avatar { width: 80px !important; height: 80px !important; margin-top: -40px !important; }
          .tp-banner { height: 110px !important; }
          .tp-stats-bar { flex-wrap: wrap !important; }
          .tp-stats-bar > div { flex: 1 1 45% !important; border-right: none !important; padding: 10px 0 !important; }
          .tp-meta-chips { font-size: 13px !important; gap: 10px !important; }
          .tp-bio-text { font-size: 14px !important; }
          .tp-tab-btn { font-size: 13px !important; padding: 12px 14px !important; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .tp-layout { padding: 24px 8px 40px !important; gap: 8px !important; }
          .tp-profile-actions { flex-direction: column !important; gap: 6px !important; width: 100% !important; }
          .tp-profile-actions button { width: 100% !important; }
          .tp-profile-name { font-size: 20px !important; }
          .tp-profile-avatar { width: 72px !important; height: 72px !important; margin-top: -36px !important; border-width: 3px !important; }
          .tp-banner { height: 90px !important; }
          .tp-profile-card-inner { padding: 0 14px !important; }
          .tp-stats-bar { margin: 0 -14px !important; padding: 14px 14px !important; gap: 4px !important; }
          .tp-stats-bar > div { flex: 1 1 45% !important; border-right: none !important; }
          .tp-stat-value { font-size: 16px !important; }
          .tp-meta-chips { font-size: 12px !important; gap: 8px !important; flex-direction: column !important; }
          .tp-bio-text { font-size: 13px !important; }
          .tp-tab-btn { font-size: 12px !important; padding: 10px 10px !important; }
          .tp-tab-bar { overflow-x: auto !important; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .tp-tab-bar::-webkit-scrollbar { display: none; }
          .tp-section-card { padding: 14px !important; }
          .tp-section-title { font-size: 16px !important; }
        }

        @keyframes shimmerPulse {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .tp-skel-box {
          background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 37%, #F3F4F6 63%);
          background-size: 200% 100%;
          animation: shimmerPulse 1.5s ease infinite;
        }
        @media (min-width: 1024px) {
          .tp-skel-left { display: block !important; }
          .tp-skel-right { display: block !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .font-season-mix { font-family: 'Season Mix', serif; }
        .font-matter { font-family: 'Matter', sans-serif; }
        .tp-sidebar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}