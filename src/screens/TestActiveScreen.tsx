import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockTest, Question, UserTestAttempt } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { Timer } from '../components/Timer';
import { QuestionCard } from '../components/QuestionCard';
import { StorageService } from '../storage/storageService';

interface TestActiveScreenProps {
  test: MockTest;
  questions: Question[];
  onFinishTest: (attempt: UserTestAttempt) => void;
  onExitTest: () => void;
}

export const TestActiveScreen: React.FC<TestActiveScreenProps> = ({
  test,
  questions,
  onFinishTest,
  onExitTest,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [startTime] = useState<number>(Date.now());

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: prev[currentQuestion.id] === option ? null : option,
    }));
  };

  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleToggleBookmark = async () => {
    const isSaved = await StorageService.toggleBookmark(currentQuestion.id);
    setBookmarked((prev) => ({
      ...prev,
      [currentQuestion.id]: isSaved,
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: null,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateResultsAndFinish = async () => {
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        skippedCount += 1;
      } else if (ans === q.correctAnswer) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    });

    const marksPerQuestion = test.totalMarks / questions.length;
    const score = Math.round(correctCount * marksPerQuestion);

    const attempt: UserTestAttempt = {
      id: `attempt_${Date.now()}`,
      testId: test.id,
      testTitle: test.title[language],
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      skippedCount,
      timeSpentSeconds,
      userAnswers,
    };

    await StorageService.saveTestAttempt(attempt);
    await StorageService.updateStreak();
    setShowSubmitModal(false);
    onFinishTest(attempt);
  };

  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <View style={[styles.container, { backgroundColor: colors.canvas }]}>
      {/* Top Test Navigation Bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: colors.cardElevated,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onExitTest}
          style={[
            styles.exitBtn,
            {
              backgroundColor: colors.canvasSubtle,
              borderColor: colors.border,
            },
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Real-time Timer */}
        <Timer
          totalSeconds={test.durationMinutes * 60}
          onTimeUp={calculateResultsAndFinish}
        />

        {/* Question Palette Modal Opener */}
        <TouchableOpacity
          onPress={() => setShowPaletteModal(true)}
          style={[
            styles.paletteToggleBtn,
            {
              backgroundColor: colors.canvasSubtle,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="grid-outline" size={16} color={colors.textPrimary} />
          <Text style={[styles.paletteToggleText, { color: colors.textPrimary }]}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Question Display */}
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedOption={userAnswers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
            isMarkedForReview={!!markedForReview[currentQuestion.id]}
            onToggleMarkForReview={handleToggleMarkForReview}
            isBookmarked={!!bookmarked[currentQuestion.id]}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom Action Footer */}
      <View
        style={[
          styles.bottomFooter,
          {
            backgroundColor: colors.cardElevated,
            borderTopColor: colors.border,
          },
        ]}
      >
        <View style={styles.footerRowTop}>
          <TouchableOpacity
            style={[
              styles.clearBtn,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
            onPress={handleClearAnswer}
            disabled={!userAnswers[currentQuestion?.id]}
          >
            <Text
              style={[
                styles.clearBtnText,
                { color: userAnswers[currentQuestion?.id] ? colors.textPrimary : colors.textMuted },
              ]}
            >
              {t.clearAnswer}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitTestBtn,
              {
                backgroundColor: isDark ? '#EF4444' : '#DC2626',
              },
            ]}
            onPress={() => setShowSubmitModal(true)}
          >
            <Text style={styles.submitTestBtnText}>{t.submitTest}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRowBottom}>
          <TouchableOpacity
            style={[
              styles.navBtn,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
              currentIndex === 0 && styles.disabledNavBtn,
            ]}
            onPress={handlePrev}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={17} color={colors.textPrimary} />
            <Text style={[styles.navBtnText, { color: colors.textPrimary }]}>
              {t.prevQuestion}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navBtnPrimary,
              {
                backgroundColor: colors.primary,
              },
              currentIndex === questions.length - 1 && styles.disabledNavBtn,
            ]}
            onPress={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            <Text
              style={[
                styles.navBtnPrimaryText,
                { color: colors.textOnPrimary },
              ]}
            >
              {t.saveAndNext}
            </Text>
            <Ionicons name="chevron-forward" size={17} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Question Palette Grid Modal */}
      <Modal
        visible={showPaletteModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaletteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.cardElevated,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                {t.questionPalette}
              </Text>
              <TouchableOpacity onPress={() => setShowPaletteModal(false)}>
                <Ionicons name="close-circle" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Legend */}
            <View
              style={[
                styles.legendRow,
                { borderBottomColor: colors.border },
              ]}
            >
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'उत्तर दिया' : 'Answered'} ({answeredCount})
                </Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'चिह्नित' : 'Marked'} ({markedCount})
                </Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.borderStrong }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'अनुत्तरित' : 'Unanswered'} ({unansweredCount})
                </Text>
              </View>
            </View>

            {/* Palette Grid */}
            <ScrollView style={styles.paletteGridScroll}>
              <View style={styles.paletteGrid}>
                {questions.map((q, idx) => {
                  const hasAnswer = !!userAnswers[q.id];
                  const isMarked = !!markedForReview[q.id];
                  const isCur = idx === currentIndex;

                  let cellBg = colors.canvasSubtle;
                  let cellTextColor = colors.textPrimary;

                  if (hasAnswer) {
                    cellBg = '#10B981';
                    cellTextColor = '#FFFFFF';
                  } else if (isMarked) {
                    cellBg = '#F59E0B';
                    cellTextColor = '#FFFFFF';
                  }

                  return (
                    <TouchableOpacity
                      key={q.id}
                      style={[
                        styles.paletteCell,
                        { backgroundColor: cellBg },
                        isCur && {
                          borderWidth: 2,
                          borderColor: colors.accent,
                        },
                      ]}
                      onPress={() => {
                        setCurrentIndex(idx);
                        setShowPaletteModal(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.paletteCellText,
                          { color: cellTextColor },
                        ]}
                      >
                        {idx + 1}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Confirmation Submit Modal */}
      <Modal
        visible={showSubmitModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.confirmCard,
              {
                backgroundColor: colors.cardElevated,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="alert-circle" size={40} color={colors.warning} />
            <Text style={[styles.confirmTitle, { color: colors.textPrimary }]}>
              {t.confirmSubmitTitle}
            </Text>

            <View
              style={[
                styles.summaryBox,
                {
                  backgroundColor: colors.canvasSubtle,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#10B981' }]}>
                  {answeredCount}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'हल किए' : 'Answered'}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#EF4444' }]}>
                  {unansweredCount}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'अनुत्तरित' : 'Skipped'}
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#F59E0B' }]}>
                  {markedCount}
                </Text>
                <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                  {language === 'hi' ? 'चिह्नित' : 'Marked'}
                </Text>
              </View>
            </View>

            <View style={styles.confirmBtnRow}>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  {
                    backgroundColor: colors.canvasSubtle,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setShowSubmitModal(false)}
              >
                <Text style={[styles.cancelBtnText, { color: colors.textPrimary }]}>
                  {t.cancel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.finalSubmitBtn}
                onPress={calculateResultsAndFinish}
              >
                <Text style={styles.finalSubmitBtnText}>{t.submitNow}</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  exitBtn: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  paletteToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 4,
    borderWidth: 1,
  },
  paletteToggleText: {
    fontSize: 12,
    fontWeight: '800',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  bottomFooter: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
    elevation: 8,
  },
  footerRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 10,
  },
  clearBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  submitTestBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  submitTestBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  footerRowBottom: {
    flexDirection: 'row',
    gap: 10,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 100,
    gap: 4,
    borderWidth: 1,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  navBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 100,
    gap: 4,
  },
  navBtnPrimaryText: {
    fontSize: 13,
    fontWeight: '800',
  },
  disabledNavBtn: {
    opacity: 0.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  paletteGridScroll: {
    maxHeight: 280,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paletteCell: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteCellText: {
    fontSize: 13,
    fontWeight: '700',
  },
  confirmCard: {
    width: '100%',
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
  },
  confirmTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 14,
    textAlign: 'center',
  },
  summaryBox: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 18,
    borderWidth: 1,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: '900',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  confirmBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  finalSubmitBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 11,
    borderRadius: 100,
    alignItems: 'center',
  },
  finalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
