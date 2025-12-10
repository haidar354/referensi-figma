# Teknoreka POS - Point of Sale Application

Aplikasi Point of Sale (POS) untuk restoran Teknoreka Chicken yang dibangun dengan React Native dan Expo.

## 🚀 Fitur Utama

- ✅ **Dashboard Beranda** - Overview penjualan dan statistik
- ✅ **Halaman POS** - Daftar produk dengan kategori dan pencarian
- ✅ **Detail Produk** - Pilih varian, topping, dan catatan
- ✅ **Konfirmasi Pembayaran** - Pilihan metode pembayaran (Tunai, QRIS, EDC)
- ✅ **Riwayat Transaksi** - Lihat dan filter transaksi
- ✅ **Responsive Design** - Support untuk phone, tablet, dan desktop
- ✅ **Navigation Sidebar** - Navigasi antar halaman

## 📱 Teknologi

- **React Native** - Framework mobile
- **Expo** - Development platform
- **React Navigation** - Routing dan navigasi
- **Expo Vector Icons** - Icon library
- **Dummy Data** - Data hardcoded untuk demo

## 🛠️ Instalasi & Setup

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- npm atau yarn
- Expo CLI

### Install Dependencies

```bash
cd teknoreka-pos
npm install
# atau
yarn install
```

## 📲 Menjalankan Aplikasi

### Development Mode

```bash
# Start Expo development server
npm start
# atau
expo start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on Web
npm run web
```

## 📦 Build APK untuk Android

### Menggunakan EAS Build

1. **Install EAS CLI** (jika belum)
```bash
npm install -g eas-cli
```

2. **Login ke Expo**
```bash
eas login
```

3. **Configure EAS**
```bash
eas build:configure
```

4. **Build APK Preview**
```bash
eas build --platform android --profile preview
```

5. **Download APK**
Setelah build selesai, Anda akan mendapatkan link untuk download APK

### Build untuk Production

```bash
eas build --platform android --profile production
```

### Build untuk iOS

```bash
eas build --platform ios --profile preview
```

## 📁 Struktur Project

```
teknoreka-pos/
├── assets/              # Images dan assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Sidebar.js
│   │   ├── Header.js
│   │   ├── ProductCard.js
│   │   ├── CategoryTabs.js
│   │   ├── ProductDetailModal.js
│   │   └── PaymentModal.js
│   ├── data/            # Dummy data
│   │   └── products.js
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/         # Screen components
│   │   ├── HomeScreen.js
│   │   ├── POSScreen.js
│   │   ├── TransactionScreen.js
│   │   ├── InventoryScreen.js
│   │   └── FinanceScreen.js
│   └── utils/           # Helper functions
│       ├── colors.js
│       └── helpers.js
├── App.js               # Entry point
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: #0066CC (Blue)
- **Secondary**: #FF6B00 (Orange)
- **Background**: #F5F5F7 (Light Gray)
- **Success**: #4CAF50 (Green)
- **Error**: #F44336 (Red)
- **Warning**: #FFC107 (Yellow)

## 📝 Fitur & Halaman

### 1. Home/Beranda
- Dashboard dengan statistik penjualan
- Total penjualan hari ini
- Total transaksi
- Menu terlaris
- Stok menipis
- Transaksi terbaru
- Quick actions

### 2. POS (Point of Sale)
- Grid produk dengan gambar
- Filter kategori (Semua, Promo, Hidangan Utama, dll)
- Search produk
- Product card dengan badge dan harga
- Modal detail produk dengan:
  - Pilihan varian
  - Pilihan topping
  - Field catatan
  - Toggle diskon/kupon
  - Quantity selector

### 3. Konfirmasi Pembayaran
- Pilih metode pembayaran (Tunai, QRIS, EDC)
- Input nominal tunai dengan kalkulasi kembalian
- Input kode promo
- Ringkasan pembayaran:
  - Total
  - Diskon
  - PPN (10%)
  - Pembulatan
  - Total akhir
- Tombol "Bayar Sekarang" dan "Bayar Nanti"

### 4. Transaksi
- List semua transaksi
- Filter transaksi (Semua, Selesai, Pending)
- Search berdasarkan ID transaksi
- Detail setiap transaksi
- Status pembayaran
- Metode pembayaran

### 5. Inventory & Keuangan
- Coming soon screens

## 🔧 Customization

### Mengganti Data Produk

Edit file `src/data/products.js` untuk mengubah data produk, kategori, varian, dan topping.

### Mengganti Warna

Edit file `src/utils/colors.js` untuk mengubah color scheme aplikasi.

### Menambah Halaman Baru

1. Buat file screen baru di `src/screens/`
2. Import dan tambahkan route di `src/navigation/AppNavigator.js`
3. Tambahkan menu item di `src/components/Sidebar.js`

## 🐛 Troubleshooting

### Issue: Module not found
```bash
npm install
expo start --clear
```

### Issue: Build failed
```bash
eas build:configure
eas build --platform android --profile preview --clear-cache
```

### Issue: Navigation not working
Pastikan semua dependencies terinstall dengan benar:
```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
```

## 📄 License

Private project untuk Teknoreka Chicken.

## 👨‍💻 Developer

Dibuat dengan ❤️ menggunakan React Native & Expo

---

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
cd teknoreka-pos && npm install

# 2. Start development
npm start

# 3. Build APK
eas build --platform android --profile preview
```

Untuk pertanyaan atau bantuan, silakan hubungi developer.
