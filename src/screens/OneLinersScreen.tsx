import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  ToastAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, ThemeColors } from '../theme';
import { OneLiner, Language } from '../types';
import { ONE_LINERS } from '../data/oneLiners';
import { DataService } from '../services/dataService';
import { StorageService } from '../storage/storageService';
import {
  MASTER_CURRICULUM,
  getCurriculumTopicById,
  getCurriculumUnitByNumber,
} from '../data/curriculum';

interface FactCardItemProps {
  fact: OneLiner;
  index: number;
  isBookmarked: boolean;
  isCopied: boolean;
  language: Language;
  colors: ThemeColors;
  isDark: boolean;
  onToggleBookmark: (id: string) => void;
  onCopy: (fact: OneLiner) => void;
  onShare: (fact: OneLiner) => void;
}

const FactCardItem = React.memo<FactCardItemProps>(({
  fact,
  index,
  isBookmarked,
  isCopied,
  language,
  colors,
  isDark,
  onToggleBookmark,
  onCopy,
  onShare,
}) => {
  const unitMeta = fact.unitNumber ? getCurriculumUnitByNumber(fact.unitNumber) : undefined;
  const topicMeta = fact.topicId ? getCurriculumTopicById(fact.topicId) : undefined;
  const accentColor = unitMeta?.color || (fact.isImportant ? '#EA580C' : '#0070F3');

  return (
    <View
      style={[
        styles.factCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderLeftColor: accentColor,
          borderLeftWidth: 3.5,
        },
      ]}
    >
      {/* Card Meta Top */}
      <View style={styles.cardTopRow}>
        <View style={styles.topicBadgeRow}>
          <View style={[styles.indexBadge, { backgroundColor: colors.canvasSubtle }]}>
            <Text style={[styles.indexBadgeText, { color: colors.textSecondary }]}>
              #{index + 1}
            </Text>
          </View>

          {topicMeta && (
            <View
              style={[
                styles.topicBadgePill,
                {
                  backgroundColor: isDark
                    ? unitMeta?.softBgDark || 'rgba(0,112,243,0.15)'
                    : unitMeta?.softBgLight || '#EFF6FF',
                  borderColor: accentColor,
                },
              ]}
            >
              <Text style={[styles.topicBadgePillText, { color: accentColor }]}>
                {topicMeta.shortTitle[language]}
              </Text>
            </View>
          )}

          <Text style={[styles.topicTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {fact.topic[language]}
          </Text>
        </View>

        {fact.tag && (
          <View
            style={[
              styles.tagBadge,
              {
                backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FFEDD5',
              },
            ]}
          >
            <Text style={styles.tagText}>{fact.tag}</Text>
          </View>
        )}
      </View>

      {/* Primary Fact Statement */}
      <Text style={[styles.statementPrimary, { color: colors.textPrimary }]}>
        {fact.statement[language]}
      </Text>

      {/* Secondary Language Subtext */}
      <Text style={[styles.statementSecondary, { color: colors.textMuted }]}>
        {language === 'hi' ? fact.statement.en : fact.statement.hi}
      </Text>

      {/* Actions Footer */}
      <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
        <View style={styles.categoryInfo}>
          <Text style={[styles.catNameText, { color: colors.textSecondary }]}>
            {unitMeta?.title[language] || fact.category[language]}
          </Text>
        </View>

        <View style={styles.actionBtns}>
          <TouchableOpacity
            style={[styles.miniActionBtn, { backgroundColor: colors.canvasSubtle }]}
            onPress={() => onCopy(fact)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isCopied ? 'checkmark' : 'copy-outline'}
              size={15}
              color={isCopied ? '#10B981' : colors.textPrimary}
            />
            <Text style={[styles.miniActionText, { color: isCopied ? '#10B981' : colors.textPrimary }]}>
              {isCopied ? 'Copied' : 'Copy'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.miniActionBtn, { backgroundColor: '#ECFDF5' }]}
            onPress={() => onShare(fact)}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-whatsapp" size={15} color="#166534" />
            <Text style={[styles.miniActionText, { color: '#166534' }]}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookmarkActionBtn}
            onPress={() => onToggleBookmark(fact.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={isBookmarked ? '#F59E0B' : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export const OneLinersScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [oneLiners, setOneLiners] = useState<OneLiner[]>(ONE_LINERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | 'all'>('all');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    DataService.getOneLiners()
      .then((data) => {
        if (data && data.length > 0) {
          setOneLiners(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    StorageService.getOneLinerBookmarks().then((saved) => {
      const map: Record<string, boolean> = {};
      saved.forEach((id) => {
        map[id] = true;
      });
      setBookmarkedMap(map);
    });
  }, []);

  const handleSelectUnit = useCallback((unitNum: number | 'all') => {
    setSelectedUnit(unitNum);
    setSelectedTopicId('all');
  }, []);

  const handleSelectTopic = useCallback((topicId: string | 'all') => {
    setSelectedTopicId(topicId);
  }, []);

  const activeUnitColor = selectedUnit !== 'all'
    ? getCurriculumUnitByNumber(selectedUnit)?.color || colors.primary
    : colors.primary;

  const activeUnitTopics = selectedUnit !== 'all'
    ? getCurriculumUnitByNumber(selectedUnit)?.topics || []
    : [];

  const filteredFacts = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    return oneLiners.filter((fact) => {
      if (selectedUnit !== 'all') {
        if (fact.unitNumber && fact.unitNumber !== selectedUnit) return false;
      }
      if (selectedTopicId !== 'all') {
        if (fact.topicId && fact.topicId !== selectedTopicId) return false;
      }

      if (!trimmed) return true;

      return (
        fact.statement.hi.toLowerCase().includes(trimmed) ||
        fact.statement.en.toLowerCase().includes(trimmed) ||
        fact.topic.hi.toLowerCase().includes(trimmed) ||
        fact.topic.en.toLowerCase().includes(trimmed) ||
        (fact.tag && fact.tag.toLowerCase().includes(trimmed))
      );
    });
  }, [oneLiners, selectedUnit, selectedTopicId, searchQuery]);

  const handleToggleBookmark = useCallback(async (id: string) => {
    const isSaved = await StorageService.toggleOneLinerBookmark(id);
    setBookmarkedMap((prev) => ({
      ...prev,
      [id]: isSaved,
    }));
  }, []);

  const handleShare = useCallback(async (fact: OneLiner) => {
    try {
      const shareText = `📌 *${fact.topic[language]}*\n\n"${fact.statement[language]}"\n\n🎯 बिहार लाइब्रेरियन परीक्षा 2026 की मुफ्त तैयारी - Bihar Librarian Ninja App 📚`;
      await Share.share({
        message: shareText,
        title: fact.topic[language],
      });
    } catch (e) {}
  }, [language]);

  const handleCopy = useCallback((fact: OneLiner) => {
    setCopiedId(fact.id);
    if (Platform.OS === 'android') {
      ToastAndroid.show(t.copySuccess, ToastAndroid.SHORT);
    }
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  }, [t.copySuccess]);

  const renderFactItem = useCallback(
    ({ item, index }: { item: OneLiner; index: number }) => (
      <FactCardItem
        fact={item}
        index={index}
        isBookmarked={!!bookmarkedMap[item.id]}
        isCopied={copiedId === item.id}
        language={language}
        colors={colors}
        isDark={isDark}
        onToggleBookmark={handleToggleBookmark}
        onCopy={handleCopy}
        onShare={handleShare}
      />
    ),
    [bookmarkedMap, copiedId, language, colors, isDark, handleToggleBookmark, handleCopy, handleShare]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.canvas }]}>
      {/* Header Info */}
      <View style={styles.headerBox}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
              {t.oneLinersTitle}
            </Text>
            <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi'
                ? '5 यूनिट एवं 29 मास्टर टॉपिक्स अनुसार हाई-यील्ड परीक्षा बुलेट्स'
                : 'High-yield exam facts divided across all 29 master topics in 5 Core Units'}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <View
              style={[
                styles.factCountBadge,
                {
                  backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                  borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FFEDD5',
                },
              ]}
            >
              <Ionicons name="flash" size={12} color="#EA580C" />
              <Text style={styles.factCountText}>{oneLiners.length} Facts</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0' }}>
              <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#10B981', marginRight: 4 }} />
              <Text style={{ fontSize: 9, fontWeight: '700', color: '#10B981' }}>
                {isLoading ? 'Syncing...' : 'Supabase Live'}
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder={language === 'hi' ? 'तथ्य, टॉपिक या कीवर्ड खोजें...' : 'Search facts, topics or keywords...'}
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Tier 1: Horizontal Unit Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.unitScroll}
        >
          <TouchableOpacity
            style={[
              styles.unitPill,
              {
                backgroundColor: selectedUnit === 'all'
                  ? (isDark ? '#4F46E5' : '#18181B')
                  : colors.canvasSubtle,
                borderColor: selectedUnit === 'all'
                  ? (isDark ? '#6366F1' : '#18181B')
                  : colors.border,
              },
            ]}
            onPress={() => handleSelectUnit('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.unitPillText,
                {
                  color: selectedUnit === 'all' ? '#FFFFFF' : colors.textPrimary,
                  fontWeight: selectedUnit === 'all' ? '800' : '600',
                },
              ]}
            >
              {language === 'hi' ? `सभी यूनिट्स (${oneLiners.length})` : `All Units (${oneLiners.length})`}
            </Text>
          </TouchableOpacity>

          {MASTER_CURRICULUM.map((unit) => {
            const isSelected = selectedUnit === unit.unitNumber;
            const count = oneLiners.filter((f) => f.unitNumber === unit.unitNumber).length;
            return (
              <TouchableOpacity
                key={unit.id}
                style={[
                  styles.unitPill,
                  {
                    backgroundColor: isSelected ? unit.color : colors.canvasSubtle,
                    borderColor: isSelected ? unit.color : colors.border,
                  },
                ]}
                onPress={() => handleSelectUnit(unit.unitNumber)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.unitPillText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textPrimary,
                      fontWeight: isSelected ? '800' : '600',
                    },
                  ]}
                >
                  {unit.shortTitle[language]} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tier 2: Subtopic Pills (Visible when a Unit is Selected) */}
        {selectedUnit !== 'all' && activeUnitTopics.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicScroll}
          >
            <TouchableOpacity
              style={[
                styles.topicChip,
                {
                  backgroundColor: selectedTopicId === 'all' ? activeUnitColor : isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5',
                  borderColor: selectedTopicId === 'all' ? activeUnitColor : colors.border,
                },
              ]}
              onPress={() => handleSelectTopic('all')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.topicChipText,
                  {
                    color: selectedTopicId === 'all' ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: selectedTopicId === 'all' ? '800' : '600',
                  },
                ]}
              >
                {language === 'hi' ? `सभी ${activeUnitTopics.length} टॉपिक्स` : `All ${activeUnitTopics.length} Topics`}
              </Text>
            </TouchableOpacity>

            {activeUnitTopics.map((top) => {
              const isTopSelected = selectedTopicId === top.id;
              const topCount = oneLiners.filter((f) => f.topicId === top.id).length;
              return (
                <TouchableOpacity
                  key={top.id}
                  style={[
                    styles.topicChip,
                    {
                      backgroundColor: isTopSelected ? activeUnitColor : isDark ? 'rgba(255,255,255,0.06)' : '#F4F4F5',
                      borderColor: isTopSelected ? activeUnitColor : colors.border,
                    },
                  ]}
                  onPress={() => handleSelectTopic(top.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.topicChipText,
                      {
                        color: isTopSelected ? '#FFFFFF' : colors.textSecondary,
                        fontWeight: isTopSelected ? '800' : '600',
                      },
                    ]}
                  >
                    {top.shortTitle[language]} ({topCount})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Facts Virtualized FlatList */}
      <FlatList
        data={filteredFacts}
        keyExtractor={(item) => item.id}
        renderItem={renderFactItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        showsVerticalScrollIndicator={false}
        style={styles.factsList}
        contentContainerStyle={styles.factsListContent}
        ListHeaderComponent={
          <Text style={[styles.showingCountText, { color: colors.textMuted }]}>
            {language === 'hi'
              ? `${filteredFacts.length} तथ्य प्रदर्शित (कुल ${oneLiners.length})`
              : `Showing ${filteredFacts.length} facts (total ${oneLiners.length})`}
          </Text>
        }
        ListEmptyComponent={
          isLoading && oneLiners.length === 0 ? (
            <View style={{ padding: 36, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={{ marginTop: 12, fontSize: 13, color: colors.textSecondary, fontWeight: '600' }}>
                {language === 'hi' ? 'सुपाबेस डेटाबेस से वन-लाइनर्स लोड हो रहे हैं...' : 'Loading One-Liners from Supabase Database...'}
              </Text>
            </View>
          ) : (
            <View style={{ padding: 36, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="document-text-outline" size={36} color={colors.textMuted} />
              <Text style={{ marginTop: 8, fontSize: 13, color: colors.textSecondary }}>
                {language === 'hi' ? 'इस टॉपिक में अभी कोई तथ्य उपलब्ध नहीं है' : 'No facts in this topic yet'}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  backgroundColor: isDark ? '#4F46E5' : colors.primary,
                  borderRadius: 8,
                }}
                onPress={() => handleSelectUnit('all')}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 12 }}>
                  {language === 'hi' ? 'सभी तथ्य देखें' : 'View All Facts'}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  factCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  factCountText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  unitScroll: {
    gap: 8,
    paddingVertical: 6,
  },
  unitPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
  },
  unitPillText: {
    fontSize: 12,
    letterSpacing: 0.1,
  },
  topicScroll: {
    gap: 6,
    paddingBottom: 6,
  },
  topicChip: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  topicChipText: {
    fontSize: 11,
  },
  factsList: {
    flex: 1,
  },
  factsListContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 36,
  },
  showingCountText: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  factCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  topicBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  indexBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  indexBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  topicBadgePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  topicBadgePillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  topicTitle: {
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  tagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EA580C',
  },
  statementPrimary: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 6,
  },
  statementSecondary: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 2,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 8,
  },
  catNameText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  miniActionText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bookmarkActionBtn: {
    padding: 4,
  },
});
