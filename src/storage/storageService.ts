import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserQuizAttempt } from '../types';

const BOOKMARKS_KEY = '@bihar_lib_bookmarks';
const ONELINER_BOOKMARKS_KEY = '@bihar_lib_oneliner_bookmarks';
const FLASHCARD_BOOKMARKS_KEY = '@bihar_lib_flashcard_bookmarks';
const FLASHCARD_MASTERED_KEY = '@bihar_lib_flashcard_mastered';
const ATTEMPTS_KEY = '@bihar_lib_quiz_attempts';
const LEGACY_ATTEMPTS_KEY = '@bihar_lib_test_attempts';
const STREAK_KEY = '@bihar_lib_streak_data';
const MISTAKES_KEY = '@bihar_lib_mistake_questions';

export interface StreakData {
  lastActiveDate: string;
  currentStreak: number;
}

export const StorageService = {
  // Question Bookmarks
  getBookmarks: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isBookmarked: async (questionId: string): Promise<boolean> => {
    const list = await StorageService.getBookmarks();
    return list.includes(questionId);
  },

  toggleBookmark: async (questionId: string): Promise<boolean> => {
    try {
      const list = await StorageService.getBookmarks();
      let updated: string[];
      let added = false;
      if (list.includes(questionId)) {
        updated = list.filter((id) => id !== questionId);
      } else {
        updated = [...list, questionId];
        added = true;
      }
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return added;
    } catch (e) {
      return false;
    }
  },

  // Mistake Notebook / Incorrect Questions Tracking
  getMistakes: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(MISTAKES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  recordMistakesFromAttempt: async (
    userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>,
    correctAnswersMap: Record<string, 'A' | 'B' | 'C' | 'D'>
  ): Promise<void> => {
    try {
      const current = await StorageService.getMistakes();
      const mistakeSet = new Set(current);

      Object.entries(userAnswers).forEach(([qId, userAns]) => {
        if (!userAns) return;
        const correct = correctAnswersMap[qId];
        if (correct) {
          if (userAns !== correct) {
            mistakeSet.add(qId);
          } else {
            // If answered correctly now, clear it from mistakes list
            mistakeSet.delete(qId);
          }
        }
      });

      await AsyncStorage.setItem(MISTAKES_KEY, JSON.stringify(Array.from(mistakeSet)));
    } catch (e) {}
  },

  removeMistake: async (questionId: string): Promise<void> => {
    try {
      const current = await StorageService.getMistakes();
      const updated = current.filter((id) => id !== questionId);
      await AsyncStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
    } catch (e) {}
  },

  clearAllMistakes: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(MISTAKES_KEY);
    } catch (e) {}
  },

  // One-Liner Bookmarks
  getOneLinerBookmarks: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(ONELINER_BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isOneLinerBookmarked: async (factId: string): Promise<boolean> => {
    const list = await StorageService.getOneLinerBookmarks();
    return list.includes(factId);
  },

  toggleOneLinerBookmark: async (factId: string): Promise<boolean> => {
    try {
      const list = await StorageService.getOneLinerBookmarks();
      let updated: string[];
      let added = false;
      if (list.includes(factId)) {
        updated = list.filter((id) => id !== factId);
      } else {
        updated = [...list, factId];
        added = true;
      }
      await AsyncStorage.setItem(ONELINER_BOOKMARKS_KEY, JSON.stringify(updated));
      return added;
    } catch (e) {
      return false;
    }
  },

  // Flashcard Bookmarks
  getFlashcardBookmarks: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(FLASHCARD_BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleFlashcardBookmark: async (cardId: string): Promise<boolean> => {
    try {
      const list = await StorageService.getFlashcardBookmarks();
      let updated: string[];
      let added = false;
      if (list.includes(cardId)) {
        updated = list.filter((id) => id !== cardId);
      } else {
        updated = [...list, cardId];
        added = true;
      }
      await AsyncStorage.setItem(FLASHCARD_BOOKMARKS_KEY, JSON.stringify(updated));
      return added;
    } catch (e) {
      return false;
    }
  },

  // Flashcard Mastered (Anki / Quizlet spaced repetition tracking)
  getFlashcardMastered: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(FLASHCARD_MASTERED_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleFlashcardMastered: async (cardId: string): Promise<boolean> => {
    try {
      const list = await StorageService.getFlashcardMastered();
      let updated: string[];
      let mastered = false;
      if (list.includes(cardId)) {
        updated = list.filter((id) => id !== cardId);
      } else {
        updated = [...list, cardId];
        mastered = true;
      }
      await AsyncStorage.setItem(FLASHCARD_MASTERED_KEY, JSON.stringify(updated));
      return mastered;
    } catch (e) {
      return false;
    }
  },

  // Quiz Attempts
  saveQuizAttempt: async (attempt: UserQuizAttempt): Promise<void> => {
    try {
      const history = await StorageService.getQuizAttempts();
      const updated = [attempt, ...history.slice(0, 49)];
      await AsyncStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
    } catch (e) {}
  },

  // Legacy alias
  saveTestAttempt: async (attempt: UserQuizAttempt): Promise<void> => {
    return StorageService.saveQuizAttempt(attempt);
  },

  getQuizAttempts: async (): Promise<UserQuizAttempt[]> => {
    try {
      const data = await AsyncStorage.getItem(ATTEMPTS_KEY);
      if (data) return JSON.parse(data);
      // Fallback check for legacy attempts
      const legacyData = await AsyncStorage.getItem(LEGACY_ATTEMPTS_KEY);
      if (legacyData) return JSON.parse(legacyData);
      return [];
    } catch (e) {
      return [];
    }
  },

  // Legacy alias
  getTestAttempts: async (): Promise<UserQuizAttempt[]> => {
    return StorageService.getQuizAttempts();
  },

  getStats: async () => {
    const attempts = await StorageService.getQuizAttempts();
    const bookmarks = await StorageService.getBookmarks();

    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        avgAccuracy: 0,
        totalQuestionsAttempted: 0,
        totalCorrect: 0,
        bookmarkedCount: bookmarks.length,
        totalXP: 0,
      };
    }

    let totalQs = 0;
    let totalCorrect = 0;
    let totalXP = 0;

    attempts.forEach((a) => {
      totalQs += a.totalQuestions || 0;
      totalCorrect += a.correctCount || 0;
      totalXP += a.xpEarned || (a.score * 5) || 0;
    });

    const avgAccuracy = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;

    return {
      totalAttempts: attempts.length,
      avgAccuracy,
      totalQuestionsAttempted: totalQs,
      totalCorrect,
      bookmarkedCount: bookmarks.length,
      totalXP,
    };
  },

  // Daily Streak
  updateStreak: async (): Promise<number> => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;

      const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const yYear = yesterdayDate.getFullYear();
      const yMonth = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
      const yDay = String(yesterdayDate.getDate()).padStart(2, '0');
      const yesterday = `${yYear}-${yMonth}-${yDay}`;

      const data = await AsyncStorage.getItem(STREAK_KEY);
      let streakData: StreakData = data ? JSON.parse(data) : { lastActiveDate: '', currentStreak: 0 };

      if (streakData.lastActiveDate === today) {
        return streakData.currentStreak || 1;
      }

      if (streakData.lastActiveDate === yesterday) {
        streakData.currentStreak = (streakData.currentStreak || 0) + 1;
      } else {
        streakData.currentStreak = 1;
      }
      streakData.lastActiveDate = today;

      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
      return streakData.currentStreak;
    } catch (e) {
      return 1;
    }
  },

  getStreak: async (): Promise<number> => {
    try {
      const data = await AsyncStorage.getItem(STREAK_KEY);
      if (!data) return 1;
      const parsed: StreakData = JSON.parse(data);
      return parsed.currentStreak || 1;
    } catch (e) {
      return 1;
    }
  },
};
