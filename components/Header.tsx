import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING, TYPE } from '../constants/theme';

interface HeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function Header({
  eyebrow,
  title,
  subtitle,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* =====================================================
          EYEBROW
      ====================================================== */}
      {eyebrow && (
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowLine} />

          <Text style={styles.eyebrow}>
            {eyebrow.toUpperCase()}
          </Text>
        </View>
      )}

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
          SUBTITLE
      ====================================================== */}
      {subtitle && (
        <View style={styles.subtitleRow}>
          <View style={styles.subtitleIcon}>
            <Ionicons
              name="compass-outline"
              size={15}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      )}

      {/* =====================================================
          DECORATIVE ACCENT
      ====================================================== */}
      <View style={styles.accentContainer}>
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },

  // ============================================================
  // EYEBROW
  // ============================================================

  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 9,
  },

  eyebrowLine: {
    width: 24,
    height: 3,

    borderRadius: 2,

    backgroundColor: COLORS.accent,

    marginRight: 8,
  },

  eyebrow: {
    color: COLORS.accent,

    fontSize: 10,

    fontWeight: '900',

    letterSpacing: 1.5,

    lineHeight: 15,
  },

  // ============================================================
  // TITLE
  // ============================================================

  title: {
    color: COLORS.primaryDark,

    fontSize: TYPE.hero,

    fontWeight: '900',

    lineHeight: 38,

    letterSpacing: -0.8,

    maxWidth: 650,
  },

  // ============================================================
  // SUBTITLE
  // ============================================================

  subtitleRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginTop: 10,

    maxWidth: 650,
  },

  subtitleIcon: {
    width: 27,
    height: 27,

    borderRadius: 13.5,

    backgroundColor: 'rgba(13, 59, 102, 0.08)',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,

    marginTop: 1,
  },

  subtitle: {
    flex: 1,

    color: COLORS.textSecondary,

    fontSize: TYPE.body,

    lineHeight: 22,

    fontWeight: '400',
  },

  // ============================================================
  // ACCENT
  // ============================================================

  accentContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 15,

    gap: 5,
  },

  accentLong: {
    width: 42,
    height: 3,

    borderRadius: 2,

    backgroundColor: COLORS.primary,
  },

  accentShort: {
    width: 9,
    height: 3,

    borderRadius: 2,

    backgroundColor: COLORS.accent,
  },
});