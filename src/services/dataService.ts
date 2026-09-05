import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';
import { Flashcard, Question, StudyUnit, MockTest } from '../types';
import { FLASHCARDS } from '../data/flashcards';
import { STUDY_UNITS } from '../data/studyNotes';
import { QUESTIONS } from '../data/questions';
import { MOCK_TESTS } from '../data/mockTests';

const CACHE_KEY_FLASHCARDS = '@bihar_lib_cache_flashcards';
const CACHE_KEY_STUDY_UNITS = '@bihar_lib_cache_study_units';
const CACHE_KEY_QUESTIONS = '@bihar_lib_cache_questions';
const CACHE_KEY_MOCK_TESTS = '@bihar_lib_cache_mock_tests';

export const DataService = {
  /**
   * Fetch Flashcards:
   * 1. Fetches live from Supabase.
   * 2. Automatically caches for offline use.
   * 3. Seamlessly falls back to cache or bundled data if network is unavailable.
   */
  getFlashcards: async (): Promise<Flashcard[]> => {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: Flashcard[] = data.map((row: any) => ({
          id: row.id,
          category: { hi: row.category_hi, en: row.category_en },
          front: { hi: row.front_hi, en: row.front_en },
          back: { hi: row.back_hi, en: row.back_en },
          subtext: row.subtext_hi || row.subtext_en ? { hi: row.subtext_hi || '', en: row.subtext_en || '' } : undefined,
        }));

        await AsyncStorage.setItem(CACHE_KEY_FLASHCARDS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Network fetch for flashcards failed, using cache/fallback', e);
    }

    // Offline cache fallback
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_FLASHCARDS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    // Bundled fallback
    return FLASHCARDS;
  },

  /**
   * Fetch Study Units and Topics:
   */
  getStudyUnits: async (): Promise<StudyUnit[]> => {
    try {
      const { data: unitsData, error: unitsError } = await supabase
        .from('study_units')
        .select('*')
        .order('display_order', { ascending: true });

      const { data: topicsData, error: topicsError } = await supabase
        .from('study_topics')
        .select('*')
        .order('topic_order', { ascending: true });

      if (!unitsError && unitsData && unitsData.length > 0) {
        const units: StudyUnit[] = unitsData.map((u: any) => {
          const unitTopics = (topicsData || [])
            .filter((t: any) => t.unit_id === u.id)
            .map((t: any) => ({
              id: t.id,
              title: { hi: t.title_hi, en: t.title_en },
              content: { hi: t.content_hi, en: t.content_en },
              keyPoints: Array.isArray(t.key_points) ? t.key_points : [],
            }));

          return {
            id: u.id,
            unitNumber: u.unit_number,
            title: { hi: u.title_hi, en: u.title_en },
            shortDesc: { hi: u.short_desc_hi, en: u.short_desc_en },
            iconName: u.icon_name || 'book',
            topics: unitTopics,
          };
        });

        await AsyncStorage.setItem(CACHE_KEY_STUDY_UNITS, JSON.stringify(units));
        return units;
      }
    } catch (e) {
      console.warn('Network fetch for study units failed, using fallback', e);
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_STUDY_UNITS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return STUDY_UNITS;
  },

  /**
   * Fetch Practice & Exam Questions:
   */
  getQuestions: async (): Promise<Question[]> => {
    try {
      const { data, error } = await supabase.from('questions').select('*');

      if (!error && data && data.length > 0) {
        const mapped: Question[] = data.map((q: any) => ({
          id: q.id,
          category: q.category,
          question: { hi: q.question_hi, en: q.question_en },
          options: {
            A: { hi: q.option_a_hi, en: q.option_a_en },
            B: { hi: q.option_b_hi, en: q.option_b_en },
            C: { hi: q.option_c_hi, en: q.option_c_en },
            D: { hi: q.option_d_hi, en: q.option_d_en },
          },
          correctAnswer: q.correct_answer as 'A' | 'B' | 'C' | 'D',
          explanation: { hi: q.explanation_hi || '', en: q.explanation_en || '' },
          difficulty: q.difficulty || 'medium',
          year: q.year || undefined,
          sourceExam: q.source_exam || undefined,
        }));

        await AsyncStorage.setItem(CACHE_KEY_QUESTIONS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Network fetch for questions failed, using fallback', e);
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_QUESTIONS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return QUESTIONS;
  },

  /**
   * Fetch Mock Tests:
   */
  getMockTests: async (): Promise<MockTest[]> => {
    try {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: MockTest[] = data.map((t: any) => ({
          id: t.id,
          title: { hi: t.title_hi, en: t.title_en },
          subtitle: { hi: t.subtitle_hi, en: t.subtitle_en },
          durationMinutes: t.duration_minutes,
          totalMarks: t.total_marks,
          passMarks: t.pass_marks,
          questionCount: t.question_count,
          questionIds: Array.isArray(t.question_ids) ? t.question_ids : [],
          type: t.test_type as 'full_length' | 'sectional' | 'pyq',
          badge: t.badge_hi || t.badge_en ? { hi: t.badge_hi || '', en: t.badge_en || '' } : undefined,
        }));

        await AsyncStorage.setItem(CACHE_KEY_MOCK_TESTS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Network fetch for mock tests failed, using fallback', e);
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_MOCK_TESTS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return MOCK_TESTS;
  },

  /**
   * Create a new flashcard (can be used in-app or from admin tools)
   */
  createFlashcard: async (card: Omit<Flashcard, 'id'>): Promise<{ success: boolean; data?: any; error?: any }> => {
    try {
      const id = `fc_${Date.now()}`;
      const { data, error } = await supabase.from('flashcards').insert([
        {
          id,
          category_hi: card.category.hi,
          category_en: card.category.en,
          front_hi: card.front.hi,
          front_en: card.front.en,
          back_hi: card.back.hi,
          back_en: card.back.en,
          subtext_hi: card.subtext?.hi || null,
          subtext_en: card.subtext?.en || null,
          display_order: 99,
        },
      ]);

      if (error) return { success: false, error };
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  },

  /**
   * Add a new topic / note to a unit:
   */
  createStudyTopic: async (
    unitId: string,
    topic: { titleHi: string; titleEn: string; contentHi: string; contentEn: string; keyPoints?: Array<{ hi: string; en: string }> }
  ): Promise<{ success: boolean; error?: any }> => {
    try {
      const id = `t_${Date.now()}`;
      const { error } = await supabase.from('study_topics').insert([
        {
          id,
          unit_id: unitId,
          title_hi: topic.titleHi,
          title_en: topic.titleEn,
          content_hi: topic.contentHi,
          content_en: topic.contentEn,
          key_points: topic.keyPoints || [],
          topic_order: 99,
        },
      ]);
      if (error) return { success: false, error };
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },
};
