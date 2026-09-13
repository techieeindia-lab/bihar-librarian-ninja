import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, ThemeMode } from '../theme';
import { ActiveTab } from '../types';
import { DataService, DbStatusInfo } from '../services/dataService';

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

  const [dbInfo, setDbInfo] = useState<DbStatusInfo | null>(null);
  const [isCheckingDb, setIsCheckingDb] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Admin & Developer Tools (Hidden from students by default)
  const [showAdminDevTools, setShowAdminDevTools] = useState(false);
  const [versionTapCount, setVersionTapCount] = useState(0);

  useEffect(() => {
    if (showAdminDevTools) {
      checkDb();
    }
  }, [showAdminDevTools]);

  const handleVersionTap = () => {
    const nextCount = versionTapCount + 1;
    if (nextCount >= 7) {
      setVersionTapCount(0);
      const nextState = !showAdminDevTools;
      setShowAdminDevTools(nextState);
      Alert.alert(
        nextState ? 'Admin Tools Unlocked' : 'Admin Tools Hidden',
        nextState
          ? 'Developer database diagnostics and cloud sync controls are now visible.'
          : 'Database diagnostics are now hidden from view.'
      );
      if (nextState && !dbInfo) {
        checkDb();
      }
    } else {
      setVersionTapCount(nextCount);
    }
  };

  const checkDb = async () => {
    setIsCheckingDb(true);
    try {
      const info = await DataService.checkConnection();
      setDbInfo(info);
    } catch (e) {}
    setIsCheckingDb(false);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await DataService.syncAllFromDatabase();
      if (res.success) {
        setSyncMessage(
          language === 'hi'
            ? `✓ सिंक पूर्ण: ${res.counts.quizzes} क्विज़, ${res.counts.oneLiners} तथ्य, ${res.counts.units} यूनिट्स`
            : `✓ Synced: ${res.counts.quizzes} Quizzes, ${res.counts.oneLiners} Facts, ${res.counts.units} Units`
        );
        await checkDb();
      } else {
        setSyncMessage(
          language === 'hi' ? `✗ सिंक त्रुटि: ${res.error}` : `✗ Sync failed: ${res.error}`
        );
      }
    } catch (e: any) {
      setSyncMessage(`✗ Error: ${e?.message || 'Sync failed'}`);
    }
    setIsSyncing(false);
  };

  const handleShareApp = async () => {
    try {
      const shareUrl = 'https://play.google.com/store/apps/details?id=com.biharlibrarian.examninja';
      const msg =
        language === 'hi'
          ? `🎯 *बिहार विद्यालय पुस्तकालयाध्यक्ष परीक्षा 2026 की सम्पूर्ण तैयारी!* 📚\n\n"Bihar Librarian Ninja" ऐप में पाएं:\n✅ 5 सम्पूर्ण यूनिट नोट्स (29 टॉपिक्स)\n✅ 725+ हाई-यील्ड वन-लाइनर तथ्य\n✅ 450+ क्विक रिवीजन फ्लैशकार्ड्स\n✅ LIS शब्दावली व वर्ष डिक्शनरी (SOUL, 1933, DDC)\n✅ डेली चैलेंज व 10-प्रश्न CBT मॉक टेस्ट\n⚡ 100% नि:शुल्क एवं ऑफ़लाइन (बिना इंटरनेट)\n\n📲 अभी डाउनलोड करें:\n${shareUrl}`
          : `🎯 *Bihar School Librarian Exam 2026 Preparation App!* 📚\n\nDownload "Bihar Librarian Ninja":\n✅ 5 Complete Units (29 Topics) in Hindi & English\n✅ 725+ High-Yield One-Liner Facts\n✅ 450+ Quick Revision Flashcards\n✅ LIS Acronyms & Milestone Years Glossary\n✅ Daily Quizzes & Mistake Notebook\n⚡ 100% Free & Offline\n\n📲 Download on Google Play:\n${shareUrl}`;

      await Share.share({
        message: msg,
        title: language === 'hi' ? 'बिहार लाइब्रेरियन निंजा' : 'Bihar Librarian Ninja',
      });
    } catch (e) {}
  };

  const handleRateApp = () => {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.biharlibrarian.examninja';
    const marketUrl = 'market://details?id=com.biharlibrarian.examninja';

    Linking.canOpenURL(marketUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(marketUrl);
        } else {
          Linking.openURL(playStoreUrl);
        }
      })
      .catch(() => {
        Linking.openURL(playStoreUrl);
      });
  };

  const handleContactFeedback = () => {
    const subject = encodeURIComponent('Bihar Librarian Ninja App - Feedback / Query');
    const body = encodeURIComponent(
      `नमस्ते / Hello Team,\n\nऐप सुझाव / प्रश्न में सुधार / समस्या:\n\n\n---\nApp Version: 1.0.0\nLanguage: ${language}\nPackage: com.biharlibrarian.examninja`
    );
    Linking.openURL(`mailto:ninjaexamstudio@outlook.com?subject=${subject}&body=${body}`).catch(() => {
      Alert.alert(
        language === 'hi' ? 'संपर्क ईमेल' : 'Contact Support',
        language === 'hi'
          ? 'कृपया हमें सीधे इस ईमेल पर लिखें:\nninjaexamstudio@outlook.com'
          : 'Please write to us directly at:\nninjaexamstudio@outlook.com'
      );
    });
  };

  const handleOpenBseb = () => {
    Linking.openURL('https://biharboardonline.bihar.gov.in').catch(() => {});
  };

  const handleOpenBpsc = () => {
    Linking.openURL('https://bpsc.bih.nic.in').catch(() => {});
  };

  const flashcardCount = dbInfo?.counts?.flashcards || 457;
  const oneLinerCount = dbInfo?.counts?.oneLiners || 725;

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

      {/* Quick Launch Cards */}
      {onNavigateTab && (
        <View style={styles.quickLaunchGrid}>
          {/* Flashcards */}
          <TouchableOpacity
            style={[
              styles.quickLaunchCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('flashcards')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.quickLaunchIcon,
                {
                  backgroundColor: isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF',
                },
              ]}
            >
              <Ionicons name="flash" size={20} color="#0070F3" />
            </View>
            <Text style={[styles.quickLaunchTitle, { color: colors.textPrimary }]}>
              {t.tabCards}
            </Text>
            <Text style={[styles.quickLaunchSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi' ? `${flashcardCount} रिवीजन कार्ड` : `${flashcardCount} Flashcards`}
            </Text>
          </TouchableOpacity>

          {/* One-Liners */}
          <TouchableOpacity
            style={[
              styles.quickLaunchCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('oneliners')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.quickLaunchIcon,
                {
                  backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                },
              ]}
            >
              <Ionicons name="sparkles" size={20} color="#EA580C" />
            </View>
            <Text style={[styles.quickLaunchTitle, { color: colors.textPrimary }]}>
              {t.tabOneLiners}
            </Text>
            <Text style={[styles.quickLaunchSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi' ? `${oneLinerCount} अचूक तथ्य` : `${oneLinerCount} High-Yield`}
            </Text>
          </TouchableOpacity>

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
              {bookmarksCount} {language === 'hi' ? 'सहेजे प्रश्न' : 'Saved Qs'}
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

          {/* LIS Quick Glossary (Acronyms & Milestone Years) */}
          <TouchableOpacity
            style={[
              styles.quickLaunchCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onNavigateTab('glossary')}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.quickLaunchIcon,
                {
                  backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : '#F5F3FF',
                },
              ]}
            >
              <Ionicons name="text" size={20} color="#7C3AED" />
            </View>
            <Text style={[styles.quickLaunchTitle, { color: colors.textPrimary }]}>
              {language === 'hi' ? 'शब्दावली व वर्ष' : 'LIS Glossary'}
            </Text>
            <Text style={[styles.quickLaunchSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'SOUL, DDC, 1933...' : 'Acronyms & Dates'}
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

      {/* Supabase Cloud Database & Live Sync Monitor (Admin Only) */}
      {showAdminDevTools && (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: '#10B981',
              borderWidth: 1.5,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="shield-checkmark" size={18} color="#10B981" />
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'एडमिन / क्लाउड डेटाबेस मॉनिटर' : 'Admin Cloud DB Monitor'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 12, borderWidth: 1, borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dbInfo?.connected ? '#10B981' : '#F59E0B', marginRight: 5 }} />
              <Text style={{ fontSize: 10, fontWeight: '700', color: dbInfo?.connected ? '#10B981' : '#F59E0B' }}>
                {isCheckingDb ? 'Checking...' : dbInfo?.connected ? 'Live Connected' : 'Offline Mode'}
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 10 }}>
            {language === 'hi'
              ? 'एडमिन पैनल: ऐप का सारा कंटेंट (क्विज़, वन-लाइनर, नोट्स) सुपाबेस से सिंक होता है।'
              : 'Admin panel: Remote tables status & real-time sync control.'}
          </Text>

          {/* Database Live Stats Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            <View style={{ flex: 1, minWidth: '45%', backgroundColor: colors.canvasSubtle, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>{language === 'hi' ? 'रैपिड क्विज़' : 'Rapid Quizzes'}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: colors.textPrimary }}>
                {dbInfo?.counts.quizzes ?? '...'} {language === 'hi' ? 'क्विज़' : 'items'}
              </Text>
            </View>
            <View style={{ flex: 1, minWidth: '45%', backgroundColor: colors.canvasSubtle, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>{language === 'hi' ? 'वन-लाइनर तथ्य' : 'One-Liners'}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: colors.textPrimary }}>
                {dbInfo?.counts.oneLiners ?? '...'} {language === 'hi' ? 'तथ्य' : 'facts'}
              </Text>
            </View>
            <View style={{ flex: 1, minWidth: '45%', backgroundColor: colors.canvasSubtle, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>{language === 'hi' ? 'अध्ययन यूनिट्स' : 'Study Units'}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: colors.textPrimary }}>
                {dbInfo?.counts.units ?? '...'} {language === 'hi' ? 'यूनिट' : 'units'}
              </Text>
            </View>
            <View style={{ flex: 1, minWidth: '45%', backgroundColor: colors.canvasSubtle, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>{language === 'hi' ? 'फ्लैशकार्ड्स' : 'Flashcards'}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: colors.textPrimary }}>
                {dbInfo?.counts.flashcards ?? '...'} {language === 'hi' ? 'कार्ड्स' : 'cards'}
              </Text>
            </View>
          </View>

          {/* Sync Feedback Message */}
          {syncMessage && (
            <View style={{ padding: 8, backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : '#A7F3D0' }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#10B981' }}>{syncMessage}</Text>
            </View>
          )}

          {/* Buttons Row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.primary, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 8 }}
              onPress={handleSyncNow}
              disabled={isSyncing}
              activeOpacity={0.8}
            >
              {isSyncing ? (
                <ActivityIndicator size="small" color={colors.textOnPrimary} />
              ) : (
                <Ionicons name="cloud-download-outline" size={15} color={colors.textOnPrimary} />
              )}
              <Text style={{ color: colors.textOnPrimary, fontSize: 12, fontWeight: '700' }}>
                {isSyncing ? (language === 'hi' ? 'सिंक हो रहा है...' : 'Syncing...') : (language === 'hi' ? 'डेटाबेस से री-सिंक करें' : 'Sync From Cloud DB')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: colors.canvasSubtle, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border }}
              onPress={checkDb}
              disabled={isCheckingDb}
              activeOpacity={0.8}
            >
              {isCheckingDb ? (
                <ActivityIndicator size="small" color={colors.textPrimary} />
              ) : (
                <Ionicons name="pulse-outline" size={15} color={colors.textPrimary} />
              )}
              <Text style={{ color: colors.textPrimary, fontSize: 12, fontWeight: '600' }}>
                {language === 'hi' ? 'जांचें' : 'Test Ping'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
          onPress={handleRateApp}
          activeOpacity={0.7}
        >
          <Ionicons name="star" size={18} color="#F59E0B" />
          <Text style={[styles.actionRowText, { color: colors.textPrimary }]}>
            {t.rateApp}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

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

        {/* Contact & Feedback Email */}
        <TouchableOpacity
          style={styles.actionRow}
          onPress={handleContactFeedback}
          activeOpacity={0.7}
        >
          <Ionicons name="mail-outline" size={18} color="#0070F3" />
          <Text style={[styles.actionRowText, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'सुझाव या त्रुटि रिपोर्ट करें' : 'Feedback & Contact Support'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <TouchableOpacity
          style={styles.infoRow}
          onPress={handleVersionTap}
          activeOpacity={0.8}
        >
          <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {t.playStoreVersion}
          </Text>
          {showAdminDevTools && (
            <View style={{ marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#10B981', borderRadius: 4 }}>
              <Text style={{ fontSize: 9, color: '#FFF', fontWeight: '800' }}>ADMIN</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Ionicons name="heart" size={18} color="#EF4444" />
          <Text style={[styles.infoText, { color: colors.textSecondary, fontWeight: '600' }]}>
            {language === 'hi'
              ? 'Ninja Exam Studio द्वारा ❤️ से निर्मित'
              : 'Crafted with ❤️ by Ninja Exam Studio'}
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
  quickLaunchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  quickLaunchCard: {
    width: '48%',
    borderRadius: 14,
    padding: 12,
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
