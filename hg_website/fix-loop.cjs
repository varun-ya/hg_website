const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the reset and loop block
content = content.replace(
  `      // Reset and loop
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setVisibleItems([]);
        setPhase(0);
        setSearchStep(0);
        setWordIndex(0);
        runConversation(1500);
      }, delay + 2000));
    };

    runConversation(800);`,
  `    };

    runConversation(800);`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Animation plays only once now.');
