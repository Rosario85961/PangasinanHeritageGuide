import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search heritage sites…',
  onSubmit,
}: Props) {
  const [focused, setFocused] = useState(false);

  const clearSearch = () => {
    onChangeText('');
  };

  return (
    <View
      style={[
        styles.container,
        focused && styles.containerFocused,
      ]}
    >
      {/* =====================================================
          SEARCH ICON
      ====================================================== */}
      <View
        style={[
          styles.searchIconContainer,
          focused && styles.searchIconFocused,
        ]}
      >
        <Ionicons
          name="search"
          size={19}
          color={focused ? COLORS.primary : COLORS.textMuted}
        />
      </View>

      {/* =====================================================
          INPUT
      ====================================================== */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        selectionColor={COLORS.primary}
        style={styles.input}
        accessibilityLabel="Search heritage sites"
        accessibilityHint="Enter a heritage site, location, or category"
      />

      {/* =====================================================
          CLEAR BUTTON
      ====================================================== */}
      {value.length > 0 && (
        <Pressable
          onPress={clearSearch}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
        >
          <Ionicons
            name="close"
            size={15}
            color={COLORS.textMuted}
          />
        </Pressable>
      )}

      {/* =====================================================
          SEARCH STATUS
      ====================================================== */}
      {focused && value.length === 0 && (
        <View style={styles.statusDot} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    height: 54,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.lg,

    paddingHorizontal: 8,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },

  containerFocused: {
    borderColor: COLORS.primary,

    shadowColor: '#0D3B66',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },

  // ============================================================
  // SEARCH ICON
  // ============================================================

  searchIconContainer: {
    width: 38,
    height: 38,

    borderRadius: 19,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(15, 23, 42, 0.045)',
  },

  searchIconFocused: {
    backgroundColor: 'rgba(13, 59, 102, 0.09)',
  },

  // ============================================================
  // INPUT
  // ============================================================

  input: {
    flex: 1,

    height: '100%',

    marginHorizontal: 10,

    color: COLORS.text,

    fontSize: 15,

    fontWeight: '500',

    paddingVertical: 0,
  },

  // ============================================================
  // CLEAR
  // ============================================================

  clearButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(15, 23, 42, 0.055)',
  },

  clearButtonPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.7,
  },

  // ============================================================
  // FOCUS INDICATOR
  // ============================================================

  statusDot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: COLORS.primary,

    marginRight: 8,
  },
});