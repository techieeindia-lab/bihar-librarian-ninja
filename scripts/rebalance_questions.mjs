import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

// 1. Seeded PRNG for reproducible, uniform shuffle
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

const letters = ['A', 'B', 'C', 'D'];

async function upsertBatch(table, rows, chunkSize = 50) {
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(chunk)
    });
    if (!res.ok) {
      throw new Error(`Failed to upsert to ${table} (chunk ${i}): ${await res.text()}`);
    }
    process.stdout.write(`.`);
  }
  console.log(' Done!');
}

async function main() {
  console.log('📦 Reading src/data/questions.ts...');
  const questionsTsPath = path.resolve('src/data/questions.ts');
  const fileContent = fs.readFileSync(questionsTsPath, 'utf8');
  const eqIdx = fileContent.indexOf('=');
  const arrayStr = fileContent.slice(fileContent.indexOf('[', eqIdx), fileContent.lastIndexOf(']') + 1);
  const questions = JSON.parse(arrayStr);

  console.log(`Loaded ${questions.length} questions.`);

  // Create backup
  fs.writeFileSync('src/data/questions.backup.json', JSON.stringify(questions, null, 2), 'utf8');
  console.log('✅ Created backup at src/data/questions.backup.json');

  // Check initial distribution
  const initialDist = { A: 0, B: 0, C: 0, D: 0 };
  questions.forEach(q => initialDist[q.correctAnswer]++);
  console.log('Initial distribution:', initialDist);

  // Shuffle options
  const rebalancedQuestions = questions.map((q) => {
    // Preserve D if positional (e.g. "All of the above" / "उपर्युक्त सभी")
    const isPositional = Object.values(q.options).some(o => 
      /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं/i.test(o.en || '') ||
      /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं/i.test(o.hi || '')
    );

    if (isPositional && q.correctAnswer === 'D') {
      return q; // Keep D on D
    }

    const rand = mulberry32(hashString(q.id) ^ 0x12345678);

    const items = letters.map(letter => ({
      letter,
      isCorrect: letter === q.correctAnswer,
      opt: q.options[letter]
    }));

    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    // Assign new options A, B, C, D
    const newOptions = {};
    let newCorrect = 'A';
    letters.forEach((newLetter, idx) => {
      newOptions[newLetter] = items[idx].opt;
      if (items[idx].isCorrect) {
        newCorrect = newLetter;
      }
    });

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrect
    };
  });

  // Verify new distribution
  const newDist = { A: 0, B: 0, C: 0, D: 0 };
  rebalancedQuestions.forEach(q => newDist[q.correctAnswer]++);
  console.log('\nNew balanced distribution:');
  console.log(newDist);
  console.log(`Percentages:
A: ${((newDist.A / rebalancedQuestions.length) * 100).toFixed(1)}% (${newDist.A})
B: ${((newDist.B / rebalancedQuestions.length) * 100).toFixed(1)}% (${newDist.B})
C: ${((newDist.C / rebalancedQuestions.length) * 100).toFixed(1)}% (${newDist.C})
D: ${((newDist.D / rebalancedQuestions.length) * 100).toFixed(1)}% (${newDist.D})
`);

  // 1. Write back to local src/data/questions.ts
  console.log('💾 Writing rebalanced questions to src/data/questions.ts...');
  fs.writeFileSync(
    questionsTsPath,
    `import { Question } from '../types/index';\n\nexport const QUESTIONS: Question[] = ${JSON.stringify(rebalancedQuestions, null, 2)};\n`,
    'utf8'
  );
  console.log('✅ Updated src/data/questions.ts');

  // 2. Update seed_set2_questions.json if present
  const seedPath = path.resolve('bulk_templates/seed_set2_questions.json');
  if (fs.existsSync(seedPath)) {
    console.log('💾 Updating bulk_templates/seed_set2_questions.json...');
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    const rebalancedMap = new Map(rebalancedQuestions.map(q => [q.id, q]));
    
    seedData.questions = seedData.questions.map(q => {
      const match = rebalancedMap.get(q.id);
      if (match) {
        return {
          ...q,
          option_a_hi: match.options.A.hi,
          option_a_en: match.options.A.en,
          option_b_hi: match.options.B.hi,
          option_b_en: match.options.B.en,
          option_c_hi: match.options.C.hi,
          option_c_en: match.options.C.en,
          option_d_hi: match.options.D.hi,
          option_d_en: match.options.D.en,
          correct_answer: match.correctAnswer
        };
      }
      return q;
    });
    fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2), 'utf8');
    console.log('✅ Updated bulk_templates/seed_set2_questions.json');
  }

  // 3. Upsert to Supabase
  console.log(`🚀 Upserting ${rebalancedQuestions.length} rebalanced questions to remote Supabase...`);
  const qRows = rebalancedQuestions.map(q => ({
    id: q.id,
    category: q.category,
    question_hi: q.question.hi,
    question_en: q.question.en,
    option_a_hi: q.options.A.hi,
    option_a_en: q.options.A.en,
    option_b_hi: q.options.B.hi,
    option_b_en: q.options.B.en,
    option_c_hi: q.options.C.hi,
    option_c_en: q.options.C.en,
    option_d_hi: q.options.D.hi,
    option_d_en: q.options.D.en,
    correct_answer: q.correctAnswer,
    explanation_hi: q.explanation.hi,
    explanation_en: q.explanation.en,
    difficulty: q.difficulty || 'medium',
    year: q.year || null,
    source_exam: q.sourceExam || 'BPSC / KVS Librarian'
  }));

  await upsertBatch('questions', qRows, 50);
  console.log('🎉 Successfully synced all rebalanced questions to Supabase!');
}

main().catch(console.error);
