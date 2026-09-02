import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import SiteCard from '../../components/SiteCard';
import EmptyState from '../../components/EmptyState';
import heritageSites from '../../data/heritageSites';
import { useFavorites } from '../../context/FavoritesContext';
import { COLORS, SPACING } from '../../constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const sites = useMemo(() => heritageSites.filter((site) => favorites.includes(site.id)), [favorites]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <FlatList
        data={sites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<Header eyebrow="Saved places" title="Favorites" subtitle="Your personal collection of Pangasinan heritage destinations." />}
        renderItem={({ item, index }) => <SiteCard site={item} index={index} favorite={isFavorite(item.id)} onFavorite={() => { void toggleFavorite(item.id); }} onPress={() => router.push({ pathname: '/site/[id]', params: { id: item.id } })} />}
        ListEmptyComponent={<EmptyState icon="heart-outline" title="No favorites yet" message="Save places you want to remember by tapping the heart on a heritage card." actionLabel="Explore heritage" onAction={() => router.replace('/')} />}
        ListFooterComponent={sites.length > 0 ? <Text style={styles.footer}>{sites.length} saved {sites.length === 1 ? 'place' : 'places'}</Text> : null}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  footer: { textAlign: 'center', color: COLORS.textMuted, fontSize: 12, marginTop: SPACING.sm },
});