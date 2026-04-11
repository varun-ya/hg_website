const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  "color: '#F97316', fontWeight: 500 }}>Osmium AI</span>",
  "color: '#111', fontWeight: 500 }}>Osmium AI</span>"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Osmium AI is now black.');
