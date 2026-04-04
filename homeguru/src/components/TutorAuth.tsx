import { useState } from 'react';
import { Eye, EyeSlash, Warning, CheckCircle, ArrowRight, Monitor, GraduationCap, MapPin, CurrencyInr, Star, Phone, Envelope, Globe, Check, UserPlus, CalendarCheck } from '@phosphor-icons/react';

const f = 'Matter, sans-serif';
const fDisplay = '"Season Mix", sans-serif';

function RightPanel({ f, fDisplay }: { f: string; fDisplay: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'cowork'>('cowork');
  const [journeyReveal, setJourneyReveal] = useState<number>(-1); // -1=idle, 0..5=loading idx, 6=all done
  const journeyTimers = { current: [] as ReturnType<typeof setTimeout>[] };
  const toggleFaq = (i: number) => setOpenFaq(prev => prev === i ? null : i);

  const startJourneyAnimation = () => {
    if (journeyReveal !== -1) return;
    setJourneyReveal(0);
    progressItems.forEach((_, idx) => {
      const t = setTimeout(() => {
        setJourneyReveal(idx + 1);
      }, (idx + 1) * 1000);
      journeyTimers.current.push(t);
    });
  };

  const SL = ({ t }: { t: string }) => (
    <p style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: '#BDBDBD', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px' }}>{t}</p>
  );

  const progressItems = [
    'Create your tutor profile',
    'Upload ID verification',
    'Add subjects and skills',
    'Complete qualification test',
    'Pay Rs.499 listing fee',
    'Go live and get students'
  ];

  const analysisItems = ['Smart VC App', 'AI Powered Insights', 'Osmium LLM for Test', '+ More'];
  const contextItems = [
    { name: 'New Student Request', icon: '📄' },
    { name: 'Session Scheduled', icon: '⚡' },
    { name: 'Demo Completed', icon: '🌐' },
    { name: 'Payment Received', icon: '📝' },
    { name: '5-Star Review', icon: '📊' }
  ];

  return (
    <>
      <style>{`
        @keyframes gridReveal {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(150% at 50% 50%); }
        }
        @keyframes panelSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelSlideDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(30px); }
        }
        @keyframes progressItemSlide {
          0% { opacity: 0; transform: translateX(-15px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes journeyTextReveal {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes journeySpinner {
          to { transform: rotate(360deg); }
        }
        @keyframes journeyNumPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .journey-spinner {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2.5px solid #ffe0c8;
          border-top-color: #F97316;
          animation: journeySpinner 0.7s linear infinite;
          flex-shrink: 0;
        }
        .journey-text-reveal {
          animation: journeyTextReveal 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
        }
        .journey-num-pop {
          animation: journeyNumPop 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
        }
        @keyframes bounceUpRight {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(3px, -3px); }
        }
        @keyframes shimmertext {
          0% { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        .grid-bg-animated {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 48px 48px;
          background-position: 24px 24px;
          animation: gridReveal 2500ms cubic-bezier(0.22, 1, 0.36, 1) 0s 1 normal forwards;
          pointer-events: none;
          z-index: 0;
        }
        .segmented-control {
          position: relative;
          display: inline-flex;
          background: #f0f0f0;
          padding: 4px;
          border-radius: 12px;
          box-shadow: 0 11px 23px 0 rgba(0,0,0,0.15);
          border: 0.5px solid #e0e0e0;
        }
        .segmented-option {
          padding: 8px 28px;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          border: none;
          color: #999;
          position: relative;
          z-index: 1;
        }
        .segmented-option.active {
          color: #111;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease, opacity 0.25s ease;
        }
        .cards-group:hover .card-hover {
          filter: blur(2px);
          opacity: 0.5;
          transform: scale(0.98);
        }
        .cards-group:hover .card-hover:hover {
          filter: blur(0px);
          opacity: 1;
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 28px 56px rgba(0,0,0,0.16) !important;
          z-index: 10 !important;
        }
        .folder-item {
          transition: all 0.2s ease;
        }
        .folder-item:hover {
          background: #f5f5f5;
          transform: scale(0.98);
        }
        .context-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .context-item:hover {
          background: #f5f5f5;
        }
        .context-icon-hover {
          transition: all 0.2s ease;
        }
        .context-item:hover .context-icon-hover {
          opacity: 0;
        }
        .context-item:hover .context-icon-hover-active {
          opacity: 1 !important;
          animation: bounceUpRight 0.6s ease-in-out infinite;
        }
        .progress-check-item {
          display: flex;
          align-items: center;
        }
        .rp-why-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #F0F0F0;
          background: #fff;
          transition: all 0.25s ease;
        }
        .rp-why-card:hover {
          border-color: #E0E0E0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .rp-step-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #F5F5F5;
          transition: all 0.2s ease;
        }
        .rp-step-row:hover {
          background: #fafafa;
          padding-left: 8px;
        }
        .rp-step-row:last-child { border-bottom: none; }
        .rp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #1f1f1f;
          color: #fff;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
        }
        .rp-cta-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="grid-bg-animated" />

      {/* Floating Cards Section */}
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px 52px', 
        position: 'relative', 
        zIndex: 1 
      }}>
        
        {/* Gradient overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 140, 
          background: 'linear-gradient(to bottom, transparent, #f4f3f0)',
          borderRadius: '0 0 28px 28px', 
          pointerEvents: 'none', 
          zIndex: 2 
        }} />

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', borderRadius: 999, background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.18)', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
            <span style={{ fontFamily: f, fontSize: 11, fontWeight: 600, color: '#F97316', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Now Accepting Tutors</span>
          </div>
          <h1 style={{ fontFamily: fDisplay, fontSize: 38, fontWeight: 400, color: '#1f1f1f', lineHeight: 1.2, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            Become a Tutor<br />
            on <span style={{ color: '#0A2156', fontWeight: 500 }}>Home</span><span style={{ color: '#F97316', fontWeight: 500 }}>Guru</span>
          </h1>
          <p style={{ fontFamily: f, fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 }}>
            Join 10,000+ verified tutors teaching 1-on-1 across India.
          </p>
        </div>



        {/* Three Cards Container */}
        <div className="cards-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, width: '100%', maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 5, overflow: 'visible' }}>
          
          {/* Card 1: Analysis - Left (clipped 15% on left) */}
          <div
            className="card-hover"
            style={{
              flex: '0 0 auto',
              marginTop: 0,
              marginLeft: '-39px',
              animation: 'panelSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.3s both',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #EBEBEB',
              boxShadow: '0 17px 35px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              width: 260,
            }}>
              {/* Header with folder icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#fff' }}>
                    <path d="M16.5 3A1.5 1.5 0 0 1 18 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5v-9A1.5 1.5 0 0 1 3.5 5h7.293l1.56-1.56.11-.1a1.5 1.5 0 0 1 .951-.34z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, background: '#f8f8f8', borderRadius: 6, padding: '4px 8px' }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#bbb' }}>
                    <path d="M8.5 2a6.5 6.5 0 0 1 4.935 10.728l4.419 4.419.064.078a.5.5 0 0 1-.693.693l-.079-.064-4.419-4.42A6.5 6.5 0 1 1 8.5 2m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11"/>
                  </svg>
                  <span style={{ fontSize: 11, color: '#999' }}>Features...</span>
                </div>
              </div>
              
              {/* Folder grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 14 }}>
                {analysisItems.map((item, idx) => (
                  <div
                    key={item}
                    className="folder-item"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 6px',
                      borderRadius: 10,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 10,
                      background: '#fff',
                      border: '1px solid #ede8e3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s ease',
                    }}>
                      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        <path d="M7.03516 6.5H16.4238C17.0868 6.5 17.7226 6.76367 18.1914 7.23242L18.9346 7.97461C19.5909 8.63094 20.481 8.99994 21.4092 9H33C34.3807 9 35.5 10.1193 35.5 11.5V14.5C35.5 15.8807 34.3807 17 33 17H7.09961C5.73032 17 4.61565 15.8985 4.59961 14.5293L4.53516 9.0293C4.51894 7.63729 5.64306 6.5 7.03516 6.5Z" fill="#fff7ed"/>
                        <path d="M4 16.8C4 15.1198 4 14.2798 4.32698 13.638C4.6146 13.0735 5.07354 12.6146 5.63803 12.327C6.27976 12 7.11984 12 8.8 12H31.2C32.8802 12 33.7202 12 34.362 12.327C34.9265 12.6146 35.3854 13.0735 35.673 13.638C36 14.2798 36 15.1198 36 16.8V28.2C36 29.8802 36 30.7202 35.673 31.362C35.3854 31.9265 34.9265 32.3854 34.362 32.673C33.7202 33 32.8802 33 31.2 33H8.8C7.11984 33 6.27976 33 5.63803 32.673C5.07354 32.3854 4.6146 31.9265 4.32698 31.362C4 30.7202 4 29.8802 4 28.2V16.8Z" fill="#fff7ed"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 10, textAlign: 'center', color: '#666', fontWeight: idx === 0 ? 500 : 400 }}>{item}</span>
                  </div>
                ))}
              </div>
              
              {/* Footer buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '10px 14px', borderTop: '1px solid #F0F0F0', background: '#fafafa' }}>
                <span style={{ padding: '4px 14px', fontSize: 11, color: '#888', border: '1px solid #E0E0E0', borderRadius: 6, cursor: 'pointer' }}>Skip</span>
                <span style={{ padding: '4px 14px', fontSize: 11, color: '#F97316', background: '#fff7ed', border: '1px solid #ede8e3', borderRadius: 6, cursor: 'pointer' }}>Add</span>
              </div>
            </div>
          </div>

          {/* Card 2: Progress - Center */}
          <div
            className="card-hover"
            style={{
              flex: '0 0 auto',
              marginTop: 100,
              animation: 'panelSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.5s both',
              position: 'relative',
              zIndex: 1,
            }}
            onMouseEnter={startJourneyAnimation}
          >
            <div style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #EBEBEB',
              boxShadow: '0 17px 35px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              width: 310,
            }}>
              {/* Header */}
              <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fDisplay, fontSize: 15, fontWeight: 500, color: '#1f1f1f' }}>Your Journey</span>
                <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/>
                  </svg>
                </div>
              </div>
              
              {/* Progress items */}
              <div style={{ padding: '8px 18px 22px' }}>
                {progressItems.map((item, idx) => {
                  const isLoading = journeyReveal === idx;        // spinner on this item
                  const isRevealed = journeyReveal > idx;         // text shown
                  const isIdle = journeyReveal === -1;            // before hover

                  return (
                    <div key={item} className="progress-check-item" style={{ gap: 14, marginBottom: idx === progressItems.length - 1 ? 0 : 16 }}>
                      {/* Number / Spinner / Check */}
                      {isLoading ? (
                        <div className="journey-spinner" />
                      ) : isRevealed ? (
                        <div className="journey-num-pop" style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff7ed', border: '1.5px solid #ede8e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 20 20">
                            <path fill="#c2410c" d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z"/>
                          </svg>
                        </div>
                      ) : (
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: isIdle ? '#f0f0f0' : '#f0f0f0', border: '1.5px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, color: '#bbb' }}>0{idx + 1}</span>
                        </div>
                      )}

                      {/* Text � hidden until revealed */}
                      {isRevealed ? (
                        <span key={`revealed-${idx}`} className="journey-text-reveal" style={{ fontFamily: fDisplay, fontSize: 13.5, color: '#333', fontWeight: 400 }}>{item}</span>
                      ) : (
                        <span style={{ fontFamily: fDisplay, fontSize: 13.5, color: isLoading ? '#ccc' : '#ddd' }}>
                          {isLoading ? item : '�'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: Context - Right (clipped 25% on right) */}
          <div
            className="card-hover"
            style={{
              flex: '0 0 auto',
              marginTop: 50,
              marginRight: '-53px',
              animation: 'panelSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.7s both',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #EBEBEB',
              boxShadow: '0 17px 35px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              width: 210,
            }}>
              {/* Header */}
              <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fDisplay, fontSize: 14, fontWeight: 500, color: '#1f1f1f' }}>Activity</span>
                <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z"/>
                  </svg>
                </div>
              </div>
              
              {/* Context items */}
              <div style={{ padding: '8px 12px 16px' }}>
                {contextItems.map((item, idx) => {
                  const icons = [UserPlus, CalendarCheck, GraduationCap, CurrencyInr, Star];
                  const Icon = icons[idx] ?? UserPlus;
                  return (
                  <div
                    key={item.name}
                    className="context-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '8px 8px',
                      borderRadius: 8,
                      marginBottom: 2,
                    }}
                  >
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: '#fff7ed',
                      border: '1px solid #ede8e3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={14} weight="regular" color="#F97316" />
                    </div>
                    <span style={{
                      fontFamily: fDisplay,
                      fontSize: 12.5,
                      color: '#555',
                      flex: 1,
                    }}>
                      {item.name}
                    </span>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default function TutorAuth() {
  const [tab, setTab] = useState<'signup' | 'login'>('signup');

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
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
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
      else { setRedirecting(true); window.location.href = 'https://dashboard.homeguruworld.com/'; }
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

  const handlePincode = async (value: string) => {
    setPincode(value);
    setPincodeError('');
    if (value.length !== 6) { setCity(''); setState(''); return; }
    setPincodeLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
      const data = await res.json();
      if (data[0]?.Status === 'Success') {
        const post = data[0].PostOffice[0];
        setCity(post.District);
        setState(post.State);
      } else {
        setPincodeError('Invalid pincode');
        setCity(''); setState('');
      }
    } catch { setPincodeError('Could not fetch location'); }
    setPincodeLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!firstName.trim() || !lastName.trim() || !signupEmail.trim() || !phone.trim() || !gender || !pincode.trim() || !city.trim() || !state.trim() || !signupPassword.trim()) {
      setSignupError('Please fill in all fields'); return;
    }
    setSignupLoading(true);
    try {
      const res = await fetch('https://aegis.navchetna.tech/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${lastName}`, email: signupEmail, phone, gender, city, state, pincode, password: signupPassword, role: 'tutor' }),
      });
      const data = await res.json();
      if (!res.ok) setSignupError(data?.message || 'Registration failed');
      else setSignupSuccess(true);
    } catch { setSignupError('Something went wrong. Try again.'); }
    setSignupLoading(false);
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
        @media (min-width: 1024px) {
          .ta-right-panel { display: block !important; }
          .ta-left-panel { width: 50% !important; }
        }
        @media (max-width: 1023px) {
          .ta-split-wrapper {
            flex-direction: column !important;
            height: auto !important;
            overflow: visible !important;
          }
          .ta-left-panel {
            width: 100% !important;
            height: auto !important;
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
          <p style={{ fontFamily: f, fontSize: 14, fontWeight: 500, color: '#111', margin: 0 }}>Redirecting to dashboard…</p>
          <p style={{ fontFamily: f, fontSize: 12, color: '#ABABAB', margin: 0 }}>Please wait</p>
        </div>
      )}

      <div className="ta-split-wrapper" style={{ height: '100vh', display: 'flex', fontFamily: f, background: '#fff', overflow: 'hidden', alignItems: 'center', padding: '0 40px', gap: 32, boxSizing: 'border-box' }}>

        {/* LEFT PANEL */}
        <div className="ta-left-panel" style={{ width: '50%', minWidth: 380, height: '100vh', overflow: 'hidden', background: 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '20px 0', boxSizing: 'border-box' }}>

            {/* Logo */}
            <a href="/" style={{ display: 'inline-block', marginBottom: 16 }}>
              <img src="https://homeguruworld.com/wp-content/uploads/2022/04/Homeguru-Logo-1.png" alt="HomeGuru" style={{ height: 32, objectFit: 'contain' }} />
            </a>

            {/* Tab switcher */}
            <div style={{ display: 'flex', background: '#F5F5F5', borderRadius: 10, padding: 3, marginBottom: 16, gap: 2 }}>
              <button className={`ta-tab ${tab === 'signup' ? 'ta-tab-active' : 'ta-tab-inactive'}`} onClick={() => setTab('signup')}>Create Account</button>
              <button className={`ta-tab ${tab === 'login' ? 'ta-tab-active' : 'ta-tab-inactive'}`} onClick={() => setTab('login')}>Sign In</button>
            </div>

            {tab === 'signup' ? (
              signupSuccess ? (
                <div className="ta-animate" style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                    <CheckCircle size={28} weight="fill" style={{ color: '#059669' }} />
                  </div>
                  <h2 style={{ fontFamily: fDisplay, fontSize: 24, fontWeight: 500, color: '#111', margin: '0 0 8px' }}>You're on the list!</h2>
                  <p style={{ fontFamily: f, fontSize: 14, color: '#999', lineHeight: 1.7, maxWidth: 280, margin: '0 auto 28px' }}>
                    We'll review your profile and reach out within 24–48 hours.
                  </p>
                  <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', background: '#111', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: 'none', fontFamily: f }}>
                    Back to Home <ArrowRight size={13} />
                  </a>
                </div>
              ) : (
                <div className="ta-animate">
                  <div style={{ marginBottom: 14 }}>
                    <h2 style={{ fontFamily: fDisplay, fontSize: 24, fontWeight: 400, color: '#111', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Start teaching today</h2>
                    <p style={{ fontFamily: f, fontSize: 13, color: '#BDBDBD', margin: 0 }}>Create your tutor account — it's free</p>
                  </div>

                  <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                    {/* Personal Info */}
                    <p className="ta-section-title">Personal Info</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">First Name</label>
                          <input className={`ta-input${firstName ? ' ta-input-filled' : ''}`} type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setSignupError(''); }} placeholder="Ravi" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label">Last Name</label>
                          <input className={`ta-input${lastName ? ' ta-input-filled' : ''}`} type="text" value={lastName} onChange={e => { setLastName(e.target.value); setSignupError(''); }} placeholder="Sharma" />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
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

                    {/* Location */}
                    <p className="ta-section-title">Location</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ flex: '0 0 110px' }}>
                          <label className="ta-label">Pincode</label>
                          <div style={{ position: 'relative' }}>
                            <input className={`ta-input${pincode ? ' ta-input-filled' : ''}`} type="text" maxLength={6} value={pincode} onChange={e => handlePincode(e.target.value.replace(/\D/g, ''))} placeholder="400001" style={{ paddingRight: pincodeLoading ? 44 : 14 }} />
                            {pincodeLoading && <span className="ta-spinner ta-spinner-dark ta-spinner-sm" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }} />}
                          </div>
                          {pincodeError && <p style={{ fontFamily: f, fontSize: 11, color: '#DC5028', margin: '4px 0 0 2px' }}>{pincodeError}</p>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            City {city && <span style={{ fontSize: 9, fontWeight: 600, color: '#059669', background: '#F0FDF4', padding: '1px 6px', borderRadius: 4 }}>AUTO</span>}
                          </label>
                          <input className={`ta-input${city ? ' ta-input-filled' : ''}`} type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Mumbai" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ta-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            State {state && <span style={{ fontSize: 9, fontWeight: 600, color: '#059669', background: '#F0FDF4', padding: '1px 6px', borderRadius: 4 }}>AUTO</span>}
                          </label>
                          <input className={`ta-input${state ? ' ta-input-filled' : ''}`} type="text" value={state} onChange={e => setState(e.target.value)} placeholder="Maharashtra" />
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <p className="ta-section-title">Security</p>
                    <div style={{ marginBottom: 22 }}>
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

                    <button type="submit" className="ta-btn-primary" disabled={signupLoading}>
                      {signupLoading ? <><span className="ta-spinner" /><span>Creating account…</span></> : <><span>Create Account</span><ArrowRight size={14} /></>}
                    </button>

                    <p style={{ fontFamily: f, fontSize: 11.5, color: '#CACACA', textAlign: 'center', margin: '8px 0 0', lineHeight: 1.6 }}>
                      By signing up you agree to our{' '}
                      <a href="/terms-of-use" style={{ color: '#999', textDecoration: 'underline' }}>Terms</a> &{' '}
                      <a href="/privacy-policy" style={{ color: '#999', textDecoration: 'underline' }}>Privacy Policy</a>
                    </p>
                  </form>
                </div>
              )
            ) : (
              <div className="ta-animate">
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: fDisplay, fontSize: 28, fontWeight: 500, color: '#111', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Welcome back</h2>
                  <p style={{ fontFamily: f, fontSize: 14, color: '#ABABAB', margin: 0 }}>Sign in to your tutor dashboard</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
                      <><span>Sign in to Dashboard</span><ArrowRight size={15} /></>
                    )}
                  </button>
                </form>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0 0' }}>
              <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
              <p style={{ fontFamily: f, fontSize: 11, color: '#D8D8D8', margin: 0, whiteSpace: 'nowrap' }}>HomeGuru · Navchetna Technologies</p>
              <div style={{ flex: 1, height: 1, background: '#F0F0F0' }} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — floating curved card */}
        <div className="ta-right-panel" style={{ width: '50%', height: 'calc(100vh - 48px)', overflow: 'hidden', background: '#f4f3f0', position: 'relative', borderRadius: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.1)', flexShrink: 0, border: '1.5px solid #1a1a1a' }}>
          <RightPanel f={f} fDisplay={fDisplay} />
        </div>

      </div>
    </>
  );
}
