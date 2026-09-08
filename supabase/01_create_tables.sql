-- ====================================================================
-- STEP 1: CREATE TABLES, GRANTS, AND ROW LEVEL SECURITY
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/croywgkjthofkeoqqesb/sql/new)
-- ====================================================================

-- 1. Grant schema usage to API roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- 2. Drop existing tables if restarting completely fresh (Optional)
-- DROP TABLE IF EXISTS public.one_liners CASCADE;
-- DROP TABLE IF EXISTS public.quizzes CASCADE;
-- DROP TABLE IF EXISTS public.mock_tests CASCADE;
-- DROP TABLE IF EXISTS public.questions CASCADE;
-- DROP TABLE IF EXISTS public.flashcards CASCADE;
-- DROP TABLE IF EXISTS public.study_topics CASCADE;
-- DROP TABLE IF EXISTS public.study_units CASCADE;

-- 3. Create all 7 tables
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

-- 4. Grant table privileges to anon and authenticated roles
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.study_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.one_liners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- 6. Open Read and Write Policies for public app usage
DROP POLICY IF EXISTS "Allow public read on study_units" ON public.study_units;
CREATE POLICY "Allow public read on study_units" ON public.study_units FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on study_units" ON public.study_units;
CREATE POLICY "Allow public insert on study_units" ON public.study_units FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on study_topics" ON public.study_topics;
CREATE POLICY "Allow public read on study_topics" ON public.study_topics FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on study_topics" ON public.study_topics FOR ALL USING (true) WITH CHECK (true);

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
DROP POLICY IF EXISTS "Allow public insert on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow public insert on mock_tests" ON public.mock_tests FOR ALL USING (true) WITH CHECK (true);
