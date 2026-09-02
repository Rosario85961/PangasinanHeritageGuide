import React, { useMemo } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import FavoriteButton from '../../components/FavoriteButton';
import heritageSites from '../../data/heritageSites';
import { useFavorites } from '../../context/FavoritesContext';
import {
  COLORS,
  RADIUS,
  SPACING,
  TYPE,
} from '../../constants/theme';

const HERO = 330;

/**
 * Extra information used by the expanded heritage-site data.
 * These properties are optional so the screen will still work
 * even if an older site object does not contain all of them.
 */
type ExtendedSite = (typeof heritageSites)[number] & {
  shortName?: string;
  address?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  heritageType?: string;

  shortDescription?: string;
  historicalSignificance?: string;
  culturalSignificance?: string;

  notableFacts?: string[];
  activities?: string[];
  visitorTips?: string[];
  whatToExpect?: string;
  accessibility?: string;
  estimatedVisitDuration?: string;

  reservationRequired?: boolean;
  status?: string;

  transportation?: {
    privateVehicle?: string;
    publicTransportation?: string;
    localTransportation?: string;
  };

  directions?: {
    fromManila?: string;
    fromDagupan?: string;
    localAccess?: string;
  };

  tags?: string[];
  bestFor?: string[];
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { isFavorite, toggleFavorite } = useFavorites();

  const site = useMemo(
    () => heritageSites.find((item) => item.id === id),
    [id]
  );

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-160, 0, HERO],
          [-80, 0, HERO * 0.22],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          scrollY.value,
          [-160, 0],
          [1.28, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  // ------------------------------------------------------------
  // SITE NOT FOUND
  // ------------------------------------------------------------

  if (!site) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.missing}>
          <Ionicons
            name="location-outline"
            size={58}
            color={COLORS.primary}
          />

          <Text style={styles.missingTitle}>
            Heritage site not found
          </Text>

          <Text style={styles.missingDescription}>
            We could not find the heritage site you selected.
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color={COLORS.white}
            />

            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const details = site as ExtendedSite;

  // ------------------------------------------------------------
  // GET DIRECTIONS
  // ------------------------------------------------------------

  const directions = async () => {
    if (!details.coordinates) {
      Alert.alert(
        'Location unavailable',
        'Coordinates for this heritage site are not available.'
      );
      return;
    }

    const { latitude, longitude } = details.coordinates;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${latitude},${longitude}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Unable to open maps',
        'Please install or enable a maps application on your device.'
      );
    }
  };

  // ------------------------------------------------------------
  // SHARE
  // ------------------------------------------------------------

  const share = async () => {
    try {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert(
          'Sharing unavailable',
          'Sharing is not available on this device.'
        );
        return;
      }

      if (!FileSystem.cacheDirectory) {
        Alert.alert(
          'Unable to share',
          'Temporary storage is not available.'
        );
        return;
      }

      const shareFile =
        `${FileSystem.cacheDirectory}` +
        'pangasinan-heritage-share.txt';

      const text =
        `${details.name}\n` +
        `${details.location}\n\n` +
        `${details.description}`;

      await FileSystem.writeAsStringAsync(
        shareFile,
        text
      );

      await Sharing.shareAsync(shareFile, {
        dialogTitle: `Share ${details.name}`,
      });
    } catch {
      Alert.alert(
        'Unable to share',
        'Please try again.'
      );
    }
  };

  // ------------------------------------------------------------
  // SCREEN
  // ------------------------------------------------------------

  return (
    <View style={styles.safe}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ======================================================
            HERO
        ====================================================== */}

        <View style={styles.hero}>

          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              imageStyle,
            ]}
          >
            <Image
              source={details.image}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
            />
          </Animated.View>

          <View style={styles.overlay} />

          {/* TOP BAR */}

          <SafeAreaView
            edges={['top']}
            style={styles.topBar}
          >
            <Pressable
              onPress={() => router.back()}
              style={styles.circle}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={COLORS.white}
              />
            </Pressable>

            <View style={styles.actions}>

              <FavoriteButton
                active={isFavorite(details.id)}
                onPress={() => {
                  void toggleFavorite(details.id);
                }}
                light
              />

              <Pressable
                onPress={() => {
                  void share();
                }}
                style={styles.circle}
                accessibilityLabel="Share"
                accessibilityRole="button"
              >
                <Ionicons
                  name="share-outline"
                  size={21}
                  color={COLORS.white}
                />
              </Pressable>

            </View>
          </SafeAreaView>

          {/* HERO TEXT */}

          <View style={styles.heroText}>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {details.category}
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              {details.name}
            </Text>

            {details.shortName && (
              <Text style={styles.heroSubtitle}>
                {details.shortName}
              </Text>
            )}

          </View>
        </View>

        {/* ======================================================
            BODY
        ====================================================== */}

        <View style={styles.body}>

          {/* LOCATION */}

          <View style={styles.locationCard}>

            <View style={styles.locationIcon}>
              <Ionicons
                name="location"
                size={21}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>
                LOCATION
              </Text>

              <Text style={styles.location}>
                {details.location}
              </Text>

              {details.address && (
                <Text style={styles.address}>
                  {details.address}
                </Text>
              )}
            </View>

          </View>

          {/* ==================================================
              QUICK INFORMATION
          ================================================== */}

          <View style={styles.quickGrid}>

            {details.difficulty && (
              <View style={styles.quickCard}>
                <Ionicons
                  name="walk-outline"
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.quickLabel}>
                  Difficulty
                </Text>

                <Text style={styles.quickValue}>
                  {details.difficulty}
                </Text>
              </View>
            )}

            {details.estimatedVisitDuration && (
              <View style={styles.quickCard}>
                <Ionicons
                  name="time-outline"
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.quickLabel}>
                  Visit Duration
                </Text>

                <Text style={styles.quickValue}>
                  {details.estimatedVisitDuration}
                </Text>
              </View>
            )}

            {details.rating !== undefined && (
              <View style={styles.quickCard}>
                <Ionicons
                  name="star"
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.quickLabel}>
                  Rating
                </Text>

                <Text style={styles.quickValue}>
                  {details.rating.toFixed(1)}
                </Text>
              </View>
            )}

            {details.reservationRequired !== undefined && (
              <View style={styles.quickCard}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color={COLORS.primary}
                />

                <Text style={styles.quickLabel}>
                  Reservation
                </Text>

                <Text style={styles.quickValue}>
                  {details.reservationRequired
                    ? 'Required'
                    : 'Not Required'}
                </Text>
              </View>
            )}

          </View>

          {/* ==================================================
              GET DIRECTIONS
          ================================================== */}

          <Pressable
            onPress={() => {
              void directions();
            }}
            style={({ pressed }) => [
              styles.directionButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="navigate"
              size={19}
              color={COLORS.white}
            />

            <Text style={styles.directionText}>
              Get Directions
            </Text>
          </Pressable>

          {/* ==================================================
              TAGS
          ================================================== */}

          {details.tags &&
            details.tags.length > 0 && (
              <View style={styles.sectionBlock}>

                <Text style={styles.heading}>
                  Tags
                </Text>

                <View style={styles.tagsContainer}>
                  {details.tags.map((tag) => (
                    <View
                      key={tag}
                      style={styles.tag}
                    >
                      <Ionicons
                        name="pricetag-outline"
                        size={13}
                        color={COLORS.primary}
                      />

                      <Text style={styles.tagText}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>

              </View>
            )}

          {/* ==================================================
              ABOUT
          ================================================== */}

          <View style={styles.sectionBlock}>

            <Text style={styles.heading}>
              About this place
            </Text>

            {details.shortDescription && (
              <Text style={styles.shortDescription}>
                {details.shortDescription}
              </Text>
            )}

            <Text style={styles.description}>
              {details.description}
            </Text>

          </View>

          {/* ==================================================
              HERITAGE TYPE
          ================================================== */}

          {details.heritageType && (
            <InfoCard
              icon="library-outline"
              title="Heritage Type"
              text={details.heritageType}
            />
          )}

          {/* ==================================================
              HISTORICAL SIGNIFICANCE
          ================================================== */}

          {details.historicalSignificance && (
            <InfoCard
              icon="time-outline"
              title="Historical Significance"
              text={details.historicalSignificance}
            />
          )}

          {/* ==================================================
              CULTURAL SIGNIFICANCE
          ================================================== */}

          {details.culturalSignificance && (
            <InfoCard
              icon="people-outline"
              title="Cultural Significance"
              text={details.culturalSignificance}
            />
          )}

          {/* ==================================================
              NOTABLE FACTS
          ================================================== */}

          {details.notableFacts &&
            details.notableFacts.length > 0 && (
              <ListCard
                icon="bulb-outline"
                title="Notable Facts"
                items={details.notableFacts}
              />
            )}

          {/* ==================================================
              ACTIVITIES
          ================================================== */}

          {details.activities &&
            details.activities.length > 0 && (
              <ListCard
                icon="walk-outline"
                title="Things to Do"
                items={details.activities}
              />
            )}

          {/* ==================================================
              BEST FOR
          ================================================== */}

          {details.bestFor &&
            details.bestFor.length > 0 && (
              <ListCard
                icon="heart-outline"
                title="Best For"
                items={details.bestFor}
              />
            )}

          {/* ==================================================
              WHAT TO EXPECT
          ================================================== */}

          {details.whatToExpect && (
            <InfoCard
              icon="eye-outline"
              title="What to Expect"
              text={details.whatToExpect}
            />
          )}

          {/* ==================================================
              VISITOR TIPS
          ================================================== */}

          {details.visitorTips &&
            details.visitorTips.length > 0 && (
              <ListCard
                icon="information-circle-outline"
                title="Visitor Tips"
                items={details.visitorTips}
              />
            )}

          {/* ==================================================
              ACCESSIBILITY
          ================================================== */}

          {details.accessibility && (
            <InfoCard
              icon="accessibility-outline"
              title="Accessibility"
              text={details.accessibility}
            />
          )}

          {/* ==================================================
              VISITOR INFORMATION
          ================================================== */}

          {(details.bestTimeToVisit ||
            details.entranceFee ||
            details.openingHours ||
            details.status) && (

            <View style={styles.infoSection}>

              <Text style={styles.heading}>
                Visitor Information
              </Text>

              {details.bestTimeToVisit && (
                <InfoRow
                  icon="sunny-outline"
                  label="Best Time to Visit"
                  value={details.bestTimeToVisit}
                />
              )}

              {details.entranceFee && (
                <InfoRow
                  icon="cash-outline"
                  label="Entrance Fee"
                  value={details.entranceFee}
                />
              )}

              {details.openingHours && (
                <InfoRow
                  icon="time-outline"
                  label="Opening Hours"
                  value={details.openingHours}
                />
              )}

              {details.status && (
                <InfoRow
                  icon="checkmark-circle-outline"
                  label="Status"
                  value={details.status}
                />
              )}

            </View>
          )}

          {/* ==================================================
              TRANSPORTATION
          ================================================== */}

          {details.transportation && (
            <View style={styles.infoSection}>

              <Text style={styles.heading}>
                How to Get There
              </Text>

              {details.transportation.privateVehicle && (
                <InfoRow
                  icon="car-outline"
                  label="Private Vehicle"
                  value={
                    details.transportation.privateVehicle
                  }
                />
              )}

              {details.transportation.publicTransportation && (
                <InfoRow
                  icon="bus-outline"
                  label="Public Transportation"
                  value={
                    details.transportation
                      .publicTransportation
                  }
                />
              )}

              {details.transportation.localTransportation && (
                <InfoRow
                  icon="bicycle-outline"
                  label="Local Transportation"
                  value={
                    details.transportation
                      .localTransportation
                  }
                />
              )}

            </View>
          )}

          {/* ==================================================
              DIRECTIONS DETAILS
          ================================================== */}

          {details.directions && (
            <View style={styles.infoSection}>

              <Text style={styles.heading}>
                Travel Directions
              </Text>

              {details.directions.fromManila && (
                <InfoRow
                  icon="navigate-outline"
                  label="From Manila"
                  value={details.directions.fromManila}
                />
              )}

              {details.directions.fromDagupan && (
                <InfoRow
                  icon="navigate-outline"
                  label="From Dagupan"
                  value={details.directions.fromDagupan}
                />
              )}

              {details.directions.localAccess && (
                <InfoRow
                  icon="location-outline"
                  label="Local Access"
                  value={details.directions.localAccess}
                />
              )}

            </View>
          )}

          {/* ==================================================
              CONTACT
          ================================================== */}

          {details.contact &&
            (details.contact.phone ||
              details.contact.website ||
              details.contact.email) && (

              <View style={styles.infoSection}>

                <Text style={styles.heading}>
                  Contact & Visitor Information
                </Text>

                {details.contact.phone && (
                  <Pressable
                    onPress={() => {
                      void Linking.openURL(
                        `tel:${details.contact!.phone}`
                      );
                    }}
                    style={styles.contactRow}
                  >
                    <View style={styles.contactIcon}>
                      <Ionicons
                        name="call-outline"
                        size={19}
                        color={COLORS.primary}
                      />
                    </View>

                    <View style={styles.contactContent}>
                      <Text style={styles.contactLabel}>
                        Phone
                      </Text>

                      <Text style={styles.contactValue}>
                        {details.contact.phone}
                      </Text>
                    </View>
                  </Pressable>
                )}

                {details.contact.email && (
                  <Pressable
                    onPress={() => {
                      void Linking.openURL(
                        `mailto:${details.contact!.email}`
                      );
                    }}
                    style={styles.contactRow}
                  >
                    <View style={styles.contactIcon}>
                      <Ionicons
                        name="mail-outline"
                        size={19}
                        color={COLORS.primary}
                      />
                    </View>

                    <View style={styles.contactContent}>
                      <Text style={styles.contactLabel}>
                        Email
                      </Text>

                      <Text style={styles.contactValue}>
                        {details.contact.email}
                      </Text>
                    </View>
                  </Pressable>
                )}

                {details.contact.website && (
                  <Pressable
                    onPress={() => {
                      void Linking.openURL(
                        details.contact!.website!
                      );
                    }}
                    style={styles.contactRow}
                  >
                    <View style={styles.contactIcon}>
                      <Ionicons
                        name="globe-outline"
                        size={19}
                        color={COLORS.primary}
                      />
                    </View>

                    <View style={styles.contactContent}>
                      <Text style={styles.contactLabel}>
                        Website
                      </Text>

                      <Text
                        style={[
                          styles.contactValue,
                          styles.linkText,
                        ]}
                      >
                        {details.contact.website}
                      </Text>
                    </View>
                  </Pressable>
                )}

              </View>
            )}

          {/* ==================================================
              COORDINATES
          ================================================== */}

          {details.coordinates && (
            <View style={styles.coordinatesCard}>

              <View style={styles.coordinatesHeader}>
                <Ionicons
                  name="map-outline"
                  size={21}
                  color={COLORS.primary}
                />

                <Text style={styles.coordinatesTitle}>
                  Location Coordinates
                </Text>
              </View>

              <Text style={styles.coordinatesText}>
                Latitude: {details.coordinates.latitude}
              </Text>

              <Text style={styles.coordinatesText}>
                Longitude: {details.coordinates.longitude}
              </Text>

              <Pressable
                onPress={() => {
                  void directions();
                }}
                style={styles.smallMapButton}
              >
                <Text style={styles.smallMapButtonText}>
                  Open in Maps
                </Text>

                <Ionicons
                  name="open-outline"
                  size={16}
                  color={COLORS.white}
                />
              </Pressable>

            </View>
          )}

        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ============================================================
// REUSABLE INFO CARD
// ============================================================

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.infoCard}>

      <View style={styles.infoCardHeader}>

        <View style={styles.infoCardIcon}>
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.infoCardTitle}>
          {title}
        </Text>

      </View>

      <Text style={styles.infoCardText}>
        {text}
      </Text>

    </View>
  );
}

// ============================================================
// REUSABLE LIST CARD
// ============================================================

function ListCard({
  icon,
  title,
  items,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  items: string[];
}) {
  return (
    <View style={styles.infoCard}>

      <View style={styles.infoCardHeader}>

        <View style={styles.infoCardIcon}>
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.infoCardTitle}>
          {title}
        </Text>

      </View>

      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <View
            key={`${item}-${index}`}
            style={styles.listItem}
          >
            <View style={styles.bullet}>
              <Ionicons
                name="checkmark"
                size={12}
                color={COLORS.white}
              />
            </View>

            <Text style={styles.listText}>
              {item}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
}

// ============================================================
// REUSABLE INFO ROW
// ============================================================

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>

      <View style={styles.infoRowIcon}>
        <Ionicons
          name={icon}
          size={19}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.infoRowContent}>
        <Text style={styles.infoRowLabel}>
          {label}
        </Text>

        <Text style={styles.infoRowValue}>
          {value}
        </Text>
      </View>

    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingBottom: SPACING.xxl * 2,
  },

  // ----------------------------------------------------------
  // HERO
  // ----------------------------------------------------------

  hero: {
    height: HERO,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },

  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },

  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },

  heroText: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    bottom: SPACING.xl,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    marginBottom: SPACING.sm,
  },

  badgeText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: '900',
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: TYPE.h1,
    fontWeight: '900',
    lineHeight: 34,
  },

  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },

  // ----------------------------------------------------------
  // BODY
  // ----------------------------------------------------------

  body: {
    padding: SPACING.lg,
  },

  // ----------------------------------------------------------
  // LOCATION
  // ----------------------------------------------------------

  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    marginRight: SPACING.md,
  },

  locationContent: {
    flex: 1,
  },

  locationLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 3,
  },

  location: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },

  address: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  // ----------------------------------------------------------
  // QUICK GRID
  // ----------------------------------------------------------

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },

  quickCard: {
    flexGrow: 1,
    flexBasis: '46%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  quickLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },

  quickValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
  },

  // ----------------------------------------------------------
  // DIRECTIONS
  // ----------------------------------------------------------

  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
    gap: 8,
  },

  directionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },

  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },

  // ----------------------------------------------------------
  // SECTIONS
  // ----------------------------------------------------------

  sectionBlock: {
    marginTop: SPACING.xxl,
  },

  heading: {
    color: COLORS.text,
    fontSize: TYPE.h2,
    fontWeight: '900',
    marginBottom: SPACING.md,
  },

  shortDescription: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: TYPE.body,
    lineHeight: 25,
  },

  // ----------------------------------------------------------
  // TAGS
  // ----------------------------------------------------------

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  tagText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
  },

  // ----------------------------------------------------------
  // INFO CARDS
  // ----------------------------------------------------------

  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  infoCardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
  },

  infoCardTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
  },

  infoCardText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 23,
  },

  // ----------------------------------------------------------
  // LISTS
  // ----------------------------------------------------------

  listContainer: {
    gap: 12,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  bullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginRight: 9,
    marginTop: 1,
  },

  listText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  // ----------------------------------------------------------
  // INFORMATION SECTION
  // ----------------------------------------------------------

  infoSection: {
    marginTop: SPACING.xxl,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  infoRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
  },

  infoRowContent: {
    flex: 1,
  },

  infoRowLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 3,
  },

  infoRowValue: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },

  // ----------------------------------------------------------
  // CONTACT
  // ----------------------------------------------------------

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  contactIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
  },

  contactContent: {
    flex: 1,
  },

  contactLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 3,
  },

  contactValue: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  linkText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },

  // ----------------------------------------------------------
  // COORDINATES
  // ----------------------------------------------------------

  coordinatesCard: {
    marginTop: SPACING.xxl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  coordinatesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: SPACING.md,
  },

  coordinatesTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
  },

  coordinatesText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  smallMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 11,
    marginTop: SPACING.md,
  },

  smallMapButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '900',
  },

  // ----------------------------------------------------------
  // MISSING
  // ----------------------------------------------------------

  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxl,
  },

  missingTitle: {
    fontSize: TYPE.h2,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },

  missingDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: SPACING.sm,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: SPACING.xl,
  },

  backButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
});