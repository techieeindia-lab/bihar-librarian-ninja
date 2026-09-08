import * as fs from 'fs';
import ts from 'typescript';

function evaluateTsFile(filePath, exportName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const cleaned = fileContent.replace(/import\s+[^;]+;/g, '');
  const result = ts.transpileModule(cleaned, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });
  const module = { exports: {} };
  const fn = new Function('module', 'exports', result.outputText);
  fn(module, module.exports);
  return module.exports[exportName];
}

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

async function main() {
  console.log('Syncing all questions to Supabase...');
  const questions = evaluateTsFile('src/data/questions.ts', 'QUESTIONS');
  const rows = questions.map((q) => ({
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
    source_exam: q.sourceExam || 'BPSC / KVS'
  }));

  for (let i = 0; i < rows.length; i += 20) {
    const chunk = rows.slice(i, i + 20);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/questions`, {
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
      const err = await res.text();
      throw new Error(`HTTP ${res.status}: ${err}`);
    }
    console.log(`✓ Questions: upserted rows ${i + 1} to ${Math.min(i + chunk.length, rows.length)}`);
  }
  console.log(`✅ Synced ${rows.length} questions to Supabase!`);
}

main().catch(console.error);
