import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, ThemeMode } from '../theme';
import { ActiveTab } from '../types';

interface SettingsScreenProps {
  onNavigateTab?: (tab: ActiveTab) => void;
  bookmarksCount?: number;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateTab,
  bookmarksCount = 0,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { colors, isDark, themeMode, setThemeMode } = useTheme();

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          language === 'hi'
            ? 'बिहार विद्यालय पुस्तकालयाध्यक्ष परीक्षा 2026 की बेहतरीन तैयारी के लिए "Bihar Librarian Ninja" ऐप डाउनलोड करें! इसमें 7 सम्पूर्ण नोट्स यूनिट, रंगनाथन के नियम, DDC/CC वर्गीकरण और फुल CBT मॉक टेस्ट उपलब्ध हैं।'
            : 'Download Bihar Librarian Ninja app for Bihar School Librarian & BPSC recruitment exam prep! Includes bilingual notes, DDC/CC rules, and full CBT mock tests.',
      });
    } catch (e) {}
  };

  const handleOpenBseb = () => {
    Linking.openURL('https://biharboardonline.bihar.gov.in').catch(() => {});
  };

  const handleOpenBpsc = () => {
    Linking.openURL('https://bpsc.bih.nic.in').catch(() => {});
  };

  const themeOptions: { mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { mode: 'system', label: t.themeSystem, icon: 'phone-portrait-outline' },
    { mode: 'light', label: t.themeLight, icon: 'sunny-outline' },
    { mode: 'dark', label: t.themeDark, icon: 'moon-outline' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          {t.moreMenuTitle}
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          {t.moreMenuSubtitle}
        </Text>
      </View>

      {/* Quick Launch Cards (Bookmarks & Syllabus) */}
      {onNavigateTab && (
        <View style={styles.quickLaunchRow}>
          {/* Bookmarks */}
          <TouchableOpacity
            style={[
              styles.quickLaunchCard,
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
                styles.quickLaunchIcon,
                {
                  backgroundColor: isDark ? 'rgba(245, 166, 35, 0.15)' : '#FFFBEB',
                },
              ]}
            >
              <Ionicons name="bookmark" size={20} color="#F5A623" />
              {bookmarksCount > 0 && (
                <View style={[styles.miniBadge, { backgroundColor: colors.accent }]}>
                  <Text style={styles.miniBadgeText}>{bookmarksCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.quickLaunchTitle, { color: colors.textPrimary }]}>
              {t.tabBookmarks}
            </Text>
            <Text style={[styles.quickLaunchSubtitle, { color: colors.textSecondary }]}>
              {bookmarksCount} {language === 'hi' ? 'सहेजे गए प्रश्न' : 'Saved Questions'}
            </Text>
          </TouchableOpacity>

          {/* Official Syllabus */}
          <TouchableOpacity
            style={[
              styles.quickLaunchCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('syllabus')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.quickLaunchIcon,
                {
                  backgroundColor: isDark ? 'rgba(121, 40, 202, 0.2)' : '#F5F3FF',
                },
              ]}
            >
              <Ionicons name="reader" size={20} color="#7928CA" />
            </View>
            <Text style={[styles.quickLaunchTitle, { color: colors.textPrimary }]}>
              {t.tabSyllabus}
            </Text>
            <Text style={[styles.quickLaunchSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'BSEB LET व BPSC' : 'Exam Scheme'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Theme Preference Card (Vercel Style) */}
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
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={18}
            color={isDark ? '#F59E0B' : '#0070F3'}
          />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {t.themeTitle}
          </Text>
        </View>

        <View style={styles.segmentedControl}>
          {themeOptions.map((opt) => {
            const isSelected = themeMode === opt.mode;
            return (
              <TouchableOpacity
                key={opt.mode}
                style={[
                  styles.segmentBtn,
                  {
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.canvasSubtle,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setThemeMode(opt.mode)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={opt.icon}
                  size={15}
                  color={isSelected ? colors.textOnPrimary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: isSelected ? colors.textOnPrimary : colors.textSecondary,
                      fontWeight: isSelected ? '800' : '600',
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Language Preference Card */}
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
          <Ionicons name="language" size={18} color={colors.accent} />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'भाषा चयन (App Language)' : 'Language Preference'}
          </Text>
        </View>

        <View style={styles.langSwitchRow}>
          <TouchableOpacity
            style={[
              styles.langOption,
              {
                backgroundColor:
                  language === 'hi' ? colors.primary : colors.canvasSubtle,
                borderColor: language === 'hi' ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setLanguage('hi')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.langOptionText,
                {
                  color: language === 'hi' ? colors.textOnPrimary : colors.textSecondary,
                  fontWeight: language === 'hi' ? '800' : '600',
                },
              ]}
            >
              हिन्दी (Hindi)
            </Text>
            {language === 'hi' && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.textOnPrimary}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.langOption,
              {
                backgroundColor:
                  language === 'en' ? colors.primary : colors.canvasSubtle,
                borderColor: language === 'en' ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setLanguage('en')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.langOptionText,
                {
                  color: language === 'en' ? colors.textOnPrimary : colors.textSecondary,
                  fontWeight: language === 'en' ? '800' : '600',
                },
              ]}
            >
              English
            </Text>
            {language === 'en' && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.textOnPrimary}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Mandatory Play Store Government Non-Affiliation Disclaimer */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : '#FEF2F2',
            borderColor: isDark ? 'rgba(239, 68, 68, 0.25)' : '#FECACA',
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={18} color="#EF4444" />
          <Text style={[styles.cardTitle, { color: '#EF4444' }]}>
            {t.disclaimerTitle}
          </Text>
        </View>
        <Text
          style={[
            styles.disclaimerText,
            { color: isDark ? '#FCA5A5' : '#991B1B' },
          ]}
        >
          {t.disclaimerBody}
        </Text>

        <View style={styles.portalLinksRow}>
          <TouchableOpacity
            style={[
              styles.officialLinkBtn,
              {
                backgroundColor: colors.cardElevated,
                borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : '#FCA5A5',
              },
            ]}
            onPress={handleOpenBseb}
          >
            <Ionicons name="globe-outline" size={14} color={colors.accent} />
            <Text style={[styles.officialLinkText, { color: colors.accent }]}>
              biharboardonline.bihar.gov.in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.officialLinkBtn,
              {
                backgroundColor: colors.cardElevated,
                borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : '#FCA5A5',
              },
            ]}
            onPress={handleOpenBpsc}
          >
            <Ionicons name="globe-outline" size={14} color={colors.accent} />
            <Text style={[styles.officialLinkText, { color: colors.accent }]}>
              bpsc.bih.nic.in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Privacy Policy */}
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
          <Ionicons name="lock-closed" size={18} color="#10B981" />
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {t.privacyPolicyTitle}
          </Text>
        </View>
        <Text style={[styles.policyText, { color: colors.textSecondary }]}>
          {t.privacyPolicyBody}
        </Text>
        <View
          style={[
            styles.safeTag,
            {
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
            },
          ]}
        >
          <Ionicons name="checkmark-done" size={15} color="#10B981" />
          <Text style={[styles.safeTagText, { color: '#10B981' }]}>
            {language === 'hi'
              ? '100% डेटा सुरक्षित - कोई व्यक्तिगत डेटा एकत्र नहीं किया जाता'
              : '100% Privacy Compliant - Local storage only'}
          </Text>
        </View>
      </View>

      {/* Share & Feedback */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionRow}
          onPress={handleShareApp}
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={18} color={colors.textPrimary} />
          <Text style={[styles.actionRowText, { color: colors.textPrimary }]}>
            {t.shareApp}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {t.playStoreVersion}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Ionicons name="cloud-offline-outline" size={18} color="#10B981" />
          <Text style={[styles.infoText, { color: '#10B981', fontWeight: '700' }]}>
            {t.offlineModeNotice}
          </Text>
        </View>
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
  quickLaunchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  quickLaunchCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 1,
  },
  quickLaunchIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  miniBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  miniBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  quickLaunchTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  quickLaunchSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
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
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  segmentedControl: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 5,
  },
  segmentText: {
    fontSize: 12,
  },
  langSwitchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  langOptionText: {
    fontSize: 13,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  portalLinksRow: {
    marginTop: 10,
    gap: 6,
  },
  officialLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
  },
  officialLinkText: {
    fontSize: 11,
    fontWeight: '700',
  },
  policyText: {
    fontSize: 12,
    lineHeight: 18,
  },
  safeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    marginTop: 10,
  },
  safeTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionRowText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 12,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
