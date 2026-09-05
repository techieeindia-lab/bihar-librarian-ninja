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

export const SettingsScreen: React.FC = () => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          language === 'hi'
            ? 'बिहार विद्यालय पुस्तकालयाध्यक्ष परीक्षा की बेहतरीन तैयारी के लिए "Bihar Librarian Ninja" ऐप डाउनलोड करें! इसमें सम्पूर्ण नोट्स, 5 सूत्र, DDC/CC वर्गीकरण और फुल मॉक टेस्ट उपलब्ध हैं।'
            : 'Download Bihar Librarian Ninja app for Bihar School Librarian & BPSC recruitment exam prep! Includes complete bilingual notes, DDC/CC rules, and full CBT mock tests.',
      });
    } catch (e) {}
  };

  const handleOpenBseb = () => {
    Linking.openURL('https://biharboardonline.bihar.gov.in').catch(() => {});
  };

  const handleOpenBpsc = () => {
    Linking.openURL('https://bpsc.bih.nic.in').catch(() => {});
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={styles.screenTitle}>{t.settingsTitle}</Text>
        <Text style={styles.screenSubtitle}>
          {language === 'hi'
            ? 'ऐप प्राथमिकताएं, कानूनी अस्वीकरण एवं गोपनीयता नीति'
            : 'App preferences, legal non-affiliation disclaimers & privacy policy'}
        </Text>
      </View>

      {/* Language Preference Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="language" size={20} color="#1E3A8A" />
          <Text style={styles.cardTitle}>
            {language === 'hi' ? 'भाषा चयन (App Language)' : 'Language Selection'}
          </Text>
        </View>

        <View style={styles.langSwitchRow}>
          <TouchableOpacity
            style={[
              styles.langOption,
              language === 'hi' && styles.selectedLangOption,
            ]}
            onPress={() => setLanguage('hi')}
          >
            <Text
              style={[
                styles.langOptionText,
                language === 'hi' && styles.selectedLangOptionText,
              ]}
            >
              हिन्दी (Hindi)
            </Text>
            {language === 'hi' && (
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.langOption,
              language === 'en' && styles.selectedLangOption,
            ]}
            onPress={() => setLanguage('en')}
          >
            <Text
              style={[
                styles.langOptionText,
                language === 'en' && styles.selectedLangOptionText,
              ]}
            >
              English
            </Text>
            {language === 'en' && (
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Mandatory Play Store Government Non-Affiliation Disclaimer */}
      <View style={[styles.card, styles.disclaimerCard]}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={20} color="#DC2626" />
          <Text style={[styles.cardTitle, { color: '#DC2626' }]}>
            {t.disclaimerTitle}
          </Text>
        </View>
        <Text style={styles.disclaimerText}>{t.disclaimerBody}</Text>

        <View style={styles.portalLinksRow}>
          <TouchableOpacity style={styles.officialLinkBtn} onPress={handleOpenBseb}>
            <Ionicons name="globe-outline" size={14} color="#1E3A8A" />
            <Text style={styles.officialLinkText}>biharboardonline.bihar.gov.in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.officialLinkBtn} onPress={handleOpenBpsc}>
            <Ionicons name="globe-outline" size={14} color="#1E3A8A" />
            <Text style={styles.officialLinkText}>bpsc.bih.nic.in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Privacy Policy */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="lock-closed" size={20} color="#10B981" />
          <Text style={styles.cardTitle}>{t.privacyPolicyTitle}</Text>
        </View>
        <Text style={styles.policyText}>{t.privacyPolicyBody}</Text>
        <View style={styles.safeTag}>
          <Ionicons name="checkmark-done" size={16} color="#059669" />
          <Text style={styles.safeTagText}>
            {language === 'hi'
              ? '100% डेटा सुरक्षित - कोई व्यक्तिगत विवरण एकत्र नहीं किया जाता'
              : '100% Privacy Compliant - No personal data collection'}
          </Text>
        </View>
      </View>

      {/* Share & Feedback */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.actionRow} onPress={handleShareApp}>
          <Ionicons name="share-social" size={20} color="#1E3A8A" />
          <Text style={styles.actionRowText}>{t.shareApp}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="information-circle" size={20} color="#64748B" />
          <Text style={styles.infoText}>{t.playStoreVersion}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="cloud-offline" size={20} color="#059669" />
          <Text style={[styles.infoText, { color: '#059669', fontWeight: '700' }]}>
            {t.offlineModeNotice}
          </Text>
        </View>
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
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  langSwitchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  selectedLangOption: {
    backgroundColor: '#1E3A8A',
  },
  langOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  selectedLangOptionText: {
    color: '#FFFFFF',
  },
  disclaimerCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  disclaimerText: {
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 20,
    fontWeight: '500',
  },
  portalLinksRow: {
    marginTop: 12,
    gap: 8,
  },
  officialLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  officialLinkText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '700',
  },
  policyText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  safeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  safeTagText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionRowText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
});
