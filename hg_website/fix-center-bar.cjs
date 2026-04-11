const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const rpStart = content.indexOf('function RightPanel(');
const saStart = content.indexOf('export default function StudentAuth()');
const before = content.substring(0, rpStart);
const after = content.substring(saStart);

const newRP = `function RightPanel({ f, fDisplay }: { f: string; fDisplay: string }) {
  const firstQ = 'What is Electromagnetism?';
  const conversation = [
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Searching the web', delay: 0 },
        { icon: 'globe', text: 'Reading 4 sources', delay: 1400 },
        { icon: 'check', text: 'Your answer is ready', delay: 2800 },
      ],
    },
    { type: 'bot' as const, text: 'Electromagnetism studies how electric charges and magnetic fields interact. It unifies electricity and magnetism into one framework.' },
    { type: 'user' as const, text: 'Can you find me a tutor for this?' },
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Finding expert tutors', delay: 0 },
        { icon: 'globe', text: 'Matching your preferences', delay: 1200 },
        { icon: 'check', text: 'Found 3 tutors!', delay: 2200 },
      ],
    },
    { type: 'bot' as const, text: 'Found 3 expert tutors! Vikram Joshi (4.9 rating) is available today. Want me to book a demo?' },
  ];

  const [typingText, setTypingText] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [searchStep, setSearchStep] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [sentQuestion, setSentQuestion] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [phase, searchStep, wordIndex, visibleItems, showChat]);

  useEffect(() => {
    let cancelled = false;
    const timers: any[] = [];
    const chars = firstQ.split('');

    // Type into search bar
    chars.forEach((_, ci) => {
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setTypingText(firstQ.substring(0, ci + 1));
      }, 800 + ci * 45));
    });

    // Send - hide search bar, show chat
    const sendDelay = 800 + chars.length * 45 + 600;
    timers.push(setTimeout(() => {
      if (cancelled) return;
      setSentQuestion(firstQ);
      setShowSearch(false);
    }, sendDelay));

    timers.push(setTimeout(() => {
      if (cancelled) return;
      setShowChat(true);
    }, sendDelay + 400));

    // Start conversation
    let delay = sendDelay + 800;
    conversation.forEach((item, idx) => {
      const d = delay;
      if (item.type === 'user') {
        timers.push(setTimeout(() => { if (!cancelled) { setVisibleItems(p => [...p, idx]); setPhase(idx); } }, d));
        delay += 1200;
      }
      if (item.type === 'search') {
        item.steps.forEach((step, si) => {
          timers.push(setTimeout(() => { if (!cancelled) { setPhase(idx); setSearchStep(si); if (si === 0) setVisibleItems(p => [...p, idx]); } }, d + step.delay));
        });
        delay += (item.steps[item.steps.length - 1]?.delay || 0) + 900;
      }
      if (item.type === 'bot') {
        const words = item.text.split(' ');
        timers.push(setTimeout(() => { if (!cancelled) { setVisibleItems(p => [...p, idx]); setPhase(idx); setWordIndex(0); } }, d));
        words.forEach((_, wi) => { timers.push(setTimeout(() => { if (!cancelled) setWordIndex(wi + 1); }, d + 50 * (wi + 1))); });
        delay += 50 * words.length + 1400;
      }
    });

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  const SearchIcon = ({ type }: { type: string }) => {
    if (type === 'spark') return (
      <span style={{ display: 'inline-flex', animation: 'chatSearchSpin 1.5s linear infinite' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><path d="M12 3v2m0 14v2m-7-9H3m18 0h-2m-2.3-5.7-1.4 1.4m-7.6 7.6-1.4 1.4m0-10.4 1.4 1.4m7.6 7.6 1.4 1.4"/></svg>
      </span>
    );
    if (type === 'globe') return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    );
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
    );
  };

  return (
    <>
      <style>{\`
        @keyframes chatMsgSlide { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes chatSearchSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes chatSearchFade { 0% { opacity: 0; transform: translateX(-6px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes chatWordFade { 0% { opacity: 0; filter: blur(3px); } 100% { opacity: 1; filter: blur(0); } }
        @keyframes chatCursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes chatSearchBarOut { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-20px) scale(0.97); } }
        @keyframes chatFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        .chat-msg-enter { animation: chatMsgSlide 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.05) both; }
        .chat-search-step { animation: chatSearchFade 0.4s ease both; }
        .chat-word-reveal { animation: chatWordFade 0.25s ease both; }
        .chat-cursor { display: inline-block; width: 2px; height: 18px; background: #F97316; margin-left: 2px; vertical-align: middle; animation: chatCursorBlink 0.8s step-end infinite; }
        .chat-bar-out { animation: chatSearchBarOut 0.35s ease both; pointer-events: none; }
        .chat-fade-in { animation: chatFadeIn 0.4s ease both; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 3px; }
      \`}</style>

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/osmium.png" alt="Osmium AI" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
            <span style={{ fontFamily: f, fontSize: 14, fontWeight: 500, color: '#111' }}>Osmium AI</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.15)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50' }} />
            <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: '#4CAF50', letterSpacing: '0.04em' }}>Online</span>
          </div>
        </div>

        {/* Search bar - centered in middle */}
        {showSearch && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '0 32px', zIndex: 5,
          }}>
            <p style={{ fontFamily: f, fontSize: 18, fontWeight: 500, color: '#111', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
              Ask anything...
            </p>
            <div style={{
              width: '100%', maxWidth: 380, padding: '12px 16px', borderRadius: 14,
              background: '#fff', border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{ fontFamily: f, fontSize: 15, color: '#111', fontWeight: 400, flex: 1 }}>
                {typingText || <span style={{ color: '#ccc' }}>Search...</span>}
                {typingText.length < firstQ.length && <span style={{ display: 'inline-block', width: 1.5, height: 16, background: '#111', marginLeft: 1, verticalAlign: 'middle', animation: 'chatCursorBlink 0.8s step-end infinite' }} />}
              </span>
              <div style={{
                width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: typingText.length > 0 ? '#111' : '#F0F0F0', transition: 'background 0.3s',
                flexShrink: 0,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={typingText.length > 0 ? '#fff' : '#bbb'} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        )}

        {/* Chat area - appears after search bar sends */}
        {showChat && (
          <div ref={chatRef} className="chat-scroll chat-fade-in" style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 150px', display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Sent first question */}
            <div className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                padding: '10px 18px', borderRadius: '18px 18px 4px 18px',
                background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 16,
                fontFamily: f, lineHeight: 1.5, maxWidth: '82%', fontWeight: 450,
                border: '1px solid rgba(249,115,22,0.15)',
              }}>
                {sentQuestion}
              </div>
            </div>

            {/* Rest of conversation */}
            {conversation.map((item, idx) => {
              if (!visibleItems.includes(idx)) return null;

              if (item.type === 'user') {
                return (
                  <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      padding: '10px 18px', borderRadius: '18px 18px 4px 18px',
                      background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 16,
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
                  <div key={idx} className="chat-msg-enter" style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 4 }}>
                    {item.steps?.map((step, si) => {
                      if (phase < idx || (phase === idx && searchStep < si)) return null;
                      return (
                        <div key={si} className="chat-search-step" style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          opacity: (phase === idx && searchStep === si) ? 1 : 0.4,
                          transition: 'opacity 0.4s',
                        }}>
                          <SearchIcon type={step.icon} />
                          <span style={{ fontFamily: f, fontSize: 14.5, color: '#888', fontWeight: 450 }}>
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
                  <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 4 }}>
                    <div style={{ fontSize: 16, fontFamily: f, lineHeight: 1.75, color: '#333', maxWidth: '92%', fontWeight: 400 }}>
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
        )}

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

content = before + newRP + after;
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Search bar centered in middle, black send button, transitions to chat.');
