const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  "width: '50%', height: 'calc(100vh - 48px)', overflow: 'hidden', background: '#FFF7ED', position: 'relative', borderRadius: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.1)', flexShrink: 0, border: 'none'",
  "width: '45%', height: 'calc(100vh - 80px)', overflow: 'hidden', background: '#FFF7ED', position: 'relative', borderRadius: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.08)', flexShrink: 0, border: 'none'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Right panel is smaller with more space around it.');
