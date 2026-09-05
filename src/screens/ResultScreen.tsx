import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserTestAttempt, Question } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { QuestionCard } from '../components/QuestionCard';
import { StorageService } from '../storage/storageService';

interface ResultScreenProps {
  attempt: UserTestAttempt;
  questions: Question[];
  onReattempt: () => void;
  onBackToTests: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  attempt,
  questions,
  onReattempt,
  onBackToTests,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct' | 'skipped'>('all');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  const percentage = Math.round((attempt.correctCount / attempt.totalQuestions) * 100);
  const isPassed = percentage >= 45;

  const handleToggleBookmark = async (qId: string) => {
    const isSaved = await StorageService.toggleBookmark(qId);
    setBookmarkedMap((prev) => ({
      ...prev,
      [qId]: isSaved,
    }));
  };

  const filteredQuestions = questions.filter((q) => {
    const userAns = attempt.userAnswers[q.id];
    if (filter === 'all') return true;
    if (filter === 'incorrect') return userAns && userAns !== q.correctAnswer;
    if (filter === 'correct') return userAns === q.correctAnswer;
    if (filter === 'skipped') return !userAns;
    return true;
  });

  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Scorecard Hero Header */}
      <View
        style={[
          styles.scoreHero,
          {
            backgroundColor: isPassed
              ? isDark
                ? '#064E3B'
                : '#059669'
              : isDark
              ? '#7F1D1D'
              : '#DC2626',
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name={isPassed ? 'ribbon-outline' : 'alert-circle-outline'}
          size={44}
          color="#FFFFFF"
        />
        <Text style={styles.heroStatusText}>
          {isPassed ? t.congratulations : t.needImprovement}
        </Text>
        <Text style={styles.testTitleText}>{attempt.testTitle}</Text>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreBigText}>{attempt.score}</Text>
          <Text style={styles.scoreSubText}>
            / {attempt.totalQuestions} ({percentage}%)
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.heroBtnRow}>
          <TouchableOpacity
            style={styles.heroBtnSecondary}
            onPress={onBackToTests}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={15} color="#FFFFFF" />
            <Text style={styles.heroBtnSecondaryText}>{t.backToTests}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtnPrimary}
            onPress={onReattempt}
            activeOpacity={0.85}
          >
            <Ionicons name="refresh" size={15} color="#000000" />
            <Text style={styles.heroBtnPrimaryText}>{t.reattemptTest}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Breakdown Grid */}
      <View style={styles.breakdownGrid}>
        <View
          style={[
            styles.breakdownCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: '#10B981',
            },
          ]}
        >
          <Text style={[styles.breakdownNum, { color: '#10B981' }]}>
            {attempt.correctCount}
          </Text>
          <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
            {t.correctAnswers}
          </Text>
        </View>

        <View
          style={[
            styles.breakdownCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: '#EF4444',
            },
          ]}
        >
          <Text style={[styles.breakdownNum, { color: '#EF4444' }]}>
            {attempt.wrongCount}
          </Text>
          <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
            {t.wrongAnswers}
          </Text>
        </View>

        <View
          style={[
            styles.breakdownCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: '#F59E0B',
            },
          ]}
        >
          <Text style={[styles.breakdownNum, { color: '#F59E0B' }]}>
            {attempt.skippedCount}
          </Text>
          <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
            {t.skippedAnswers}
          </Text>
        </View>

        <View
          style={[
            styles.breakdownCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: colors.accent,
            },
          ]}
        >
          <Text style={[styles.breakdownNum, { color: colors.accent }]}>
            {minutes}m {seconds}s
          </Text>
          <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>
            {t.timeSpent}
          </Text>
        </View>
      </View>

      {/* Detailed Solutions Section */}
      <View style={styles.solutionsHeader}>
        <Text style={[styles.solutionsTitle, { color: colors.textPrimary }]}>
          {t.detailedSolutions}
        </Text>
        <Text style={[styles.solutionsCount, { color: colors.textMuted }]}>
          ({filteredQuestions.length} {t.questions})
        </Text>
      </View>

      {/* Filter Tabs (Vercel Pills) */}
      <View style={styles.filterRow}>
        {(['all', 'incorrect', 'correct', 'skipped'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  filter === f ? colors.primary : colors.card,
                borderColor: filter === f ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setFilter(f)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterBtnText,
                {
                  color:
                    filter === f ? colors.textOnPrimary : colors.textSecondary,
                  fontWeight: filter === f ? '800' : '600',
                },
              ]}
            >
              {f === 'all'
                ? t.filterAll
                : f === 'incorrect'
                ? t.filterIncorrect
                : f === 'correct'
                ? t.filterCorrect
                : t.filterSkipped}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Questions with Solutions */}
      <View style={styles.solutionList}>
        {filteredQuestions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            totalQuestions={filteredQuestions.length}
            selectedOption={attempt.userAnswers[q.id]}
            showSolution={true}
            isBookmarked={!!bookmarkedMap[q.id]}
            onToggleBookmark={() => handleToggleBookmark(q.id)}
          />
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scoreHero: {
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginTop: 14,
    elevation: 3,
    borderWidth: 1,
  },
  heroStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: -0.3,
  },
  testTitleText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 14,
  },
  scoreBigText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  scoreSubText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '700',
    marginLeft: 6,
  },
  heroBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  heroBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 6,
  },
  heroBtnSecondaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  heroBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 6,
    elevation: 2,
  },
  heroBtnPrimaryText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  breakdownCard: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  breakdownNum: {
    fontSize: 16,
    fontWeight: '900',
  },
  breakdownLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  solutionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    gap: 6,
  },
  solutionsTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  solutionsCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  filterBtnText: {
    fontSize: 11,
  },
  solutionList: {
    marginTop: 4,
  },
});
