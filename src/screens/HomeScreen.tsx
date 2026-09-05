import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, categoryColorMap, difficultyColorMap } from '../theme';
import { QuestionCard } from '../components/QuestionCard';
import { QUESTIONS } from '../data/questions';
import { StorageService } from '../storage/storageService';
import { ActiveTab } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onStartMockTest: (testId: string) => void;
  onSelectUnitNote: (unitId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onStartMockTest,
  onSelectUnitNote,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [dailyQuestion] = useState(QUESTIONS[0]); // High-yield daily question
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedLaw, setExpandedLaw] = useState<number | null>(null);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    avgAccuracy: 0,
    totalQuestionsAttempted: 0,
    bookmarkedCount: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const userStats = await StorageService.getStats();
    setStats(userStats);
    const bookmarked = await StorageService.isBookmarked(dailyQuestion.id);
    setIsBookmarked(bookmarked);
  };

  const handleToggleBookmark = async () => {
    const added = await StorageService.toggleBookmark(dailyQuestion.id);
    setIsBookmarked(added);
    const userStats = await StorageService.getStats();
    setStats(userStats);
  };

  const lawsData = [
    {
      num: 1,
      hi: 'पुस्तकें उपयोग के लिए हैं',
      en: 'Books are for use',
      tip: language === 'hi' ? 'पुस्तकालय स्थान, समय एवं ओपन एक्सेस पर बल।' : 'Emphasizes library location, hours & open access.',
      color: '#0070F3',
    },
    {
      num: 2,
      hi: 'प्रत्येक पाठक को उसकी पुस्तक मिले',
      en: 'Every reader his/her book',
      tip: language === 'hi' ? 'पाठकों की विविधता एवं शिक्षा का अधिकार।' : 'Addresses user diversity & right to education.',
      color: '#10B981',
    },
    {
      num: 3,
      hi: 'प्रत्येक पुस्तक को उसका पाठक मिले',
      en: 'Every book its reader',
      tip: language === 'hi' ? 'ओपन एक्सेस प्रणाली एवं पुस्तक सूचीकरण।' : 'Advocates open shelf access & cataloguing.',
      color: '#8B5CF6',
    },
    {
      num: 4,
      hi: 'पाठक का समय बचाएं',
      en: 'Save the time of the reader',
      tip: language === 'hi' ? 'वर्गीकरण, संदर्भ सेवा व पुस्तकालय स्वचालन।' : 'Focuses on classification, reference & automation.',
      color: '#06B6D4',
    },
    {
      num: 5,
      hi: 'पुस्तकालय एक वर्धनशील संस्था है',
      en: 'Library is a growing organism',
      tip: language === 'hi' ? 'भविष्य की पुस्तकों, कर्मचारियों व भवन विस्तार का नियोजन।' : 'Plans for collection, staff & building growth.',
      color: '#F59E0B',
    },
  ];

  const heroGradients = isDark
    ? (['#0E1F38', '#0A1220', '#07090E'] as const)
    : (['#1E3A8A', '#1D4ED8', '#2563EB'] as const);

  const heroBtnGradients = isDark
    ? (['#0070F3', '#7928CA'] as const)
    : (['#FFFFFF', '#F8FAFC'] as const);

  const heroBtnTextColor = isDark ? '#FFFFFF' : '#1E3A8A';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Vercel-Inspired Hero Card with Multi-stop Gradient */}
      <View style={[styles.heroOuter, { borderColor: isDark ? '#262626' : '#BFDBFE' }]}>
        <LinearGradient
          colors={heroGradients}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          {/* Top Decorative Multi-color Gradient Accent Strip */}
          <View style={styles.gradientAccentBar}>
            <View style={[styles.gradientSegment, { backgroundColor: '#00DFD8' }]} />
            <View style={[styles.gradientSegment, { backgroundColor: '#0070F3' }]} />
            <View style={[styles.gradientSegment, { backgroundColor: '#7928CA' }]} />
            <View style={[styles.gradientSegment, { backgroundColor: '#FF0080' }]} />
            <View style={[styles.gradientSegment, { backgroundColor: '#F5A623' }]} />
          </View>

          <View style={styles.heroContent}>
            {/* Eyebrow and Status Tag */}
            <View style={styles.heroTopRow}>
              <View style={styles.eyebrowBadge}>
                <Text style={styles.eyebrowText}>
                  BSEB LET & BPSC • 2026
                </Text>
              </View>

              <View style={styles.liveStatusTag}>
                <View style={styles.pulseDot} />
                <Text style={styles.liveStatusText}>CBT FORMAT</Text>
              </View>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.heroTitle}>
              {language === 'hi'
                ? 'बिहार पुस्तकालयाध्यक्ष भर्ती परीक्षा 2026'
                : 'Bihar School Librarian Exam 2026'}
            </Text>

            <Text style={styles.heroSubtitle}>
              {language === 'hi'
                ? 'कक्षा 9-12 उच्च माध्यमिक एवं माध्यमिक विद्यालय लाइब्रेरियन पद हेतु संपूर्ण तैयारी'
                : 'Comprehensive prep for Higher Secondary & Secondary School Librarian posts'}
            </Text>

            {/* CTA Buttons Row */}
            <View style={styles.heroActionRow}>
              <TouchableOpacity
                onPress={() => onStartMockTest('test_full_1')}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={heroBtnGradients}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryPillBtn}
                >
                  <Ionicons name="play" size={15} color={heroBtnTextColor} />
                  <Text style={[styles.primaryPillText, { color: heroBtnTextColor }]}>
                    {t.actionFullMock}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryPillBtn}
                onPress={() => onNavigateTab('syllabus')}
                activeOpacity={0.8}
              >
                <Ionicons name="document-text-outline" size={15} color="#FFFFFF" />
                <Text style={styles.secondaryPillText}>{t.tabSyllabus}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Readiness & Executive Performance Matrix */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t.quickStatsTitle}
          </Text>
          <View
            style={[
              styles.targetChip,
              {
                backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FFEDD5',
              },
            ]}
          >
            <Ionicons name="flame" size={13} color="#EA580C" />
            <Text style={[styles.targetChipText, { color: '#EA580C' }]}>
              {language === 'hi' ? 'दैनिक लक्ष्य: 25 प्रश्न' : 'Goal: 25 Qs / Day'}
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {/* Card 1: Tests Attempted */}
          <TouchableOpacity
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('tests')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.statIconBadge,
                {
                  backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
                },
              ]}
            >
              <Ionicons name="checkmark-done" size={18} color="#10B981" />
            </View>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {stats.totalAttempts}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.testsAttempted}
            </Text>
          </TouchableOpacity>

          {/* Card 2: Accuracy Rate */}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.statIconBadge,
                {
                  backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                },
              ]}
            >
              <Ionicons name="speedometer-outline" size={18} color="#0070F3" />
            </View>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {stats.avgAccuracy}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.avgAccuracy}
            </Text>
          </View>

          {/* Card 3: Saved Questions */}
          <TouchableOpacity
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('bookmarks')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.statIconBadge,
                {
                  backgroundColor: isDark ? 'rgba(245, 166, 35, 0.15)' : '#FFFBEB',
                },
              ]}
            >
              <Ionicons name="bookmark" size={18} color="#F5A623" />
            </View>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {stats.bookmarkedCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {t.savedCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Challenge Question */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <View style={styles.dailyHeaderLeft}>
            <Ionicons name="flash" size={18} color="#EA580C" />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {t.dailyQuestionTitle}
            </Text>
          </View>
          <View
            style={[
              styles.dailyBadge,
              {
                backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FFEDD5',
              },
            ]}
          >
            <Text style={styles.dailyBadgeText}>{t.dailyQuestionBadge}</Text>
          </View>
        </View>

        <QuestionCard
          question={dailyQuestion}
          selectedOption={selectedOption}
          onSelectOption={(opt) => setSelectedOption(opt)}
          showSolution={isAnswerChecked}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
        />

        <View style={styles.dailyActionRow}>
          {!isAnswerChecked ? (
            <TouchableOpacity
              style={[
                styles.checkAnswerPill,
                {
                  backgroundColor: selectedOption ? colors.primary : (isDark ? '#262626' : '#E4E4E7'),
                },
              ]}
              disabled={!selectedOption}
              onPress={() => setIsAnswerChecked(true)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.checkAnswerPillText,
                  {
                    color: selectedOption ? colors.textOnPrimary : colors.textMuted,
                  },
                ]}
              >
                {t.checkAnswer}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.resetDailyPill,
                {
                  backgroundColor: colors.canvasSubtle,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                setSelectedOption(null);
                setIsAnswerChecked(false);
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={15} color={colors.textPrimary} />
              <Text style={[styles.resetDailyText, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'पुनः प्रयास करें (Reset)' : 'Reset Challenge'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Core Preparation Pillars (Bento Grid Architecture) */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <View style={styles.bentoHeaderLeft}>
            <Ionicons name="grid" size={17} color={colors.accent} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {language === 'hi' ? 'तैयारी के मुख्य स्तंभ' : 'Preparation Pillars'}
            </Text>
          </View>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            {language === 'hi' ? '4 अध्ययन आयाम' : '4 Core Modes'}
          </Text>
        </View>

        <View style={styles.bentoContainer}>
          {/* Bento Tile 1: CBT Mock Tests - Full Width Featured Simulator Tile */}
          <TouchableOpacity
            style={[
              styles.bentoHeroCard,
              {
                backgroundColor: colors.cardElevated,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('tests')}
            activeOpacity={0.85}
          >
            {/* Top Bar with Simulator Tag & Live Spec Chips */}
            <View style={styles.bentoHeroTopBar}>
              <View
                style={[
                  styles.bentoTagBadge,
                  {
                    backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                    borderColor: isDark ? 'rgba(0, 112, 243, 0.35)' : '#BFDBFE',
                  },
                ]}
              >
                <View style={[styles.pulseDot, { backgroundColor: '#0070F3' }]} />
                <Text style={[styles.bentoTagText, { color: '#0070F3' }]}>
                  CBT EXAM SIMULATOR
                </Text>
              </View>

              <View style={styles.bentoChipRow}>
                <View style={[styles.microChip, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                  <Ionicons name="timer-outline" size={12} color={colors.textSecondary} />
                  <Text style={[styles.microChipText, { color: colors.textSecondary }]}>120 Mins</Text>
                </View>
                <View style={[styles.microChip, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                  <Ionicons name="trophy-outline" size={12} color={colors.textSecondary} />
                  <Text style={[styles.microChipText, { color: colors.textSecondary }]}>100 Marks</Text>
                </View>
              </View>
            </View>

            <View style={styles.bentoHeroBody}>
              <View
                style={[
                  styles.bentoHeroIconWrapper,
                  {
                    backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                    borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
                  },
                ]}
              >
                <Ionicons name="newspaper" size={26} color="#0070F3" />
              </View>

              <View style={styles.bentoHeroText}>
                <Text style={[styles.bentoHeroTitle, { color: colors.textPrimary }]}>
                  {t.actionFullMock}
                </Text>
                <Text style={[styles.bentoHeroDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? '100 प्रश्न • वास्तविक BSEB LET परीक्षा सॉफ्टवेयर जैसा अनुभव'
                    : '100 Questions • Simulated CBT examination environment'}
                </Text>
              </View>
            </View>

            <View style={[styles.bentoHeroFooter, { borderTopColor: colors.border }]}>
              <View style={[styles.bentoHeroStatus, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5' }]}>
                <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                <Text style={[styles.bentoHeroStatusText, { color: '#10B981' }]}>
                  {language === 'hi' ? 'तत्काल स्कोरकार्ड व विश्लेषण' : 'Instant Scorecard & Analysis'}
                </Text>
              </View>

              <LinearGradient
                colors={['#0070F3', '#0052CC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bentoHeroBtn}
              >
                <Text style={styles.bentoHeroBtnText}>{t.startTest}</Text>
                <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </TouchableOpacity>

          {/* Bento Split Row: Notes (Emerald) & Flashcards (Amber) */}
          <View style={styles.bentoSplitRow}>
            {/* Tile 2: Study Notes Tower */}
            <TouchableOpacity
              style={[
                styles.bentoTowerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderTopColor: '#10B981',
                  borderTopWidth: 3,
                },
              ]}
              onPress={() => onNavigateTab('notes')}
              activeOpacity={0.8}
            >
              <View style={styles.bentoTowerTop}>
                <View
                  style={[
                    styles.bentoTowerIcon,
                    {
                      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
                      borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
                    },
                  ]}
                >
                  <Ionicons name="book" size={22} color="#10B981" />
                </View>
                <View
                  style={[
                    styles.bentoBadgePill,
                    { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5' },
                  ]}
                >
                  <Text style={[styles.bentoBadgePillText, { color: '#10B981' }]}>7 UNITS</Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.actionStudyNotes}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'DDC/CC वर्गीकरण, रंगनाथन व LIS थ्योरी'
                  : 'DDC/CC rules, 5 Laws & complete LIS theory'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#10B981' }]}>
                  {language === 'hi' ? 'अध्ययन करें' : 'Explore'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#10B981" />
              </View>
            </TouchableOpacity>

            {/* Tile 3: Flashcards Tower */}
            <TouchableOpacity
              style={[
                styles.bentoTowerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderTopColor: '#F59E0B',
                  borderTopWidth: 3,
                },
              ]}
              onPress={() => onNavigateTab('flashcards')}
              activeOpacity={0.8}
            >
              <View style={styles.bentoTowerTop}>
                <View
                  style={[
                    styles.bentoTowerIcon,
                    {
                      backgroundColor: isDark ? 'rgba(245, 166, 35, 0.15)' : '#FFFBEB',
                      borderColor: isDark ? 'rgba(245, 166, 35, 0.3)' : '#FDE68A',
                    },
                  ]}
                >
                  <Ionicons name="flash" size={22} color="#F59E0B" />
                </View>
                <View
                  style={[
                    styles.bentoBadgePill,
                    { backgroundColor: isDark ? 'rgba(245, 166, 35, 0.15)' : '#FFFBEB' },
                  ]}
                >
                  <Text style={[styles.bentoBadgePillText, { color: '#F59E0B' }]}>RECALL</Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.actionFlashcards}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'महत्वपूर्ण वर्ष, नियम, संस्थापक व कोड'
                  : 'Key dates, editions, rules & founders'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#F59E0B' }]}>
                  {language === 'hi' ? 'कार्ड्स देखें' : 'Flip Cards'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#F59E0B" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Bento Tile 4: Official Syllabus & Blueprint - Horizontal Ribbon Banner */}
          <TouchableOpacity
            style={[
              styles.bentoBannerCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftColor: '#8B5CF6',
                borderLeftWidth: 4,
              },
            ]}
            onPress={() => onNavigateTab('syllabus')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.bentoBannerIcon,
                {
                  backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#F5F3FF',
                  borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : '#DDD6FE',
                },
              ]}
            >
              <Ionicons name="map-outline" size={24} color="#8B5CF6" />
            </View>

            <View style={styles.bentoBannerContent}>
              <View style={styles.bentoBannerTagRow}>
                <View
                  style={[
                    styles.bentoMiniBadge,
                    { backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#F5F3FF' },
                  ]}
                >
                  <Text style={[styles.bentoMiniBadgeText, { color: '#8B5CF6' }]}>OFFICIAL BLUEPRINT</Text>
                </View>
                <Text style={[styles.bentoBannerExtra, { color: colors.textMuted }]}>BSEB 2025-26</Text>
              </View>

              <Text style={[styles.bentoBannerTitle, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'पाठ्यक्रम एवं परीक्षा पैटर्न' : 'Syllabus & Exam Pattern'}
              </Text>
              <Text style={[styles.bentoBannerDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                {language === 'hi'
                  ? 'प्रश्न वितरण, अर्हता अंक (Cut-off) एवं अंकन पद्धति'
                  : 'Paper 1 & 2 weightage, cutoff criteria & negative marking'}
              </Text>
            </View>

            <View
              style={[
                styles.bentoBannerAction,
                {
                  backgroundColor: isDark ? 'rgba(139, 92, 246, 0.12)' : '#F5F3FF',
                  borderColor: isDark ? 'rgba(139, 92, 246, 0.25)' : '#DDD6FE',
                },
              ]}
            >
              <Ionicons name="arrow-forward" size={15} color="#8B5CF6" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dr. S.R. Ranganathan 5 Laws Interactive Showcase */}
      <View style={styles.sectionWrapper}>
        <View
          style={[
            styles.lawsCard,
            {
              backgroundColor: colors.cardElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.lawsHeader}>
            <View
              style={[
                styles.lawsIconBadge,
                {
                  backgroundColor: isDark ? 'rgba(121, 40, 202, 0.2)' : '#F5F3FF',
                },
              ]}
            >
              <Ionicons name="library" size={18} color="#7928CA" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.lawsTitle, { color: colors.textPrimary }]}>
                {t.lawsTitle}
              </Text>
              <Text style={[styles.lawsSubtitle, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'पुस्तकालय विज्ञान के 5 मूलभूत सूत्र (1931)'
                  : 'Five Fundamental Principles of Library Science (1931)'}
              </Text>
            </View>
          </View>

          <View style={styles.lawsList}>
            {lawsData.map((item) => {
              const isExpanded = expandedLaw === item.num;
              return (
                <TouchableOpacity
                  key={item.num}
                  style={[
                    styles.lawItemCard,
                    {
                      backgroundColor: colors.canvasSubtle,
                      borderColor: colors.border,
                      borderLeftColor: item.color,
                      borderLeftWidth: 3,
                    },
                  ]}
                  onPress={() => setExpandedLaw(isExpanded ? null : item.num)}
                  activeOpacity={0.7}
                >
                  <View style={styles.lawItemRow}>
                    <View
                      style={[
                        styles.lawNumberBadge,
                        {
                          backgroundColor: item.color,
                        },
                      ]}
                    >
                      <Text style={styles.lawNumberText}>{item.num}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.lawText, { color: colors.textPrimary }]}>
                        {language === 'hi' ? item.hi : item.en}
                      </Text>
                      <Text style={[styles.lawSubtext, { color: colors.textMuted }]}>
                        {language === 'hi' ? item.en : item.hi}
                      </Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={colors.textSecondary}
                    />
                  </View>

                  {isExpanded && (
                    <View
                      style={[
                        styles.lawDetailBox,
                        {
                          backgroundColor: isDark ? '#141414' : '#FFFFFF',
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <View style={styles.lawTipRow}>
                        <Ionicons name="information-circle" size={15} color={item.color} />
                        <Text style={[styles.lawTipText, { color: colors.textSecondary }]}>
                          <Text style={{ fontWeight: '800', color: colors.textPrimary }}>
                            {language === 'hi' ? 'परीक्षा संदर्भ: ' : 'Exam Insight: '}
                          </Text>
                          {item.tip}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
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
    marginTop: 14,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heroGradient: {
    width: '100%',
  },
  gradientAccentBar: {
    height: 4,
    flexDirection: 'row',
    width: '100%',
  },
  gradientSegment: {
    flex: 1,
    height: '100%',
  },
  heroContent: {
    padding: 20,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eyebrowBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  eyebrowText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  liveStatusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 1,
    borderColor: '#10B981',
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 27,
    letterSpacing: -0.4,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 18,
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 6,
  },
  primaryPillText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  secondaryPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 5,
  },
  secondaryPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionWrapper: {
    marginTop: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  targetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  targetChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 1,
  },
  statIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  dailyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dailyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  dailyBadgeText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '800',
  },
  dailyActionRow: {
    marginTop: 8,
  },
  checkAnswerPill: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  checkAnswerPillText: {
    fontSize: 14,
    fontWeight: '800',
  },
  resetDailyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  resetDailyText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bentoHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bentoContainer: {
    gap: 12,
  },
  bentoHeroCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  bentoHeroTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  bentoTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  bentoTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bentoChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  microChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    borderWidth: 1,
  },
  microChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bentoHeroBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  bentoHeroIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bentoHeroText: {
    flex: 1,
  },
  bentoHeroTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  bentoHeroDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  bentoHeroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  bentoHeroStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bentoHeroStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bentoHeroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 7.5,
    borderRadius: 10,
  },
  bentoHeroBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  bentoSplitRow: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoTowerCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    minHeight: 175,
    justifyContent: 'space-between',
  },
  bentoTowerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bentoTowerIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bentoBadgePill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  bentoBadgePillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  bentoTowerTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 5,
  },
  bentoTowerDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 10,
  },
  bentoTowerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  bentoLinkText: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  bentoBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    gap: 12,
  },
  bentoBannerIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bentoBannerContent: {
    flex: 1,
  },
  bentoBannerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  bentoMiniBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  bentoMiniBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bentoBannerExtra: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  bentoBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  bentoBannerDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  bentoBannerAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  lawsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  lawsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  lawsIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawsTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  lawsSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  lawsList: {
    gap: 8,
  },
  lawItemCard: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  lawItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lawNumberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lawNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  lawText: {
    fontSize: 13,
    fontWeight: '700',
  },
  lawSubtext: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  lawDetailBox: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  lawTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  lawTipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
});
