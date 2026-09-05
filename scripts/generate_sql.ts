import * as fs from 'fs';
import * as path from 'path';
import { STUDY_UNITS } from '../src/data/studyNotes';
import { FLASHCARDS } from '../src/data/flashcards';
import { QUESTIONS } from '../src/data/questions';
import { MOCK_TESTS } from '../src/data/mockTests';

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function escapeJson(obj: any): string {
  if (obj === undefined || obj === null) return 'NULL';
  const jsonStr = JSON.stringify(obj).replace(/'/g, "''");
  return `'${jsonStr}'::jsonb`;
}

let sql = `-- ==========================================================
-- Bihar Librarian Ninja - Complete Supabase Database Schema & Seed
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click Run
-- ==========================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.study_units (
  id TEXT PRIMARY KEY,
  unit_number INTEGER NOT NULL,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  short_desc_hi TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.study_topics (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES public.study_units(id) ON DELETE CASCADE,
  topic_order INTEGER DEFAULT 1,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_hi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  key_points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.flashcards (
  id TEXT PRIMARY KEY,
  category_hi TEXT NOT NULL,
  category_en TEXT NOT NULL,
  front_hi TEXT NOT NULL,
  front_en TEXT NOT NULL,
  back_hi TEXT NOT NULL,
  back_en TEXT NOT NULL,
  subtext_hi TEXT,
  subtext_en TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question_hi TEXT NOT NULL,
  question_en TEXT NOT NULL,
  option_a_hi TEXT NOT NULL,
  option_a_en TEXT NOT NULL,
  option_b_hi TEXT NOT NULL,
  option_b_en TEXT NOT NULL,
  option_c_hi TEXT NOT NULL,
  option_c_en TEXT NOT NULL,
  option_d_hi TEXT NOT NULL,
  option_d_en TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation_hi TEXT,
  explanation_en TEXT,
  difficulty TEXT DEFAULT 'medium',
  year TEXT,
  source_exam TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mock_tests (
  id TEXT PRIMARY KEY,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_hi TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_marks INTEGER NOT NULL DEFAULT 100,
  pass_marks INTEGER NOT NULL DEFAULT 45,
  question_count INTEGER NOT NULL DEFAULT 50,
  question_ids JSONB DEFAULT '[]'::jsonb,
  test_type TEXT NOT NULL DEFAULT 'full_length',
  badge_hi TEXT,
  badge_en TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.study_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policies (Allows your mobile app users to read all study content)
DROP POLICY IF EXISTS "Allow public read access on study_units" ON public.study_units;
CREATE POLICY "Allow public read access on study_units" ON public.study_units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on study_topics" ON public.study_topics;
CREATE POLICY "Allow public read access on study_topics" ON public.study_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on flashcards" ON public.flashcards;
CREATE POLICY "Allow public read access on flashcards" ON public.flashcards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on questions" ON public.questions;
CREATE POLICY "Allow public read access on questions" ON public.questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow public read access on mock_tests" ON public.mock_tests FOR SELECT USING (true);

-- 4. Clear old data before re-inserting
DELETE FROM public.study_topics;
DELETE FROM public.study_units;
DELETE FROM public.flashcards;
DELETE FROM public.questions;
DELETE FROM public.mock_tests;

-- 5. Seed Initial Data
`;

// Insert Study Units & Topics
STUDY_UNITS.forEach((unit, idx) => {
  sql += `INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES (${escapeSql(unit.id)}, ${unit.unitNumber}, ${escapeSql(unit.title.hi)}, ${escapeSql(unit.title.en)}, ${escapeSql(unit.shortDesc.hi)}, ${escapeSql(unit.shortDesc.en)}, ${escapeSql(unit.iconName)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name;\n\n`;

  unit.topics.forEach((t, tIdx) => {
    sql += `INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES (${escapeSql(t.id)}, ${escapeSql(unit.id)}, ${tIdx + 1}, ${escapeSql(t.title.hi)}, ${escapeSql(t.title.en)}, ${escapeSql(t.content.hi)}, ${escapeSql(t.content.en)}, ${escapeJson(t.keyPoints || [])})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;\n\n`;
  });
});

// Insert Flashcards
FLASHCARDS.forEach((fc, idx) => {
  sql += `INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES (${escapeSql(fc.id)}, ${escapeSql(fc.category.hi)}, ${escapeSql(fc.category.en)}, ${escapeSql(fc.front.hi)}, ${escapeSql(fc.front.en)}, ${escapeSql(fc.back.hi)}, ${escapeSql(fc.back.en)}, ${escapeSql(fc.subtext?.hi)}, ${escapeSql(fc.subtext?.en)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;\n\n`;
});

// Insert Questions
QUESTIONS.forEach((q) => {
  sql += `INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES (${escapeSql(q.id)}, ${escapeSql(q.category)}, ${escapeSql(q.question.hi)}, ${escapeSql(q.question.en)}, ${escapeSql(q.options.A.hi)}, ${escapeSql(q.options.A.en)}, ${escapeSql(q.options.B.hi)}, ${escapeSql(q.options.B.en)}, ${escapeSql(q.options.C.hi)}, ${escapeSql(q.options.C.en)}, ${escapeSql(q.options.D.hi)}, ${escapeSql(q.options.D.en)}, ${escapeSql(q.correctAnswer)}, ${escapeSql(q.explanation.hi)}, ${escapeSql(q.explanation.en)}, ${escapeSql(q.difficulty || 'medium')}, ${escapeSql(q.year)}, ${escapeSql(q.sourceExam)})
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;\n\n`;
});

// Insert Mock Tests
MOCK_TESTS.forEach((test, idx) => {
  sql += `INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES (${escapeSql(test.id)}, ${escapeSql(test.title.hi)}, ${escapeSql(test.title.en)}, ${escapeSql(test.subtitle.hi)}, ${escapeSql(test.subtitle.en)}, ${test.durationMinutes}, ${test.totalMarks}, ${test.passMarks}, ${test.questionCount}, ${escapeJson(test.questionIds)}, ${escapeSql(test.type)}, ${escapeSql(test.badge?.hi)}, ${escapeSql(test.badge?.en)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;\n\n`;
});

const outDir = path.join(__dirname, '../supabase');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'schema_and_seed.sql'), sql, 'utf8');
console.log('Successfully generated supabase/schema_and_seed.sql');
