import * as fs from 'fs';
import ts from 'typescript';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

function evaluateTsFile(filePath, exportName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const eqIdx = fileContent.indexOf('=');
    const arrayStr = fileContent.slice(fileContent.indexOf('[', eqIdx), fileContent.lastIndexOf(']') + 1);
    return JSON.parse(arrayStr);
  } catch (e) {
    const cleaned = fileContent.replace(/import\s+[^;]+;/g, '');
    const result = ts.transpileModule(cleaned, {
      compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    const module = { exports: {} };
    const fn = new Function('module', 'exports', result.outputText);
    fn(module, module.exports);
    return module.exports[exportName];
  }
}

async function getRemoteCount(tableName) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?select=id`, {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact'
      }
    });
    const range = res.headers.get('content-range');
    if (range) {
      const parts = range.split('/');
      return parts[1] ? parseInt(parts[1], 10) : 'unknown';
    }
    return `HTTP ${res.status}`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function main() {
  console.log('--- 1. CHECKING LOCAL FILES ---');
  
  const oneLiners = evaluateTsFile('src/data/oneLiners.ts', 'ONE_LINERS');
  console.log('Local ONE_LINERS:', oneLiners.length);

  const flashcards = evaluateTsFile('src/data/flashcards.ts', 'FLASHCARDS');
  console.log('Local FLASHCARDS:', flashcards.length);

  const quizzes = evaluateTsFile('src/data/quizzes.ts', 'QUIZZES');
  console.log('Local QUIZZES:', quizzes.length);
  let totalQuizQuestions = 0;
  quizzes.forEach(q => { totalQuizQuestions += (q.questionIds?.length || 0); });
  console.log('Local Quizzes total questionIds referenced:', totalQuizQuestions);

  const questions = evaluateTsFile('src/data/questions.ts', 'QUESTIONS');
  console.log('Local QUESTIONS (total pool):', questions.length);

  const studyUnits = evaluateTsFile('src/data/studyNotes.ts', 'STUDY_UNITS');
  console.log('Local Study Units:', studyUnits.length);
  let totalTopics = 0;
  studyUnits.forEach(u => {
    console.log(`  Unit ${u.unitNumber} (${u.id}): ${u.topics.length} topics`);
    totalTopics += u.topics.length;
  });
  console.log('Local Study Topics (total across units):', totalTopics);

  console.log('\n--- 2. CHECKING REMOTE SUPABASE DATABASE ---');
  const tables = ['study_units', 'study_topics', 'flashcards', 'questions', 'quizzes', 'one_liners'];
  for (const table of tables) {
    const count = await getRemoteCount(table);
    console.log(`Remote table '${table}': ${count} rows`);
  }
}

main().catch(console.error);
