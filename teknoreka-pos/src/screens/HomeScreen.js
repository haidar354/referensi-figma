import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../utils/colors';
import { formatCurrency } from '../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const stats = [
    { id: 1, label: 'Total Penjualan Hari Ini', value: 'Rp. 2.500.000', icon: 'cash', color: '#4CAF50' },
    { id: 2, label: 'Total Transaksi', value: '45', icon: 'receipt', color: '#2196F3' },
    { id: 3, label: 'Menu Terlaris', value: 'Ayam Hot Nashville', icon: 'flame', color: '#FF5722' },
    { id: 4, label: 'Stok Menipis', value: '3 Item', icon: 'warning', color: '#FFC107' },
  ];

  const recentTransactions = [
    { id: 'TRX045', time: '16:45', amount: 112000, status: 'Selesai' },
    { id: 'TRX044', time: '16:30', amount: 85000, status: 'Selesai' },
    { id: 'TRX043', time: '16:15', amount: 150000, status: 'Selesai' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Dashboard" subtitle="Cabang Gejayan" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Selamat Datang, Putri! 👋</Text>
          <Text style={styles.welcomeSubtitle}>Senin, 23 Juni 2025</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('POS')}
              data-testid="quick-action-pos"
            >
              <Ionicons name="cart" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Buat Pesanan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} data-testid="quick-action-transaction">
              <Ionicons name="document-text" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Lihat Transaksi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} data-testid="quick-action-inventory">
              <Ionicons name="cube" size={32} color={colors.primary} />
              <Text style={styles.actionText}>Kelola Stok</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
            <TouchableOpacity data-testid="view-all-transactions">
              <Text style={styles.viewAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionId}>{transaction.id}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  {formatCurrency(transaction.amount)}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: colors.primary,
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    marginTop: -40,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    margin: '1%',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textGray,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionLeft: {
    justifyContent: 'center',
  },
  transactionId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
    color: colors.textGray,
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.success,
  },
});

export default HomeScreen;
