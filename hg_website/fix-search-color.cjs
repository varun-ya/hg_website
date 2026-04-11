const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Search step text color: dark orange -> grey
content = content.replace(
  "color: '#B45309', fontWeight: 500",
  "color: '#888', fontWeight: 500"
);

// Spark icon stroke: orange -> grey
content = content.replace(
  'stroke="#E8913A"',
  'stroke="#999"'
);

// Globe icon stroke: orange -> grey
content = content.replace(
  'stroke="#F97316" strokeWidth="2" strokeLinecap="round"><circle',
  'stroke="#999" strokeWidth="2" strokeLinecap="round"><circle'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Search steps are now grey.');
