import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryChip from '../../components/CategoryChip';
import SiteCard from '../../components/SiteCard';
import EmptyState from '../../components/EmptyState';
import heritageSites, { CATEGORIES, HeritageCategory } from '../../data/heritageSites';
import { useFavorites } from '../../context/FavoritesContext';
import { COLORS, SPACING } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | HeritageCategory>('All');
  const [debounced, setDebounced] = useState('');
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim().toLowerCase()), 180);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => heritageSites.filter((site) => {
    const matchesQuery = !debounced || site.name.toLowerCase().includes(debounced) || site.category.toLowerCase().includes(debounced) || site.location.toLowerCase().includes(debounced);
    const matchesCategory = category === 'All' || site.category === category;
    return matchesQuery && matchesCategory;
  }), [debounced, category]);

  const submit = () => {
    const clean = query.trim();
    if (clean) setRecent((items) => [clean, ...items.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Header eyebrow="Find a place" title="Search" subtitle="Search by site name, location, or category." />
            <SearchBar value={query} onChangeText={setQuery} onSubmit={submit} />
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={CATEGORIES} keyExtractor={(item) => item} contentContainerStyle={styles.chips} renderItem={({ item }) => <CategoryChip label={item} selected={category === item} onPress={() => setCategory(item)} />} />
            {recent.length > 0 && !query && <View><Text style={styles.recentTitle}>Recent searches</Text><View style={styles.recentWrap}>{recent.map((item) => <CategoryChip key={item} label={item as 'All'} selected={false} onPress={() => setQuery(item)} />)}</View></View>}
          </View>
        }
        renderItem={({ item, index }) => <SiteCard site={item} index={index} favorite={isFavorite(item.id)} onFavorite={() => { void toggleFavorite(item.id); }} onPress={() => router.push({ pathname: '/site/[id]', params: { id: item.id } })} />}
        ListEmptyComponent={<EmptyState icon="search-outline" title="No results found" message="Try a different site name, location, or category." />}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  chips: { paddingVertical: SPACING.lg },
  recentTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.sm },
  recentWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: SPACING.md },
});