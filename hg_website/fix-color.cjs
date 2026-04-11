const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find RightPanel boundaries only (don't touch StudentAuth)
const rpStart = content.indexOf('function RightPanel(');
const saStart = content.indexOf('export default function StudentAuth()');
let rpCode = content.substring(rpStart, saStart);
const before = content.substring(0, rpStart);
const after = content.substring(saStart);

// --- Replace blue with orange in RightPanel only ---

// Dot grid background: blue dots -> orange dots
rpCode = rpCode.replace('#C8DDE8 1px', '#FDDCB5 1px');

// User message bubbles: blue -> orange
rpCode = rpCode.replace(/background: '#91B7CE'/g, "background: '#F97316'");

// Search step text color
rpCode = rpCode.replace(/color: '#5A8FAD'/g, "color: '#B45309'");

// Typing cursor
rpCode = rpCode.replace(/background: '#91B7CE'; margin-left/g, "background: '#F97316'; margin-left");

// Scrollbar thumb
rpCode = rpCode.replace(/rgba\(145,183,206,0\.3\)/g, 'rgba(249,115,22,0.3)');

// Header icon gradient: blue -> orange
rpCode = rpCode.replace("linear-gradient(135deg, #91B7CE, #6A9AB8)", "linear-gradient(135deg, #F97316, #EA580C)");

// Header text color
rpCode = rpCode.replace("color: '#3A6B85'", "color: '#9A3412'");

// Header pill background
rpCode = rpCode.replace("rgba(145,183,206,0.12)", "rgba(249,115,22,0.08)");
rpCode = rpCode.replace("rgba(145,183,206,0.3)", "rgba(249,115,22,0.25)");

// Online dot and text (keep green - that's fine)

// Bot message border
rpCode = rpCode.replace(/rgba\(145,183,206,0\.15\)/g, "rgba(249,115,22,0.12)");

// Header border bottom
rpCode = rpCode.replace("rgba(145,183,206,0.2)", "rgba(249,115,22,0.15)");

// Bottom gradient: blue-ish -> warm orange-ish
rpCode = rpCode.replace("linear-gradient(transparent, #EDF4F8)", "linear-gradient(transparent, #FFF7ED)");

// Bottom heading "Tutor" color
rpCode = rpCode.replace("color: '#91B7CE', fontWeight: 500", "color: '#F97316', fontWeight: 500");

// Bot bubble typing indicator background (if any rgba blue left)
rpCode = rpCode.replace("rgba(145,183,206,0.15)'", "rgba(249,115,22,0.08)'");

content = before + rpCode + after;

// Also fix the right panel container background and border
content = content.replace(
  "background: '#EDF4F8'",
  "background: '#FFF7ED'"
);
content = content.replace(
  "border: '1.5px solid #91B7CE'",
  "border: '1.5px solid #FDBA74'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Changed blue theme to orange theme.');
