import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  ToastAndroid,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossary';

type FilterType = 'all' | 'acronym' | 'year';

interface GlossaryScreenProps {
  onBack?: () => void;
}

export const GlossaryScreen: React.FC<GlossaryScreenProps> = ({ onBack }) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const acronymCount = useMemo(
    () => GLOSSARY_ITEMS.filter((item) => item.type === 'acronym').length,
    []
  );
  const yearCount = useMemo(
    () => GLOSSARY_ITEMS.filter((item) => item.type === 'year').length,
    []
  );

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return GLOSSARY_ITEMS.filter((item) => {
      // Type filter
      if (filterType !== 'all') {
        if (filterType === 'acronym' && item.type !== 'acronym') return false;
        if (filterType === 'year' && item.type !== 'year') return false;
      }

      if (!q) return true;

      // Match term, year, expansion, founder, description, or keyExamFact
      const matchTerm = item.term.toLowerCase().includes(q);
      const matchYear = item.year ? item.year.includes(q) : false;
      const matchExpHi = item.expansion ? item.expansion.hi.toLowerCase().includes(q) : false;
      const matchExpEn = item.expansion ? item.expansion.en.toLowerCase().includes(q) : false;
      const matchDescHi = item.description.hi.toLowerCase().includes(q);
      const matchDescEn = item.description.en.toLowerCase().includes(q);
      const matchFactHi = item.keyExamFact.hi.toLowerCase().includes(q);
      const matchFactEn = item.keyExamFact.en.toLowerCase().includes(q);

      return (
        matchTerm ||
        matchYear ||
        matchExpHi ||
        matchExpEn ||
        matchDescHi ||
        matchDescEn ||
        matchFactHi ||
        matchFactEn
      );
    });
  }, [searchQuery, filterType]);

  const handleCopy = (item: GlossaryItem) => {
    const text = `📌 ${item.term}${item.expansion ? ` (${item.expansion[language]})` : ''}\n${item.description[language]}\n💡 परीक्षा तथ्य: ${item.keyExamFact[language]}`;
    setCopiedId(item.id);

    if (Platform.OS === 'android') {
      ToastAndroid.show(
        language === 'hi' ? 'तथ्य कॉपी हो गया!' : 'Copied to clipboard!',
        ToastAndroid.SHORT
      );
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = (item: GlossaryItem) => {
    const expansionText = item.expansion ? ` (${item.expansion[language]})` : '';
    const founderText = item.founderOrBody ? `\n👤 प्रतिपादक/संस्था: ${item.founderOrBody[language]}` : '';
    const yearText = item.year ? `\n📅 वर्ष: ${item.year}` : '';

    const message = `📚 *LIS शब्दावली व वर्ष: ${item.term}*${expansionText}${yearText}${founderText}\n\n"${item.description[language]}"\n\n🎯 *परीक्षा उपयोगी तथ्य:*\n${item.keyExamFact[language]}\n\n📲 बिहार लाइब्रेरियन परीक्षा 2026 की निःशुल्क तैयारी के लिए डाउनलोड करें: *Bihar Librarian Ninja*`;

    Share.share({
      message,
      title: item.term,
    }).catch(() => {});
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Box */}
      <View style={styles.headerBox}>
        <View style={styles.headerTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
              {language === 'hi'
                ? 'LIS शब्दावली व महत्वपूर्ण वर्ष'
                : 'LIS Glossary & Milestone Years'}
            </Text>
            <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi'
                ? 'परीक्षा में पूछे जाने वाले प्रमुख फुल फॉर्म, वर्ष, संस्थाएं व अधिनियम'
                : 'Essential acronyms, milestone dates, acts and founders for rapid revision'}
            </Text>
          </View>

          <View
            style={[
              styles.totalBadge,
              {
                backgroundColor: isDark ? 'rgba(124, 58, 237, 0.15)' : '#F5F3FF',
                borderColor: isDark ? 'rgba(124, 58, 237, 0.35)' : '#DDD6FE',
              },
            ]}
          >
            <Ionicons name="library" size={13} color="#7C3AED" />
            <Text style={styles.totalBadgeText}>
              {GLOSSARY_ITEMS.length} {language === 'hi' ? 'प्रविष्टियां' : 'Terms'}
            </Text>
          </View>
        </View>

        {/* Quick Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search" size={17} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder={
              language === 'hi'
                ? 'खोजें (जैसे SOUL, 1933, DDC, मद्रास, IFLA)...'
                : 'Search term or year (e.g. SOUL, 1933, DDC, Koha)...'
            }
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPillsRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filterType === 'all'
                    ? isDark
                      ? '#4F46E5'
                      : '#18181B'
                    : colors.canvasSubtle,
                borderColor:
                  filterType === 'all'
                    ? isDark
                      ? '#6366F1'
                      : '#18181B'
                    : colors.border,
              },
            ]}
            onPress={() => setFilterType('all')}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.filterPillText,
                {
                  color: filterType === 'all' ? '#FFFFFF' : colors.textPrimary,
                  fontWeight: filterType === 'all' ? '800' : '600',
                },
              ]}
            >
              {language === 'hi' ? `सभी (${GLOSSARY_ITEMS.length})` : `All (${GLOSSARY_ITEMS.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filterType === 'acronym'
                    ? '#7C3AED'
                    : isDark
                    ? 'rgba(124, 58, 237, 0.15)'
                    : '#F5F3FF',
                borderColor:
                  filterType === 'acronym'
                    ? '#7C3AED'
                    : isDark
                    ? 'rgba(124, 58, 237, 0.35)'
                    : '#DDD6FE',
              },
            ]}
            onPress={() => setFilterType('acronym')}
            activeOpacity={0.75}
          >
            <Ionicons
              name="text"
              size={13}
              color={filterType === 'acronym' ? '#FFFFFF' : '#7C3AED'}
            />
            <Text
              style={[
                styles.filterPillText,
                {
                  color:
                    filterType === 'acronym'
                      ? '#FFFFFF'
                      : isDark
                      ? '#A78BFA'
                      : '#6D28D9',
                  fontWeight: filterType === 'acronym' ? '800' : '600',
                },
              ]}
            >
              {language === 'hi'
                ? `फुल फॉर्म (${acronymCount})`
                : `Acronyms (${acronymCount})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              {
                backgroundColor:
                  filterType === 'year'
                    ? '#D97706'
                    : isDark
                    ? 'rgba(217, 119, 6, 0.15)'
                    : '#FEF3C7',
                borderColor:
                  filterType === 'year'
                    ? '#D97706'
                    : isDark
                    ? 'rgba(217, 119, 6, 0.35)'
                    : '#FDE68A',
              },
            ]}
            onPress={() => setFilterType('year')}
            activeOpacity={0.75}
          >
            <Ionicons
              name="calendar"
              size={13}
              color={filterType === 'year' ? '#FFFFFF' : '#D97706'}
            />
            <Text
              style={[
                styles.filterPillText,
                {
                  color:
                    filterType === 'year'
                      ? '#FFFFFF'
                      : isDark
                      ? '#FBBF24'
                      : '#B45309',
                  fontWeight: filterType === 'year' ? '800' : '600',
                },
              ]}
            >
              {language === 'hi'
                ? `महत्वपूर्ण वर्ष (${yearCount})`
                : `Years (${yearCount})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Shortcuts Bar for Fast Exam Entry */}
        <View style={styles.quickShortcutsWrap}>
          <Text style={[styles.shortcutLabel, { color: colors.textMuted }]}>
            {language === 'hi' ? 'त्वरित खोज:' : 'Quick Jump:'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shortcutScroll}>
            {['SOUL', 'DDC', 'CC', 'AACR-2', 'Koha', '1876', '1928', '1931', '1933', '1948', '1972', '2008'].map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.shortcutChip,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => setSearchQuery(tag)}
                activeOpacity={0.7}
              >
                <Text style={[styles.shortcutChipText, { color: colors.textPrimary }]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Results Count Bar */}
      <View style={styles.resultsInfoRow}>
        <Text style={[styles.resultsInfoText, { color: colors.textSecondary }]}>
          {language === 'hi'
            ? `${filteredItems.length} परिणाम प्रदर्शित`
            : `Showing ${filteredItems.length} entries`}
        </Text>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.primary }}>
              {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Glossary Cards List */}
      {filteredItems.length > 0 ? (
        <View style={styles.itemsList}>
          {filteredItems.map((item) => {
            const isYear = item.type === 'year';
            const accentColor = isYear ? '#D97706' : '#7C3AED';

            return (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderLeftColor: accentColor,
                    borderLeftWidth: 4,
                  },
                ]}
              >
                {/* Top Row: Term + Badges */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.termWrap}>
                    <Text style={[styles.termText, { color: colors.textPrimary }]}>
                      {item.term}
                    </Text>

                    {item.year && !isYear && (
                      <View style={[styles.yearBadge, { backgroundColor: isDark ? 'rgba(217, 119, 6, 0.15)' : '#FEF3C7' }]}>
                        <Ionicons name="calendar-outline" size={11} color="#D97706" />
                        <Text style={styles.yearBadgeText}>{item.year}</Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={[
                      styles.typeBadge,
                      {
                        backgroundColor: isDark
                          ? isYear
                            ? 'rgba(217, 119, 6, 0.15)'
                            : 'rgba(124, 58, 237, 0.15)'
                          : isYear
                          ? '#FEF3C7'
                          : '#F5F3FF',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeBadgeText,
                        { color: isYear ? '#D97706' : '#7C3AED' },
                      ]}
                    >
                      {isYear
                        ? language === 'hi'
                          ? 'ऐतिहासिक वर्ष'
                          : 'Milestone Year'
                        : language === 'hi'
                        ? 'फुल फॉर्म'
                        : 'Full Form'}
                    </Text>
                  </View>
                </View>

                {/* Expansion (Full Form Name) */}
                {item.expansion && (
                  <View style={styles.expansionBox}>
                    <Text style={[styles.expansionText, { color: accentColor }]}>
                      {item.expansion[language]}
                    </Text>
                    {language === 'hi' && item.expansion.en && (
                      <Text style={[styles.expansionSubText, { color: colors.textMuted }]}>
                        {item.expansion.en}
                      </Text>
                    )}
                  </View>
                )}

                {/* Founder / Body if available */}
                {item.founderOrBody && (
                  <View style={styles.founderRow}>
                    <Ionicons name="person-outline" size={12} color={colors.textSecondary} />
                    <Text style={[styles.founderText, { color: colors.textSecondary }]}>
                      {item.founderOrBody[language]}
                    </Text>
                  </View>
                )}

                {/* Concise Description */}
                <Text style={[styles.descriptionText, { color: colors.textPrimary }]}>
                  {item.description[language]}
                </Text>

                {/* Golden Bulb Callout for Exam Hits */}
                <View
                  style={[
                    styles.calloutBox,
                    {
                      backgroundColor: isDark ? 'rgba(245, 166, 35, 0.08)' : '#FFFBEB',
                      borderColor: isDark ? 'rgba(245, 166, 35, 0.25)' : '#FDE68A',
                    },
                  ]}
                >
                  <View style={styles.calloutHeader}>
                    <Ionicons name="bulb" size={14} color="#D97706" />
                    <Text style={styles.calloutTitle}>
                      {language === 'hi' ? 'परीक्षा उपयोगी तथ्य' : 'Exam Key Hit'}
                    </Text>
                  </View>
                  <Text style={[styles.calloutText, { color: colors.textPrimary }]}>
                    {item.keyExamFact[language]}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                  <TouchableOpacity
                    style={[styles.miniBtn, { backgroundColor: colors.canvasSubtle }]}
                    onPress={() => handleCopy(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={copiedId === item.id ? 'checkmark' : 'copy-outline'}
                      size={14}
                      color={copiedId === item.id ? '#10B981' : colors.textPrimary}
                    />
                    <Text
                      style={[
                        styles.miniBtnText,
                        { color: copiedId === item.id ? '#10B981' : colors.textPrimary },
                      ]}
                    >
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.miniBtn, { backgroundColor: '#ECFDF5' }]}
                    onPress={() => handleShare(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="logo-whatsapp" size={14} color="#166534" />
                    <Text style={[styles.miniBtnText, { color: '#166534' }]}>
                      Share on WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        /* Empty Search State */
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIconCircle,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Ionicons name="search-outline" size={32} color={colors.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No Results Found'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? `"${searchQuery}" के लिए कोई शब्द या वर्ष नहीं मिला। अन्य शब्द खोजें।`
              : `No match for "${searchQuery}". Try searching another acronym or year.`}
          </Text>
        </View>
      )}

      <View style={{ height: 40 }} />
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
    marginBottom: 6,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
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
  totalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  totalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C3AED',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0,
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    gap: 5,
  },
  filterPillText: {
    fontSize: 12,
  },
  quickShortcutsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 6,
  },
  shortcutLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  shortcutScroll: {
    gap: 6,
  },
  shortcutChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  shortcutChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  resultsInfoText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemsList: {
    gap: 12,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  termWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  termText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  yearBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  typeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  expansionBox: {
    marginBottom: 6,
  },
  expansionText: {
    fontSize: 13,
    fontWeight: '800',
  },
  expansionSubText: {
    fontSize: 11,
    marginTop: 1,
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  founderText: {
    fontSize: 11,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  calloutBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  calloutTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  calloutText: {
    fontSize: 12,
    lineHeight: 17,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 8,
  },
  miniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 4,
  },
  miniBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
