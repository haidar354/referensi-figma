import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { formatCurrency } from '../utils/helpers';

const CartSidebar = ({ orderItems, onCheckout, onRemoveItem }) => {
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  if (orderItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Pesanan Saat Ini</Text>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={48} color={colors.textGray} />
          <Text style={styles.emptyText}>Belum ada pesanan</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pesanan Saat Ini</Text>
      <Text style={styles.headerSubtitle}>{orderItems.length} Item</Text>

      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {orderItems.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <TouchableOpacity
                onPress={() => onRemoveItem(index)}
                data-testid={`remove-item-${index}`}
              >
                <Ionicons name="close-circle" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>

            {item.variant && (
              <Text style={styles.itemDetail}>
                Varian: {item.variant.name}
              </Text>
            )}

            {item.toppings && item.toppings.length > 0 && (
              <Text style={styles.itemDetail}>
                Topping: {item.toppings.map((t) => t.name).join(', ')}
              </Text>
            )}

            {item.notes && (
              <Text style={styles.itemDetail}>Catatan: {item.notes}</Text>
            )}

            <View style={styles.itemFooter}>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>{formatCurrency(item.total)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(calculateTotal())}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={onCheckout}
          data-testid="checkout-button"
        >
          <Text style={styles.checkoutButtonText}>Konfirmasi Pesanan</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: colors.white,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 12,
  },
  itemsList: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  itemDetail: {
    fontSize: 12,
    color: colors.textGray,
    marginBottom: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textGray,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginRight: 8,
  },
});

export default CartSidebar;
