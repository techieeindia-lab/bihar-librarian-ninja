import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { FLASHCARDS } from '../data/flashcards';
import { Flashcard } from '../types';
import { DataService } from '../services/dataService';

export const FlashcardsScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    DataService.getFlashcards().then((data) => {
      if (data && data.length > 0) {
        setCards(data);
      }
    });
  }, []);

  const currentCard = cards[currentIndex] || cards[0] || FLASHCARDS[0];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Screen Title */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.flashcardsTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? 'महत्वपूर्ण वर्ष, नियम, वर्गीकरण कोड एवं तथ्यों का सुपर-फास्ट पुनरावलोकन'
            : 'Rapid revision cards for key years, founders, DDC classes, and exam facts'}
        </Text>
      </View>

      {/* Card Counter & Category Badge */}
      <View style={styles.metaRow}>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor: isDark
                ? 'rgba(0, 112, 243, 0.15)'
                : '#EFF6FF',
              borderColor: isDark
                ? 'rgba(0, 112, 243, 0.35)'
                : '#BFDBFE',
            },
          ]}
        >
          <Ionicons name="sparkles" size={13} color={colors.accent} />
          <Text style={[styles.categoryText, { color: colors.accent }]}>
            {currentCard.category[language]}
          </Text>
        </View>

        <View
          style={[
            styles.counterBadge,
            {
              backgroundColor: colors.canvasSubtle,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.counterText, { color: colors.textSecondary }]}>
            {currentIndex + 1} / {cards.length}
          </Text>
        </View>
      </View>

      {/* Main Flashcard */}
      <TouchableOpacity
        style={[
          styles.flashcard,
          {
            backgroundColor: isRevealed
              ? isDark
                ? 'rgba(16, 185, 129, 0.08)'
                : '#F0FDF4'
              : colors.card,
            borderColor: isRevealed
              ? '#10B981'
              : colors.border,
            borderTopWidth: 3,
            borderTopColor: isRevealed ? '#10B981' : colors.accent,
          },
        ]}
        onPress={() => setIsRevealed(!isRevealed)}
        activeOpacity={0.9}
      >
        <View style={styles.cardTopHint}>
          <Ionicons
            name={isRevealed ? 'checkmark-circle' : 'finger-print'}
            size={16}
            color={isRevealed ? '#10B981' : colors.textMuted}
          />
          <Text
            style={[
              styles.cardTopHintText,
              { color: isRevealed ? '#10B981' : colors.textMuted },
            ]}
          >
            {isRevealed
              ? language === 'hi'
                ? 'सही उत्तर (ANSWER)'
                : 'ANSWER REVEALED'
              : t.tapToReveal}
          </Text>
        </View>

        {/* Front Question */}
        <Text style={[styles.frontText, { color: colors.textPrimary }]}>
          {currentCard.front[language]}
        </Text>

        {/* Back Answer (Revealed) */}
        {isRevealed ? (
          <View style={styles.answerContainer}>
            <View style={[styles.divider, { backgroundColor: isDark ? '#262626' : '#E2E8F0' }]} />
            <Text style={[styles.backText, { color: isDark ? '#34D399' : '#065F46' }]}>
              {currentCard.back[language]}
            </Text>
            {currentCard.subtext && (
              <View
                style={[
                  styles.subtextBox,
                  {
                    backgroundColor: isDark ? 'rgba(0, 112, 243, 0.12)' : '#EFF6FF',
                    borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
                  },
                ]}
              >
                <Ionicons name="information-circle" size={15} color={colors.accent} />
                <Text style={[styles.subtext, { color: isDark ? '#93C5FD' : '#1E3A8A' }]}>
                  {currentCard.subtext[language]}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.tapPromptBox}>
            <Ionicons name="eye-outline" size={18} color={colors.accent} />
            <Text style={[styles.tapPromptText, { color: colors.accent }]}>
              {t.tapToReveal}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Navigation Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[
            styles.controlBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            currentIndex === 0 && styles.disabledControlBtn,
          ]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={16} color={colors.textPrimary} />
          <Text style={[styles.controlBtnText, { color: colors.textPrimary }]}>
            {t.prevCard}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.resetBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === FLASHCARDS.length - 1}
          activeOpacity={0.85}
          style={[currentIndex === FLASHCARDS.length - 1 && styles.disabledControlBtn, { flex: 1 }]}
        >
          <LinearGradient
            colors={['#0070F3', '#7928CA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.controlBtnPrimary}
          >
            <Text style={styles.controlBtnPrimaryText}>{t.nextCard}</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 36 }} />
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
    marginBottom: 10,
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
  },
  counterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '800',
  },
  flashcard: {
    borderRadius: 16,
    padding: 22,
    minHeight: 270,
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardTopHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  cardTopHintText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  frontText: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 25,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    marginVertical: 16,
    width: '100%',
  },
  answerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
  },
  subtextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    marginTop: 12,
  },
  subtext: {
    fontSize: 11,
    fontWeight: '600',
  },
  tapPromptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  tapPromptText: {
    fontSize: 12,
    fontWeight: '800',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 100,
    gap: 6,
    borderWidth: 1,
  },
  controlBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  resetBtn: {
    padding: 11,
    borderRadius: 100,
    borderWidth: 1,
  },
  controlBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 100,
    gap: 6,
  },
  controlBtnPrimaryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  disabledControlBtn: {
    opacity: 0.35,
  },
});
