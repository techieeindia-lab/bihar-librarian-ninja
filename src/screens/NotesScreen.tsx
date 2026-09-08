import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme, unitColorMap } from '../theme';
import { StudyUnit } from '../types';
import { DataService } from '../services/dataService';

interface NotesScreenProps {
  initialUnitId?: string | null;
  onStartQuiz?: (quizId: string) => void;
}

// Icon mapping helper for unit themes
const getUnitIconName = (unitNum: number): keyof typeof Ionicons.glyphMap => {
  switch (unitNum) {
    case 1:
      return 'book-outline';
    case 2:
      return 'folder-open-outline';
    case 3:
      return 'hardware-chip-outline';
    case 4:
      return 'business-outline';
    case 5:
      return 'search-outline';
    case 6:
      return 'briefcase-outline';
    case 7:
      return 'school-outline';
    default:
      return 'document-text-outline';
  }
};

export const NotesScreen: React.FC<NotesScreenProps> = ({
  initialUnitId,
  onStartQuiz,
}) => {
  const { language, t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [units, setUnits] = useState<StudyUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<StudyUnit | null>(null);
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSizeTier, setFontSizeTier] = useState<'normal' | 'medium' | 'large'>('medium');
  const [copiedTopicId, setCopiedTopicId] = useState<string | null>(null);

  // Dynamic font sizing
  const contentFontSize = fontSizeTier === 'normal' ? 13 : fontSizeTier === 'medium' ? 14.5 : 16.5;
  const contentLineHeight = fontSizeTier === 'normal' ? 21 : fontSizeTier === 'medium' ? 24 : 27;

  useEffect(() => {
    setIsLoading(true);
    DataService.getStudyUnits()
      .then((data) => {
        if (data && data.length > 0) {
          setUnits(data);
          const match =
            data.find((u) => u.id === (initialUnitId || selectedUnit?.id)) || data[0];
          setSelectedUnit(match);
          if (match.topics && match.topics.length > 0) {
            setExpandedTopicIds(new Set([match.topics[0].id]));
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [initialUnitId]);

  const handleSelectUnit = (unit: StudyUnit) => {
    setSelectedUnit(unit);
    setSearchQuery('');
    if (unit.topics.length > 0) {
      setExpandedTopicIds(new Set([unit.topics[0].id]));
    } else {
      setExpandedTopicIds(new Set());
    }
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const toggleExpandAll = () => {
    if (!selectedUnit) return;
    const allIds = filteredTopics.map((t) => t.id);
    const areAllExpanded = allIds.every((id) => expandedTopicIds.has(id));

    if (areAllExpanded) {
      setExpandedTopicIds(new Set());
    } else {
      setExpandedTopicIds(new Set(allIds));
    }
  };

  const cycleFontSize = () => {
    if (fontSizeTier === 'normal') setFontSizeTier('medium');
    else if (fontSizeTier === 'medium') setFontSizeTier('large');
    else setFontSizeTier('normal');
  };

  const activeColorConfig = selectedUnit
    ? unitColorMap[selectedUnit.unitNumber] || unitColorMap[1]
    : unitColorMap[1];

  // Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!selectedUnit) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return selectedUnit.topics;

    return selectedUnit.topics.filter((topic) => {
      const titleHi = (topic.title?.hi || '').toLowerCase();
      const titleEn = (topic.title?.en || '').toLowerCase();
      const contentHi = (topic.content?.hi || '').toLowerCase();
      const contentEn = (topic.content?.en || '').toLowerCase();
      const keyPointsText = (topic.keyPoints || [])
        .map((kp) => `${kp.hi} ${kp.en}`)
        .join(' ')
        .toLowerCase();

      return (
        titleHi.includes(query) ||
        titleEn.includes(query) ||
        contentHi.includes(query) ||
        contentEn.includes(query) ||
        keyPointsText.includes(query)
      );
    });
  }, [selectedUnit, searchQuery]);

  // Auto-expand all matching topics during search
  useEffect(() => {
    if (searchQuery.trim().length > 0 && filteredTopics.length > 0) {
      setExpandedTopicIds(new Set(filteredTopics.map((t) => t.id)));
    }
  }, [searchQuery, filteredTopics]);

  // Count total key points in the active unit
  const totalKeyPointsInUnit = useMemo(() => {
    if (!selectedUnit) return 0;
    return selectedUnit.topics.reduce(
      (acc, t) => acc + (t.keyPoints ? t.keyPoints.length : 0),
      0
    );
  }, [selectedUnit]);

  // Helper to parse inline markdown (e.g. **bold text**, strip orphan asterisks)
  const renderInlineMarkdown = (
    text: string,
    baseStyle: any,
    boldStyle: any
  ) => {
    if (!text) return null;

    // Split by markdown bold markers: **bold text**
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <Text key={i} style={boldStyle}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      // Clean any stray asterisks
      const cleaned = part.replace(/\*\*/g, '');
      return (
        <Text key={i} style={baseStyle}>
          {cleaned}
        </Text>
      );
    });
  };

  // Intelligent Content Formatter for Study Notes
  const renderFormattedContent = (rawText: string) => {
    if (!rawText) return null;

    const normalized = rawText.replace(/\\n/g, '\n');
    const lines = normalized.split('\n');

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <View key={idx} style={{ height: 8 }} />;
      }

      // Horizontal Divider: ---
      if (/^-{3,}$/.test(trimmed)) {
        return (
          <View
            key={idx}
            style={{
              height: 1,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0',
              marginVertical: 12,
            }}
          />
        );
      }

      // Markdown Table Separator: e.g. | :---: | :--- | or |---|---|
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        return null;
      }

      // Markdown Table Row: | Col 1 | Col 2 | Col 3 |
      if (/^\|(.+)\|$/.test(trimmed)) {
        const cells = trimmed
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);

        if (cells.length === 0) return null;

        const isHeader = cells.some((c) =>
          /^(क्र\.सं\.|s\.no|राज्य|state|वर्ष|year|विवरण|highlights|sr|name)/i.test(
            c.replace(/\*\*/g, '')
          )
        );

        return (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              backgroundColor: isHeader
                ? isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : '#F1F5F9'
                : 'transparent',
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: isHeader ? 8 : 0,
              borderBottomWidth: isHeader ? 0 : 1,
              borderBottomColor: isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : '#F1F5F9',
              marginVertical: isHeader ? 4 : 0,
              alignItems: 'center',
            }}
          >
            {cells.map((cell, cIdx) => (
              <Text
                key={cIdx}
                style={{
                  flex: cIdx === 0 ? 1 : 2,
                  fontSize: contentFontSize - (isHeader ? 0.5 : 1),
                  fontWeight: isHeader || cIdx === 0 ? '700' : '400',
                  color: isHeader
                    ? isDark
                      ? activeColorConfig.primary
                      : '#0F172A'
                    : isDark
                    ? colors.textSecondary
                    : '#334155',
                }}
              >
                {cell.replace(/\*\*/g, '')}
              </Text>
            ))}
          </View>
        );
      }
      const h3Match = trimmed.match(/^#{1,3}\s+(.+)/);
      if (h3Match) {
        const headingText = h3Match[1].replace(/\*\*/g, '').trim();
        return (
          <View
            key={idx}
            style={[
              styles.majorHeadingBox,
              {
                borderLeftColor: activeColorConfig.primary,
                backgroundColor: isDark
                  ? activeColorConfig.softDark
                  : activeColorConfig.softLight,
              },
            ]}
          >
            <View
              style={[
                styles.headingDot,
                { backgroundColor: activeColorConfig.primary },
              ]}
            />
            <Text
              style={[
                styles.majorHeadingText,
                {
                  color: isDark ? '#FFFFFF' : activeColorConfig.primary,
                  fontSize: contentFontSize + 2,
                },
              ]}
            >
              {headingText}
            </Text>
          </View>
        );
      }

      // 2. Minor Heading / Sub-section: #### (क) ... or ##### ...
      const h4Match = trimmed.match(/^#{4,6}\s+(.+)/);
      if (h4Match) {
        const subHeadingText = h4Match[1].replace(/\*\*/g, '').trim();
        return (
          <View
            key={idx}
            style={[
              styles.minorHeadingBox,
              {
                borderLeftColor: activeColorConfig.primary,
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : '#F8FAFC',
              },
            ]}
          >
            <Text
              style={[
                styles.minorHeadingText,
                {
                  color: isDark ? colors.textPrimary : '#0F172A',
                  fontSize: contentFontSize + 1,
                },
              ]}
            >
              {subHeadingText}
            </Text>
          </View>
        );
      }

      // 3. Numbered Item: e.g. "1. **विद्यालय पुस्तकालय:** ..." or "1. प्रथम सूत्र: ..." or "  1. पढ़ने..."
      const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
      if (numberedMatch) {
        const num = numberedMatch[1];
        const rest = numberedMatch[2].trim();

        const boldTitleMatch = rest.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
        let itemHeader = '';
        let itemDetail = '';

        if (boldTitleMatch) {
          itemHeader = boldTitleMatch[1].trim();
          itemDetail = boldTitleMatch[2].trim();
        } else if (rest.includes(':')) {
          const colonSplit = rest.split(':');
          itemHeader = colonSplit[0].replace(/\*\*/g, '').trim();
          itemDetail = colonSplit.slice(1).join(':').trim();
        } else {
          itemHeader = '';
          itemDetail = rest;
        }

        return (
          <View key={idx} style={styles.numberedItemContainer}>
            <View
              style={[
                styles.numberedBadge,
                { backgroundColor: activeColorConfig.primary },
              ]}
            >
              <Text style={styles.numberedBadgeText}>{num}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {itemHeader ? (
                <Text
                  style={[
                    styles.numberedTitle,
                    {
                      color: colors.textPrimary,
                      fontSize: contentFontSize + 0.5,
                    },
                  ]}
                >
                  {itemHeader}
                  {itemDetail ? ':' : ''}
                </Text>
              ) : null}
              {itemDetail ? (
                <Text
                  style={[
                    styles.numberedBody,
                    {
                      color: isDark ? colors.textSecondary : '#334155',
                      fontSize: contentFontSize,
                      lineHeight: contentLineHeight,
                    },
                  ]}
                >
                  {renderInlineMarkdown(
                    itemDetail,
                    {
                      color: isDark ? colors.textSecondary : '#334155',
                      fontSize: contentFontSize,
                    },
                    {
                      fontWeight: '800',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontSize: contentFontSize,
                    }
                  )}
                </Text>
              ) : null}
            </View>
          </View>
        );
      }

      // 4. Bullet Item: e.g. "* **व्युत्पत्ति (Etymology):** अंग्रेजी का..." or "- निहितार्थ: ..."
      const bulletMatch = trimmed.match(/^[\*\-•]\s*(.+)/);
      if (bulletMatch) {
        const bulletText = bulletMatch[1].trim();

        const boldTitleMatch = bulletText.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
        let titlePart = '';
        let bodyPart = '';

        if (boldTitleMatch) {
          titlePart = boldTitleMatch[1].trim();
          bodyPart = boldTitleMatch[2].trim();
        } else if (bulletText.includes(':')) {
          const parts = bulletText.split(':');
          titlePart = parts[0].replace(/\*\*/g, '').trim();
          bodyPart = parts.slice(1).join(':').trim();
        } else {
          bodyPart = bulletText;
        }

        return (
          <View key={idx} style={styles.bulletItemRow}>
            <View
              style={[
                styles.bulletIconDot,
                { backgroundColor: activeColorConfig.primary },
              ]}
            />
            <Text
              style={[
                styles.bulletItemText,
                {
                  color: colors.textPrimary,
                  fontSize: contentFontSize,
                  lineHeight: contentLineHeight,
                },
              ]}
            >
              {titlePart ? (
                <Text
                  style={{
                    fontWeight: '800',
                    color: isDark ? activeColorConfig.primary : '#0F172A',
                  }}
                >
                  {titlePart}:{' '}
                </Text>
              ) : null}
              {renderInlineMarkdown(
                bodyPart,
                {
                  color: isDark ? colors.textSecondary : '#334155',
                  fontSize: contentFontSize,
                },
                {
                  fontWeight: '800',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  fontSize: contentFontSize,
                }
              )}
            </Text>
          </View>
        );
      }

      // 5. Subheading: ends with ':' or special keywords
      if (trimmed.endsWith(':') || trimmed.startsWith('उपकर') || trimmed.startsWith('संस्करण:')) {
        const cleanSub = trimmed.replace(/\*\*/g, '');
        return (
          <View
            key={idx}
            style={[
              styles.subheadingBox,
              {
                borderLeftColor: activeColorConfig.primary,
                backgroundColor: isDark
                  ? activeColorConfig.softDark
                  : activeColorConfig.softLight,
              },
            ]}
          >
            <Text
              style={[
                styles.subheadingText,
                {
                  color: isDark ? '#FFFFFF' : activeColorConfig.primary,
                  fontSize: contentFontSize + 1,
                },
              ]}
            >
              {cleanSub}
            </Text>
          </View>
        );
      }

      // 6. Regular Paragraph (with inline bold support)
      return (
        <Text
          key={idx}
          style={[
            styles.paragraphText,
            {
              color: isDark ? colors.textPrimary : '#1E293B',
              fontSize: contentFontSize,
              lineHeight: contentLineHeight,
            },
          ]}
        >
          {renderInlineMarkdown(
            trimmed,
            {
              color: isDark ? colors.textPrimary : '#1E293B',
              fontSize: contentFontSize,
            },
            {
              fontWeight: '800',
              color: isDark ? '#FFFFFF' : '#0F172A',
              fontSize: contentFontSize,
            }
          )}
        </Text>
      );
    });
  };

  const allTopicsExpanded =
    filteredTopics.length > 0 &&
    filteredTopics.every((t) => expandedTopicIds.has(t.id));

  const totalTopicsCount = useMemo(
    () => units.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 29,
    [units]
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.canvas }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header with Title & Supabase Status */}
      <View style={styles.headerBox}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
              {language === 'hi'
                ? `सम्पूर्ण ${units.length || 5} यूनिट अध्ययन नोट्स (${totalTopicsCount} टॉपिक्स)`
                : `Complete ${units.length || 5}-Unit Study Notes (${totalTopicsCount} Core Topics)`}
            </Text>
            <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
              {language === 'hi'
                ? 'NIOS, RPSC 2nd Grade व राष्ट्रीय LIS मानकों पर आधारित परीक्षा नोट्स'
                : 'Curated theory, core acts, and key revision facts across all units'}
            </Text>
          </View>

          <View
            style={[
              styles.liveBadge,
              {
                backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
                borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
              },
            ]}
          >
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>
              {isLoading ? 'Syncing...' : 'Cloud Synced'}
            </Text>
          </View>
        </View>

        {/* Search Bar for Concepts */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.card,
              borderColor: searchQuery ? activeColorConfig.primary : colors.border,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={18}
            color={searchQuery ? activeColorConfig.primary : colors.textMuted}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder={
              language === 'hi'
                ? 'नोट्स में खोजें (DDC, रंगनाथन, PMEST, कोहा, नालंदा...)'
                : 'Search notes (DDC, Ranganathan, PMEST, Koha...)'
            }
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Reading Controls Bar (Font Size & Expand All) */}
        <View style={styles.controlsBar}>
          <View style={styles.unitsCountBadge}>
            <Ionicons name="layers-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.unitsCountText, { color: colors.textSecondary }]}>
              {units.length} {language === 'hi' ? 'यूनिट्स' : 'Units'} • {selectedUnit?.topics.length || 0}{' '}
              {language === 'hi' ? 'विषय' : 'Topics'}
            </Text>
          </View>

          <View style={styles.rightControls}>
            {/* Font Size Tier Switcher */}
            <TouchableOpacity
              style={[
                styles.controlBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={cycleFontSize}
              activeOpacity={0.7}
            >
              <Text style={[styles.fontBtnText, { color: colors.accent }]}>
                {fontSizeTier === 'normal' ? 'A' : fontSizeTier === 'medium' ? 'A+' : 'A++'}
              </Text>
              <Text style={[styles.controlLabel, { color: colors.textSecondary }]}>
                {language === 'hi' ? 'फॉन्ट' : 'Size'}
              </Text>
            </TouchableOpacity>

            {/* Expand / Collapse All Toggle */}
            <TouchableOpacity
              style={[
                styles.controlBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={toggleExpandAll}
              activeOpacity={0.7}
            >
              <Ionicons
                name={allTopicsExpanded ? 'contract-outline' : 'expand-outline'}
                size={14}
                color={colors.accent}
              />
              <Text style={[styles.controlLabel, { color: colors.textSecondary }]}>
                {allTopicsExpanded
                  ? language === 'hi'
                    ? 'समेटें'
                    : 'Collapse'
                  : language === 'hi'
                  ? 'खोलें'
                  : 'Expand'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Loading indicator */}
      {isLoading && !selectedUnit && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? 'डेटाबेस से अध्ययन नोट्स लोड हो रहे हैं...'
              : 'Loading Study Notes from Database...'}
          </Text>
        </View>
      )}

      {/* Horizontal Unit Selector Tabs (Vibrant & Color Coded) */}
      {units.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.unitSelectorScroll}
        >
          {units.map((unit) => {
            const isSelected = selectedUnit?.id === unit.id;
            const uColor = unitColorMap[unit.unitNumber] || unitColorMap[1];
            const iconName = getUnitIconName(unit.unitNumber);

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
                    elevation: isSelected ? 3 : 0,
                    shadowColor: uColor.primary,
                    shadowOpacity: isSelected ? 0.35 : 0,
                    shadowRadius: 5,
                    shadowOffset: { width: 0, height: 2 },
                  },
                ]}
                onPress={() => handleSelectUnit(unit)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={iconName}
                  size={15}
                  color={isSelected ? '#FFFFFF' : uColor.primary}
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
                {isSelected && (
                  <View style={styles.activeUnitBadge}>
                    <Text style={styles.activeUnitBadgeText}>
                      {unit.topics.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Active Unit Hero Showcase Banner */}
      {selectedUnit && (
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
          <View style={styles.bannerHeaderRow}>
            <View
              style={[
                styles.unitIconContainer,
                { backgroundColor: activeColorConfig.primary },
              ]}
            >
              <Ionicons
                name={getUnitIconName(selectedUnit.unitNumber)}
                size={22}
                color="#FFFFFF"
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.bannerTopRow}>
                <View
                  style={[
                    styles.unitBadgePill,
                    { backgroundColor: activeColorConfig.primary },
                  ]}
                >
                  <Text style={styles.unitBadgePillText}>
                    {language === 'hi'
                      ? `यूनिट ${selectedUnit.unitNumber} • कोर विषय`
                      : `UNIT ${selectedUnit.unitNumber} • CORE SUBJECT`}
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
            </View>
          </View>

          <Text style={[styles.unitBannerDesc, { color: colors.textSecondary }]}>
            {selectedUnit.shortDesc[language]}
          </Text>

          {/* Unit Stat Chips */}
          <View style={styles.statsStrip}>
            <View
              style={[
                styles.statPill,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.07)'
                    : 'rgba(255, 255, 255, 0.85)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : colors.border,
                },
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={13}
                color={activeColorConfig.primary}
              />
              <Text
                style={[styles.statPillText, { color: colors.textPrimary }]}
              >
                {selectedUnit.topics.length}{' '}
                {language === 'hi' ? 'विषय (Topics)' : 'Topics'}
              </Text>
            </View>

            <View
              style={[
                styles.statPill,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.07)'
                    : 'rgba(255, 255, 255, 0.85)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : colors.border,
                },
              ]}
            >
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text
                style={[styles.statPillText, { color: colors.textPrimary }]}
              >
                {totalKeyPointsInUnit}{' '}
                {language === 'hi' ? 'मुख्य बिंदु' : 'Key Facts'}
              </Text>
            </View>

            <View
              style={[
                styles.statPill,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.07)'
                    : 'rgba(255, 255, 255, 0.85)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : colors.border,
                },
              ]}
            >
              <Ionicons
                name="time-outline"
                size={13}
                color={colors.textSecondary}
              />
              <Text
                style={[styles.statPillText, { color: colors.textSecondary }]}
              >
                ~{Math.max(4, selectedUnit.topics.length * 3)}{' '}
                {language === 'hi' ? 'मिनट पठन' : 'min read'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* No Search Results */}
      {filteredTopics.length === 0 && searchQuery.trim().length > 0 && (
        <View
          style={[
            styles.emptySearchBox,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search-outline" size={36} color={colors.textMuted} />
          <Text style={[styles.emptySearchTitle, { color: colors.textPrimary }]}>
            {language === 'hi'
              ? `"${searchQuery}" से संबंधित कोई टॉपिक नहीं मिला`
              : `No topics found matching "${searchQuery}"`}
          </Text>
          <Text
            style={[styles.emptySearchSub, { color: colors.textSecondary }]}
          >
            {language === 'hi'
              ? 'कृपया किसी अन्य शब्द से खोजें या अन्य यूनिट चुनें।'
              : 'Try searching another keyword or select a different unit.'}
          </Text>
          <TouchableOpacity
            style={[
              styles.clearSearchBtn,
              { backgroundColor: activeColorConfig.primary },
            ]}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearSearchBtnText}>
              {language === 'hi' ? 'खोज रीसेट करें' : 'Clear Search'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Topics Accordion List */}
      {selectedUnit && (
        <View style={styles.topicsContainer}>
          {filteredTopics.map((topic, topicIdx) => {
            const isExpanded = expandedTopicIds.has(topic.id);

            return (
              <View
                key={topic.id}
                style={[
                  styles.topicCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isExpanded
                      ? activeColorConfig.primary
                      : colors.border,
                    borderLeftWidth: isExpanded ? 4 : 1,
                    borderLeftColor: isExpanded
                      ? activeColorConfig.primary
                      : colors.border,
                    elevation: isExpanded ? 2 : 1,
                  },
                ]}
              >
                {/* Topic Header Accordion Bar */}
                <TouchableOpacity
                  style={[
                    styles.topicHeader,
                    {
                      backgroundColor: isExpanded
                        ? isDark
                          ? activeColorConfig.softDark
                          : activeColorConfig.softLight
                        : colors.card,
                    },
                  ]}
                  onPress={() => toggleTopic(topic.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.topicOrderBadge,
                      {
                        backgroundColor: isExpanded
                          ? activeColorConfig.primary
                          : isDark
                          ? 'rgba(255, 255, 255, 0.08)'
                          : '#F1F5F9',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.topicOrderText,
                        {
                          color: isExpanded
                            ? '#FFFFFF'
                            : isDark
                            ? '#CBD5E1'
                            : '#475569',
                        },
                      ]}
                    >
                      {topicIdx + 1}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.topicTitle,
                      {
                        color: isExpanded
                          ? isDark
                            ? '#FFFFFF'
                            : activeColorConfig.primary
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {topic.title[language]}
                  </Text>

                  <View
                    style={[
                      styles.chevronPill,
                      {
                        backgroundColor: isExpanded
                          ? activeColorConfig.primary
                          : isDark
                          ? 'rgba(255, 255, 255, 0.06)'
                          : '#F1F5F9',
                      },
                    ]}
                  >
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={isExpanded ? '#FFFFFF' : colors.textSecondary}
                    />
                  </View>
                </TouchableOpacity>

                {/* Topic Expanded Content */}
                {isExpanded && (
                  <View
                    style={[
                      styles.topicBody,
                      { borderTopColor: colors.border },
                    ]}
                  >
                    {/* Rich Formatted Note Content */}
                    <View style={styles.contentWrapper}>
                      {renderFormattedContent(topic.content[language])}
                    </View>

                    {/* High-Yield Key Exam Points Box */}
                    {topic.keyPoints && topic.keyPoints.length > 0 && (
                      <View
                        style={[
                          styles.keyPointsBox,
                          {
                            backgroundColor: isDark
                              ? 'rgba(245, 158, 11, 0.1)'
                              : '#FFFBEB',
                            borderColor: isDark
                              ? 'rgba(245, 158, 11, 0.35)'
                              : '#FDE68A',
                          },
                        ]}
                      >
                        <View style={styles.keyPointsHeader}>
                          <View style={styles.trophyIconBox}>
                            <Ionicons name="star" size={14} color="#D97706" />
                          </View>
                          <Text
                            style={[
                              styles.keyPointsTitle,
                              { color: isDark ? '#FBBF24' : '#92400E' },
                            ]}
                          >
                            {language === 'hi'
                              ? '★ परीक्षा उपयोगी मुख्य बिंदु (High-Yield Facts)'
                              : '★ 100% Exam Revision Key Points'}
                          </Text>
                        </View>

                        <View style={styles.keyPointsList}>
                          {topic.keyPoints.map((pt, kIdx) => (
                            <View
                              key={kIdx}
                              style={[
                                styles.keyPointItem,
                                {
                                  backgroundColor: isDark
                                    ? 'rgba(0, 0, 0, 0.25)'
                                    : '#FFFFFF',
                                  borderColor: isDark
                                    ? 'rgba(245, 158, 11, 0.2)'
                                    : '#FEF3C7',
                                },
                              ]}
                            >
                              <Ionicons
                                name="checkmark-circle"
                                size={15}
                                color="#F59E0B"
                                style={{ marginTop: 2 }}
                              />
                              <Text
                                style={[
                                  styles.keyPointText,
                                  {
                                    color: isDark
                                      ? colors.textPrimary
                                      : '#78350F',
                                  },
                                ]}
                              >
                                {renderInlineMarkdown(
                                  pt[language],
                                  {
                                    color: isDark ? colors.textPrimary : '#78350F',
                                    fontSize: 12,
                                  },
                                  {
                                    fontWeight: '800',
                                    color: isDark ? '#FFFFFF' : '#451A03',
                                    fontSize: 12,
                                  }
                                )}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Direct Topic Quiz CTA Button */}
                    {onStartQuiz && (
                      <TouchableOpacity
                        style={[
                          styles.topicQuizBanner,
                          {
                            backgroundColor: isDark
                              ? activeColorConfig.softDark
                              : activeColorConfig.softLight,
                            borderColor: isDark
                              ? activeColorConfig.borderDark
                              : activeColorConfig.borderLight,
                          },
                        ]}
                        onPress={() => onStartQuiz(`quiz_${topic.id}`)}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.quizPlayIconCircle,
                            { backgroundColor: activeColorConfig.primary },
                          ]}
                        >
                          <Ionicons
                            name="play"
                            size={16}
                            color="#FFFFFF"
                            style={{ marginLeft: 2 }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[
                              styles.topicQuizTitle,
                              {
                                color: isDark
                                  ? '#FFFFFF'
                                  : activeColorConfig.primary,
                              },
                            ]}
                          >
                            {language === 'hi'
                              ? '🎯 इस टॉपिक का क्विज़ खेलें'
                              : '🎯 Practice Topic Quiz'}
                          </Text>
                          <Text
                            style={[
                              styles.topicQuizSubtitle,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {language === 'hi'
                              ? '5 महत्वपूर्ण बहुविकल्पीय प्रश्न • तुरंत व्याख्या • +30 XP'
                              : '5 Curated MCQs • Instant Solutions • +30 XP'}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.startQuizArrow,
                            { backgroundColor: activeColorConfig.primary },
                          ]}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={14}
                            color="#FFFFFF"
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {/* Topic Footer Action Bar */}
                    <View
                      style={[
                        styles.topicFooter,
                        { borderTopColor: colors.border },
                      ]}
                    >
                      <Text
                        style={[
                          styles.topicProgressLabel,
                          { color: colors.textMuted },
                        ]}
                      >
                        {language === 'hi'
                          ? `विषय ${topicIdx + 1} / ${filteredTopics.length}`
                          : `Topic ${topicIdx + 1} of ${filteredTopics.length}`}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <View style={{ height: 48 }} />
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
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  unitsCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  unitsCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  fontBtnText: {
    fontSize: 12,
    fontWeight: '900',
  },
  controlLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  loadingBox: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  unitSelectorScroll: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
    paddingRight: 10,
  },
  unitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    gap: 6,
  },
  unitChipText: {
    fontSize: 12,
  },
  activeUnitBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 2,
  },
  activeUnitBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  unitBanner: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderWidth: 1,
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  unitIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  bannerTopRow: {
    marginBottom: 3,
  },
  unitBadgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unitBadgePillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  unitBannerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  unitBannerDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  statsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  statPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptySearchBox: {
    padding: 24,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  emptySearchTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  emptySearchSub: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 17,
  },
  clearSearchBtn: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearSearchBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  topicsContainer: {
    gap: 12,
  },
  topicCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    gap: 10,
  },
  topicOrderBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicOrderText: {
    fontSize: 11,
    fontWeight: '900',
  },
  topicTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  chevronPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  contentWrapper: {
    marginTop: 10,
  },
  numberedItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: 6,
    paddingVertical: 4,
  },
  numberedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numberedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  numberedTitle: {
    fontWeight: '800',
    letterSpacing: -0.1,
  },
  numberedBody: {
    marginTop: 2,
  },
  bulletItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: 4,
    paddingLeft: 4,
  },
  bulletIconDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 9,
  },
  bulletItemText: {
    flex: 1,
  },
  majorHeadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    marginTop: 14,
    marginBottom: 8,
  },
  headingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  majorHeadingText: {
    flex: 1,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  minorHeadingBox: {
    borderLeftWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 6,
  },
  minorHeadingText: {
    fontWeight: '800',
    letterSpacing: -0.1,
  },
  subheadingBox: {
    borderLeftWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginVertical: 8,
  },
  subheadingText: {
    fontWeight: '800',
  },
  paragraphText: {
    marginVertical: 5,
  },
  keyPointsBox: {
    marginTop: 14,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  keyPointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 8,
  },
  trophyIconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPointsTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  keyPointsList: {
    gap: 6,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  keyPointText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  topicQuizBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 14,
    gap: 10,
  },
  quizPlayIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicQuizTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  topicQuizSubtitle: {
    fontSize: 11,
    lineHeight: 15,
  },
  startQuizArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  topicProgressLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
