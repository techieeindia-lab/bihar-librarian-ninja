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
import { useTheme, unitColorMap } from '../theme';
import { STUDY_UNITS } from '../data/studyNotes';
import { StudyUnit } from '../types';

interface NotesScreenProps {
  initialUnitId?: string | null;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({ initialUnitId }) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [selectedUnit, setSelectedUnit] = useState<StudyUnit>(
    STUDY_UNITS.find((u) => u.id === initialUnitId) || STUDY_UNITS[0]
  );
  const [expandedTopicId, setExpandedTopicId] = useState<string>(
    selectedUnit.topics[0]?.id || ''
  );

  const handleSelectUnit = (unit: StudyUnit) => {
    setSelectedUnit(unit);
    setExpandedTopicId(unit.topics[0]?.id || '');
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopicId((prev) => (prev === topicId ? '' : topicId));
  };

  const activeColorConfig =
    unitColorMap[selectedUnit.unitNumber] || unitColorMap[1];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.notesTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? 'परीक्षा उपयोगी 7 यूनिट सारगर्भित अध्ययन सामग्री एवं मुख्य तथ्य'
            : 'Concise study notes, key facts, and revision highlights across 7 units'}
        </Text>
      </View>

      {/* Horizontal Unit Selector Tabs (Color-Coded) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.unitSelectorScroll}
      >
        {STUDY_UNITS.map((unit) => {
          const isSelected = selectedUnit.id === unit.id;
          const uColor = unitColorMap[unit.unitNumber] || unitColorMap[1];

          return (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitChip,
                {
                  backgroundColor: isSelected
                    ? uColor.primary
                    : isDark
                    ? uColor.softDark
                    : colors.card,
                  borderColor: isSelected
                    ? uColor.primary
                    : isDark
                    ? uColor.borderDark
                    : colors.border,
                },
              ]}
              onPress={() => handleSelectUnit(unit)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.unitDot,
                  {
                    backgroundColor: isSelected ? '#FFFFFF' : uColor.primary,
                  },
                ]}
              />
              <Text
                style={[
                  styles.unitChipText,
                  {
                    color: isSelected
                      ? '#FFFFFF'
                      : isDark
                      ? '#EDEDED'
                      : colors.textPrimary,
                    fontWeight: isSelected ? '800' : '600',
                  },
                ]}
              >
                {language === 'hi'
                  ? `यूनिट ${unit.unitNumber}`
                  : `Unit ${unit.unitNumber}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Unit Banner (Color-Coded to Active Unit) */}
      <View
        style={[
          styles.unitBanner,
          {
            backgroundColor: isDark
              ? activeColorConfig.softDark
              : activeColorConfig.softLight,
            borderColor: isDark
              ? activeColorConfig.borderDark
              : activeColorConfig.borderLight,
            borderLeftColor: activeColorConfig.primary,
          },
        ]}
      >
        <View style={styles.bannerTopRow}>
          <View
            style={[
              styles.unitBadgePill,
              { backgroundColor: activeColorConfig.primary },
            ]}
          >
            <Text style={styles.unitBadgePillText}>
              {language === 'hi' ? `यूनिट ${selectedUnit.unitNumber}` : `UNIT ${selectedUnit.unitNumber}`}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.unitBannerTitle,
            { color: isDark ? '#FFFFFF' : activeColorConfig.primary },
          ]}
        >
          {selectedUnit.title[language]}
        </Text>
        <Text style={[styles.unitBannerDesc, { color: colors.textSecondary }]}>
          {selectedUnit.shortDesc[language]}
        </Text>
      </View>

      {/* Topics Accordion List */}
      <View style={styles.topicsContainer}>
        {selectedUnit.topics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <View
              key={topic.id}
              style={[
                styles.topicCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isExpanded ? activeColorConfig.primary : colors.border,
                  borderLeftWidth: isExpanded ? 3 : 1,
                  borderLeftColor: isExpanded ? activeColorConfig.primary : colors.border,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.topicHeader,
                  {
                    backgroundColor: colors.card,
                  },
                ]}
                onPress={() => toggleTopic(topic.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.topicTitle,
                    {
                      color: isExpanded
                        ? activeColorConfig.primary
                        : colors.textPrimary,
                    },
                  ]}
                >
                  {topic.title[language]}
                </Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={isExpanded ? activeColorConfig.primary : colors.textSecondary}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View
                  style={[
                    styles.topicBody,
                    {
                      borderTopColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.topicContent, { color: colors.textPrimary }]}>
                    {topic.content[language]}
                  </Text>

                  {/* Key Exam Points Box */}
                  {topic.keyPoints && topic.keyPoints.length > 0 && (
                    <View
                      style={[
                        styles.keyPointsBox,
                        {
                          backgroundColor: isDark
                            ? 'rgba(245, 158, 11, 0.12)'
                            : '#FFFBEB',
                          borderColor: isDark
                            ? 'rgba(245, 158, 11, 0.3)'
                            : '#FDE68A',
                          borderLeftColor: '#F59E0B',
                        },
                      ]}
                    >
                      <View style={styles.keyPointsHeader}>
                        <Ionicons name="star" size={15} color="#F59E0B" />
                        <Text
                          style={[
                            styles.keyPointsTitle,
                            { color: isDark ? '#FBBF24' : '#92400E' },
                          ]}
                        >
                          {t.keyPoints}
                        </Text>
                      </View>
                      {topic.keyPoints.map((pt, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={[styles.bulletDot, { color: '#F59E0B' }]}>•</Text>
                          <Text
                            style={[
                              styles.bulletText,
                              { color: isDark ? colors.textPrimary : '#78350F' },
                            ]}
                          >
                            {pt[language]}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
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
  unitSelectorScroll: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
  },
  unitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    gap: 6,
  },
  unitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  unitChipText: {
    fontSize: 12,
  },
  unitBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
  },
  bannerTopRow: {
    marginBottom: 6,
  },
  unitBadgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unitBadgePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  unitBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  unitBannerDesc: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  topicsContainer: {
    gap: 10,
  },
  topicCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  topicTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    marginRight: 8,
    letterSpacing: -0.2,
  },
  topicBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  topicContent: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
  },
  keyPointsBox: {
    marginTop: 14,
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderWidth: 1,
  },
  keyPointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  keyPointsTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 3,
  },
  bulletDot: {
    fontSize: 15,
    marginRight: 6,
    lineHeight: 17,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
});
