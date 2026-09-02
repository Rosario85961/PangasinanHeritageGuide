import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// ============================================================
// PANGASINAN HERITAGE GUIDE
// Favorites Context
// Persistent Favorite Heritage Sites
// ============================================================

const STORAGE_KEY = '@pangasinan_heritage_favorites';

// ============================================================
// TYPES
// ============================================================

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
  hydrated: boolean;
}

// ============================================================
// CONTEXT
// ============================================================

const FavoritesContext =
  createContext<FavoritesContextValue | undefined>(undefined);

// ============================================================
// PROVIDER
// ============================================================

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ==========================================================
  // LOAD FAVORITES
  // ==========================================================

  useEffect(() => {
    let active = true;

    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (!active) return;

        if (!stored) {
          setFavorites([]);
          return;
        }

        try {
          const parsed: unknown = JSON.parse(stored);

          if (
            Array.isArray(parsed) &&
            parsed.every(
              (item): item is string => typeof item === 'string'
            )
          ) {
            // Remove duplicates while loading old/corrupted data.
            setFavorites([...new Set(parsed)]);
          } else {
            setFavorites([]);
          }
        } catch {
          // Invalid JSON should never break the application.
          setFavorites([]);
        }
      } catch {
        if (active) {
          setFavorites([]);
        }
      } finally {
        if (active) {
          setHydrated(true);
        }
      }
    };

    loadFavorites();

    return () => {
      active = false;
    };
  }, []);

  // ==========================================================
  // CHECK FAVORITE
  // ==========================================================

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  // ==========================================================
  // TOGGLE FAVORITE
  // ==========================================================

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!id) return;

      const previousFavorites = favorites;

      const alreadyFavorite = previousFavorites.includes(id);

      const nextFavorites = alreadyFavorite
        ? previousFavorites.filter((item) => item !== id)
        : [...previousFavorites, id];

      // Optimistic UI update.
      setFavorites(nextFavorites);

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(nextFavorites)
        );
      } catch (error) {
        // Restore previous state if persistence fails.
        setFavorites(previousFavorites);

        console.warn(
          '[Favorites] Failed to save favorites:',
          error
        );

        throw error;
      }
    },
    [favorites]
  );

  // ==========================================================
  // CONTEXT VALUE
  // ==========================================================

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      hydrated,
    }),
    [
      favorites,
      isFavorite,
      toggleFavorite,
      hydrated,
    ]
  );

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used within FavoritesProvider'
    );
  }

  return context;
}

