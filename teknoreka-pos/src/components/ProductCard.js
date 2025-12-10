import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/colors';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      data-testid={`product-card-${product.id}`}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
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
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              {formatCurrency(product.originalPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumberText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    minHeight: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textGray,
    textDecorationLine: 'line-through',
  },
});

export default ProductCard;
