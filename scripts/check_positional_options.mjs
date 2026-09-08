import fs from 'fs';

const content = fs.readFileSync('src/data/questions.ts', 'utf8');
const eqIdx = content.indexOf('=');
const arrayStr = content.slice(content.indexOf('[', eqIdx), content.lastIndexOf(']') + 1);
const questions = JSON.parse(arrayStr);

const special = questions.filter(x => {
  return Object.values(x.options).some(o => 
    /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं|a और b दोनों/i.test(o.en || '') ||
    /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं|a और b दोनों/i.test(o.hi || '')
  );
});

console.log('Total questions with positional options:', special.length);
special.forEach(s => {
  console.log(`\n[${s.id}] Correct: ${s.correctAnswer}`);
  console.log('  A:', s.options.A.en);
  console.log('  B:', s.options.B.en);
  console.log('  C:', s.options.C.en);
  console.log('  D:', s.options.D.en);
});
