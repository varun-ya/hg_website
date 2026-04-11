import { useState, useEffect, useRef } from 'react';
import { Eye, EyeSlash, Warning, CheckCircle, ArrowRight, Monitor, GraduationCap, MapPin, CurrencyInr, Star, Phone, Envelope, Globe, Check, UserPlus, CalendarCheck } from '@phosphor-icons/react';

const f = 'Matter, sans-serif';
const fDisplay = '"Season Mix", sans-serif';

function RightPanel({ f, fDisplay }: { f: string; fDisplay: string }) {
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
      <style>{`
        @keyframes chatMsgSlide { 0% { oporm: translateY(0) scale(1); } }
        @keyframes chatSearchSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }acity: 0; transform: translateY(16px) scale(0.97); } 100% { opacity: 1; transf
        @keyframes chatSearchFade { 0% { opacity: 0; transform: translateX(-8px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes chatWordFade { 0% { opacity: 0; filter: blur(4px); transform: translateY(2px); } 100% { opacity: 1; filter: blur(0); transform: translateY(0); } }
        @keyframes chatCursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes chatSearchBarOut { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-24px) scale(0.95); } }
        @keyframes chatFadeIn { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes chatSearchBarIn { 0% { opacity: 0; transform: translateY(20px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes chatAskFade { 0% { opacity: 0; transform: translateY(10px); filter: blur(4px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes chatPulseGlow { 0%, 100% { box-shadow: 0 4px 24px rgba(249,115,22,0.08), 0 0 0 0 rgba(249,115,22,0); } 50% { box-shadow: 0 8px 32px rgba(249,115,22,0.12), 0 0 0 4px rgba(249,115,22,0.04); } }
        .chat-msg-enter { animation: chatMsgSlide 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-search-step { animation: chatSearchFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-word-reveal { animation: chatWordFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-cursor { display: inline-block; width: 2px; height: 18px; background: #F97316; margin-left: 2px; vertical-align: middle; animation: chatCursorBlink 0.9s ease-in-out infinite; border-radius: 1px; }
        .chat-bar-out { animation: chatSearchBarOut 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; pointer-events: none; }
        .chat-fade-in { animation: chatFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-search-bar-in { animation: chatSearchBarIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-ask-fade { animation: chatAskFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 3px; }
      `}</style>

      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/guruai.png" alt="Guru AI" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontFamily: fDisplay, fontSize: 15, fontWeight: 500, color: '#111', lineHeight: 1.2 }}>Guru AI</span>
              <span style={{ fontFamily: f, fontSize: 9.5, fontWeight: 400, color: '#999', lineHeight: 1.2 }}>powered by <a href="https://osmium.co.in" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontWeight: 500, textDecoration: 'none' }}>Osmium AI</a></span>
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.15)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50' }} />
            <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: '#4CAF50', letterSpacing: '0.04em' }}>Online</span>
          </div>
        </div>

        {/* Search bar - centered slightly above middle */}
        {showSearch && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 60,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '0 28px', zIndex: 5,
          }}>
            <p className="chat-ask-fade" style={{ fontFamily: fDisplay, fontSize: 20, fontWeight: 400, color: '#1f1f1f', margin: '0 0 18px', letterSpacing: '-0.02em' }}>
              Ask anything...
            </p>
            <div className="chat-search-bar-in" style={{
              width: '100%', maxWidth: 360, padding: '13px 18px', borderRadius: 999,
              background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
              ...(typingText.length > 0 ? { boxShadow: '0 8px 32px rgba(249,115,22,0.1), 0 2px 8px rgba(0,0,0,0.03)', borderColor: 'rgba(249,115,22,0.15)' } : {}),
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, transition: 'stroke 0.3s', ...(typingText.length > 0 ? { stroke: '#F97316' } : {}) }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{ fontFamily: f, fontSize: 14.5, color: '#111', fontWeight: 400, flex: 1, letterSpacing: '-0.01em' }}>
                {typingText || <span style={{ color: '#ccc' }}>Search...</span>}
                {typingText.length < firstQ.length && <span style={{ display: 'inline-block', width: 1.5, height: 15, background: '#111', marginLeft: 1, verticalAlign: 'middle', animation: 'chatCursorBlink 0.9s ease-in-out infinite', borderRadius: 1 }} />}
              </span>
              <div style={{
                width: 30, height: 30, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: typingText.length > 0 ? '#111' : '#F5F5F5',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: typingText.length > 0 ? 'scale(1)' : 'scale(0.92)',
                flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typingText.length > 0 ? '#fff' : '#bbb'} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'stroke 0.3s' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        )}

        {/* Chat area - appears after search bar sends */}
        {showChat && (
          <div ref={chatRef} className="chat-scroll chat-fade-in" style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 220px', display: 'flex', flexDirection: 'column', gap: 22 }}>

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
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(transparent, #FFF7ED 40%)', borderRadius: '0 0 28px 28px', pointerEvents: 'none', zIndex: 2 }} />

        {/* Bottom heading */}
        <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
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


export default function StudentAuth() {
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [tab, setTab] = useState<'signup' | 'login'>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('tab') === 'login' ? 'login' : 'signup';
    }
    return 'signup';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isLoggedIn = localStorage.getItem('studentLoggedIn') === 'true' && localStorage.getItem('studentEmail');
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    if (isLoggedIn && redirect) {
      window.location.href = redirect;
    }
  }, []);

  useEffect(() => {
    if (role === 'tutor' && typeof window !== 'undefined') {
      window.location.href = '/become-a-tutor';
    }
  }, [role]);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const [grade, setGrade] = useState('');
  const [gradeOpen, setGradeOpen] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) { setLoginError('Please fill in all fields'); return; }
    setLoginLoading(true);
    try {
      const res = await fetch('https://aegis.navchetna.tech/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) setLoginError(data?.message || 'Login failed');
      else { setRedirecting(true); const redirect = new URLSearchParams(window.location.search).get('redirect');
        localStorage.setItem('studentLoggedIn', 'true');
        localStorage.setItem('studentEmail', loginEmail);
        window.location.href = redirect || '/find-tutor'; }
    } catch { setLoginError('Something went wrong. Try again.'); }
    setLoginLoading(false);
  };

  const handleForgot = async () => {
    if (!loginEmail.trim()) { setLoginError('Enter your email first'); return; }
    setForgotLoading(true);
    try {
      await fetch('https://aegis.navchetna.tech/auth/forgot-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      });
    } catch {}
    setForgotLoading(false);
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  };
 

  const handleSignup = () => {
    setSignupError('');
    if (!firstName.trim() || !lastName.trim() || !signupEmail.trim() || !phone.trim() || !gender || !signupPassword.trim()) {
      setSignupError('Please fill in all fields'); return;
    }
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('studentEmail', signupEmail);
    window.location.href = 'http://localhost:3000/onboarding?source=website';
  };

  return (
    <>
      <style>{`
        .ta-input {
          width: 100%; height: 40px; padding: 0 12px;
          border: 1px solid #E4E4E4; border-radius: 10px;
          font-family: ${f}; font-size: 13px; color: #111;
          background: #fff; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .ta-input::placeholder { color: #D0D0D0; }
        .ta-input:focus {
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(17,17,17,0.07);
        }
        .ta-input-filled {
          border-color: #D4D4D4;
          background: #FAFAFA;
        }
        .ta-input-pw { padding-right: 46px; }
        .ta-btn-primary {
          width: 100%; height: 42px; border-radius: 10px; border: none;
          font-family: ${f}; font-size: 13px; font-weight: 600;
          background: #111; color: #fff; cursor: pointer;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: -0.01em;
        }
        .ta-btn-primary:hover:not(:disabled) {
          background: #1a1a1a;
          box-shadow: 0 4px 16px rgba(0,0,0,0.16);
          transform: translateY(-1px);
        }
        .ta-btn-primary:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
        .ta-btn-primary:disabled { background: #EBEBEB; color: #BDBDBD; cursor: not-allowed; }
        .ta-tab {
          flex: 1; height: 34px; border-radius: 8px; border: none;
          font-family: ${f}; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
        }
        .ta-tab-active { background: #fff; color: #111; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .ta-tab-inactive { background: transparent; color: #ABABAB; }
        .ta-tab-inactive:hover { color: #666; }
        .ta-label {
          display: block; font-family: ${f}; font-size: 10px; font-weight: 600;
          color: #BDBDBD; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;
        }
        .ta-section-title {
          font-family: ${f}; font-size: 10px; font-weight: 600;
          color: #111; text-transform: uppercase; letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
        }
        .ta-section-title::after {
          content: ''; flex: 1; height: 1px; background: #EBEBEB;
        }
        .ta-gender-dropdown {
          position: relative;
          width: 100%;
        }
        .ta-gender-trigger {
          width: 100%; height: 40px; padding: 0 12px;
          border: 1px solid #E4E4E4; border-radius: 10px;
          font-family: ${f}; font-size: 13px;
          background: #fff; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          text-align: left;
        }
        .ta-gender-trigger:focus, .ta-gender-trigger.open {
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(17,17,17,0.07);
        }
        .ta-gender-trigger.filled { border-color: #D4D4D4; background: #FAFAFA; }
        .ta-gender-menu {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0;
          background: #fff; border: 1px solid #E4E4E4; border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          overflow: hidden; z-index: 100;
          animation: ta-fade-up 0.15s ease both;
        }
        .ta-gender-option {
          width: 100%; padding: 11px 14px;
          font-family: ${f}; font-size: 14px; color: #333;
          background: none; border: none; cursor: pointer;
          text-align: left; transition: background 0.12s;
          display: flex; align-items: center; gap: 10px;
        }
        .ta-gender-option:hover { background: #F8F8F8; }
        .ta-gender-option.active { color: #c2410c; background: #fff7ed; font-weight: 500; }
        @keyframes ta-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ta-animate { animation: ta-fade-up 0.4s ease both; }
        .ta-animate-delay-1 { animation-delay: 0.05s; }
        .ta-animate-delay-2 { animation-delay: 0.1s; }
        .ta-animate-delay-3 { animation-delay: 0.15s; }
        .ta-animate-delay-4 { animation-delay: 0.2s; }
        @keyframes ta-spin {
          to { transform: rotate(360deg); }
        }
        .ta-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          animation: ta-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .ta-spinner-dark {
          border-color: rgba(17,17,17,0.15);
          border-top-color: #111;
        }
        .ta-spinner-sm {
          width: 12px; height: 12px;
          border-width: 1.5px;
        }
        @keyframes ta-overlay-fade {
          from { opacity: 0; } to { opacity: 1; }
        }
        .ta-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          animation: ta-overlay-fade 0.2s ease both;
        }
        @keyframes ta-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ta-ring {
          width: 48px; height: 48px; border-radius: 50%;
          border: 3px solid #E8E8E8;
          border-top-color: #111;
          animation: ta-ring 0.8s linear infinite;
        }
        .ta-right-panel { display: none; }
        .ta-left-panel::-webkit-scrollbar { width: 4px; }
        .ta-left-panel::-webkit-scrollbar-track { background: transparent; }
        .ta-left-panel::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
        .ta-left-panel::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
        @media (min-width: 1024px) {
          .ta-right-panel { display: block !important; }
          .ta-left-panel { width: 50% !important; }
        }
        @media (max-width: 1023px) {
          .ta-split-wrapper {
            flex-direction: column !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 16px !important;
          }
          .ta-left-panel {
            width: 100% !important;
            height: auto !important;
            overflow-y: visible !important;
          }
          .ta-right-panel {
            width: 100% !important;
            height: auto !important;
            overflow-y: visible !important;
          }
        }
      `}</style>

      {redirecting && (
        <div className="ta-overlay">
          <div className="ta-ring" />
          <p style={{ fontFamily: f, fontSize: 14, fontWeight: 500, color: '#111', margin: 0 }}>Redirecting to onboarding…</p>
          <p style={{ fontFamily: f, fontSize: 12, color: '#ABABAB', margin: 0 }}>Please wait</p>
        </div>
      )}

      <div className="ta-split-wrapper" style={{ height: '100vh', display: 'flex', fontFamily: f, background: '#fff', overflow: 'hidden', alignItems: 'center', padding: '0 40px', gap: 32, boxSizing: 'border-box' }}>

        {/* LEFT PANEL */}
        <div className="ta-left-panel" style={{ width: '50%', minWidth: 380, height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'transparent', flexShrink: 0 }}>
          <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', padding: '48px 32px 60px', boxSizing: 'border-box' }}>

            {/* Logo */}
            <a href="/" style={{ display: 'inline-block', marginBottom: 36 }}>
              <img src="https://homeguruworld.com/wp-content/uploads/2022/04/Homeguru-Logo-1.png" alt="HomeGuru" style={{ height: 36, objectFit: 'contain' }} />
            </a>



            {/* Role Toggle Chip */}
            <div className="ta-role-toggle" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#F3F4F6', borderRadius: 999, padding: 3, width: '100%', maxWidth: 220 }}>
              <button
                type="button"
                onClick={() => setRole('student')}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontFamily: f, fontSize: 13, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: role === 'student' ? '#111' : 'transparent',
                  color: role === 'student' ? '#fff' : '#888',
                  boxShadow: role === 'student' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                }}
              >Student</button>
              <button
                type="button"
                onClick={() => setRole('tutor')}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontFamily: f, fontSize: 13, fontWeight: 500, transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: role === 'tutor' ? '#111' : 'transparent',
                  color: role === 'tutor' ? '#fff' : '#888',
                  boxShadow: role === 'tutor' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                }}
              >Tutor</button>
              </div>
            </div>

            {tab === 'signup' ? (
                <div className="ta-animate">
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontFamily: fDisplay, fontSize: 28, fontWeight: 400, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Start learning today</h2>
                    <p style={{ fontFamily: f, fontSize: 15, color: '#64748B', margin: 0, lineHeight: 1.5 }}>Create your student account — it's free</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                    {/* Personal Info */}
                    <p className="ta-section-title">Personal Info</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                      <div style={{ display: 'flex', gap: 14 }}>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">First Name</label>
                          <input className={`ta-input${firstName ? ' ta-input-filled' : ''}`} type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setSignupError(''); }} placeholder="Ravi" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">Last Name</label>
                          <input className={`ta-input${lastName ? ' ta-input-filled' : ''}`} type="text" value={lastName} onChange={e => { setLastName(e.target.value); setSignupError(''); }} placeholder="Sharma" />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 14 }}>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">Email Address</label>
                          <input className={`ta-input${signupEmail ? ' ta-input-filled' : ''}`} type="email" value={signupEmail} onChange={e => { setSignupEmail(e.target.value); setSignupError(''); }} placeholder="ravi@example.com" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">Phone Number</label>
                          <input className={`ta-input${phone ? ' ta-input-filled' : ''}`} type="tel" value={phone} onChange={e => { setPhone(e.target.value); setSignupError(''); }} placeholder="98765 43210" />
                        </div>
                      </div>
                      <div>
                        <label className="ta-label">Gender</label>
                        <div className="ta-gender-dropdown">
                          <button
                            type="button"
                            className={`ta-gender-trigger${gender ? ' filled' : ''}${genderOpen ? ' open' : ''}`}
                            onClick={() => setGenderOpen(o => !o)}
                            onBlur={() => setTimeout(() => setGenderOpen(false), 150)}
                          >
                            <span style={{ color: gender ? '#111' : '#D0D0D0' }}>{gender || 'Select gender'}</span>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#bbb', transition: 'transform 0.2s', transform: genderOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                              <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/>
                            </svg>
                          </button>
                          {genderOpen && (
                            <div className="ta-gender-menu">
                              {['Male', 'Female', 'Other'].map(g => (
                                <button
                                  key={g}
                                  type="button"
                                  className={`ta-gender-option${gender === g ? ' active' : ''}`}
                                  onMouseDown={() => { setGender(g); setGenderOpen(false); setSignupError(''); }}
                                >
                                  {gender === g && (
                                    <svg width="12" height="12" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
                                      <path fill="#c2410c" d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z"/>
                                    </svg>
                                  )}
                                  {gender !== g && <span style={{ width: 12, flexShrink: 0 }} />}
                                  {g}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <p className="ta-section-title">Academic Info</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                      <div>
                        <label className="ta-label">Grade / Class</label>
                        <div className="ta-gender-dropdown">
                          <button
                            type="button"
                            className={`ta-gender-trigger${grade ? ' filled' : ''}${gradeOpen ? ' open' : ''}`}
                            onClick={() => setGradeOpen(o => !o)}
                            onBlur={() => setTimeout(() => setGradeOpen(false), 150)}
                          >
                            <span style={{ color: grade ? '#111' : '#D0D0D0' }}>{grade || 'Select your grade'}</span>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#bbb', transition: 'transform 0.2s', transform: gradeOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                              <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/>
                            </svg>
                          </button>
                          {gradeOpen && (
                            <div className="ta-gender-menu">
                              {['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'College Student', 'Working Professional', 'Other'].map(g => (
                                <button
                                  key={g}
                                  type="button"
                                  className={`ta-gender-option${grade === g ? ' active' : ''}`}
                                  onMouseDown={() => { setGrade(g); setGradeOpen(false); setSignupError(''); }}
                                >
                                  {grade === g && (
                                    <svg width="12" height="12" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
                                      <path fill="#c2410c" d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z"/>
                                    </svg>
                                  )}
                                  {grade !== g && <span style={{ width: 12, flexShrink: 0 }} />}
                                  {g}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <p className="ta-section-title">Security</p>
                    <div style={{ marginBottom: 28 }}>
                      <label className="ta-label">Password</label>
                      <div style={{ position: 'relative' }}>
                        <input className={`ta-input ta-input-pw${signupPassword ? ' ta-input-filled' : ''}`} type={showSignupPw ? 'text' : 'password'} value={signupPassword} onChange={e => { setSignupPassword(e.target.value); setSignupError(''); }} placeholder="Min. 8 characters" />
                        <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#C8C8C8', display: 'flex', padding: 0 }}>
                          {showSignupPw ? <EyeSlash size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {signupError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: '#FFF4F0', border: '1px solid rgba(220,80,40,0.12)', borderRadius: 10, marginBottom: 14 }}>
                        <Warning size={14} weight="fill" style={{ color: '#DC5028', flexShrink: 0 }} />
                        <p style={{ fontFamily: f, fontSize: 13, color: '#DC5028', margin: 0 }}>{signupError}</p>
                      </div>
                    )}

                    <button type="button" className="ta-btn-primary" onClick={handleSignup}>
                      <span>Create Account</span><ArrowRight size={14} />
                    </button>

                    <p style={{ fontFamily: f, fontSize: 11.5, color: '#CACACA', textAlign: 'center', margin: '8px 0 0', lineHeight: 1.6 }}>
                      By signing up you agree to our{' '}
                      <a href="/terms-of-use" style={{ color: '#999', textDecoration: 'underline' }}>Terms</a> &{' '}
                      <a href="/privacy-policy" style={{ color: '#999', textDecoration: 'underline' }}>Privacy Policy</a>
                    </p>
                  </div>
                </div>
            ) : (
              <div className="ta-animate">
                <div style={{ marginBottom: 36 }}>
                  <h2 style={{ fontFamily: fDisplay, fontSize: 28, fontWeight: 400, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Welcome back</h2>
                  <p style={{ fontFamily: f, fontSize: 15, color: '#64748B', margin: 0, lineHeight: 1.5 }}>Sign in to continue learning</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div className="ta-animate ta-animate-delay-1">
                    <label className="ta-label">Email Address</label>
                    <input className="ta-input" type="email" value={loginEmail} onChange={e => { setLoginEmail(e.target.value); setLoginError(''); }} placeholder="you@homeguru.com" autoComplete="email" autoFocus />
                  </div>
                  <div className="ta-animate ta-animate-delay-2">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label className="ta-label" style={{ margin: 0 }}>Password</label>
                      <button type="button" onClick={handleForgot} disabled={forgotLoading} style={{ fontFamily: f, fontSize: 12, fontWeight: 500, color: '#F08232', background: 'none', border: 'none', cursor: forgotLoading ? 'not-allowed' : 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, opacity: forgotLoading ? 0.7 : 1 }}>
                        {forgotLoading && <span className="ta-spinner ta-spinner-dark ta-spinner-sm" />}
                        {forgotLoading ? 'Sending…' : 'Forgot password?'}
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input className="ta-input ta-input-pw" type={showLoginPw ? 'text' : 'password'} value={loginPassword} onChange={e => { setLoginPassword(e.target.value); setLoginError(''); }} placeholder="••••••••" autoComplete="current-password" />
                      <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#C0C0C0', display: 'flex' }}>
                        {showLoginPw ? <EyeSlash size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FFF4F0', border: '1px solid rgba(220,80,40,0.15)', borderRadius: 12 }}>
                      <Warning size={15} weight="fill" style={{ color: '#DC5028', flexShrink: 0 }} />
                      <p style={{ fontFamily: f, fontSize: 13, color: '#DC5028', margin: 0 }}>{loginError}</p>
                    </div>
                  )}
                  {forgotSent && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#F0FDF4', border: '1px solid rgba(5,150,105,0.15)', borderRadius: 12 }}>
                      <CheckCircle size={15} weight="fill" style={{ color: '#059669', flexShrink: 0 }} />
                      <p style={{ fontFamily: f, fontSize: 13, color: '#059669', margin: 0 }}>Reset link sent — check your inbox.</p>
                    </div>
                  )}

                  <button type="submit" className="ta-btn-primary" disabled={loginLoading || redirecting} style={{ marginTop: 4 }}>
                    {loginLoading ? (
                      <><span className="ta-spinner" /><span>Signing in…</span></>
                    ) : redirecting ? (
                      <><span className="ta-spinner" /><span>Redirecting…</span></>
                    ) : (
                      <><span>Sign in to Learn</span><ArrowRight size={15} /></>
                    )}
                  </button>
                </form>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '32px 0 0' }}>
              <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
              <p style={{ fontFamily: f, fontSize: 11, color: '#94A3B8', margin: 0, whiteSpace: 'nowrap' }}>HomeGuru · Navchetna Technologies</p>
              <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — floating curved card */}
        <div className="ta-right-panel" style={{ width: '45%', height: 'calc(100vh - 80px)', overflow: 'hidden', background: '#FFF7ED', position: 'relative', borderRadius: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.08)', flexShrink: 0, border: 'none' }}>
          <RightPanel f={f} fDisplay={fDisplay} />
        </div>

      </div>
    </>
  );
}
