import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockTest, Question, UserTestAttempt } from '../types';
import { useLanguage } from '../localization/LanguageContext';
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

  // Counting for palette & submit modal
  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <View style={styles.container}>
      {/* Top Test Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onExitTest}
          style={styles.exitBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={22} color="#0F172A" />
        </TouchableOpacity>

        {/* Real-time Timer */}
        <Timer
          totalSeconds={test.durationMinutes * 60}
          onTimeUp={calculateResultsAndFinish}
        />

        {/* Question Palette Modal Opener */}
        <TouchableOpacity
          onPress={() => setShowPaletteModal(true)}
          style={styles.paletteToggleBtn}
        >
          <Ionicons name="grid-outline" size={18} color="#1E3A8A" />
          <Text style={styles.paletteToggleText}>
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
      <View style={styles.bottomFooter}>
        <View style={styles.footerRowTop}>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearAnswer}
            disabled={!userAnswers[currentQuestion?.id]}
          >
            <Text
              style={[
                styles.clearBtnText,
                !userAnswers[currentQuestion?.id] && styles.disabledText,
              ]}
            >
              {t.clearAnswer}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitTestBtn}
            onPress={() => setShowSubmitModal(true)}
          >
            <Text style={styles.submitTestBtnText}>{t.submitTest}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRowBottom}>
          <TouchableOpacity
            style={[styles.navBtn, currentIndex === 0 && styles.disabledNavBtn]}
            onPress={handlePrev}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={18} color="#1E3A8A" />
            <Text style={styles.navBtnText}>{t.prevQuestion}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navBtnPrimary,
              currentIndex === questions.length - 1 && styles.disabledNavBtn,
            ]}
            onPress={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            <Text style={styles.navBtnPrimaryText}>{t.saveAndNext}</Text>
            <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
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
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.questionPalette}</Text>
              <TouchableOpacity onPress={() => setShowPaletteModal(false)}>
                <Ionicons name="close-circle" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>
                  {language === 'hi' ? 'उत्तर दिया' : 'Answered'} ({answeredCount})
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.legendText}>
                  {language === 'hi' ? 'समीक्षा हेतु' : 'Review'} ({markedCount})
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#E2E8F0' }]} />
                <Text style={styles.legendText}>
                  {language === 'hi' ? 'अनुत्तरित' : 'Not Answered'} ({unansweredCount})
                </Text>
              </View>
            </View>

            {/* Grid */}
            <ScrollView style={styles.paletteGridScroll}>
              <View style={styles.paletteGrid}>
                {questions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isMarked = !!markedForReview[q.id];
                  const isCurrent = idx === currentIndex;

                  let cellStyle: StyleProp<ViewStyle> = styles.paletteCell;
                  let cellTextStyle: StyleProp<TextStyle> = styles.paletteCellText;

                  if (isAnswered) {
                    cellStyle = [styles.paletteCell, styles.paletteCellAnswered];
                    cellTextStyle = [styles.paletteCellText, styles.paletteCellTextAnswered];
                  } else if (isMarked) {
                    cellStyle = [styles.paletteCell, styles.paletteCellMarked];
                    cellTextStyle = [styles.paletteCellText, styles.paletteCellTextMarked];
                  }

                  if (isCurrent) {
                    cellStyle = [cellStyle, styles.paletteCellCurrent];
                  }

                  return (
                    <TouchableOpacity
                      key={q.id}
                      style={cellStyle}
                      onPress={() => {
                        setCurrentIndex(idx);
                        setShowPaletteModal(false);
                      }}
                    >
                      <Text style={cellTextStyle}>{idx + 1}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        visible={showSubmitModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <Ionicons name="alert-circle" size={40} color="#1E3A8A" />
            <Text style={styles.confirmTitle}>{t.confirmSubmitTitle}</Text>

            <View style={styles.summaryBox}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{questions.length}</Text>
                <Text style={styles.summaryLabel}>{t.questions}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#10B981' }]}>
                  {answeredCount}
                </Text>
                <Text style={styles.summaryLabel}>
                  {language === 'hi' ? 'हल किए' : 'Answered'}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#EF4444' }]}>
                  {unansweredCount}
                </Text>
                <Text style={styles.summaryLabel}>
                  {language === 'hi' ? 'बाकी' : 'Left'}
                </Text>
              </View>
            </View>

            <View style={styles.confirmBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowSubmitModal(false)}
              >
                <Text style={styles.cancelBtnText}>{t.cancel}</Text>
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
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  exitBtn: {
    padding: 6,
  },
  paletteToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  paletteToggleText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomFooter: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  footerRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  disabledText: {
    color: '#CBD5E1',
  },
  submitTestBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitTestBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  footerRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 4,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  navBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 4,
  },
  navBtnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disabledNavBtn: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  paletteGridScroll: {
    maxHeight: 300,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paletteCell: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteCellAnswered: {
    backgroundColor: '#10B981',
  },
  paletteCellMarked: {
    backgroundColor: '#F59E0B',
  },
  paletteCellCurrent: {
    borderWidth: 2.5,
    borderColor: '#1E3A8A',
  },
  paletteCellText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  paletteCellTextAnswered: {
    color: '#FFFFFF',
  },
  paletteCellTextMarked: {
    color: '#FFFFFF',
  },
  confirmCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  confirmBtnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
  finalSubmitBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  finalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
