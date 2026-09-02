// ============================================================
// PANGASINAN HERITAGE GUIDE
// Complete Heritage & Tourism Database
// Modern Tourism & Cultural Experience
//
// Enhanced features:
// - Detailed descriptions
// - Historical significance
// - Cultural significance
// - Directions
// - Google Maps
// - Waze
// - Transportation
// - Activities
// - Visitor tips
// - Related heritage sites
// - Distance calculation
// - Advanced search/filtering
// - Data validation
// ============================================================

import type { ImageSourcePropType } from 'react-native';
import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

// ============================================================
// TYPES
// ============================================================

export type HeritageCategory =
  | 'Natural'
  | 'Historical'
  | 'Religious'
  | 'Cultural';

export type HeritageDifficulty =
  | 'Easy'
  | 'Moderate'
  | 'Challenging';

export type HeritageTag =
  | 'Featured'
  | 'Popular'
  | 'Must Visit'
  | 'Family Friendly'
  | 'Historical'
  | 'Scenic'
  | 'Cultural'
  | 'Pilgrimage'
  | 'Nature'
  | 'Beach'
  | 'Adventure'
  | 'Photography'
  | 'Architecture'
  | 'World War II'
  | 'Museum'
  | 'Marine'
  | 'Waterfall'
  | 'Cave'
  | 'Sunset'
  | 'Educational'
  | 'Religious'
  | 'Heritage';

export interface HeritageContact {
  phone?: string;
  website?: string;
  email?: string;
  facebook?: string;
}

export interface HeritageCoordinates {
  latitude: number;
  longitude: number;
}

export interface HeritageTransportation {
  privateVehicle?: string;
  publicTransportation?: string;
  localTransportation?: string;
}

export interface HeritageDirections {
  fromManila?: string;
  fromDagupan?: string;
  localAccess?: string;
}

export interface HeritageSite {
  // ----------------------------------------------------------
  // Identity
  // ----------------------------------------------------------

  id: string;
  name: string;
  shortName?: string;

  // ----------------------------------------------------------
  // Classification
  // ----------------------------------------------------------

  location: string;
  address?: string;
  barangay?: string;
  municipality?: string;
  province?: string;

  category: HeritageCategory;
  heritageType?: string;
  historicalPeriod?: string;

  // ----------------------------------------------------------
  // Content
  // ----------------------------------------------------------

  description: string;
  shortDescription?: string;

  historicalSignificance?: string;
  culturalSignificance?: string;

  notableFacts?: string[];

  // ----------------------------------------------------------
  // Visitor Experience
  // ----------------------------------------------------------

  activities?: string[];
  bestFor?: string[];
  visitorTips?: string[];
  whatToExpect?: string;

  accessibility?: string;
  estimatedVisitDuration?: string;
  difficulty?: HeritageDifficulty;

  // ----------------------------------------------------------
  // Visual
  // ----------------------------------------------------------

  image: ImageSourcePropType;
  imageUrl?: string;

  // ----------------------------------------------------------
  // Contact / Location
  // ----------------------------------------------------------

  contact?: HeritageContact;
  coordinates?: HeritageCoordinates;

  directions?: HeritageDirections;
  transportation?: HeritageTransportation;

  mapLabel?: string;

  googleMapsUrl?: string;
  wazeUrl?: string;

  // ----------------------------------------------------------
  // Visitor Information
  // ----------------------------------------------------------

  entranceFee?: string;
  openingHours?: string;
  bestTimeToVisit?: string;

  reservationRequired?: boolean;

  /**
   * Example:
   * "Open"
   * "Seasonal"
   * "Verify before visiting"
   * "Reported closed"
   */
  status?: string;

  // ----------------------------------------------------------
  // Discovery
  // ----------------------------------------------------------

  tags?: HeritageTag[];
  relatedSiteIds?: string[];

  featured?: boolean;
  popular?: boolean;
  rating?: number;
}

// ============================================================
// CATEGORY ICON TYPE
// ============================================================

export type HeritageCategoryIcon =
  ComponentProps<typeof Ionicons>['name'];

// ============================================================
// CATEGORIES
// ============================================================

export const CATEGORIES: Array<'All' | HeritageCategory> = [
  'All',
  'Natural',
  'Historical',
  'Religious',
  'Cultural',
];

// ============================================================
// CATEGORY METADATA
// ============================================================

export interface CategoryInfo {
  label: string;
  description: string;
  icon: HeritageCategoryIcon;
}

export const CATEGORY_INFO: Record<
  HeritageCategory,
  CategoryInfo
> = {
  Natural: {
    label: 'Natural',
    description:
      'Beaches, rivers, caves, waterfalls, islands, marine environments, and scenic landscapes.',
    icon: 'leaf-outline',
  },

  Historical: {
    label: 'Historical',
    description:
      'Landmarks, wartime sites, historic structures, and places connected to Pangasinan history.',
    icon: 'time-outline',
  },

  Religious: {
    label: 'Religious',
    description:
      'Churches, basilicas, pilgrimage destinations, and places of religious heritage.',
    icon: 'business-outline',
  },

  Cultural: {
    label: 'Cultural',
    description:
      'Museums, traditions, communities, local industries, and living cultural heritage.',
    icon: 'people-outline',
  },
};

// ============================================================
// MAP URL HELPERS
// ============================================================

/**
 * Generate a Google Maps search URL.
 */
export const getGoogleMapsUrl = (
  site: HeritageSite
): string | undefined => {
  if (!site.coordinates) {
    return undefined;
  }

  return (
    site.googleMapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${site.coordinates.latitude},${site.coordinates.longitude}`
  );
};

/**
 * Generate a Google Maps directions URL.
 */
export const getGoogleMapsDirectionsUrl = (
  site: HeritageSite
): string | undefined => {
  if (!site.coordinates) {
    return undefined;
  }

  return (
    site.googleMapsUrl ??
    `https://www.google.com/maps/dir/?api=1&destination=${site.coordinates.latitude},${site.coordinates.longitude}`
  );
};

/**
 * Generate a Waze navigation URL.
 */
export const getWazeUrl = (
  site: HeritageSite
): string | undefined => {
  if (!site.coordinates) {
    return undefined;
  }

  return (
    site.wazeUrl ??
    `https://www.waze.com/ul?ll=${site.coordinates.latitude}%2C${site.coordinates.longitude}&navigate=yes`
  );
};

/**
 * Generic directions helper.
 */
export const getDirectionsUrl = (
  site: HeritageSite
): string => {
  return (
    getGoogleMapsDirectionsUrl(site) ??
    ''
  );
};

// ============================================================
// HERITAGE SITES
// ============================================================

const heritageSites: HeritageSite[] = [
  // ==========================================================
  // 01 — HUNDRED ISLANDS NATIONAL PARK
  // ==========================================================

  {
    id: 'hundred-islands',

    name: 'Hundred Islands National Park',
    shortName: 'Hundred Islands',

    location: 'Alaminos City, Pangasinan',

    address:
      'Barangay Lucap, Alaminos City, Pangasinan, Philippines',

    barangay: 'Lucap',
    municipality: 'Alaminos City',
    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'Natural and Marine Heritage',

    historicalPeriod:
      'Declared a national park in 1940',

    description:
      'Hundred Islands National Park is one of Pangasinan’s most recognized natural destinations and a major tourism attraction of Alaminos City. The protected area consists of numerous limestone islands and islets scattered across the waters of the Lingayen Gulf. Visitors can explore major destinations within the park, including Quezon Island, Governor’s Island, and Children’s Island, while enjoying island hopping, swimming, kayaking, snorkeling, photography, and other marine activities. The national park combines geological, ecological, recreational, and tourism values and remains one of the defining natural landscapes of Pangasinan.',

    shortDescription:
      'A nationally recognized marine park in Alaminos City featuring limestone islands, marine ecosystems, scenic viewpoints, and island-hopping activities.',

    historicalSignificance:
      'The Hundred Islands National Park was declared a national park through Presidential Proclamation No. 667 on January 18, 1940. The official City of Alaminos tourism information identifies it as the country’s first national park and documents its subsequent conservation and tourism-management history.',

    culturalSignificance:
      'Hundred Islands has become strongly associated with the tourism identity of Alaminos City and Pangasinan. Its tourism industry supports local services, boat operators, guides, accommodation providers, restaurants, and other community-based economic activities.',

    notableFacts: [
      'The park is located in the Lingayen Gulf.',
      'Major visitor destinations include Governor’s Island, Quezon Island, and Children’s Island.',
      'Lucap Park serves as the main tourism gateway to the national park.',
      'The park supports marine and coastal ecosystems.',
    ],

    activities: [
      'Island hopping',
      'Swimming',
      'Snorkeling',
      'Kayaking',
      'Photography',
      'Sightseeing',
      'Marine exploration',
      'Zipline activities',
    ],

    bestFor: [
      'Families',
      'Nature lovers',
      'Island hopping',
      'Photography',
      'Adventure',
      'Educational tours',
    ],

    visitorTips: [
      'Check weather and sea conditions before traveling.',
      'Use authorized tourism services and boats.',
      'Follow marine and environmental protection regulations.',
      'Bring drinking water, sun protection, and appropriate footwear.',
      'Avoid leaving plastic, food waste, or other garbage on the islands.',
      'Follow instructions from local guides and tourism personnel.',
    ],

    whatToExpect:
      'Visitors should expect a marine tourism experience involving boat transportation from the Lucap gateway to the islands. Activities and access may depend on weather, sea conditions, park regulations, and available tourism services.',

    accessibility:
      'The main gateway is accessible by road. Island activities require boat transportation, and some islands involve stairs, uneven surfaces, or walking trails.',

    estimatedVisitDuration:
      'Half day to full day',

    difficulty: 'Easy',

    image: require('../assets/hundred-islands.jpg'),

    tags: [
      'Featured',
      'Popular',
      'Must Visit',
      'Nature',
      'Marine',
      'Adventure',
      'Photography',
      'Family Friendly',
      'Educational',
      'Scenic',
    ],

    bestTimeToVisit:
      'Generally preferable during the drier months, subject to weather and sea conditions.',

    entranceFee:
      'Fees vary according to visitor category, park charges, activities, and tourism services. Confirm current rates with the Alaminos City tourism authorities before visiting.',

    openingHours:
      'Visitor access is subject to park operations, weather, and local tourism regulations.',

    reservationRequired: false,

    status:
      'Operating tourism destination; confirm current regulations and fees before visiting.',

    transportation: {
      privateVehicle:
        'Travel to Alaminos City and proceed toward Barangay Lucap. Lucap Park is the main gateway and tourism access point for Hundred Islands National Park.',

      publicTransportation:
        'Buses and vans serving Alaminos City can be used, followed by local transportation toward Barangay Lucap.',

      localTransportation:
        'Tricycles and other local transportation may be used to reach the Lucap tourism gateway. Authorized boats provide access to the islands.',
    },

    directions: {
      fromManila:
        'Travel north through the major expressway network toward Pangasinan, continue toward Alaminos City, and follow local road signs leading to Barangay Lucap and the Hundred Islands gateway.',

      fromDagupan:
        'Travel west toward Alaminos City and follow local directional signs to Barangay Lucap and Lucap Park.',

      localAccess:
        'From Alaminos City proper, proceed toward Lucap Park. The official city gateway map identifies Lucap Park as approximately 4.9 km from the city proper.',
    },

    coordinates: {
      latitude: 16.1908,
      longitude: 119.9381,
    },

    mapLabel:
      'Lucap Park / Hundred Islands National Park Gateway',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.1908,119.9381',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.1908%2C119.9381&navigate=yes',

    contact: {
      website:
        'https://www.alaminoscity.gov.ph/I-Choose-Hundred-Islands/hundred-islands-national-park.html',
    },

    relatedSiteIds: [
      'patar-white-beach',
      'cape-bolinao-lighthouse',
      'tondol-beach',
    ],

    featured: true,
    popular: true,
    rating: 4.8,
  },

  // ==========================================================
  // 02 — BOLINAO FALLS
  // ==========================================================

  {
    id: 'bolinao-falls',

    name: 'Bolinao Falls',
    shortName: 'Bolinao Falls',

    location: 'Bolinao, Pangasinan',

    address:
      'Barangay Tupa, Bolinao, Pangasinan, Philippines',

    barangay: 'Tupa',
    municipality: 'Bolinao',
    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'Natural Waterfall Heritage',

    description:
      'Bolinao Falls is a group of natural waterfall and freshwater-pool attractions in the upland portion of Bolinao, Pangasinan. The area is characterized by limestone formations, vegetation, flowing freshwater, and natural pools that have become popular for swimming, sightseeing, photography, and outdoor recreation. The waterfalls provide a contrast to Bolinao’s coastal attractions and are commonly included in nature-oriented itineraries around the municipality.',

    shortDescription:
      'A natural waterfall destination in Barangay Tupa featuring freshwater pools, limestone surroundings, and outdoor recreation.',

    historicalSignificance:
      'Bolinao Falls is primarily significant as a natural attraction rather than a built historical monument. Its value comes from the geological and environmental character of the Bolinao landscape and its role in the municipality’s tourism economy.',

    culturalSignificance:
      'The waterfalls are part of Bolinao’s broader tourism identity, complementing the municipality’s beaches, caves, lighthouse, rivers, and coastal attractions. Tourism activities around the falls also involve local guides, accommodation providers, and community businesses.',

    notableFacts: [
      'The falls are located in Barangay Tupa, Bolinao.',
      'The area includes natural freshwater pools.',
      'Bolinao Falls is one of Bolinao’s established nature attractions.',
    ],

    activities: [
      'Swimming',
      'Nature exploration',
      'Photography',
      'Sightseeing',
      'Outdoor recreation',
    ],

    bestFor: [
      'Nature lovers',
      'Adventure travelers',
      'Photography',
      'Swimming',
      'Small groups',
    ],

    visitorTips: [
      'Wear footwear suitable for wet and uneven surfaces.',
      'Follow local swimming and safety instructions.',
      'Avoid jumping into unfamiliar water areas.',
      'Check rainfall and weather conditions before traveling.',
      'Keep the waterfall area clean.',
      'Follow local tourism and environmental rules.',
    ],

    whatToExpect:
      'Visitors should expect an outdoor nature attraction involving walking on uneven terrain and access to natural pools. Conditions can change after rainfall.',

    accessibility:
      'Road access is available, but visitors may need to walk over uneven or wet surfaces to reach swimming and viewing areas.',

    estimatedVisitDuration:
      '2–4 hours',

    difficulty: 'Moderate',

    image: require('../assets/bolinao-falls.jpg'),

    tags: [
      'Popular',
      'Nature',
      'Adventure',
      'Scenic',
      'Photography',
      'Waterfall',
      'Family Friendly',
    ],

    bestTimeToVisit:
      'During periods of favorable weather and manageable water conditions.',

    entranceFee:
      'Fees may vary by local tourism rules, resort, guide, or activity. Confirm current charges locally.',

    openingHours:
      'Access is subject to local tourism and site operations.',

    reservationRequired: false,

    status:
      'Operating tourism attraction; verify current access conditions before visiting.',

    transportation: {
      privateVehicle:
        'Travel toward Bolinao town and continue to Barangay Tupa following local road signs for Bolinao Falls.',

      publicTransportation:
        'Travel to Bolinao by bus or van, then arrange local transportation toward Barangay Tupa.',

      localTransportation:
        'Tricycles, local vehicles, or arranged tourism transport may be used for the final portion of the journey.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and continue west toward Bolinao. From the town area, follow local roads toward Barangay Tupa.',

      fromDagupan:
        'Travel west toward Bolinao and continue to Barangay Tupa.',

      localAccess:
        'From Bolinao town proper, follow local directions toward Barangay Tupa and the waterfall area.',
    },

    coordinates: {
      latitude: 16.3050,
      longitude: 119.86051,
    },

    mapLabel:
      'Bolinao Falls, Barangay Tupa',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.3050,119.86051',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.3050%2C119.86051&navigate=yes',

    contact: {
      website:
        'https://bolinaopangasinan.gov.ph/services/tourism-3/',
    },

    relatedSiteIds: [
      'enchanted-cave',
      'patar-white-beach',
      'cape-bolinao-lighthouse',
    ],

    popular: true,
    rating: 4.6,
  },

  // ==========================================================
  // 03 — CAPE BOLINAO LIGHTHOUSE
  // ==========================================================

  {
    id: 'cape-bolinao-lighthouse',

    name: 'Cape Bolinao Lighthouse',
    shortName: 'Cape Bolinao Lighthouse',

    location: 'Patar, Bolinao, Pangasinan',

    address:
      'Patar, Bolinao, Pangasinan, Philippines',

    barangay: 'Patar',
    municipality: 'Bolinao',
    province: 'Pangasinan',

    category: 'Historical',

    heritageType:
      'Maritime and Built Heritage',

    historicalPeriod:
      'Early 20th century',

    description:
      'Cape Bolinao Lighthouse is a historic maritime landmark overlooking the western coast of Bolinao. Constructed during the early twentieth century, the lighthouse became part of the navigational infrastructure serving vessels traveling along the western Philippine coast and waters approaching the Lingayen Gulf. Its elevated location provides broad coastal views, while its surviving structure gives visitors an opportunity to appreciate the maritime history and built heritage of western Pangasinan.',

    shortDescription:
      'A historic maritime landmark in Patar, Bolinao, known for its heritage value and elevated coastal views.',

    historicalSignificance:
      'The lighthouse is associated with the development of early twentieth-century maritime navigation in the Philippines. Its location on the western coast of Bolinao reflects the importance of coastal navigation and the movement of vessels through waters near Pangasinan.',

    culturalSignificance:
      'The lighthouse has become an important symbol of Bolinao’s maritime identity and is frequently included in cultural and tourism itineraries together with Patar Beach, Enchanted Cave, and other western Pangasinan attractions.',

    notableFacts: [
      'The lighthouse is located in Patar, Bolinao.',
      'Its elevated coastal location provides panoramic views.',
      'It represents an important part of Bolinao’s maritime landscape.',
    ],

    activities: [
      'Historical sightseeing',
      'Photography',
      'Coastal viewing',
      'Sunset viewing',
      'Architecture appreciation',
    ],

    bestFor: [
      'History lovers',
      'Photography',
      'Architecture enthusiasts',
      'Sightseeing',
      'Sunset viewing',
    ],

    visitorTips: [
      'Follow current site access rules.',
      'Use caution around elevated and uneven areas.',
      'Avoid climbing restricted structures.',
      'Visit during favorable weather for better coastal views.',
      'Respect the historic structure and surrounding environment.',
    ],

    whatToExpect:
      'Visitors can expect a historic lighthouse setting with coastal scenery. Access to portions of the structure may vary according to current safety and management policies.',

    accessibility:
      'The destination is accessible by road, although some walking and uneven surfaces may be encountered.',

    estimatedVisitDuration:
      '1–2 hours',

    difficulty: 'Easy',

    image: require('../assets/cape-bolinao-lighthouse.jpg'),

    tags: [
      'Featured',
      'Historical',
      'Must Visit',
      'Scenic',
      'Photography',
      'Architecture',
      'Sunset',
      'Heritage',
    ],

    bestTimeToVisit:
      'Late afternoon is popular for coastal views and sunset photography, subject to weather conditions.',

    entranceFee:
      'Confirm current local tourism or site fees before visiting.',

    openingHours:
      'Current access hours may change. Verify with local tourism authorities before visiting.',

    reservationRequired: false,

    status:
      'Tourism attraction; confirm current access and operating conditions.',

    transportation: {
      privateVehicle:
        'Travel to Bolinao and continue toward Barangay Patar using local road signs leading to the lighthouse area.',

      publicTransportation:
        'Travel to Bolinao by bus or van, then arrange local transportation to Patar.',

      localTransportation:
        'Tricycle and other local transport services are commonly used for destinations within Bolinao.',
    },

    directions: {
      fromManila:
        'Travel north to Pangasinan, continue toward Bolinao, then follow local roads to Barangay Patar and the Cape Bolinao Lighthouse area.',

      fromDagupan:
        'Travel west through Pangasinan toward Bolinao, then continue toward Patar.',

      localAccess:
        'From Bolinao town proper, follow the road toward Patar. The lighthouse is located near the western coastal portion of the municipality.',
    },

    coordinates: {
      latitude: 16.3727,
      longitude: 119.9128,
    },

    mapLabel:
      'Cape Bolinao Lighthouse',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.3727,119.9128',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.3727%2C119.9128&navigate=yes',

    relatedSiteIds: [
      'patar-white-beach',
      'enchanted-cave',
      'bolinao-falls',
    ],

    featured: true,
    popular: true,
    rating: 4.5,
  },

  // ==========================================================
  // 04 — MANAOAG BASILICA
  // ==========================================================

  {
    id: 'manaoag-basilica',

    name: 'Minor Basilica of Our Lady of the Rosary of Manaoag',
    shortName: 'Manaoag Basilica',

    location: 'Manaoag, Pangasinan',

    address:
      'Manaoag, Pangasinan, Philippines',

    municipality: 'Manaoag',
    province: 'Pangasinan',

    category: 'Religious',

    heritageType:
      'Religious and Pilgrimage Heritage',

    historicalPeriod:
      'Spanish-era religious heritage with roots dating to the 1600s',

    description:
      'The Minor Basilica of Our Lady of the Rosary of Manaoag is one of the most important religious and pilgrimage destinations in Pangasinan. The basilica is dedicated to Our Lady of the Rosary of Manaoag and has attracted generations of devotees seeking prayer, thanksgiving, spiritual reflection, and religious participation. Its significance extends beyond religious practice because the basilica forms an important part of Manaoag’s history, architecture, community identity, and cultural tourism. The municipality itself is recognized by the Province of Pangasinan as a major tourism focus area because of the basilica and the large number of pilgrims and visitors it attracts.',

    shortDescription:
      'A major Marian pilgrimage destination in Pangasinan known for its religious history, devotion, architecture, and cultural significance.',

    historicalSignificance:
      'The religious history of Manaoag dates back to the Spanish missionary period. The Province of Pangasinan records the town’s long association with Marian devotion and identifies the basilica as one of the province’s most important pilgrimage destinations. The church was canonically affiliated with the Papal Basilica of Saint Mary Major in Rome in 2011, according to the provincial government.',

    culturalSignificance:
      'Manaoag’s Marian devotion is deeply connected to local religious culture and community traditions. The annual observances, pilgrimages, religious celebrations, and continuous flow of visitors have made the basilica a major part of Pangasinan’s living religious heritage.',

    notableFacts: [
      'The basilica is located in Manaoag, Pangasinan.',
      'It is one of the Philippines’ major Marian pilgrimage destinations.',
      'The municipality celebrates the Galicayo Festival in connection with its religious heritage.',
      'The church is associated with a centuries-old tradition of Marian devotion.',
    ],

    activities: [
      'Prayer',
      'Mass attendance',
      'Pilgrimage',
      'Cultural sightseeing',
      'Architecture appreciation',
      'Religious reflection',
    ],

    bestFor: [
      'Pilgrims',
      'Religious travelers',
      'History lovers',
      'Architecture enthusiasts',
      'Cultural tourists',
    ],

    visitorTips: [
      'Observe proper attire and respectful behavior.',
      'Maintain silence in prayer and worship areas.',
      'Follow church photography regulations.',
      'Check the current Mass schedule before traveling.',
      'Be mindful of large crowds during major religious celebrations.',
      'Respect worshippers and ongoing religious ceremonies.',
    ],

    whatToExpect:
      'Visitors should expect an active religious environment rather than a conventional tourist attraction. The basilica may become particularly busy during major feasts, weekends, and pilgrimage periods.',

    accessibility:
      'The basilica is located in an established urban area and is generally accessible by road. Crowds may affect ease of movement during major religious events.',

    estimatedVisitDuration:
      '1–3 hours',

    difficulty: 'Easy',

    image: require('../assets/manaoag-basilica.jpg'),

    tags: [
      'Featured',
      'Must Visit',
      'Pilgrimage',
      'Cultural',
      'Historical',
      'Religious',
      'Architecture',
      'Heritage',
    ],

    bestTimeToVisit:
      'Year-round. Visitors should expect heavier crowds during major Marian and religious celebrations.',

    entranceFee:
      'No general tourism entrance fee is listed here. Donations and activity-specific arrangements may differ.',

    openingHours:
      'Religious services and visitor access follow the basilica’s current schedule. Confirm schedules before visiting.',

    reservationRequired: false,

    status:
      'Active religious and pilgrimage destination.',

    transportation: {
      privateVehicle:
        'Travel toward Manaoag town proper and follow road signs to the basilica.',

      publicTransportation:
        'Buses, vans, and public transport serving Pangasinan can be used to reach Manaoag.',

      localTransportation:
        'Tricycles and other local transportation can be used for final access within Manaoag.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and continue toward Manaoag using the main provincial road network.',

      fromDagupan:
        'Travel east toward Manaoag and follow local signs to the basilica.',

      localAccess:
        'The basilica is located within Manaoag town and is accessible through established local roads.',
    },

    coordinates: {
      latitude: 16.0431,
      longitude: 120.4863,
    },

    mapLabel:
      'Minor Basilica of Our Lady of the Rosary of Manaoag',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.0431,120.4863',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.0431%2C120.4863&navigate=yes',

    contact: {
      website:
        'https://www.pangasinan.gov.ph/city-municipalities/manaoag/',
    },

    relatedSiteIds: [
      'st-john-cathedral',
      'lingayen-gulf',
      'bolinao-museum',
    ],

    featured: true,
    popular: true,
    rating: 4.8,
  },

  // ==========================================================
  // 05 — PATAR WHITE BEACH
  // ==========================================================

  {
    id: 'patar-white-beach',

    name: 'Patar White Beach',
    shortName: 'Patar Beach',

    location: 'Patar, Bolinao, Pangasinan',

    address:
      'Barangay Patar, Bolinao, Pangasinan, Philippines',

    barangay: 'Patar',
    municipality: 'Bolinao',
    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'Coastal and Natural Heritage',

    description:
      'Patar White Beach is one of Bolinao’s best-known coastal attractions, located along the municipality’s western shoreline. The beach is characterized by an open coastal setting, sandy shoreline, sea views, and sunsets over the western horizon. It forms part of a broader tourism cluster in Patar that includes Cape Bolinao Lighthouse and Enchanted Cave. Beyond recreation, the beach reflects the importance of Bolinao’s coastal environment to local tourism, fishing culture, hospitality businesses, and community livelihood.',

    shortDescription:
      'A popular western Pangasinan beach destination known for its shoreline, coastal scenery, and sunset views.',

    historicalSignificance:
      'Patar Beach is primarily a natural and tourism heritage destination rather than a historic monument. Its importance is connected to Bolinao’s long-standing relationship with its coastal environment and maritime economy.',

    culturalSignificance:
      'The beach is part of Bolinao’s contemporary tourism culture and contributes to the municipality’s identity as a major coastal destination in Pangasinan. Tourism around Patar supports local accommodation, food, transport, and recreation services.',

    notableFacts: [
      'Patar is a major tourism area of Bolinao.',
      'The beach is located near Cape Bolinao Lighthouse.',
      'The western-facing coastline is suitable for sunset viewing.',
    ],

    activities: [
      'Swimming',
      'Beach recreation',
      'Photography',
      'Sunset viewing',
      'Sightseeing',
      'Picnicking',
    ],

    bestFor: [
      'Families',
      'Beach trips',
      'Photography',
      'Sunset viewing',
      'Relaxation',
    ],

    visitorTips: [
      'Check sea and weather conditions before swimming.',
      'Use designated swimming areas when available.',
      'Bring sun protection and drinking water.',
      'Keep the shoreline clean.',
      'Respect local environmental rules.',
      'Be aware that beach conditions can change with tides and weather.',
    ],

    whatToExpect:
      'Visitors can expect a coastal recreational environment with beach activities, local tourism establishments, and scenic sunset views. Crowds may increase during weekends and holidays.',

    accessibility:
      'Accessible by road, with walking required from parking or accommodation areas to portions of the beach.',

    estimatedVisitDuration:
      '2–5 hours',

    difficulty: 'Easy',

    image: require('../assets/patar-white-beach.jpg'),

    tags: [
      'Featured',
      'Popular',
      'Must Visit',
      'Beach',
      'Scenic',
      'Photography',
      'Sunset',
      'Family Friendly',
      'Nature',
    ],

    bestTimeToVisit:
      'Generally preferable during favorable dry-weather periods. Sunset visits are especially popular.',

    entranceFee:
      'Local environmental or registration charges may apply. Confirm current municipal fees before visiting.',

    openingHours:
      'Beach access and individual establishments may have different operating schedules.',

    reservationRequired: false,

    status:
      'Operating tourism destination; confirm current local regulations before visiting.',

    transportation: {
      privateVehicle:
        'Travel to Bolinao town and follow local roads toward Barangay Patar.',

      publicTransportation:
        'Travel to Bolinao by bus or van, then arrange local transportation to Patar.',

      localTransportation:
        'Tricycles and local tourism transport can be used within Bolinao.',
    },

    directions: {
      fromManila:
        'Travel north to Pangasinan, continue toward Bolinao, then follow local roads toward Barangay Patar.',

      fromDagupan:
        'Travel west toward Bolinao and continue to Patar.',

      localAccess:
        'From Bolinao town proper, follow signs and local directions toward Patar Beach.',
    },

    coordinates: {
      latitude: 16.3616,
      longitude: 119.9038,
    },

    mapLabel:
      'Patar White Beach',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.3616,119.9038',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.3616%2C119.9038&navigate=yes',

    contact: {
      website:
        'https://bolinaopangasinan.gov.ph/services/tourism-3/',
    },

    relatedSiteIds: [
      'cape-bolinao-lighthouse',
      'enchanted-cave',
      'bolinao-falls',
    ],

    featured: true,
    popular: true,
    rating: 4.7,
  },

  // ==========================================================
  // 06 — ENCHANTED CAVE
  // ==========================================================

  {
    id: 'enchanted-cave',

    name: 'Enchanted Cave',

    shortName: 'Enchanted Cave',

    location: 'Bolinao, Pangasinan',

    address:
      'Patar Road, Bolinao, Pangasinan, Philippines',

    municipality: 'Bolinao',
    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'Geological and Cave Heritage',

    description:
      'Enchanted Cave is a limestone cave and natural attraction in Bolinao known for its underground freshwater pool and distinctive geological surroundings. The cave provides visitors with an opportunity to experience the limestone landscape that characterizes parts of western Pangasinan. The attraction is commonly combined with Patar Beach and Cape Bolinao Lighthouse because of their proximity within Bolinao’s western tourism corridor.',

    shortDescription:
      'A limestone cave attraction in Bolinao featuring a naturally occurring freshwater pool and distinctive geological surroundings.',

    historicalSignificance:
      'The site’s primary significance is geological and natural rather than historical. Its limestone environment forms part of the broader karst landscape associated with western Pangasinan.',

    culturalSignificance:
      'Enchanted Cave has become part of Bolinao’s contemporary tourism culture and is included in local tourism itineraries alongside the municipality’s beaches, lighthouse, waterfalls, and other natural attractions.',

    notableFacts: [
      'The attraction is located along Patar Road in Bolinao.',
      'The cave features a natural freshwater pool.',
      'It forms part of Bolinao’s western tourism corridor.',
    ],

    activities: [
      'Cave exploration',
      'Swimming',
      'Photography',
      'Nature sightseeing',
      'Geological observation',
    ],

    bestFor: [
      'Families',
      'Nature lovers',
      'Photography',
      'Adventure travelers',
      'Students',
    ],

    visitorTips: [
      'Follow site safety instructions.',
      'Wear suitable footwear around wet surfaces.',
      'Do not damage limestone formations.',
      'Avoid touching or disturbing natural features unnecessarily.',
      'Supervise children near water.',
      'Check current operating conditions before traveling.',
    ],

    whatToExpect:
      'Visitors should expect a managed natural attraction with cave and freshwater-pool areas. Wet and slippery surfaces may be present.',

    accessibility:
      'Road access is available, but visitors may encounter steps, uneven surfaces, and wet areas within the attraction.',

    estimatedVisitDuration:
      '1–3 hours',

    difficulty: 'Easy',

    image: require('../assets/enchanted-cave.jpg'),

    tags: [
      'Popular',
      'Nature',
      'Adventure',
      'Scenic',
      'Photography',
      'Cave',
      'Family Friendly',
    ],

    bestTimeToVisit:
      'During favorable weather conditions; check site operations before traveling.',

    entranceFee:
      'Fees are subject to site management and may change. Confirm current rates before visiting.',

    openingHours:
      'Current listings indicate daytime operating hours, but visitors should confirm directly before traveling.',

    reservationRequired: false,

    status:
      'Operating tourism attraction; verify current rates and access conditions.',

    transportation: {
      privateVehicle:
        'Travel to Bolinao and follow Patar Road toward the cave attraction.',

      publicTransportation:
        'Travel to Bolinao town and arrange local transportation toward Patar Road.',

      localTransportation:
        'Tricycles and local transport services can be used for access from Bolinao town.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and continue to Bolinao. From town, follow local roads toward Patar Road.',

      fromDagupan:
        'Travel west toward Bolinao and continue toward the Patar area.',

      localAccess:
        'From Bolinao town proper, follow Patar Road and local signs toward Enchanted Cave.',
    },

    coordinates: {
      latitude: 16.3587,
      longitude: 119.9064,
    },

    mapLabel:
      'Enchanted Cave, Patar Road',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.3587,119.9064',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.3587%2C119.9064&navigate=yes',

    contact: {
      phone: '0998 577 4303',
      facebook:
        'https://www.facebook.com/EnchantedCave',
    },

    relatedSiteIds: [
      'patar-white-beach',
      'cape-bolinao-lighthouse',
      'bolinao-falls',
    ],

    popular: true,
    rating: 4.5,
  },

  // ==========================================================
  // 07 — TONDOL BEACH
  // ==========================================================

  {
    id: 'tondol-beach',

    name: 'Tondol White Sand Beach',
    shortName: 'Tondol Beach',

    location: 'Anda, Pangasinan',

    address:
      'Barangay Tondol, Anda, Pangasinan, Philippines',

    barangay: 'Tondol',
    municipality: 'Anda',
    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'Coastal and Natural Heritage',

    description:
      'Tondol White Sand Beach is a major coastal attraction in Barangay Tondol, Anda, Pangasinan. The beach is known for its broad sandy shoreline and shallow coastal waters, particularly visible during low tide. Its relatively calm and family-oriented environment has made it a popular destination for swimming, beach recreation, sightseeing, and group outings. The attraction also demonstrates the importance of coastal resources to Anda’s local tourism economy and community livelihood.',

    shortDescription:
      'A popular coastal destination in Anda known for its broad sandy shoreline and shallow waters during favorable tidal conditions.',

    historicalSignificance:
      'Tondol Beach is primarily a natural and tourism heritage destination. Its significance is connected to the long-standing relationship between Anda communities and the surrounding coastal environment.',

    culturalSignificance:
      'Tourism at Tondol contributes to the local economy through beach accommodations, food services, transportation, tourism activities, and other community enterprises.',

    notableFacts: [
      'Tondol Beach is located in Barangay Tondol, Anda.',
      'The beach is known for shallow waters and a broad shoreline during low tide.',
      'The area has been developed by the local government for tourism.',
    ],

    activities: [
      'Swimming',
      'Beach recreation',
      'Photography',
      'Picnicking',
      'Sightseeing',
      'Family outings',
    ],

    bestFor: [
      'Families',
      'Swimming',
      'Beach trips',
      'Photography',
      'Relaxation',
    ],

    visitorTips: [
      'Check tide conditions before swimming.',
      'Follow current beach regulations.',
      'Bring sun protection and drinking water.',
      'Use designated swimming areas where available.',
      'Keep the shoreline clean.',
      'Follow local tourism registration or booking procedures when required.',
    ],

    whatToExpect:
      'Visitors can expect a broad coastal recreation area. Beach conditions, access rules, registration requirements, and operating arrangements may change depending on local policies and weather.',

    accessibility:
      'The beach is accessible by road, although walking may be required from parking and accommodation areas to the shoreline.',

    estimatedVisitDuration:
      '3–6 hours',

    difficulty: 'Easy',

    image: require('../assets/tondol-beach.jpg'),

    tags: [
      'Featured',
      'Popular',
      'Family Friendly',
      'Beach',
      'Scenic',
      'Photography',
      'Nature',
    ],

    bestTimeToVisit:
      'During favorable weather and tidal conditions. Low tide can expose a wider sandy area.',

    entranceFee:
      'Local fees, registration, accommodation, or beach-use charges may apply. Confirm current requirements with the Anda tourism office or site management.',

    openingHours:
      'Access may follow local tourism regulations and beach operating policies.',

    reservationRequired: false,

    status:
      'Operating tourism destination; confirm current local visitor requirements.',

    transportation: {
      privateVehicle:
        'Travel toward Anda and continue to Barangay Tondol following local road signs.',

      publicTransportation:
        'Travel to Anda using available buses or vans serving the municipality, then arrange local transport to Tondol.',

      localTransportation:
        'Tricycles and other local transportation can be used within Anda.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan, continue toward Anda, and follow local roads to Barangay Tondol.',

      fromDagupan:
        'Travel west/northwest through Pangasinan toward Anda and continue to Tondol.',

      localAccess:
        'From Anda town proper, follow local roads and signs toward Barangay Tondol and Tondol White Sand Beach.',
    },

    coordinates: {
      latitude: 16.2988,
      longitude: 120.0172,
    },

    mapLabel:
      'Tondol White Sand Beach',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.2988,120.0172',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.2988%2C120.0172&navigate=yes',

    contact: {
      website:
        'https://www.andapangasinan.gov.ph/',
    },

    relatedSiteIds: [
      'hundred-islands',
      'patar-white-beach',
      'bued-river',
    ],

    featured: true,
    popular: true,
    rating: 4.6,
  },

  // ==========================================================
  // 08 — BOLINAO MUSEUM
  // ==========================================================

  {
    id: 'bolinao-museum',

    name: 'Bolinao Museum',
    shortName: 'Bolinao Museum',

    location: 'Bolinao, Pangasinan',

    address:
      'Rizal Street area, Bolinao, Pangasinan, Philippines',

    municipality: 'Bolinao',
    province: 'Pangasinan',

    category: 'Cultural',

    heritageType:
      'Museum and Local Cultural Heritage',

    historicalPeriod:
      'Modern local heritage institution documenting older material culture',

    description:
      'Bolinao Museum is a local cultural and educational attraction associated with the documentation and presentation of Bolinao’s history, natural environment, archaeology, and material culture. Historical tourism references describe collections involving local art, geology, botany, zoology, and other materials associated with the area. The museum is important because it provides a cultural context for visitors who want to understand Bolinao beyond its beaches and natural attractions.',

    shortDescription:
      'A local cultural heritage resource intended to help visitors understand Bolinao’s history, environment, and material culture.',

    historicalSignificance:
      'The museum’s significance comes from its role in preserving and presenting information and materials connected with Bolinao’s local history and environment.',

    culturalSignificance:
      'The museum represents an effort to preserve and communicate local knowledge, artifacts, natural history, and cultural identity to residents, students, researchers, and visitors.',

    notableFacts: [
      'Historical tourism references place the museum in the Bolinao town area.',
      'Reported collections have included cultural and natural-history materials.',
      'The museum provides educational value for visitors interested in Bolinao beyond its beaches.',
    ],

    activities: [
      'Museum viewing',
      'Cultural learning',
      'Historical research',
      'Educational tours',
      'Photography where permitted',
    ],

    bestFor: [
      'Students',
      'Researchers',
      'History lovers',
      'Cultural tourists',
      'Educational tours',
    ],

    visitorTips: [
      'Confirm current operating status before traveling.',
      'Ask permission before photographing exhibits.',
      'Do not touch artifacts unless permitted.',
      'Allow additional time for educational interpretation.',
      'Follow museum rules and staff instructions.',
    ],

    whatToExpect:
      'The museum should be treated as an educational heritage resource. Current collections, access arrangements, and operating status should be confirmed before visiting.',

    accessibility:
      'Accessibility depends on the current facility and operating arrangement.',

    estimatedVisitDuration:
      '1–2 hours',

    difficulty: 'Easy',

    image: require('../assets/bolinao-museum.jpg'),

    tags: [
      'Cultural',
      'Historical',
      'Must Visit',
      'Museum',
      'Educational',
      'Heritage',
    ],

    bestTimeToVisit:
      'During confirmed museum operating days and hours.',

    entranceFee:
      'Confirm current admission arrangements directly with the local tourism office or museum management.',

    openingHours:
      'Current operating status should be verified before visiting.',

    reservationRequired: false,

    status:
      'Verify current operating status before including as an active visitor stop.',

    transportation: {
      privateVehicle:
        'Travel to Bolinao town proper and follow local directions toward the museum area.',

      publicTransportation:
        'Travel to Bolinao by bus or van, then use local transportation toward the town center.',

      localTransportation:
        'Tricycles and other local transport can be used within Bolinao town.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and continue west to Bolinao. Proceed toward the town proper.',

      fromDagupan:
        'Travel west toward Bolinao and continue to the town center.',

      localAccess:
        'Follow local directions to the Bolinao Museum area around Rizal Street.',
    },

    coordinates: {
      latitude: 16.3868,
      longitude: 119.8945,
    },

    mapLabel:
      'Bolinao Museum',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.3868,119.8945',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.3868%2C119.8945&navigate=yes',

    contact: {
      website:
        'https://bolinaopangasinan.gov.ph/services/tourism-3/',
    },

    relatedSiteIds: [
      'cape-bolinao-lighthouse',
      'patar-white-beach',
      'bolinao-falls',
    ],

    rating: 4.3,
  },

  // ==========================================================
  // 09 — ST. JOHN THE EVANGELIST CATHEDRAL
  // ==========================================================

  {
    id: 'st-john-cathedral',

    name: 'St. John the Evangelist Cathedral',
    shortName: 'St. John Cathedral',

    location: 'Dagupan City, Pangasinan',

    address:
      'Burgos Street, Dagupan City, Pangasinan, Philippines',

    barangay: 'Poblacion',
    municipality: 'Dagupan City',
    province: 'Pangasinan',

    category: 'Religious',

    heritageType:
      'Religious and Architectural Heritage',

    historicalPeriod:
      'Modern Catholic cathedral with longstanding local religious significance',

    description:
      'St. John the Evangelist Cathedral is a prominent Catholic church and community landmark in Dagupan City. Located in the city center, the cathedral serves as a place of worship, religious celebration, community gathering, and spiritual reflection. Its importance extends beyond its religious function because churches and cathedrals form part of the architectural and social history of Philippine urban communities. The cathedral remains an active place of worship and should be approached by visitors with appropriate respect for religious activities.',

    shortDescription:
      'A prominent Catholic cathedral in central Dagupan City and an important religious and community landmark.',

    historicalSignificance:
      'The cathedral forms part of the long-established Catholic institutional and community history of Dagupan City. Its continuing use reflects the role of Catholic institutions in the social and religious life of the city.',

    culturalSignificance:
      'The cathedral functions as a living religious heritage site where worship, feast-day observances, community traditions, and Catholic practices continue to take place.',

    notableFacts: [
      'The cathedral is located along Burgos Street in Dagupan City.',
      'It remains an active Catholic place of worship.',
      'It is part of Dagupan City’s religious and architectural landscape.',
    ],

    activities: [
      'Prayer',
      'Mass attendance',
      'Religious sightseeing',
      'Architecture appreciation',
      'Cultural observation',
    ],

    bestFor: [
      'Pilgrims',
      'Religious travelers',
      'Architecture enthusiasts',
      'Cultural tourists',
      'History lovers',
    ],

    visitorTips: [
      'Wear respectful clothing.',
      'Maintain silence during religious services.',
      'Ask permission before taking photographs.',
      'Do not interrupt Mass or prayer activities.',
      'Follow church schedules and visitor regulations.',
    ],

    whatToExpect:
      'Visitors should expect an active place of worship located within an urban environment. Religious services may be ongoing during visits.',

    accessibility:
      'The cathedral is located in the city center and is accessible by road. Accessibility inside may vary during crowded services.',

    estimatedVisitDuration:
      '30 minutes–1.5 hours',

    difficulty: 'Easy',

    image: require('../assets/st-john-cathedral.jpg'),

    tags: [
      'Historical',
      'Cultural',
      'Religious',
      'Architecture',
      'Heritage',
      'Pilgrimage',
    ],

    bestTimeToVisit:
      'Year-round, subject to the church’s religious schedule.',

    entranceFee:
      'No general tourism entrance fee is indicated. Visitors should respect church practices and donation arrangements.',

    openingHours:
      'Access follows church schedules and religious services. Confirm current schedules before visiting.',

    reservationRequired: false,

    status:
      'Active religious destination.',

    transportation: {
      privateVehicle:
        'Travel toward central Dagupan City and follow local roads to Burgos Street.',

      publicTransportation:
        'Dagupan City is served by buses, vans, jeepneys, and other public transportation options.',

      localTransportation:
        'Tricycles, jeepneys, and other local transportation can be used within Dagupan City.',
    },

    directions: {
      fromManila:
        'Travel north toward Dagupan City using the major road network and proceed to the city center.',

      fromDagupan:
        'From other parts of Dagupan City, proceed toward Burgos Street and the cathedral area.',

      localAccess:
        'The cathedral is located in the central urban area of Dagupan City.',
    },

    coordinates: {
      latitude: 16.0433,
      longitude: 120.3332,
    },

    mapLabel:
      'St. John the Evangelist Cathedral',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.0433,120.3332',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.0433%2C120.3332&navigate=yes',

    relatedSiteIds: [
      'manaoag-basilica',
      'lingayen-gulf',
      'bolinao-museum',
    ],

    rating: 4.4,
  },

  // ==========================================================
  // 10 — LINGAYEN GULF WAR MEMORIAL
  // ==========================================================

  {
    id: 'lingayen-gulf',

    name: 'Lingayen Gulf War Memorial',
    shortName: 'Lingayen Gulf Memorial',

    location: 'Lingayen, Pangasinan',

    address:
      'Provincial Capitol Complex, Lingayen, Pangasinan, Philippines',

    municipality: 'Lingayen',
    province: 'Pangasinan',

    category: 'Historical',

    heritageType:
      'World War II and Historical Heritage',

    historicalPeriod:
      'World War II',

    description:
      'The Lingayen Gulf War Memorial commemorates the wartime history associated with Lingayen Gulf and the major Allied landing that took place in Pangasinan during World War II. Lingayen was strategically important because of its coastal position, and the gulf became the site of General Douglas MacArthur’s major return and liberation landing in January 1945. The memorial and surrounding historical landscape provide visitors with an opportunity to reflect on the scale of the war in Pangasinan and the experiences of communities affected by the conflict.',

    shortDescription:
      'A historical memorial connected with the World War II liberation campaign and the Allied landing at Lingayen Gulf.',

    historicalSignificance:
      'Lingayen Gulf was the site of a major Allied landing during World War II. The Provincial Government of Pangasinan identifies Lingayen as a major historical location associated with the Japanese invasion, guerrilla resistance, and General Douglas MacArthur’s liberation landing.',

    culturalSignificance:
      'The memorial contributes to the preservation of wartime memory in Pangasinan. It provides an educational point for understanding the province’s experience during World War II and the broader Philippine liberation campaign.',

    notableFacts: [
      'Lingayen is the provincial capital of Pangasinan.',
      'Lingayen Gulf was a major World War II landing area.',
      'The town has several other historical landmarks connected with Pangasinan’s political and wartime history.',
    ],

    activities: [
      'Historical sightseeing',
      'Educational tours',
      'Photography',
      'World War II research',
      'Memorial visits',
    ],

    bestFor: [
      'History students',
      'Researchers',
      'Educational tours',
      'World War II enthusiasts',
      'Photography',
    ],

    visitorTips: [
      'Read memorial information carefully.',
      'Maintain respectful behavior around memorial areas.',
      'Avoid disturbing artifacts or displays.',
      'Use the visit as an opportunity to learn about local wartime history.',
      'Combine the memorial with other historical sites in Lingayen.',
    ],

    whatToExpect:
      'Visitors should expect a historical and educational experience rather than an entertainment attraction. The surrounding Capitol Complex also contains important provincial government and heritage landmarks.',

    accessibility:
      'The memorial area is located within the established Lingayen provincial government complex and is generally accessible by road.',

    estimatedVisitDuration:
      '1–2 hours',

    difficulty: 'Easy',

    image: require('../assets/lingayen-gulf-memorial.jpg'),

    tags: [
      'Featured',
      'Historical',
      'Must Visit',
      'Cultural',
      'Photography',
      'World War II',
      'Educational',
      'Heritage',
    ],

    bestTimeToVisit:
      'Year-round during suitable weather and visitor-access hours.',

    entranceFee:
      'No specific fee is listed here. Confirm current access arrangements with the provincial government or site administrator.',

    openingHours:
      'Access may depend on the operating schedule of the surrounding government complex and memorial area.',

    reservationRequired: false,

    status:
      'Historical memorial and educational destination.',

    transportation: {
      privateVehicle:
        'Travel to Lingayen town and proceed toward the Provincial Capitol Complex.',

      publicTransportation:
        'Buses, vans, and local public transportation serve Lingayen.',

      localTransportation:
        'Tricycles and other local transport services can be used within Lingayen.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and continue to Lingayen, the provincial capital.',

      fromDagupan:
        'Travel west toward Lingayen and continue toward the Provincial Capitol Complex.',

      localAccess:
        'Proceed to the Provincial Capitol Complex in Lingayen where the memorial and other provincial heritage landmarks are located.',
    },

    coordinates: {
      latitude: 16.0214,
      longitude: 120.2314,
    },

    mapLabel:
      'Lingayen Provincial Capitol / War Memorial Area',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=16.0214,120.2314',

    wazeUrl:
      'https://www.waze.com/ul?ll=16.0214%2C120.2314&navigate=yes',

    contact: {
      website:
        'https://www.pangasinan.gov.ph/city-municipalities/lingayen/',
    },

    relatedSiteIds: [
      'st-john-cathedral',
      'manaoag-basilica',
      'bolinao-museum',
    ],

    featured: true,
    rating: 4.5,
  },

  // ==========================================================
  // 11 — BUED RIVER
  // ==========================================================

  {
    id: 'bued-river',

    name: 'Bued River',
    shortName: 'Bued River',

    location: 'Pangasinan River Corridor',

    address:
      'Bued River corridor, Pangasinan, Philippines',

    municipality: 'Multiple municipalities',

    province: 'Pangasinan',

    category: 'Natural',

    heritageType:
      'River and Living Landscape Heritage',

    description:
      'The Bued River is a significant river system that forms part of the natural landscape of Pangasinan and extends across several communities before joining the Cayanga River system. Rather than functioning as a single enclosed tourist attraction, the river represents a broader living landscape connected with settlements, agriculture, drainage, ecosystems, and community life. Including the Bued River in a heritage guide allows visitors and students to understand the relationship between Pangasinan communities and the province’s river systems.',

    shortDescription:
      'A major river system and living landscape illustrating the relationship between Pangasinan communities, agriculture, and natural resources.',

    historicalSignificance:
      'The Bued River is significant as part of the historical environmental landscape through which communities, agricultural areas, and settlements developed. Its river corridor demonstrates the continuing relationship between human communities and natural waterways.',

    culturalSignificance:
      'Rivers such as the Bued are part of the everyday environmental and economic landscape of Pangasinan. The river system intersects communities and agricultural areas and contributes to the province’s broader natural heritage.',

    notableFacts: [
      'The Bued River originates in the Cordillera area and flows toward Pangasinan.',
      'The river system passes through multiple communities.',
      'It eventually contributes to the Cayanga River system.',
      'It is better understood as a river corridor than as a single enclosed tourism attraction.',
    ],

    activities: [
      'Nature observation',
      'Photography',
      'Educational tours',
      'Environmental study',
      'Landscape sightseeing',
    ],

    bestFor: [
      'Nature lovers',
      'Students',
      'Researchers',
      'Photography',
      'Environmental education',
    ],

    visitorTips: [
      'Use designated public access areas.',
      'Do not enter unsafe river sections.',
      'Avoid visiting during flooding or severe weather.',
      'Respect private property along the river corridor.',
      'Do not dispose of waste into the river.',
      'Treat the river as a living environmental resource rather than a conventional recreation site.',
    ],

    whatToExpect:
      'The Bued River should be experienced as a natural and cultural landscape. Visitor facilities vary by location, and there is no single standardized tourist entrance or visitor center for the entire river system.',

    accessibility:
      'Accessibility varies significantly depending on the specific river section visited.',

    estimatedVisitDuration:
      '1–3 hours depending on access point',

    difficulty: 'Easy',

    image: require('../assets/bued-river.jpg'),

    tags: [
      'Cultural',
      'Nature',
      'Scenic',
      'Photography',
      'Educational',
      'Heritage',
    ],

    bestTimeToVisit:
      'During favorable weather and when river conditions are safe.',

    entranceFee:
      'No standard province-wide entrance fee applies to the river as a whole.',

    openingHours:
      'The river is a natural landscape without a single standardized operating schedule.',

    reservationRequired: false,

    status:
      'Natural river system; visitor access depends on the specific location.',

    transportation: {
      privateVehicle:
        'Access depends on the specific river section and municipality. Use established roads and public access points.',

      publicTransportation:
        'Public transportation varies by municipality along the river corridor.',

      localTransportation:
        'Local tricycles and other transportation may provide access to specific communities and river viewpoints.',
    },

    directions: {
      fromManila:
        'Travel north toward Pangasinan and select an established public access point within the relevant municipality.',

      fromDagupan:
        'Travel toward the specific Pangasinan municipality where the chosen Bued River viewpoint or access area is located.',

      localAccess:
        'Because the Bued River extends across multiple communities, visitors should select a specific recognized access point before traveling.',
    },

    coordinates: {
      latitude: 15.9298,
      longitude: 120.3487,
    },

    mapLabel:
      'Bued River — Pangasinan River Corridor',

    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=15.9298,120.3487',

    wazeUrl:
      'https://www.waze.com/ul?ll=15.9298%2C120.3487&navigate=yes',

    relatedSiteIds: [
      'tondol-beach',
      'hundred-islands',
      'lingayen-gulf',
    ],

    rating: 4.2,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Find one heritage site using its unique ID.
 */
export const getHeritageSiteById = (
  id: string
): HeritageSite | undefined => {
  return heritageSites.find(
    (site) => site.id === id
  );
};

/**
 * Get all heritage sites.
 */
export const getAllHeritageSites = (): HeritageSite[] => {
  return [...heritageSites];
};

/**
 * Get sites belonging to a category.
 */
export const getHeritageSitesByCategory = (
  category: HeritageCategory
): HeritageSite[] => {
  return heritageSites.filter(
    (site) => site.category === category
  );
};

/**
 * Get sites belonging to a municipality.
 */
export const getHeritageSitesByMunicipality = (
  municipality: string
): HeritageSite[] => {
  const term = municipality.trim().toLowerCase();

  if (!term) {
    return [...heritageSites];
  }

  return heritageSites.filter(
    (site) =>
      site.municipality
        ?.toLowerCase()
        .includes(term) ||
      site.location
        .toLowerCase()
        .includes(term)
  );
};

/**
 * Get featured heritage sites.
 */
export const getFeaturedHeritageSites = (): HeritageSite[] => {
  return heritageSites.filter(
    (site) => site.featured === true
  );
};

/**
 * Get popular heritage sites.
 */
export const getPopularHeritageSites = (): HeritageSite[] => {
  return heritageSites.filter(
    (site) => site.popular === true
  );
};

/**
 * Get sites by difficulty.
 */
export const getHeritageSitesByDifficulty = (
  difficulty: HeritageDifficulty
): HeritageSite[] => {
  return heritageSites.filter(
    (site) => site.difficulty === difficulty
  );
};

/**
 * Get sites by tag.
 */
export const getHeritageSitesByTag = (
  tag: HeritageTag
): HeritageSite[] => {
  return heritageSites.filter(
    (site) => site.tags?.includes(tag)
  );
};

/**
 * Get sites by activity.
 */
export const getHeritageSitesByActivity = (
  activity: string
): HeritageSite[] => {
  const term = activity.trim().toLowerCase();

  if (!term) {
    return [...heritageSites];
  }

  return heritageSites.filter((site) =>
    site.activities?.some((item) =>
      item.toLowerCase().includes(term)
    )
  );
};

/**
 * Search heritage sites.
 */
export const searchHeritageSites = (
  query: string
): HeritageSite[] => {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    return [...heritageSites];
  }

  return heritageSites.filter((site) => {
    const searchableText = [
      site.name,
      site.shortName,
      site.location,
      site.address,
      site.barangay,
      site.municipality,
      site.province,
      site.category,
      site.heritageType,
      site.historicalPeriod,
      site.description,
      site.shortDescription,
      site.historicalSignificance,
      site.culturalSignificance,
      site.whatToExpect,
      ...(site.notableFacts ?? []),
      ...(site.activities ?? []),
      ...(site.bestFor ?? []),
      ...(site.visitorTips ?? []),
      ...(site.tags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });
};

/**
 * Search and filter heritage sites together.
 */
export const filterHeritageSites = ({
  query = '',
  category,
  tag,
  featured,
  popular,
}: {
  query?: string;
  category?: HeritageCategory;
  tag?: HeritageTag;
  featured?: boolean;
  popular?: boolean;
}): HeritageSite[] => {
  const searchTerm = query.trim().toLowerCase();

  return heritageSites.filter((site) => {
    const searchableText = [
      site.name,
      site.shortName,
      site.location,
      site.address,
      site.barangay,
      site.municipality,
      site.province,
      site.category,
      site.heritageType,
      site.historicalPeriod,
      site.description,
      site.shortDescription,
      site.historicalSignificance,
      site.culturalSignificance,
      ...(site.notableFacts ?? []),
      ...(site.activities ?? []),
      ...(site.bestFor ?? []),
      ...(site.visitorTips ?? []),
      ...(site.tags ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesQuery =
      !searchTerm ||
      searchableText.includes(searchTerm);

    const matchesCategory =
      !category ||
      site.category === category;

    const matchesTag =
      !tag ||
      site.tags?.includes(tag);

    const matchesFeatured =
      featured === undefined ||
      site.featured === featured;

    const matchesPopular =
      popular === undefined ||
      site.popular === popular;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesTag &&
      matchesFeatured &&
      matchesPopular
    );
  });
};

/**
 * Sort sites alphabetically.
 */
export const sortHeritageSitesByName = (
  sites: HeritageSite[] = heritageSites
): HeritageSite[] => {
  return [...sites].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

/**
 * Sort sites by rating.
 */
export const sortHeritageSitesByRating = (
  sites: HeritageSite[] = heritageSites
): HeritageSite[] => {
  return [...sites].sort(
    (a, b) =>
      (b.rating ?? 0) -
      (a.rating ?? 0)
  );
};

/**
 * Sort sites by discovery priority.
 */
export const sortHeritageSitesByDiscovery = (
  sites: HeritageSite[] = heritageSites
): HeritageSite[] => {
  return [...sites].sort((a, b) => {
    const aScore =
      (a.featured ? 3 : 0) +
      (a.popular ? 2 : 0) +
      (a.rating ?? 0);

    const bScore =
      (b.featured ? 3 : 0) +
      (b.popular ? 2 : 0) +
      (b.rating ?? 0);

    return bScore - aScore;
  });
};

// ============================================================
// DISTANCE CALCULATIONS
// ============================================================

/**
 * Calculate approximate distance between two coordinates
 * using the Haversine formula.
 *
 * Result is returned in kilometers.
 */
export const calculateDistanceKm = (
  userLatitude: number,
  userLongitude: number,
  siteLatitude: number,
  siteLongitude: number
): number => {
  const earthRadiusKm = 6371;

  const degreesToRadians = (
    degrees: number
  ): number => {
    return (degrees * Math.PI) / 180;
  };

  const latitudeDifference =
    degreesToRadians(
      siteLatitude - userLatitude
    );

  const longitudeDifference =
    degreesToRadians(
      siteLongitude - userLongitude
    );

  const latitude1 =
    degreesToRadians(userLatitude);

  const latitude2 =
    degreesToRadians(siteLatitude);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
};

/**
 * Sort heritage sites by distance from
 * the user's current coordinates.
 */
export const sortHeritageSitesByDistance = (
  userLatitude: number,
  userLongitude: number,
  sites: HeritageSite[] = heritageSites
): HeritageSite[] => {
  return [...sites].sort((a, b) => {
    if (!a.coordinates) return 1;
    if (!b.coordinates) return -1;

    const distanceA = calculateDistanceKm(
      userLatitude,
      userLongitude,
      a.coordinates.latitude,
      a.coordinates.longitude
    );

    const distanceB = calculateDistanceKm(
      userLatitude,
      userLongitude,
      b.coordinates.latitude,
      b.coordinates.longitude
    );

    return distanceA - distanceB;
  });
};

// ============================================================
// RELATED SITES
// ============================================================

/**
 * Get related heritage sites.
 */
export const getRelatedHeritageSites = (
  site: HeritageSite
): HeritageSite[] => {
  if (!site.relatedSiteIds?.length) {
    return [];
  }

  return site.relatedSiteIds
    .map((id) =>
      getHeritageSiteById(id)
    )
    .filter(
      (
        relatedSite
      ): relatedSite is HeritageSite =>
        relatedSite !== undefined
    );
};

// ============================================================
// IMAGE HELPERS
// ============================================================

/**
 * Get the best available image source.
 *
 * Local Expo images are preferred.
 */
export const getHeritageImage = (
  site: HeritageSite
): ImageSourcePropType => {
  return site.image;
};

// ============================================================
// CATEGORY HELPERS
// ============================================================

/**
 * Get category information.
 */
export const getCategoryInfo = (
  category: HeritageCategory
): CategoryInfo => {
  return CATEGORY_INFO[category];
};

/**
 * Get category count.
 */
export const getCategoryCount = (
  category: HeritageCategory
): number => {
  return heritageSites.filter(
    (site) =>
      site.category === category
  ).length;
};

// ============================================================
// STATISTICS
// ============================================================

/**
 * Get total number of heritage sites.
 */
export const getHeritageSiteCount = (): number => {
  return heritageSites.length;
};

/**
 * Get number of featured sites.
 */
export const getFeaturedSiteCount = (): number => {
  return heritageSites.filter(
    (site) => site.featured === true
  ).length;
};

/**
 * Get number of popular sites.
 */
export const getPopularSiteCount = (): number => {
  return heritageSites.filter(
    (site) => site.popular === true
  ).length;
};

// ============================================================
// DATA VALIDATION
// ============================================================

/**
 * Validate a single heritage site.
 *
 * Returns an array of validation errors.
 * An empty array means no validation problems were found.
 */
export const validateHeritageSite = (
  site: HeritageSite
): string[] => {
  const errors: string[] = [];

  if (!site.id?.trim()) {
    errors.push('Missing site ID.');
  }

  if (!site.name?.trim()) {
    errors.push('Missing site name.');
  }

  if (!site.location?.trim()) {
    errors.push('Missing location.');
  }

  if (!site.category) {
    errors.push('Missing heritage category.');
  }

  if (!site.description?.trim()) {
    errors.push('Missing description.');
  }

  if (!site.image) {
    errors.push('Missing image.');
  }

  if (site.coordinates) {
    const {
      latitude,
      longitude,
    } = site.coordinates;

    if (
      latitude < -90 ||
      latitude > 90
    ) {
      errors.push(
        'Latitude must be between -90 and 90.'
      );
    }

    if (
      longitude < -180 ||
      longitude > 180
    ) {
      errors.push(
        'Longitude must be between -180 and 180.'
      );
    }
  }

  if (
    site.rating !== undefined &&
    (site.rating < 0 ||
      site.rating > 5)
  ) {
    errors.push(
      'Rating must be between 0 and 5.'
    );
  }

  return errors;
};

/**
 * Validate the complete heritage dataset.
 */
export const validateHeritageDataset = (): Record<
  string,
  string[]
> => {
  const results: Record<
    string,
    string[]
  > = {};

  const ids = new Set<string>();

  heritageSites.forEach((site) => {
    const errors =
      validateHeritageSite(site);

    if (ids.has(site.id)) {
      errors.push(
        'Duplicate site ID.'
      );
    }

    ids.add(site.id);

    if (site.relatedSiteIds) {
      site.relatedSiteIds.forEach(
        (relatedId) => {
          if (
            !heritageSites.some(
              (relatedSite) =>
                relatedSite.id ===
                relatedId
            )
          ) {
            errors.push(
              `Related site ID does not exist: ${relatedId}`
            );
          }
        }
      );
    }

    if (errors.length > 0) {
      results[site.id] = errors;
    }
  });

  return results;
};

// ============================================================
// EXPORT
// ============================================================

export { heritageSites };

export default heritageSites;