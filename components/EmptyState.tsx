import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPE,
} from '../constants/theme';

interface Props {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.container}>
      {/* =====================================================
          ICON
      ====================================================== */}

      <View style={styles.iconOuter}>
        <View style={styles.iconInner}>
          <Ionicons
            name={icon}
            size={34}
            color={COLORS.primary}
          />
        </View>
      </View>

      {/* =====================================================
          TITLE
      ====================================================== */}

      <Text
        style={styles.title}
        accessibilityRole="header"
      >
        {title}
      </Text>

      {/* =====================================================
          MESSAGE
      ====================================================== */}

      <Text style={styles.message}>
        {message}
      </Text>

      {/* =====================================================
          ACTION
      ====================================================== */}

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {actionLabel}
          </Text>

          <Ionicons
            name="arrow-forward"
            size={16}
            color={COLORS.white}
          />
        </Pressable>
      )}

      {/* =====================================================
          DECORATIVE ACCENT
      ====================================================== */}

      <View style={styles.accentRow}>
        <View style={styles.accentLong} />
        <View style={styles.accentShort} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    width: '100%',

    alignItems: 'center',

    paddingHorizontal: SPACING.xl,

    paddingVertical: SPACING.xxl,

    marginTop: SPACING.xxl,
  },

  // ============================================================
  // ICON
  // ============================================================

  iconOuter: {
    width: 94,
    height: 94,

    borderRadius: 47,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(244, 162, 97, 0.09)',

    borderWidth: 1,

    borderColor: 'rgba(244, 162, 97, 0.12)',
  },

  iconInner: {
    width: 70,
    height: 70,

    borderRadius: 35,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: 'rgba(13, 59, 102, 0.08)',

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.06,

    shadowRadius: 10,

    elevation: 2,

    ...(Platform.OS === 'web'
      ? {
          boxShadow:
            '0px 4px 12px rgba(15, 23, 42, 0.06)',
        }
      : {}),
  },

  // ============================================================
  // TITLE
  // ============================================================

  title: {
    fontSize: TYPE.h2,

    fontWeight: '900',

    color: COLORS.text,

    marginTop: SPACING.lg,

    textAlign: 'center',

    letterSpacing: -0.3,
  },

  // ============================================================
  // MESSAGE
  // ============================================================

  message: {
    fontSize: TYPE.body,

    color: COLORS.textSecondary,

    lineHeight: 22,

    textAlign: 'center',

    marginTop: SPACING.sm,

    maxWidth: 360,
  },

  // ============================================================
  // BUTTON
  // ============================================================

  button: {
    minHeight: 48,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: SPACING.xl,

    paddingVertical: SPACING.md,

    marginTop: SPACING.xl,

    borderRadius: RADIUS.md,

    backgroundColor: COLORS.primary,

    gap: 8,

    shadowColor: '#0D3B66',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.17,

    shadowRadius: 10,

    elevation: 3,

    ...(Platform.OS === 'web'
      ? {
          boxShadow:
            '0px 5px 14px rgba(13, 59, 102, 0.16)',
        }
      : {}),
  },

  buttonText: {
    color: COLORS.white,

    fontSize: 13,

    fontWeight: '800',

    letterSpacing: 0.15,
  },

  // ============================================================
  // PRESSED
  // ============================================================

  pressed: {
    opacity: 0.86,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  // ============================================================
  // ACCENT
  // ============================================================

  accentRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,

    marginTop: SPACING.xl,
  },

  accentLong: {
    width: 36,
    height: 3,

    borderRadius: 2,

    backgroundColor: COLORS.primary,
  },

  accentShort: {
    width: 8,
    height: 3,

    borderRadius: 2,

    backgroundColor: COLORS.accent,
  },
});