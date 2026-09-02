import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesProvider, useFavorites } from '../context/FavoritesContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('FavoritesContext', () => {
  beforeEach(() => jest.clearAllMocks());

  it('hydrates saved favorites', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(['hundred-islands']));
    const { result } = renderHook(() => useFavorites(), { wrapper: ({ children }) => <FavoritesProvider>{children}</FavoritesProvider> });
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.isFavorite('hundred-islands')).toBe(true);
  });

  it('adds and persists a favorite', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    const { result } = renderHook(() => useFavorites(), { wrapper: ({ children }) => <FavoritesProvider>{children}</FavoritesProvider> });
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    await act(async () => { await result.current.toggleFavorite('patar-white-beach'); });
    expect(result.current.isFavorite('patar-white-beach')).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@pangasinan_heritage_favorites', JSON.stringify(['patar-white-beach']));
  });

  it('removes a favorite and persists the new list', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(['patar-white-beach']));
    const { result } = renderHook(() => useFavorites(), { wrapper: ({ children }) => <FavoritesProvider>{children}</FavoritesProvider> });
    await waitFor(() => expect(result.current.hydrated).toBe(true));
    await act(async () => { await result.current.toggleFavorite('patar-white-beach'); });
    expect(result.current.isFavorite('patar-white-beach')).toBe(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@pangasinan_heritage_favorites', '[]');
  });
});