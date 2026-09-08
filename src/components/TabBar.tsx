import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActiveTab } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';

interface TabBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  bookmarksCount?: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onSelectTab,
  bookmarksCount = 0,
}) => {
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const isMoreActive =
    activeTab === 'more' ||
    activeTab === 'flashcards' ||
    activeTab === 'bookmarks' ||
    activeTab === 'syllabus' ||
    activeTab === 'settings';

  const isQuizActive = activeTab === 'quiz' || (activeTab as any) === 'tests';

  // Order: Home (1) | Quiz (2) | Notes (Center 3) | One-Liners (4) | More (5)
  const tabs: {
    key: ActiveTab;
    label: string;
    activeIcon: keyof typeof Ionicons.glyphMap;
    inactiveIcon: keyof typeof Ionicons.glyphMap;
    isActive: boolean;
    isCenterHero?: boolean;
    showBadge?: boolean;
    badgeCount?: number;
  }[] = [
    {
      key: 'home',
      label: t.tabHome,
      activeIcon: 'home',
      inactiveIcon: 'home-outline',
      isActive: activeTab === 'home',
    },
    {
      key: 'quiz',
      label: t.tabQuiz,
      activeIcon: 'trophy',
      inactiveIcon: 'trophy-outline',
      isActive: isQuizActive,
    },
    {
      key: 'notes',
      label: t.tabNotes,
      activeIcon: 'book',
      inactiveIcon: 'book-outline',
      isActive: activeTab === 'notes',
      isCenterHero: true,
    },
    {
      key: 'oneliners',
      label: t.tabOneLiners,
      activeIcon: 'sparkles',
      inactiveIcon: 'sparkles-outline',
      isActive: activeTab === 'oneliners',
    },
    {
      key: 'more',
      label: t.tabMore,
      activeIcon: 'grid',
      inactiveIcon: 'grid-outline',
      isActive: isMoreActive,
      showBadge: bookmarksCount > 0,
      badgeCount: bookmarksCount,
    },
  ];

  // Dynamic bottom padding to ensure comfortable spacing on all screen types:
  // - On devices with gesture nav bar or iOS home indicator (insets.bottom > 0), respect insets + breathing room
  // - On devices with 3-button nav or web (insets.bottom === 0), provide at least 10px padding
  const bottomPadding = Math.max(insets.bottom, 6) + 4;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          // Center Floating Hero Tab (Study Notes)
          if (tab.isCenterHero) {
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => onSelectTab(tab.key)}
                style={styles.centerTabContainer}
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 6, left: 6, right: 6 }}
              >
                <View
                  style={[
                    styles.centerButtonOuter,
                    {
                      borderColor: colors.tabBarBg,
                      backgroundColor: tab.isActive
                        ? 'transparent'
                        : isDark
                        ? '#1C1C22'
                        : '#F4F4F6',
                      shadowColor: tab.isActive ? colors.primary : '#000000',
                    },
                  ]}
                >
                  {tab.isActive ? (
                    <LinearGradient
                      colors={['#0070F3', '#0052CC']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.centerButtonGradient}
                    >
                      <Ionicons
                        name="book"
                        size={25}
                        color="#FFFFFF"
                        style={styles.centerTiltedIcon}
                      />
                    </LinearGradient>
                  ) : (
                    <View style={styles.centerButtonInactive}>
                      <Ionicons
                        name="book-outline"
                        size={24}
                        color={colors.primary}
                        style={styles.centerTiltedIcon}
                      />
                    </View>
                  )}
                </View>

                <Text
                  style={[
                    styles.centerTabLabel,
                    {
                      color: tab.isActive ? colors.primary : colors.tabInactiveText,
                      fontWeight: tab.isActive ? '900' : '600',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>

                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: tab.isActive ? colors.primary : 'transparent' },
                  ]}
                />
              </TouchableOpacity>
            );
          }

          // Standard Tabs (Home, Quiz, One-Liners, More)
          const iconName = tab.isActive ? tab.activeIcon : tab.inactiveIcon;
          const activeColor = colors.tabActiveText;
          const inactiveColor = colors.tabInactiveText;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onSelectTab(tab.key)}
              style={[
                styles.tabButton,
                tab.isActive && {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                },
              ]}
              activeOpacity={0.7}
              hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={iconName}
                  size={23}
                  color={tab.isActive ? activeColor : inactiveColor}
                />
                {tab.showBadge && (
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: colors.accent,
                      },
                    ]}
                  >
                    <Text style={styles.badgeText}>{tab.badgeCount}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: tab.isActive ? activeColor : inactiveColor,
                    fontWeight: tab.isActive ? '800' : '600',
                  },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>

              <View
                style={[
                  styles.activeDot,
                  { backgroundColor: tab.isActive ? colors.accent : 'transparent' },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    elevation: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    paddingTop: 8,
    overflow: 'visible',
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    overflow: 'visible',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 2,
    borderRadius: 14,
    marginHorizontal: 1,
  },
  centerTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    overflow: 'visible',
  },
  centerButtonOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 8,
    overflow: 'hidden',
  },
  centerButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonInactive: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTiltedIcon: {
    transform: [{ rotate: '-8deg' }],
  },
  centerTabLabel: {
    fontSize: 11,
    marginTop: 3,
    letterSpacing: -0.1,
  },
  iconWrapper: {
    position: 'relative',
    height: 27,
    minWidth: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
    letterSpacing: -0.1,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 3,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    borderRadius: 9,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
  },
});
