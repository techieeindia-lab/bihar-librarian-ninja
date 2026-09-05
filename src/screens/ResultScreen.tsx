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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Scorecard Hero Header */}
      <View
        style={[
          styles.scoreHero,
          isPassed ? styles.passedHero : styles.failedHero,
        ]}
      >
        <Ionicons
          name={isPassed ? 'ribbon' : 'alert-circle'}
          size={48}
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
            <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
            <Text style={styles.heroBtnSecondaryText}>{t.backToTests}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroBtnPrimary}
            onPress={onReattempt}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={16} color="#1E3A8A" />
            <Text style={styles.heroBtnPrimaryText}>{t.reattemptTest}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Breakdown Grid */}
      <View style={styles.breakdownGrid}>
        <View style={[styles.breakdownCard, { borderLeftColor: '#10B981' }]}>
          <Text style={[styles.breakdownNum, { color: '#10B981' }]}>
            {attempt.correctCount}
          </Text>
          <Text style={styles.breakdownLabel}>{t.correctAnswers}</Text>
        </View>

        <View style={[styles.breakdownCard, { borderLeftColor: '#EF4444' }]}>
          <Text style={[styles.breakdownNum, { color: '#EF4444' }]}>
            {attempt.wrongCount}
          </Text>
          <Text style={styles.breakdownLabel}>{t.wrongAnswers}</Text>
        </View>

        <View style={[styles.breakdownCard, { borderLeftColor: '#F59E0B' }]}>
          <Text style={[styles.breakdownNum, { color: '#F59E0B' }]}>
            {attempt.skippedCount}
          </Text>
          <Text style={styles.breakdownLabel}>{t.skippedAnswers}</Text>
        </View>

        <View style={[styles.breakdownCard, { borderLeftColor: '#3B82F6' }]}>
          <Text style={[styles.breakdownNum, { color: '#3B82F6' }]}>
            {minutes}m {seconds}s
          </Text>
          <Text style={styles.breakdownLabel}>{t.timeSpent}</Text>
        </View>
      </View>

      {/* Solutions Section Header & Filter Tabs */}
      <View style={styles.solutionSection}>
        <Text style={styles.solutionTitle}>{t.detailedSolutions}</Text>

        <View style={styles.filterTabsRow}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === 'all' && styles.activeFilterTabText,
              ]}
            >
              {t.filterAll} ({questions.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'incorrect' && styles.activeFilterTab,
            ]}
            onPress={() => setFilter('incorrect')}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === 'incorrect' && styles.activeFilterTabText,
              ]}
            >
              {t.filterIncorrect} ({attempt.wrongCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'correct' && styles.activeFilterTab,
            ]}
            onPress={() => setFilter('correct')}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === 'correct' && styles.activeFilterTabText,
              ]}
            >
              {t.filterCorrect} ({attempt.correctCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'skipped' && styles.activeFilterTab,
            ]}
            onPress={() => setFilter('skipped')}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === 'skipped' && styles.activeFilterTabText,
              ]}
            >
              {t.filterSkipped} ({attempt.skippedCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filtered Questions with Solutions */}
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
  scoreHero: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    elevation: 4,
  },
  passedHero: {
    backgroundColor: '#1E3A8A',
  },
  failedHero: {
    backgroundColor: '#991B1B',
  },
  heroStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
  },
  testTitleText: {
    fontSize: 13,
    color: '#E2E8F0',
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
  },
  scoreSubText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E2E8F0',
    marginLeft: 6,
  },
  heroBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
    width: '100%',
  },
  heroBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  heroBtnSecondaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  heroBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  heroBtnPrimaryText: {
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '800',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  breakdownCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
  },
  breakdownNum: {
    fontSize: 20,
    fontWeight: '900',
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  solutionSection: {
    marginTop: 24,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  activeFilterTab: {
    backgroundColor: '#1E3A8A',
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
});
