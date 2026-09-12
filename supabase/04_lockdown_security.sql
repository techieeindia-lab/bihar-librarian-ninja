-- ====================================================================
-- SECURITY HARDENING: LOCK DOWN SUPABASE TO 100% READ-ONLY FOR PUBLIC / ANON
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/croywgkjthofkeoqqesb/sql/new)
-- ====================================================================

-- 1. Revoke all write permissions (INSERT, UPDATE, DELETE, TRUNCATE) from anon role
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;

-- Grant only SELECT (Read-Only) to public/anon
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Ensure service_role (Admin) maintains full privileges
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;

-- 2. Drop all insecure "Allow public insert / ALL" policies
DROP POLICY IF EXISTS "Allow public insert on study_units" ON public.study_units;
DROP POLICY IF EXISTS "Allow public insert on study_topics" ON public.study_topics;
DROP POLICY IF EXISTS "Allow public insert on flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Allow public insert on questions" ON public.questions;
DROP POLICY IF EXISTS "Allow public insert on quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Allow public insert on one_liners" ON public.one_liners;
DROP POLICY IF EXISTS "Allow public insert on mock_tests" ON public.mock_tests;

DROP POLICY IF EXISTS "Allow public write on study_units" ON public.study_units;
DROP POLICY IF EXISTS "Allow public write on study_topics" ON public.study_topics;
DROP POLICY IF EXISTS "Allow public write on flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Allow public write on questions" ON public.questions;
DROP POLICY IF EXISTS "Allow public write on quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Allow public write on one_liners" ON public.one_liners;
DROP POLICY IF EXISTS "Allow public write on mock_tests" ON public.mock_tests;

-- 3. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.study_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.one_liners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- 4. Re-create clean, strict READ-ONLY policies for public SELECT
DROP POLICY IF EXISTS "Allow public read on study_units" ON public.study_units;
CREATE POLICY "Allow public read on study_units" ON public.study_units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on study_topics" ON public.study_topics;
CREATE POLICY "Allow public read on study_topics" ON public.study_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on flashcards" ON public.flashcards;
CREATE POLICY "Allow public read on flashcards" ON public.flashcards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on questions" ON public.questions;
CREATE POLICY "Allow public read on questions" ON public.questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on quizzes" ON public.quizzes;
CREATE POLICY "Allow public read on quizzes" ON public.quizzes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on one_liners" ON public.one_liners;
CREATE POLICY "Allow public read on one_liners" ON public.one_liners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow public read on mock_tests" ON public.mock_tests FOR SELECT USING (true);

-- 5. Service Role Write Policies (Full access for developers using service_role key)
DROP POLICY IF EXISTS "Allow service_role all on study_units" ON public.study_units;
CREATE POLICY "Allow service_role all on study_units" ON public.study_units FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on study_topics" ON public.study_topics;
CREATE POLICY "Allow service_role all on study_topics" ON public.study_topics FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on flashcards" ON public.flashcards;
CREATE POLICY "Allow service_role all on flashcards" ON public.flashcards FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on questions" ON public.questions;
CREATE POLICY "Allow service_role all on questions" ON public.questions FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on quizzes" ON public.quizzes;
CREATE POLICY "Allow service_role all on quizzes" ON public.quizzes FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on one_liners" ON public.one_liners;
CREATE POLICY "Allow service_role all on one_liners" ON public.one_liners FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service_role all on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow service_role all on mock_tests" ON public.mock_tests FOR ALL TO service_role USING (true) WITH CHECK (true);
