import fs from 'fs';

const content = fs.readFileSync('src/data/questions.ts', 'utf8');
const eqIdx = content.indexOf('=');
const arrayStr = content.slice(content.indexOf('[', eqIdx), content.lastIndexOf(']') + 1);
const questions = JSON.parse(arrayStr);

const counts = { A: 0, B: 0, C: 0, D: 0, other: 0 };
questions.forEach(q => {
  const ans = q.correctAnswer;
  if (counts[ans] !== undefined) {
    counts[ans]++;
  } else {
    counts.other++;
  }
});

console.log('Total questions:', questions.length);
console.log('Distribution:', counts);
console.log(`Percentages:
A: ${((counts.A / questions.length) * 100).toFixed(1)}%
B: ${((counts.B / questions.length) * 100).toFixed(1)}%
C: ${((counts.C / questions.length) * 100).toFixed(1)}%
D: ${((counts.D / questions.length) * 100).toFixed(1)}%
`);

// Also check Set 2 specifically
const set2 = questions.filter(q => q.id.includes('_s2_'));
const s2Counts = { A: 0, B: 0, C: 0, D: 0 };
set2.forEach(q => {
  if (s2Counts[q.correctAnswer] !== undefined) s2Counts[q.correctAnswer]++;
});
console.log(`Set 2 questions count: ${set2.length}`);
console.log('Set 2 Distribution:', s2Counts);
console.log(`Set 2 Percentages:
A: ${((s2Counts.A / set2.length) * 100).toFixed(1)}%
B: ${((s2Counts.B / set2.length) * 100).toFixed(1)}%
C: ${((s2Counts.C / set2.length) * 100).toFixed(1)}%
D: ${((s2Counts.D / set2.length) * 100).toFixed(1)}%
`);
