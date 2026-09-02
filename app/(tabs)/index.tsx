import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryChip from '../../components/CategoryChip';
import SiteCard from '../../components/SiteCard';
import Skeleton from '../../components/Skeleton';
import { CATEGORIES } from '../../data/heritageSites';
import heritageSites from '../../data/heritageSites';
import { useFavorites } from '../../context/FavoritesContext';
import { COLORS, SPACING } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [refreshing, setRefreshing] = useState(false);
  const sites = useMemo(() => category === 'All' ? heritageSites : heritageSites.filter((s) => s.category === category), [category]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 650);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <FlatList
        data={hydrated ? sites : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={COLORS.primary} />}
        ListHeaderComponent={
          <View>
            <Header eyebrow="Explore • Learn • Remember" title="Pangasinan Heritage Guide" subtitle="Discover places, stories, and living heritage across the province." />
            <SearchBar value="" onChangeText={() => router.push('/search')} placeholder="Search heritage sites…" />
            <Text style={styles.section}>Explore by category</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <CategoryChip label={item} selected={category === item} onPress={() => setCategory(item)} />}
              contentContainerStyle={styles.chips}
            />
            <Text style={styles.section}>Featured heritage</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <SiteCard
            site={item}
            index={index}
            favorite={isFavorite(item.id)}
            onFavorite={() => { void toggleFavorite(item.id); }}
            onPress={() => router.push({ pathname: '/site/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={!hydrated ? <View>{[1,2,3].map((i) => <Skeleton key={i} />)}</View> : <Text style={styles.empty}>No sites in this category.</Text>}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  section: { color: COLORS.text, fontSize: 16, fontWeight: '900', marginTop: SPACING.xl, marginBottom: SPACING.md },
  chips: { paddingBottom: 2 },
  empty: { textAlign: 'center', color: COLORS.textMuted, padding: SPACING.xxl },
});