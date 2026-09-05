import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  // Highlight 'more' if in any secondary sub-screen
  const isMoreActive =
    activeTab === 'more' ||
    activeTab === 'bookmarks' ||
    activeTab === 'syllabus' ||
    activeTab === 'settings';

  const tabs: {
    key: ActiveTab;
    label: string;
    activeIcon: keyof typeof Ionicons.glyphMap;
    inactiveIcon: keyof typeof Ionicons.glyphMap;
    isActive: boolean;
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
      key: 'tests',
      label: t.tabTests,
      activeIcon: 'newspaper',
      inactiveIcon: 'newspaper-outline',
      isActive: activeTab === 'tests',
    },
    {
      key: 'notes',
      label: t.tabNotes,
      activeIcon: 'book',
      inactiveIcon: 'book-outline',
      isActive: activeTab === 'notes',
    },
    {
      key: 'flashcards',
      label: t.tabCards,
      activeIcon: 'flash',
      inactiveIcon: 'flash-outline',
      isActive: activeTab === 'flashcards',
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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
        },
      ]}
    >
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
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
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.04)',
                },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={iconName}
                  size={21}
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

              {tab.isActive && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.accent },
                  ]}
                />
              )}
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
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    paddingBottom: 4,
    paddingTop: 4,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  iconWrapper: {
    position: 'relative',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
});
