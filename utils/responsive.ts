import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

// ============================================================
// RESPONSIVE BREAKPOINTS
// ============================================================

export const BREAKPOINTS = {
  phone: 0,
  largePhone: 480,
  tablet: 600,
  largeTablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const;


// ============================================================
// RESPONSIVE DEVICE TYPE
// ============================================================

export type DeviceType =
  | 'phone'
  | 'largePhone'
  | 'tablet'
  | 'largeTablet'
  | 'desktop'
  | 'largeDesktop';


// ============================================================
// GET DEVICE TYPE
// ============================================================

export function getDeviceType(width: number): DeviceType {
  if (width >= BREAKPOINTS.largeDesktop) {
    return 'largeDesktop';
  }

  if (width >= BREAKPOINTS.desktop) {
    return 'desktop';
  }

  if (width >= BREAKPOINTS.largeTablet) {
    return 'largeTablet';
  }

  if (width >= BREAKPOINTS.tablet) {
    return 'tablet';
  }

  if (width >= BREAKPOINTS.largePhone) {
    return 'largePhone';
  }

  return 'phone';
}


// ============================================================
// RESPONSIVE COLUMNS
// ============================================================

export function useResponsiveColumns(
  minCardWidth = 280,
  maxColumns = 4
) {
  const { width } = useWindowDimensions();

  const columns = useMemo(() => {
    // Very small phones
    if (width < 420) {
      return 1;
    }

    // Calculate based on minimum comfortable card width
    const calculatedColumns = Math.floor(width / minCardWidth);

    // Keep columns within sensible limits
    return Math.max(
      1,
      Math.min(calculatedColumns, maxColumns)
    );
  }, [width, minCardWidth, maxColumns]);

  return columns;
}


// ============================================================
// DEVICE TYPE
// ============================================================

export function useDeviceType(): DeviceType {
  const { width } = useWindowDimensions();

  return useMemo(
    () => getDeviceType(width),
    [width]
  );
}


// ============================================================
// TABLET DETECTION
// ============================================================

export function useIsTablet(): boolean {
  const { width } = useWindowDimensions();

  return width >= BREAKPOINTS.tablet;
}


// ============================================================
// PHONE DETECTION
// ============================================================

export function useIsPhone(): boolean {
  const { width } = useWindowDimensions();

  return width < BREAKPOINTS.tablet;
}


// ============================================================
// DESKTOP DETECTION
// ============================================================

export function useIsDesktop(): boolean {
  const { width } = useWindowDimensions();

  return width >= BREAKPOINTS.desktop;
}


// ============================================================
// LARGE SCREEN DETECTION
// ============================================================

export function useIsLargeScreen(): boolean {
  const { width } = useWindowDimensions();

  return width >= BREAKPOINTS.largeTablet;
}


// ============================================================
// ORIENTATION
// ============================================================

export function useOrientation() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

  return {
    isLandscape,
    isPortrait: !isLandscape,
  };
}


// ============================================================
// RESPONSIVE SPACING
// ============================================================

export function useResponsiveSpacing() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    if (width >= BREAKPOINTS.desktop) {
      return {
        horizontal: 40,
        vertical: 32,
        gap: 24,
        section: 48,
      };
    }

    if (width >= BREAKPOINTS.tablet) {
      return {
        horizontal: 28,
        vertical: 24,
        gap: 20,
        section: 40,
      };
    }

    if (width >= BREAKPOINTS.largePhone) {
      return {
        horizontal: 20,
        vertical: 20,
        gap: 16,
        section: 32,
      };
    }

    return {
      horizontal: 16,
      vertical: 16,
      gap: 12,
      section: 28,
    };
  }, [width]);
}


// ============================================================
// RESPONSIVE CARD WIDTH
// ============================================================

export function useResponsiveCardWidth(
  horizontalPadding = 16,
  gap = 16,
  maxCardWidth = 420
) {
  const { width } = useWindowDimensions();

  const columns = useResponsiveColumns(
    maxCardWidth,
    4
  );

  const availableWidth =
    width - horizontalPadding * 2;

  const cardWidth =
    (availableWidth - gap * (columns - 1)) /
    columns;

  return Math.min(cardWidth, maxCardWidth);
}


// ============================================================
// RESPONSIVE CONTENT WIDTH
// ============================================================

export function useResponsiveContentWidth(
  maxWidth = 1200
) {
  const { width } = useWindowDimensions();

  return Math.min(
    width - 32,
    maxWidth
  );
}


// ============================================================
// RESPONSIVE FONT SCALE
// ============================================================

export function useResponsiveFontScale() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    if (width >= BREAKPOINTS.largeDesktop) {
      return 1.15;
    }

    if (width >= BREAKPOINTS.desktop) {
      return 1.08;
    }

    if (width >= BREAKPOINTS.tablet) {
      return 1.03;
    }

    return 1;
  }, [width]);
}


// ============================================================
// COMPLETE RESPONSIVE CONFIG
// ============================================================

export function useResponsive() {
  const { width, height, scale, fontScale } =
    useWindowDimensions();

  const deviceType = getDeviceType(width);

  const isLandscape = width > height;

  const columns =
    width < 420
      ? 1
      : Math.min(
          4,
          Math.max(1, Math.floor(width / 280))
        );

  const spacing =
    width >= BREAKPOINTS.desktop
      ? 40
      : width >= BREAKPOINTS.tablet
      ? 28
      : width >= BREAKPOINTS.largePhone
      ? 20
      : 16;

  const contentWidth = Math.min(
    width - spacing * 2,
    1200
  );

  return {
    width,
    height,

    scale,
    fontScale,

    deviceType,

    isPhone:
      width < BREAKPOINTS.tablet,

    isTablet:
      width >= BREAKPOINTS.tablet,

    isDesktop:
      width >= BREAKPOINTS.desktop,

    isLargeScreen:
      width >= BREAKPOINTS.largeTablet,

    isLandscape,

    isPortrait:
      !isLandscape,

    columns,

    spacing,

    contentWidth,

    gap:
      width >= BREAKPOINTS.desktop
        ? 24
        : width >= BREAKPOINTS.tablet
        ? 20
        : 16,
  };
}