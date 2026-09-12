import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, categoryColorMap, difficultyColorMap } from '../theme';
import { QuestionCard } from '../components/QuestionCard';
import { DataService } from '../services/dataService';
import { StorageService } from '../storage/storageService';
import { DailyContentService } from '../services/dailyContentService';
import { ActiveTab, Question, OneLiner } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onStartQuiz: (quizId: string) => void;
  onSelectUnitNote: (unitId: string) => void;
  onStartMockTest?: (testId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onStartQuiz,
  onSelectUnitNote,
  onStartMockTest,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [dailyQuestion, setDailyQuestion] = useState<Question | null>(null);
  const [spotlightOneLiner, setSpotlightOneLiner] = useState<OneLiner | null>(null);
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
  const [oneLinersCount, setOneLinersCount] = useState<number>(725);
  const [flashcardsCount, setFlashcardsCount] = useState<number>(457);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const userStats = await StorageService.getStats();
    setStats(userStats);

    const [questions, oneLiners, flashcards] = await Promise.all([
      DataService.getQuestions(),
      DataService.getOneLiners(),
      DataService.getFlashcards(),
    ]);

    if (questions && questions.length > 0) {
      const q = DailyContentService.getDailyQuestion(questions);
      setDailyQuestion(q);
      if (q) {
        const bookmarked = await StorageService.isBookmarked(q.id);
        setIsBookmarked(bookmarked);
      }
    }

    if (oneLiners && oneLiners.length > 0) {
      const ol = DailyContentService.getDailyOneLiner(oneLiners);
      setSpotlightOneLiner(ol);
      setOneLinersCount(oneLiners.length);
    }

    if (flashcards && flashcards.length > 0) {
      setFlashcardsCount(flashcards.length);
    }
  };

  const handleToggleBookmark = async () => {
    if (!dailyQuestion) return;
    const added = await StorageService.toggleBookmark(dailyQuestion.id);
    setIsBookmarked(added);
    const userStats = await StorageService.getStats();
    setStats(userStats);
  };

  const handleShareDailyQuestion = () => {
    if (!dailyQuestion) return;
    const qText = dailyQuestion.question?.[language] || dailyQuestion.question?.['hi'] || '';
    const optA = dailyQuestion.options?.A?.[language] || dailyQuestion.options?.A?.['hi'] || '';
    const optB = dailyQuestion.options?.B?.[language] || dailyQuestion.options?.B?.['hi'] || '';
    const optC = dailyQuestion.options?.C?.[language] || dailyQuestion.options?.C?.['hi'] || '';
    const optD = dailyQuestion.options?.D?.[language] || dailyQuestion.options?.D?.['hi'] || '';

    const shareUrl = 'https://play.google.com/store/apps/details?id=com.biharlibrarian.examninja';
    const message = language === 'hi'
      ? `❓ *बिहार लाइब्रेरियन परीक्षा 2026 - आज का प्रश्न:*

"${qText}"

(A) ${optA}
(B) ${optB}
(C) ${optC}
(D) ${optD}

🎯 *क्या आपको सही उत्तर पता है?*
विस्तृत व्याख्या एवं 1,000+ प्रश्नों के अभ्यास के लिए *Bihar Librarian Ninja* ऐप डाउनलोड करें:
📲 ${shareUrl}`
      : `❓ *Bihar Librarian Exam 2026 - Today's Question:*

"${qText}"

(A) ${optA}
(B) ${optB}
(C) ${optC}
(D) ${optD}

🎯 *Do you know the answer?*
Download *Bihar Librarian Ninja* for explanations and practice:
📲 ${shareUrl}`;

    Share.share({
      message,
      title: language === 'hi' ? 'आज का प्रश्न' : "Today's Question",
    }).catch(() => {});
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

              <View style={{ flexDirection: 'row', gap: 6 }}>
                <View style={[styles.liveStatusTag, { backgroundColor: 'rgba(59, 130, 246, 0.25)', borderColor: '#3B82F6' }]}>
                  <Ionicons name="flash-outline" size={10} color="#93C5FD" />
                  <Text style={styles.liveStatusText}>100% OFFLINE</Text>
                </View>

                <View style={styles.liveStatusTag}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.liveStatusText}>CBT FORMAT</Text>
                </View>
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
                onPress={() =>
                  onStartQuiz
                    ? onStartQuiz('quiz_daily')
                    : onStartMockTest && onStartMockTest('quiz_daily')
                }
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
                    {t.actionDailyQuiz}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryPillBtn}
                onPress={() => onNavigateTab('oneliners')}
                activeOpacity={0.8}
              >
                <Ionicons name="sparkles" size={15} color="#FFFFFF" />
                <Text style={styles.secondaryPillText}>{t.tabOneLiners}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Readiness & Executive Performance Matrix */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {t.quickStatsTitle}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5', paddingHorizontal: 7, paddingVertical: 2.5, borderRadius: 10, borderWidth: 1, borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0' }}>
              <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#10B981', marginRight: 4 }} />
              <Text style={{ fontSize: 9.5, fontWeight: '700', color: '#10B981' }}>
                Supabase Live
              </Text>
            </View>
          </View>
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
          {/* Card 1: Quizzes Solved */}
          <TouchableOpacity
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('quiz')}
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
      {dailyQuestion && (
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
            <View style={styles.dailyButtonsGrid}>
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
                    {language === 'hi' ? 'पुनः प्रयास' : 'Reset'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.shareWhatsAppPill,
                  {
                    backgroundColor: isDark ? 'rgba(22, 101, 52, 0.25)' : '#ECFDF5',
                    borderColor: isDark ? 'rgba(34, 197, 94, 0.4)' : '#A7F3D0',
                  },
                ]}
                onPress={handleShareDailyQuestion}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-whatsapp" size={16} color="#166534" />
                <Text style={styles.shareWhatsAppText}>
                  {t.askOnWhatsApp || 'WhatsApp पर पूछें'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Featured Today's One-Liner Spotlight */}
      {spotlightOneLiner && (
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <View style={styles.dailyHeaderLeft}>
              <Ionicons name="sparkles" size={18} color="#EA580C" />
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'आज का वन-लाइनर तथ्य' : "Today's One-Liner Fact"}
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
              <Text style={styles.dailyBadgeText}>{t.highYieldBadge}</Text>
            </View>
          </View>

          <View
            style={[
              styles.oneLinerSpotlightCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftColor: '#EA580C',
                borderLeftWidth: 4,
              },
            ]}
          >
            <View style={styles.spotlightTopRow}>
              <View style={[styles.spotlightCatBadge, { backgroundColor: colors.canvasSubtle }]}>
                <Text style={[styles.spotlightCatText, { color: colors.textSecondary }]}>
                  {spotlightOneLiner.topic[language]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    message: `📌 *${spotlightOneLiner.topic[language]}*\n\n"${spotlightOneLiner.statement[language]}"\n\n🎯 बिहार लाइब्रेरियन परीक्षा 2026 - Bihar Librarian Ninja App 📚`,
                  });
                }}
                style={styles.spotlightShareBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-whatsapp" size={14} color="#166534" />
                <Text style={styles.spotlightShareText}>Share</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.spotlightStatement, { color: colors.textPrimary }]}>
              {spotlightOneLiner.statement[language]}
            </Text>

            <TouchableOpacity
              style={[styles.spotlightFooterBtn, { borderTopColor: colors.border }]}
              onPress={() => onNavigateTab('oneliners')}
              activeOpacity={0.7}
            >
              <Text style={[styles.spotlightFooterText, { color: colors.primary }]}>
                {language === 'hi'
                  ? `सभी ${oneLinersCount}+ महत्वपूर्ण वन-लाइनर पढ़ें`
                  : `Explore All ${oneLinersCount}+ One-Liners`}
              </Text>
              <Ionicons name="arrow-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}

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
          {/* Bento Tile 1: Daily & Topic Quizzes - Full Width Featured Hub */}
          <TouchableOpacity
            style={[
              styles.bentoHeroCard,
              {
                backgroundColor: colors.cardElevated,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('quiz')}
            activeOpacity={0.85}
          >
            {/* Top Bar with Quiz Tag & Live Spec Chips */}
            <View style={styles.bentoHeroTopBar}>
              <View
                style={[
                  styles.bentoTagBadge,
                  {
                    backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                    borderColor: isDark ? 'rgba(234, 88, 12, 0.35)' : '#FED7AA',
                  },
                ]}
              >
                <View style={[styles.pulseDot, { backgroundColor: '#EA580C' }]} />
                <Text style={[styles.bentoTagText, { color: '#EA580C' }]}>
                  INTERACTIVE QUIZ HUB
                </Text>
              </View>

              <View style={styles.bentoChipRow}>
                <View style={[styles.microChip, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                  <Ionicons name="help-circle-outline" size={12} color={colors.textSecondary} />
                  <Text style={[styles.microChipText, { color: colors.textSecondary }]}>10 Qs</Text>
                </View>
                <View style={[styles.microChip, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                  <Ionicons name="flash" size={12} color="#EA580C" />
                  <Text style={[styles.microChipText, { color: '#EA580C' }]}>+50 XP</Text>
                </View>
              </View>
            </View>

            <View style={styles.bentoHeroBody}>
              <View
                style={[
                  styles.bentoHeroIconWrapper,
                  {
                    backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                    borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FED7AA',
                  },
                ]}
              >
                <Ionicons name="trophy" size={26} color="#EA580C" />
              </View>

              <View style={styles.bentoHeroText}>
                <Text style={[styles.bentoHeroTitle, { color: colors.textPrimary }]}>
                  {t.actionDailyQuiz}
                </Text>
                <Text style={[styles.bentoHeroDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? '10 प्रश्न • तुरंत व्याख्या • स्कोर शेयर करके दोस्तों को चुनौती दें'
                    : '10 Questions • Instant explanations • Challenge friends on WhatsApp'}
                </Text>
              </View>
            </View>

            <View style={[styles.bentoHeroFooter, { borderTopColor: colors.border }]}>
              <View style={[styles.bentoHeroStatus, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5' }]}>
                <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                <Text style={[styles.bentoHeroStatusText, { color: '#10B981' }]}>
                  {language === 'hi' ? 'तुरंत सही/गलत फीडबैक' : 'Instant Feedback Mode'}
                </Text>
              </View>

              <LinearGradient
                colors={['#EA580C', '#C2410C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bentoHeroBtn}
              >
                <Text style={styles.bentoHeroBtnText}>{t.playQuiz}</Text>
                <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </TouchableOpacity>

          {/* Bento Split Row 1: One-Liners (Amber) & Study Notes (Emerald) */}
          <View style={styles.bentoSplitRow}>
            {/* Tile 2: One-Liners Tower */}
            <TouchableOpacity
              style={[
                styles.bentoTowerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderTopColor: '#0070F3',
                  borderTopWidth: 3,
                },
              ]}
              onPress={() => onNavigateTab('oneliners')}
              activeOpacity={0.8}
            >
              <View style={styles.bentoTowerTop}>
                <View
                  style={[
                    styles.bentoTowerIcon,
                    {
                      backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                      borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
                    },
                  ]}
                >
                  <Ionicons name="sparkles" size={22} color="#0070F3" />
                </View>
                <View
                  style={[
                    styles.bentoBadgePill,
                    { backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF' },
                  ]}
                >
                  <Text style={[styles.bentoBadgePillText, { color: '#0070F3' }]}>
                    {oneLinersCount}+ FACTS
                  </Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.tabOneLiners}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'परीक्षा के अचूक तथ्य, वर्ष, नियम व कोड्स'
                  : 'High-yield exam facts, dates & rules'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#0070F3' }]}>
                  {language === 'hi' ? 'तथ्य पढ़ें' : 'Read Facts'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#0070F3" />
              </View>
            </TouchableOpacity>

            {/* Tile 3: Study Notes Tower */}
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
                  <Text style={[styles.bentoBadgePillText, { color: '#10B981' }]}>5 UNITS • 29 TOPICS</Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.actionStudyNotes}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'DDC/CC, प्रबंधन, 5 सूत्र व सम्पूर्ण थ्योरी'
                  : 'DDC/CC, Management, 5 Laws & theory'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#10B981' }]}>
                  {language === 'hi' ? 'अध्ययन करें' : 'Explore'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#10B981" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Bento Split Row 2: Flashcards (Purple) & Syllabus (Indigo) */}
          <View style={styles.bentoSplitRow}>
            {/* Tile 4: Flashcards */}
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
                  <Text style={[styles.bentoBadgePillText, { color: '#F59E0B' }]}>
                    {flashcardsCount}+ CARDS
                  </Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.actionFlashcards}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'रंगनाथन के नियम, वर्ष व DDC वर्गीकरण'
                  : 'Key dates, editions, rules & founders'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#F59E0B' }]}>
                  {language === 'hi' ? 'कार्ड्स देखें' : 'Flip Cards'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#F59E0B" />
              </View>
            </TouchableOpacity>

            {/* Tile 5: Official Syllabus */}
            <TouchableOpacity
              style={[
                styles.bentoTowerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderTopColor: '#8B5CF6',
                  borderTopWidth: 3,
                },
              ]}
              onPress={() => onNavigateTab('syllabus')}
              activeOpacity={0.8}
            >
              <View style={styles.bentoTowerTop}>
                <View
                  style={[
                    styles.bentoTowerIcon,
                    {
                      backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#F5F3FF',
                      borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : '#DDD6FE',
                    },
                  ]}
                >
                  <Ionicons name="map-outline" size={22} color="#8B5CF6" />
                </View>
                <View
                  style={[
                    styles.bentoBadgePill,
                    { backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#F5F3FF' },
                  ]}
                >
                  <Text style={[styles.bentoBadgePillText, { color: '#8B5CF6' }]}>PATTERN</Text>
                </View>
              </View>

              <Text style={[styles.bentoTowerTitle, { color: colors.textPrimary }]}>
                {t.tabSyllabus}
              </Text>
              <Text style={[styles.bentoTowerDesc, { color: colors.textSecondary }]}>
                {language === 'hi'
                  ? 'BSEB LET व BPSC अंकन व अर्हता'
                  : 'Exam scheme & qualifying marks'}
              </Text>

              <View style={styles.bentoTowerFooter}>
                <Text style={[styles.bentoLinkText, { color: '#8B5CF6' }]}>
                  {language === 'hi' ? 'सिलेबस देखें' : 'View Blueprint'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#8B5CF6" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Tile 6: LIS Quick Glossary (Acronyms & Milestone Years) */}
          <TouchableOpacity
            style={[
              styles.bentoHeroCard,
              {
                backgroundColor: colors.cardElevated,
                borderColor: colors.border,
                borderTopColor: '#7C3AED',
                borderTopWidth: 3,
              },
            ]}
            onPress={() => onNavigateTab('glossary')}
            activeOpacity={0.85}
          >
            <View style={styles.bentoHeroTopBar}>
              <View
                style={[
                  styles.bentoTagBadge,
                  {
                    backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : '#F5F3FF',
                    borderColor: isDark ? 'rgba(124, 58, 237, 0.35)' : '#DDD6FE',
                  },
                ]}
              >
                <Ionicons name="sparkles" size={11} color="#7C3AED" />
                <Text style={[styles.bentoTagText, { color: '#7C3AED' }]}>
                  {language === 'hi' ? 'A-Z शब्दावली व कालक्रम' : 'A-Z GLOSSARY & TIMELINE'}
                </Text>
              </View>

              <View style={[styles.microChip, { backgroundColor: colors.canvasSubtle, borderColor: colors.border }]}>
                <Ionicons name="search" size={12} color={colors.textSecondary} />
                <Text style={[styles.microChipText, { color: colors.textSecondary }]}>
                  SOUL, DDC, 1933...
                </Text>
              </View>
            </View>

            <View style={styles.bentoHeroBody}>
              <View
                style={[
                  styles.bentoHeroIconWrapper,
                  {
                    backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : '#F5F3FF',
                    borderColor: isDark ? 'rgba(124, 58, 237, 0.3)' : '#DDD6FE',
                  },
                ]}
              >
                <Ionicons name="text" size={24} color="#7C3AED" />
              </View>

              <View style={styles.bentoHeroText}>
                <Text style={[styles.bentoHeroTitle, { color: colors.textPrimary }]}>
                  {language === 'hi'
                    ? 'LIS शब्दावली व महत्वपूर्ण वर्ष'
                    : 'LIS Quick Glossary & Key Years'}
                </Text>
                <Text style={[styles.bentoHeroDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'परीक्षा हॉल में जाने से पहले 2 सेकंड में खोजें सभी फुल फॉर्म व ऐतिहासिक तिथियां'
                    : 'Instant 2-second search for all library science acronyms, acts & landmark dates'}
                </Text>
              </View>
            </View>

            <View style={[styles.bentoHeroFooter, { borderTopColor: colors.border }]}>
              <View style={[styles.bentoHeroStatus, { backgroundColor: isDark ? 'rgba(124, 58, 237, 0.12)' : '#F5F3FF' }]}>
                <Ionicons name="flash" size={13} color="#7C3AED" />
                <Text style={[styles.bentoHeroStatusText, { color: '#7C3AED' }]}>
                  {language === 'hi' ? 'त्वरित A-Z सर्च' : 'Instant Search Ready'}
                </Text>
              </View>

              <View style={[styles.bentoHeroBtn, { backgroundColor: '#7C3AED' }]}>
                <Text style={styles.bentoHeroBtnText}>
                  {language === 'hi' ? 'खोजें' : 'Explore'}
                </Text>
                <Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
              </View>
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

      {/* Version 2.0 Roadmap: Coming Soon Teaser */}
      <View style={styles.sectionWrapper}>
        <View
          style={[
            styles.comingSoonCard,
            {
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.08)' : '#EFF6FF',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : '#BFDBFE',
            },
          ]}
        >
          {/* Header Row */}
          <View style={styles.comingSoonHeader}>
            <View style={styles.comingSoonBadge}>
              <Ionicons name="rocket" size={13} color="#0070F3" />
              <Text style={styles.comingSoonBadgeText}>
                {language === 'hi' ? 'आगामी अपडेट • VERSION 2.0' : 'COMING SOON • VERSION 2.0'}
              </Text>
            </View>
            <View style={styles.comingSoonTag}>
              <Text style={styles.comingSoonTagText}>
                {language === 'hi' ? 'शीघ्र उपलब्ध' : 'In Progress'}
              </Text>
            </View>
          </View>

          <Text style={[styles.comingSoonTitle, { color: colors.textPrimary }]}>
            {language === 'hi'
              ? 'आगामी नए फीचर्स (Next Version Teaser)'
              : 'Upcoming Major Features (Version 2.0)'}
          </Text>

          <Text style={[styles.comingSoonSubtitle, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? 'बिहार विद्यालय परीक्षा समिति (BSEB) आधिकारिक अधिसूचना के साथ आने वाले फीचर्स:'
              : 'Releasing with the official BSEB Librarian recruitment notification:'}
          </Text>

          {/* Feature List */}
          <View style={styles.comingSoonList}>
            {/* Feature 1: PYQ Hub */}
            <TouchableOpacity
              style={[styles.comingSoonItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  language === 'hi' ? '📄 10+ वर्ष के हल प्रश्न-पत्र (PYQ Hub)' : '📄 10+ Years Solved PYQ Hub',
                  language === 'hi'
                    ? 'KVS, NVS, DSSSB, RSMSSB व UGC-NET के विगत वर्षों के प्रामाणिक मूल प्रश्न-पत्रों का आधिकारिक संकलन Version 2.0 में आ रहा है!\n\nतब तक Version 1.0 में उपलब्ध 70+ टॉपिक क्विज़ व 725+ वन-लाइनर से अपनी तैयारी मजबूत करें।'
                    : 'Official previous year question papers from KVS, NVS, DSSSB & UGC-NET with verified explanations will be released in Version 2.0!\n\nMeanwhile, master the 70+ topic quizzes and 725+ one-liners available now in Version 1.0.'
                )
              }
            >
              <View style={[styles.comingSoonIconBox, { backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED' }]}>
                <Ionicons name="document-text" size={18} color="#EA580C" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.comingSoonItemTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? '10+ वर्ष के हल प्रश्न-पत्र (PYQ Hub)' : 'Previous Year Papers (PYQ Hub)'}
                  </Text>
                  <View style={styles.soonPill}>
                    <Text style={styles.soonPillText}>V2.0</Text>
                  </View>
                </View>
                <Text style={[styles.comingSoonItemDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'KVS, NVS, DSSSB, EMRS व UGC-NET के प्रामाणिक मूल प्रश्न विस्तृत हिंदी व्याख्या सहित।'
                    : 'Authentic exam papers from KVS, NVS, DSSSB & UGC-NET with verified solutions.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Feature 2: Full CBT Mock Tests */}
            <TouchableOpacity
              style={[styles.comingSoonItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  language === 'hi' ? '🏆 ऑल-बिहार CBT फुल मॉक टेस्ट' : '🏆 All-Bihar Full CBT Mocks',
                  language === 'hi'
                    ? 'परीक्षा हॉल जैसा 100-प्रश्न CBT टेस्ट, 1/4th नेगेटिव मार्किंग और राज्य स्तरीय मेधा सूची (All-Bihar Rank) आधिकारिक BSEB परीक्षा तिथि घोषित होते ही Version 2.0 में लाइव होगा!'
                    : 'Full 100-question timed mocks with negative marking and state-wide percentile ranking will go live in Version 2.0 upon official BSEB exam notification!'
                )
              }
            >
              <View style={[styles.comingSoonIconBox, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5' }]}>
                <Ionicons name="trophy" size={18} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.comingSoonItemTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'ऑल-बिहार CBT फुल मॉक टेस्ट' : 'All-Bihar Full CBT Mocks'}
                  </Text>
                  <View style={styles.soonPill}>
                    <Text style={styles.soonPillText}>V2.0</Text>
                  </View>
                </View>
                <Text style={[styles.comingSoonItemDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'परीक्षा हॉल जैसा CBT टेस्ट, 1/4th नेगेटिव मार्किंग और राज्य स्तरीय मेधा सूची।'
                    : 'Full-length timed CBT mock tests with negative marking & state ranking.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Feature 3: Full 1500+ MCQ Master Bank */}
            <TouchableOpacity
              style={[styles.comingSoonItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  language === 'hi' ? '🎯 1500+ विषयवार संपूर्ण MCQ बैंक' : '🎯 1500+ Topic-Wise MCQ Bank',
                  language === 'hi'
                    ? 'यूनिट 1 से 5 के प्रत्येक सूक्ष्म विषय (DDC वर्गीकरण, AACR-2 प्रविष्टियां, Koha, RFID, अधिनियम) पर 1500+ अभ्यास प्रश्न!\n\nहर प्रश्न के साथ प्रामाणिक संदर्भ व्याख्या मिलेगी।'
                    : 'Deep practice question bank covering 1500+ questions across all 5 syllabus units releasing in Version 2.0!'
                )
              }
            >
              <View style={[styles.comingSoonIconBox, { backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF' }]}>
                <Ionicons name="layers" size={18} color="#0070F3" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.comingSoonItemTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? '1500+ विषयवार संपूर्ण MCQ बैंक' : '1500+ Topic-Wise MCQ Bank'}
                  </Text>
                  <View style={styles.soonPill}>
                    <Text style={styles.soonPillText}>V2.0</Text>
                  </View>
                </View>
                <Text style={[styles.comingSoonItemDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'यूनिट 1 से 5 तक के प्रत्येक सब-टॉपिक से 1500+ उच्च-स्तरीय प्रश्न संपूर्ण व्याख्या सहित।'
                    : '1500+ high-yield MCQs with comprehensive bilingual explanations.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Feature 4: General Paper 1 Booster (Bihar GK + Art of Teaching) */}
            <TouchableOpacity
              style={[styles.comingSoonItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  language === 'hi' ? '🎓 सामान्य पेपर (50 अंक बूस्टर)' : '🎓 General Paper 1 (50 Marks)',
                  language === 'hi'
                    ? 'BSEB LET परीक्षा के 50 अंक के अनिवार्य सामान्य पेपर की पूरी तैयारी:\n• शिक्षण कला (Art of Teaching)\n• बिहार विशेष सामान्य ज्ञान (Bihar GK)\n• तार्किक क्षमता (Logical Reasoning)\n• सामान्य हिंदी व पर्यावरण\n\nVersion 2.0 में सम्मिलित!'
                    : 'Complete 50-mark General Paper preparation covering Art of Teaching, Bihar GK, Reasoning & Hindi in Version 2.0!'
                )
              }
            >
              <View style={[styles.comingSoonIconBox, { backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FFFBEB' }]}>
                <Ionicons name="school" size={18} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.comingSoonItemTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'सामान्य पेपर (50 अंक: बिहार GK व शिक्षण कला)' : 'General Paper (50 Marks: Bihar GK)'}
                  </Text>
                  <View style={styles.soonPill}>
                    <Text style={styles.soonPillText}>V2.0</Text>
                  </View>
                </View>
                <Text style={[styles.comingSoonItemDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'बिहार स्पेशल GK, शिक्षण कला (Art of Teaching) व रीज़निंग के 50 अंकों का संपूर्ण कवरेज।'
                    : '50-mark compulsory paper: Art of Teaching, Bihar GK & Logical Reasoning.'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Feature 5: Printable Master E-Book PDF */}
            <TouchableOpacity
              style={[styles.comingSoonItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  language === 'hi' ? '📚 प्रिंट-रेडी मास्टर ई-बुक PDF' : '📚 Printable Master E-Book PDF',
                  language === 'hi'
                    ? 'सम्पूर्ण 5 यूनिट्स नोट्स, 725+ वन-लाइनर, शब्दावली व 250+ प्रश्नों का 120 पृष्ठों का प्रिंटेबल A4 PDF!\n\nयह PDF आपके मोबाइल में ऑफलाइन सेव होगी जिसे आप किसी भी साइबर कैफे से प्रिंट करा सकते हैं।'
                    : '120-page A4 print-ready compilation booklet for offline reading & physical printing!'
                )
              }
            >
              <View style={[styles.comingSoonIconBox, { backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : '#F5F3FF' }]}>
                <Ionicons name="book" size={18} color="#7C3AED" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.comingSoonItemTitle, { color: colors.textPrimary }]}>
                    {language === 'hi' ? 'प्रिंट-रेडी मास्टर ई-बुक PDF' : 'Printable Master E-Book PDF'}
                  </Text>
                  <View style={styles.soonPill}>
                    <Text style={styles.soonPillText}>V2.0</Text>
                  </View>
                </View>
                <Text style={[styles.comingSoonItemDesc, { color: colors.textSecondary }]}>
                  {language === 'hi'
                    ? 'सम्पूर्ण 5 यूनिट्स नोट्स, 725+ वन-लाइनर व 250+ प्रश्नों का 120 पृष्ठों का प्रिंटेबल A4 PDF।'
                    : '120-page A4 complete revision book bundle for offline printing.'}
                </Text>
              </View>
            </TouchableOpacity>
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
  dailyButtonsGrid: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  checkAnswerPill: {
    flex: 1.2,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkAnswerPillText: {
    fontSize: 13,
    fontWeight: '800',
  },
  resetDailyPill: {
    flex: 1.2,
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
  shareWhatsAppPill: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  shareWhatsAppText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#166534',
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
  oneLinerSpotlightCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 4,
  },
  spotlightTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spotlightCatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  spotlightCatText: {
    fontSize: 11,
    fontWeight: '700',
  },
  spotlightShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  spotlightShareText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
  },
  spotlightStatement: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  spotlightFooterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 8,
  },
  spotlightFooterText: {
    fontSize: 11,
    fontWeight: '800',
  },
  comingSoonCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
  },
  comingSoonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  comingSoonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 112, 243, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  comingSoonBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0070F3',
    letterSpacing: 0.5,
  },
  comingSoonTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  comingSoonTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#B45309',
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  comingSoonSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 12,
  },
  comingSoonList: {
    gap: 8,
    marginBottom: 0,
  },
  comingSoonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  comingSoonIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonItemTitle: {
    fontSize: 12.5,
    fontWeight: '800',
  },
  soonPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  soonPillText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#0070F3',
  },
  comingSoonItemDesc: {
    fontSize: 10.5,
    lineHeight: 14,
    marginTop: 2,
  },
  comingSoonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  comingSoonFooterText: {
    fontSize: 10.5,
    fontWeight: '600',
  },
});
