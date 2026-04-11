import { useState } from 'react';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { PointerHighlight } from '@/components/ui/pointer-highlight';

type Topic = { name: string; subject: string; color: string };

// ── Actual learning topics students will learn ─────────────────────────────
const CATEGORIES: Record<string, { row1: Topic[]; row2: Topic[] }> = {
  'Academic': {
    row1: [
      { name: 'Calculus & Derivatives',     subject: 'Maths',      color: '#6366F1' },
      { name: 'Organic Chemistry',          subject: 'Chemistry',  color: '#10B981' },
      { name: 'Thermodynamics',             subject: 'Physics',    color: '#3B82F6' },
      { name: 'Cell Biology & Genetics',    subject: 'Biology',    color: '#22C55E' },
      { name: 'Indian Freedom Movement',    subject: 'History',    color: '#A855F7' },
      { name: 'Linear Algebra',             subject: 'Maths',      color: '#6366F1' },
      { name: 'Climate & Weather Systems',  subject: 'Geography',  color: '#14B8A6' },
    ],
    row2: [
      { name: 'Probability & Statistics',   subject: 'Maths',      color: '#8B5CF6' },
      { name: 'Demand & Supply Analysis',   subject: 'Economics',  color: '#F59E0B' },
      { name: 'Double Entry Bookkeeping',   subject: 'Accountancy',color: '#EF4444' },
      { name: 'Data Structures & Algorithms',subject: 'CS',        color: '#6366F1' },
      { name: 'The Indian Constitution',    subject: 'Pol. Sci.',  color: '#8B5CF6' },
      { name: 'Periodic Table & Bonding',   subject: 'Chemistry',  color: '#10B981' },
      { name: 'Electromagnetic Waves',      subject: 'Physics',    color: '#3B82F6' },
    ],
  },
  'Coding & AI': {
    row1: [
      { name: 'Python for Beginners',       subject: 'Python',     color: '#3B82F6' },
      { name: 'React & Component Design',   subject: 'JavaScript', color: '#EAB308' },
      { name: 'Neural Networks from Scratch',subject: 'ML',        color: '#8B5CF6' },
      { name: 'SQL Joins & Queries',        subject: 'Databases',  color: '#F59E0B' },
      { name: 'REST API Development',       subject: 'Backend',    color: '#F97316' },
      { name: 'Git & Version Control',      subject: 'DevOps',     color: '#EF4444' },
    ],
    row2: [
      { name: 'Object-Oriented Programming',subject: 'Java',       color: '#EF4444' },
      { name: 'Pandas & Data Wrangling',    subject: 'Data Sci.',  color: '#6366F1' },
      { name: 'CSS Grid & Flexbox',         subject: 'Frontend',   color: '#06B6D4' },
      { name: 'TensorFlow & Keras',         subject: 'Deep Learning',color: '#A855F7' },
      { name: 'Flutter Mobile Apps',        subject: 'App Dev',    color: '#10B981' },
      { name: 'Linux & Shell Scripting',    subject: 'Sysadmin',   color: '#3B82F6' },
    ],
  },
  'Music & Dance': {
    row1: [
      { name: 'Fingerstyle Guitar',         subject: 'Guitar',     color: '#F97316' },
      { name: 'Sight Reading & Scales',     subject: 'Piano',      color: '#6366F1' },
      { name: 'Raga Fundamentals',          subject: 'Vocal',      color: '#EC4899' },
      { name: 'Bowing Techniques',          subject: 'Violin',     color: '#8B5CF6' },
      { name: 'Rhythm & Beat Patterns',     subject: 'Drums',      color: '#EF4444' },
      { name: 'Taal & Composition',         subject: 'Tabla',      color: '#F59E0B' },
    ],
    row2: [
      { name: 'Adavus & Mudras',            subject: 'Bharatanatyam',color: '#D946EF' },
      { name: 'Kathak Tatkaar',             subject: 'Kathak',     color: '#EC4899' },
      { name: 'Popping & Locking',          subject: 'Hip Hop',    color: '#3B82F6' },
      { name: 'Ableton & FL Studio',        subject: 'Production', color: '#14B8A6' },
      { name: 'Carnatic Notation',          subject: 'Flute',      color: '#10B981' },
      { name: 'Sargam & Alankaar',          subject: 'Classical',  color: '#A855F7' },
    ],
  },
  'Languages': {
    row1: [
      { name: 'IELTS Writing Task 2',       subject: 'English',    color: '#3B82F6' },
      { name: 'Hindi Vyakaran & Sahitya',   subject: 'Hindi',      color: '#F97316' },
      { name: 'French Conversational A2',   subject: 'French',     color: '#EF4444' },
      { name: 'Spanish Verb Conjugation',   subject: 'Spanish',    color: '#F59E0B' },
      { name: 'German Grammar B1',          subject: 'German',     color: '#6366F1' },
      { name: 'JLPT N5 Kanji',             subject: 'Japanese',   color: '#EC4899' },
    ],
    row2: [
      { name: 'HSK Level 3 Vocabulary',     subject: 'Mandarin',   color: '#EF4444' },
      { name: 'Hangul & Basic Sentences',   subject: 'Korean',     color: '#8B5CF6' },
      { name: 'Sanskrit Shloka Reading',    subject: 'Sanskrit',   color: '#F59E0B' },
      { name: 'Arabic Script & Basics',     subject: 'Arabic',     color: '#10B981' },
      { name: 'Tamil Prose & Poetry',       subject: 'Tamil',      color: '#D946EF' },
      { name: 'Business English Speaking',  subject: 'English',    color: '#3B82F6' },
    ],
  },
  'Exams': {
    row1: [
      { name: 'JEE Coordinate Geometry',    subject: 'JEE',        color: '#6366F1' },
      { name: 'NEET Human Physiology',      subject: 'NEET',       color: '#10B981' },
      { name: 'UPSC Modern History',        subject: 'UPSC',       color: '#F59E0B' },
      { name: 'CAT Quantitative Aptitude',  subject: 'CAT',        color: '#3B82F6' },
      { name: 'CLAT Legal Reasoning',       subject: 'CLAT',       color: '#8B5CF6' },
      { name: 'SAT Critical Reading',       subject: 'SAT',        color: '#EF4444' },
    ],
    row2: [
      { name: 'GATE Signal Processing',     subject: 'GATE',       color: '#3B82F6' },
      { name: 'IELTS Listening Practice',   subject: 'IELTS',      color: '#14B8A6' },
      { name: 'NDA Maths & GAT',            subject: 'NDA',        color: '#F97316' },
      { name: 'CA Accounting Standards',    subject: 'CA',         color: '#F59E0B' },
      { name: 'Olympiad Number Theory',     subject: 'Olympiad',   color: '#A855F7' },
      { name: 'CUET English & GK',          subject: 'CUET',       color: '#EC4899' },
    ],
  },
};

const TABS = Object.keys(CATEGORIES);

// ── Topic Chip ─────────────────────────────────────────────────────────────
function TopicChip({
  topic,
  onEnter,
  onLeave,
}: {
  topic: Topic;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      style={{
        position: 'relative',
        zIndex: hovered ? 20 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 26px',
        borderRadius: '9999px',
        border: `1px solid ${hovered ? '#D1D5DB' : 'rgba(0,0,0,0.06)'}`,
        background: hovered ? '#fff' : '#FAFAFA',
        cursor: 'none',
        userSelect: 'none',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition:
          'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Colored dot */}
      <span
        style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          flexShrink: 0,
          background: topic.color,
        }}
      />
      {/* Topic name */}
      <span
        style={{
          fontFamily: 'Matter, sans-serif',
          fontSize: '14.5px',
          fontWeight: 500,
          lineHeight: 1,
          color: '#1F2937',
        }}
      >
        {topic.name}
      </span>
      {/* Subject tag */}
      <span
        style={{
          fontFamily: 'Matter, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          lineHeight: 1,
          color: '#9CA3AF',
          paddingLeft: '2px',
        }}
      >
        {topic.subject}
      </span>
    </div>
  );
}

// ── Marquee Row ────────────────────────────────────────────────────────────
function MarqueeRow({
  topics,
  direction,
  paused,
  onEnter,
  onLeave,
  speed = 46,
}: {
  topics: Topic[];
  direction: 'left' | 'right';
  paused: boolean;
  onEnter: () => void;
  onLeave: () => void;
  speed?: number;
}) {
  const anim = direction === 'left' ? 'hgMqL' : 'hgMqR';

  return (
    <div
      style={{
        position: 'relative',
        overflowX: 'clip' as any,
        overflowY: 'visible',
        width: '100%',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          background:
            'linear-gradient(to right, #fafafa 0%, transparent 7%, transparent 93%, #fafafa 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          width: 'fit-content',
          animation: `${anim} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {[...topics, ...topics].map((t, i) => (
          <TopicChip
            key={`${t.name}-${i}`}
            topic={t}
            onEnter={onEnter}
            onLeave={onLeave}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function PlaygroundShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);

  const currentCat = CATEGORIES[TABS[activeTab]];

  return (
    <section style={{ position: 'relative', width: '100%', padding: '80px 0' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          margin: '0 auto',
          width: '90%',
          maxWidth: '1400px',
        }}
      >
        {/* ── Heading ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
          <h2
            style={{
              fontFamily: "'Season Mix', sans-serif",
              fontSize: 'clamp(30px, 4vw, 44px)',
              color: '#111',
              lineHeight: 1.15,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            What Can You{' '}
            <PointerHighlight
              rectangleClassName="border-orange-400"
              pointerClassName="text-orange-400"
              containerClassName="inline-block"
            >
              <span style={{ color: '#F97316', position: 'relative', zIndex: 10 }}>Learn?</span>
            </PointerHighlight>
          </h2>
          <p style={{ fontFamily: 'Matter, sans-serif', fontSize: '15px', color: '#9CA3AF', margin: 0, lineHeight: 1.65, maxWidth: '480px' }}>
            Real topics, real tutors — explore what students are learning right now.
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div
          className="hg-tabs-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F3F3F3',
            borderRadius: '9999px',
            padding: '4px',
            gap: '2px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            maxWidth: '100%',
          }}
        >
          {TABS.map((tab, i) => {
            const active = activeTab === i;
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(i); setIsHovering(false); }}
                style={{
                  flexShrink: 0,
                  padding: '9px 22px',
                  borderRadius: '9999px',
                  fontFamily: 'Matter, sans-serif',
                  fontWeight: active ? 600 : 400,
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                  background: active ? '#fff' : 'transparent',
                  color: active ? '#111' : '#888',
                  boxShadow: active ? '0 1px 6px rgba(0,0,0,0.10)' : 'none',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── Marquee Content ── */}
        <div style={{ width: '100%' }}>
          <FollowerPointerCard title="Explore" key={activeTab}>
            <div
              onMouseLeave={handleLeave}
              style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%' }}
            >
              <MarqueeRow
                topics={currentCat.row1}
                direction="left"
                paused={isHovering}
                onEnter={handleEnter}
                onLeave={handleLeave}
                speed={50}
              />
              <MarqueeRow
                topics={currentCat.row2}
                direction="right"
                paused={isHovering}
                onEnter={handleEnter}
                onLeave={handleLeave}
                speed={42}
              />
            </div>
          </FollowerPointerCard>
        </div>
      </div>

      <style>{`
        .hg-tabs-scroll::-webkit-scrollbar {
          display: none;
        }
        .hg-tabs-scroll {
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        @keyframes hgMqL {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hgMqR {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
