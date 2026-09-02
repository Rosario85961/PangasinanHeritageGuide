import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { COLORS, RADIUS, SHADOW, SPACING } from '../constants/theme';

interface Props {
  height?: number;
}

export default function Skeleton({ height = 215 }: Props) {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.85, {
        duration: 850,
      }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      {/* =====================================================
          IMAGE SKELETON
      ====================================================== */}
      <View
        style={[
          styles.imageSkeleton,
          {
            height,
          },
        ]}
      >
        {/* Fake category chip */}
        <View style={styles.categorySkeleton} />

        {/* Fake favorite button */}
        <View style={styles.favoriteSkeleton} />

        {/* Fake explore label */}
        <View style={styles.exploreSkeleton} />
      </View>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleSkeleton} />
        <View style={styles.titleSkeletonSecond} />

        {/* Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationIconSkeleton} />
          <View style={styles.locationSkeleton} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.descriptionLarge} />
        <View style={styles.descriptionSmall} />

        {/* Bottom action */}
        <View style={styles.bottomRow}>
          <View style={styles.discoverSkeleton} />
          <View style={styles.arrowSkeleton} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // CARD
  // ============================================================

  card: {
    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.lg + 2,

    overflow: 'hidden',

    marginBottom: SPACING.lg,

    ...SHADOW,
  },

  // ============================================================
  // IMAGE
  // ============================================================

  imageSkeleton: {
    width: '100%',

    backgroundColor: COLORS.border,

    position: 'relative',

    overflow: 'hidden',
  },

  // ============================================================
  // CATEGORY
  // ============================================================

  categorySkeleton: {
    position: 'absolute',

    top: SPACING.md,
    left: SPACING.md,

    width: 92,
    height: 28,

    borderRadius: RADIUS.pill,

    backgroundColor: 'rgba(255,255,255,0.42)',
  },

  // ============================================================
  // FAVORITE
  // ============================================================

  favoriteSkeleton: {
    position: 'absolute',

    top: SPACING.md,
    right: SPACING.md,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: 'rgba(255,255,255,0.65)',
  },

  // ============================================================
  // EXPLORE
  // ============================================================

  exploreSkeleton: {
    position: 'absolute',

    bottom: 14,
    right: 15,

    width: 72,
    height: 25,

    borderRadius: RADIUS.pill,

    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // ============================================================
  // CONTENT
  // ============================================================

  content: {
    paddingHorizontal: SPACING.lg,

    paddingTop: 17,

    paddingBottom: 16,
  },

  // ============================================================
  // TITLE
  // ============================================================

  titleSkeleton: {
    height: 17,

    width: '82%',

    borderRadius: 8,

    backgroundColor: COLORS.border,
  },

  titleSkeletonSecond: {
    height: 17,

    width: '54%',

    borderRadius: 8,

    backgroundColor: COLORS.border,

    marginTop: 7,
  },

  // ============================================================
  // LOCATION
  // ============================================================

  locationRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 13,
  },

  locationIconSkeleton: {
    width: 25,
    height: 25,

    borderRadius: 12.5,

    backgroundColor: COLORS.border,

    marginRight: 7,
  },

  locationSkeleton: {
    height: 12,

    width: '55%',

    borderRadius: 6,

    backgroundColor: COLORS.border,
  },

  // ============================================================
  // DIVIDER
  // ============================================================

  divider: {
    height: 1,

    backgroundColor: COLORS.border,

    marginTop: 13,

    marginBottom: 11,
  },

  // ============================================================
  // DESCRIPTION
  // ============================================================

  descriptionLarge: {
    height: 12,

    width: '94%',

    borderRadius: 6,

    backgroundColor: COLORS.border,
  },

  descriptionSmall: {
    height: 12,

    width: '67%',

    borderRadius: 6,

    backgroundColor: COLORS.border,

    marginTop: 7,
  },

  // ============================================================
  // BOTTOM
  // ============================================================

  bottomRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: 15,
  },

  discoverSkeleton: {
    height: 12,

    width: 110,

    borderRadius: 6,

    backgroundColor: COLORS.border,
  },

  arrowSkeleton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.border,
  },
});