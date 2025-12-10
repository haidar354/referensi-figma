import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../utils/colors';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            activeCategory === category.id && styles.tabActive,
          ]}
          onPress={() => onSelectCategory(category.id)}
          data-testid={`category-tab-${category.id}`}
        >
          <Text
            style={[
              styles.tabText,
              activeCategory === category.id && styles.tabTextActive,
            ]}
          >
            {category.name} ({category.count})
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textGray,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default CategoryTabs;
