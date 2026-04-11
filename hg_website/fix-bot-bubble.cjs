const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `padding: '12px 16px', borderRadius: '16px 16px 16px 4px',\n                    background: '#fff', color: '#333', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.7, maxWidth: '88%',\n                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',\n                    border: '1px solid rgba(249,115,22,0.12)',`,
  `padding: '12px 16px', borderRadius: '16px 16px 16px 4px',\n                    background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.7, maxWidth: '88%',\n                    boxShadow: 'none',\n                    border: '1px solid rgba(249,115,22,0.15)',`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Bot bubbles now use light orange tint bg.');
