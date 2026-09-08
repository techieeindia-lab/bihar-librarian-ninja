-- =========================================================================
-- MIGRATION 03: TOPIC-WISE FLASHCARDS & ONE-LINERS (25 MASTER TOPICS)
-- =========================================================================

-- 1. Add unit_number and topic_id columns to flashcards and one_liners
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS unit_number INTEGER;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS topic_id TEXT;

ALTER TABLE public.one_liners ADD COLUMN IF NOT EXISTS unit_number INTEGER;
ALTER TABLE public.one_liners ADD COLUMN IF NOT EXISTS topic_id TEXT;

-- 2. Update existing flashcards with unit_number and topic_id
UPDATE public.flashcards SET unit_number = 1, topic_id = 'u1_t4' WHERE id IN ('fc_1', 'fc_4');
UPDATE public.flashcards SET unit_number = 1, topic_id = 'u1_t3' WHERE id IN ('fc_13', 'fc_15');
UPDATE public.flashcards SET unit_number = 1, topic_id = 'u1_t5' WHERE id IN ('fc_14', 'fc_16', 'fc_17', 'fc_18', 'fc_19', 'fc_20');

UPDATE public.flashcards SET unit_number = 2, topic_id = 'u2_t2' WHERE id IN ('fc_2', 'fc_5', 'fc_6');
UPDATE public.flashcards SET unit_number = 2, topic_id = 'u2_t3' WHERE id IN ('fc_3', 'fc_7', 'fc_8');
UPDATE public.flashcards SET unit_number = 2, topic_id = 'u2_t4' WHERE id IN ('fc_9', 'fc_11');
UPDATE public.flashcards SET unit_number = 2, topic_id = 'u2_t5' WHERE id IN ('fc_10', 'fc_12');

UPDATE public.flashcards SET unit_number = 3, topic_id = 'u3_t1' WHERE id IN ('fc_29');
UPDATE public.flashcards SET unit_number = 3, topic_id = 'u3_t3' WHERE id IN ('fc_25');
UPDATE public.flashcards SET unit_number = 3, topic_id = 'u3_t4' WHERE id IN ('fc_31');

UPDATE public.flashcards SET unit_number = 4, topic_id = 'u4_t1' WHERE id IN ('fc_26');
UPDATE public.flashcards SET unit_number = 4, topic_id = 'u4_t2' WHERE id IN ('fc_30');
UPDATE public.flashcards SET unit_number = 4, topic_id = 'u4_t3' WHERE id IN ('fc_27');
UPDATE public.flashcards SET unit_number = 4, topic_id = 'u4_t4' WHERE id IN ('fc_28');

UPDATE public.flashcards SET unit_number = 5, topic_id = 'u5_t1' WHERE id IN ('fc_21', 'fc_22');
UPDATE public.flashcards SET unit_number = 5, topic_id = 'u5_t2' WHERE id IN ('fc_23');
UPDATE public.flashcards SET unit_number = 5, topic_id = 'u5_t3' WHERE id IN ('fc_24');
UPDATE public.flashcards SET unit_number = 5, topic_id = 'u5_t5' WHERE id IN ('fc_32');

-- 3. Update existing one-liners with unit_number and topic_id
UPDATE public.one_liners SET unit_number = 1, topic_id = 'u1_t4', category_key = 'u1_t4' WHERE id IN ('ol_1', 'ol_2', 'ol_3', 'ol_4', 'ol_5', 'ol_6', 'ol_7');
UPDATE public.one_liners SET unit_number = 1, topic_id = 'u1_t3', category_key = 'u1_t3' WHERE id IN ('ol_10', 'ol_11');
UPDATE public.one_liners SET unit_number = 1, topic_id = 'u1_t5', category_key = 'u1_t5' WHERE id IN ('ol_8', 'ol_9', 'ol_28', 'ol_29', 'ol_30', 'ol_31', 'ol_32', 'ol_33', 'ol_34');

UPDATE public.one_liners SET unit_number = 2, topic_id = 'u2_t2', category_key = 'u2_t2' WHERE id IN ('ol_12', 'ol_13');
UPDATE public.one_liners SET unit_number = 2, topic_id = 'u2_t3', category_key = 'u2_t3' WHERE id IN ('ol_14', 'ol_15');
UPDATE public.one_liners SET unit_number = 2, topic_id = 'u2_t4', category_key = 'u2_t4' WHERE id IN ('ol_16', 'ol_17');
UPDATE public.one_liners SET unit_number = 2, topic_id = 'u2_t5', category_key = 'u2_t5' WHERE id IN ('ol_18', 'ol_19', 'ol_20');

UPDATE public.one_liners SET unit_number = 3, topic_id = 'u3_t1', category_key = 'u3_t1' WHERE id IN ('ol_35');
UPDATE public.one_liners SET unit_number = 3, topic_id = 'u3_t2', category_key = 'u3_t2' WHERE id IN ('ol_39');
UPDATE public.one_liners SET unit_number = 3, topic_id = 'u3_t3', category_key = 'u3_t3' WHERE id IN ('ol_36', 'ol_37', 'ol_38');
UPDATE public.one_liners SET unit_number = 3, topic_id = 'u3_t4', category_key = 'u3_t4' WHERE id IN ('ol_40', 'ol_48');

UPDATE public.one_liners SET unit_number = 4, topic_id = 'u4_t1', category_key = 'u4_t1' WHERE id IN ('ol_41', 'ol_42');
UPDATE public.one_liners SET unit_number = 4, topic_id = 'u4_t2', category_key = 'u4_t2' WHERE id IN ('ol_43');
UPDATE public.one_liners SET unit_number = 4, topic_id = 'u4_t3', category_key = 'u4_t3' WHERE id IN ('ol_44', 'ol_45');
UPDATE public.one_liners SET unit_number = 4, topic_id = 'u4_t4', category_key = 'u4_t4' WHERE id IN ('ol_46');
UPDATE public.one_liners SET unit_number = 4, topic_id = 'u4_t5', category_key = 'u4_t5' WHERE id IN ('ol_47');

UPDATE public.one_liners SET unit_number = 5, topic_id = 'u5_t1', category_key = 'u5_t1' WHERE id IN ('ol_21', 'ol_22', 'ol_23');
UPDATE public.one_liners SET unit_number = 5, topic_id = 'u5_t2', category_key = 'u5_t2' WHERE id IN ('ol_24');
UPDATE public.one_liners SET unit_number = 5, topic_id = 'u5_t3', category_key = 'u5_t3' WHERE id IN ('ol_26');
UPDATE public.one_liners SET unit_number = 5, topic_id = 'u5_t4', category_key = 'u5_t4' WHERE id IN ('ol_25', 'ol_27');
UPDATE public.one_liners SET unit_number = 5, topic_id = 'u5_t5', category_key = 'u5_t5' WHERE id IN ('ol_49', 'ol_50');
