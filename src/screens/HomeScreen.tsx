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
import { useLanguage } from '../localization/LanguageContext';
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
  const [dailyQuestion] = useState(QUESTIONS[0]); // Deterministic daily question
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Exam Announcement Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View style={styles.heroBadge}>
            <Ionicons name="school" size={14} color="#FFFFFF" />
            <Text style={styles.heroBadgeText}>{t.bilingualBadge}</Text>
          </View>
          <View style={styles.liveTag}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveTagText}>2026 RECRUITMENT</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>{t.examCountdownTitle}</Text>
        <Text style={styles.heroSubtitle}>{t.examCountdownSubtitle}</Text>

        <View style={styles.heroFooter}>
          <TouchableOpacity
            style={styles.heroActionButton}
            onPress={() => onStartMockTest('test_full_1')}
            activeOpacity={0.8}
          >
            <Ionicons name="play-circle" size={18} color="#1E3A8A" />
            <Text style={styles.heroActionText}>{t.actionFullMock}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroOutlineButton}
            onPress={() => onNavigateTab('syllabus')}
            activeOpacity={0.8}
          >
            <Text style={styles.heroOutlineText}>{t.tabSyllabus}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress & Quick Stats */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="stats-chart" size={18} color="#1E3A8A" />
          <Text style={styles.sectionTitle}>{t.quickStatsTitle}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-circle" size={22} color="#10B981" />
            <Text style={styles.statValue}>{stats.totalAttempts}</Text>
            <Text style={styles.statLabel}>{t.testsAttempted}</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="speedometer" size={22} color="#2563EB" />
            <Text style={styles.statValue}>{stats.avgAccuracy}%</Text>
            <Text style={styles.statLabel}>{t.avgAccuracy}</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="bookmark" size={22} color="#F59E0B" />
            <Text style={styles.statValue}>{stats.bookmarkedCount}</Text>
            <Text style={styles.statLabel}>{t.savedCount}</Text>
          </View>
        </View>
      </View>

      {/* Today's Daily Question Challenge */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="flame" size={20} color="#EA580C" />
          <Text style={styles.sectionTitle}>{t.dailyQuestionTitle}</Text>
          <View style={styles.dailyBadge}>
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
                styles.checkAnswerBtn,
                !selectedOption && styles.disabledBtn,
              ]}
              disabled={!selectedOption}
              onPress={() => setIsAnswerChecked(true)}
            >
              <Text style={styles.checkAnswerBtnText}>{t.checkAnswer}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.resetDailyBtn}
              onPress={() => {
                setSelectedOption(null);
                setIsAnswerChecked(false);
              }}
            >
              <Ionicons name="refresh" size={16} color="#475569" />
              <Text style={styles.resetDailyText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Quick Access Feature Hub */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {language === 'hi' ? 'तैयारी के मुख्य स्तंभ' : 'Preparation Pillars'}
        </Text>

        <View style={styles.featureGrid}>
          {/* Card 1: Full Mock */}
          <TouchableOpacity
            style={[styles.featureCard, { borderLeftColor: '#2563EB' }]}
            onPress={() => onNavigateTab('tests')}
            activeOpacity={0.8}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="newspaper" size={22} color="#2563EB" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{t.actionFullMock}</Text>
              <Text style={styles.featureDesc}>{t.actionFullMockDesc}</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: Study Notes */}
          <TouchableOpacity
            style={[styles.featureCard, { borderLeftColor: '#10B981' }]}
            onPress={() => onNavigateTab('notes')}
            activeOpacity={0.8}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="book" size={22} color="#10B981" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{t.actionStudyNotes}</Text>
              <Text style={styles.featureDesc}>{t.actionStudyNotesDesc}</Text>
            </View>
          </TouchableOpacity>

          {/* Card 3: Fast Revision Cards */}
          <TouchableOpacity
            style={[styles.featureCard, { borderLeftColor: '#F59E0B' }]}
            onPress={() => onNavigateTab('flashcards')}
            activeOpacity={0.8}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#FFFBEB' }]}>
              <Ionicons name="flash" size={22} color="#F59E0B" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{t.actionFlashcards}</Text>
              <Text style={styles.featureDesc}>{t.actionFlashcardsDesc}</Text>
            </View>
          </TouchableOpacity>

          {/* Card 4: Official Syllabus */}
          <TouchableOpacity
            style={[styles.featureCard, { borderLeftColor: '#8B5CF6' }]}
            onPress={() => onNavigateTab('syllabus')}
            activeOpacity={0.8}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#F5F3FF' }]}>
              <Ionicons name="reader" size={22} color="#8B5CF6" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{t.tabSyllabus}</Text>
              <Text style={styles.featureDesc}>
                {language === 'hi'
                  ? 'BSEB LET एवं BPSC परीक्षा पैटर्न व पात्रता'
                  : 'BSEB LET & BPSC Criteria, Marks & Pattern'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dr. S.R. Ranganathan 5 Laws of Library Science Card */}
      <View style={styles.lawsCard}>
        <View style={styles.lawsHeader}>
          <Ionicons name="bookmark" size={18} color="#9333EA" />
          <Text style={styles.lawsTitle}>{t.lawsTitle}</Text>
        </View>
        <Text style={styles.lawItem}>{t.law1}</Text>
        <Text style={styles.lawItem}>{t.law2}</Text>
        <Text style={styles.lawItem}>{t.law3}</Text>
        <Text style={styles.lawItem}>{t.law4}</Text>
        <Text style={styles.lawItem}>{t.law5}</Text>
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
  heroCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    elevation: 4,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  liveTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#BFDBFE',
    lineHeight: 18,
    marginBottom: 18,
  },
  heroFooter: {
    flexDirection: 'row',
    gap: 10,
  },
  heroActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    elevation: 2,
  },
  heroActionText: {
    color: '#1E3A8A',
    fontSize: 13,
    fontWeight: '800',
  },
  heroOutlineButton: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  heroOutlineText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  dailyBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  dailyBadgeText: {
    color: '#C2410C',
    fontSize: 11,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  dailyActionRow: {
    marginTop: 8,
    alignItems: 'center',
  },
  checkAnswerBtn: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#94A3B8',
  },
  checkAnswerBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  resetDailyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  resetDailyText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  featureGrid: {
    marginTop: 10,
    gap: 10,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 5,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  featureDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  lawsCard: {
    backgroundColor: '#FAF5FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  lawsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  lawsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6B21A8',
  },
  lawItem: {
    fontSize: 13,
    color: '#581C87',
    fontWeight: '600',
    lineHeight: 22,
  },
});
