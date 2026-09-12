import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { Question } from '../types';
import { StorageService } from '../storage/storageService';
import { DataService } from '../services/dataService';
import { QuestionCard } from '../components/QuestionCard';

type BookmarkTab = 'saved' | 'mistakes';

export const BookmarksScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState<BookmarkTab>('saved');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [mistakeQuestions, setMistakeQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [savedIds, mistakeIds, allQuestions] = await Promise.all([
      StorageService.getBookmarks(),
      StorageService.getMistakes(),
      DataService.getQuestions(),
    ]);

    const savedList = allQuestions.filter((q) => savedIds.includes(q.id));
    const mistakeList = allQuestions.filter((q) => mistakeIds.includes(q.id));

    setBookmarkedQuestions(savedList);
    setMistakeQuestions(mistakeList);
  };

  const handleRemoveBookmark = async (qId: string) => {
    await StorageService.toggleBookmark(qId);
    setBookmarkedQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  const handleResolveMistake = async (qId: string) => {
    await StorageService.removeMistake(qId);
    setMistakeQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  const handleClearAllMistakes = () => {
    Alert.alert(
      language === 'hi' ? 'गलत प्रश्नों की सूची साफ करें?' : 'Clear all mistakes?',
      language === 'hi'
        ? 'क्या आप सभी गलत प्रश्नों को हटाना चाहते हैं?'
        : 'Are you sure you want to clear your mistake notebook?',
      [
        { text: language === 'hi' ? 'रद्द करें' : 'Cancel', style: 'cancel' },
        {
          text: language === 'hi' ? 'साफ करें' : 'Clear',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearAllMistakes();
            setMistakeQuestions([]);
          },
        },
      ]
    );
  };

  const currentQuestions = activeTab === 'saved' ? bookmarkedQuestions : mistakeQuestions;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {activeTab === 'saved' ? t.bookmarksTitle : (t.tabMistakes || 'गलत प्रश्न')}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {activeTab === 'saved'
            ? (language === 'hi'
                ? 'कठिन एवं महत्वपूर्ण प्रश्न जिन्हें आपने पुनरावलोकन हेतु सहेजा है'
                : 'Questions flagged during mock tests for focused revision')
            : (language === 'hi'
                ? 'क्विज़ में गलत हुए प्रश्न - इन्हें दोबारा हल करके अपनी कमजोरी दूर करें'
                : 'Questions answered incorrectly in quizzes - practice to master weak points')}
        </Text>
      </View>

      {/* Segmented Control Pill */}
      <View style={[styles.segmentContainer, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.segmentBtn,
            activeTab === 'saved' && [styles.segmentBtnActive, { backgroundColor: colors.card, borderColor: colors.border }],
          ]}
          onPress={() => setActiveTab('saved')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="bookmark"
            size={14}
            color={activeTab === 'saved' ? '#F5A623' : colors.textSecondary}
          />
          <Text
            style={[
              styles.segmentBtnText,
              { color: activeTab === 'saved' ? colors.textPrimary : colors.textSecondary },
              activeTab === 'saved' && styles.segmentBtnTextActive,
            ]}
          >
            {t.tabSaved || 'सहेजे गए'} ({bookmarkedQuestions.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentBtn,
            activeTab === 'mistakes' && [styles.segmentBtnActive, { backgroundColor: colors.card, borderColor: colors.border }],
          ]}
          onPress={() => setActiveTab('mistakes')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="close-circle"
            size={14}
            color={activeTab === 'mistakes' ? '#EF4444' : colors.textSecondary}
          />
          <Text
            style={[
              styles.segmentBtnText,
              { color: activeTab === 'mistakes' ? colors.textPrimary : colors.textSecondary },
              activeTab === 'mistakes' && styles.segmentBtnTextActive,
            ]}
          >
            {t.tabMistakes || 'गलत प्रश्न'} ({mistakeQuestions.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar */}
      {currentQuestions.length > 0 && (
        <View style={styles.actionBar}>
          <Text style={[styles.countText, { color: activeTab === 'saved' ? colors.accent : '#EF4444' }]}>
            {currentQuestions.length} {t.questions}
          </Text>

          <View style={styles.actionRightRow}>
            {activeTab === 'mistakes' && (
              <TouchableOpacity
                style={[styles.clearBtn, { borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : '#FCA5A5' }]}
                onPress={handleClearAllMistakes}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={13} color="#EF4444" />
                <Text style={styles.clearBtnText}>{t.clearMistakes || 'साफ करें'}</Text>
              </TouchableOpacity>
            )}

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
                size={14}
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
        </View>
      )}

      {/* Questions List */}
      {currentQuestions.length > 0 ? (
        <View style={styles.listContainer}>
          {currentQuestions.map((q, idx) => (
            <View key={q.id} style={styles.cardWrapper}>
              <QuestionCard
                question={q}
                questionNumber={idx + 1}
                totalQuestions={currentQuestions.length}
                selectedOption={selectedOptions[q.id] || null}
                onSelectOption={(opt) =>
                  setSelectedOptions((prev) => ({ ...prev, [q.id]: opt }))
                }
                showSolution={showAnswers}
                isBookmarked={bookmarkedQuestions.some((b) => b.id === q.id)}
                onToggleBookmark={() => handleRemoveBookmark(q.id)}
              />

              {activeTab === 'mistakes' && (
                <View style={[styles.mistakeActionRow, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                  <View style={styles.mistakeTip}>
                    <Ionicons name="alert-circle-outline" size={14} color="#EF4444" />
                    <Text style={[styles.mistakeTipText, { color: colors.textSecondary }]}>
                      {language === 'hi' ? 'क्विज़ में गलत उत्तर दिया गया' : 'Answered incorrectly in quiz'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.markSolvedBtn}
                    onPress={() => handleResolveMistake(q.id)}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                    <Text style={styles.markSolvedText}>
                      {t.markSolved || 'हल किया (हटाएं)'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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
            <Ionicons
              name={activeTab === 'saved' ? 'bookmark-outline' : 'checkmark-done-circle-outline'}
              size={36}
              color={activeTab === 'saved' ? colors.textMuted : '#10B981'}
            />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            {activeTab === 'saved'
              ? (language === 'hi' ? 'कोई बुकमार्क नहीं' : 'No Bookmarks Yet')
              : (language === 'hi' ? 'कोई गलत प्रश्न नहीं!' : 'No Mistakes!')}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {activeTab === 'saved' ? t.noBookmarksMsg : (t.noMistakesMsg || 'शानदार! आपके पास कोई गलत प्रश्न लंबित नहीं है।')}
          </Text>
        </View>
      )}

      <View style={{ height: 40 }} />
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
    marginBottom: 8,
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
  segmentContainer: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 10,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 9,
    gap: 6,
  },
  segmentBtnActive: {
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  segmentBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  segmentBtnTextActive: {
    fontWeight: '800',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  actionRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countText: {
    fontSize: 13,
    fontWeight: '800',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    gap: 4,
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
  toggleAnswerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
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
  cardWrapper: {
    marginBottom: 12,
  },
  mistakeActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    marginTop: -8,
  },
  mistakeTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  mistakeTipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  markSolvedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  markSolvedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46',
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
