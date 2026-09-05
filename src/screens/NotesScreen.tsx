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
import { STUDY_UNITS } from '../data/studyNotes';
import { StudyUnit } from '../types';

interface NotesScreenProps {
  initialUnitId?: string | null;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({ initialUnitId }) => {
  const { language, t } = useLanguage();
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.notesTitle}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'परीक्षा उपयोगी सारगर्भित अध्ययन सामग्री एवं मुख्य परीक्षा तथ्य'
            : 'Concise study notes, key facts, and revision highlights'}
        </Text>
      </View>

      {/* Horizontal Unit Selector Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.unitSelectorScroll}
      >
        {STUDY_UNITS.map((unit) => {
          const isSelected = selectedUnit.id === unit.id;
          return (
            <TouchableOpacity
              key={unit.id}
              style={[
                styles.unitChip,
                isSelected && styles.selectedUnitChip,
              ]}
              onPress={() => handleSelectUnit(unit)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.unitChipText,
                  isSelected && styles.selectedUnitChipText,
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

      {/* Active Unit Banner */}
      <View style={styles.unitBanner}>
        <Text style={styles.unitBannerTitle}>
          {selectedUnit.title[language]}
        </Text>
        <Text style={styles.unitBannerDesc}>
          {selectedUnit.shortDesc[language]}
        </Text>
      </View>

      {/* Topics Accordion List */}
      <View style={styles.topicsContainer}>
        {selectedUnit.topics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          return (
            <View key={topic.id} style={styles.topicCard}>
              <TouchableOpacity
                style={styles.topicHeader}
                onPress={() => toggleTopic(topic.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.topicTitle}>{topic.title[language]}</Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#1E3A8A"
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.topicBody}>
                  <Text style={styles.topicContent}>
                    {topic.content[language]}
                  </Text>

                  {/* Key Exam Points Box */}
                  {topic.keyPoints && topic.keyPoints.length > 0 && (
                    <View style={styles.keyPointsBox}>
                      <View style={styles.keyPointsHeader}>
                        <Ionicons name="star" size={16} color="#D97706" />
                        <Text style={styles.keyPointsTitle}>{t.keyPoints}</Text>
                      </View>
                      {topic.keyPoints.map((pt, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>
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
  unitSelectorScroll: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
  },
  unitChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedUnitChip: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  unitChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  selectedUnitChipText: {
    color: '#FFFFFF',
  },
  unitBanner: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  unitBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  unitBannerDesc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    lineHeight: 18,
  },
  topicsContainer: {
    gap: 12,
  },
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  topicTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 8,
  },
  topicBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  topicContent: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginTop: 12,
  },
  keyPointsBox: {
    marginTop: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  keyPointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  keyPointsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  bulletDot: {
    fontSize: 16,
    color: '#B45309',
    marginRight: 6,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
    fontWeight: '600',
  },
});
