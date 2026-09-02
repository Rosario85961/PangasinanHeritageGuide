
import 'react-native-gesture-handler';

import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { FavoritesProvider } from '../context/FavoritesContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <StatusBar
          style="light"
          backgroundColor={COLORS.primaryDark}
          translucent={Platform.OS === 'android'}
        />

        <Stack
          screenOptions={{
            // ==================================================
            // GLOBAL HEADER
            // ==================================================
            headerShown: false,

            // ==================================================
            // GLOBAL BACKGROUND
            // ==================================================
            contentStyle: {
              backgroundColor: COLORS.background,
            },

            // ==================================================
            // SCREEN TRANSITIONS
            // ==================================================
            animation: 'slide_from_right',
            animationDuration: 280,

            // ==================================================
            // GESTURES
            // ==================================================
            gestureEnabled: true,
            gestureDirection: 'horizontal',

            // ==================================================
            // CARD / MODAL PRESENTATION
            // ==================================================
            presentation: 'card',

            // ==================================================
            // WEB / DESKTOP FRIENDLY
            // ==================================================
            freezeOnBlur: false,
          }}
        >
          {/* ==================================================
              MAIN ROUTES

              Expo Router automatically discovers all files
              inside the app/ directory.

              Example:
              app/index.tsx
              app/home.tsx
              app/heritage/[id].tsx
              ================================================== */}
        </Stack>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}

