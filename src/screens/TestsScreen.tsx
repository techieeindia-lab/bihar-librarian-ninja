import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { MOCK_TESTS } from '../data/mockTests';
import { MockTest } from '../types';

interface TestsScreenProps {
  onStartTest: (testId: string) => void;
}

export const TestsScreen: React.FC<TestsScreenProps> = ({ onStartTest }) => {
  const { language, t } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'full_length' | 'sectional'>('all');

  const filteredTests = MOCK_TESTS.filter((test) => {
    if (filterType === 'all') return true;
    return test.type === filterType;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title & Description */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.tabTests}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'BSEB LET एवं BPSC परीक्षा पैटर्न के अनुरूप मॉक टेस्ट एवं विषय-वार टेस्ट'
            : 'Simulated Full-length and Chapter-wise Mock Tests for Bihar Librarian Exam'}
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filterType === 'all' && styles.activeFilterBtn]}
          onPress={() => setFilterType('all')}
        >
          <Text
            style={[
              styles.filterBtnText,
              filterType === 'all' && styles.activeFilterBtnText,
            ]}
          >
            {language === 'hi' ? 'सभी टेस्ट' : 'All Tests'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterType === 'full_length' && styles.activeFilterBtn,
          ]}
          onPress={() => setFilterType('full_length')}
        >
          <Text
            style={[
              styles.filterBtnText,
              filterType === 'full_length' && styles.activeFilterBtnText,
            ]}
          >
            {language === 'hi' ? 'फुल मॉक टेस्ट' : 'Full Length'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterType === 'sectional' && styles.activeFilterBtn,
          ]}
          onPress={() => setFilterType('sectional')}
        >
          <Text
            style={[
              styles.filterBtnText,
              filterType === 'sectional' && styles.activeFilterBtnText,
            ]}
          >
            {language === 'hi' ? 'अध्याय-वार' : 'Sectional'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Test Cards List */}
      <View style={styles.listContainer}>
        {filteredTests.map((test) => (
          <View key={test.id} style={styles.testCard}>
            {/* Top row: badge & type */}
            <View style={styles.testCardHeader}>
              <View
                style={[
                  styles.typeBadge,
                  test.type === 'full_length'
                    ? styles.fullLengthBadge
                    : styles.sectionalBadge,
                ]}
              >
                <Text
                  style={[
                    styles.typeBadgeText,
                    test.type === 'full_length'
                      ? styles.fullLengthBadgeText
                      : styles.sectionalBadgeText,
                  ]}
                >
                  {test.type === 'full_length'
                    ? language === 'hi'
                      ? 'फुल मॉक टेस्ट'
                      : 'FULL MOCK'
                    : language === 'hi'
                    ? 'अध्याय क्विज़'
                    : 'SECTIONAL'}
                </Text>
              </View>

              {test.badge && (
                <View style={styles.highlightBadge}>
                  <Text style={styles.highlightBadgeText}>
                    {test.badge[language]}
                  </Text>
                </View>
              )}
            </View>

            {/* Test Title & Subtitle */}
            <Text style={styles.testTitle}>{test.title[language]}</Text>
            <Text style={styles.testSubtitle}>{test.subtitle[language]}</Text>

            {/* Meta tags: Qs, Mins, Marks */}
            <View style={styles.testMetaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="help-circle-outline" size={16} color="#64748B" />
                <Text style={styles.metaText}>
                  {test.questionCount} {t.questions}
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="#64748B" />
                <Text style={styles.metaText}>
                  {test.durationMinutes} {t.minutes}
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="trophy-outline" size={16} color="#64748B" />
                <Text style={styles.metaText}>
                  {test.totalMarks} {t.marks}
                </Text>
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startTestButton}
              onPress={() => onStartTest(test.id)}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={16} color="#FFFFFF" />
              <Text style={styles.startTestButtonText}>{t.startTest}</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeFilterBtn: {
    backgroundColor: '#1E3A8A',
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  activeFilterBtnText: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 14,
  },
  testCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
    borderRadius: 8,
  },
  fullLengthBadge: {
    backgroundColor: '#EFF6FF',
  },
  sectionalBadge: {
    backgroundColor: '#F0FDF4',
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  fullLengthBadgeText: {
    color: '#1E3A8A',
  },
  sectionalBadgeText: {
    color: '#15803D',
  },
  highlightBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  highlightBadgeText: {
    color: '#C2410C',
    fontSize: 10,
    fontWeight: '800',
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
  },
  testSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  testMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 14,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  startTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  startTestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
