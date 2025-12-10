import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../utils/colors';

const FinanceScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Keuangan" subtitle="Laporan Keuangan" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.comingSoonContainer}>
          <Ionicons name="cash-outline" size={80} color={colors.textGray} />
          <Text style={styles.comingSoonTitle}>Fitur Keuangan</Text>
          <Text style={styles.comingSoonText}>Sedang dalam pengembangan</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  comingSoonContainer: {
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
  },
});

export default FinanceScreen;
