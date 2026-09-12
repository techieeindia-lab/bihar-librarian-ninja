import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, SUPABASE_URL } from './supabaseClient';
import { Flashcard, Question, StudyUnit, Quiz, OneLiner } from '../types';
import { FLASHCARDS } from '../data/flashcards';
import { STUDY_UNITS } from '../data/studyNotes';
import { QUESTIONS } from '../data/questions';
import { QUIZZES } from '../data/quizzes';
import { ONE_LINERS } from '../data/oneLiners';

const CACHE_KEY_FLASHCARDS = '@bihar_lib_cache_flashcards';
const CACHE_KEY_STUDY_UNITS = '@bihar_lib_cache_study_units';
const CACHE_KEY_QUESTIONS = '@bihar_lib_cache_questions';
const CACHE_KEY_QUIZZES = '@bihar_lib_cache_quizzes';
const CACHE_KEY_ONELINERS = '@bihar_lib_cache_oneliners';
const CACHE_KEY_LAST_SYNC = '@bihar_lib_cache_last_sync';

export interface DbStatusInfo {
  connected: boolean;
  latencyMs: number;
  lastSyncedAt?: string;
  url: string;
  counts: {
    units: number;
    topics: number;
    flashcards: number;
    questions: number;
    quizzes: number;
    oneLiners: number;
  };
  error?: string;
}

export const DataService = {
  /**
   * Diagnostic / Health check to verify live Supabase connectivity and remote table row counts
   */
  checkConnection: async (): Promise<DbStatusInfo> => {
    const start = Date.now();
    try {
      // 1. Ping study_units with count
      const { count: unitsCount, error: unitsErr } = await supabase
        .from('study_units')
        .select('*', { count: 'exact', head: true });

      const latencyMs = Date.now() - start;

      if (unitsErr) {
        return {
          connected: false,
          latencyMs,
          url: SUPABASE_URL,
          counts: { units: 0, topics: 0, flashcards: 0, questions: 0, quizzes: 0, oneLiners: 0 },
          error: unitsErr.message,
        };
      }

      // 2. Fetch counts for remaining tables
      const [topicsRes, flashcardsRes, questionsRes, quizzesRes, oneLinersRes, lastSync] = await Promise.all([
        supabase.from('study_topics').select('*', { count: 'exact', head: true }),
        supabase.from('flashcards').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('quizzes').select('*', { count: 'exact', head: true }),
        supabase.from('one_liners').select('*', { count: 'exact', head: true }),
        AsyncStorage.getItem(CACHE_KEY_LAST_SYNC),
      ]);

      return {
        connected: true,
        latencyMs,
        lastSyncedAt: lastSync || undefined,
        url: SUPABASE_URL,
        counts: {
          units: unitsCount ?? 0,
          topics: topicsRes.count ?? 0,
          flashcards: flashcardsRes.count ?? 0,
          questions: questionsRes.count ?? 0,
          quizzes: quizzesRes.count ?? 0,
          oneLiners: oneLinersRes.count ?? 0,
        },
      };
    } catch (e: any) {
      return {
        connected: false,
        latencyMs: Date.now() - start,
        url: SUPABASE_URL,
        counts: { units: 0, topics: 0, flashcards: 0, questions: 0, quizzes: 0, oneLiners: 0 },
        error: e?.message || 'Network connection failed',
      };
    }
  },

  /**
   * Force sync all content from Supabase and refresh local cache
   */
  syncAllFromDatabase: async (): Promise<{
    success: boolean;
    counts: {
      units: number;
      flashcards: number;
      questions: number;
      quizzes: number;
      oneLiners: number;
    };
    error?: string;
  }> => {
    try {
      const [units, flashcards, questions, quizzes, oneLiners] = await Promise.all([
        DataService.getStudyUnits(true),
        DataService.getFlashcards(true),
        DataService.getQuestions(true),
        DataService.getQuizzes(true),
        DataService.getOneLiners(true),
      ]);

      await AsyncStorage.setItem(CACHE_KEY_LAST_SYNC, new Date().toISOString());

      return {
        success: true,
        counts: {
          units: units.length,
          flashcards: flashcards.length,
          questions: questions.length,
          quizzes: quizzes.length,
          oneLiners: oneLiners.length,
        },
      };
    } catch (e: any) {
      return {
        success: false,
        counts: { units: 0, flashcards: 0, questions: 0, quizzes: 0, oneLiners: 0 },
        error: e?.message || 'Sync failed',
      };
    }
  },

  /**
   * Fetch Flashcards with remote Supabase DB, offline cache, and bundled emergency fallback
   */
  getFlashcards: async (forceRemote = false): Promise<Flashcard[]> => {
    if (!forceRemote) {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY_FLASHCARDS);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Asynchronously refresh in background
            DataService._refreshFlashcards().catch(() => {});
            return parsed;
          }
        }
      } catch (e) {}
    }

    return DataService._refreshFlashcards();
  },

  _refreshFlashcards: async (): Promise<Flashcard[]> => {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: Flashcard[] = data.map((row: any) => {
          const bundled = FLASHCARDS.find((f) => f.id === row.id);
          let unitNumber =
            row.unit_number ||
            bundled?.unitNumber ||
            (row.category_key?.startsWith('u') ? parseInt(row.category_key[1], 10) : undefined);
          let topicId =
            row.topic_id ||
            bundled?.topicId ||
            (row.category_key?.startsWith('u') ? row.category_key : undefined);

          if (!topicId && row.id) {
            const m = row.id.match(/u(\d)_t(\d)/) || row.id.match(/fc_(\d)_(\d)/);
            if (m) {
              unitNumber = parseInt(m[1], 10);
              topicId = `u${m[1]}_t${m[2]}`;
            }
          }
          if (!topicId && row.category_en) {
            const m = row.category_en.match(/Topic\s*(\d)\.(\d)/i);
            if (m) {
              unitNumber = parseInt(m[1], 10);
              topicId = `u${m[1]}_t${m[2]}`;
            }
          }

          return {
            id: row.id,
            unitNumber,
            topicId,
            category: {
              hi: row.category_hi || row.category_en || 'सामान्य',
              en: row.category_en || row.category_hi || 'General',
            },
            front: {
              hi: row.front_hi || row.front_en || '',
              en: row.front_en || row.front_hi || '',
            },
            back: {
              hi: row.back_hi || row.back_en || '',
              en: row.back_en || row.back_hi || '',
            },
            subtext: row.subtext_hi || row.subtext_en ? { hi: row.subtext_hi || '', en: row.subtext_en || '' } : undefined,
          };
        });

        await AsyncStorage.setItem(CACHE_KEY_FLASHCARDS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      // Offline fallback
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_FLASHCARDS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return FLASHCARDS;
  },

  /**
   * Fetch Study Units and Topics from Supabase DB
   */
  getStudyUnits: async (forceRemote = false): Promise<StudyUnit[]> => {
    if (!forceRemote) {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY_STUDY_UNITS);
        if (cached) {
          const parsed = JSON.parse(cached);
          const totalTopics = Array.isArray(parsed)
            ? parsed.reduce((sum: number, u: any) => sum + (u.topics?.length || 0), 0)
            : 0;
          // Invalidate legacy cache if it does not contain the 29 master topics or has stale unit titles
          const hasLegacyData =
            !Array.isArray(parsed) ||
            parsed.length !== 5 ||
            totalTopics !== 29 ||
            parsed[0]?.title?.en !== 'Unit 1: Library, Information and Society' ||
            parsed.some(
              (u: any) =>
                u.unitNumber > 5 ||
                !Array.isArray(u.topics) ||
                u.topics.some((t: any) => !t.id.startsWith('u'))
            );

          if (!hasLegacyData && parsed.length === 5 && totalTopics === 29) {
            DataService._refreshStudyUnits().catch(() => {});
            return parsed;
          }
        }
      } catch (e) {}
    }

    return DataService._refreshStudyUnits();
  },

  _refreshStudyUnits: async (): Promise<StudyUnit[]> => {
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
        // Strictly filter to the 5 Core Units and their valid topics (u1_t1 to u5_t5)
        const units: StudyUnit[] = unitsData
          .filter((u: any) => u.unit_number <= 5)
          .map((u: any) => {
            const unitTopics = (topicsData || [])
              .filter((t: any) => t.unit_id === u.id && t.id.startsWith('u'))
              .sort((a: any, b: any) => (a.topic_order || 0) - (b.topic_order || 0))
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
      // Offline fallback
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_STUDY_UNITS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return STUDY_UNITS;
  },

  /**
   * Fetch Practice & Exam Questions from Supabase DB
   */
  getQuestions: async (forceRemote = false): Promise<Question[]> => {
    if (!forceRemote) {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY_QUESTIONS);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            DataService._refreshQuestions().catch(() => {});
            return parsed;
          }
        }
      } catch (e) {}
    }

    return DataService._refreshQuestions();
  },

  _refreshQuestions: async (): Promise<Question[]> => {
    try {
      let allData: any[] = [];
      let from = 0;
      const step = 1000;

      while (true) {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .range(from, from + step - 1);

        if (error || !data || data.length === 0) break;
        allData.push(...data);
        if (data.length < step) break;
        from += step;
      }

      if (allData.length > 0) {
        const mapped: Question[] = allData.map((q: any) => {
          let unitNumber = q.unit_number;
          let topicId = q.topic_id;
          if (!topicId && q.id) {
            const m = q.id.match(/q_u(\d)_t(\d)/);
            if (m) {
              unitNumber = parseInt(m[1], 10);
              topicId = `u${m[1]}_t${m[2]}`;
            }
          }

          return {
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
            unitNumber: unitNumber || undefined,
            topicId: topicId || undefined,
          };
        });

        await AsyncStorage.setItem(CACHE_KEY_QUESTIONS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      // Offline fallback
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_QUESTIONS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return QUESTIONS;
  },

  /**
   * Fetch Quizzes directly from Supabase DB (quizzes table)
   */
  getQuizzes: async (forceRemote = false): Promise<Quiz[]> => {
    if (!forceRemote) {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY_QUIZZES);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= QUIZZES.length) {
            DataService._refreshQuizzes().catch(() => {});
            return parsed;
          }
        }
      } catch (e) {}
    }

    return DataService._refreshQuizzes();
  },

  _refreshQuizzes: async (): Promise<Quiz[]> => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: Quiz[] = data.map((row: any) => {
          let topicId = row.topic_id;
          let unitNumber = row.unit_number;
          let setNumber = row.set_number;

          if (!topicId && row.id) {
            const tm = row.id.match(/quiz_u(\d+)_t(\d+)/);
            if (tm) {
              unitNumber = parseInt(tm[1], 10);
              topicId = `u${tm[1]}_t${tm[2]}`;
            }
          }
          if (!unitNumber && row.id) {
            const um = row.id.match(/quiz_unit_(\d+)/);
            if (um) {
              unitNumber = parseInt(um[1], 10);
            }
          }
          if (setNumber === undefined && row.id) {
            const sm = row.id.match(/_s(\d+)$/);
            setNumber = sm ? parseInt(sm[1], 10) : 1;
          }

          const setName = row.set_name_hi || row.set_name_en
            ? { hi: row.set_name_hi || `सेट ${setNumber || 1}`, en: row.set_name_en || `Set ${setNumber || 1}` }
            : (topicId ? { hi: `सेट ${setNumber || 1}`, en: `Set ${setNumber || 1}` } : undefined);

          return {
            id: row.id,
            topicId,
            unitNumber,
            setNumber,
            setName,
            title: { hi: row.title_hi, en: row.title_en },
            subtitle: { hi: row.subtitle_hi, en: row.subtitle_en },
            category: row.category,
            questionCount: row.question_count,
            questionIds: Array.isArray(row.question_ids) ? row.question_ids : [],
            durationMinutes: row.duration_minutes || undefined,
            rewardXP: row.reward_xp || 50,
            badge: row.badge_hi || row.badge_en ? { hi: row.badge_hi || '', en: row.badge_en || '' } : undefined,
            difficulty: row.difficulty || 'medium',
            color: row.color || undefined,
            icon: row.icon || undefined,
          };
        });

        // Merge with local QUIZZES so all local additions (e.g. PYQs) are always preserved
        const remoteIds = new Set(mapped.map((q) => q.id));
        const merged = [...mapped, ...QUIZZES.filter((q) => !remoteIds.has(q.id))];

        await AsyncStorage.setItem(CACHE_KEY_QUIZZES, JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      // Offline fallback
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_QUIZZES);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= QUIZZES.length) {
          return parsed;
        }
      }
    } catch (e) {}

    return QUIZZES;
  },

  // Backward compatibility alias
  getMockTests: async (): Promise<Quiz[]> => {
    return DataService.getQuizzes();
  },

  /**
   * Fetch One-Liners directly from Supabase DB (one_liners table)
   */
  getOneLiners: async (forceRemote = false): Promise<OneLiner[]> => {
    if (!forceRemote) {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY_ONELINERS);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            DataService._refreshOneLiners().catch(() => {});
            return parsed;
          }
        }
      } catch (e) {}
    }

    return DataService._refreshOneLiners();
  },

  _refreshOneLiners: async (): Promise<OneLiner[]> => {
    try {
      const { data, error } = await supabase
        .from('one_liners')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: OneLiner[] = data.map((row: any) => {
          const bundled = ONE_LINERS.find((o) => o.id === row.id);
          const unitNumber =
            row.unit_number ||
            bundled?.unitNumber ||
            (row.category_key?.startsWith('u') ? parseInt(row.category_key[1], 10) : undefined);
          const topicId =
            row.topic_id ||
            bundled?.topicId ||
            (row.category_key?.startsWith('u') ? row.category_key : undefined);

          return {
            id: row.id,
            unitNumber,
            topicId,
            category: { hi: row.category_hi, en: row.category_en },
            categoryKey: row.category_key,
            topic: { hi: row.topic_hi, en: row.topic_en },
            statement: { hi: row.statement_hi, en: row.statement_en },
            tag: row.tag || undefined,
            isImportant: row.is_important || false,
          };
        });

        await AsyncStorage.setItem(CACHE_KEY_ONELINERS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      // Offline fallback
    }

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY_ONELINERS);
      if (cached) return JSON.parse(cached);
    } catch (e) {}

    return ONE_LINERS;
  },

  /**
   * Create Flashcard
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
};
