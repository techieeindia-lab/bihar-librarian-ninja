import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActiveTab } from '../types';
import { useLanguage } from '../localization/LanguageContext';

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

  const tabs: { key: ActiveTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'home', label: t.tabHome, icon: 'home-sharp' },
    { key: 'tests', label: t.tabTests, icon: 'newspaper-sharp' },
    { key: 'notes', label: t.tabNotes, icon: 'book-sharp' },
    { key: 'flashcards', label: t.tabCards, icon: 'flash-sharp' },
    { key: 'bookmarks', label: t.tabBookmarks, icon: 'bookmark-sharp' },
    { key: 'syllabus', label: t.tabSyllabus, icon: 'list-sharp' },
    { key: 'settings', label: t.tabSettings, icon: 'settings-sharp' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onSelectTab(tab.key)}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={isActive ? '#1E3A8A' : '#64748B'}
                />
                {tab.key === 'bookmarks' && bookmarksCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{bookmarksCount}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 64,
  },
  activeTabButton: {
    backgroundColor: '#EFF6FF',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabLabel: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
  activeIndicator: {
    width: 14,
    height: 3,
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
    marginTop: 3,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
