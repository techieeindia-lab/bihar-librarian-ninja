import { createClient } from '@supabase/supabase-js';
import { STUDY_UNITS } from '../src/data/studyNotes';
import { FLASHCARDS } from '../src/data/flashcards';
import { QUESTIONS } from '../src/data/questions';
import { QUIZZES } from '../src/data/quizzes';
import { ONE_LINERS } from '../src/data/oneLiners';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log('Seeding Supabase database...');

  // 1. Study Units
  console.log('Inserting Study Units...');
  const unitsPayload = STUDY_UNITS.map((u, i) => ({
    id: u.id,
    unit_number: u.unitNumber,
    title_hi: u.title.hi,
    title_en: u.title.en,
    short_desc_hi: u.shortDesc.hi,
    short_desc_en: u.shortDesc.en,
    icon_name: u.iconName,
    display_order: i + 1,
  }));
  const { error: unitErr } = await supabase.from('study_units').upsert(unitsPayload);
  if (unitErr) console.error('Error inserting units:', unitErr.message);
  else console.log(`✓ Inserted ${unitsPayload.length} study units`);

  // 2. Study Topics
  console.log('Inserting Study Topics...');
  const topicsPayload: any[] = [];
  STUDY_UNITS.forEach((u) => {
    u.topics.forEach((t, idx) => {
      topicsPayload.push({
        id: t.id,
        unit_id: u.id,
        topic_order: idx + 1,
        title_hi: t.title.hi,
        title_en: t.title.en,
        content_hi: t.content.hi,
        content_en: t.content.en,
        key_points: t.keyPoints || [],
      });
    });
  });
  // Chunk into 20 per request
  for (let i = 0; i < topicsPayload.length; i += 20) {
    const chunk = topicsPayload.slice(i, i + 20);
    const { error: topicErr } = await supabase.from('study_topics').upsert(chunk);
    if (topicErr) console.error('Error inserting topics chunk:', topicErr.message);
  }
  console.log(`✓ Inserted ${topicsPayload.length} study topics`);

  // 3. Flashcards
  console.log('Inserting Flashcards...');
  const flashcardsPayload = FLASHCARDS.map((fc, i) => ({
    id: fc.id,
    category_hi: fc.category.hi,
    category_en: fc.category.en,
    front_hi: fc.front.hi,
    front_en: fc.front.en,
    back_hi: fc.back.hi,
    back_en: fc.back.en,
    subtext_hi: fc.subtext?.hi || null,
    subtext_en: fc.subtext?.en || null,
    display_order: i + 1,
  }));
  const { error: fcErr } = await supabase.from('flashcards').upsert(flashcardsPayload);
  if (fcErr) console.error('Error inserting flashcards:', fcErr.message);
  else console.log(`✓ Inserted ${flashcardsPayload.length} flashcards`);

  // 4. Questions
  console.log('Inserting Questions...');
  const questionsPayload = QUESTIONS.map((q) => ({
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
    source_exam: q.sourceExam || null,
  }));
  for (let i = 0; i < questionsPayload.length; i += 25) {
    const chunk = questionsPayload.slice(i, i + 25);
    const { error: qErr } = await supabase.from('questions').upsert(chunk);
    if (qErr) console.error('Error inserting questions chunk:', qErr.message);
  }
  console.log(`✓ Inserted ${questionsPayload.length} questions`);

  // 5. Quizzes
  console.log('Inserting Quizzes...');
  const quizzesPayload = QUIZZES.map((qz, i) => ({
    id: qz.id,
    title_hi: qz.title.hi,
    title_en: qz.title.en,
    subtitle_hi: qz.subtitle.hi,
    subtitle_en: qz.subtitle.en,
    category: qz.category,
    question_count: qz.questionCount,
    question_ids: qz.questionIds,
    duration_minutes: qz.durationMinutes || 5,
    reward_xp: qz.rewardXP,
    badge_hi: qz.badge?.hi || null,
    badge_en: qz.badge?.en || null,
    difficulty: qz.difficulty || 'medium',
    color: qz.color || null,
    icon: qz.icon || null,
    display_order: i + 1,
  }));
  const { error: quizErr } = await supabase.from('quizzes').upsert(quizzesPayload);
  if (quizErr) {
    console.error('Note on quizzes:', quizErr.message, '-> (Run supabase/02_update_quizzes_and_oneliners.sql in Supabase SQL editor first if table not yet created)');
  } else {
    console.log(`✓ Inserted ${quizzesPayload.length} quizzes`);
  }

  // 6. One-Liners
  console.log('Inserting One-Liners...');
  const oneLinersPayload = ONE_LINERS.map((ol, i) => ({
    id: ol.id,
    category_hi: ol.category.hi,
    category_en: ol.category.en,
    category_key: ol.categoryKey,
    topic_hi: ol.topic.hi,
    topic_en: ol.topic.en,
    statement_hi: ol.statement.hi,
    statement_en: ol.statement.en,
    tag: ol.tag || null,
    is_important: ol.isImportant || false,
    display_order: i + 1,
  }));
  for (let i = 0; i < oneLinersPayload.length; i += 25) {
    const chunk = oneLinersPayload.slice(i, i + 25);
    const { error: olErr } = await supabase.from('one_liners').upsert(chunk);
    if (olErr) {
      console.error('Note on one_liners:', olErr.message, '-> (Run supabase/02_update_quizzes_and_oneliners.sql in Supabase SQL editor first if table not yet created)');
      break;
    }
  }
  console.log(`✓ Inserted ${oneLinersPayload.length} one-liners`);

  console.log('🎉 Seeding finished!');
}

seed().catch(console.error);
