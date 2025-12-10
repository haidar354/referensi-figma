import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const Header = ({ title, subtitle, onSearch }) => {
  return (
    <View style={styles.container}>
      {/* Left: Restaurant Info */}
      <View style={styles.leftSection}>
        <View style={styles.restaurantLogo}>
          <Ionicons name="restaurant" size={24} color={colors.white} />
        </View>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{title || 'Teknoreka Chicken'}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={12} color={colors.textGray} />
            <Text style={styles.locationText}>{subtitle || 'Cabang Gejayan'}</Text>
          </View>
        </View>
      </View>

      {/* Right: Search & Profile */}
      <View style={styles.rightSection}>
        {onSearch && (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.textGray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari sesuatu..."
              placeholderTextColor={colors.textGray}
              onChangeText={onSearch}
              data-testid="header-search-input"
            />
          </View>
        )}

        <TouchableOpacity style={styles.profileContainer} data-testid="header-profile">
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=47' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Putri Salsabilla</Text>
            <Text style={styles.profileRole}>Kasir</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={colors.textGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  restaurantInfo: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: colors.textGray,
    marginLeft: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    minWidth: 200,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileInfo: {
    marginRight: 8,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  profileRole: {
    fontSize: 12,
    color: colors.textGray,
  },
});

export default Header;
