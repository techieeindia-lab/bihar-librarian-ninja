import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { Quiz, UserQuizAttempt } from '../types';
import { QUIZZES } from '../data/quizzes';
import { DataService } from '../services/dataService';
import { StorageService } from '../storage/storageService';

interface QuizScreenProps {
  onStartQuiz: (quizId: string) => void;
}

interface TopicQuizGroup {
  topicId: string;
  unitNumber: number;
  topicOrder: number;
  title: { hi: string; en: string };
  subtitle: { hi: string; en: string };
  badge?: { hi: string; en: string };
  color: string;
  icon: string;
  sets: Quiz[];
}

const VALID_QUIZ_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  landmark: 'library',
  flame: 'flame',
  book: 'book',
  folder: 'folder',
  search: 'search',
  briefcase: 'briefcase',
  'hardware-chip': 'hardware-chip',
  flash: 'flash',
  library: 'library',
  school: 'school',
  trophy: 'trophy',
  ribbon: 'ribbon',
  star: 'star',
  sparkles: 'sparkles',
  time: 'time',
  business: 'business',
  layers: 'layers',
};

const resolveQuizIcon = (iconName?: string): keyof typeof Ionicons.glyphMap => {
  if (!iconName) return 'help-circle';
  if (VALID_QUIZ_ICONS[iconName]) return VALID_QUIZ_ICONS[iconName];
  return 'help-circle';
};

export const QuizScreen: React.FC<QuizScreenProps> = ({ onStartQuiz }) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [filterType, setFilterType] = useState<'all' | 'topics' | 'units' | 'daily' | 'rapid_fire'>('topics');
  const [selectedTopicUnit, setSelectedTopicUnit] = useState<number | 'all'>('all');
  const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZZES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    avgAccuracy: 0,
    totalXP: 0,
  });
  const [attemptsMap, setAttemptsMap] = useState<Record<string, UserQuizAttempt>>({});

  useEffect(() => {
    setIsLoading(true);
    DataService.getQuizzes().then((data) => {
      if (data && data.length > 0) {
        setQuizzes(data);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });

    StorageService.getStats().then((res) => {
      setStats({
        totalAttempts: res.totalAttempts,
        avgAccuracy: res.avgAccuracy,
        totalXP: res.totalXP,
      });
    });

    StorageService.getQuizAttempts().then((attempts) => {
      const map: Record<string, UserQuizAttempt> = {};
      attempts.forEach((a) => {
        if (!map[a.quizId] || a.score > map[a.quizId].score) {
          map[a.quizId] = a;
        }
      });
      setAttemptsMap(map);
    });
  }, []);

  const dailyQuiz = quizzes.find((q) => q.id === 'quiz_daily') || quizzes[0];

  // Group topic quizzes into cohesive master TopicQuizGroups
  const topicGroups = React.useMemo(() => {
    const groups: TopicQuizGroup[] = [];
    const map = new Map<string, TopicQuizGroup>();

    const topicQuizzes = quizzes.filter(
      (q) => !q.id.startsWith('quiz_unit_') && (q.topicId != null || /^quiz_u\d+_t\d+/.test(q.id))
    );

    topicQuizzes.forEach((quiz) => {
      let topicId = quiz.topicId;
      let unitNumber = quiz.unitNumber;

      if (!topicId && quiz.id) {
        const tm = quiz.id.match(/quiz_u(\d+)_t(\d+)/);
        if (tm) {
          unitNumber = parseInt(tm[1], 10);
          topicId = `u${tm[1]}_t${tm[2]}`;
        }
      }
      if (!topicId) topicId = quiz.id;
      if (!unitNumber) unitNumber = topicId.startsWith('u') ? parseInt(topicId[1], 10) : 1;

      if (!map.has(topicId)) {
        const cleanTitleHi = quiz.title.hi.replace(/\s*\([^\)]*सेट[^\)]*\)/gi, '').trim();
        const cleanTitleEn = quiz.title.en.replace(/\s*\([^\)]*Set[^\)]*\)/gi, '').trim();
        const topicOrder = parseInt(topicId.split('_t')[1] || '1', 10);

        const group: TopicQuizGroup = {
          topicId,
          unitNumber,
          topicOrder,
          title: { hi: cleanTitleHi, en: cleanTitleEn },
          subtitle: quiz.subtitle,
          badge: {
            hi: `यूनिट ${unitNumber}.${topicOrder}`,
            en: `Unit ${unitNumber}.${topicOrder}`,
          },
          color: quiz.color || '#0070F3',
          icon: quiz.icon || 'book',
          sets: [],
        };
        map.set(topicId, group);
        groups.push(group);
      }

      const group = map.get(topicId)!;
      group.sets.push(quiz);
    });

    // Sort sets in order: Set 1, Set 2, Set 3...
    groups.forEach((group) => {
      group.sets.sort((a, b) => {
        const sA = a.setNumber !== undefined ? a.setNumber : (a.id.match(/_s(\d+)$/) ? parseInt(RegExp.$1, 10) : 1);
        const sB = b.setNumber !== undefined ? b.setNumber : (b.id.match(/_s(\d+)$/) ? parseInt(RegExp.$1, 10) : 1);
        return sA - sB;
      });
    });

    // Sort groups by unitNumber then topicOrder
    groups.sort((a, b) => {
      if (a.unitNumber !== b.unitNumber) return a.unitNumber - b.unitNumber;
      return a.topicOrder - b.topicOrder;
    });

    return groups;
  }, [quizzes]);

  const filteredTopicGroups = React.useMemo(() => {
    return topicGroups.filter((g) => {
      if (selectedTopicUnit === 'all') return true;
      return g.unitNumber === selectedTopicUnit;
    });
  }, [topicGroups, selectedTopicUnit]);

  // Group unit quizzes into 5 UnitQuizGroups (Unit 1 to 5) with Set 1 & Set 2
  const unitGroups = React.useMemo(() => {
    const groups: TopicQuizGroup[] = [];
    const map = new Map<number, TopicQuizGroup>();

    const unitQuizzes = quizzes.filter((q) => q.id.startsWith('quiz_unit_'));

    unitQuizzes.forEach((quiz) => {
      let unitNumber = quiz.unitNumber;
      if (!unitNumber) {
        const um = quiz.id.match(/quiz_unit_(\d+)/);
        if (um) unitNumber = parseInt(um[1], 10);
      }
      if (!unitNumber) unitNumber = 1;

      if (!map.has(unitNumber)) {
        const cleanTitleHi = quiz.title.hi.replace(/\s*\([^\)]*सेट[^\)]*\)/gi, '').trim();
        const cleanTitleEn = quiz.title.en.replace(/\s*\([^\)]*Set[^\)]*\)/gi, '').trim();

        const group: TopicQuizGroup = {
          topicId: `unit_${unitNumber}`,
          unitNumber,
          topicOrder: unitNumber,
          title: { hi: cleanTitleHi, en: cleanTitleEn },
          subtitle: quiz.subtitle,
          badge: {
            hi: `यूनिट ${unitNumber} मास्टर 🏆`,
            en: `Unit ${unitNumber} Master 🏆`,
          },
          color: quiz.color || '#0070F3',
          icon: quiz.icon || 'library',
          sets: [],
        };
        map.set(unitNumber, group);
        groups.push(group);
      }

      const group = map.get(unitNumber)!;
      group.sets.push(quiz);
    });

    // Sort sets in order: Set 1, Set 2...
    groups.forEach((group) => {
      group.sets.sort((a, b) => {
        const sA = a.setNumber !== undefined ? a.setNumber : (a.id.includes('_s2') ? 2 : 1);
        const sB = b.setNumber !== undefined ? b.setNumber : (b.id.includes('_s2') ? 2 : 1);
        return sA - sB;
      });
    });

    // Sort groups by unitNumber (1 to 5)
    groups.sort((a, b) => a.unitNumber - b.unitNumber);

    return groups;
  }, [quizzes]);

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (filterType === 'all') return true;
    if (filterType === 'daily') return quiz.id === 'quiz_daily';
    if (filterType === 'rapid_fire') return quiz.id === 'quiz_rapid_fire';
    if (filterType === 'units') return quiz.id.startsWith('quiz_unit_');
    return true;
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Title & Subtitle */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary, marginBottom: 4 }]}>
          {t.quizScreenTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {t.quizScreenSubtitle}
        </Text>
      </View>

      {/* Mini Stats Bar */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="trophy" size={16} color="#F59E0B" />
          <Text style={[styles.statVal, { color: colors.textPrimary }]}>{stats.totalAttempts}</Text>
          <Text style={[styles.statTxt, { color: colors.textSecondary }]}>{t.testsAttempted}</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="sparkles" size={16} color="#8B5CF6" />
          <Text style={[styles.statVal, { color: colors.textPrimary }]}>{stats.totalXP} XP</Text>
          <Text style={[styles.statTxt, { color: colors.textSecondary }]}>{t.totalXP}</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="speedometer" size={16} color="#10B981" />
          <Text style={[styles.statVal, { color: colors.textPrimary }]}>{stats.avgAccuracy}%</Text>
          <Text style={[styles.statTxt, { color: colors.textSecondary }]}>{t.avgAccuracy}</Text>
        </View>
      </View>

      {/* Featured Daily Challenge Quiz Card */}
      {dailyQuiz && (
        <View style={[styles.dailyOuter, { borderColor: isDark ? '#333' : '#FED7AA' }]}>
          <LinearGradient
            colors={isDark ? ['#2D1505', '#1F0F05', '#120803'] : ['#FFF7ED', '#FFEDD5', '#FED7AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.dailyGradient}
          >
            <View style={styles.dailyTopRow}>
              <View style={[styles.dailyTag, { backgroundColor: '#EA580C' }]}>
                <Ionicons name="flame" size={12} color="#FFFFFF" />
                <Text style={styles.dailyTagText}>{t.dailyChallengeBadge}</Text>
              </View>
              <View style={styles.dailyXPBadge}>
                <Text style={styles.dailyXPText}>+{dailyQuiz.rewardXP} XP</Text>
              </View>
            </View>

            <Text style={[styles.dailyTitle, { color: isDark ? '#FFFFFF' : '#9A3412' }]}>
              {dailyQuiz.title[language]}
            </Text>
            <Text style={[styles.dailySubtitle, { color: isDark ? '#D1D5DB' : '#C2410C' }]}>
              {dailyQuiz.subtitle[language]}
            </Text>

            <View style={styles.dailyFooter}>
              <View style={styles.dailySpecsRow}>
                <View style={styles.specItem}>
                  <Ionicons name="help-circle-outline" size={14} color={isDark ? '#FED7AA' : '#9A3412'} />
                  <Text style={[styles.specText, { color: isDark ? '#FED7AA' : '#9A3412' }]}>
                    {dailyQuiz.questionCount} {t.quizQuestions}
                  </Text>
                </View>
                <View style={styles.specItem}>
                  <Ionicons name="timer-outline" size={14} color={isDark ? '#FED7AA' : '#9A3412'} />
                  <Text style={[styles.specText, { color: isDark ? '#FED7AA' : '#9A3412' }]}>
                    ~{dailyQuiz.durationMinutes || 5} min
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.dailyStartBtn}
                onPress={() => onStartQuiz(dailyQuiz.id)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#EA580C', '#C2410C']}
                  style={styles.dailyStartGradient}
                >
                  <Text style={styles.dailyStartBtnText}>{t.startDailyQuiz}</Text>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterType === 'topics' ? colors.primary : colors.canvasSubtle,
              borderColor: filterType === 'topics' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('topics')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color: filterType === 'topics' ? colors.textOnPrimary : colors.textSecondary,
                fontWeight: filterType === 'topics' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? '🎯 टॉपिक क्विज़ (29)' : '🎯 Topic Quizzes (29)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterType === 'units' ? colors.primary : colors.canvasSubtle,
              borderColor: filterType === 'units' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('units')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color: filterType === 'units' ? colors.textOnPrimary : colors.textSecondary,
                fontWeight: filterType === 'units' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? '🏛️ 5 यूनिट टेस्ट' : '🏛️ 5 Unit Tests'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterType === 'daily' ? colors.primary : colors.canvasSubtle,
              borderColor: filterType === 'daily' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('daily')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color: filterType === 'daily' ? colors.textOnPrimary : colors.textSecondary,
                fontWeight: filterType === 'daily' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? '🔥 डेली चैलेंज' : '🔥 Daily Streak'}
          </Text>
        </TouchableOpacity>

        

        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterType === 'all' ? colors.primary : colors.canvasSubtle,
              borderColor: filterType === 'all' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('all')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color: filterType === 'all' ? colors.textOnPrimary : colors.textSecondary,
                fontWeight: filterType === 'all' ? '800' : '600',
              },
            ]}
          >
            {t.allQuizzes}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Unit sub-selector when viewing Topic Quizzes */}
      {filterType === 'topics' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 6,
            paddingHorizontal: 16,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.subFilterChip,
              {
                backgroundColor: selectedTopicUnit === 'all' ? colors.accent : colors.card,
                borderColor: selectedTopicUnit === 'all' ? colors.accent : colors.border,
              },
            ]}
            onPress={() => setSelectedTopicUnit('all')}
          >
            <Text
              style={[
                styles.subFilterText,
                { color: selectedTopicUnit === 'all' ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {language === 'hi' ? 'सभी 29 टॉपिक' : 'All 29 Topics'}
            </Text>
          </TouchableOpacity>

          {[1, 2, 3, 4, 5].map((uNum) => {
            const isSel = selectedTopicUnit === uNum;
            return (
              <TouchableOpacity
                key={uNum}
                style={[
                  styles.subFilterChip,
                  {
                    backgroundColor: isSel ? colors.accent : colors.card,
                    borderColor: isSel ? colors.accent : colors.border,
                  },
                ]}
                onPress={() => setSelectedTopicUnit(uNum)}
              >
                <Text
                  style={[
                    styles.subFilterText,
                    { color: isSel ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {language === 'hi' ? `यूनिट ${uNum}` : `Unit ${uNum}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Quizzes List */}
      <View style={styles.listContainer}>
        {isLoading && quizzes.length === 0 ? (
          <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 12, fontSize: 13, color: colors.textSecondary, fontWeight: '600' }}>
              {language === 'hi' ? 'परीक्षा क्विज़ लोड हो रहे हैं...' : 'Loading Quizzes...'}
            </Text>
          </View>
        ) : filterType === 'topics' ? (
          filteredTopicGroups.length === 0 ? (
            <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="folder-open-outline" size={36} color={colors.textMuted} />
              <Text style={{ marginTop: 8, fontSize: 13, color: colors.textSecondary }}>
                {language === 'hi' ? 'कोई टॉपिक क्विज़ उपलब्ध नहीं है' : 'No topic quizzes available'}
              </Text>
            </View>
          ) : (
            filteredTopicGroups.map((group) => {
              const totalGroupQs = group.sets.reduce((sum, s) => sum + (s.questionCount || s.questionIds.length || 10), 0);
              const accentColor = group.color || colors.primary;

              return (
                <View
                  key={group.topicId}
                  style={[
                    styles.quizCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      borderLeftColor: accentColor,
                      borderLeftWidth: 4,
                    },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5' }]}>
                      <Ionicons
                        name={resolveQuizIcon(group.icon)}
                        size={22}
                        color={accentColor}
                      />
                    </View>

                    <View style={styles.cardTitleContainer}>
                      <View style={styles.badgeRow}>
                        {group.badge && (
                          <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F4F4F5' }]}>
                            <Text style={[styles.badgeText, { color: accentColor }]}>
                              {group.badge[language]}
                            </Text>
                          </View>
                        )}
                        <View style={[styles.setsCountChip, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5' }]}>
                          <Ionicons name="layers-outline" size={11} color="#10B981" style={{ marginRight: 3 }} />
                          <Text style={styles.setsCountText}>
                            {group.sets.length} {language === 'hi' ? 'सेट्स' : 'Sets'} • {totalGroupQs} Qs
                          </Text>
                        </View>
                      </View>

                      <Text style={[styles.quizTitle, { color: colors.textPrimary }]}>
                        {group.title[language]}
                      </Text>
                      <Text style={[styles.quizSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                        {group.subtitle[language]}
                      </Text>
                    </View>
                  </View>

                  {/* Interactive Set Selection Row */}
                  <View style={[styles.setSelectionContainer, { borderTopColor: colors.border }]}>
                    <View style={styles.setSelectionHeader}>
                      <Text style={[styles.setSelectionTitle, { color: colors.textSecondary }]}>
                        {language === 'hi' ? '🎯 अभ्यास सेट चुनें:' : '🎯 Choose Practice Set:'}
                      </Text>
                      <Text style={{ fontSize: 10, color: colors.textMuted, fontWeight: '600' }}>
                        {group.sets.length > 1
                          ? (language === 'hi' ? `${group.sets.length} सेट उपलब्ध` : `${group.sets.length} Sets Available`)
                          : (language === 'hi' ? '10 प्रश्न प्रति सेट' : '10 Qs per set')}
                      </Text>
                    </View>

                    <View style={styles.setChipsRow}>
                      {group.sets.map((setQuiz) => {
                        const attempt = attemptsMap[setQuiz.id];
                        const isAttempted = !!attempt;
                        const setNum = setQuiz.setNumber !== undefined ? setQuiz.setNumber : (setQuiz.id.match(/_s(\d+)$/) ? parseInt(RegExp.$1, 10) : 1);
                        const setLabel = setQuiz.setName ? setQuiz.setName[language] : (language === 'hi' ? `सेट ${setNum}` : `Set ${setNum}`);

                        return (
                          <TouchableOpacity
                            key={setQuiz.id}
                            style={[
                              styles.setPill,
                              {
                                backgroundColor: isAttempted
                                  ? (isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5')
                                  : (isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB'),
                                borderColor: isAttempted ? '#10B981' : colors.border,
                              },
                            ]}
                            onPress={() => onStartQuiz(setQuiz.id)}
                            activeOpacity={0.75}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Ionicons
                                name={isAttempted ? 'checkmark-circle' : 'play-circle'}
                                size={15}
                                color={isAttempted ? '#10B981' : accentColor}
                                style={{ marginRight: 6 }}
                              />
                              <Text
                                style={[
                                  styles.setPillText,
                                  {
                                    color: isAttempted
                                      ? (isDark ? '#34D399' : '#059669')
                                      : colors.textPrimary,
                                  },
                                ]}
                              >
                                {setLabel}
                              </Text>
                            </View>

                            <View style={styles.setPillMeta}>
                              {isAttempted ? (
                                <Text style={styles.setPillScoreText}>
                                  {attempt.correctCount}/{attempt.totalQuestions} ⭐
                                </Text>
                              ) : (
                                <Text style={[styles.setPillCountText, { color: colors.textMuted }]}>
                                  {setQuiz.questionCount || 10} Qs • +{setQuiz.rewardXP} XP
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}

                      {group.sets.length === 1 && (
                        <View
                          style={[
                            styles.setPillSoon,
                            {
                              backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#F4F4F5',
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Ionicons name="add-circle-outline" size={13} color={colors.textMuted} style={{ marginRight: 4 }} />
                          <Text style={[styles.setPillSoonText, { color: colors.textMuted }]}>
                            {language === 'hi' ? '+ सेट 2 (शीघ्र)' : '+ Set 2 (Soon)'}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          )
        ) : filterType === 'units' ? (
          unitGroups.length === 0 ? (
            <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="folder-open-outline" size={36} color={colors.textMuted} />
              <Text style={{ marginTop: 8, fontSize: 13, color: colors.textSecondary }}>
                {language === 'hi' ? 'कोई यूनिट टेस्ट उपलब्ध नहीं है' : 'No unit tests available'}
              </Text>
            </View>
          ) : (
            unitGroups.map((group) => {
              const totalGroupQs = group.sets.reduce((sum, s) => sum + (s.questionCount || s.questionIds.length || 25), 0);
              const accentColor = group.color || colors.primary;

              return (
                <View
                  key={group.topicId}
                  style={[
                    styles.quizCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      borderLeftColor: accentColor,
                      borderLeftWidth: 4,
                    },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5' }]}>
                      <Ionicons
                        name={resolveQuizIcon(group.icon)}
                        size={22}
                        color={accentColor}
                      />
                    </View>

                    <View style={styles.cardTitleContainer}>
                      <View style={styles.badgeRow}>
                        {group.badge && (
                          <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F4F4F5' }]}>
                            <Text style={[styles.badgeText, { color: accentColor }]}>
                              {group.badge[language]}
                            </Text>
                          </View>
                        )}
                        <View style={[styles.setsCountChip, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5' }]}>
                          <Ionicons name="layers-outline" size={11} color="#10B981" style={{ marginRight: 3 }} />
                          <Text style={styles.setsCountText}>
                            {group.sets.length} {language === 'hi' ? 'सेट्स' : 'Sets'} • {totalGroupQs} Qs
                          </Text>
                        </View>
                      </View>

                      <Text style={[styles.quizTitle, { color: colors.textPrimary }]}>
                        {group.title[language]}
                      </Text>
                      <Text style={[styles.quizSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                        {group.subtitle[language]}
                      </Text>
                    </View>
                  </View>

                  {/* Interactive Set Selection Row */}
                  <View style={[styles.setSelectionContainer, { borderTopColor: colors.border }]}>
                    <View style={styles.setSelectionHeader}>
                      <Text style={[styles.setSelectionTitle, { color: colors.textSecondary }]}>
                        {language === 'hi' ? '🎯 मेगा टेस्ट सेट चुनें:' : '🎯 Choose Mega Test Set:'}
                      </Text>
                      <Text style={{ fontSize: 10, color: colors.textMuted, fontWeight: '600' }}>
                        {group.sets.length > 1
                          ? (language === 'hi' ? `${group.sets.length} सेट उपलब्ध` : `${group.sets.length} Sets Available`)
                          : (language === 'hi' ? '25 प्रश्न प्रति सेट' : '25 Qs per set')}
                      </Text>
                    </View>

                    <View style={styles.setChipsRow}>
                      {group.sets.map((setQuiz) => {
                        const attempt = attemptsMap[setQuiz.id];
                        const isAttempted = !!attempt;
                        const setNum = setQuiz.setNumber !== undefined ? setQuiz.setNumber : (setQuiz.id.match(/_s(\d+)$/) ? parseInt(RegExp.$1, 10) : 1);
                        const setLabel = setQuiz.setName ? setQuiz.setName[language] : (language === 'hi' ? `सेट ${setNum}` : `Set ${setNum}`);

                        return (
                          <TouchableOpacity
                            key={setQuiz.id}
                            style={[
                              styles.setPill,
                              {
                                backgroundColor: isAttempted
                                  ? (isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5')
                                  : (isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB'),
                                borderColor: isAttempted ? '#10B981' : colors.border,
                              },
                            ]}
                            onPress={() => onStartQuiz(setQuiz.id)}
                            activeOpacity={0.75}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Ionicons
                                name={isAttempted ? 'checkmark-circle' : 'play-circle'}
                                size={15}
                                color={isAttempted ? '#10B981' : accentColor}
                                style={{ marginRight: 6 }}
                              />
                              <Text
                                style={[
                                  styles.setPillText,
                                  {
                                    color: isAttempted
                                      ? (isDark ? '#34D399' : '#059669')
                                      : colors.textPrimary,
                                  },
                                ]}
                              >
                                {setLabel}
                              </Text>
                            </View>

                            <View style={styles.setPillMeta}>
                              {isAttempted ? (
                                <Text style={styles.setPillScoreText}>
                                  {attempt.correctCount}/{attempt.totalQuestions} ⭐
                                </Text>
                              ) : (
                                <Text style={[styles.setPillCountText, { color: colors.textMuted }]}>
                                  {setQuiz.questionCount || 25} Qs • +{setQuiz.rewardXP} XP
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })
          )
        ) : filteredQuizzes.length === 0 ? (
          <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="folder-open-outline" size={36} color={colors.textMuted} />
            <Text style={{ marginTop: 8, fontSize: 13, color: colors.textSecondary }}>
              {language === 'hi' ? 'कोई क्विज़ उपलब्ध नहीं है' : 'No quizzes available'}
            </Text>
          </View>
        ) : (
          filteredQuizzes.map((quiz) => {
            const accentColor = quiz.color || colors.primary;
            return (
              <TouchableOpacity
                key={quiz.id}
                style={[
                  styles.quizCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderLeftColor: accentColor,
                    borderLeftWidth: 4,
                  },
                ]}
                onPress={() => onStartQuiz(quiz.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5' }]}>
                    <Ionicons
                      name={resolveQuizIcon(quiz.icon)}
                      size={22}
                      color={accentColor}
                    />
                  </View>

                  <View style={styles.cardTitleContainer}>
                    <View style={styles.badgeRow}>
                      {quiz.badge && (
                        <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F4F4F5' }]}>
                          <Text style={[styles.badgeText, { color: accentColor }]}>
                            {quiz.badge[language]}
                          </Text>
                        </View>
                      )}
                      <View style={[styles.xpChip, { backgroundColor: isDark ? 'rgba(139,92,246,0.15)' : '#F5F3FF' }]}>
                        <Text style={[styles.xpChipText, { color: '#8B5CF6' }]}>+{quiz.rewardXP} XP</Text>
                      </View>
                    </View>

                    <Text style={[styles.quizTitle, { color: colors.textPrimary }]}>
                      {quiz.title[language]}
                    </Text>
                    <Text style={[styles.quizSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                      {quiz.subtitle[language]}
                    </Text>
                  </View>
                </View>

                <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                  <View style={styles.cardSpecs}>
                    <Ionicons name="help-circle-outline" size={13} color={colors.textSecondary} />
                    <Text style={[styles.cardSpecText, { color: colors.textSecondary }]}>
                      {quiz.questionCount} {t.quizQuestions}
                    </Text>
                    <Text style={{ color: colors.textMuted }}>•</Text>
                    <Ionicons name="timer-outline" size={13} color={colors.textSecondary} />
                    <Text style={[styles.cardSpecText, { color: colors.textSecondary }]}>
                      ~{quiz.durationMinutes || 5} min
                    </Text>
                  </View>

                  <View style={[styles.playBtn, { backgroundColor: accentColor }]}>
                    <Text style={styles.playBtnText}>{t.playQuiz}</Text>
                    <Ionicons name="play" size={11} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
  headerBox: {
    marginTop: 14,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 2,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  statTxt: {
    fontSize: 10,
    fontWeight: '600',
  },
  dailyOuter: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
  },
  dailyGradient: {
    padding: 16,
  },
  dailyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dailyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  dailyTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  dailyXPBadge: {
    backgroundColor: 'rgba(234, 88, 12, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dailyXPText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '900',
  },
  dailyTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  dailySubtitle: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  dailyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  dailySpecsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dailyStartBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  dailyStartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  dailyStartBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterBtnText: {
    fontSize: 12,
  },
  subFilterChip: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  subFilterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  listContainer: {
    gap: 12,
  },
  quizCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  xpChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  xpChipText: {
    fontSize: 10,
    fontWeight: '800',
  },
  quizTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  quizSubtitle: {
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 10,
  },
  cardSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardSpecText: {
    fontSize: 11,
    fontWeight: '600',
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  playBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  setsCountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  setsCountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#10B981',
  },
  setSelectionContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  setSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  setSelectionTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  setChipsRow: {
    flexDirection: 'column',
    gap: 7,
  },
  setPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  setPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  setPillMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setPillScoreText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '900',
  },
  setPillCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  setPillSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  setPillSoonText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
