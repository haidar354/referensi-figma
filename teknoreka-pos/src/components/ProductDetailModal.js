import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { formatCurrency } from '../utils/helpers';

const ProductDetailModal = ({ visible, product, onClose, onAddToOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [notes, setNotes] = useState('');
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [discountType, setDiscountType] = useState('Diskon');
  const [discountValue, setDiscountValue] = useState(0);

  if (!product) return null;

  const handleToppingToggle = (topping) => {
    const exists = selectedToppings.find((t) => t.id === topping.id);
    if (exists) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const calculateToppingsTotal = () => {
    return selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
  };

  const calculateTotal = () => {
    const basePrice = product.price;
    const variantPrice = selectedVariant?.price || 0;
    const toppingsPrice = calculateToppingsTotal();
    const subtotal = (basePrice + variantPrice + toppingsPrice) * quantity;
    const discount = discountEnabled ? discountValue : 0;
    return subtotal - discount;
  };

  const handleAddToOrder = () => {
    const orderItem = {
      product,
      quantity,
      variant: selectedVariant,
      toppings: selectedToppings,
      notes,
      discount: discountEnabled ? discountValue : 0,
      total: calculateTotal(),
    };
    onAddToOrder(orderItem);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-testid="close-product-modal"
          >
            <Ionicons name="close" size={24} color={colors.textGray} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Product Image and Info */}
            <View style={styles.productSection}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.badge && (
                  <View style={[styles.badge, product.badge === 'HOT' && styles.badgeHot]}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                {product.badgeNumber && (
                  <View style={styles.badgeNumber}>
                    <Text style={styles.badgeNumberText}>{product.badgeNumber}</Text>
                  </View>
                )}
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productVariant}>{product.variant}</Text>
                <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
              </View>
            </View>

            {/* Variants Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pilih Varian</Text>
              {product.variants?.map((variant) => (
                <TouchableOpacity
                  key={variant.id}
                  style={[
                    styles.optionItem,
                    selectedVariant?.id === variant.id && styles.optionItemSelected,
                  ]}
                  onPress={() => setSelectedVariant(variant)}
                  data-testid={`variant-${variant.id}`}
                >
                  <View style={styles.optionLeft}>
                    <Text style={styles.optionName}>{variant.name}</Text>
                    {variant.price > 0 && (
                      <Text style={styles.optionPrice}>+{formatCurrency(variant.price)}</Text>
                    )}
                  </View>
                  <Text style={styles.stockText}>Stok: {variant.stock}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Toppings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pilih Topping</Text>
              {product.toppings?.map((topping) => {
                const isSelected = selectedToppings.find((t) => t.id === topping.id);
                return (
                  <TouchableOpacity
                    key={topping.id}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemSelected,
                    ]}
                    onPress={() => handleToppingToggle(topping)}
                    data-testid={`topping-${topping.id}`}
                  >
                    <View style={styles.optionLeft}>
                      <Text style={styles.optionName}>{topping.name}</Text>
                      <Text style={styles.optionPrice}>+{formatCurrency(topping.price)}</Text>
                    </View>
                    <Text style={styles.stockText}>Stok: {topping.stock}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Notes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Catatan</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Tambah Catatan"
                placeholderTextColor={colors.textGray}
                multiline
                value={notes}
                onChangeText={setNotes}
                data-testid="product-notes-input"
              />
            </View>

            {/* Discount Toggle */}
            <View style={styles.section}>
              <View style={styles.discountHeader}>
                <Text style={styles.sectionTitle}>Aktifkan Potongan?</Text>
                <Switch
                  value={discountEnabled}
                  onValueChange={setDiscountEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                  data-testid="discount-toggle"
                />
              </View>
              {discountEnabled && (
                <View style={styles.discountSection}>
                  <View style={styles.discountTypeContainer}>
                    <TouchableOpacity
                      style={[
                        styles.discountTypeButton,
                        discountType === 'Diskon' && styles.discountTypeButtonActive,
                      ]}
                      onPress={() => setDiscountType('Diskon')}
                      data-testid="discount-type-diskon"
                    >
                      <Text style={styles.discountTypeText}>Diskon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.discountTypeButton,
                        discountType === 'Kupon' && styles.discountTypeButtonActive,
                      ]}
                      onPress={() => setDiscountType('Kupon')}
                      data-testid="discount-type-kupon"
                    >
                      <Text style={styles.discountTypeText}>Kupon</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* Summary */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diskon</Text>
                <Text style={styles.summaryValue}>- {formatCurrency(discountValue)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tambahan</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(calculateToppingsTotal())}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total Pembayaran</Text>
                <Text style={styles.summaryTotalValue}>
                  {formatCurrency(calculateTotal())}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                data-testid="decrease-quantity"
              >
                <Ionicons name="remove" size={20} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
                data-testid="increase-quantity"
              >
                <Ionicons name="add" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToOrder}
              data-testid="add-to-order-button"
            >
              <Text style={styles.addButtonText}>Masukan ke Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '90%',
    maxWidth: 900,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
  },
  productSection: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeHot: {
    backgroundColor: '#FF5722',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  badgeNumber: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumberText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  productVariant: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionItemSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E3F2FD',
  },
  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginRight: 8,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  stockText: {
    fontSize: 12,
    color: colors.textGray,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  discountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountSection: {
    marginTop: 12,
  },
  discountTypeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  discountTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  discountTypeButtonActive: {
    backgroundColor: colors.primary,
  },
  discountTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  summarySection: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textGray,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
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
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginRight: 12,
  },
  quantityButton: {
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default ProductDetailModal;
