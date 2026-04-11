const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentAuth.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Shorten bot answers
content = content.replace(
  "text: 'Electromagnetism is a branch of physics that studies the interaction between electric charges and magnetic fields. It explains how electric currents produce magnetic fields and how changing magnetic fields create electric forces. Maxwell\\'s equations unify electricity and magnetism into one framework.',",
  "text: 'Electromagnetism studies how electric charges and magnetic fields interact. It unifies electricity and magnetism into one framework.',"
);

content = content.replace(
  "text: 'Great news! I found 3 Physics tutors who specialize in Electromagnetism. Vikram Joshi has a 4.9 rating and is available today. He uses visual simulations to explain concepts. Want me to book a demo?',",
  "text: 'Found 3 expert tutors! Vikram Joshi (4.9 rating) is available today. Want me to book a demo?',"
);

// 2. Add Osmium logo to search steps section - replace the search rendering block
content = content.replace(
  `if (item.type === 'search') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
                  {item.steps?.map((step, si) => {`,
  `if (item.type === 'search') {
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', gap: 10, paddingLeft: 0 }}>
                  <img src="/osmium.png" alt="Osmium AI" style={{ width: 22, height: 22, borderRadius: 6, objectFit: 'contain', marginTop: 1, flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {item.steps?.map((step, si) => {`
);

// Close the extra wrapper div for search steps
content = content.replace(
  `                  })}
                </div>
              );
            }

            if (item.type === 'bot') {`,
  `                  })}
                  </div>
                </div>
              );
            }

            if (item.type === 'bot') {`
);

// 3. Add Osmium logo avatar before bot answer bubble (like Claude)
content = content.replace(
  `if (item.type === 'bot') {
              const words = item.text.split(' ');
              const showWords = phase >= idx ? (phase === idx ? wordIndex : words.length) : 0;
              const isTyping = phase === idx && wordIndex < words.length;
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{`,
  `if (item.type === 'bot') {
              const words = item.text.split(' ');
              const showWords = phase >= idx ? (phase === idx ? wordIndex : words.length) : 0;
              const isTyping = phase === idx && wordIndex < words.length;
              return (
                <div key={idx} className="chat-msg-enter" style={{ display: 'flex', justifyContent: 'flex-start', gap: 10 }}>
                  <img src="/osmium.png" alt="Osmium AI" style={{ width: 22, height: 22, borderRadius: 6, objectFit: 'contain', marginTop: 2, flexShrink: 0 }} />
                  <div style={{`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Added Osmium AI logo to search steps + bot answers, shortened answers.');
