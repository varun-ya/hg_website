const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `padding: '12px 16px', borderRadius: '16px 16px 16px 4px',\n                    background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.7, maxWidth: '88%',\n                    boxShadow: 'none',\n                    border: '1px solid rgba(249,115,22,0.15)',`,
  `padding: '12px 16px', borderRadius: '16px 16px 16px 4px',\n                    background: '#F5F5F5', color: '#111', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.7, maxWidth: '88%',\n                    boxShadow: 'none',\n                    border: 'none',\n                    position: 'relative' as const, overflow: 'hidden',`
);

// Now add the gradient overlay divs inside the bot bubble
// Find the bot bubble content rendering and wrap it
content = content.replace(
  `{words.slice(0, showWords).map((word, wi) => (
                      <span key={wi} className="chat-word-reveal" style={{ animationDelay: '0s' }}>
                        {word}{' '}
                      </span>
                    ))}
                    {isTyping && <span className="chat-cursor" />}`,
  `<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 65% at 50% 110%, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.082) 25%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 55% at 20% 100%, rgba(139,92,246,0.14) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 55% at 80% 100%, rgba(59,130,246,0.1) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>
                    {words.slice(0, showWords).map((word, wi) => (
                      <span key={wi} className="chat-word-reveal" style={{ animationDelay: '0s' }}>
                        {word}{' '}
                      </span>
                    ))}
                    {isTyping && <span className="chat-cursor" />}
                    </span>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Bot bubbles now have the signature radial gradient bg.');
