import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import FavoriteButton from './FavoriteButton';
import { COLORS, RADIUS, SHADOW, SPACING, TYPE } from '../constants/theme';
import { HeritageSite, getHeritageImage } from '../data/heritageSites';

interface Props {
  site: HeritageSite;
  index?: number;
  favorite: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

export default function SiteCard({
  site,
  index = 0,
  favorite,
  onPress,
  onFavorite,
}: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const scale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.975, { damping: 16, stiffness: 260 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 260 });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 6) * 50).duration(420)}
      style={styles.wrapper}
    >
      <Animated.View style={animatedCardStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole="button"
          accessibilityLabel={`View details for ${site.name}`}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          {/* IMAGE */}
          <View style={[styles.imageContainer, isCompact && styles.imageContainerCompact]}>
            <Image
              source={getHeritageImage(site)}
              style={styles.image}
              contentFit="cover"
              transition={280}
              cachePolicy="memory-disk"
            />
            <View style={styles.imageOverlay} />

            <View style={styles.categoryContainer}>
              <Ionicons name="sparkles-outline" size={11} color={COLORS.white} />
              <Text style={styles.categoryText}>{site.category}</Text>
            </View>

            <View style={styles.favoriteContainer}>
              <FavoriteButton active={favorite} onPress={onFavorite} size={20} />
            </View>

            {site.rating != null && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={11} color="#FFD700" />
                <Text style={styles.ratingText}>{site.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          {/* CONTENT */}
          <View style={[styles.content, isCompact && styles.contentCompact]}>
            <Text style={styles.title} numberOfLines={2}>
              {site.name}
            </Text>

            <View style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={12} color={COLORS.primary} />
              </View>
              <Text style={styles.locationText} numberOfLines={1}>
                {site.location}
              </Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {site.shortDescription || site.description}
            </Text>

            <View style={styles.bottomRow}>
              <Text style={styles.discoverText}>Discover</Text>
              <View style={styles.arrowButton}>
                <Ionicons name="arrow-forward" size={15} color={COLORS.white} />
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg + 4,
    overflow: 'hidden',
    marginBottom: SPACING.md + 4,
    ...SHADOW,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 30px rgba(15, 23, 42, 0.09)' }
      : {}),
  },
  cardPressed: {
    opacity: 0.97,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: '#E8EEF3',
  },
  imageContainerCompact: {
    height: 170,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  categoryContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(13, 59, 102, 0.85)',
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  favoriteContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 3px 10px rgba(0,0,0,0.12)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 3,
      },
    }),
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  contentCompact: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPE.h3,
    fontWeight: '800',
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  locationIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(13, 59, 102, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  locationText: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  discoverText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
