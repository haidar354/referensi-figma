import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import PaymentModal from '../components/PaymentModal';
import CartSidebar from '../components/CartSidebar';
import { colors } from '../utils/colors';
import { products, categories } from '../data/products';

const { width } = Dimensions.get('window');

const POSScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getNumColumns = () => {
    if (width > 1200) return 5;
    if (width > 900) return 4;
    if (width > 600) return 3;
    return 2;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category.includes(activeCategory);
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToOrder = (orderItem) => {
    setOrderItems([...orderItems, orderItem]);
    // Auto open payment modal after adding to order
    setTimeout(() => setShowPaymentModal(true), 300);
  };

  const handlePaymentComplete = (paymentData) => {
    console.log('Payment completed:', paymentData);
    // Reset order
    setOrderItems([]);
    alert('Pembayaran berhasil!');
  };

  return (
    <View style={styles.container}>
      <Header onSearch={setSearchQuery} />
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={[styles.productContainer, { width: `${100 / getNumColumns()}%` }]}>
            <ProductCard product={item} onPress={() => setSelectedProduct(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={getNumColumns()}
        key={getNumColumns()}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
      />

      {selectedProduct && (
        <ProductDetailModal
          visible={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={handleAddToOrder}
        />
      )}

      {showPaymentModal && orderItems.length > 0 && (
        <PaymentModal
          visible={showPaymentModal}
          orderItems={orderItems}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  productsGrid: {
    padding: 16,
  },
  productContainer: {
    paddingHorizontal: 8,
  },
});

export default POSScreen;
