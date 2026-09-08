// Helper to export TS data files to JSON and upsert to Supabase
import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';

function evaluateTsFile(filePath, exportName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Strip imports
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

async function upsertBatch(table, rows) {
  for (let i = 0; i < rows.length; i += 20) {
    const chunk = rows.slice(i, i + 20);
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
      const err = await res.text();
      throw new Error(`[${table}] HTTP ${res.status}: ${err}`);
    }
    console.log(`✓ ${table}: upserted rows ${i + 1} to ${Math.min(i + chunk.length, rows.length)}`);
  }
}

async function run() {
  console.log('1. Exporting & syncing Quizzes...');
  const quizzes = evaluateTsFile('src/data/quizzes.ts', 'QUIZZES');
  const quizRows = quizzes.map((q) => ({
    id: q.id,
    title_hi: q.title.hi,
    title_en: q.title.en,
    subtitle_hi: q.subtitle.hi,
    subtitle_en: q.subtitle.en,
    category: q.category,
    question_count: q.questionCount,
    question_ids: q.questionIds,
    duration_minutes: q.durationMinutes || 5,
    reward_xp: q.rewardXP,
    badge_hi: q.badge ? q.badge.hi : null,
    badge_en: q.badge ? q.badge.en : null,
    difficulty: q.difficulty || 'medium',
    color: q.color || '#0070F3',
    icon: q.icon || 'book'
  }));
  await upsertBatch('quizzes', quizRows);

  console.log('2. Exporting & syncing Flashcards...');
  const flashcards = evaluateTsFile('src/data/flashcards.ts', 'FLASHCARDS');
  const fcRows = flashcards.map((fc, i) => ({
    id: fc.id,
    category_hi: fc.category.hi,
    category_en: fc.category.en,
    front_hi: fc.front.hi,
    front_en: fc.front.en,
    back_hi: fc.back.hi,
    back_en: fc.back.en,
    subtext_hi: fc.subtext ? fc.subtext.hi : null,
    subtext_en: fc.subtext ? fc.subtext.en : null,
    display_order: i + 1
  }));
  await upsertBatch('flashcards', fcRows);

  console.log('3. Exporting & syncing One-Liners...');
  const oneLiners = evaluateTsFile('src/data/oneLiners.ts', 'ONE_LINERS');
  const olRows = oneLiners.map((ol, i) => ({
    id: ol.id,
    category_hi: ol.category.hi,
    category_en: ol.category.en,
    category_key: ol.categoryKey || ol.topicId || 'u1_t1',
    topic_hi: ol.topic.hi,
    topic_en: ol.topic.en,
    statement_hi: ol.statement.hi,
    statement_en: ol.statement.en,
    tag: ol.tag || 'High Yield',
    is_important: ol.isImportant || false,
    display_order: i + 1
  }));
  await upsertBatch('one_liners', olRows);

  console.log('4. Exporting & syncing Study Topics...');
  const studyUnits = evaluateTsFile('src/data/studyNotes.ts', 'STUDY_UNITS');
  const allTopics = [];
  studyUnits.forEach((u) => {
    u.topics.forEach((t, idx) => {
      // Don't overwrite u1_t1 if user already customized it in Supabase
      if (t.id === 'u1_t1') return;
      allTopics.push({
        id: t.id,
        unit_id: u.id,
        topic_order: idx + 1,
        title_hi: t.title.hi,
        title_en: t.title.en,
        content_hi: t.content.hi,
        content_en: t.content.en,
        key_points: t.keyPoints || []
      });
    });
  });
  await upsertBatch('study_topics', allTopics);

  console.log('✅ ALL 29 MASTER TOPICS SYNCHRONIZED SUCCESSFULLY TO SUPABASE!');
}

run().catch((e) => {
  console.error('Error syncing:', e);
  process.exit(1);
});
