import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Quiz, Question, UserQuizAttempt } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, difficultyColorMap, categoryColorMap } from '../theme';
import { StorageService } from '../storage/storageService';

interface QuizActiveScreenProps {
  quiz: Quiz;
  questions: Question[];
  onFinishQuiz: (attempt: UserQuizAttempt) => void;
  onExitQuiz: () => void;
}

const categoryLabelMap: Record<string, { hi: string; en: string }> = {
  lis_foundations: { hi: 'यूनिट 1: आधार', en: 'Unit 1: Foundations' },
  classification_cataloguing: { hi: 'यूनिट 2: वर्गीकरण', en: 'Unit 2: Classification' },
  reference_sources: { hi: 'यूनिट 3: संदर्भ', en: 'Unit 3: Reference' },
  management: { hi: 'यूनिट 4: प्रबंधन', en: 'Unit 4: Management' },
  automation_ict: { hi: 'यूनिट 5: स्वचालन व ICT', en: 'Unit 5: Automation & ICT' },
  bihar_gk: { hi: 'बिहार सामान्य ज्ञान', en: 'Bihar GK' },
  teaching_aptitude: { hi: 'शिक्षण अभिरुचि', en: 'Teaching Aptitude' },
};

export const QuizActiveScreen: React.FC<QuizActiveScreenProps> = ({
  quiz,
  questions,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const scrollViewRef = useRef<ScrollView>(null);
  const startTimeRef = useRef<number>(Date.now());
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Question navigation and answer tracking
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Display & Mode preferences
  const [instantMode, setInstantMode] = useState<boolean>(true);
  const [isBilingual, setIsBilingual] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);

  // Modals
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showPaletteModal, setShowPaletteModal] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Live Timer setup
  const totalDurationSeconds = (quiz.durationMinutes ? quiz.durationMinutes * 60 : questions.length * 60);
  const [timeLeft, setTimeLeft] = useState<number>(totalDurationSeconds);

  // Pre-load saved bookmarks on mount
  useEffect(() => {
    StorageService.getBookmarks().then((savedIds) => {
      const map: Record<string, boolean> = {};
      savedIds.forEach((id) => {
        map[id] = true;
      });
      setBookmarkedMap(map);
    });
  }, []);

  // Hardware Back button handler on Android
  useEffect(() => {
    const onBackPress = () => {
      setShowExitModal(true);
      return true;
    };
    const backSub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backSub.remove();
  }, []);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, userAnswers]);

  // Smooth progress bar animation
  useEffect(() => {
    const targetPercent = questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

    Animated.timing(progressAnim, {
      toValue: targetPercent,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, questions.length]);

  const currentQuestion = questions[currentIndex] || questions[0];
  const selectedOption = userAnswers[currentQuestion?.id] || null;
  const isAnswered = selectedOption !== null;
  const isMarked = !!markedForReview[currentQuestion?.id];

  // Option selection logic
  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (instantMode && isAnswered) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: opt,
    }));

    if (instantMode) {
      if (opt === currentQuestion.correctAnswer) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }
      // Auto-scroll to show the explanation cleanly
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  };

  const handleClearResponse = () => {
    if (instantMode && isAnswered) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleBookmark = async () => {
    const isSaved = await StorageService.toggleBookmark(currentQuestion.id);
    setBookmarkedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: isSaved,
    }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    } else {
      setShowSubmitModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
      setShowPaletteModal(false);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const finishQuiz = async () => {
    setShowSubmitModal(false);
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    let correctCount = 0;
    let wrongCount = 0;

    const correctAnswersMap: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    questions.forEach((q) => {
      correctAnswersMap[q.id] = q.correctAnswer;
      const ans = userAnswers[q.id];
      if (ans === q.correctAnswer) {
        correctCount += 1;
      } else if (ans) {
        wrongCount += 1;
      }
    });

    const xpEarned = correctCount * 10 + (correctCount === questions.length ? 20 : 0);

    const attempt: UserQuizAttempt = {
      id: `quiz_att_${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title[language],
      date: new Date().toISOString(),
      score: correctCount,
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      xpEarned,
      timeSpentSeconds,
      userAnswers,
    };

    await StorageService.saveQuizAttempt(attempt);
    await StorageService.recordMistakesFromAttempt(userAnswers, correctAnswersMap);
    onFinishQuiz(attempt);
  };

  // Stats for palette and confirmation modal
  const answeredCount = Object.keys(userAnswers).filter((k) => userAnswers[k] !== null).length;
  const reviewCount = Object.keys(markedForReview).filter((k) => markedForReview[k]).length;
  const unattemptedCount = Math.max(0, questions.length - answeredCount);

  // Timer formatting
  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;
  const formattedTimer = `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
  const isTimeCritical = timeLeft < 60;

  // Metadata styling for current question
  const diffKey = currentQuestion?.difficulty || 'medium';
  const diffConfig = difficultyColorMap[diffKey];
  const catColor = categoryColorMap[currentQuestion?.category] || colors.accent;
  const catInfo = categoryLabelMap[currentQuestion?.category];

  return (
    <View style={[styles.container, { backgroundColor: colors.canvas }]}>
      {/* Top Header Bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: colors.canvasElevated,
            borderBottomColor: colors.border,
            paddingTop: insets.top > 0 ? 4 : 8,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setShowExitModal(true)}
          style={[styles.actionIconBtn, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={18} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.topCenter}>
          <Text style={[styles.topTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {quiz.title[language]}
          </Text>
          <View style={styles.topSubRow}>
            {/* Countdown Timer */}
            <View
              style={[
                styles.timerPill,
                {
                  backgroundColor: isTimeCritical
                    ? isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                  borderColor: isTimeCritical ? '#EF4444' : colors.border,
                },
              ]}
            >
              <Ionicons
                name="timer-outline"
                size={12}
                color={isTimeCritical ? '#EF4444' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.timerText,
                  { color: isTimeCritical ? '#EF4444' : colors.textPrimary },
                ]}
              >
                {formattedTimer}
              </Text>
            </View>

            <Text style={[styles.topProgress, { color: colors.textSecondary }]}>
              {t.questionProgress
                .replace('{current}', String(currentIndex + 1))
                .replace('{total}', String(questions.length))}
            </Text>
          </View>
        </View>

        <View style={styles.topRightActions}>
          {/* Question Palette Modal Trigger */}
          <TouchableOpacity
            style={[styles.paletteTriggerBtn, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
            onPress={() => setShowPaletteModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="grid-outline" size={14} color={colors.textPrimary} />
            <Text style={[styles.paletteTriggerText, { color: colors.textPrimary }]}>
              {answeredCount}/{questions.length}
            </Text>
          </TouchableOpacity>

          {/* Mode Toggle (Instant vs Speed) */}
          <TouchableOpacity
            style={[
              styles.modeToggleBtn,
              {
                backgroundColor: instantMode
                  ? isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5'
                  : colors.canvasSubtle,
                borderColor: instantMode ? '#10B981' : colors.border,
              },
            ]}
            onPress={() => setInstantMode(!instantMode)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={instantMode ? 'flash' : 'speedometer-outline'}
              size={13}
              color={instantMode ? '#10B981' : colors.textSecondary}
            />
            <Text
              style={[
                styles.modeToggleText,
                { color: instantMode ? '#10B981' : colors.textSecondary },
              ]}
            >
              {instantMode ? t.instantMode.split(' ')[0] : t.examMode.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Progress Line */}
      <View style={[styles.progressTrack, { backgroundColor: colors.canvasSubtle }]}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>

      {/* Main Question Scroll Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 130 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Question Meta Row */}
          <View style={styles.cardMetaRow}>
            <View style={styles.metaBadgeGroup}>
              <View style={[styles.qNumBadge, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                <Text style={[styles.qNumText, { color: colors.textPrimary }]}>
                  Q{currentIndex + 1}
                </Text>
              </View>

              {/* Difficulty Badge */}
              <View
                style={[
                  styles.diffBadge,
                  {
                    backgroundColor: isDark ? `${diffConfig.color}22` : `${diffConfig.color}15`,
                    borderColor: `${diffConfig.color}40`,
                  },
                ]}
              >
                <View style={[styles.diffDot, { backgroundColor: diffConfig.color }]} />
                <Text style={[styles.diffText, { color: diffConfig.color }]}>
                  {language === 'hi' ? diffConfig.labelHi : diffConfig.label}
                </Text>
              </View>

              {/* Category Pill */}
              {catInfo && (
                <View
                  style={[
                    styles.catPill,
                    {
                      backgroundColor: isDark ? `${catColor}20` : `${catColor}12`,
                      borderColor: `${catColor}44`,
                    },
                  ]}
                >
                  <Text style={[styles.catText, { color: catColor }]}>
                    {catInfo[language]}
                  </Text>
                </View>
              )}
            </View>

            {/* Language & Bookmark Actions */}
            <View style={styles.cardActionGroup}>
              {/* Bilingual View Toggle */}
              <TouchableOpacity
                onPress={() => setIsBilingual(!isBilingual)}
                style={[
                  styles.langSwitchBtn,
                  {
                    backgroundColor: isBilingual
                      ? isDark ? 'rgba(0, 112, 243, 0.2)' : '#EFF6FF'
                      : colors.canvasSubtle,
                    borderColor: isBilingual ? colors.primary : colors.border,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.langSwitchText,
                    { color: isBilingual ? colors.primary : colors.textSecondary },
                  ]}
                >
                  {isBilingual ? 'द्विभाषी (A/अ)' : 'एकल'}
                </Text>
              </TouchableOpacity>

              {/* Bookmark Toggle */}
              <TouchableOpacity
                onPress={handleToggleBookmark}
                style={[
                  styles.bookmarkBtn,
                  bookmarkedMap[currentQuestion?.id] && {
                    backgroundColor: isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
                    borderColor: colors.accent,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={bookmarkedMap[currentQuestion?.id] ? 'bookmark' : 'bookmark-outline'}
                  size={18}
                  color={bookmarkedMap[currentQuestion?.id] ? colors.accent : colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Question Text (Primary) */}
          <Text style={[styles.questionPrimary, { color: colors.textPrimary }]}>
            {currentQuestion?.question[language]}
          </Text>

          {/* Question Text (Secondary Translation) */}
          {isBilingual && (
            <Text style={[styles.questionSecondary, { color: colors.textMuted }]}>
              {language === 'hi' ? currentQuestion?.question.en : currentQuestion?.question.hi}
            </Text>
          )}

          {/* Mark for Review Pill in Header */}
          {isMarked && (
            <View style={[styles.markedIndicator, { backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : '#F3E8FF' }]}>
              <Ionicons name="flag" size={12} color="#8B5CF6" />
              <Text style={styles.markedIndicatorText}>{t.markedForReviewBadge}</Text>
            </View>
          )}
        </View>

        {/* Options List */}
        <View style={styles.optionsList}>
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const isSelected = selectedOption === key;
            const isCorrectAnswer = key === currentQuestion.correctAnswer;
            const showInstantFeedback = instantMode && isAnswered;

            let optBg = colors.card;
            let optBorder = colors.border;
            let optText = colors.textPrimary;
            let iconElement = null;

            if (showInstantFeedback) {
              if (isCorrectAnswer) {
                optBg = isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5';
                optBorder = '#10B981';
                optText = isDark ? '#A7F3D0' : '#065F46';
                iconElement = <Ionicons name="checkmark-circle" size={22} color="#10B981" />;
              } else if (isSelected && !isCorrectAnswer) {
                optBg = isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEF2F2';
                optBorder = '#EF4444';
                optText = isDark ? '#FCA5A5' : '#991B1B';
                iconElement = <Ionicons name="close-circle" size={22} color="#EF4444" />;
              }
            } else if (isSelected) {
              optBg = isDark ? 'rgba(0, 112, 243, 0.2)' : '#EFF6FF';
              optBorder = colors.primary;
              optText = colors.primary;
              iconElement = <Ionicons name="checkmark-circle" size={22} color={colors.primary} />;
            }

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionTile,
                  {
                    backgroundColor: optBg,
                    borderColor: optBorder,
                  },
                ]}
                onPress={() => handleSelectOption(key)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.optKeyBadge,
                    {
                      backgroundColor: isSelected || (showInstantFeedback && isCorrectAnswer)
                        ? optBorder
                        : colors.canvasSubtle,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optKeyText,
                      {
                        color: isSelected || (showInstantFeedback && isCorrectAnswer)
                          ? '#FFFFFF'
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {key}
                  </Text>
                </View>

                <View style={styles.optTextContainer}>
                  <Text style={[styles.optTextPrimary, { color: optText }]}>
                    {currentQuestion.options[key][language]}
                  </Text>
                  {isBilingual && (
                    <Text style={[styles.optTextSecondary, { color: colors.textMuted }]}>
                      {language === 'hi' ? currentQuestion.options[key].en : currentQuestion.options[key].hi}
                    </Text>
                  )}
                </View>

                {iconElement}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Clear Response Button (Speed Mode) */}
        {!instantMode && isAnswered && (
          <TouchableOpacity
            style={[styles.clearBtn, { borderColor: colors.border }]}
            onPress={handleClearResponse}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={13} color={colors.textSecondary} />
            <Text style={[styles.clearBtnText, { color: colors.textSecondary }]}>
              {t.clearResponse}
            </Text>
          </TouchableOpacity>
        )}

        {/* Instant Explanation Box */}
        {instantMode && isAnswered && (
          <View
            style={[
              styles.explanationBox,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8FAFC',
                borderColor: selectedOption === currentQuestion.correctAnswer
                  ? isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0'
                  : isDark ? 'rgba(245, 158, 11, 0.3)' : '#FDE68A',
              },
            ]}
          >
            <View style={styles.explanationHeader}>
              <Ionicons
                name={selectedOption === currentQuestion.correctAnswer ? 'checkmark-circle' : 'bulb'}
                size={18}
                color={selectedOption === currentQuestion.correctAnswer ? '#10B981' : '#F59E0B'}
              />
              <Text
                style={[
                  styles.explanationTitle,
                  {
                    color: selectedOption === currentQuestion.correctAnswer ? '#10B981' : '#F59E0B',
                  },
                ]}
              >
                {selectedOption === currentQuestion.correctAnswer ? t.correctFeedback : t.wrongFeedback}
              </Text>

              {/* Streak Badge */}
              {streak >= 2 && selectedOption === currentQuestion.correctAnswer && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakText}>
                    {t.streakCount.replace('{count}', String(streak))}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.explanationText, { color: colors.textPrimary }]}>
              {currentQuestion.explanation[language]}
            </Text>

            {isBilingual && currentQuestion.explanation.en && currentQuestion.explanation.hi && (
              <Text style={[styles.explanationSecondary, { color: colors.textMuted }]}>
                {language === 'hi' ? currentQuestion.explanation.en : currentQuestion.explanation.hi}
              </Text>
            )}

            {currentQuestion.sourceExam && (
              <View style={[styles.sourceBadge, { backgroundColor: colors.canvasSubtle }]}>
                <Ionicons name="school-outline" size={12} color={colors.textSecondary} />
                <Text style={[styles.sourceText, { color: colors.textSecondary }]}>
                  {currentQuestion.sourceExam}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Ergonomic Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.canvasElevated,
            borderTopColor: colors.border,
            paddingBottom: Math.max(12, insets.bottom),
          },
        ]}
      >
        {/* Previous Button */}
        <TouchableOpacity
          style={[
            styles.navBtnPrev,
            {
              backgroundColor: colors.canvasSubtle,
              borderColor: colors.border,
              opacity: currentIndex === 0 ? 0.4 : 1,
            },
          ]}
          disabled={currentIndex === 0}
          onPress={handlePrev}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
          <Text style={[styles.navBtnText, { color: colors.textPrimary }]}>{t.prevQuestion}</Text>
        </TouchableOpacity>

        {/* Mark for Review Button */}
        <TouchableOpacity
          style={[
            styles.markReviewBtn,
            {
              backgroundColor: isMarked
                ? isDark ? 'rgba(139, 92, 246, 0.25)' : '#F3E8FF'
                : colors.canvasSubtle,
              borderColor: isMarked ? '#8B5CF6' : colors.border,
            },
          ]}
          onPress={handleToggleReview}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isMarked ? 'flag' : 'flag-outline'}
            size={16}
            color={isMarked ? '#8B5CF6' : colors.textSecondary}
          />
          <Text
            style={[
              styles.markReviewText,
              { color: isMarked ? '#8B5CF6' : colors.textSecondary },
            ]}
          >
            {isMarked ? t.markedForReviewBadge : t.markForReview}
          </Text>
        </TouchableOpacity>

        {/* Next / Finish Button */}
        <TouchableOpacity
          style={[
            styles.navBtnNext,
            {
              backgroundColor: currentIndex === questions.length - 1 ? '#10B981' : colors.primary,
            },
          ]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={[styles.navBtnNextText, { color: colors.textOnPrimary }]}>
            {currentIndex === questions.length - 1 ? t.finishQuiz : t.nextQuestion}
          </Text>
          <Ionicons
            name={currentIndex === questions.length - 1 ? 'checkmark' : 'chevron-forward'}
            size={18}
            color={colors.textOnPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Question Palette Modal */}
      <Modal visible={showPaletteModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.paletteCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                paddingBottom: Math.max(20, insets.bottom),
              },
            ]}
          >
            <View style={styles.paletteHeader}>
              <View>
                <Text style={[styles.paletteTitle, { color: colors.textPrimary }]}>
                  {t.questionPalette}
                </Text>
                <Text style={[styles.paletteSubtitle, { color: colors.textSecondary }]}>
                  {t.paletteSummary
                    .replace('{answered}', String(answeredCount))
                    .replace('{unanswered}', String(unattemptedCount))
                    .replace('{review}', String(reviewCount))}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowPaletteModal(false)}
                style={[styles.paletteCloseBtn, { backgroundColor: colors.canvasSubtle }]}
              >
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Legend Row */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>{t.answeredCount}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>{t.reviewCount}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.canvasSubtle, borderColor: colors.border, borderWidth: 1 }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>{t.unattemptedCount}</Text>
              </View>
            </View>

            {/* Grid of Question Chips */}
            <ScrollView style={styles.paletteGridScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.paletteGrid}>
                {questions.map((q, idx) => {
                  const qAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null;
                  const qReviewed = !!markedForReview[q.id];
                  const isCurrent = idx === currentIndex;

                  let chipBg = colors.canvasSubtle;
                  let chipBorder = colors.border;
                  let chipTextColor = colors.textPrimary;

                  if (qReviewed) {
                    chipBg = isDark ? 'rgba(139, 92, 246, 0.3)' : '#EDE9FE';
                    chipBorder = '#8B5CF6';
                    chipTextColor = '#8B5CF6';
                  } else if (qAnswered) {
                    chipBg = isDark ? 'rgba(16, 185, 129, 0.3)' : '#D1FAE5';
                    chipBorder = '#10B981';
                    chipTextColor = '#059669';
                  }

                  return (
                    <TouchableOpacity
                      key={q.id}
                      style={[
                        styles.paletteChip,
                        {
                          backgroundColor: chipBg,
                          borderColor: isCurrent ? colors.primary : chipBorder,
                          borderWidth: isCurrent ? 2 : 1,
                        },
                      ]}
                      onPress={() => handleJumpToQuestion(idx)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.paletteChipText, { color: chipTextColor }]}>
                        {idx + 1}
                      </Text>
                      {qReviewed && (
                        <View style={styles.chipFlagIcon}>
                          <Ionicons name="flag" size={8} color="#8B5CF6" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Submit directly from Palette */}
            <TouchableOpacity
              style={[styles.paletteSubmitBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                setShowPaletteModal(false);
                setShowSubmitModal(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={[styles.paletteSubmitText, { color: colors.textOnPrimary }]}>
                {t.confirmSubmit} ({answeredCount}/{questions.length})
              </Text>
              <Ionicons name="checkmark-circle" size={18} color={colors.textOnPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Pre-Submission Confirmation Dialog */}
      <Modal visible={showSubmitModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.modalIconWrap, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5' }]}>
              <Ionicons name="clipboard-outline" size={32} color="#10B981" />
            </View>

            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {t.submitModalTitle}
            </Text>
            <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
              {t.submitModalDesc}
            </Text>

            {/* Stats Breakdown Card */}
            <View style={[styles.submitStatsCard, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
              <View style={styles.submitStatCol}>
                <Text style={[styles.submitStatVal, { color: '#10B981' }]}>{answeredCount}</Text>
                <Text style={[styles.submitStatLabel, { color: colors.textSecondary }]}>{t.answeredCount}</Text>
              </View>
              <View style={[styles.submitStatDivider, { backgroundColor: colors.border }]} />
              <View style={styles.submitStatCol}>
                <Text style={[styles.submitStatVal, { color: unattemptedCount > 0 ? '#EF4444' : colors.textPrimary }]}>
                  {unattemptedCount}
                </Text>
                <Text style={[styles.submitStatLabel, { color: colors.textSecondary }]}>{t.unattemptedCount}</Text>
              </View>
              <View style={[styles.submitStatDivider, { backgroundColor: colors.border }]} />
              <View style={styles.submitStatCol}>
                <Text style={[styles.submitStatVal, { color: '#8B5CF6' }]}>{reviewCount}</Text>
                <Text style={[styles.submitStatLabel, { color: colors.textSecondary }]}>{t.reviewCount}</Text>
              </View>
            </View>

            {unattemptedCount > 0 && (
              <View style={styles.warningBox}>
                <Ionicons name="warning-outline" size={14} color="#F59E0B" />
                <Text style={styles.warningText}>
                  {t.unattemptedWarning.replace('{count}', String(unattemptedCount))}
                </Text>
              </View>
            )}

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalBtnSec, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
                onPress={() => setShowSubmitModal(false)}
              >
                <Text style={[styles.modalBtnSecText, { color: colors.textPrimary }]}>
                  {t.reviewAnswers}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnPrim, { backgroundColor: '#10B981' }]}
                onPress={finishQuiz}
              >
                <Text style={styles.modalBtnPrimText}>{t.confirmSubmit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Exit Confirmation Modal */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="alert-circle-outline" size={38} color="#EF4444" />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {t.exitQuizConfirm}
            </Text>
            <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
              {t.exitQuizMsg}
            </Text>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalBtnSec, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
                onPress={() => setShowExitModal(false)}
              >
                <Text style={[styles.modalBtnSecText, { color: colors.textPrimary }]}>
                  {t.stayInQuiz}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnPrim, { backgroundColor: '#EF4444' }]}
                onPress={() => {
                  setShowExitModal(false);
                  onExitQuiz();
                }}
              >
                <Text style={styles.modalBtnPrimText}>{t.exitQuiz}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  actionIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCenter: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  topSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    gap: 3,
  },
  timerText: {
    fontSize: 11,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  topProgress: {
    fontSize: 11,
    fontWeight: '600',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paletteTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  paletteTriggerText: {
    fontSize: 11,
    fontWeight: '800',
  },
  modeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 3,
  },
  modeToggleText: {
    fontSize: 10,
    fontWeight: '800',
  },
  progressTrack: {
    height: 3.5,
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metaBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  qNumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  qNumText: {
    fontSize: 11,
    fontWeight: '800',
  },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  diffDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  diffText: {
    fontSize: 9,
    fontWeight: '800',
  },
  catPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  catText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langSwitchBtn: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  langSwitchText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bookmarkBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionPrimary: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  questionSecondary: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  markedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
    marginTop: 10,
  },
  markedIndicatorText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  optionsList: {
    gap: 10,
    marginBottom: 10,
  },
  optionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 12,
    gap: 10,
  },
  optKeyBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optKeyText: {
    fontSize: 12,
    fontWeight: '900',
  },
  optTextContainer: {
    flex: 1,
  },
  optTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  optTextSecondary: {
    fontSize: 11,
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
    marginBottom: 8,
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  explanationBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 6,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  streakText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 19,
  },
  explanationSecondary: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
    marginTop: 8,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  navBtnPrev: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  markReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  markReviewText: {
    fontSize: 11,
    fontWeight: '700',
  },
  navBtnNext: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 10,
    gap: 6,
  },
  navBtnNextText: {
    fontSize: 13,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 14,
  },
  submitStatsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  submitStatCol: {
    alignItems: 'center',
  },
  submitStatVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  submitStatLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  submitStatDivider: {
    width: 1,
    height: 24,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    width: '100%',
    marginBottom: 14,
  },
  warningText: {
    fontSize: 11,
    color: '#B45309',
    fontWeight: '600',
    flex: 1,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalBtnSec: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalBtnSecText: {
    fontSize: 13,
    fontWeight: '700',
  },
  modalBtnPrim: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBtnPrimText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  paletteCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '80%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  paletteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paletteTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  paletteSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  paletteCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginBottom: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  paletteGridScroll: {
    maxHeight: 260,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  paletteChip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  paletteChipText: {
    fontSize: 13,
    fontWeight: '800',
  },
  chipFlagIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  paletteSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 14,
  },
  paletteSubmitText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
