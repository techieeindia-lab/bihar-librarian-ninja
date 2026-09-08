import * as fs from 'fs';
import ts from 'typescript';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

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

async function fetchAllSupabase(table) {
  let allRows = [];
  let from = 0;
  let step = 1000;
  while (true) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Range': `${from}-${from + step - 1}`
      }
    });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allRows.push(...data);
    if (data.length < step) break;
    from += step;
  }
  return allRows;
}

async function checkIntegrity() {
  console.log('Fetching remote questions and quizzes...');
  const remoteQuestions = await fetchAllSupabase('questions');
  const remoteQuizzes = await fetchAllSupabase('quizzes');
  const remoteFlashcards = await fetchAllSupabase('flashcards');
  const remoteOneLiners = await fetchAllSupabase('one_liners');
  const remoteUnits = await fetchAllSupabase('study_units');
  const remoteTopics = await fetchAllSupabase('study_topics');

  console.log('\n--- REMOTE DATABASE VERIFICATION ---');
  console.log(`✓ study_units: ${remoteUnits.length} units`);
  console.log(`✓ study_topics: ${remoteTopics.length} topics`);
  console.log(`✓ one_liners: ${remoteOneLiners.length} one-liners`);
  console.log(`✓ flashcards: ${remoteFlashcards.length} flashcards`);
  console.log(`✓ quizzes: ${remoteQuizzes.length} quizzes`);
  console.log(`✓ questions: ${remoteQuestions.length} questions`);

  const questionIdSet = new Set(remoteQuestions.map(q => q.id));
  
  let totalMissingQuestions = 0;
  let quizzesWithMissingQuestions = 0;

  console.log('\n--- QUIZ INTEGRITY CHECK ---');
  for (const qz of remoteQuizzes) {
    const qIds = qz.question_ids || [];
    const missing = qIds.filter(id => !questionIdSet.has(id));
    if (missing.length > 0) {
      quizzesWithMissingQuestions++;
      totalMissingQuestions += missing.length;
      console.log(`⚠️ Quiz "${qz.id}" (${qz.title_en}): ${missing.length}/${qIds.length} missing question IDs:`, missing.slice(0, 3));
    }
  }

  if (quizzesWithMissingQuestions === 0) {
    console.log('✅ All quizzes have 100% valid question IDs!');
  } else {
    console.log(`⚠️ ${quizzesWithMissingQuestions} quizzes have missing question references (total missing: ${totalMissingQuestions})`);
  }

  // Check category distribution
  console.log('\n--- ONE-LINER UNIT/TOPIC MAPPING ---');
  let olWithoutUnit = 0;
  remoteOneLiners.forEach(ol => {
    const hasUnit = ol.unit_number || (ol.category_key && ol.category_key.startsWith('u'));
    if (!hasUnit) olWithoutUnit++;
  });
  console.log(`One-liners mapped to units: ${remoteOneLiners.length - olWithoutUnit}/${remoteOneLiners.length} (${olWithoutUnit} unmapped)`);

  console.log('\n--- FLASHCARD UNIT/TOPIC MAPPING ---');
  let fcWithoutUnit = 0;
  remoteFlashcards.forEach(fc => {
    const hasUnit = fc.unit_number || (fc.category_key && fc.category_key.startsWith('u')) || (fc.id && fc.id.match(/u\d/));
    if (!hasUnit) fcWithoutUnit++;
  });
  console.log(`Flashcards mapped to units: ${remoteFlashcards.length - fcWithoutUnit}/${remoteFlashcards.length} (${fcWithoutUnit} unmapped)`);
}

checkIntegrity().catch(console.error);
