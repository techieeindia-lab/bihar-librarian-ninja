import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  streak?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack,
  onBack,
  streak = 1,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.canvasElevated,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity
              onPress={onBack}
              style={[
                styles.backButton,
                {
                  backgroundColor: colors.canvasSubtle,
                  borderColor: colors.border,
                },
              ]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {title || t.appName}
            </Text>
            <Text
              style={[styles.subtitle, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {subtitle || t.appSubtitle}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          {/* Daily Streak Badge */}
          <View
            style={[
              styles.streakBadge,
              {
                backgroundColor: isDark ? 'rgba(234, 88, 12, 0.15)' : '#FFF7ED',
                borderColor: isDark ? 'rgba(234, 88, 12, 0.3)' : '#FFEDD5',
              },
            ]}
          >
            <Ionicons name="flame" size={15} color="#EA580C" />
            <Text style={styles.streakText}>{streak}</Text>
          </View>

          {/* Quick Theme Toggle Button */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.themeButton,
              {
                backgroundColor: colors.canvasSubtle,
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.8}
            accessibilityLabel="Toggle dark mode"
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={16}
              color={isDark ? '#F59E0B' : colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Bilingual Toggle Button */}
          <TouchableOpacity
            onPress={toggleLanguage}
            style={[
              styles.langButton,
              {
                backgroundColor: colors.primary,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.langButtonText, { color: colors.textOnPrimary }]}>
              {language === 'hi' ? 'ENG' : 'हिन्दी'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  backButton: {
    padding: 6,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 3,
    borderWidth: 1,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EA580C',
  },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  langButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langButtonText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
