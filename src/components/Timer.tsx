import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../localization/LanguageContext';

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

  return (
    <View style={[styles.container, isLowTime && styles.lowTimeContainer]}>
      <Ionicons
        name="time-outline"
        size={16}
        color={isLowTime ? '#DC2626' : '#1E3A8A'}
      />
      <Text style={[styles.timeLabel, isLowTime && styles.lowTimeText]}>
        {t.timeRemaining}
      </Text>
      <Text style={[styles.timeValue, isLowTime && styles.lowTimeText]}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  lowTimeContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A8A',
    fontVariant: ['tabular-nums'],
  },
  lowTimeText: {
    color: '#DC2626',
  },
});
