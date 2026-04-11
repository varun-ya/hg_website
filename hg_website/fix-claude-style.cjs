const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find RightPanel boundaries
const rpStart = content.indexOf('function RightPanel(');
const saStart = content.indexOf('export default function StudentAuth()');
const before = content.substring(0, rpStart);
const after = content.substring(saStart);

const newRightPanel = `function RightPanel({ f, fDisplay }: { f: string; fDisplay: string }) {
  const conversation = [
    { type: 'user' as const, text: 'What is Electromagnetism?' },
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Searching the web', delay: 0 },
        { icon: 'globe', text: 'Reading 4 sources', delay: 1200 },
        { icon: 'check', text: 'Your answer is ready', delay: 2400 },
      ],
    },
    { type: 'bot' as const, text: 'Electromagnetism studies how electric charges and magnetic fields interact. It unifies electricity and magnetism into one framework.' },
    { type: 'user' as const, text: 'Can you find me a tutor for this topic?' },
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Finding expert tutors', delay: 0 },
        { icon: 'globe', text: 'Matching your preferences', delay: 1000 },
        { icon: 'check', text: 'Found 3 tutors!', delay: 2000 },
      ],
    },
    { type: 'bot' as const, text: 'Found 3 expert tutors! Vikram Joshi (4.9 rating) is available today. Want me to book a demo?' },
  ];

  const [phase, setPhase] = useState(0);
  const [searchStep, setSearchStep] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [phase, searchStep, wordIndex, visibleItems]);

  useEffect(() => {
    let cancelled = false;
    let timers: any[] = [];
    const run = (startDelay: number) => {
      let delay = startDelay;
      conversation.forEach((item, idx) => {
        const d = delay;
        if (item.type === 'user') {
          timers.push(setTimeout(() => { if (!cancelled) { setVisibleItems(p => [...p, idx]); setPhase(idx); } }, d));
          delay += 1000;
        }
        if (item.type === 'search') {
          item.steps.forEach((step, si) => {
            timers.push(setTimeout(() => { if (!cancelled) { setPhase(idx); setSearchStep(si); if (si === 0) setVisibleItems(p => [...p, idx]); } }, d + step.delay));
          });
          delay += (item.steps[item.steps.length - 1]?.delay || 0) + 800;
        }
        if (item.type === 'bot') {
          const words = item.text.split(' ');
          timers.push(setTimeout(() => { if (!cancelled) { setVisibleItems(p => [...p, idx]); setPhase(idx); setWordIndex(0); } }, d));
          words.forEach((_, wi) => { timers.push(setTimeout(() => { if (!cancelled) setWordIndex(wi + 1); }, d + 55 * (wi + 1))); });
          delay += 55 * words.length + 1200;
        }
      });
    };
    run(800);
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  const SearchIcon = ({ type }: { type: string }) => {
    if (type === 'spark') return (
      <span style={{ display: 'inline-flex', animation: 'chatSearchSpin 1.5s linear infinite' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><path d="M12 3v2m0 14v2m-7-9H3m18 0h-2m-2.3-5.7-1.4 1.4m-7.6 7.6-1.4 1.4m0-10.4 1.4 1.4m7.6 7.6 1.4 1.4"/></svg>
      </span>
    );
    if (type === 'globe') return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    );
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
    );
  };

  return (
    <>
      <style>{\`
        @keyframes chatMsgSlide { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes chatSearchSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes chatSearchFade { 0% { opacity: 0; transform: translateX(-8px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes chatWordFade { 0% { opacity: 0; filter: blur(2px); } 100% { opacity: 1; filter: blur(0); } }
        @keyframes chatCursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .chat-msg-enter { animation: chatMsgSlide 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) both; }
        .chat-search-step { animation: chatSearchFade 0.35s ease both; }
        .chat-word-reveal { animation: chatWordFade 0.2s ease both; }
        .chat-cursor { display: inline-block; width: 2px; height: 16px; background: #F97316; margin-left: 2px; vertical-align: middle; animation: chatCursorBlink 0.8s step-end infinite; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 3px; }
      \`}</style>

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/osmium.png" alt="Osmium AI" style={{ width: 24, height: 24, borderRadius: 6, objectFit: 'contain' }} />
            <span style={{ fontFamily: f, fontSize: 13, fontWeight: 500, color: '#111' }}><span style={{ color: '#0A2156', fontWeight: 500 }}>HomeGuru</span> <span style={{ color: '#999', fontWeight: 400, fontSize: 11 }}>\u00d7</span> <span style={{ color: '#111', fontWeight: 500 }}>Osmium AI</span></span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50' }} />
            <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: '#4CAF50', letterSpacing: '0.04em' }}>Online</span>
          </div>
        </div>

        {/* Chat */}
        <div ref={chatRef} className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 140px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {conversation.map((item, idx) => {
            if (!visibleItems.includes(idx)) return null;

            if (item.type === 'user') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    padding: '10px 18px', borderRadius: '18px 18px 4px 18px',
                    background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 15,
                    fontFamily: f, lineHeight: 1.5, maxWidth: '82%', fontWeight: 450,
                    border: '1px solid rgba(249,115,22,0.15)',
                  }}>
                    {item.text}
                  </div>
                </div>
              );
            }

            if (item.type === 'search') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 2 }}>
                  {item.steps?.map((step, si) => {
                    if (phase < idx || (phase === idx && searchStep < si)) return null;
                    return (
                      <div key={si} className="chat-search-step" style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        opacity: (phase === idx && searchStep === si) ? 1 : 0.45,
                        transition: 'opacity 0.3s',
                      }}>
                        <SearchIcon type={step.icon} />
                        <span style={{ fontFamily: f, fontSize: 14, color: '#888', fontWeight: 450 }}>
                          {step.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (item.type === 'bot') {
              const words = item.text.split(' ');
              const showWords = phase >= idx ? (phase === idx ? wordIndex : words.length) : 0;
              const isTyping = phase === idx && wordIndex < words.length;
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 2 }}>
                  <div style={{ fontSize: 15, fontFamily: f, lineHeight: 1.7, color: '#333', maxWidth: '92%', fontWeight: 400 }}>
                    {words.slice(0, showWords).map((word, wi) => (
                      <span key={wi} className="chat-word-reveal" style={{ animationDelay: '0s' }}>{word}{' '}</span>
                    ))}
                    {isTyping && <span className="chat-cursor" />}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(transparent, #FFF7ED)', borderRadius: '0 0 28px 28px', pointerEvents: 'none', zIndex: 2 }} />

        {/* Bottom heading */}
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
          <h2 style={{ fontFamily: fDisplay, fontSize: 26, fontWeight: 400, color: '#1f1f1f', lineHeight: 1.2, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Find Your Perfect<br />
            <span style={{ color: '#F97316', fontWeight: 500 }}>Tutor</span> on{' '}
            <span style={{ color: '#0A2156', fontWeight: 500 }}>Home</span>
            <span style={{ color: '#F97316', fontWeight: 500 }}>Guru</span>
          </h2>
          <p style={{ fontFamily: f, fontSize: 12, color: '#888', margin: 0 }}>Join 50,000+ students learning 1-on-1 with expert tutors.</p>
        </div>
      </div>
    </>
  );
}


`;

content = before + newRightPanel + after;
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Matches Claude reference - plain text answers, bigger font, no bubbles on bot responses.');
