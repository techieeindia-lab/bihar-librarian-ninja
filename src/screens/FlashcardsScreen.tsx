import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { FLASHCARDS } from '../data/flashcards';

export const FlashcardsScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentCard = FLASHCARDS[currentIndex];

  const handleNext = () => {
    if (currentIndex < FLASHCARDS.length - 1) {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Screen Title */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.flashcardsTitle}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'महत्वपूर्ण वर्ष, नियम, वर्गीकरण कोड एवं तथ्यों का सुपर-फास्ट पुनरावलोकन'
            : 'Rapid revision cards for key years, founders, DDC classes, and exam facts'}
        </Text>
      </View>

      {/* Card Counter & Category Badge */}
      <View style={styles.metaRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {currentCard.category[language]}
          </Text>
        </View>

        <Text style={styles.counterText}>
          {currentIndex + 1} / {FLASHCARDS.length}
        </Text>
      </View>

      {/* Main Flashcard */}
      <TouchableOpacity
        style={[styles.flashcard, isRevealed && styles.flashcardRevealed]}
        onPress={() => setIsRevealed(!isRevealed)}
        activeOpacity={0.9}
      >
        <View style={styles.cardTopHint}>
          <Ionicons
            name={isRevealed ? 'checkmark-circle' : 'finger-print'}
            size={18}
            color={isRevealed ? '#10B981' : '#64748B'}
          />
          <Text style={styles.cardTopHintText}>
            {isRevealed
              ? language === 'hi'
                ? 'उत्तर'
                : 'ANSWER'
              : t.tapToReveal}
          </Text>
        </View>

        {/* Front Question */}
        <Text style={styles.frontText}>
          {currentCard.front[language]}
        </Text>

        {/* Back Answer (Revealed) */}
        {isRevealed ? (
          <View style={styles.answerContainer}>
            <View style={styles.divider} />
            <Text style={styles.backText}>
              {currentCard.back[language]}
            </Text>
            {currentCard.subtext && (
              <View style={styles.subtextBox}>
                <Ionicons name="information-circle" size={16} color="#1E3A8A" />
                <Text style={styles.subtext}>
                  {currentCard.subtext[language]}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.tapPromptBox}>
            <Ionicons name="eye-outline" size={20} color="#94A3B8" />
            <Text style={styles.tapPromptText}>{t.tapToReveal}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Navigation Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.controlBtn, currentIndex === 0 && styles.disabledControlBtn]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Ionicons name="arrow-back" size={18} color="#1E3A8A" />
          <Text style={styles.controlBtnText}>{t.prevCard}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetBtn}
          onPress={handleReset}
        >
          <Ionicons name="refresh" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlBtnPrimary,
            currentIndex === FLASHCARDS.length - 1 && styles.disabledControlBtn,
          ]}
          onPress={handleNext}
          disabled={currentIndex === FLASHCARDS.length - 1}
        >
          <Text style={styles.controlBtnPrimaryText}>{t.nextCard}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
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
  headerBox: {
    marginTop: 16,
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  counterText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
  },
  flashcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    minHeight: 280,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  flashcardRevealed: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  cardTopHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  cardTopHintText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  frontText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#E2E8F0',
    marginVertical: 18,
    width: '100%',
  },
  answerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
    lineHeight: 24,
    textAlign: 'center',
  },
  subtextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    marginTop: 14,
  },
  subtext: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  tapPromptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  tapPromptText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  controlBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  resetBtn: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  controlBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  controlBtnPrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disabledControlBtn: {
    opacity: 0.4,
  },
});
