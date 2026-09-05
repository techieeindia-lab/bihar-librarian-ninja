import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Question, Language } from '../types';
import { useLanguage } from '../localization/LanguageContext';

interface QuestionCardProps {
  question: Question;
  questionNumber?: number;
  totalQuestions?: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | null;
  onSelectOption?: (option: 'A' | 'B' | 'C' | 'D') => void;
  showSolution?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  isMarkedForReview?: boolean;
  onToggleMarkForReview?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  showSolution = false,
  isBookmarked = false,
  onToggleBookmark,
  isMarkedForReview = false,
  onToggleMarkForReview,
}) => {
  const { language: globalLanguage, t } = useLanguage();
  // Allow per-question language toggle
  const [localLang, setLocalLang] = useState<Language>(globalLanguage);

  const toggleLocalLang = () => {
    setLocalLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.card}>
      {/* Top Meta Bar */}
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          {questionNumber !== undefined && (
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>
                {t.questions} {questionNumber}
                {totalQuestions ? ` / ${totalQuestions}` : ''}
              </Text>
            </View>
          )}
          {question.sourceExam && (
            <View style={styles.sourceBadge}>
              <Text style={styles.sourceText}>{question.sourceExam}</Text>
            </View>
          )}
        </View>

        <View style={styles.metaRight}>
          {/* Quick Translate Button for this Question */}
          <TouchableOpacity
            onPress={toggleLocalLang}
            style={styles.langToggleBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="language" size={14} color="#1E3A8A" />
            <Text style={styles.langToggleText}>
              {localLang === 'hi' ? 'EN' : 'हिन्दी'}
            </Text>
          </TouchableOpacity>

          {/* Mark for Review Button */}
          {onToggleMarkForReview && (
            <TouchableOpacity
              onPress={onToggleMarkForReview}
              style={[
                styles.iconBtn,
                isMarkedForReview && styles.markedForReviewBtn,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isMarkedForReview ? 'flag' : 'flag-outline'}
                size={16}
                color={isMarkedForReview ? '#D97706' : '#64748B'}
              />
            </TouchableOpacity>
          )}

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <TouchableOpacity
              onPress={onToggleBookmark}
              style={[styles.iconBtn, isBookmarked && styles.bookmarkedBtn]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={16}
                color={isBookmarked ? '#1E3A8A' : '#64748B'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Question Text */}
      <Text style={styles.questionText}>{question.question[localLang]}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {optionKeys.map((key) => {
          const isSelected = selectedOption === key;
          const isCorrect = question.correctAnswer === key;

          let optionStyle: StyleProp<ViewStyle> = styles.optionItem;
          let textStyle: StyleProp<TextStyle> = styles.optionText;
          let badgeStyle: StyleProp<ViewStyle> = styles.optionBadge;
          let badgeTextStyle: StyleProp<TextStyle> = styles.optionBadgeText;

          if (showSolution) {
            if (isCorrect) {
              optionStyle = [styles.optionItem, styles.correctOption];
              textStyle = [styles.optionText, styles.correctOptionText];
              badgeStyle = [styles.optionBadge, styles.correctBadge];
              badgeTextStyle = [styles.optionBadgeText, styles.correctBadgeText];
            } else if (isSelected && !isCorrect) {
              optionStyle = [styles.optionItem, styles.wrongOption];
              textStyle = [styles.optionText, styles.wrongOptionText];
              badgeStyle = [styles.optionBadge, styles.wrongBadge];
              badgeTextStyle = [styles.optionBadgeText, styles.wrongBadgeText];
            }
          } else if (isSelected) {
            optionStyle = [styles.optionItem, styles.selectedOption];
            textStyle = [styles.optionText, styles.selectedOptionText];
            badgeStyle = [styles.optionBadge, styles.selectedBadge];
            badgeTextStyle = [styles.optionBadgeText, styles.selectedBadgeText];
          }

          return (
            <TouchableOpacity
              key={key}
              onPress={() => !showSolution && onSelectOption?.(key)}
              style={optionStyle}
              activeOpacity={showSolution ? 1 : 0.7}
              disabled={showSolution}
            >
              <View style={badgeStyle}>
                <Text style={badgeTextStyle}>{key}</Text>
              </View>
              <Text style={textStyle}>{question.options[key][localLang]}</Text>
              {showSolution && isCorrect && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#10B981"
                  style={styles.solutionIcon}
                />
              )}
              {showSolution && isSelected && !isCorrect && (
                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#EF4444"
                  style={styles.solutionIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Detailed Solution / Explanation (Shown in review mode) */}
      {showSolution && (
        <View style={styles.explanationBox}>
          <View style={styles.explanationHeader}>
            <Ionicons name="bulb-outline" size={18} color="#D97706" />
            <Text style={styles.explanationTitle}>
              {localLang === 'hi'
                ? `सही उत्तर: विकल्प (${question.correctAnswer}) • व्याख्या`
                : `Correct Answer: Option (${question.correctAnswer}) • Explanation`}
            </Text>
          </View>
          <Text style={styles.explanationText}>
            {question.explanation[localLang]}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 6,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  numberBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  numberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  sourceBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sourceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  langToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  langToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  markedForReviewBtn: {
    backgroundColor: '#FEF3C7',
  },
  bookmarkedBtn: {
    backgroundColor: '#EFF6FF',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
  },
  selectedOption: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  correctOption: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  wrongOption: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  optionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedBadge: {
    backgroundColor: '#2563EB',
  },
  correctBadge: {
    backgroundColor: '#10B981',
  },
  wrongBadge: {
    backgroundColor: '#EF4444',
  },
  optionBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },
  selectedBadgeText: {
    color: '#FFFFFF',
  },
  correctBadgeText: {
    color: '#FFFFFF',
  },
  wrongBadgeText: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 20,
  },
  selectedOptionText: {
    fontWeight: '700',
    color: '#1E3A8A',
  },
  correctOptionText: {
    fontWeight: '700',
    color: '#065F46',
  },
  wrongOptionText: {
    fontWeight: '700',
    color: '#991B1B',
  },
  solutionIcon: {
    marginLeft: 8,
  },
  explanationBox: {
    marginTop: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
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
    color: '#92400E',
  },
  explanationText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 20,
    fontWeight: '500',
  },
});
