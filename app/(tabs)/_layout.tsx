import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const icons: Record<string, IconName> = {
  index: 'home-outline',
  search: 'search-outline',
  favorites: 'heart-outline',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginBottom: 2 },
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? ({ index: 'home', search: 'search', favorites: 'heart' }[route.name] as IconName) : icons[route.name]}
            size={23}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
    </Tabs>
  );
}