import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Question, Language } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, difficultyColorMap, categoryColorMap } from '../theme';

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
  const { colors, isDark } = useTheme();
  // Allow per-question language toggle
  const [localLang, setLocalLang] = useState<Language>(globalLanguage);

  const toggleLocalLang = () => {
    setLocalLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  const diffKey = question.difficulty || 'medium';
  const diffConfig = difficultyColorMap[diffKey];
  const catColor = categoryColorMap[question.category] || colors.accent;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Top Meta Bar */}
      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          {questionNumber !== undefined && (
            <View
              style={[
                styles.numberBadge,
                {
                  backgroundColor: colors.canvasSubtle,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.numberText, { color: colors.textPrimary }]}>
                {t.questions} {questionNumber}
                {totalQuestions ? ` / ${totalQuestions}` : ''}
              </Text>
            </View>
          )}

          {/* Difficulty Badge */}
          <View
            style={[
              styles.diffBadge,
              {
                backgroundColor: isDark
                  ? `${diffConfig.color}22`
                  : `${diffConfig.color}15`,
                borderColor: `${diffConfig.color}55`,
              },
            ]}
          >
            <View
              style={[
                styles.diffDot,
                { backgroundColor: diffConfig.color },
              ]}
            />
            <Text style={[styles.diffText, { color: diffConfig.color }]}>
              {localLang === 'hi' ? diffConfig.labelHi : diffConfig.label}
            </Text>
          </View>

          {/* Source Exam Tag */}
          {question.sourceExam && (
            <View
              style={[
                styles.sourceBadge,
                {
                  backgroundColor: isDark ? 'rgba(245, 166, 35, 0.15)' : '#FFFBEB',
                  borderColor: isDark ? 'rgba(245, 166, 35, 0.3)' : '#FDE68A',
                },
              ]}
            >
              <Text style={[styles.sourceText, { color: isDark ? colors.amber : '#B45309' }]}>
                {question.sourceExam}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metaRight}>
          {/* Quick Translate Button for this Question */}
          <TouchableOpacity
            onPress={toggleLocalLang}
            style={[
              styles.langToggleBtn,
              {
                backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons name="language" size={13} color={colors.accent} />
            <Text style={[styles.langToggleText, { color: colors.accent }]}>
              {localLang === 'hi' ? 'EN' : 'हिन्दी'}
            </Text>
          </TouchableOpacity>

          {/* Mark for Review Button */}
          {onToggleMarkForReview && (
            <TouchableOpacity
              onPress={onToggleMarkForReview}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: isMarkedForReview
                    ? colors.warningSoft
                    : colors.canvasSubtle,
                  borderColor: isMarkedForReview
                    ? colors.warningBorder
                    : colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isMarkedForReview ? 'flag' : 'flag-outline'}
                size={16}
                color={isMarkedForReview ? colors.warning : colors.textMuted}
              />
            </TouchableOpacity>
          )}

          {/* Bookmark Button */}
          {onToggleBookmark && (
            <TouchableOpacity
              onPress={onToggleBookmark}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: isBookmarked
                    ? colors.accentSoft
                    : colors.canvasSubtle,
                  borderColor: isBookmarked
                    ? colors.accentBorder
                    : colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={16}
                color={isBookmarked ? colors.accent : colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Question Text */}
      <Text style={[styles.questionText, { color: colors.textPrimary }]}>
        {question.question[localLang]}
      </Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {optionKeys.map((key) => {
          const isSelected = selectedOption === key;
          const isCorrect = question.correctAnswer === key;

          let optionBg = colors.canvasSubtle;
          let optionBorder = colors.border;
          let optionTextColor = colors.textPrimary;
          let badgeBg = isDark ? '#262626' : '#E4E4E7';
          let badgeTextColor = colors.textPrimary;

          if (showSolution) {
            if (isCorrect) {
              optionBg = isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5';
              optionBorder = '#10B981';
              optionTextColor = colors.textPrimary;
              badgeBg = '#10B981';
              badgeTextColor = '#FFFFFF';
            } else if (isSelected && !isCorrect) {
              optionBg = isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2';
              optionBorder = '#EF4444';
              optionTextColor = colors.textPrimary;
              badgeBg = '#EF4444';
              badgeTextColor = '#FFFFFF';
            }
          } else if (isSelected) {
            optionBg = isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF';
            optionBorder = colors.accent;
            optionTextColor = colors.textPrimary;
            badgeBg = colors.accent;
            badgeTextColor = '#FFFFFF';
          }

          return (
            <TouchableOpacity
              key={key}
              onPress={() => !showSolution && onSelectOption?.(key)}
              style={[
                styles.optionItem,
                {
                  backgroundColor: optionBg,
                  borderColor: optionBorder,
                  borderWidth: isSelected ? 1.5 : 1,
                },
              ]}
              activeOpacity={showSolution ? 1 : 0.7}
              disabled={showSolution}
            >
              <View style={[styles.optionBadge, { backgroundColor: badgeBg }]}>
                <Text style={[styles.optionBadgeText, { color: badgeTextColor }]}>
                  {key}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: optionTextColor }]}>
                {question.options[key][localLang]}
              </Text>
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

      {/* Detailed Solution / Explanation */}
      {showSolution && (
        <View
          style={[
            styles.explanationBox,
            {
              backgroundColor: isDark
                ? 'rgba(245, 158, 11, 0.1)'
                : '#FFFBEB',
              borderLeftColor: '#F59E0B',
              borderColor: isDark ? 'rgba(245, 158, 11, 0.25)' : '#FDE68A',
            },
          ]}
        >
          <View style={styles.explanationHeader}>
            <Ionicons name="bulb" size={17} color="#F59E0B" />
            <Text
              style={[
                styles.explanationTitle,
                { color: isDark ? '#FBBF24' : '#92400E' },
              ]}
            >
              {localLang === 'hi'
                ? `सही उत्तर: विकल्प (${question.correctAnswer}) • विस्तृत समाधान`
                : `Correct Answer: Option (${question.correctAnswer}) • Explanation`}
            </Text>
          </View>
          <Text
            style={[
              styles.explanationText,
              { color: isDark ? colors.textPrimary : '#78350F' },
            ]}
          >
            {question.explanation[localLang]}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    flexWrap: 'wrap',
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  numberBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  numberText: {
    fontSize: 11,
    fontWeight: '700',
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
    borderRadius: 3,
  },
  diffText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sourceBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: '700',
  },
  langToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 3,
    borderWidth: 1,
  },
  langToggleText: {
    fontSize: 11,
    fontWeight: '800',
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  optionsContainer: {
    gap: 9,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 11,
  },
  optionBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  solutionIcon: {
    marginLeft: 6,
  },
  explanationBox: {
    marginTop: 14,
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderWidth: 1,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  explanationTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  explanationText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
});
