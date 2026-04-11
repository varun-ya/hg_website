const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix import to include useEffect and useRef
content = content.replace(
  "import { useState } from 'react';",
  "import { useState, useEffect, useRef } from 'react';"
);

// Remove the broken require line
content = content.replace(
  "  const { useState, useEffect, useRef } = require('react');\n\n",
  ""
);

// Replace all React.useState -> useState, React.useEffect -> useEffect, React.useRef -> useRef
content = content.replace(/React\.useState/g, 'useState');
content = content.replace(/React\.useEffect/g, 'useEffect');
content = content.replace(/React\.useRef/g, 'useRef');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed imports and hook calls!');
