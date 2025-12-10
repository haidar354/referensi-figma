# 📖 Panduan Penggunaan Aplikasi Teknoreka POS

## 🎯 Selamat Datang!

Aplikasi POS ini dirancang khusus untuk Teknoreka Chicken dengan antarmuka yang intuitif dan mudah digunakan.

---

## 🚀 Cara Memulai

### 1. Jalankan Development Server

```bash
cd teknoreka-pos
npm start
```

Scan QR code dengan aplikasi **Expo Go** di smartphone Anda:
- Android: [Expo Go di Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- iOS: [Expo Go di App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. Atau Jalankan di Emulator

```bash
# Android
npm run android

# iOS (Mac only)
npm run ios
```

---

## 💡 Cara Menggunakan Fitur-Fitur

### 🏠 **Dashboard (Beranda)**

**Apa yang bisa dilakukan:**
1. Lihat statistik penjualan hari ini
2. Monitor total transaksi
3. Cek menu terlaris
4. Alert untuk stok yang menipis
5. Akses cepat ke fitur utama

**Tips:**
- Klik "Buat Pesanan" untuk langsung ke POS
- Lihat 3 transaksi terakhir di bagian bawah

---

### 🛒 **POS (Point of Sale)**

#### **A. Mencari Produk**
1. Gunakan search bar di header untuk cari produk
2. Atau klik kategori di tab (Semua, Promo, Hidangan Utama, dll)
3. Scroll untuk lihat semua produk

#### **B. Menambah Pesanan**
1. **Klik card produk** yang ingin dipesan
2. **Modal detail** akan muncul dengan pilihan:
   - **Pilih Varian**: Klik salah satu varian (Dada Mentok, Dada Bawah, Paha Tengah)
   - **Pilih Topping**: Klik untuk menambah topping (bisa lebih dari 1)
   - **Tambah Catatan**: Tulis catatan khusus untuk pesanan
   - **Aktifkan Diskon**: Toggle ON jika ada diskon/kupon
   - **Atur Quantity**: Gunakan tombol - dan + untuk jumlah
3. Lihat **ringkasan harga** di bawah
4. Klik **"Masukan ke Pesanan"**

#### **C. Kelola Cart**
Di **Cart Sidebar** (kanan layar):
- Lihat semua item yang sudah ditambahkan
- Klik ❌ untuk hapus item
- Lihat total keseluruhan
- Klik **"Konfirmasi Pesanan"** jika sudah selesai

---

### 💳 **Pembayaran**

#### **A. Pilih Metode Pembayaran**
Setelah klik "Konfirmasi Pesanan", akan muncul modal:
1. **Tunai**: Untuk pembayaran cash
   - Masukkan nominal yang diterima
   - Sistem otomatis hitung kembalian
2. **QRIS**: Untuk pembayaran scan QR
3. **EDC**: Untuk pembayaran kartu debit/kredit

#### **B. Gunakan Promo (Opsional)**
1. Masukkan kode promo di field "Masukan Kode Promo"
2. Klik **"Klaim"**
3. Sistem akan validasi dan terapkan diskon

**Kode Promo Demo:**
- `diskon10` = Diskon 10%

#### **C. Cek Ringkasan**
Pastikan semua benar:
- Total item
- Diskon (jika ada)
- PPN (10%)
- Pembulatan
- **Total Pembayaran** (angka besar berwarna biru)

#### **D. Selesaikan Pembayaran**
- **"Bayar Sekarang"**: Proses pembayaran langsung
- **"Bayar Nanti"**: Simpan untuk dibayar kemudian

---

### 📊 **Transaksi**

**Lihat Riwayat Transaksi:**
1. Klik menu **"Transaksi"** di sidebar
2. Gunakan **search** untuk cari ID transaksi tertentu
3. Filter berdasarkan status:
   - **Semua**: Semua transaksi
   - **Selesai**: Transaksi yang sudah dibayar
   - **Pending**: Transaksi yang belum dibayar

**Informasi di setiap transaksi:**
- ID Transaksi (TRX001, TRX002, dll)
- Tanggal dan waktu
- Daftar item yang dibeli
- Total pembayaran
- Metode pembayaran
- Nama kasir

---

## 🎨 Navigasi Aplikasi

### **Sidebar Menu**
Klik icon di sidebar kiri untuk pindah halaman:

| Icon | Menu | Fungsi |
|------|------|--------|
| 🏠 | Beranda | Dashboard & statistik |
| 🧾 | POS | Halaman pemesanan utama |
| 📄 | Transaksi | Riwayat penjualan |
| 📦 | Inventory | Kelola stok (coming soon) |
| 💰 | Keuangan | Laporan keuangan (coming soon) |
| ⚙️ | Settings | Pengaturan aplikasi |
| 🚪 | Logout | Keluar dari aplikasi |

---

## ⚡ Tips & Trik

### **Untuk Kecepatan:**
1. **Gunakan kategori** untuk filter cepat
2. **Search** untuk produk spesifik
3. **Cart sidebar** selalu visible untuk monitoring
4. **Keyboard shortcut** (untuk web):
   - `Ctrl/Cmd + K`: Focus search
   - `ESC`: Tutup modal

### **Untuk Akurasi:**
1. **Cek variant** sebelum menambah pesanan
2. **Tulis catatan** untuk permintaan khusus
3. **Cek total** di cart sebelum konfirmasi
4. **Validasi nominal** tunai untuk kembalian yang tepat

### **Untuk Efisiensi:**
1. **Gunakan promo code** untuk pelanggan loyal
2. **Batch ordering**: Tambah beberapa item sekaligus
3. **Review cart** sebelum checkout
4. **Gunakan QRIS/EDC** untuk transaksi cepat

---

## 🐛 Troubleshooting

### **Produk tidak muncul?**
- Cek filter kategori (pastikan di "Semua")
- Cek search bar (pastikan kosong)
- Refresh aplikasi

### **Tidak bisa tambah ke cart?**
- Pastikan sudah pilih variant
- Cek quantity > 0
- Pastikan stok tersedia

### **Kembalian tidak akurat?**
- Pastikan input nominal tunai sudah benar
- Sistem otomatis hitung dengan pembulatan

### **Modal tidak menutup?**
- Klik tombol X di pojok kanan atas
- Atau klik area di luar modal

---

## 📱 Build APK untuk Production

### **Persiapan:**
1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login ke Expo:
```bash
eas login
```

### **Build APK:**
```bash
# Untuk testing/preview
eas build --platform android --profile preview

# Untuk production
eas build --platform android --profile production
```

### **Hasil:**
- Tunggu proses build (10-20 menit)
- Download APK dari link yang diberikan
- Install di perangkat Android

---

## 🎓 Training untuk Staff

### **Sesi 1: Pengenalan (15 menit)**
- Tour aplikasi
- Penjelasan menu-menu
- Demo navigasi

### **Sesi 2: POS Basic (30 menit)**
- Cara mencari produk
- Menambah pesanan
- Pilih variant dan topping
- Proses pembayaran tunai

### **Sesi 3: POS Advanced (20 menit)**
- Gunakan promo code
- Pembayaran QRIS/EDC
- Kelola cart (edit/hapus)
- Handling catatan khusus

### **Sesi 4: Transaksi & Laporan (15 menit)**
- Cek riwayat transaksi
- Filter dan search
- Validasi transaksi

---

## 📞 Bantuan & Support

### **Masalah Teknis:**
- Dokumentasi: Baca `README.md` dan `FEATURES.md`
- GitHub Issues: Laporkan bug
- Email: contact@teknoreka.com

### **Pertanyaan Bisnis:**
- Hubungi manajer cabang
- Training manual: Lihat `PANDUAN_PENGGUNAAN.md`

---

## 🔐 Keamanan

### **Best Practices:**
1. **Jangan share** akun kasir
2. **Logout** setelah shift selesai
3. **Validasi** setiap transaksi
4. **Backup** data secara berkala

---

## 🎉 Selamat Menggunakan!

Aplikasi ini dirancang untuk mempermudah pekerjaan Anda. 

**Jika ada pertanyaan atau saran, jangan ragu untuk menghubungi tim developer!**

---

**Version:** 1.0.0  
**Last Updated:** Desember 2025  
**Platform:** React Native + Expo
