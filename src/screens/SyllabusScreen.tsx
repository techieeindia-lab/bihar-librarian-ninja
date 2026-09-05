import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { SYLLABUS_DATA } from '../data/syllabus';

export const SyllabusScreen: React.FC = () => {
  const { language, t } = useLanguage();

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.syllabusTitle}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'BSEB LET एवं BPSC विद्यालय पुस्तकालयाध्यक्ष परीक्षा की विस्तृत रूपरेखा'
            : 'Detailed curriculum, eligibility, and marking scheme for Bihar Librarian exams'}
        </Text>
      </View>

      {/* Conducting Bodies & Portals */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="business" size={20} color="#1E3A8A" />
          <Text style={styles.cardTitle}>
            {language === 'hi' ? 'आयोजक संस्थाएं एवं आधिकारिक पोर्टल' : 'Conducting Bodies & Official Portals'}
          </Text>
        </View>

        {SYLLABUS_DATA.conductingBodies.map((body, idx) => (
          <View key={idx} style={styles.bodyItem}>
            <View style={styles.bodyInfo}>
              <Text style={styles.bodyName}>{body.name[language]}</Text>
              <Text style={styles.bodyRole}>{body.role[language]}</Text>
            </View>
            <TouchableOpacity
              style={styles.portalBtn}
              onPress={() => handleOpenUrl(body.website)}
            >
              <Ionicons name="open-outline" size={14} color="#1E3A8A" />
              <Text style={styles.portalBtnText}>
                {language === 'hi' ? 'वेबसाइट' : 'Portal'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Eligibility Criteria */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="school" size={20} color="#10B981" />
          <Text style={styles.cardTitle}>{t.eligibilityTitle}</Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={styles.eligibilityLabel}>
            {language === 'hi' ? '1. शैक्षणिक योग्यता:' : '1. Educational Qualification:'}
          </Text>
          <Text style={styles.eligibilityDesc}>
            {SYLLABUS_DATA.eligibility.education[language]}
          </Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={styles.eligibilityLabel}>
            {language === 'hi' ? '2. आयु सीमा:' : '2. Age Limits:'}
          </Text>
          <Text style={styles.eligibilityDesc}>
            {SYLLABUS_DATA.eligibility.ageLimit[language]}
          </Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={styles.eligibilityLabel}>
            {language === 'hi' ? '3. अधिवास (Domicile):' : '3. Domicile Requirement:'}
          </Text>
          <Text style={styles.eligibilityDesc}>
            {SYLLABUS_DATA.eligibility.domicile[language]}
          </Text>
        </View>
      </View>

      {/* Exam Pattern & Marking Scheme */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="clipboard" size={20} color="#F59E0B" />
          <Text style={styles.cardTitle}>{t.examStructureTitle}</Text>
        </View>

        <View style={styles.patternGrid}>
          <View style={styles.patternCell}>
            <Text style={styles.patternCellNum}>{SYLLABUS_DATA.examPattern.totalQuestions}</Text>
            <Text style={styles.patternCellLabel}>
              {language === 'hi' ? 'कुल प्रश्न' : 'Total Questions'}
            </Text>
          </View>

          <View style={styles.patternCell}>
            <Text style={styles.patternCellNum}>{SYLLABUS_DATA.examPattern.totalMarks}</Text>
            <Text style={styles.patternCellLabel}>
              {language === 'hi' ? 'कुल अंक' : 'Total Marks'}
            </Text>
          </View>

          <View style={styles.patternCell}>
            <Text style={styles.patternCellNum}>{SYLLABUS_DATA.examPattern.duration}</Text>
            <Text style={styles.patternCellLabel}>
              {language === 'hi' ? 'परीक्षा अवधि' : 'Exam Duration'}
            </Text>
          </View>
        </View>
      </View>

      {/* Detailed Sectional Syllabus Breakdown */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="list" size={20} color="#8B5CF6" />
          <Text style={styles.cardTitle}>
            {language === 'hi' ? 'खंड-वार विस्तृत पाठ्यक्रम' : 'Sectional Syllabus Breakdown'}
          </Text>
        </View>

        {SYLLABUS_DATA.examPattern.sections.map((sec, idx) => (
          <View key={idx} style={styles.sectionBlock}>
            <View style={styles.sectionBlockHeader}>
              <Text style={styles.sectionBlockTitle}>{sec.title[language]}</Text>
              <View style={styles.weightageBadge}>
                <Text style={styles.weightageBadgeText}>{sec.weightage}</Text>
              </View>
            </View>

            <View style={styles.topicList}>
              {sec.topics.map((top, tIdx) => (
                <View key={tIdx} style={styles.topicBullet}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.topicText}>{top[language]}</Text>
                </View>
              ))}
            </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  bodyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  bodyInfo: {
    flex: 1,
    marginRight: 8,
  },
  bodyName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bodyRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  portalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  portalBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  eligibilityItem: {
    marginBottom: 12,
  },
  eligibilityLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  eligibilityDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  patternGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  patternCell: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  patternCellNum: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  patternCellLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  sectionBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionBlockTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#1E3A8A',
    marginRight: 6,
  },
  weightageBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  weightageBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  topicList: {
    gap: 6,
  },
  topicBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletSymbol: {
    fontSize: 14,
    color: '#2563EB',
    marginRight: 6,
    lineHeight: 18,
  },
  topicText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
});
