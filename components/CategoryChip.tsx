import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../constants/theme';

import { HeritageCategory } from '../data/heritageSites';

interface Props {
  label: 'All' | HeritageCategory | string;
  selected: boolean;
  onPress: () => void;
}

const getCategoryIcon = (
  label: string
): React.ComponentProps<typeof Ionicons>['name'] => {
  switch (label.toLowerCase()) {
    case 'all':
      return 'grid-outline';

    case 'natural':
      return 'leaf-outline';

    case 'historical':
      return 'time-outline';

    case 'religious':
      return 'business-outline';

    case 'cultural':
      return 'people-outline';

    default:
      return 'sparkles-outline';
  }
};

export default function CategoryChip({
  label,
  selected,
  onPress,
}: Props) {
  const icon = getCategoryIcon(label);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} category`}
      accessibilityState={{
        selected,
      }}
      style={({ pressed }) => [
        styles.chip,

        selected && styles.selected,

        pressed && styles.pressed,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          selected && styles.selectedIconContainer,
        ]}
      >
        <Ionicons
          name={icon}
          size={14}
          color={
            selected
              ? COLORS.primary
              : COLORS.textSecondary
          }
        />
      </View>

      {/* Label */}
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* Selected indicator */}
      {selected && (
        <View style={styles.check}>
          <Ionicons
            name="checkmark"
            size={11}
            color={COLORS.white}
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // ============================================================
  // CHIP
  // ============================================================

  chip: {
    minHeight: 44,

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 7,
    paddingRight: 12,

    borderRadius: RADIUS.pill,

    backgroundColor: COLORS.surface,

    borderWidth: 1,

    borderColor: COLORS.border,

    marginRight: SPACING.sm,

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.035,

    shadowRadius: 5,

    elevation: 1,
  },

  // ============================================================
  // SELECTED
  // ============================================================

  selected: {
    backgroundColor: COLORS.primary,

    borderColor: COLORS.primary,

    shadowColor: '#0D3B66',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.16,

    shadowRadius: 8,

    elevation: 3,
  },

  // ============================================================
  // ICON
  // ============================================================

  iconContainer: {
    width: 30,
    height: 30,

    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(13, 59, 102, 0.06)',

    marginRight: 7,
  },

  selectedIconContainer: {
    backgroundColor: COLORS.white,
  },

  // ============================================================
  // TEXT
  // ============================================================

  text: {
    color: COLORS.textSecondary,

    fontSize: 12,

    fontWeight: '800',

    letterSpacing: 0.1,
  },

  selectedText: {
    color: COLORS.white,
  },

  // ============================================================
  // CHECK
  // ============================================================

  check: {
    width: 18,
    height: 18,

    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.22)',

    marginLeft: 7,
  },

  // ============================================================
  // PRESSED
  // ============================================================

  pressed: {
    opacity: 0.82,

    transform: [
      {
        scale: 0.96,
      },
    ],
  },
});