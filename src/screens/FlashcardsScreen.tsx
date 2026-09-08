import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { Flashcard } from '../types';
import { FLASHCARDS } from '../data/flashcards';
import { DataService } from '../services/dataService';
import { StorageService } from '../storage/storageService';
import {
  MASTER_CURRICULUM,
  getCurriculumTopicById,
  getCurriculumUnitByNumber,
} from '../data/curriculum';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// High-Yield Exam Memory Highlights mapped by Unit Number
const UNIT_EXAM_HIGHLIGHTS: Record<number, { title: { hi: string; en: string }; points: { hi: string; en: string }[] }> = {
  1: {
    title: { hi: 'यूनिट 1 परीक्षा फोकस बिंदु (Unit 1 Exam Keys)', en: 'Unit 1 High-Yield Exam Keys' },
    points: [
      { hi: 'पंच सूत्र: 1928 प्रतिपादन (मीनाक्षी कॉलेज), 1931 पुस्तक प्रकाशन (मद्रास)।', en: 'Five Laws: Formulated 1928, Published 1931 (MALA).' },
      { hi: 'पुस्तकालय अधिनियम: भारत में 1st मद्रास (1948), कुल 19 राज्यों में पारित।', en: '1st Public Library Act: Madras (1948), 19 states total.' },
      { hi: 'संस्थाएं: IFLA (1927 द हेग), ILA (1933 दिल्ली), RRRLF (1972 कोलकाता)।', en: 'Bodies: IFLA (1927 Hague), ILA (1933 Delhi), RRRLF (1972 Kolkata).' },
    ],
  },
  2: {
    title: { hi: 'यूनिट 2 परीक्षा फोकस बिंदु (Unit 2 Exam Keys)', en: 'Unit 2 High-Yield Exam Keys' },
    points: [
      { hi: 'DDC: 1876 (मेलविल डेवी), 3 खंड (Summ.) व रिलेटिव इंडेक्स।', en: 'DDC: 1876 by Melvil Dewey, 3 summaries & Relative Index.' },
      { hi: 'CC: 1933 (डॉ. रंगनाथन), PMEST सूत्र व कोलोन (:) योजक चिह्न।', en: 'CC: 1933 by Dr. Ranganathan, PMEST facet formula.' },
      { hi: 'कैटलॉगिंग: AACR-2 (1978), CCC (1934 - Classified Catalogue Code)।', en: 'Cataloguing: AACR-2 (1978), CCC (1934 by Ranganathan).' },
    ],
  },
  3: {
    title: { hi: 'यूनिट 3 परीक्षा फोकस बिंदु (Unit 3 Exam Keys)', en: 'Unit 3 High-Yield Exam Keys' },
    points: [
      { hi: 'सूचना स्रोत: प्राथमिक (शोध पत्रिकाएं, पेटेंट), द्वितीयक (ग्रंथसूची, समीक्षा)।', en: 'Sources: Primary (Journals, Patents), Secondary (Bibliographies).' },
      { hi: 'SDI सेवा: 1958 में एच.पी. लूहान (H.P. Luhn) द्वारा कम्प्यूटरीकृत।', en: 'SDI Service: Pioneered 1958 by H.P. Luhn (IBM).' },
      { hi: 'नेटवर्क: INFLIBNET (1991 गांधीनगर), DELNET (1988 दिल्ली कंसोर्सिया)।', en: 'Networks: INFLIBNET (1991 Gandhinagar), DELNET (1988 Delhi).' },
    ],
  },
  4: {
    title: { hi: 'यूनिट 4 परीक्षा फोकस बिंदु (Unit 4 Exam Keys)', en: 'Unit 4 High-Yield Exam Keys' },
    points: [
      { hi: 'POSDCORB: 1937 में लूथर गुलिक व लिंडाल उर्विक द्वारा प्रतिपादित।', en: 'POSDCORB: Coined 1937 by Luther Gulick & Lyndall Urwick.' },
      { hi: 'निर्गम प्रणालियां: ब्राउन (नीना ब्राउन 1895), नेवार्क (जॉन कॉटन डाना 1900)।', en: 'Circulation: Browne (1895), Newark (1900 by J.C. Dana).' },
      { hi: 'बजट पद्धतियां: PPBS (1961 RAND Corp), ZBB (पीटर पायर 1970 शून्य आधार)।', en: 'Budgeting: PPBS (1961), ZBB (1970 by Peter Pyhrr).' },
    ],
  },
  5: {
    title: { hi: 'यूनिट 5 परीक्षा फोकस बिंदु (Unit 5 Exam Keys)', en: 'Unit 5 High-Yield Exam Keys' },
    points: [
      { hi: 'ILMS सॉफ्टवेयर: Koha (1999 न्यूजीलैंड), SOUL 3.0 (INFLIBNET), e-Granthalaya (NIC)।', en: 'ILMS: Koha (1999 NZ), SOUL 3.0 (INFLIBNET), e-Granthalaya (NIC).' },
      { hi: 'RFID तकनीक: 13.56 MHz हाई-फ्रीक्वेंसी टैग पुस्तकालयों में प्रयुक्त।', en: 'RFID: 13.56 MHz HF tags standard in library automation.' },
      { hi: 'NEP 2020: 5+3+3+4 स्कूली संरचना, नेशनल डिजिटल लाइब्रेरी व पुस्तकालय संवर्धन।', en: 'NEP 2020: 5+3+3+4 structure, National Digital Library focus.' },
    ],
  },
};

export const FlashcardsScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [allCards, setAllCards] = useState<Flashcard[]>(FLASHCARDS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'list'>('flip');

  // Persistence State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewLaterIds, setReviewLaterIds] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // Load flashcards
    DataService.getFlashcards()
      .then((data) => {
        if (data && data.length > 0) {
          setAllCards(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    // Load saved bookmarks and mastery
    StorageService.getFlashcardBookmarks().then((b) => setBookmarkedIds(b));
    StorageService.getFlashcardMastered().then((m) => setMasteredIds(m));
  }, []);

  // Filter cards by Unit and Topic
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      if (selectedUnit !== 'all') {
        if (card.unitNumber && card.unitNumber !== selectedUnit) return false;
      }
      if (selectedTopicId !== 'all') {
        if (card.topicId && card.topicId !== selectedTopicId) return false;
      }
      return true;
    });
  }, [allCards, selectedUnit, selectedTopicId]);

  const safeIndex = filteredCards.length > 0
    ? Math.min(Math.max(0, currentIndex), filteredCards.length - 1)
    : 0;
  const currentCard = filteredCards[safeIndex] as Flashcard | undefined;

  const currentUnitMeta = currentCard?.unitNumber
    ? getCurriculumUnitByNumber(currentCard.unitNumber)
    : selectedUnit !== 'all'
    ? getCurriculumUnitByNumber(selectedUnit)
    : undefined;

  const currentTopicMeta = currentCard?.topicId
    ? getCurriculumTopicById(currentCard.topicId)
    : selectedTopicId !== 'all'
    ? getCurriculumTopicById(selectedTopicId)
    : undefined;

  const activeUnitColor = selectedUnit !== 'all'
    ? getCurriculumUnitByNumber(selectedUnit)?.color || colors.primary
    : colors.primary;

  const activeUnitTopics = selectedUnit !== 'all'
    ? getCurriculumUnitByNumber(selectedUnit)?.topics || []
    : [];

  const isCurrentBookmarked = currentCard ? bookmarkedIds.includes(currentCard.id) : false;
  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
  const isCurrentReviewLater = currentCard ? reviewLaterIds.includes(currentCard.id) : false;

  // Handlers
  const handleNext = () => {
    if (safeIndex < filteredCards.length - 1) {
      setCurrentIndex(safeIndex + 1);
      setIsRevealed(false);
    }
  };

  const handlePrev = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
      setIsRevealed(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const handleShuffle = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setAllCards(shuffled);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const handleSelectUnit = (unitNum: number | 'all') => {
    setSelectedUnit(unitNum);
    setSelectedTopicId('all');
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const handleSelectTopic = (topicId: string | 'all') => {
    setSelectedTopicId(topicId);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const handleToggleBookmark = async (cardId?: string) => {
    const targetId = cardId || currentCard?.id;
    if (!targetId) return;
    const isNowBookmarked = await StorageService.toggleFlashcardBookmark(targetId);
    setBookmarkedIds((prev) =>
      isNowBookmarked ? [...prev, targetId] : prev.filter((id) => id !== targetId)
    );
  };

  const handleToggleMastered = async (cardId?: string) => {
    const targetId = cardId || currentCard?.id;
    if (!targetId) return;
    const isNowMastered = await StorageService.toggleFlashcardMastered(targetId);
    setMasteredIds((prev) =>
      isNowMastered ? [...prev, targetId] : prev.filter((id) => id !== targetId)
    );
    if (isNowMastered) {
      setReviewLaterIds((prev) => prev.filter((id) => id !== targetId));
      // Auto-advance smoothly after short pause
      if (!cardId && safeIndex < filteredCards.length - 1) {
        setTimeout(() => {
          setCurrentIndex(safeIndex + 1);
          setIsRevealed(false);
        }, 300);
      }
    }
  };

  const handleMarkReviewLater = (cardId?: string) => {
    const targetId = cardId || currentCard?.id;
    if (!targetId) return;
    setReviewLaterIds((prev) =>
      prev.includes(targetId) ? prev : [...prev, targetId]
    );
    setMasteredIds((prev) => prev.filter((id) => id !== targetId));
    // Auto-advance
    if (!cardId && safeIndex < filteredCards.length - 1) {
      setTimeout(() => {
        setCurrentIndex(safeIndex + 1);
        setIsRevealed(false);
      }, 250);
    }
  };

  // Deck Stats for current filtered cards
  const deckMasteredCount = filteredCards.filter((c) => masteredIds.includes(c.id)).length;
  const deckReviewCount = filteredCards.filter((c) => reviewLaterIds.includes(c.id)).length;
  const progressPercent = filteredCards.length > 0
    ? Math.round(((safeIndex + 1) / filteredCards.length) * 100)
    : 0;

  // Active highlights
  const activeUnitNumber = selectedUnit !== 'all' ? selectedUnit : currentCard?.unitNumber || 1;
  const examHighlights = UNIT_EXAM_HIGHLIGHTS[activeUnitNumber] || UNIT_EXAM_HIGHLIGHTS[1];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Bar */}
      <View style={styles.headerBox}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
                {t.flashcardsTitle}
              </Text>
              <View
                style={[
                  styles.livePill,
                  {
                    backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
                  },
                ]}
              >
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>
                  {isLoading ? 'Syncing...' : 'Live'}
                </Text>
              </View>
            </View>
            <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi'
                ? '5 यूनिट्स एवं 29 टॉपिक्स अनुसार परीक्षा के मुख्य वर्ष, सिद्धांत व परिभाषाएं'
                : 'Rapid revision cards divided topic-wise across the 5 Core Units (29 Topics)'}
            </Text>
          </View>

          {/* Quick Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.modeToggleBtn,
                {
                  backgroundColor: viewMode === 'list' ? colors.primary : colors.card,
                  borderColor: viewMode === 'list' ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setViewMode(viewMode === 'flip' ? 'list' : 'flip')}
              activeOpacity={0.7}
            >
              <Ionicons
                name={viewMode === 'flip' ? 'list-outline' : 'albums-outline'}
                size={15}
                color={viewMode === 'list' ? '#FFFFFF' : colors.textPrimary}
              />
              <Text
                style={[
                  styles.modeToggleText,
                  { color: viewMode === 'list' ? '#FFFFFF' : colors.textPrimary },
                ]}
              >
                {viewMode === 'flip' ? (language === 'hi' ? 'लिस्ट' : 'List') : (language === 'hi' ? 'फ्लिप' : 'Cards')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconActionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={handleShuffle}
              activeOpacity={0.7}
            >
              <Ionicons name="shuffle" size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tier 1: Unit Selector Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.unitScroll}
      >
        <TouchableOpacity
          style={[
            styles.unitPill,
            {
              backgroundColor: selectedUnit === 'all'
                ? (isDark ? '#4F46E5' : '#18181B')
                : colors.canvasSubtle,
              borderColor: selectedUnit === 'all'
                ? (isDark ? '#6366F1' : '#18181B')
                : colors.border,
            },
          ]}
          onPress={() => handleSelectUnit('all')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.unitPillText,
              {
                color: selectedUnit === 'all' ? '#FFFFFF' : colors.textPrimary,
                fontWeight: selectedUnit === 'all' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? `सभी यूनिट्स (${allCards.length})` : `All Units (${allCards.length})`}
          </Text>
        </TouchableOpacity>

        {MASTER_CURRICULUM.map((unit) => {
          const isSelected = selectedUnit === unit.unitNumber;
          const unitCardCount = allCards.filter((c) => c.unitNumber === unit.unitNumber).length;
          return (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitPill,
                {
                  backgroundColor: isSelected ? unit.color : colors.canvasSubtle,
                  borderColor: isSelected ? unit.color : colors.border,
                },
              ]}
              onPress={() => handleSelectUnit(unit.unitNumber)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.unitPillText,
                  {
                    color: isSelected ? '#FFFFFF' : colors.textPrimary,
                    fontWeight: isSelected ? '800' : '600',
                  },
                ]}
              >
                {unit.shortTitle[language]} ({unitCardCount})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tier 2: Subtopic Pills (Visible when a Unit is Selected) */}
      {selectedUnit !== 'all' && activeUnitTopics.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicScroll}
        >
          <TouchableOpacity
            style={[
              styles.topicChip,
              {
                backgroundColor: selectedTopicId === 'all' ? activeUnitColor : isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5',
                borderColor: selectedTopicId === 'all' ? activeUnitColor : colors.border,
              },
            ]}
            onPress={() => handleSelectTopic('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.topicChipText,
                {
                  color: selectedTopicId === 'all' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: selectedTopicId === 'all' ? '800' : '600',
                },
              ]}
            >
              {language === 'hi' ? `सभी ${activeUnitTopics.length} टॉपिक्स` : `All ${activeUnitTopics.length} Topics`}
            </Text>
          </TouchableOpacity>

          {activeUnitTopics.map((top) => {
            const isTopSelected = selectedTopicId === top.id;
            const topCardCount = allCards.filter((c) => c.topicId === top.id).length;
            return (
              <TouchableOpacity
                key={top.id}
                style={[
                  styles.topicChip,
                  {
                    backgroundColor: isTopSelected ? activeUnitColor : isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5',
                    borderColor: isTopSelected ? activeUnitColor : colors.border,
                  },
                ]}
                onPress={() => handleSelectTopic(top.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.topicChipText,
                    {
                      color: isTopSelected ? '#FFFFFF' : colors.textPrimary,
                      fontWeight: isTopSelected ? '800' : '600',
                    },
                  ]}
                >
                  {top.shortTitle[language]} {topCardCount > 0 ? `(${topCardCount})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Progress & Deck Status Bar */}
      {currentCard && viewMode === 'flip' && (
        <View style={styles.deckProgressContainer}>
          <View style={styles.deckProgressRow}>
            {/* Topic & Unit Pill */}
            <View
              style={[
                styles.topicBadgePill,
                {
                  backgroundColor: currentUnitMeta
                    ? isDark ? currentUnitMeta.softBgDark : currentUnitMeta.softBgLight
                    : isDark ? 'rgba(0,112,243,0.15)' : '#EFF6FF',
                  borderColor: currentUnitMeta ? currentUnitMeta.color : colors.border,
                },
              ]}
            >
              <Ionicons
                name={(currentUnitMeta?.icon as any) || 'library'}
                size={13}
                color={currentUnitMeta?.color || colors.primary}
              />
              <Text
                style={[
                  styles.topicBadgePillText,
                  { color: currentUnitMeta?.color || colors.primary },
                ]}
                numberOfLines={1}
              >
                {currentTopicMeta
                  ? currentTopicMeta.shortTitle[language]
                  : currentCard?.category?.[language] || currentCard?.category?.hi || ''}
              </Text>
            </View>

            {/* Counter */}
            <View style={[styles.counterBox, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
              <Text style={[styles.counterText, { color: colors.textSecondary }]}>
                {safeIndex + 1} / {filteredCards.length}
              </Text>
              <Text style={[styles.percentText, { color: currentUnitMeta?.color || colors.accent }]}>
                ({progressPercent}%)
              </Text>
            </View>
          </View>

          {/* Smooth Progress Line Bar */}
          <View style={[styles.progressTrack, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB' }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: currentUnitMeta?.color || colors.primary,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* VIEW MODE: FLIP CARD (HERO INTERACTIVE EXPERIENCE) */}
      {viewMode === 'flip' && (
        <>
          {currentCard ? (
            <View style={styles.cardSection}>
              {/* Main Flip Flashcard */}
              <TouchableOpacity
                style={[
                  styles.heroFlashcard,
                  {
                    backgroundColor: isRevealed
                      ? isDark ? 'rgba(16, 185, 129, 0.09)' : '#F0FDF4'
                      : colors.card,
                    borderColor: isRevealed ? '#10B981' : colors.border,
                    borderTopColor: isRevealed ? '#10B981' : currentUnitMeta?.color || colors.primary,
                  },
                ]}
                onPress={() => setIsRevealed(!isRevealed)}
                activeOpacity={0.92}
              >
                {/* Card Top Header */}
                <View style={styles.cardHeaderBar}>
                  {/* Side Tag */}
                  <View
                    style={[
                      styles.sideBadge,
                      {
                        backgroundColor: isRevealed
                          ? isDark ? 'rgba(16, 185, 129, 0.22)' : '#DCFCE7'
                          : isDark ? 'rgba(0, 112, 243, 0.2)' : '#DBEAFE',
                      },
                    ]}
                  >
                    <Ionicons
                      name={isRevealed ? 'checkmark-circle' : 'help-circle'}
                      size={14}
                      color={isRevealed ? '#10B981' : colors.primary}
                    />
                    <Text
                      style={[
                        styles.sideBadgeText,
                        { color: isRevealed ? '#10B981' : colors.primary },
                      ]}
                    >
                      {isRevealed
                        ? language === 'hi' ? 'उत्तर (ANSWER)' : 'ANSWER'
                        : language === 'hi' ? 'प्रश्न (QUESTION)' : 'QUESTION'}
                    </Text>
                  </View>

                  {/* Star Bookmark & Mastery Badges */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {isCurrentMastered && (
                      <View style={styles.statusChipMastered}>
                        <Ionicons name="checkmark" size={12} color="#10B981" />
                        <Text style={styles.statusChipTextMastered}>
                          {language === 'hi' ? 'याद है' : 'Mastered'}
                        </Text>
                      </View>
                    )}
                    {isCurrentReviewLater && (
                      <View style={styles.statusChipReview}>
                        <Ionicons name="time" size={12} color="#F59E0B" />
                        <Text style={styles.statusChipTextReview}>
                          {language === 'hi' ? 'दोहराना' : 'Review'}
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() => handleToggleBookmark()}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={[
                        styles.starBtn,
                        {
                          backgroundColor: isCurrentBookmarked
                            ? isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7'
                            : isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6',
                        },
                      ]}
                    >
                      <Ionicons
                        name={isCurrentBookmarked ? 'star' : 'star-outline'}
                        size={17}
                        color={isCurrentBookmarked ? '#F59E0B' : colors.textMuted}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Card Center Content Area */}
                <View style={styles.cardBody}>
                  {!isRevealed ? (
                    <View style={styles.frontBody}>
                      <View style={styles.frontIconWrap}>
                        <Ionicons
                          name="sparkles-outline"
                          size={24}
                          color={currentUnitMeta?.color || colors.primary}
                        />
                      </View>
                      <Text style={[styles.frontText, { color: colors.textPrimary }]}>
                        {currentCard?.front?.[language] || currentCard?.front?.hi || currentCard?.front?.en || ''}
                      </Text>
                      {(currentCard?.front?.en || currentCard?.front?.hi) && (
                        <Text style={[styles.frontSecondaryText, { color: colors.textMuted }]}>
                          {language === 'hi' ? currentCard?.front?.en : currentCard?.front?.hi}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View style={styles.backBody}>
                      <View style={styles.backSuccessHeader}>
                        <Ionicons name="checkmark-done-circle" size={26} color="#10B981" />
                        <Text style={styles.backSuccessTitle}>
                          {language === 'hi' ? 'सटीक परीक्षा उत्तर' : 'Accurate Exam Answer'}
                        </Text>
                      </View>

                      <Text style={[styles.backText, { color: isDark ? '#A7F3D0' : '#065F46' }]}>
                        {currentCard?.back?.[language] || currentCard?.back?.hi || currentCard?.back?.en || ''}
                      </Text>

                      {(currentCard?.back?.en || currentCard?.back?.hi) && (
                        <Text style={[styles.backSecondaryText, { color: colors.textSecondary }]}>
                          {language === 'hi' ? currentCard?.back?.en : currentCard?.back?.hi}
                        </Text>
                      )}

                      {/* Subtext High-Yield Tip */}
                      {currentCard?.subtext && (
                        <View
                          style={[
                            styles.subtextCallout,
                            {
                              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                              borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : '#BBF7D0',
                            },
                          ]}
                        >
                          <Ionicons name="information-circle" size={17} color="#10B981" />
                          <View style={{ flex: 1 }}>
                            <Text style={styles.subtextCalloutLabel}>
                              {language === 'hi' ? '💡 परीक्षा संदर्भ / टिप:' : '💡 Exam Context / Tip:'}
                            </Text>
                            <Text style={[styles.subtextCalloutContent, { color: colors.textSecondary }]}>
                              {currentCard?.subtext?.[language] || currentCard?.subtext?.hi || currentCard?.subtext?.en || ''}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>

                {/* Card Bottom Flip Action Hint */}
                <View style={[styles.cardFooterBar, { borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : '#E5E7EB' }]}>
                  <Ionicons name="swap-horizontal" size={15} color={colors.textSecondary} />
                  <Text style={[styles.flipNoticeText, { color: colors.textSecondary }]}>
                    {isRevealed
                      ? (language === 'hi' ? 'प्रश्न पर वापस जाने के लिए कार्ड पर टैप करें' : 'Tap card to flip back to question')
                      : (language === 'hi' ? 'उत्तर देखने हेतु कार्ड पर कहीं भी टैप करें' : 'Tap card anywhere to reveal answer')}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Learning Mastery Action Buttons (Spaced Repetition Controls) */}
              <View style={styles.masteryActionRow}>
                <TouchableOpacity
                  style={[
                    styles.masteryBtn,
                    {
                      backgroundColor: isCurrentReviewLater
                        ? isDark ? 'rgba(245, 158, 11, 0.25)' : '#FEF3C7'
                        : colors.card,
                      borderColor: isCurrentReviewLater ? '#F59E0B' : colors.border,
                    },
                  ]}
                  onPress={() => handleMarkReviewLater()}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="refresh-circle-outline"
                    size={18}
                    color={isCurrentReviewLater ? '#D97706' : '#F59E0B'}
                  />
                  <Text
                    style={[
                      styles.masteryBtnText,
                      { color: isCurrentReviewLater ? '#D97706' : colors.textPrimary },
                    ]}
                  >
                    {language === 'hi' ? 'दोहराएं' : 'Review'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.flipCenterBtn, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
                  onPress={() => setIsRevealed(!isRevealed)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="sync-outline" size={18} color={colors.textPrimary} />
                  <Text style={[styles.flipCenterBtnText, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'पलटें' : 'Flip'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.masteryBtn,
                    {
                      backgroundColor: isCurrentMastered
                        ? isDark ? 'rgba(16, 185, 129, 0.25)' : '#DCFCE7'
                        : colors.card,
                      borderColor: isCurrentMastered ? '#10B981' : colors.border,
                    },
                  ]}
                  onPress={() => handleToggleMastered()}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isCurrentMastered ? 'checkmark-circle' : 'checkmark-circle-outline'}
                    size={18}
                    color="#10B981"
                  />
                  <Text
                    style={[
                      styles.masteryBtnText,
                      { color: isCurrentMastered ? '#059669' : colors.textPrimary },
                    ]}
                  >
                    {language === 'hi' ? 'याद हो गया' : 'Mastered'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Prev / Reset / Next Ergonomic Buttons */}
              <View style={styles.navRow}>
                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: safeIndex === 0 ? 0.35 : 1,
                    },
                  ]}
                  onPress={handlePrev}
                  disabled={safeIndex === 0}
                  activeOpacity={0.7}
                >
                  <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
                  <Text style={[styles.navBtnText, { color: colors.textPrimary }]}>
                    {t.prevCard}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.navResetBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={handleReset}
                  activeOpacity={0.7}
                >
                  <Ionicons name="reload" size={15} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navBtnPrimary,
                    {
                      opacity: safeIndex === filteredCards.length - 1 ? 0.45 : 1,
                    },
                  ]}
                  onPress={handleNext}
                  disabled={safeIndex === filteredCards.length - 1}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#0070F3', '#0052CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.navBtnGradient}
                  >
                    <Text style={styles.navBtnPrimaryText}>{t.nextCard}</Text>
                    <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.emptyStateCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name="albums-outline" size={48} color={colors.textMuted} />
              <Text style={[styles.emptyStateTitle, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'इस टॉपिक में अभी फ्लैशकार्ड उपलब्ध नहीं हैं' : 'No flashcards in this topic yet'}
              </Text>
              <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'NotebookLM टेम्पलेट की सहायता से तुरंत नए कार्ड्स जोड़ें या सभी यूनिट्स के कार्ड्स का अभ्यास करें।'
                  : 'Add new cards using the NotebookLM template or browse all available cards.'}
              </Text>
              <TouchableOpacity
                style={[styles.emptyStateBtn, { backgroundColor: colors.primary }]}
                onPress={() => handleSelectUnit('all')}
              >
                <Text style={styles.emptyStateBtnText}>
                  {language === 'hi' ? 'सभी कार्ड्स देखें (View All)' : 'View All Cards'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ======================================================== */}
          {/* RICH LOWER HALF: DECK STATS, QUICK NAVIGATOR & EXAM KEYS */}
          {/* ======================================================== */}

          {/* Section 1: Deck Learning Stats Summary */}
          {filteredCards.length > 0 && (
            <View
              style={[
                styles.statsSummaryCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.statsSummaryHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="stats-chart" size={15} color={colors.primary} />
                  <Text style={[styles.statsSummaryTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'इस डेक की अध्ययन प्रगति' : 'Deck Mastery Progress'}
                  </Text>
                </View>
                <Text style={[styles.statsSummaryTotal, { color: colors.textSecondary }]}>
                  {filteredCards.length} {language === 'hi' ? 'कुल कार्ड्स' : 'Total'}
                </Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={[styles.statMiniBox, { backgroundColor: colors.canvasSubtle }]}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={[styles.statMiniValue, { color: colors.textPrimary }]}>
                    {deckMasteredCount}
                  </Text>
                  <Text style={[styles.statMiniLabel, { color: colors.textSecondary }]}>
                    {language === 'hi' ? 'याद हो गए' : 'Mastered'}
                  </Text>
                </View>

                <View style={[styles.statMiniBox, { backgroundColor: colors.canvasSubtle }]}>
                  <Ionicons name="refresh-circle" size={16} color="#F59E0B" />
                  <Text style={[styles.statMiniValue, { color: colors.textPrimary }]}>
                    {deckReviewCount}
                  </Text>
                  <Text style={[styles.statMiniLabel, { color: colors.textSecondary }]}>
                    {language === 'hi' ? 'दोहराना है' : 'To Review'}
                  </Text>
                </View>

                <View style={[styles.statMiniBox, { backgroundColor: colors.canvasSubtle }]}>
                  <Ionicons name="star" size={16} color="#EAB308" />
                  <Text style={[styles.statMiniValue, { color: colors.textPrimary }]}>
                    {filteredCards.filter((c) => bookmarkedIds.includes(c.id)).length}
                  </Text>
                  <Text style={[styles.statMiniLabel, { color: colors.textSecondary }]}>
                    {language === 'hi' ? 'स्टार कार्ड्स' : 'Starred'}
                  </Text>
                </View>

                <View style={[styles.statMiniBox, { backgroundColor: colors.canvasSubtle }]}>
                  <Ionicons name="layers" size={16} color={colors.accent} />
                  <Text style={[styles.statMiniValue, { color: colors.textPrimary }]}>
                    {Math.max(0, filteredCards.length - deckMasteredCount)}
                  </Text>
                  <Text style={[styles.statMiniLabel, { color: colors.textSecondary }]}>
                    {language === 'hi' ? 'बाकी कार्ड्स' : 'Remaining'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Section 2: Interactive "Cards in this Deck" Carousel / Navigator */}
          {filteredCards.length > 0 && (
            <View style={styles.deckListSection}>
              <View style={styles.deckListSectionHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="apps" size={16} color={currentUnitMeta?.color || colors.primary} />
                  <Text style={[styles.deckListSectionTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'इस डेक के सभी कार्ड्स' : 'Cards in this Deck'}
                  </Text>
                </View>
                <Text style={[styles.deckListHint, { color: colors.textMuted }]}>
                  {language === 'hi' ? 'सीधे जाने हेतु किसी कार्ड पर टैप करें' : 'Tap to jump'}
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.miniCardsScroll}
              >
                {filteredCards.map((card, idx) => {
                  const isActive = idx === safeIndex;
                  const isCardMastered = masteredIds.includes(card.id);
                  const isCardBookmarked = bookmarkedIds.includes(card.id);
                  const frontSnippet = (card.front?.[language] || card.front?.hi || '').substring(0, 38);

                  return (
                    <TouchableOpacity
                      key={card.id}
                      style={[
                        styles.miniCardTile,
                        {
                          backgroundColor: isActive
                            ? isDark ? 'rgba(0, 112, 243, 0.18)' : '#EFF6FF'
                            : colors.card,
                          borderColor: isActive
                            ? currentUnitMeta?.color || colors.primary
                            : isCardMastered
                            ? '#10B981'
                            : colors.border,
                          borderWidth: isActive ? 2 : 1,
                        },
                      ]}
                      onPress={() => {
                        setCurrentIndex(idx);
                        setIsRevealed(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.miniCardTopRow}>
                        <Text
                          style={[
                            styles.miniCardNum,
                            {
                              color: isActive
                                ? currentUnitMeta?.color || colors.primary
                                : colors.textSecondary,
                            },
                          ]}
                        >
                          #{idx + 1}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                          {isCardBookmarked && (
                            <Ionicons name="star" size={11} color="#F59E0B" />
                          )}
                          {isCardMastered && (
                            <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                          )}
                        </View>
                      </View>

                      <Text
                        style={[
                          styles.miniCardSnippet,
                          {
                            color: isActive ? colors.textPrimary : colors.textSecondary,
                            fontWeight: isActive ? '700' : '500',
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {frontSnippet}...
                      </Text>

                      {isActive && (
                        <View
                          style={[
                            styles.miniCardActiveIndicator,
                            { backgroundColor: currentUnitMeta?.color || colors.primary },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Section 3: High-Yield Topic Revision Highlights */}
          <View
            style={[
              styles.highlightsCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftWidth: 4,
                borderLeftColor: currentUnitMeta?.color || colors.primary,
              },
            ]}
          >
            <View style={styles.highlightsHeader}>
              <Ionicons
                name="bulb"
                size={17}
                color={currentUnitMeta?.color || colors.primary}
              />
              <Text style={[styles.highlightsTitle, { color: colors.textPrimary }]}>
                {examHighlights.title[language]}
              </Text>
            </View>

            <View style={styles.highlightsList}>
              {examHighlights.points.map((pt, i) => (
                <View key={i} style={styles.highlightRow}>
                  <View
                    style={[
                      styles.highlightDot,
                      { backgroundColor: currentUnitMeta?.color || colors.primary },
                    ]}
                  />
                  <Text style={[styles.highlightText, { color: colors.textSecondary }]}>
                    {pt[language]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {/* VIEW MODE: LIST ALL CARDS (RAPID REVISION CHEATSHEET) */}
      {viewMode === 'list' && (
        <View style={styles.listViewContainer}>
          <View style={styles.listHeaderRow}>
            <Text style={[styles.listHeaderTitle, { color: colors.textPrimary }]}>
              {language === 'hi'
                ? `सभी ${filteredCards.length} कार्ड्स (फास्ट रिविजन)`
                : `All ${filteredCards.length} Cards (Rapid Revision)`}
            </Text>
            <TouchableOpacity
              style={[styles.switchBackBtn, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}
              onPress={() => setViewMode('flip')}
            >
              <Ionicons name="albums-outline" size={14} color={colors.primary} />
              <Text style={[styles.switchBackBtnText, { color: colors.primary }]}>
                {language === 'hi' ? 'फ्लिप मोड' : 'Flip Cards'}
              </Text>
            </TouchableOpacity>
          </View>

          {filteredCards.map((card, index) => {
            const isCardBookmarked = bookmarkedIds.includes(card.id);
            const isCardMastered = masteredIds.includes(card.id);

            return (
              <View
                key={card.id}
                style={[
                  styles.listCardItem,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                {/* List Item Top */}
                <View style={styles.listCardTopBar}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View
                      style={[
                        styles.listIndexBadge,
                        { backgroundColor: currentUnitMeta?.color || colors.primary },
                      ]}
                    >
                      <Text style={styles.listIndexText}>#{index + 1}</Text>
                    </View>
                    <Text style={[styles.listCategoryText, { color: colors.textSecondary }]}>
                      {card.category?.[language] || card.category?.hi || ''}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => handleToggleMastered(card.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={isCardMastered ? 'checkmark-circle' : 'checkmark-circle-outline'}
                        size={18}
                        color={isCardMastered ? '#10B981' : colors.textMuted}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleToggleBookmark(card.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={isCardBookmarked ? 'star' : 'star-outline'}
                        size={18}
                        color={isCardBookmarked ? '#F59E0B' : colors.textMuted}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Question */}
                <View style={styles.listQuestionBox}>
                  <Text style={[styles.listQuestionText, { color: colors.textPrimary }]}>
                    Q: {card.front?.[language] || card.front?.hi || ''}
                  </Text>
                  {(card.front?.en || card.front?.hi) && (
                    <Text style={[styles.listSubQuestion, { color: colors.textMuted }]}>
                      {language === 'hi' ? card.front?.en : card.front?.hi}
                    </Text>
                  )}
                </View>

                {/* Answer Box */}
                <View
                  style={[
                    styles.listAnswerBox,
                    {
                      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : '#F0FDF4',
                      borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : '#BBF7D0',
                    },
                  ]}
                >
                  <Text style={[styles.listAnswerText, { color: isDark ? '#A7F3D0' : '#065F46' }]}>
                    Ans: {card.back?.[language] || card.back?.hi || ''}
                  </Text>
                  {card.subtext && (
                    <Text style={[styles.listTipText, { color: colors.textSecondary }]}>
                      💡 {card.subtext?.[language] || card.subtext?.hi || ''}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  headerBox: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10B981',
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
  },
  modeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  modeToggleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  iconActionBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
  },

  // Tier 1: Unit Pills
  unitScroll: {
    gap: 8,
    paddingVertical: 8,
  },
  unitPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
  },
  unitPillText: {
    fontSize: 12,
  },

  // Tier 2: Topic Chips
  topicScroll: {
    gap: 6,
    paddingBottom: 10,
  },
  topicChip: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  topicChipText: {
    fontSize: 11,
  },

  // Progress Bar Strip
  deckProgressContainer: {
    marginBottom: 10,
    marginTop: 2,
  },
  deckProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  topicBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    gap: 5,
    maxWidth: SCREEN_WIDTH * 0.62,
  },
  topicBadgePillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  counterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  percentText: {
    fontSize: 10,
    fontWeight: '800',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Hero Interactive Flashcard
  cardSection: {
    marginBottom: 14,
  },
  heroFlashcard: {
    borderRadius: 22,
    borderWidth: 1,
    borderTopWidth: 5,
    minHeight: 330,
    padding: 18,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sideBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 5,
  },
  sideBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  statusChipMastered: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  statusChipTextMastered: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '800',
  },
  statusChipReview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  statusChipTextReview: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '800',
  },
  starBtn: {
    padding: 6,
    borderRadius: 8,
  },

  // Card Content
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  frontBody: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  frontIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 112, 243, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  frontText: {
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 27,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  frontSecondaryText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  backBody: {
    gap: 10,
  },
  backSuccessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  backSuccessTitle: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  backText: {
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  backSecondaryText: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  subtextCallout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginTop: 6,
  },
  subtextCalloutLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 2,
  },
  subtextCalloutContent: {
    fontSize: 12,
    lineHeight: 17,
  },
  cardFooterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 6,
  },
  flipNoticeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Mastery Buttons Row (Spaced repetition)
  masteryActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  masteryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
  },
  masteryBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  flipCenterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flipCenterBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Navigation Buttons
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  navResetBtn: {
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  navBtnPrimary: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  navBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 16,
    gap: 6,
  },
  navBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // Empty State Card
  emptyStateCard: {
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginBottom: 16,
  },
  emptyStateTitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 290,
  },
  emptyStateBtn: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
  },
  emptyStateBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },

  // Lower Section: Stats Summary
  statsSummaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  statsSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statsSummaryTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  statsSummaryTotal: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statMiniBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
    gap: 2,
  },
  statMiniValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  statMiniLabel: {
    fontSize: 9,
    fontWeight: '600',
  },

  // Lower Section: Deck Navigator Carousel
  deckListSection: {
    marginBottom: 16,
  },
  deckListSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deckListSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  deckListHint: {
    fontSize: 11,
  },
  miniCardsScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  miniCardTile: {
    width: 130,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'space-between',
    minHeight: 74,
    position: 'relative',
    overflow: 'hidden',
  },
  miniCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  miniCardNum: {
    fontSize: 10,
    fontWeight: '800',
  },
  miniCardSnippet: {
    fontSize: 11,
    lineHeight: 15,
  },
  miniCardActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  // Lower Section: Exam Highlights
  highlightsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  highlightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  highlightsTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  highlightsList: {
    gap: 8,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  highlightText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },

  // View Mode: List
  listViewContainer: {
    marginTop: 4,
    gap: 12,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  listHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  switchBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  switchBackBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  listCardItem: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  listCardTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listIndexBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  listIndexText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  listCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  listQuestionBox: {
    gap: 2,
  },
  listQuestionText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  listSubQuestion: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  listAnswerBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  listAnswerText: {
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  listTipText: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
});
