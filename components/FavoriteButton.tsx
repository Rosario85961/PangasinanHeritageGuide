import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../constants/theme';

interface Props {
  active: boolean;
  onPress: () => void;
  size?: number;
  light?: boolean;
}

export default function FavoriteButton({
  active,
  onPress,
  size = 25,
  light = false,
}: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withSequence(
        withSpring(1.35, {
          damping: 5,
          stiffness: 300,
        }),
        withSpring(1, {
          damping: 8,
          stiffness: 220,
        })
      );
    } else {
      scale.value = withSequence(
        withTiming(0.88, {
          duration: 90,
        }),
        withSpring(1, {
          damping: 8,
          stiffness: 240,
        })
      );
    }
  }, [active, scale]);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    opacity.value = withTiming(0.65, {
      duration: 80,
    });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, {
      duration: 120,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={
        active
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
      accessibilityState={{
        selected: active,
      }}
      style={({ pressed }) => [
        styles.button,

        light
          ? styles.lightButton
          : styles.defaultButton,

        pressed && styles.pressed,
      ]}
    >
      <Animated.View style={animatedHeartStyle}>
        <Ionicons
          name={active ? 'heart' : 'heart-outline'}
          size={size}
          color={
            light
              ? COLORS.white
              : active
                ? COLORS.accent
                : COLORS.text
          }
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // BUTTON
  // ============================================================

  button: {
    width: 44,
    height: 44,

    borderRadius: 22,

    justifyContent: 'center',
    alignItems: 'center',
  },

  // ============================================================
  // DEFAULT
  // ============================================================

  defaultButton: {
    backgroundColor: COLORS.surface,

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.09,

    shadowRadius: 9,

    elevation: 3,
  },

  // ============================================================
  // LIGHT / IMAGE VERSION
  // ============================================================

  lightButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.38)',

    borderWidth: 1,

    borderColor: 'rgba(255, 255, 255, 0.18)',
  },

  // ============================================================
  // PRESSED
  // ============================================================

  pressed: {
    transform: [{ scale: 0.94 }],
  },
});