// @ts-nocheck
const fs = require('fs');
const path = require('path');
import { STUDY_UNITS } from '../src/data/studyNotes';
import { FLASHCARDS } from '../src/data/flashcards';
import { QUESTIONS } from '../src/data/questions';
import { QUIZZES } from '../src/data/quizzes';
import { ONE_LINERS } from '../src/data/oneLiners';

function escapeSql(str: string | undefined | null): string {
  if (str === undefined || str === null) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeJson(obj: any): string {
  if (obj === undefined || obj === null) return 'NULL';
  const jsonStr = JSON.stringify(obj).replace(/'/g, "''");
  return `'${jsonStr}'::jsonb`;
}

// 1. Generate full schema and seed SQL
let schemaAndSeedSql = `-- ==========================================================
-- Bihar Librarian Ninja - Complete Supabase Database Schema & Seed
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click Run
-- Project: croywgkjthofkeoqqesb
-- ==========================================================

-- 1. Grant schema usage to API roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- 2. Create Tables
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

CREATE TABLE IF NOT EXISTS public.quizzes (
  id TEXT PRIMARY KEY,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_hi TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  category TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  question_ids JSONB DEFAULT '[]'::jsonb,
  duration_minutes INTEGER DEFAULT 5,
  reward_xp INTEGER NOT NULL DEFAULT 50,
  badge_hi TEXT,
  badge_en TEXT,
  difficulty TEXT DEFAULT 'medium',
  color TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.one_liners (
  id TEXT PRIMARY KEY,
  category_hi TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_key TEXT NOT NULL,
  topic_hi TEXT NOT NULL,
  topic_en TEXT NOT NULL,
  statement_hi TEXT NOT NULL,
  statement_en TEXT NOT NULL,
  tag TEXT,
  is_important BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Legacy compatibility table (if needed)
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

-- 3. Grants
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.study_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.one_liners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- 5. Policies
DROP POLICY IF EXISTS "Allow public read on study_units" ON public.study_units;
CREATE POLICY "Allow public read on study_units" ON public.study_units FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on study_units" ON public.study_units;
CREATE POLICY "Allow public insert on study_units" ON public.study_units FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on study_topics" ON public.study_topics;
CREATE POLICY "Allow public read on study_topics" ON public.study_topics FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on study_topics" ON public.study_topics;
CREATE POLICY "Allow public insert on study_topics" ON public.study_topics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on flashcards" ON public.flashcards;
CREATE POLICY "Allow public read on flashcards" ON public.flashcards FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on flashcards" ON public.flashcards;
CREATE POLICY "Allow public insert on flashcards" ON public.flashcards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on questions" ON public.questions;
CREATE POLICY "Allow public read on questions" ON public.questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on questions" ON public.questions;
CREATE POLICY "Allow public insert on questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on quizzes" ON public.quizzes;
CREATE POLICY "Allow public read on quizzes" ON public.quizzes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on quizzes" ON public.quizzes;
CREATE POLICY "Allow public insert on quizzes" ON public.quizzes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on one_liners" ON public.one_liners;
CREATE POLICY "Allow public read on one_liners" ON public.one_liners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on one_liners" ON public.one_liners;
CREATE POLICY "Allow public insert on one_liners" ON public.one_liners FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow public read on mock_tests" ON public.mock_tests FOR SELECT USING (true);

-- 6. Seed Data
`;

// Helper to generate seed SQL chunks
function generateSeedSql(): string {
  let s = '';

  // Study Units & Topics
  STUDY_UNITS.forEach((unit, idx) => {
    s += `INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES (${escapeSql(unit.id)}, ${unit.unitNumber}, ${escapeSql(unit.title.hi)}, ${escapeSql(unit.title.en)}, ${escapeSql(unit.shortDesc.hi)}, ${escapeSql(unit.shortDesc.en)}, ${escapeSql(unit.iconName)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;\n\n`;

    unit.topics.forEach((t, tIdx) => {
      s += `INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES (${escapeSql(t.id)}, ${escapeSql(unit.id)}, ${tIdx + 1}, ${escapeSql(t.title.hi)}, ${escapeSql(t.title.en)}, ${escapeSql(t.content.hi)}, ${escapeSql(t.content.en)}, ${escapeJson(t.keyPoints || [])})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;\n\n`;
    });
  });

  // Flashcards
  FLASHCARDS.forEach((fc, idx) => {
    s += `INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES (${escapeSql(fc.id)}, ${escapeSql(fc.category.hi)}, ${escapeSql(fc.category.en)}, ${escapeSql(fc.front.hi)}, ${escapeSql(fc.front.en)}, ${escapeSql(fc.back.hi)}, ${escapeSql(fc.back.en)}, ${escapeSql(fc.subtext?.hi)}, ${escapeSql(fc.subtext?.en)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;\n\n`;
  });

  // Questions
  QUESTIONS.forEach((q) => {
    s += `INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES (${escapeSql(q.id)}, ${escapeSql(q.category)}, ${escapeSql(q.question.hi)}, ${escapeSql(q.question.en)}, ${escapeSql(q.options.A.hi)}, ${escapeSql(q.options.A.en)}, ${escapeSql(q.options.B.hi)}, ${escapeSql(q.options.B.en)}, ${escapeSql(q.options.C.hi)}, ${escapeSql(q.options.C.en)}, ${escapeSql(q.options.D.hi)}, ${escapeSql(q.options.D.en)}, ${escapeSql(q.correctAnswer)}, ${escapeSql(q.explanation.hi)}, ${escapeSql(q.explanation.en)}, ${escapeSql(q.difficulty || 'medium')}, ${escapeSql(q.year)}, ${escapeSql(q.sourceExam)})
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;\n\n`;
  });

  // Quizzes
  QUIZZES.forEach((qz, idx) => {
    s += `INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES (${escapeSql(qz.id)}, ${escapeSql(qz.title.hi)}, ${escapeSql(qz.title.en)}, ${escapeSql(qz.subtitle.hi)}, ${escapeSql(qz.subtitle.en)}, ${escapeSql(qz.category)}, ${qz.questionCount}, ${escapeJson(qz.questionIds)}, ${qz.durationMinutes || 5}, ${qz.rewardXP}, ${escapeSql(qz.badge?.hi)}, ${escapeSql(qz.badge?.en)}, ${escapeSql(qz.difficulty || 'medium')}, ${escapeSql(qz.color)}, ${escapeSql(qz.icon)}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;\n\n`;
  });

  // One-Liners
  ONE_LINERS.forEach((ol, idx) => {
    s += `INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES (${escapeSql(ol.id)}, ${escapeSql(ol.category.hi)}, ${escapeSql(ol.category.en)}, ${escapeSql(ol.categoryKey)}, ${escapeSql(ol.topic.hi)}, ${escapeSql(ol.topic.en)}, ${escapeSql(ol.statement.hi)}, ${escapeSql(ol.statement.en)}, ${escapeSql(ol.tag)}, ${ol.isImportant ? 'TRUE' : 'FALSE'}, ${idx + 1})
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;\n\n`;
  });

  return s;
}

schemaAndSeedSql += generateSeedSql();

// 2. Migration script 02_update_quizzes_and_oneliners.sql (just what is needed to update the DB)
let migrationSql = `-- ====================================================================
-- MIGRATION: ADD QUIZZES & ONE_LINERS AND UPDATE ALL STUDY CONTENT
-- Paste into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/croywgkjthofkeoqqesb/sql/new
-- ====================================================================

-- 1. Create quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id TEXT PRIMARY KEY,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_hi TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  category TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  question_ids JSONB DEFAULT '[]'::jsonb,
  duration_minutes INTEGER DEFAULT 5,
  reward_xp INTEGER NOT NULL DEFAULT 50,
  badge_hi TEXT,
  badge_en TEXT,
  difficulty TEXT DEFAULT 'medium',
  color TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create one_liners table
CREATE TABLE IF NOT EXISTS public.one_liners (
  id TEXT PRIMARY KEY,
  category_hi TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_key TEXT NOT NULL,
  topic_hi TEXT NOT NULL,
  topic_en TEXT NOT NULL,
  statement_hi TEXT NOT NULL,
  statement_en TEXT NOT NULL,
  tag TEXT,
  is_important BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Grants & Privileges
GRANT ALL ON public.quizzes TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.one_liners TO postgres, anon, authenticated, service_role;

-- 4. Enable RLS
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.one_liners ENABLE ROW LEVEL SECURITY;

-- 5. Public Access Policies
DROP POLICY IF EXISTS "Allow public read on quizzes" ON public.quizzes;
CREATE POLICY "Allow public read on quizzes" ON public.quizzes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on quizzes" ON public.quizzes;
CREATE POLICY "Allow public insert on quizzes" ON public.quizzes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on one_liners" ON public.one_liners;
CREATE POLICY "Allow public read on one_liners" ON public.one_liners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on one_liners" ON public.one_liners;
CREATE POLICY "Allow public insert on one_liners" ON public.one_liners FOR ALL USING (true) WITH CHECK (true);

-- 6. Insert All Seed Rows
` + generateSeedSql();

const outDir = path.join(process.cwd(), 'supabase');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'schema_and_seed.sql'), schemaAndSeedSql, 'utf8');
console.log('✓ Successfully generated supabase/schema_and_seed.sql');

fs.writeFileSync(path.join(outDir, '02_update_quizzes_and_oneliners.sql'), migrationSql, 'utf8');
console.log('✓ Successfully generated supabase/02_update_quizzes_and_oneliners.sql');
