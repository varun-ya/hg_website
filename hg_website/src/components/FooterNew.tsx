export default function FooterNew() {
  return (
    <footer
      className="bottom-0 z-10 relative md:sticky mx-auto border-t w-screen overflow-hidden pointer-events-auto"
      style={{ background: '#fff', borderColor: '#EBEBEB' }}
    >
      {/* Warm gradient at bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 65% 55% at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 40% 45% at 15% 100%, rgba(139,92,246,0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 40% 45% at 85% 100%, rgba(59,130,246,0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div className="relative z-10 mx-auto p-10 md:px-16 pt-20 md:pt-24 pb-10 max-w-width-mx">

        {/* Main grid */}
        <div className="flex lg:flex-row flex-col justify-start md:justify-between items-start gap-16 md:gap-24 lg:gap-[200px] w-full">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <a className="flex items-center" href="/">
              <img src="https://homeguruworld.com/wp-content/uploads/2022/04/Homeguru-Logo-1.png" alt="HomeGuru" style={{ height: '40px', width: 'auto' }} />
            </a>
            <p className="font-matter text-[14px] leading-[1.7]" style={{ color: '#999', maxWidth: '260px' }}>
              A revolutionary Ed-tech platform for all your learning needs. Connect with 10,000+ expert tutors across India.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+919001990019" className="font-matter text-[13px]" style={{ color: '#888', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F97316')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >+91 90019 90019</a>
              <a href="mailto:support@homeguruworld.com" className="font-matter text-[13px]" style={{ color: '#888', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F97316')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >support@homeguruworld.com</a>
              <span className="font-matter text-[13px]" style={{ color: '#888' }}>Jodhpur, Rajasthan, India</span>
            </div>
            {/* Social icons row */}
            <div className="flex items-center gap-3 mt-2">
              {[
                {
                  href: 'https://www.linkedin.com/company/homeguru', label: 'LinkedIn',
                  path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z'
                },
                {
                  href: 'https://x.com/homeguruworld', label: 'X',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
                },
                {
                  href: 'https://www.instagram.com/homeguruworld', label: 'Instagram',
                  path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z'
                },
              ].map(({ href, label, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '10px',
                    border: '1px solid #E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s, background 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F97316'; (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#999"><path d={path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="justify-center gap-12 md:gap-8 lg:gap-16 grid grid-cols-2 md:grid-cols-4 w-full">
            {[
              {
                title: 'Learn', links: [
                  { label: 'Explore Subjects', href: '#subjects' },
                  { label: 'Find a Guru', href: '#Gurus' },
                  { label: 'Free Demo', href: '#demo' },
                ]
              },
              {
                title: 'Teach', links: [
                  { label: 'Join as a Guru', href: '/become-a-tutor' },
                  { label: 'Tutor Dashboard', href: 'https://dashboard.homeguruworld.com/' },
                ]
              },
              {
                title: 'Company', links: [
                  { label: 'About', href: '/about-us' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Support', href: '/support' },
                ]
              },
              {
                title: 'Legal', links: [
                  { label: 'Terms & Conditions', href: '/terms-of-use' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Refund Policy', href: '/refund-policy' },
                  { label: 'Learner Policy', href: '/learner-policy' },
                  { label: 'Tutor Agreement', href: '/tutor-agreement' },
                ]
              },
            ].map(col => (
              <div key={col.title} className="flex flex-col gap-5 w-fit">
                <h3
                  className="w-fit font-matter font-semibold text-[11px] uppercase leading-normal"
                  style={{ color: '#3d3d3d', letterSpacing: '2px' }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3 w-fit font-matter">
                  {col.links.map(link => (
                    <li key={link.label} className="w-fit">
                      <a
                        href={link.href}
                        className="block w-fit text-sm leading-normal transition-colors duration-200"
                        style={{ color: '#888' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#F97316')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#EBEBEB', width: '100%', margin: '48px 0 20px' }} />

        {/* Bottom bar */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-3 w-full font-matter text-[12px] text-center leading-[1.5]" style={{ color: '#999' }}>
          <span>© 2025 HomeGuru. All rights reserved.</span>
          <span>
            Made with <span style={{ color: '#F97316' }}>♥</span> at NAVCHETNA
          </span>

        </div>
      </div>
    </footer>
  );
}
