const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the header name section
content = content.replace(
  `<img src="/osmium.png" alt="Osmium AI" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
            <span style={{ fontFamily: f, fontSize: 14, fontWeight: 500, color: '#111' }}>Osmium AI</span>`,
  `<img src="/osmium.png" alt="Guru AI" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <span style={{ fontFamily: f, fontSize: 16, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>Guru AI</span>
              <a href="https://osmium.co.in" target="_blank" rel="noopener noreferrer" style={{ fontFamily: f, fontSize: 10, fontWeight: 400, color: '#999', textDecoration: 'none', lineHeight: 1.2 }}>powered by <span style={{ color: '#666', fontWeight: 500 }}>Osmium AI</span></a>
            </div>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Changed to Guru AI + powered by Osmium AI link.');
