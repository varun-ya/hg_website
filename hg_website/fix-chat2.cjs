const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the RightPanel function boundaries
const rpStart = content.indexOf('function RightPanel(');
const saStart = content.indexOf('export default function StudentAuth()');

if (rpStart === -1 || saStart === -1) {
  console.error('Could not find RightPanel or StudentAuth boundaries');
  process.exit(1);
}

// Extract everything before RightPanel and from StudentAuth onwards
const before = content.substring(0, rpStart);
const after = content.substring(saStart);

const newRightPanel = `function RightPanel({ f, fDisplay }: { f: string; fDisplay: string }) {
  const { useState, useEffect, useRef } = require('react');

  const conversation = [
    {
      type: 'user' as const,
      text: 'What is Electromagnetism?',
    },
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Searching the web', delay: 0 },
        { icon: 'globe', text: 'Reading 4 sources', delay: 1200 },
        { icon: 'check', text: 'Your answer is ready', delay: 2400 },
      ],
    },
    {
      type: 'bot' as const,
      text: 'Electromagnetism is a branch of physics that studies the interaction between electric charges and magnetic fields. It explains how electric currents produce magnetic fields and how changing magnetic fields create electric forces. Maxwell\\'s equations unify electricity and magnetism into one framework.',
    },
    {
      type: 'user' as const,
      text: 'Can you find me a tutor for this topic?',
    },
    {
      type: 'search' as const,
      steps: [
        { icon: 'spark', text: 'Finding expert tutors', delay: 0 },
        { icon: 'globe', text: 'Matching your preferences', delay: 1000 },
        { icon: 'check', text: 'Found 3 tutors!', delay: 2000 },
      ],
    },
    {
      type: 'bot' as const,
      text: 'Great news! I found 3 Physics tutors who specialize in Electromagnetism. Vikram Joshi has a 4.9 rating and is available today. He uses visual simulations to explain concepts. Want me to book a demo?',
    },
  ];

  const [phase, setPhase] = React.useState(0);
  const [searchStep, setSearchStep] = React.useState(0);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
  const chatRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<any>(null);

  // Auto-scroll chat to bottom
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [phase, searchStep, wordIndex, visibleItems]);

  // Main animation loop
  React.useEffect(() => {
    let cancelled = false;
    let timers: any[] = [];

    const runConversation = (startDelay: number) => {
      let delay = startDelay;

      conversation.forEach((item, idx) => {
        const itemDelay = delay;

        if (item.type === 'user') {
          timers.push(setTimeout(() => {
            if (cancelled) return;
            setVisibleItems(prev => [...prev, idx]);
            setPhase(idx);
          }, itemDelay));
          delay += 1000;
        }

        if (item.type === 'search') {
          item.steps.forEach((step, si) => {
            const stepDelay = itemDelay + step.delay;
            timers.push(setTimeout(() => {
              if (cancelled) return;
              setPhase(idx);
              setSearchStep(si);
              if (si === 0) setVisibleItems(prev => [...prev, idx]);
            }, stepDelay));
          });
          delay += (item.steps[item.steps.length - 1]?.delay || 0) + 800;
        }

        if (item.type === 'bot') {
          const words = item.text.split(' ');
          timers.push(setTimeout(() => {
            if (cancelled) return;
            setVisibleItems(prev => [...prev, idx]);
            setPhase(idx);
            setWordIndex(0);
          }, itemDelay));

          words.forEach((_, wi) => {
            timers.push(setTimeout(() => {
              if (cancelled) return;
              setWordIndex(wi + 1);
            }, itemDelay + 60 * (wi + 1)));
          });

          delay += 60 * words.length + 1200;
        }
      });

      // Reset and loop
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setVisibleItems([]);
        setPhase(0);
        setSearchStep(0);
        setWordIndex(0);
        runConversation(1500);
      }, delay + 2000));
    };

    runConversation(800);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const SearchIcon = ({ type }: { type: string }) => {
    if (type === 'spark') return (
      <span style={{ display: 'inline-flex', animation: 'chatSearchSpin 1.5s linear infinite' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8913A" strokeWidth="2" strokeLinecap="round"><path d="M12 3v2m0 14v2m-7-9H3m18 0h-2m-2.3-5.7-1.4 1.4m-7.6 7.6-1.4 1.4m0-10.4 1.4 1.4m7.6 7.6 1.4 1.4"/></svg>
      </span>
    );
    if (type === 'globe') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#91B7CE" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    );
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
    );
  };

  return (
    <>
      <style>{\`
        @keyframes chatGridReveal {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(150% at 50% 50%); }
        }
        @keyframes chatMsgSlide {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatSearchSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes chatSearchFade {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes chatWordFade {
          0% { opacity: 0; filter: blur(2px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes chatCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .chat-grid-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 2px 2px, #C8DDE8 1px, transparent 1px);
          background-size: 32px 32px;
          animation: chatGridReveal 2000ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          pointer-events: none; z-index: 0;
        }
        .chat-msg-enter { animation: chatMsgSlide 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) both; }
        .chat-search-step { animation: chatSearchFade 0.35s ease both; }
        .chat-word-reveal { animation: chatWordFade 0.2s ease both; }
        .chat-cursor {
          display: inline-block; width: 2px; height: 14px;
          background: #91B7CE; margin-left: 2px; vertical-align: middle;
          animation: chatCursorBlink 0.8s step-end infinite;
        }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(145,183,206,0.3); border-radius: 3px; }
      \`}</style>

      <div className="chat-grid-bg" />

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(145,183,206,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #91B7CE, #6A9AB8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: '#3A6B85' }}>HomeGuru AI</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50' }} />
            <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: '#4CAF50', letterSpacing: '0.04em' }}>Online</span>
          </div>
        </div>

        {/* Chat area */}
        <div ref={chatRef} className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {conversation.map((item, idx) => {
            if (!visibleItems.includes(idx)) return null;

            if (item.type === 'user') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    padding: '10px 16px', borderRadius: '16px 16px 4px 16px',
                    background: '#91B7CE', color: '#fff', fontSize: 13.5,
                    fontFamily: f, lineHeight: 1.55, maxWidth: '80%', fontWeight: 450,
                  }}>
                    {item.text}
                  </div>
                </div>
              );
            }

            if (item.type === 'search') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
                  {item.steps?.map((step, si) => {
                    if (phase < idx || (phase === idx && searchStep < si)) return null;
                    return (
                      <div key={si} className="chat-search-step" style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        opacity: (phase === idx && searchStep === si) ? 1 : 0.5,
                        transition: 'opacity 0.3s',
                      }}>
                        <SearchIcon type={step.icon} />
                        <span style={{ fontFamily: f, fontSize: 12.5, color: '#5A8FAD', fontWeight: 500 }}>
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
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: '16px 16px 16px 4px',
                    background: '#fff', color: '#333', fontSize: 13.5,
                    fontFamily: f, lineHeight: 1.7, maxWidth: '88%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(145,183,206,0.15)',
                  }}>
                    {words.slice(0, showWords).map((word, wi) => (
                      <span key={wi} className="chat-word-reveal" style={{ animationDelay: '0s' }}>
                        {word}{' '}
                      </span>
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
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
          background: 'linear-gradient(transparent, #EDF4F8)',
          borderRadius: '0 0 28px 28px', pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Bottom heading */}
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
          <h2 style={{
            fontFamily: fDisplay, fontSize: 26, fontWeight: 400, color: '#1f1f1f',
            lineHeight: 1.2, margin: '0 0 6px', letterSpacing: '-0.02em',
          }}>
            Find Your Perfect<br />
            <span style={{ color: '#91B7CE', fontWeight: 500 }}>Tutor</span> on{' '}
            <span style={{ color: '#0A2156', fontWeight: 500 }}>Home</span>
            <span style={{ color: '#F97316', fontWeight: 500 }}>Guru</span>
          </h2>
          <p style={{ fontFamily: f, fontSize: 12, color: '#888', margin: 0 }}>
            Join 50,000+ students learning 1-on-1 with expert tutors.
          </p>
        </div>
      </div>
    </>
  );
}


`;

content = before + newRightPanel + after;
fs.writeFileSync(filePath, content, 'utf8');
console.log('RightPanel replaced with advanced chatbot animation!');
console.log('Features: word-by-word typing, search status steps, looping conversation');
