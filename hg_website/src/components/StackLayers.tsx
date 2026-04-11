import { useEffect, useRef } from 'react';
import '../styles/stack.css';

export default function StackLayers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated particles
      for (let i = 0; i < 50; i++) {
        const x = (i * 50 + frame) % canvas.width;
        const y = Math.sin(i + frame * 0.01) * 50 + canvas.height / 2;
        
        ctx.fillStyle = `rgba(165, 187, 252, ${0.1 + Math.sin(frame * 0.02 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="stack-section">
      <div className="container">
        <div className="stack-header">
          <p className="label">For Enterprise | Government | Developers</p>
          <h2>India's Full-stack Home Services Platform</h2>
        </div>

        <div className="stack-content">
          <div className="stack-visual">
            <canvas ref={canvasRef} className="stack-canvas" />
            <div className="glass-cards">
              <div className="glass-card" style={{ transform: 'rotateX(55deg) rotateZ(-45deg)' }}></div>
              <div className="glass-card" style={{ transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(50px)' }}></div>
              <div className="glass-card" style={{ transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(100px)' }}></div>
            </div>
          </div>

          <div className="stack-info">
            <div className="stack-layer">
              <h3>Population-scale Applications</h3>
              <p>Building services India can use. Professional agents fluent in India's languages.</p>
              <div className="tags">
                <span className="tag">HomeGuru</span>
                <span className="tag">Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
