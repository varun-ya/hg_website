import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const logos = [
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-01.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-02.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-03.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-04.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-05.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-06.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-07.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-08.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-09.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-10.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-11.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-12.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-13.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-14.svg',
  'https://assets.homeguruworld.com/assets/prod-homeguru/logos/products/homeguru-logo-15.svg',
];

export default function LogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = 150 * logos.length + 60 * logos.length;

    gsap.to(track, {
      x: -totalWidth / 2,
      duration: 70,
      ease: 'none',
      repeat: -1
    });
  }, []);

  return (
    <div className="mx-auto" style={{width: '100%', overflow: 'hidden', mask: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'}}>
      <div ref={trackRef} className="flex items-center" style={{width: 'fit-content', gap: '60px'}}>
        {[...logos, ...logos].map((logo, i) => (
          <div 
            key={i}
            className="flex items-center justify-center"
            style={{
              width: '150px',
              height: '100px',
              flexShrink: 0
            }}
          >
            <img 
              src={logo} 
              alt={`Partner logo ${(i % logos.length) + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'grayscale(100%) brightness(0.8)',
                opacity: 0.7
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
