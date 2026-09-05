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
import { QUESTIONS } from '../data/questions';
import { Question } from '../types';
import { StorageService } from '../storage/storageService';
import { QuestionCard } from '../components/QuestionCard';

export const BookmarksScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const ids = await StorageService.getBookmarks();
    const list = QUESTIONS.filter((q) => ids.includes(q.id));
    setBookmarkedQuestions(list);
  };

  const handleRemoveBookmark = async (qId: string) => {
    await StorageService.toggleBookmark(qId);
    setBookmarkedQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.bookmarksTitle}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'कठिन एवं महत्वपूर्ण प्रश्न जिन्हें आपने पुनरावलोकन हेतु सहेजा है'
            : 'Questions flagged during mock tests for focused revision'}
        </Text>
      </View>

      {/* Action Bar */}
      {bookmarkedQuestions.length > 0 && (
        <View style={styles.actionBar}>
          <Text style={styles.countText}>
            {bookmarkedQuestions.length} {t.questions}
          </Text>

          <TouchableOpacity
            style={styles.toggleAnswerBtn}
            onPress={() => setShowAnswers(!showAnswers)}
          >
            <Ionicons
              name={showAnswers ? 'eye-off-outline' : 'eye-outline'}
              size={16}
              color="#1E3A8A"
            />
            <Text style={styles.toggleAnswerText}>
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
          <View style={styles.emptyIconCircle}>
            <Ionicons name="bookmark-outline" size={40} color="#94A3B8" />
          </View>
          <Text style={styles.emptyTitle}>
            {language === 'hi' ? 'कोई बुकमार्क नहीं' : 'No Bookmarks Yet'}
          </Text>
          <Text style={styles.emptySubtitle}>{t.noBookmarksMsg}</Text>
        </View>
      )}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
  },
  headerBox: {
    marginTop: 16,
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  toggleAnswerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
  },
  toggleAnswerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  listContainer: {
    marginTop: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
