import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../utils/colors';
import { formatCurrency } from '../utils/helpers';
import { transactions } from '../data/products';

const TransactionScreen = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && transaction.status === 'Selesai') ||
      (filter === 'pending' && transaction.status === 'Pending');
    return matchesSearch && matchesFilter;
  });

  const getPaymentIcon = (payment) => {
    switch (payment) {
      case 'Tunai':
        return 'wallet';
      case 'QRIS':
        return 'qr-code';
      case 'EDC':
        return 'card';
      default:
        return 'cash';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Transaksi" subtitle="Riwayat Penjualan" />
      
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari ID transaksi..."
            placeholderTextColor={colors.textGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            data-testid="transaction-search-input"
          />
        </View>
        
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
            data-testid="filter-all"
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              Semua
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
            data-testid="filter-completed"
          >
            <Text
              style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}
            >
              Selesai
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
            onPress={() => setFilter('pending')}
            data-testid="filter-pending"
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {filteredTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionId}>{transaction.id}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.date} • {transaction.time}
                </Text>
              </View>
              <View style={styles.transactionRight}>
                <View
                  style={[
                    styles.statusBadge,
                    transaction.status === 'Selesai'
                      ? styles.statusBadgeSuccess
                      : styles.statusBadgePending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      transaction.status === 'Selesai'
                        ? styles.statusTextSuccess
                        : styles.statusTextPending,
                    ]}
                  >
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.transactionDivider} />

            <View style={styles.transactionBody}>
              {transaction.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>
                    {item.quantity}x {item.product}
                  </Text>
                  <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.transactionDivider} />

            <View style={styles.transactionFooter}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(transaction.subtotal)}</Text>
              </View>
              {transaction.discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Diskon</Text>
                  <Text style={[styles.summaryValue, styles.discountValue]}>
                    -{formatCurrency(transaction.discount)}
                  </Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>PPN (10%)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(transaction.tax)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryTotalValue}>{formatCurrency(transaction.total)}</Text>
              </View>
            </View>

            <View style={styles.paymentInfo}>
              <View style={styles.paymentMethod}>
                <Ionicons
                  name={getPaymentIcon(transaction.payment)}
                  size={16}
                  color={colors.textGray}
                />
                <Text style={styles.paymentText}>{transaction.payment}</Text>
              </View>
              <Text style={styles.cashierText}>Kasir: {transaction.cashier}</Text>
            </View>
          </View>
        ))}

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={colors.textGray} />
            <Text style={styles.emptyText}>Tidak ada transaksi ditemukan</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtersContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textGray,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  transactionsList: {
    flex: 1,
    padding: 16,
  },
  transactionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionId: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textGray,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeSuccess: {
    backgroundColor: colors.success + '20',
  },
  statusBadgePending: {
    backgroundColor: colors.warning + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextSuccess: {
    color: colors.success,
  },
  statusTextPending: {
    color: colors.warning,
  },
  transactionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  transactionBody: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  transactionFooter: {
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textGray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  discountValue: {
    color: colors.error,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 12,
    color: colors.textGray,
    marginLeft: 6,
  },
  cashierText: {
    fontSize: 12,
    color: colors.textGray,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textGray,
    marginTop: 16,
  },
});

export default TransactionScreen;
