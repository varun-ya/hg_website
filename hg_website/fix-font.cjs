const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `<span style={{ fontFamily: f, fontSize: 13, fontWeight: 600, color: '#9A3412' }}><span style={{ color: '#0A2156', fontWeight: 600 }}>HomeGuru</span> <span style={{ color: '#999', fontWeight: 400, fontSize: 11 }}>\u00d7</span> <span style={{ color: '#F97316', fontWeight: 600 }}>Osmium AI</span></span>`,
  `<span style={{ fontFamily: f, fontSize: 13, fontWeight: 500, color: '#111' }}><span style={{ color: '#0A2156', fontWeight: 500 }}>HomeGuru</span> <span style={{ color: '#999', fontWeight: 400, fontSize: 11 }}>\u00d7</span> <span style={{ color: '#F97316', fontWeight: 500 }}>Osmium AI</span></span>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Font weight changed to 500');
