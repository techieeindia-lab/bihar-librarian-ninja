import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

async function fetchAll(table, orderBy = null) {
  let allRows = [];
  let from = 0;
  const step = 1000;
  while (true) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
    if (orderBy) url += `&order=${orderBy}`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Range': `${from}-${from + step - 1}`
      }
    });
    if (!res.ok) throw new Error(`Fetch ${table} failed: ${await res.text()}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allRows.push(...data);
    if (data.length < step) break;
    from += step;
  }
  return allRows;
}

async function upsertBatch(table, rows, chunkSize = 20) {
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
      throw new Error(`Failed to upsert to ${table}: ${await res.text()}`);
    }
  }
}

async function main() {
  const filePath = process.argv[2] || 'bulk_templates/seed_set2_questions.json';
  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  console.log(`📖 Reading set data from ${filePath}...`);
  const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const questions = content.questions || [];
  const quizzes = content.quizzes || [];

  console.log(`Found ${questions.length} questions and ${quizzes.length} quiz sets.`);

  // 1. Check and auto-balance questions if biased towards Option A
  let processedQuestions = questions;
  if (questions.length >= 4) {
    const aCount = questions.filter(q => (q.correct_answer || q.correctAnswer) === 'A').length;
    if (aCount / questions.length > 0.45) {
      console.log(`⚖️ Detected Option A bias (${((aCount / questions.length) * 100).toFixed(1)}%). Auto-balancing options across A, B, C, D...`);
      const letters = ['A', 'B', 'C', 'D'];
      processedQuestions = questions.map((q, qIdx) => {
        const isPositional = [
          q.option_a_en, q.option_a_hi,
          q.option_b_en, q.option_b_hi,
          q.option_c_en, q.option_c_hi,
          q.option_d_en, q.option_d_hi
        ].some(txt => /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं/i.test(txt || ''));

        const currentAns = q.correct_answer || q.correctAnswer || 'A';
        if (isPositional && currentAns === 'D') {
          return q; // preserve D
        }

        const opts = [
          { letter: 'A', hi: q.option_a_hi, en: q.option_a_en, isCorrect: currentAns === 'A' },
          { letter: 'B', hi: q.option_b_hi, en: q.option_b_en, isCorrect: currentAns === 'B' },
          { letter: 'C', hi: q.option_c_hi, en: q.option_c_en, isCorrect: currentAns === 'C' },
          { letter: 'D', hi: q.option_d_hi, en: q.option_d_en, isCorrect: currentAns === 'D' }
        ];

        // Seeded pseudo-random shuffle based on question ID or index
        let hash = qIdx;
        const idStr = q.id || `q_${qIdx}`;
        for (let i = 0; i < idStr.length; i++) hash = (Math.imul(31, hash) + idStr.charCodeAt(i)) | 0;
        let seed = (hash ^ 0x12345678) >>> 0;
        const rand = () => {
          seed = (seed * 1664525 + 1013904223) >>> 0;
          return seed / 4294967296;
        };

        for (let i = opts.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [opts[i], opts[j]] = [opts[j], opts[i]];
        }

        let newCorrect = 'A';
        opts.forEach((item, idx) => {
          if (item.isCorrect) newCorrect = letters[idx];
        });

        return {
          ...q,
          option_a_hi: opts[0].hi,
          option_a_en: opts[0].en,
          option_b_hi: opts[1].hi,
          option_b_en: opts[1].en,
          option_c_hi: opts[2].hi,
          option_c_en: opts[2].en,
          option_d_hi: opts[3].hi,
          option_d_en: opts[3].en,
          correct_answer: newCorrect
        };
      });
      console.log('✅ Options auto-balanced across A, B, C, D.');
    }
  }

  // 1. Prepare Question Rows for Supabase
  if (processedQuestions.length > 0) {
    console.log(`Upserting ${processedQuestions.length} questions to Supabase...`);
    const qRows = processedQuestions.map((q) => ({
      id: q.id,
      category: q.category,
      question_hi: q.question_hi,
      question_en: q.question_en,
      option_a_hi: q.option_a_hi,
      option_a_en: q.option_a_en,
      option_b_hi: q.option_b_hi,
      option_b_en: q.option_b_en,
      option_c_hi: q.option_c_hi,
      option_c_en: q.option_c_en,
      option_d_hi: q.option_d_hi,
      option_d_en: q.option_d_en,
      correct_answer: q.correct_answer,
      explanation_hi: q.explanation_hi,
      explanation_en: q.explanation_en,
      difficulty: q.difficulty || 'medium',
      year: q.year || null,
      source_exam: q.source_exam || 'BPSC / KVS Librarian'
    }));
    await upsertBatch('questions', qRows);
    console.log(`✅ Upserted ${qRows.length} questions to Supabase.`);
  }

  // 2. Prepare Quiz Rows for Supabase
  if (quizzes.length > 0) {
    console.log(`Upserting ${quizzes.length} quizzes to Supabase...`);
    const qzRows = quizzes.map((qz, idx) => ({
      id: qz.id,
      title_hi: qz.title_hi,
      title_en: qz.title_en,
      subtitle_hi: qz.subtitle_hi,
      subtitle_en: qz.subtitle_en,
      category: qz.category || 'foundations',
      question_count: qz.question_count || (qz.question_ids ? qz.question_ids.length : 10),
      question_ids: qz.question_ids || [],
      duration_minutes: qz.duration_minutes || 8,
      reward_xp: qz.reward_xp || 50,
      badge_hi: qz.badge_hi || null,
      badge_en: qz.badge_en || null,
      difficulty: qz.difficulty || 'medium',
      color: qz.color || '#0070F3',
      icon: qz.icon || 'book',
      display_order: qz.display_order || 50 + idx
    }));
    await upsertBatch('quizzes', qzRows);
    console.log(`✅ Upserted ${qzRows.length} quizzes to Supabase.`);
  }

  // 3. Sync full dataset back to local files
  console.log('🔄 Syncing local src/data/questions.ts and src/data/quizzes.ts...');
  const allQuestionsRaw = await fetchAll('questions');
  const allQuizzesRaw = await fetchAll('quizzes', 'display_order.asc');

  const localQuestions = allQuestionsRaw.map((row) => ({
    id: row.id,
    category: row.category,
    question: {
      hi: row.question_hi || '',
      en: row.question_en || '',
    },
    options: {
      A: { hi: row.option_a_hi || '', en: row.option_a_en || '' },
      B: { hi: row.option_b_hi || '', en: row.option_b_en || '' },
      C: { hi: row.option_c_hi || '', en: row.option_c_en || '' },
      D: { hi: row.option_d_hi || '', en: row.option_d_en || '' },
    },
    correctAnswer: row.correct_answer,
    explanation: {
      hi: row.explanation_hi || '',
      en: row.explanation_en || '',
    },
    difficulty: row.difficulty || 'medium',
    year: row.year ? String(row.year) : undefined,
    sourceExam: row.source_exam || undefined,
  }));

  fs.writeFileSync(
    'src/data/questions.ts',
    `import { Question } from '../types/index';\n\nexport const QUESTIONS: Question[] = ${JSON.stringify(localQuestions, null, 2)};\n`,
    'utf8'
  );

  const localQuizzes = allQuizzesRaw.map((row) => {
    let qIds = Array.isArray(row.question_ids) ? row.question_ids : [];
    let topicId = row.topic_id;
    let unitNumber = row.unit_number;
    let setNumber = row.set_number;

    if (!topicId && row.id) {
      const tm = row.id.match(/quiz_u(\d)_t(\d)/);
      if (tm) {
        unitNumber = parseInt(tm[1], 10);
        topicId = `u${tm[1]}_t${tm[2]}`;
      }
    }
    if (setNumber === undefined && row.id) {
      const sm = row.id.match(/_s(\d+)$/);
      setNumber = sm ? parseInt(sm[1], 10) : 1;
    }

    const setName = row.set_name_hi || row.set_name_en
      ? { hi: row.set_name_hi || `सेट ${setNumber || 1}`, en: row.set_name_en || `Set ${setNumber || 1}` }
      : (topicId ? { hi: `सेट ${setNumber || 1}`, en: `Set ${setNumber || 1}` } : undefined);

    const quiz = {
      id: row.id,
      topicId,
      unitNumber,
      setNumber,
      setName,
      title: {
        hi: row.title_hi || '',
        en: row.title_en || '',
      },
      subtitle: {
        hi: row.subtitle_hi || '',
        en: row.subtitle_en || '',
      },
      category: row.category,
      questionCount: row.question_count || qIds.length,
      questionIds: qIds,
      durationMinutes: row.duration_minutes || undefined,
      rewardXP: row.reward_xp || 50,
      difficulty: row.difficulty || 'medium',
    };
    if (row.badge_hi || row.badge_en) {
      quiz.badge = {
        hi: row.badge_hi || '',
        en: row.badge_en || '',
      };
    }
    if (row.color) quiz.color = row.color;
    if (row.icon) quiz.icon = row.icon;
    return quiz;
  });

  fs.writeFileSync(
    'src/data/quizzes.ts',
    `import { Quiz } from '../types/index';\n\nexport const QUIZZES: Quiz[] = ${JSON.stringify(localQuizzes, null, 2)};\n`,
    'utf8'
  );

  console.log(`🎉 SUCCESS! Local questions: ${localQuestions.length}, Local quizzes: ${localQuizzes.length}`);
}

main().catch(console.error);
