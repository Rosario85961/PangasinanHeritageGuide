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

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error(
      'Pangasinan Heritage Guide error:',
      error
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        {/* =====================================================
            BACKGROUND DECORATION
        ====================================================== */}

        <View style={styles.backgroundCircleLarge} />
        <View style={styles.backgroundCircleSmall} />

        {/* =====================================================
            ERROR CARD
        ====================================================== */}

        <View
          style={styles.card}
          accessibilityRole="alert"
        >
          {/* Error Icon */}
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <Ionicons
                name="warning-outline"
                size={38}
                color={COLORS.accent}
              />
            </View>
          </View>

          {/* Eyebrow */}
          <Text style={styles.eyebrow}>
            TEMPORARILY UNAVAILABLE
          </Text>

          {/* Title */}
          <Text
            style={styles.title}
            accessibilityRole="header"
          >
            Something went wrong
          </Text>

          {/* Description */}
          <Text style={styles.body}>
            We couldn't load this part of the
            Pangasinan Heritage Guide. Please try
            again and we'll get you back on track.
          </Text>

          {/* Saved data notice */}
          <View style={styles.notice}>
            <View style={styles.noticeIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>
                Your favorites are safe
              </Text>

              <Text style={styles.noticeText}>
                Saved favorites remain stored on
                this device.
              </Text>
            </View>
          </View>

          {/* Retry Button */}
          <Pressable
            onPress={this.handleRetry}
            accessibilityRole="button"
            accessibilityLabel="Try again"
            accessibilityHint="Attempts to reload the application"
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Ionicons
              name="refresh"
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.buttonText}>
              Try again
            </Text>
          </Pressable>

          {/* Secondary message */}
          <Text style={styles.footerText}>
            If the problem continues, restart the app.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: SPACING.lg,

    backgroundColor: COLORS.background,

    overflow: 'hidden',
  },

  // ============================================================
  // BACKGROUND DECORATION
  // ============================================================

  backgroundCircleLarge: {
    position: 'absolute',

    width: 360,
    height: 360,

    borderRadius: 180,

    backgroundColor: 'rgba(13, 59, 102, 0.035)',

    top: -160,
    right: -150,
  },

  backgroundCircleSmall: {
    position: 'absolute',

    width: 220,
    height: 220,

    borderRadius: 110,

    backgroundColor: 'rgba(244, 162, 97, 0.055)',

    bottom: -100,
    left: -90,
  },

  // ============================================================
  // CARD
  // ============================================================

  card: {
    width: '100%',
    maxWidth: 480,

    alignItems: 'center',

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.lg + 4,

    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,

    borderWidth: 1,

    borderColor: 'rgba(15, 23, 42, 0.055)',

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.08,

    shadowRadius: 28,

    elevation: 5,

    ...(Platform.OS === 'web'
      ? {
          boxShadow:
            '0px 12px 32px rgba(15, 23, 42, 0.08)',
        }
      : {}),
  },

  // ============================================================
  // ICON
  // ============================================================

  iconOuter: {
    width: 86,
    height: 86,

    borderRadius: 43,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(244, 162, 97, 0.10)',

    marginBottom: SPACING.lg,
  },

  iconInner: {
    width: 64,
    height: 64,

    borderRadius: 32,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(244, 162, 97, 0.13)',

    borderWidth: 1,

    borderColor: 'rgba(244, 162, 97, 0.18)',
  },

  // ============================================================
  // EYEBROW
  // ============================================================

  eyebrow: {
    color: COLORS.accent,

    fontSize: 10,

    fontWeight: '900',

    letterSpacing: 1.5,

    textAlign: 'center',

    marginBottom: 7,
  },

  // ============================================================
  // TITLE
  // ============================================================

  title: {
    color: COLORS.text,

    fontSize: TYPE.h1,

    fontWeight: '900',

    lineHeight: 34,

    letterSpacing: -0.5,

    textAlign: 'center',
  },

  // ============================================================
  // BODY
  // ============================================================

  body: {
    maxWidth: 380,

    color: COLORS.textSecondary,

    fontSize: TYPE.body,

    lineHeight: 22,

    textAlign: 'center',

    marginTop: SPACING.sm,
  },

  // ============================================================
  // NOTICE
  // ============================================================

  notice: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    marginTop: SPACING.xl,

    padding: SPACING.md,

    borderRadius: RADIUS.md,

    backgroundColor: 'rgba(13, 59, 102, 0.055)',

    borderWidth: 1,

    borderColor: 'rgba(13, 59, 102, 0.08)',
  },

  noticeIcon: {
    width: 34,
    height: 34,

    borderRadius: 17,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.surface,

    marginRight: 10,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    color: COLORS.text,

    fontSize: 12,

    fontWeight: '800',

    marginBottom: 2,
  },

  noticeText: {
    color: COLORS.textMuted,

    fontSize: 11,

    lineHeight: 16,
  },

  // ============================================================
  // BUTTON
  // ============================================================

  button: {
    width: '100%',

    minHeight: 50,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: COLORS.primary,

    borderRadius: RADIUS.md,

    marginTop: SPACING.lg,

    paddingHorizontal: SPACING.xl,

    gap: 8,

    shadowColor: '#0D3B66',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.18,

    shadowRadius: 10,

    elevation: 3,
  },

  buttonPressed: {
    opacity: 0.88,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  buttonText: {
    color: COLORS.white,

    fontSize: 14,

    fontWeight: '800',

    letterSpacing: 0.15,
  },

  // ============================================================
  // FOOTER
  // ============================================================

  footerText: {
    color: COLORS.textMuted,

    fontSize: 10,

    lineHeight: 16,

    textAlign: 'center',

    marginTop: 13,
  },
});