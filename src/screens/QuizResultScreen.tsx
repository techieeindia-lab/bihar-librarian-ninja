import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserQuizAttempt, Question } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { QuestionCard } from '../components/QuestionCard';
import { StorageService } from '../storage/storageService';

interface QuizResultScreenProps {
  attempt: UserQuizAttempt;
  questions: Question[];
  onReattempt: () => void;
  onBackToQuizzes: () => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({
  attempt,
  questions,
  onReattempt,
  onBackToQuizzes,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const isHighScorer = percentage >= 70;
  const isAverage = percentage >= 40 && percentage < 70;

  const handleToggleBookmark = async (qId: string) => {
    const isSaved = await StorageService.toggleBookmark(qId);
    setBookmarkedMap((prev) => ({
      ...prev,
      [qId]: isSaved,
    }));
  };

  const handleShareOnWhatsApp = async () => {
    try {
      const msg = t.shareMsgTemplate
        .replace('{score}', String(attempt.score))
        .replace('{total}', String(attempt.totalQuestions));

      await Share.share({
        message: msg,
        title: t.shareScoreTitle,
      });
    } catch (e) {}
  };

  const handleRateApp = () => {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.biharlibrarian.examninja';
    const marketUrl = 'market://details?id=com.biharlibrarian.examninja';

    Linking.canOpenURL(marketUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(marketUrl);
        } else {
          Linking.openURL(playStoreUrl);
        }
      })
      .catch(() => {
        Linking.openURL(playStoreUrl);
      });
  };

  const filteredQuestions = questions.filter((q) => {
    const userAns = attempt.userAnswers[q.id];
    if (filter === 'all') return true;
    if (filter === 'incorrect') return userAns && userAns !== q.correctAnswer;
    if (filter === 'correct') return userAns === q.correctAnswer;
    return true;
  });

  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Scorecard Hero Card */}
      <View style={[styles.heroOuter, { borderColor: isDark ? '#333' : '#E4E4E7' }]}>
        <LinearGradient
          colors={
            isHighScorer
              ? isDark
                ? ['#064E3B', '#022C22', '#011510']
                : ['#059669', '#10B981', '#34D399']
              : isAverage
              ? isDark
                ? ['#451A03', '#270F02', '#140601']
                : ['#D97706', '#F59E0B', '#FBBF24']
              : isDark
              ? ['#4C0519', '#2E030F', '#1A0108']
              : ['#E11D48', '#F43F5E', '#FB7185']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <Ionicons
            name={isHighScorer ? 'trophy' : isAverage ? 'ribbon-outline' : 'sparkles'}
            size={46}
            color="#FFFFFF"
          />

          <Text style={styles.heroStatusText}>
            {isHighScorer ? t.congratulations : isAverage ? t.goodJob : t.needImprovement}
          </Text>

          <Text style={styles.quizTitleText} numberOfLines={1}>
            {attempt.quizTitle}
          </Text>

          {/* Score & Percentage */}
          <View style={styles.scoreRow}>
            <Text style={styles.scoreBigText}>{attempt.score}</Text>
            <Text style={styles.scoreSubText}>
              / {attempt.totalQuestions} ({percentage}%)
            </Text>
          </View>

          {/* XP & Stats Chips */}
          <View style={styles.chipsRow}>
            <View style={styles.xpBadge}>
              <Ionicons name="flash" size={13} color="#FEF08A" />
              <Text style={styles.xpText}>+{attempt.xpEarned} XP</Text>
            </View>
            <View style={styles.metaBadge}>
              <Ionicons name="timer-outline" size={13} color="#FFFFFF" />
              <Text style={styles.metaBadgeText}>
                {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
              </Text>
            </View>
            <View style={styles.metaBadge}>
              <Ionicons name="checkmark-circle" size={13} color="#A7F3D0" />
              <Text style={styles.metaBadgeText}>{attempt.correctCount} {t.correctAnswers}</Text>
            </View>
          </View>

          {/* VIRAL SHARE & RATING BUTTONS */}
          <View style={styles.shareRow}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShareOnWhatsApp}
              activeOpacity={0.85}
            >
              <Ionicons name="logo-whatsapp" size={17} color="#166534" />
              <Text style={styles.shareBtnText}>{t.shareScoreBtn}</Text>
            </TouchableOpacity>

            {isHighScorer && (
              <TouchableOpacity
                style={styles.rateBtn}
                onPress={handleRateApp}
                activeOpacity={0.85}
              >
                <Ionicons name="star" size={15} color="#B45309" />
                <Text style={styles.rateBtnText}>
                  {language === 'hi' ? '5★ रेटिंग दें' : 'Rate 5★'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtnSec, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={onBackToQuizzes}
          activeOpacity={0.7}
        >
          <Ionicons name="grid-outline" size={15} color={colors.textPrimary} />
          <Text style={[styles.actionBtnSecText, { color: colors.textPrimary }]}>
            {t.backToQuizzes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtnPrim, { backgroundColor: colors.primary }]}
          onPress={onReattempt}
          activeOpacity={0.85}
        >
          <Ionicons name="refresh" size={15} color={colors.textOnPrimary} />
          <Text style={[styles.actionBtnPrimText, { color: colors.textOnPrimary }]}>
            {t.reattemptQuiz}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Detailed Review Section */}
      <View style={styles.reviewHeader}>
        <Text style={[styles.reviewTitle, { color: colors.textPrimary }]}>
          {t.detailedReview}
        </Text>

        {/* Filter Pills */}
        <View style={styles.filterPills}>
          <TouchableOpacity
            style={[
              styles.pill,
              filter === 'all' && { backgroundColor: colors.primary },
              { borderColor: colors.border },
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.pillText,
                { color: filter === 'all' ? colors.textOnPrimary : colors.textSecondary },
              ]}
            >
              {t.filterAll} ({questions.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pill,
              filter === 'incorrect' && { backgroundColor: '#EF4444' },
              { borderColor: colors.border },
            ]}
            onPress={() => setFilter('incorrect')}
          >
            <Text
              style={[
                styles.pillText,
                { color: filter === 'incorrect' ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {t.filterIncorrect} ({attempt.wrongCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pill,
              filter === 'correct' && { backgroundColor: '#10B981' },
              { borderColor: colors.border },
            ]}
            onPress={() => setFilter('correct')}
          >
            <Text
              style={[
                styles.pillText,
                { color: filter === 'correct' ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {t.filterCorrect} ({attempt.correctCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Review Questions List */}
      <View style={styles.reviewList}>
        {filteredQuestions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            selectedOption={attempt.userAnswers[q.id]}
            showSolution={true}
            isBookmarked={bookmarkedMap[q.id] || false}
            onToggleBookmark={() => handleToggleBookmark(q.id)}
          />
        ))}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroOuter: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    marginTop: 14,
    elevation: 3,
  },
  heroGradient: {
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroStatusText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: -0.3,
  },
  quizTitleText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 3,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  scoreBigText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  scoreSubText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    alignItems: 'center',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  xpText: {
    color: '#FEF08A',
    fontSize: 12,
    fontWeight: '900',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  metaBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 22,
    gap: 6,
    elevation: 2,
  },
  shareBtnText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '900',
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 22,
    gap: 5,
    elevation: 2,
  },
  rateBtnText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionBtnSec: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  actionBtnSecText: {
    fontSize: 13,
    fontWeight: '700',
  },
  actionBtnPrim: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  actionBtnPrimText: {
    fontSize: 13,
    fontWeight: '800',
  },
  reviewHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  filterPills: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  reviewList: {
    gap: 12,
    marginTop: 10,
  },
});
