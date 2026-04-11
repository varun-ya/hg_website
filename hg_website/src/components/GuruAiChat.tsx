import { useState, useRef, useEffect } from 'react';
import { GraduationCap, CurrencyInr, Gift, BookOpen, ChalkboardTeacher, Phone } from '@phosphor-icons/react';

const f = 'Matter, sans-serif';
const fDisplay = '"Season Mix", sans-serif';

interface Message { role: 'user' | 'bot'; text: string; }

const REPLIES: [RegExp, string][] = [
  [/price|cost|fee|₹|pay|money/i, 'Our tutoring starts from ₹500/session depending on the subject and tutor. <a href="/find-tutor" style="color:#F97316;text-decoration:none;font-weight:500">Browse tutors & pricing →</a>'],
  [/tutor|teacher|mentor|guru/i, 'We have 50+ verified tutors across academics, coding, music, languages and more! <a href="/find-tutor" style="color:#F97316;text-decoration:none;font-weight:500">Find your perfect tutor →</a>'],
  [/subject|learn|teach|course|class|topic/i, 'We offer 1-on-1 tutoring in Math, Science, English, Coding, Music, Dance, Languages, IELTS, JEE, NEET and more! <a href="/find-tutor" style="color:#F97316;text-decoration:none;font-weight:500">Explore subjects →</a>'],
  [/demo|trial|free|try|book/i, 'Every tutor offers a free demo session! <a href="/find-tutor" style="color:#F97316;text-decoration:none;font-weight:500">Book a free demo →</a>'],
  [/hello|hi|hey|hola|namaste/i, 'Hey there! 👋 How can I help you today? Ask me about tutors, subjects, pricing, or anything about HomeGuru.'],
  [/how.*work|process|start|begin|sign|register|account/i, 'It\'s simple! Browse tutors → Book a free demo → Schedule regular sessions. <a href="/student-signup" style="color:#F97316;text-decoration:none;font-weight:500">Create your free account →</a>'],
  [/safe|secure|trust|verify/i, 'All tutors go through rigorous verification — ID checks and qualification tests. Your safety is our priority. <a href="/about-us" style="color:#F97316;text-decoration:none;font-weight:500">Learn more about us →</a>'],
  [/become.*tutor|teach.*here|join.*tutor|apply.*tutor/i, 'Join 10,000+ tutors earning on their own schedule! <a href="/become-a-tutor" style="color:#F97316;text-decoration:none;font-weight:500">Apply as a tutor →</a>'],
  [/about|who.*you|company|team/i, 'HomeGuru connects students with the world\'s best tutors for any subject, any level, any goal. <a href="/about-us" style="color:#F97316;text-decoration:none;font-weight:500">About HomeGuru →</a>'],
  [/blog|article|news|read/i, 'Check out our latest tips, stories, and insights! <a href="/blogs" style="color:#F97316;text-decoration:none;font-weight:500">Read our blog →</a>'],
  [/refund|cancel|money.*back/i, 'We have a clear refund policy to protect you. <a href="/refund-policy" style="color:#F97316;text-decoration:none;font-weight:500">View refund policy →</a>'],
  [/terms|condition|agreement/i, 'You can review our terms anytime. <a href="/terms-of-use" style="color:#F97316;text-decoration:none;font-weight:500">Terms of use →</a>'],
  [/privacy|data|policy/i, 'Your privacy matters to us. <a href="/privacy-policy" style="color:#F97316;text-decoration:none;font-weight:500">Privacy policy →</a>'],
  [/contact|support|help|email|phone|call/i, 'Reach us at <a href="mailto:support@homeguruworld.com" style="color:#F97316;text-decoration:none;font-weight:500">support@homeguruworld.com</a> or call <a href="tel:+919001990019" style="color:#F97316;text-decoration:none;font-weight:500">+91 9001990019</a>. We\'re happy to help!'],
  [/dashboard|login|sign.*in/i, 'Already have an account? <a href="/student-signup?tab=login" style="color:#F97316;text-decoration:none;font-weight:500">Sign in here →</a>'],
];

function getReply(q: string) {
  for (const [re, r] of REPLIES) if (re.test(q)) return r;
  return 'Great question! You can <a href="/find-tutor" style="color:#F97316;text-decoration:none;font-weight:500">explore our tutors</a>, or email <a href="mailto:support@homeguruworld.com" style="color:#F97316;text-decoration:none;font-weight:500">support@homeguruworld.com</a> — happy to help!';
}

const CHIPS = [
  { icon: GraduationCap, label: 'Find a tutor', q: 'Help me find a tutor' },
  { icon: CurrencyInr, label: 'Pricing', q: 'What are the prices?' },
  { icon: Gift, label: 'Free demo', q: 'Can I book a free demo?' },
  { icon: BookOpen, label: 'Subjects', q: 'What subjects do you offer?' },
  { icon: ChalkboardTeacher, label: 'Become a tutor', q: 'I want to become a tutor' },
  { icon: Phone, label: 'Contact us', q: 'How can I contact support?' },
];

export default function GuruAiChat() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, typing]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 400); }, [open]);

  const close = () => { setClosing(true); setTimeout(() => { setOpen(false); setClosing(false); }, 300); };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => { setMsgs(p => [...p, { role: 'bot', text: getReply(text) }]); setTyping(false); }, 900 + Math.random() * 600);
  };

  const hasInput = input.trim().length > 0;

  return (
    <>
      <style>{`
        .gc-fab {
          position: fixed; bottom: 32px; right: 32px; z-index: 99999;
          width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
          animation: gcFabIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.8s both;
        }
        .gc-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 12px 40px rgba(249,115,22,0.2), 0 4px 12px rgba(0,0,0,0.08);
        }
        .gc-fab:active { transform: scale(0.95); }
        .gc-fab img { width: 28px; height: 28px; object-fit: contain; }
        .gc-fab-ring {
          position: absolute; inset: -3px; border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #F97316, #fb923c, #F97316) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: gcRingSpin 4s linear infinite;
          opacity: 0; transition: opacity 0.3s;
        }
        .gc-fab:hover .gc-fab-ring { opacity: 1; }
        .gc-fab-badge {
          position: absolute; top: -2px; right: -2px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #4CAF50; border: 2.5px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }

        @keyframes gcFabIn { 0% { transform: scale(0) rotate(-90deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes gcRingSpin { to { transform: rotate(360deg); } }
        @keyframes gcPanelIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gcPanelOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(24px) scale(0.9); }
        }
        @keyframes gcMsgIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gcWelcome {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gcChip {
          0% { opacity: 0; transform: scale(0.9) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gcDot {
          0%,80%,100% { transform: scale(0.3); opacity: 0.2; }
          40% { transform: scale(1); opacity: 0.8; }
        }

        .gc-panel {
          position: fixed; bottom: 104px; right: 32px; z-index: 99999;
          width: 400px; max-width: calc(100vw - 24px);
          height: 580px; max-height: calc(100vh - 140px);
          border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: column;
          background: #fff;
          box-shadow:
            0 40px 100px rgba(0,0,0,0.12),
            0 12px 32px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.03);
          animation: gcPanelIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
        .gc-panel.gc-out { animation: gcPanelOut 0.3s cubic-bezier(0.4,0,1,1) both; pointer-events: none; }

        .gc-header {
          padding: 16px 18px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: relative; z-index: 2;
        }

        .gc-body { flex: 1; overflow-y: auto; padding: 20px 16px; display: flex; flex-direction: column; gap: 14px; }
        .gc-body::-webkit-scrollbar { width: 3px; }
        .gc-body::-webkit-scrollbar-track { background: transparent; }
        .gc-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 3px; }

        .gc-msg { animation: gcMsgIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

        .gc-dot { width: 5px; height: 5px; border-radius: 50%; background: #bbb; display: inline-block; margin: 0 2px; }
        .gc-dot:nth-child(1) { animation: gcDot 1.4s ease-in-out infinite 0s; }
        .gc-dot:nth-child(2) { animation: gcDot 1.4s ease-in-out infinite 0.15s; }
        .gc-dot:nth-child(3) { animation: gcDot 1.4s ease-in-out infinite 0.3s; }

        .gc-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 16px; border-radius: 12px; cursor: pointer;
          font-family: ${f}; font-size: 12.5px; font-weight: 500;
          background: #fff; color: #555; white-space: nowrap;
          border: 1px solid #EBEBEB;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .gc-chip:hover {
          border-color: #F97316; color: #F97316;
          background: #FFF7ED;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249,115,22,0.1);
        }
        .gc-chip:hover .gc-chip-icon { color: #F97316; }
        .gc-chip:active { transform: translateY(0); }

        .gc-input-area {
          padding: 14px 16px; flex-shrink: 0;
          display: flex; align-items: center; gap: 10px;
          border-top: 1px solid rgba(0,0,0,0.04);
          background: #fafafa;
        }

        .gc-close {
          width: 30px; height: 30px; border-radius: 10px; border: none;
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          color: #bbb;
        }
        .gc-close:hover { background: rgba(0,0,0,0.05); color: #666; transform: rotate(90deg); }

        @media (max-width: 480px) {
          .gc-fab { bottom: 20px; right: 20px; width: 54px; height: 54px; }
          .gc-fab img { width: 24px; height: 24px; }
          .gc-panel {
            bottom: 0; right: 0; left: 0; width: 100%; max-width: 100%;
            height: 100vh; max-height: 100vh; border-radius: 0;
          }
        }
      `}</style>

      {/* FAB */}
      {!open && (
        <button className="gc-fab" onClick={() => setOpen(true)} aria-label="Open Guru AI">
          <div className="gc-fab-ring" />
          <div className="gc-fab-badge" />
          <img src="/guruai.png" alt="Guru AI" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className={`gc-panel${closing ? ' gc-out' : ''}`}>

          {/* Header */}
          <div className="gc-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11, flexShrink: 0,
                background: '#fff', border: '1px solid #EBEBEB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <img src="/guruai.png" alt="" style={{ height: 20, width: 'auto', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: fDisplay, fontSize: 15, fontWeight: 500, color: '#111' }}>Guru AI</span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50' }} />
                </div>
                <span style={{ fontFamily: f, fontSize: 10, color: '#aaa' }}>
                  by <a href="https://osmium.co.in" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontWeight: 500, textDecoration: 'none' }}>Osmium AI</a>
                </span>
              </div>
            </div>
            <button className="gc-close" onClick={close}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="gc-body">

            {/* Welcome */}
            {msgs.length === 0 && !typing && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '10px 0', animation: 'gcWelcome 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: '#fff', border: '1px solid #EBEBEB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: 18,
                }}>
                  <img src="/guruai.png" alt="" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
                </div>
                <p style={{ fontFamily: fDisplay, fontSize: 20, fontWeight: 400, color: '#111', margin: '0 0 4px', letterSpacing: '-0.02em', textAlign: 'center' }}>
                  Hey! I'm <span style={{ color: '#F97316' }}>Guru AI</span> 👋
                </p>
                <p style={{ fontFamily: f, fontSize: 13, color: '#999', margin: '0 0 28px', textAlign: 'center', lineHeight: 1.6, maxWidth: 260 }}>
                  Ask me anything about HomeGuru — tutors, subjects, pricing, or how to get started.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 320 }}>
                  {CHIPS.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <button key={c.q} className="gc-chip" onClick={() => send(c.q)} style={{ animation: `gcChip 0.35s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.07}s both` }}>
                        <Icon size={14} weight="regular" className="gc-chip-icon" style={{ color: '#999', transition: 'color 0.2s' }} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            {msgs.map((m, i) => (
              <div key={i} className="gc-msg" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                {m.role === 'bot' && (
                  <div style={{
                    width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                    background: '#fff', border: '1px solid #EBEBEB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src="/guruai.png" alt="" style={{ height: 13, width: 'auto', objectFit: 'contain' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '76%', padding: '11px 15px',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.role === 'user' ? 'rgba(249,115,22,0.08)' : '#F3F4F6',
                  border: m.role === 'user' ? '1px solid rgba(249,115,22,0.12)' : 'none',
                  color: '#333',
                  fontFamily: f, fontSize: 13.5, lineHeight: 1.65, fontWeight: 400,
                }}>
                  {m.role === 'user' ? m.text : <span dangerouslySetInnerHTML={{ __html: m.text }} />}
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="gc-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                  background: '#fff', border: '1px solid #EBEBEB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src="/guruai.png" alt="" style={{ height: 13, width: 'auto', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '13px 18px', borderRadius: '18px 18px 18px 4px', background: '#F3F4F6', display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span className="gc-dot" /><span className="gc-dot" /><span className="gc-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="gc-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Message Guru AI..."
              style={{
                flex: 1, height: 44, padding: '0 16px', borderRadius: 14,
                border: '1px solid #E5E5E5', background: '#fff',
                fontFamily: f, fontSize: 13.5, color: '#111', outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.02)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button
              onClick={() => send(input)}
              disabled={!hasInput}
              style={{
                width: 44, height: 44, borderRadius: 14, border: 'none', flexShrink: 0,
                background: hasInput ? '#F97316' : '#EBEBEB',
                cursor: hasInput ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                transform: hasInput ? 'scale(1)' : 'scale(0.92)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hasInput ? '#fff' : '#bbb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s' }}>
                <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
