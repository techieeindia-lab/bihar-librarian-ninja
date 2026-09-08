import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { Question } from '../types';
import { StorageService } from '../storage/storageService';
import { DataService } from '../services/dataService';
import { QuestionCard } from '../components/QuestionCard';

export const BookmarksScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const ids = await StorageService.getBookmarks();
    const allQuestions = await DataService.getQuestions();
    const list = allQuestions.filter((q) => ids.includes(q.id));
    setBookmarkedQuestions(list);
  };

  const handleRemoveBookmark = async (qId: string) => {
    await StorageService.toggleBookmark(qId);
    setBookmarkedQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.bookmarksTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? 'कठिन एवं महत्वपूर्ण प्रश्न जिन्हें आपने पुनरावलोकन हेतु सहेजा है'
            : 'Questions flagged during mock tests for focused revision'}
        </Text>
      </View>

      {/* Action Bar */}
      {bookmarkedQuestions.length > 0 && (
        <View style={styles.actionBar}>
          <Text style={[styles.countText, { color: colors.accent }]}>
            {bookmarkedQuestions.length} {t.questions}
          </Text>

          <TouchableOpacity
            style={[
              styles.toggleAnswerBtn,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowAnswers(!showAnswers)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showAnswers ? 'eye-off-outline' : 'eye-outline'}
              size={15}
              color={colors.textPrimary}
            />
            <Text
              style={[
                styles.toggleAnswerText,
                { color: colors.textPrimary },
              ]}
            >
              {showAnswers ? t.hideExplanation : t.showExplanation}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bookmarks List */}
      {bookmarkedQuestions.length > 0 ? (
        <View style={styles.listContainer}>
          {bookmarkedQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              questionNumber={idx + 1}
              totalQuestions={bookmarkedQuestions.length}
              showSolution={showAnswers}
              isBookmarked={true}
              onToggleBookmark={() => handleRemoveBookmark(q.id)}
            />
          ))}
        </View>
      ) : (
        /* Empty State */
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIconCircle,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="bookmark-outline" size={36} color={colors.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'कोई बुकमार्क नहीं' : 'No Bookmarks Yet'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {t.noBookmarksMsg}
          </Text>
        </View>
      )}

      <View style={{ height: 36 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerBox: {
    marginTop: 14,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: '800',
  },
  toggleAnswerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    gap: 5,
  },
  toggleAnswerText: {
    fontSize: 11,
    fontWeight: '700',
  },
  listContainer: {
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
});
