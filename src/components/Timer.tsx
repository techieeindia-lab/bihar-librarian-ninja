import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';
import { useTheme } from '../theme';

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  totalSeconds,
  onTimeUp,
  isRunning = true,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isRunning]);

  const hours = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  const formattedTime =
    hours > 0
      ? `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const isLowTime = secondsLeft < 300; // less than 5 minutes

  const normalBg = isDark ? 'rgba(0, 112, 243, 0.15)' : '#EFF6FF';
  const normalBorder = isDark ? 'rgba(0, 112, 243, 0.3)' : '#BFDBFE';
  const normalColor = colors.accent;

  const lowBg = isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2';
  const lowBorder = isDark ? 'rgba(239, 68, 68, 0.3)' : '#FECACA';
  const lowColor = colors.error;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isLowTime ? lowBg : normalBg,
          borderColor: isLowTime ? lowBorder : normalBorder,
        },
      ]}
    >
      <Ionicons
        name="time-outline"
        size={15}
        color={isLowTime ? lowColor : normalColor}
      />
      <Text
        style={[
          styles.timeLabel,
          { color: isLowTime ? lowColor : normalColor },
        ]}
      >
        {t.timeRemaining}
      </Text>
      <Text
        style={[
          styles.timeValue,
          { color: isLowTime ? lowColor : normalColor },
        ]}
      >
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 5,
    borderWidth: 1,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeValue: {
    fontSize: 12,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
