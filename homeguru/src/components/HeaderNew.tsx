import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';

type DropdownId = '1on1' | 'news' | null;

const ACADEMIC = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics'];
const NON_ACADEMIC = ['Music', 'Art & Drawing', 'Yoga & Fitness', 'Coding', 'Dance', 'Photography'];

const ACADEMIC_LEFT = ['Mathematics', 'Science', 'English'];
const ACADEMIC_RIGHT = ['History', 'Geography', 'Physics'];
const NON_ACADEMIC_LEFT = ['Music', 'Art & Drawing', 'Yoga & Fitness'];
const NON_ACADEMIC_RIGHT = ['Coding', 'Dance', 'Photography'];
const NEWS_LINKS = ['Blog', 'Customer Stories', 'Press', 'Updates'];

export default function Header({
  latestBlogTitle = 'Latest from HomeGuru',
  latestBlogHref = 'https://www.homeguruworld.com/blogs/',
  latestBlogImage = '',
}: {
  latestBlogTitle?: string;
  latestBlogHref?: string;
  latestBlogImage?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback((id: DropdownId) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const smoothScrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const f = 'Matter, sans-serif';

  // Shared link style
  const linkStyle: React.CSSProperties = {
    display: 'block',
    padding: '9px 12px',
    borderRadius: 8,
    textDecoration: 'none',
    fontFamily: f,
    fontSize: 14,
    fontWeight: 400,
    color: '#1d1d1f',
    letterSpacing: '-0.01em',
    transition: 'background 0.12s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const sectionLabel: React.CSSProperties = {
    fontFamily: f,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#86868b',
    padding: '0 12px',
    marginBottom: 6,
    display: 'block',
  };

  return (
    <>
      <style>{`
        .hg-shell { position: relative; z-index: 10000; }
        .hg-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9998; pointer-events: none;
        }
        .hg-nav-btn {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 14px; border-radius: 999px; border: none;
          background: transparent; cursor: pointer;
          font-family: Matter, sans-serif; font-weight: 500;
          font-size: 11.5px; letter-spacing: 0.06em;
          text-transform: uppercase; color: #1d1d1f;
          transition: background 0.15s; white-space: nowrap;
        }
        .hg-nav-btn:hover, .hg-nav-btn.active { background: rgba(0,0,0,0.06); }
        .hg-nav-btn .chevron { opacity: 0.45; transition: transform 0.2s, opacity 0.2s; }
        .hg-nav-btn.active .chevron { transform: rotate(180deg); opacity: 0.8; }
        .hg-nav-link {
          display: inline-flex; align-items: center;
          padding: 6px 14px; border-radius: 999px;
          font-family: Matter, sans-serif; font-weight: 500;
          font-size: 11.5px; letter-spacing: 0.06em;
          text-transform: uppercase; color: #1d1d1f;
          text-decoration: none; transition: background 0.15s; white-space: nowrap;
        }
        .hg-nav-link:hover { background: rgba(0,0,0,0.06); }
        .hg-panel {
          position: absolute; top: calc(100% + 1px);
          left: -1px; right: -1px; z-index: 10001;
          pointer-events: none; transform-origin: top center;
        }
        .hg-panel-inner {
          pointer-events: auto;
          background: #fff;
          border-radius: 0 0 16px 16px;
          border-left: 1px solid rgba(0,0,0,0.08);
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .hg-link:hover { background: #f5f5f7 !important; }
        .hg-card-link:hover { opacity: 0.92; }
      `}</style>

      <AnimatePresence>
        {activeDropdown && (
          <motion.div className="hg-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }} style={{ pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 right-0 left-0 z-[10000] w-full">
        <div
          className="hg-shell mx-auto max-w-width-mx"
          onMouseLeave={scheduleClose}
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: activeDropdown ? '16px 16px 0 0' : 16,
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            marginTop: 12,
          }}
        >
          {/* Nav row */}
          <nav className="flex justify-between items-center py-3 pr-4 pl-6 w-full">
            <a href="/" className="flex flex-1 items-center">
              <img src="https://homeguruworld.com/wp-content/uploads/2022/04/Homeguru-Logo-1.png" alt="HomeGuru" className="w-auto h-10 md:h-12" />
            </a>

            <div className="hidden lg:flex flex-2 justify-center items-center gap-1">
              <button className={`hg-nav-btn${activeDropdown === '1on1' ? ' active' : ''}`} onMouseEnter={() => openDropdown('1on1')}>
                1 on 1 Classes <CaretDown size={11} weight="bold" className="chevron" />
              </button>
              <a href="/become-a-tutor" className="hg-nav-link">Become a Tutor</a>
              <a href="#about" className="hg-nav-link" onClick={e => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
              <button className={`hg-nav-btn${activeDropdown === 'news' ? ' active' : ''}`} onMouseEnter={() => openDropdown('news')}>
                News <CaretDown size={11} weight="bold" className="chevron" />
              </button>
            </div>

            <div className="hidden md:flex flex-1 justify-end items-center gap-2.5">
              <a href="https://dashboard.homeguruworld.com/">
                <button style={{ fontFamily: f, fontWeight: 500, fontSize: 13, padding: '8px 20px', borderRadius: 999, background: '#1d1d1f', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >Get Started</button>
              </a>
              <a href="/contact-us">
                <button style={{ fontFamily: f, fontWeight: 500, fontSize: 13, padding: '8px 20px', borderRadius: 999, background: 'transparent', color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer', letterSpacing: '-0.01em', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >Login</button>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden flex flex-col justify-center items-center space-y-1 w-8 h-8 focus:outline-none">
              <span className={`w-5 h-0.5 bg-[#1d1d1f] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-[#1d1d1f] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-[#1d1d1f] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </nav>

          {/* Dropdowns */}
          <AnimatePresence>
            {activeDropdown === '1on1' && (
              <motion.div key="1on1" className="hg-panel"
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
              >
                <div className="hg-panel-inner" style={{ display: 'flex', minHeight: 300 }}>

                  {/* Academic */}
                  <div style={{ flex: 1, padding: '28px 8px 28px 24px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <span style={sectionLabel}>Academic</span>
                      {ACADEMIC.map(label => (
                        <a key={label} href="#" className="hg-link" style={linkStyle}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >{label}</a>
                      ))}
                    </div>
                  </div>

                  {/* Non-Academic */}
                  <div style={{ flex: 1, padding: '28px 8px 28px 16px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <span style={sectionLabel}>Non-Academic</span>
                      {NON_ACADEMIC.map(label => (
                        <a key={label} href="#" className="hg-link" style={linkStyle}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >{label}</a>
                      ))}
                    </div>
                  </div>

                  {/* Featured card */}
                  <div style={{ flex: 1.2, padding: '28px 24px', display: 'flex', alignItems: 'center', background: '#fafafa' }}>
                    <a href="#" className="hg-card-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 14, width: '100%', background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <img src="/assets/spoken.png" alt="Spoken English" style={{ width: 88, height: 88, borderRadius: 12, objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }} />
                        <div style={{ flex: 1, paddingTop: 2 }}>
                          <p style={{ fontFamily: f, fontSize: 16, fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3, margin: '0 0 10px', letterSpacing: '-0.02em' }}>Spoken English Mastery</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                            <span style={{ fontFamily: f, fontSize: 12, color: '#86868b' }}>24 Lessons</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontFamily: f, fontSize: 12.5, color: '#6e6e73', lineHeight: 1.6, margin: 0, letterSpacing: '-0.005em' }}>Build fluency and confidence in English through structured 1-on-1 sessions with expert tutors across India.</p>
                    </a>
                  </div>

                </div>
              </motion.div>
            )}

            {activeDropdown === 'news' && (
              <motion.div key="news" className="hg-panel"
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
              >
                <div className="hg-panel-inner" style={{ display: 'flex', minHeight: 300 }}>

                  {/* Explore links */}
                  <div style={{ flex: 1, padding: '28px 8px 28px 24px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <span style={sectionLabel}>Explore</span>
                      {NEWS_LINKS.slice(0, 3).map(label => (
                        <a key={label} href="https://homeguruworld.com/blogs/" className="hg-link" style={linkStyle}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >{label}</a>
                      ))}
                    </div>
                  </div>

                  {/* More links */}
                  <div style={{ flex: 1, padding: '28px 8px 28px 16px', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                      <span style={sectionLabel}>More</span>
                      {NEWS_LINKS.slice(1).map(label => (
                        <a key={label} href="https://homeguruworld.com/blogs/" className="hg-link" style={linkStyle}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >{label}</a>
                      ))}
                    </div>
                  </div>

                  {/* Featured blog card */}
                  <div style={{ flex: 1.2, padding: '28px 24px', display: 'flex', alignItems: 'center', background: '#fafafa' }}>
                    <a href={latestBlogHref} className="hg-card-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 14, width: '100%', background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        {latestBlogImage ? (
                          <img src={latestBlogImage} alt={latestBlogTitle} style={{ width: 88, height: 88, borderRadius: 12, objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }} />
                        ) : (
                          <div style={{ width: 88, height: 88, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg, #c7654a 0%, #b05a6e 40%, #7b6ea0 75%, #6b7fc4 100%)', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }} />
                        )}
                        <div style={{ flex: 1, paddingTop: 2 }}>
                          <p style={{ fontFamily: f, fontSize: 16, fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{latestBlogTitle}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                            <span style={{ fontFamily: f, fontSize: 12, color: '#86868b' }}>Latest Post</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontFamily: f, fontSize: 12.5, color: '#6e6e73', lineHeight: 1.6, margin: 0, letterSpacing: '-0.005em' }}>Stay updated with the latest news, tips, and stories from the HomeGuru community.</p>
                    </a>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="lg:hidden overflow-hidden"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { label: '1 on 1 Classes', href: '#' },
                    { label: 'Become a Tutor', href: '/become-a-tutor' },
                    { label: 'About', scroll: 'about' },
                    { label: 'Blog', href: 'https://homeguruworld.com/blogs/' },
                  ].map(({ label, href, scroll }: any) => (
                    <a key={label} href={href || `#${scroll}`}
                      onClick={scroll ? (e: any) => { e.preventDefault(); smoothScrollTo(scroll); setIsMenuOpen(false); } : undefined}
                      style={{ ...linkStyle, fontSize: 15, padding: '10px 12px' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >{label}</a>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                    <a href="https://dashboard.homeguruworld.com/">
                      <button style={{ width: '100%', fontFamily: f, fontWeight: 500, fontSize: 14, padding: '11px 20px', borderRadius: 999, background: '#1d1d1f', color: '#fff', border: 'none', cursor: 'pointer' }}>Get Started</button>
                    </a>
                    <a href="/contact-us">
                      <button style={{ width: '100%', fontFamily: f, fontWeight: 500, fontSize: 14, padding: '11px 20px', borderRadius: 999, background: 'transparent', color: '#1d1d1f', border: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}>Login</button>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
