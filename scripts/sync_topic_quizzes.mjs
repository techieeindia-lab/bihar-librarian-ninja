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

const QUIZZES = evaluateTsFile('src/data/quizzes.ts', 'QUIZZES');

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

async function updateQuizzes() {
  console.log('1. Deleting legacy quiz_unit_6 and quiz_unit_7 from Supabase...');
  for (const qid of ['quiz_unit_6', 'quiz_unit_7']) {
    const delRes = await fetch(`${SUPABASE_URL}/rest/v1/quizzes?id=eq.${qid}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    console.log(`Deleted ${qid} (status: ${delRes.status})`);
  }

  console.log(`2. Upserting ${QUIZZES.length} topic-wise quizzes to Supabase...`);
  const payload = QUIZZES.map((q) => ({
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

  for (let i = 0; i < payload.length; i += 15) {
    const chunk = payload.slice(i, i + 15);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/quizzes`, {
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
    console.log(`✓ Upserted batch ${i + 1} to ${Math.min(i + chunk.length, payload.length)}`);
  }

  const qRes = await fetch(`${SUPABASE_URL}/rest/v1/quizzes?select=id,title_hi`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const allQ = await qRes.json();
  console.log(`🎉 SUCCESS: Total quizzes in Supabase now: ${allQ.length}`);
}

updateQuizzes().catch(console.error);
