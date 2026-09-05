import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTestAttempt } from '../types';

const BOOKMARKS_KEY = '@bihar_lib_bookmarks';
const ATTEMPTS_KEY = '@bihar_lib_test_attempts';
const STREAK_KEY = '@bihar_lib_streak_data';

export interface StreakData {
  lastActiveDate: string;
  currentStreak: number;
}

export const StorageService = {
  // Bookmarks
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

  // Test Attempts
  saveTestAttempt: async (attempt: UserTestAttempt): Promise<void> => {
    try {
      const history = await StorageService.getTestAttempts();
      const updated = [attempt, ...history.slice(0, 49)]; // Store up to 50 recent attempts
      await AsyncStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
    } catch (e) {}
  },

  getTestAttempts: async (): Promise<UserTestAttempt[]> => {
    try {
      const data = await AsyncStorage.getItem(ATTEMPTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  getStats: async () => {
    const attempts = await StorageService.getTestAttempts();
    const bookmarks = await StorageService.getBookmarks();

    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        avgAccuracy: 0,
        totalQuestionsAttempted: 0,
        totalCorrect: 0,
        bookmarkedCount: bookmarks.length,
      };
    }

    let totalQs = 0;
    let totalCorrect = 0;
    attempts.forEach((a) => {
      totalQs += a.totalQuestions;
      totalCorrect += a.correctCount;
    });

    const avgAccuracy = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;

    return {
      totalAttempts: attempts.length,
      avgAccuracy,
      totalQuestionsAttempted: totalQs,
      totalCorrect,
      bookmarkedCount: bookmarks.length,
    };
  },

  // Daily Streak
  updateStreak: async (): Promise<number> => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await AsyncStorage.getItem(STREAK_KEY);
      let streakData: StreakData = data ? JSON.parse(data) : { lastActiveDate: '', currentStreak: 0 };

      if (streakData.lastActiveDate === today) {
        return streakData.currentStreak;
      }

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streakData.lastActiveDate === yesterday) {
        streakData.currentStreak += 1;
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
  }
};
