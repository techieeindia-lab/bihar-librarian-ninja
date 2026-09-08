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
import { useTheme } from '../theme';
import { SYLLABUS_DATA } from '../data/syllabus';

export const SyllabusScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.syllabusTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? 'BSEB LET एवं BPSC विद्यालय पुस्तकालयाध्यक्ष परीक्षा की विस्तृत रूपरेखा'
            : 'Detailed curriculum, eligibility, and marking scheme for Bihar Librarian exams'}
        </Text>
      </View>

      {/* Advisory Banner: Reassuring students about standard LIS curriculum */}
      <View
        style={[
          styles.advisoryBanner,
          {
            backgroundColor: isDark ? 'rgba(0, 112, 243, 0.1)' : '#EFF6FF',
            borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
          },
        ]}
      >
        <Ionicons name="shield-checkmark" size={20} color={colors.accent} style={{ marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.advisoryTitle, { color: colors.accent }]}>
            {language === 'hi' ? 'पाठ्यक्रम सुरक्षा एवं मार्गदर्शन' : 'National Standard LIS Framework'}
          </Text>
          <Text style={[styles.advisoryBody, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? 'बिहार सरकार/BSEB द्वारा विस्तृत आधिकारिक अधिसूचना आने तक यह अध्ययन योजना राष्ट्रीय मानकों (NIOS, KVS, RPSC 2nd Grade) एवं डॉ. रंगनाथन के आधारभूत सिद्धांतों पर आधारित है, जिससे आपका 100% सिलेबस पूर्णतः सुरक्षित और तैयार रहे।'
              : 'While the state-specific announcement is awaited, this course is curated based on National LIS Standards (NIOS, KVS, RPSC 2nd Grade) ensuring 100% preparation and exam safety.'}
          </Text>
        </View>
      </View>

      {/* Conducting Bodies & Portals */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="business-outline" size={18} color={colors.accent} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'आयोजक संस्थाएं एवं आधिकारिक पोर्टल' : 'Conducting Bodies & Portals'}
          </Text>
        </View>

        {SYLLABUS_DATA.conductingBodies.map((body, idx) => (
          <View
            key={idx}
            style={[
              styles.bodyItem,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.bodyInfo}>
              <Text style={[styles.bodyName, { color: colors.textPrimary }]}>
                {body.name[language]}
              </Text>
              <Text style={[styles.bodyRole, { color: colors.textSecondary }]}>
                {body.role[language]}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.portalBtn,
                {
                  backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                  borderColor: isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE',
                },
              ]}
              onPress={() => handleOpenUrl(body.website)}
              activeOpacity={0.7}
            >
              <Ionicons name="open-outline" size={13} color={colors.accent} />
              <Text style={[styles.portalBtnText, { color: colors.accent }]}>
                {language === 'hi' ? 'वेबसाइट' : 'Portal'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Eligibility Criteria */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="school-outline" size={18} color={colors.success} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {t.eligibilityTitle}
          </Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={[styles.eligibilityLabel, { color: colors.textPrimary }]}>
            {language === 'hi' ? '1. शैक्षणिक योग्यता:' : '1. Educational Qualification:'}
          </Text>
          <Text style={[styles.eligibilityDesc, { color: colors.textSecondary }]}>
            {SYLLABUS_DATA.eligibility.education[language]}
          </Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={[styles.eligibilityLabel, { color: colors.textPrimary }]}>
            {language === 'hi' ? '2. आयु सीमा:' : '2. Age Limits:'}
          </Text>
          <Text style={[styles.eligibilityDesc, { color: colors.textSecondary }]}>
            {SYLLABUS_DATA.eligibility.ageLimit[language]}
          </Text>
        </View>

        <View style={styles.eligibilityItem}>
          <Text style={[styles.eligibilityLabel, { color: colors.textPrimary }]}>
            {language === 'hi' ? '3. अधिवास (Domicile):' : '3. Domicile Requirement:'}
          </Text>
          <Text style={[styles.eligibilityDesc, { color: colors.textSecondary }]}>
            {SYLLABUS_DATA.eligibility.domicile[language]}
          </Text>
        </View>
      </View>

      {/* Exam Pattern & Marking Scheme */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="clipboard-outline" size={18} color={colors.warning} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {t.examStructureTitle}
          </Text>
        </View>

        <View style={styles.patternGrid}>
          <View
            style={[
              styles.patternCell,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.patternCellNum, { color: colors.accent }]}>
              {SYLLABUS_DATA.examPattern.totalQuestions}
            </Text>
            <Text style={[styles.patternCellLabel, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'कुल प्रश्न' : 'Total Questions'}
            </Text>
          </View>

          <View
            style={[
              styles.patternCell,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.patternCellNum, { color: colors.success }]}>
              {SYLLABUS_DATA.examPattern.totalMarks}
            </Text>
            <Text style={[styles.patternCellLabel, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'कुल अंक' : 'Total Marks'}
            </Text>
          </View>

          <View
            style={[
              styles.patternCell,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.patternCellNum, { color: isDark ? colors.amber : '#D97706' }]}>
              {SYLLABUS_DATA.examPattern.duration}
            </Text>
            <Text style={[styles.patternCellLabel, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'अवधि' : 'Duration'}
            </Text>
          </View>
        </View>
      </View>

      {/* Detailed Sectional Syllabus Breakdown */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="list-outline" size={18} color={colors.violet} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'खंड-वार विस्तृत पाठ्यक्रम' : 'Sectional Breakdown'}
          </Text>
        </View>

        {SYLLABUS_DATA.examPattern.sections.map((sec, idx) => (
          <View
            key={idx}
            style={[
              styles.sectionBlock,
              { borderTopColor: colors.border },
            ]}
          >
            <View style={styles.sectionBlockHeader}>
              <Text style={[styles.sectionBlockTitle, { color: colors.textPrimary }]}>
                {sec.title[language]}
              </Text>
              <View
                style={[
                  styles.weightageBadge,
                  {
                    backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                  },
                ]}
              >
                <Text style={[styles.weightageBadgeText, { color: colors.accent }]}>
                  {sec.weightage}
                </Text>
              </View>
            </View>

            <View style={styles.topicList}>
              {sec.topics.map((top, tIdx) => (
                <View key={tIdx} style={styles.topicBullet}>
                  <Text style={[styles.bulletSymbol, { color: colors.accent }]}>•</Text>
                  <Text style={[styles.topicText, { color: colors.textSecondary }]}>
                    {top[language]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  advisoryBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  advisoryTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },
  advisoryBody: {
    fontSize: 11,
    lineHeight: 16,
  },
  card: {
    borderRadius: 14,
    padding: 15,
    marginVertical: 6,
    borderWidth: 1,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  bodyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
  },
  bodyInfo: {
    flex: 1,
    marginRight: 8,
  },
  bodyName: {
    fontSize: 13,
    fontWeight: '800',
  },
  bodyRole: {
    fontSize: 11,
    marginTop: 2,
  },
  portalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  portalBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  eligibilityItem: {
    marginBottom: 10,
  },
  eligibilityLabel: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  eligibilityDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  patternGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  patternCell: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  patternCellNum: {
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  patternCellLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  sectionBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionBlockTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    marginRight: 6,
  },
  weightageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightageBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  topicList: {
    gap: 4,
  },
  topicBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletSymbol: {
    fontSize: 14,
    marginRight: 6,
    lineHeight: 16,
  },
  topicText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
});
