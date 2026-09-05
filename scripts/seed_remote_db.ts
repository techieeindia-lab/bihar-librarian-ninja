import { createClient } from '@supabase/supabase-js';
import { STUDY_UNITS } from '../src/data/studyNotes';
import { FLASHCARDS } from '../src/data/flashcards';
import { QUESTIONS } from '../src/data/questions';
import { MOCK_TESTS } from '../src/data/mockTests';

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
  if (unitErr) console.error('Error inserting units:', unitErr);
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
  const { error: topicErr } = await supabase.from('study_topics').upsert(topicsPayload);
  if (topicErr) console.error('Error inserting topics:', topicErr);
  else console.log(`✓ Inserted ${topicsPayload.length} study topics`);

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
  if (fcErr) console.error('Error inserting flashcards:', fcErr);
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
  const { error: qErr } = await supabase.from('questions').upsert(questionsPayload);
  if (qErr) console.error('Error inserting questions:', qErr);
  else console.log(`✓ Inserted ${questionsPayload.length} questions`);

  // 5. Mock Tests
  console.log('Inserting Mock Tests...');
  const testsPayload = MOCK_TESTS.map((t, i) => ({
    id: t.id,
    title_hi: t.title.hi,
    title_en: t.title.en,
    subtitle_hi: t.subtitle.hi,
    subtitle_en: t.subtitle.en,
    duration_minutes: t.durationMinutes,
    total_marks: t.totalMarks,
    pass_marks: t.passMarks,
    question_count: t.questionCount,
    question_ids: t.questionIds,
    test_type: t.type,
    badge_hi: t.badge?.hi || null,
    badge_en: t.badge?.en || null,
    display_order: i + 1,
  }));
  const { error: testErr } = await supabase.from('mock_tests').upsert(testsPayload);
  if (testErr) console.error('Error inserting mock tests:', testErr);
  else console.log(`✓ Inserted ${testsPayload.length} mock tests`);

  console.log('🎉 Seeding completed successfully!');
}

seed().catch(console.error);
