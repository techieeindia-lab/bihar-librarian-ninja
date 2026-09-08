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
    if (orderBy) {
      url += `&order=${orderBy}`;
    }
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Range': `${from}-${from + step - 1}`
      }
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to fetch ${table}: ${err}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allRows.push(...data);
    if (data.length < step) break;
    from += step;
  }
  return allRows;
}

function parseCardUnitAndTopic(fc) {
  let unitNumber = fc.unit_number;
  let topicId = fc.category_key;

  if (!topicId && fc.id) {
    const m = fc.id.match(/u(\d)_t(\d)/) || fc.id.match(/fc_(\d)_(\d)/);
    if (m) {
      unitNumber = parseInt(m[1], 10);
      topicId = `u${m[1]}_t${m[2]}`;
    }
  }
  if (!topicId && fc.category_en) {
    const m = fc.category_en.match(/Topic\s*(\d)\.(\d)/i);
    if (m) {
      unitNumber = parseInt(m[1], 10);
      topicId = `u${m[1]}_t${m[2]}`;
    }
  }
  if (!topicId && fc.category_hi) {
    const m = fc.category_hi.match(/टॉपिक\s*(\d)\.(\d)/i);
    if (m) {
      unitNumber = parseInt(m[1], 10);
      topicId = `u${m[1]}_t${m[2]}`;
    }
  }

  // Fallbacks based on category title
  if (!unitNumber && topicId?.startsWith('u')) {
    unitNumber = parseInt(topicId[1], 10);
  }

  return { unitNumber: unitNumber || 1, topicId: topicId || 'u1_t1' };
}

async function exportContent() {
  console.log('🔄 Fetching complete content library from Supabase...');

  // 1. ONE-LINERS (725)
  console.log('Fetching one_liners...');
  const oneLinersRaw = await fetchAll('one_liners', 'display_order.asc');
  console.log(`Fetched ${oneLinersRaw.length} one-liners.`);
  const oneLiners = oneLinersRaw.map((row) => {
    let unitNumber = row.unit_number;
    let topicId = row.topic_id;
    if (!unitNumber && row.category_key?.startsWith('u')) {
      unitNumber = parseInt(row.category_key[1], 10);
    }
    if (!topicId && row.category_key?.startsWith('u')) {
      topicId = row.category_key;
    }
    return {
      id: row.id,
      unitNumber: unitNumber || undefined,
      topicId: topicId || undefined,
      category: {
        hi: row.category_hi || '',
        en: row.category_en || '',
      },
      categoryKey: row.category_key || topicId || 'u1_t1',
      topic: {
        hi: row.topic_hi || '',
        en: row.topic_en || '',
      },
      statement: {
        hi: row.statement_hi || '',
        en: row.statement_en || '',
      },
      tag: row.tag || undefined,
      isImportant: Boolean(row.is_important),
    };
  });

  const oneLinersContent = `import { OneLiner } from '../types/index';\n\nexport const ONE_LINERS: OneLiner[] = ${JSON.stringify(oneLiners, null, 2)};\n`;
  fs.writeFileSync('src/data/oneLiners.ts', oneLinersContent, 'utf8');
  console.log(`✅ Saved ${oneLiners.length} one-liners to src/data/oneLiners.ts`);

  // 2. FLASHCARDS (457)
  console.log('Fetching flashcards...');
  const flashcardsRaw = await fetchAll('flashcards', 'display_order.asc');
  console.log(`Fetched ${flashcardsRaw.length} flashcards.`);
  const flashcards = flashcardsRaw.map((row) => {
    const { unitNumber, topicId } = parseCardUnitAndTopic(row);
    const card = {
      id: row.id,
      unitNumber,
      topicId,
      category: {
        hi: row.category_hi || row.category_en || '',
        en: row.category_en || row.category_hi || '',
      },
      front: {
        hi: row.front_hi || row.front_en || '',
        en: row.front_en || row.front_hi || '',
      },
      back: {
        hi: row.back_hi || row.back_en || '',
        en: row.back_en || row.back_hi || '',
      },
    };
    if (row.subtext_hi || row.subtext_en) {
      card.subtext = {
        hi: row.subtext_hi || '',
        en: row.subtext_en || '',
      };
    }
    return card;
  });

  const flashcardsContent = `import { Flashcard } from '../types/index';\n\nexport const FLASHCARDS: Flashcard[] = ${JSON.stringify(flashcards, null, 2)};\n`;
  fs.writeFileSync('src/data/flashcards.ts', flashcardsContent, 'utf8');
  console.log(`✅ Saved ${flashcards.length} flashcards to src/data/flashcards.ts`);

  // 3. QUESTIONS (330)
  console.log('Fetching questions...');
  const questionsRaw = await fetchAll('questions');
  console.log(`Fetched ${questionsRaw.length} questions.`);
  const questions = questionsRaw.map((row) => ({
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

  const questionsContent = `import { Question } from '../types/index';\n\nexport const QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)};\n`;
  fs.writeFileSync('src/data/questions.ts', questionsContent, 'utf8');
  console.log(`✅ Saved ${questions.length} questions to src/data/questions.ts`);

  // 4. QUIZZES (36)
  console.log('Fetching quizzes...');
  const quizzesRaw = await fetchAll('quizzes', 'display_order.asc');
  console.log(`Fetched ${quizzesRaw.length} quizzes.`);
  const quizzes = quizzesRaw.map((row) => {
    // Sanitize questionIds to ensure no lingering q_auto_1
    let qIds = Array.isArray(row.question_ids) ? row.question_ids : [];
    qIds = qIds.map((id) => (id === 'q_auto_1' ? (row.id === 'quiz_daily' ? 'q_auto_rfid' : 'q_ict_1') : id));

    const quiz = {
      id: row.id,
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

  const quizzesContent = `import { Quiz } from '../types/index';\n\nexport const QUIZZES: Quiz[] = ${JSON.stringify(quizzes, null, 2)};\n`;
  fs.writeFileSync('src/data/quizzes.ts', quizzesContent, 'utf8');
  console.log(`✅ Saved ${quizzes.length} quizzes to src/data/quizzes.ts`);

  console.log('\n🎉 ALL LOCAL FILES SYNCHRONIZED WITH FULL REMOTE DATASET!');
}

exportContent().catch(console.error);
