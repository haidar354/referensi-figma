import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const Sidebar = ({ navigation, activeRoute }) => {
  const menuItems = [
    { id: 'home', name: 'Beranda', icon: 'home', screen: 'Home' },
    { id: 'pos', name: 'POS', icon: 'receipt', screen: 'POS' },
    { id: 'transaction', name: 'Transaksi', icon: 'document-text', screen: 'Transaction' },
    { id: 'inventory', name: 'Inventory', icon: 'cube', screen: 'Inventory' },
    { id: 'finance', name: 'Keuangan', icon: 'cash', screen: 'Finance' },
  ];

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Ionicons name="nutrition" size={32} color={colors.primary} />
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              activeRoute === item.screen && styles.menuItemActive,
            ]}
            onPress={() => navigation.navigate(item.screen)}
            data-testid={`sidebar-${item.id}`}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={activeRoute === item.screen ? colors.primary : colors.textGray}
            />
            <Text
              style={[
                styles.menuText,
                activeRoute === item.screen && styles.menuTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Items */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.menuItem} data-testid="sidebar-settings">
          <Ionicons name="settings" size={24} color={colors.textGray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} data-testid="sidebar-logout">
          <Ionicons name="log-out" size={24} color={colors.textGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemActive: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: colors.background,
  },
  menuText: {
    fontSize: 10,
    color: colors.textGray,
    marginTop: 4,
    textAlign: 'center',
  },
  menuTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  bottomContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default Sidebar;
