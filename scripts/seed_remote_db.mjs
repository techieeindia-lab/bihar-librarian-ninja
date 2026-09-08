// Standalone ESM script to seed/upsert remote Supabase database
import { STUDY_UNITS } from '../src/data/studyNotes.ts';
import { FLASHCARDS } from '../src/data/flashcards.ts';
import { QUESTIONS } from '../src/data/questions.ts';
import { QUIZZES } from '../src/data/quizzes.ts';
import { ONE_LINERS } from '../src/data/oneLiners.ts';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

async function upsertBatch(tableName, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(rows)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[${tableName}] HTTP ${res.status}: ${err}`);
  }
  return true;
}

async function runSeed() {
  console.log('🚀 Checking Supabase tables and seeding data...');

  // 1. Study Units
  try {
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
    await upsertBatch('study_units', unitsPayload);
    console.log(`✓ study_units: Upserted ${unitsPayload.length} units`);
  } catch (e) {
    console.error('✗ Error on study_units:', e.message);
  }

  // 2. Study Topics
  try {
    const topicsPayload = [];
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
    // upsert in chunks of 20
    for (let i = 0; i < topicsPayload.length; i += 20) {
      await upsertBatch('study_topics', topicsPayload.slice(i, i + 20));
    }
    console.log(`✓ study_topics: Upserted ${topicsPayload.length} topics`);
  } catch (e) {
    console.error('✗ Error on study_topics:', e.message);
  }

  // 3. Flashcards
  try {
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
    await upsertBatch('flashcards', flashcardsPayload);
    console.log(`✓ flashcards: Upserted ${flashcardsPayload.length} flashcards`);
  } catch (e) {
    console.error('✗ Error on flashcards:', e.message);
  }

  // 4. Questions
  try {
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
      await upsertBatch('questions', questionsPayload.slice(i, i + 25));
    }
    console.log(`✓ questions: Upserted ${questionsPayload.length} questions`);
  } catch (e) {
    console.error('✗ Error on questions:', e.message);
  }

  // 5. Quizzes
  try {
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
    await upsertBatch('quizzes', quizzesPayload);
    console.log(`✓ quizzes: Upserted ${quizzesPayload.length} quizzes`);
  } catch (e) {
    console.error('✗ Table "quizzes" does not exist yet. Please run supabase/02_update_quizzes_and_oneliners.sql in Supabase SQL Editor.', e.message);
  }

  // 6. One-Liners
  try {
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
      await upsertBatch('one_liners', oneLinersPayload.slice(i, i + 25));
    }
    console.log(`✓ one_liners: Upserted ${oneLinersPayload.length} one-liners`);
  } catch (e) {
    console.error('✗ Table "one_liners" does not exist yet. Please run supabase/02_update_quizzes_and_oneliners.sql in Supabase SQL Editor.', e.message);
  }

  console.log('\nDone.');
}

runSeed();
