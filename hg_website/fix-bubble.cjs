const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace user bubble styling: solid orange -> light orange tint with border
content = content.replace(
  `padding: '10px 16px', borderRadius: '16px 16px 4px 16px',\n                    background: '#F97316', color: '#fff', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.55, maxWidth: '80%', fontWeight: 450,`,
  `padding: '10px 16px', borderRadius: '16px 16px 4px 16px',\n                    background: 'rgba(249,115,22,0.08)', color: '#111', fontSize: 13.5,\n                    fontFamily: f, lineHeight: 1.55, maxWidth: '80%', fontWeight: 450,\n                    border: '1px solid rgba(249,115,22,0.15)',`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! User bubbles now use light orange tint bg with border.');
