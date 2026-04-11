const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the dot grid div
content = content.replace(
  `<div className="chat-grid-bg" />`,
  ''
);

// Remove orange border on the right panel container
content = content.replace(
  "border: '1.5px solid #FDBA74'",
  "border: 'none'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Removed dots and border.');
