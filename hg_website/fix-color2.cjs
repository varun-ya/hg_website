const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Globe icon stroke
content = content.replace('stroke="#91B7CE" strokeWidth="2" strokeLinecap="round"><circle', 'stroke="#F97316" strokeWidth="2" strokeLinecap="round"><circle');

// Cursor in CSS block
content = content.replace('background: #91B7CE; margin-left: 2px', 'background: #F97316; margin-left: 2px');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed last 2 blue references!');
