import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { formatCurrency, calculateTax, roundAmount } from '../utils/helpers';

const PaymentModal = ({ visible, orderItems, onClose, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [cashAmount, setCashAmount] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!orderItems || orderItems.length === 0) return null;

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const totalBeforeRounding = subtotal - discount + tax;
  const rounding = roundAmount(totalBeforeRounding) - totalBeforeRounding;
  const finalTotal = totalBeforeRounding + rounding;
  
  const cashAmountNum = parseFloat(cashAmount) || 0;
  const change = cashAmountNum - finalTotal;

  const handlePromoCodeClaim = () => {
    // Simple promo logic
    if (promoCode.toLowerCase() === 'diskon10') {
      setDiscount(subtotal * 0.1);
      alert('Kode promo berhasil diterapkan!');
    } else {
      alert('Kode promo tidak valid');
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'Tunai' && cashAmountNum < finalTotal) {
      alert('Jumlah uang tunai tidak cukup!');
      return;
    }

    onPaymentComplete({
      items: orderItems,
      subtotal,
      discount,
      tax,
      rounding,
      total: finalTotal,
      paymentMethod,
      cashAmount: cashAmountNum,
      change,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            data-testid="close-payment-modal"
          >
            <Ionicons name="close" size={24} color={colors.textGray} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Konfirmasi Pemesanan</Text>
              <Text style={styles.subtitle}>Pastikan kembali data telah sesuai dan benar</Text>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Opsi Pembayaran</Text>
              <View style={styles.paymentMethodsContainer}>
                <TouchableOpacity
                  style={[
                    styles.paymentMethodCard,
                    paymentMethod === 'Tunai' && styles.paymentMethodCardActive,
                  ]}
                  onPress={() => setPaymentMethod('Tunai')}
                  data-testid="payment-method-tunai"
                >
                  <View style={[
                    styles.paymentIcon,
                    paymentMethod === 'Tunai' && styles.paymentIconActive,
                  ]}>
                    <Ionicons
                      name="wallet"
                      size={24}
                      color={paymentMethod === 'Tunai' ? colors.primary : colors.textGray}
                    />
                  </View>
                  <Text style={styles.paymentMethodText}>Tunai</Text>
                  {paymentMethod === 'Tunai' && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.paymentMethodCard,
                    paymentMethod === 'QRIS' && styles.paymentMethodCardActive,
                  ]}
                  onPress={() => setPaymentMethod('QRIS')}
                  data-testid="payment-method-qris"
                >
                  <View style={[
                    styles.paymentIcon,
                    paymentMethod === 'QRIS' && styles.paymentIconActive,
                  ]}>
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={24}
                      color={paymentMethod === 'QRIS' ? colors.primary : colors.textGray}
                    />
                  </View>
                  <Text style={styles.paymentMethodText}>QRIS</Text>
                  {paymentMethod === 'QRIS' && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.paymentMethodCard,
                    paymentMethod === 'EDC' && styles.paymentMethodCardActive,
                  ]}
                  onPress={() => setPaymentMethod('EDC')}
                  data-testid="payment-method-edc"
                >
                  <View style={[
                    styles.paymentIcon,
                    paymentMethod === 'EDC' && styles.paymentIconActive,
                  ]}>
                    <Ionicons
                      name="card"
                      size={24}
                      color={paymentMethod === 'EDC' ? colors.primary : colors.textGray}
                    />
                  </View>
                  <Text style={styles.paymentMethodText}>EDC</Text>
                  {paymentMethod === 'EDC' && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Cash Amount Input (only for Tunai) */}
            {paymentMethod === 'Tunai' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Nominal Tunai<Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.cashInputContainer}>
                  <Text style={styles.currencyLabel}>Rp.</Text>
                  <TextInput
                    style={styles.cashInput}
                    placeholder="0"
                    placeholderTextColor={colors.textGray}
                    keyboardType="numeric"
                    value={cashAmount}
                    onChangeText={setCashAmount}
                    data-testid="cash-amount-input"
                  />
                </View>
                <Text style={styles.changeText}>
                  Kembali: {formatCurrency(Math.max(0, change))}
                </Text>
              </View>
            )}

            {/* Promo Code */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Masukan Kode Promo*</Text>
              <View style={styles.promoContainer}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Kode Promo"
                  placeholderTextColor={colors.textGray}
                  value={promoCode}
                  onChangeText={setPromoCode}
                  data-testid="promo-code-input"
                />
                <TouchableOpacity
                  style={styles.claimButton}
                  onPress={handlePromoCodeClaim}
                  data-testid="claim-promo-button"
                >
                  <Text style={styles.claimButtonText}>Klaim</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Summary */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diskon</Text>
                <Text style={styles.summaryValue}>{formatCurrency(discount)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>PPN (10%)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Jumlah Total</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalBeforeRounding)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pembulatan</Text>
                <Text style={styles.summaryValue}>{formatCurrency(rounding)}</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total Pembayaran</Text>
                <Text style={styles.summaryTotalValue}>{formatCurrency(finalTotal)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.payNowButton}
              onPress={handlePayment}
              data-testid="pay-now-button"
            >
              <Text style={styles.payNowButtonText}>Bayar Sekarang</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.payLaterButton}
              onPress={onClose}
              data-testid="pay-later-button"
            >
              <Text style={styles.payLaterButtonText}>Bayar Nanti</Text>
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
    maxWidth: 600,
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
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
  required: {
    color: colors.error,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethodCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  paymentMethodCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#E3F2FD',
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentIconActive: {
    backgroundColor: '#E3F2FD',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cashInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currencyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginRight: 8,
  },
  cashInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  changeText: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 8,
    fontWeight: '600',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  claimButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  summarySection: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textGray,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  bottomActions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payNowButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  payNowButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginRight: 8,
  },
  payLaterButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payLaterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default PaymentModal;
