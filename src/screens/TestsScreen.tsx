import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { MOCK_TESTS } from '../data/mockTests';
import { MockTest } from '../types';

interface TestsScreenProps {
  onStartTest: (testId: string) => void;
}

export const TestsScreen: React.FC<TestsScreenProps> = ({ onStartTest }) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [filterType, setFilterType] = useState<'all' | 'full_length' | 'sectional'>('all');

  const filteredTests = MOCK_TESTS.filter((test) => {
    if (filterType === 'all') return true;
    return test.type === filterType;
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Title & Description */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.tabTests}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? 'BSEB LET एवं BPSC परीक्षा पैटर्न के अनुरूप वास्तविक CBT मॉक टेस्ट'
            : 'Simulated Full-length and Chapter-wise Mock Tests for Bihar Librarian Exam'}
        </Text>
      </View>

      {/* Filter Tabs (Vercel Pills) */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor:
                filterType === 'all' ? colors.primary : colors.canvasSubtle,
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
                color:
                  filterType === 'all'
                    ? colors.textOnPrimary
                    : colors.textSecondary,
                fontWeight: filterType === 'all' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? 'सभी टेस्ट' : 'All Tests'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor:
                filterType === 'full_length'
                  ? colors.primary
                  : colors.canvasSubtle,
              borderColor:
                filterType === 'full_length' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('full_length')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color:
                  filterType === 'full_length'
                    ? colors.textOnPrimary
                    : colors.textSecondary,
                fontWeight: filterType === 'full_length' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? 'फुल मॉक टेस्ट' : 'Full Length'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            {
              backgroundColor:
                filterType === 'sectional'
                  ? colors.primary
                  : colors.canvasSubtle,
              borderColor:
                filterType === 'sectional' ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setFilterType('sectional')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterBtnText,
              {
                color:
                  filterType === 'sectional'
                    ? colors.textOnPrimary
                    : colors.textSecondary,
                fontWeight: filterType === 'sectional' ? '800' : '600',
              },
            ]}
          >
            {language === 'hi' ? 'अध्याय-वार' : 'Sectional'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Test Cards List */}
      <View style={styles.listContainer}>
        {filteredTests.map((test) => {
          const isFull = test.type === 'full_length';
          const btnGradients = isFull
            ? (['#0070F3', '#0052CC'] as const)
            : (['#10B981', '#059669'] as const);

          return (
            <View
              key={test.id}
              style={[
                styles.testCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderLeftColor: isFull ? '#0070F3' : '#10B981',
                  borderLeftWidth: 3,
                },
              ]}
            >
              {/* Top row: badge & type */}
              <View style={styles.testCardHeader}>
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor: isFull
                        ? isDark
                          ? 'rgba(0, 112, 243, 0.15)'
                          : '#EFF6FF'
                        : isDark
                        ? 'rgba(16, 185, 129, 0.15)'
                        : '#ECFDF5',
                      borderColor: isFull
                        ? isDark
                          ? 'rgba(0, 112, 243, 0.3)'
                          : '#BFDBFE'
                        : isDark
                        ? 'rgba(16, 185, 129, 0.3)'
                        : '#A7F3D0',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeBadgeText,
                      {
                        color: isFull ? '#0070F3' : '#10B981',
                      },
                    ]}
                  >
                    {isFull
                      ? language === 'hi'
                        ? 'फुल मॉक टेस्ट'
                        : 'FULL MOCK'
                      : language === 'hi'
                      ? 'अध्याय क्विज़'
                      : 'SECTIONAL'}
                  </Text>
                </View>

                {test.badge && (
                  <View
                    style={[
                      styles.highlightBadge,
                      {
                        backgroundColor: isDark
                          ? 'rgba(245, 166, 35, 0.15)'
                          : '#FFFBEB',
                        borderColor: isDark
                          ? 'rgba(245, 166, 35, 0.3)'
                          : '#FDE68A',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.highlightBadgeText,
                        { color: isDark ? colors.amber : '#D97706' },
                      ]}
                    >
                      {test.badge[language]}
                    </Text>
                  </View>
                )}
              </View>

              {/* Test Title & Subtitle */}
              <Text style={[styles.testTitle, { color: colors.textPrimary }]}>
                {test.title[language]}
              </Text>
              <Text style={[styles.testSubtitle, { color: colors.textSecondary }]}>
                {test.subtitle[language]}
              </Text>

              {/* Meta tags: Qs, Mins, Marks */}
              <View
                style={[
                  styles.testMetaRow,
                  { borderTopColor: colors.border },
                ]}
              >
                <View style={styles.metaItem}>
                  <Ionicons name="help-circle-outline" size={15} color={colors.textMuted} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {test.questionCount} {t.questions}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={15} color={colors.textMuted} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {test.durationMinutes} {t.minutes}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Ionicons name="trophy-outline" size={15} color={colors.textMuted} />
                  <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                    {test.totalMarks} {t.marks}
                  </Text>
                </View>
              </View>

              {/* Start Button with LinearGradient */}
              <TouchableOpacity
                onPress={() => onStartTest(test.id)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={btnGradients}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.startTestButton}
                >
                  <Ionicons name="play" size={15} color="#FFFFFF" />
                  <Text style={styles.startTestButtonText}>{t.startTest}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          );
        })}
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
  },
  filterBtnText: {
    fontSize: 12,
  },
  listContainer: {
    gap: 12,
  },
  testCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    elevation: 1,
  },
  testCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  highlightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  highlightBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  testTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 21,
  },
  testSubtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  testMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
    marginBottom: 14,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  startTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 100,
    gap: 6,
  },
  startTestButtonText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.1,
    color: '#FFFFFF',
  },
});
