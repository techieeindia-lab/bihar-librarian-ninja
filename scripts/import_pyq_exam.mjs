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

async function upsertBatch(table, rows, chunkSize = 25) {
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

function autoBalanceOptions(questions) {
  if (!questions || questions.length < 4) return questions;
  const aCount = questions.filter(q => (q.correct_answer || q.correctAnswer) === 'A').length;
  const aRatio = aCount / questions.length;

  if (aRatio > 0.40) {
    console.log(`⚖️ Detected Option A bias (${(aRatio * 100).toFixed(1)}%). Auto-balancing options across A, B, C, D...`);
    const letters = ['A', 'B', 'C', 'D'];
    return questions.map((q, qIdx) => {
      const isPositional = [
        q.option_a_en, q.option_a_hi,
        q.option_b_en, q.option_b_hi,
        q.option_c_en, q.option_c_hi,
        q.option_d_en, q.option_d_hi
      ].some(txt => /all of the above|none of the above|both a and|both b and|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं/i.test(txt || ''));

      const currentAns = (q.correct_answer || q.correctAnswer || 'A').toUpperCase();
      if (isPositional && currentAns === 'D') {
        return q; // Keep D for "All of above"
      }

      const opts = [
        { letter: 'A', hi: q.option_a_hi, en: q.option_a_en, isCorrect: currentAns === 'A' },
        { letter: 'B', hi: q.option_b_hi, en: q.option_b_en, isCorrect: currentAns === 'B' },
        { letter: 'C', hi: q.option_c_hi, en: q.option_c_en, isCorrect: currentAns === 'C' },
        { letter: 'D', hi: q.option_d_hi, en: q.option_d_en, isCorrect: currentAns === 'D' }
      ];

      // Deterministic shuffle
      let hash = qIdx;
      const idStr = q.id || `q_${qIdx}`;
      for (let i = 0; i < idStr.length; i++) hash = (Math.imul(31, hash) + idStr.charCodeAt(i)) | 0;
      let seed = (hash ^ 0x98765432) >>> 0;
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
  }
  return questions;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('❌ Please provide a JSON file path.\\nExample: node scripts/import_pyq_exam.mjs bulk_templates/pyq_kvs_2018.json');
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }

  console.log(`\\n======================================================`);
  console.log(`📦 PYQ EXAM IMPORTER: ${path.basename(fullPath)}`);
  console.log(`======================================================`);

  const fileContent = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  let rawQuestions = [];
  let quizzes = [];

  if (Array.isArray(fileContent)) {
    rawQuestions = fileContent;
  } else if (fileContent.questions) {
    rawQuestions = fileContent.questions;
    quizzes = fileContent.quizzes || (fileContent.quiz ? [fileContent.quiz] : []);
  }

  if (rawQuestions.length === 0) {
    console.error('❌ No questions found in JSON file.');
    process.exit(1);
  }

  console.log(`🔍 Validating ${rawQuestions.length} questions...`);

  const firstQ = rawQuestions[0];
  const examName = fileContent.exam_name || firstQ.source_exam || firstQ.sourceExam || 'Previous Year Exam';
  const examYear = String(fileContent.year || firstQ.year || '2023');
  const examTag = fileContent.exam_tag || (examName.split(' ')[0] || 'PYQ');
  const quizId = fileContent.quiz_id || fileContent.id || `quiz_pyq_${examTag.toLowerCase()}_${examYear}`;

  if (quizzes.length === 0) {
    quizzes.push({
      id: quizId,
      title_hi: fileContent.title_hi || `${examName} विगत वर्ष हल प्रश्न-पत्र`,
      title_en: fileContent.title_en || `${examName} Official Solved Paper`,
      subtitle_hi: fileContent.subtitle_hi || `${examName} का मूल प्रश्न-पत्र विस्तृत हिंदी हल व विश्लेषण सहित`,
      subtitle_en: fileContent.subtitle_en || `Official ${examName} question paper with complete bilingual solutions`,
      category: 'foundations',
      question_count: rawQuestions.length,
      question_ids: rawQuestions.map((q, idx) => q.id || `q_${examTag.toLowerCase()}_${examYear}_${idx + 1}`),
      duration_minutes: fileContent.duration_minutes || Math.max(15, Math.round(rawQuestions.length * 1.2)),
      reward_xp: rawQuestions.length * 5,
      badge_hi: `${examTag} ${examYear}`,
      badge_en: `${examTag} ${examYear}`,
      difficulty: 'medium',
      color: fileContent.color || '#EA580C',
      icon: 'document-text',
      display_order: 100
    });
  }

  const processedQuestions = rawQuestions.map((q, idx) => {
    const qId = q.id || `q_${examTag.toLowerCase()}_${examYear}_${idx + 1}`;
    return {
      id: qId,
      category: q.category || 'lis_foundations',
      question_hi: q.question_hi || q.question?.hi || '',
      question_en: q.question_en || q.question?.en || q.question_hi || '',
      option_a_hi: q.option_a_hi || q.options?.A?.hi || '',
      option_a_en: q.option_a_en || q.options?.A?.en || q.option_a_hi || '',
      option_b_hi: q.option_b_hi || q.options?.B?.hi || '',
      option_b_en: q.option_b_en || q.options?.B?.en || q.option_b_hi || '',
      option_c_hi: q.option_c_hi || q.options?.C?.hi || '',
      option_c_en: q.option_c_en || q.options?.C?.en || q.option_c_hi || '',
      option_d_hi: q.option_d_hi || q.options?.D?.hi || '',
      option_d_en: q.option_d_en || q.options?.D?.en || q.option_d_hi || '',
      correct_answer: (q.correct_answer || q.correctAnswer || 'A').toUpperCase(),
      explanation_hi: q.explanation_hi || q.explanation?.hi || '',
      explanation_en: q.explanation_en || q.explanation?.en || '',
      difficulty: q.difficulty || 'medium',
      year: examYear,
      source_exam: q.source_exam || q.sourceExam || examName
    };
  });

  const balancedQuestions = autoBalanceOptions(processedQuestions);

  quizzes[0].question_ids = balancedQuestions.map(q => q.id);
  quizzes[0].question_count = balancedQuestions.length;

  // 1. Upsert Questions to Supabase
  console.log(`📤 Upserting ${balancedQuestions.length} questions to Supabase...`);
  await upsertBatch('questions', balancedQuestions);
  console.log(`✅ Questions successfully saved to Supabase.`);

  // 2. Upsert Quizzes to Supabase
  console.log(`📤 Upserting Quiz "${quizzes[0].title_en}" to Supabase...`);
  await upsertBatch('quizzes', quizzes);
  console.log(`✅ Quiz registered in Supabase.`);

  // 3. Sync full dataset back to local files
  console.log(`🔄 Syncing local src/data/questions.ts and src/data/quizzes.ts...`);
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
    `import { Question } from '../types/index';\\n\\nexport const QUESTIONS: Question[] = ${JSON.stringify(localQuestions, null, 2)};\\n`,
    'utf8'
  );

  const localQuizzes = allQuizzesRaw.map((row) => {
    let qIds = Array.isArray(row.question_ids) ? row.question_ids : [];
    let topicId = row.topic_id;
    let unitNumber = row.unit_number;
    let setNumber = row.set_number;

    if (!topicId && row.id) {
      const tm = row.id.match(/quiz_u(\\d+)_t(\\d+)/);
      if (tm) {
        unitNumber = parseInt(tm[1], 10);
        topicId = `u${tm[1]}_t${tm[2]}`;
      }
    }
    if (!unitNumber && row.id) {
      const um = row.id.match(/quiz_unit_(\\d+)/);
      if (um) unitNumber = parseInt(um[1], 10);
    }
    if (setNumber === undefined && row.id) {
      const sm = row.id.match(/_s(\\d+)$/);
      setNumber = sm ? parseInt(sm[1], 10) : 1;
    }

    const setName = row.set_name_hi || row.set_name_en
      ? { hi: row.set_name_hi || `सेट ${setNumber || 1}`, en: row.set_name_en || `Set ${setNumber || 1}` }
      : (topicId ? { hi: `सेट ${setNumber || 1}`, en: `Set ${setNumber || 1}` } : undefined);

    return {
      id: row.id,
      topicId: topicId || undefined,
      unitNumber: unitNumber || undefined,
      setNumber: setNumber || undefined,
      setName: setName || undefined,
      title: { hi: row.title_hi || '', en: row.title_en || '' },
      subtitle: { hi: row.subtitle_hi || '', en: row.subtitle_en || '' },
      category: row.category || 'foundations',
      questionCount: row.question_count || qIds.length,
      questionIds: qIds,
      durationMinutes: row.duration_minutes || undefined,
      rewardXP: row.reward_xp || 50,
      badge: (row.badge_hi || row.badge_en) ? { hi: row.badge_hi || '', en: row.badge_en || '' } : undefined,
      difficulty: row.difficulty || 'medium',
      color: row.color || undefined,
      icon: row.icon || undefined
    };
  });

  fs.writeFileSync(
    'src/data/quizzes.ts',
    `import { Quiz } from '../types/index';\\n\\nexport const QUIZZES: Quiz[] = ${JSON.stringify(localQuizzes, null, 2)};\\n`,
    'utf8'
  );

  console.log(`\\n🎉 SUCCESS!`);
  console.log(`• Exam: ${examName} (${examYear})`);
  console.log(`• Imported Questions: ${balancedQuestions.length}`);
  console.log(`• Total Questions in App: ${localQuestions.length}`);
  console.log(`• Total Quizzes in App: ${localQuizzes.length}`);
  console.log(`👉 In the mobile app, tap 'Sync From Cloud DB' in More/Settings or rebuild to see the new live paper!\\n`);
}

main().catch((err) => {
  console.error('\\n❌ Import failed:', err);
  process.exit(1);
});
