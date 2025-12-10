# 📋 Dokumentasi Fitur Lengkap - Teknoreka POS

## 🎯 Overview
Aplikasi POS (Point of Sale) lengkap untuk Teknoreka Chicken dengan desain yang pixel-perfect sesuai dengan mockup yang diberikan.

---

## 📱 Halaman & Fitur Detail

### 1. 🏠 Home/Dashboard (Beranda)

**Fitur:**
- ✅ Welcome section dengan nama kasir dan tanggal
- ✅ 4 Kartu statistik:
  - Total Penjualan Hari Ini (Rp. 2.500.000)
  - Total Transaksi (45)
  - Menu Terlaris (Ayam Hot Nashville)
  - Stok Menipis (3 Item)
- ✅ Quick Actions:
  - Buat Pesanan (navigasi ke POS)
  - Lihat Transaksi
  - Kelola Stok
- ✅ Transaksi Terbaru (3 items terakhir)

**Test IDs:**
- `quick-action-pos`
- `quick-action-transaction`
- `quick-action-inventory`
- `view-all-transactions`

---

### 2. 🛒 POS Screen (Point of Sale)

**Layout:**
- Header dengan logo, lokasi cabang, search bar, dan profile kasir
- Category tabs (Semua, Promo, Hidangan Utama, Makanan, Minuman, Snack)
- Grid produk (responsive: 2-5 kolom tergantung ukuran layar)
- Cart sidebar di kanan (menampilkan order items)

**Fitur Utama:**
- ✅ **Search produk** - Cari berdasarkan nama produk
- ✅ **Filter kategori** - 6 kategori dengan jumlah produk
- ✅ **Product cards** dengan:
  - Gambar produk
  - Badge (HOT, EXTRA, Paket, dll)
  - Badge number (12) di pojok kanan atas
  - Nama produk (max 2 baris)
  - Harga (dengan strikethrough untuk harga lama)
- ✅ **Cart sidebar** menampilkan:
  - List semua order items
  - Varian dan topping yang dipilih
  - Catatan khusus
  - Quantity dan subtotal per item
  - Total keseluruhan
  - Tombol "Konfirmasi Pesanan"
  - Tombol remove item (X merah)
- ✅ **Responsive design** (2-5 kolom)

**Test IDs:**
- `header-search-input`
- `category-tab-{id}`
- `product-card-{id}`
- `checkout-button`
- `remove-item-{index}`

---

### 3. 📝 Product Detail Modal

**Trigger:** Klik pada product card

**Fitur:**
- ✅ **Header Section:**
  - Gambar produk besar (120x120)
  - Badge (HOT, EXTRA, dll)
  - Badge number (12)
  - Nama produk
  - Variant name
  - Harga

- ✅ **Pilih Varian:**
  - List varian dengan radio button style
  - Nama varian (Dada Mentok, Dada Bawah, Paha Tengah)
  - Harga tambahan (jika ada)
  - Stock info
  - Visual selected state (blue border + light blue background)

- ✅ **Pilih Topping:**
  - Multiple selection (checkbox style)
  - 5 pilihan topping:
    - +Nugget (+5000, Stok: 25)
    - +Telur Dadar (+5000, Stok: 25)
    - +Kue Coklat (+7000, Stok: 15)
    - +Sate Ayam (+8000, Stok: 20)
    - +Pasta Carbonara (+7500, Stok: 10)
  - Visual selected state

- ✅ **Catatan:**
  - Textarea untuk catatan khusus
  - Placeholder: "Tambah Catatan"

- ✅ **Aktifkan Potongan:**
  - Toggle switch untuk enable/disable
  - Pilihan: Diskon atau Kupon
  - Tombol "Klaim" untuk kupon

- ✅ **Ringkasan:**
  - Diskon (jika ada)
  - Tambahan (total topping)
  - Total Pembayaran (bold, blue)

- ✅ **Bottom Actions:**
  - Quantity selector (- / number / +)
  - Tombol "Masukan ke Pesanan" (blue primary)

**Test IDs:**
- `close-product-modal`
- `variant-{id}`
- `topping-{id}`
- `product-notes-input`
- `discount-toggle`
- `discount-type-diskon`
- `discount-type-kupon`
- `decrease-quantity`
- `increase-quantity`
- `add-to-order-button`

---

### 4. 💳 Payment Confirmation Modal

**Trigger:** Klik "Konfirmasi Pesanan" di cart sidebar

**Fitur:**
- ✅ **Header:**
  - Judul: "Konfirmasi Pemesanan"
  - Subtitle: "Pastikan kembali data telah sesuai dan benar"

- ✅ **Opsi Pembayaran:**
  - 3 metode pembayaran dalam card style:
    - **Tunai** (icon wallet)
    - **QRIS** (icon QR code)
    - **EDC** (icon card)
  - Visual selected state (blue border + light blue background + checkmark)

- ✅ **Nominal Tunai** (hanya muncul jika pilih Tunai):
  - Input field dengan prefix "Rp."
  - Numeric keyboard
  - Auto-calculate kembalian
  - Display: "Kembali: Rp. 10.000" (orange text)

- ✅ **Kode Promo:**
  - Input field dengan placeholder "Kode Promo"
  - Tombol "Klaim" (blue)
  - Logic: kode "diskon10" = 10% discount
  - Alert untuk valid/invalid promo

- ✅ **Ringkasan Pembayaran:**
  - Total (subtotal items)
  - Diskon (dari promo)
  - PPN (10%)
  - Jumlah Total (subtotal + tax - discount)
  - Pembulatan (ke ratusan terdekat)
  - **Total Pembayaran** (final, blue, bold, 20px)

- ✅ **Bottom Actions:**
  - Tombol "Bayar Sekarang" (blue primary dengan arrow)
  - Tombol "Bayar Nanti" (outline blue)

**Validasi:**
- ✅ Untuk Tunai: nominal harus >= total pembayaran
- ✅ Alert jika nominal kurang
- ✅ Alert sukses setelah pembayaran

**Test IDs:**
- `close-payment-modal`
- `payment-method-tunai`
- `payment-method-qris`
- `payment-method-edc`
- `cash-amount-input`
- `promo-code-input`
- `claim-promo-button`
- `pay-now-button`
- `pay-later-button`

---

### 5. 📊 Transaction Screen (Transaksi)

**Fitur:**
- ✅ **Header** dengan search bar
- ✅ **Filter buttons:**
  - Semua
  - Selesai
  - Pending
  
- ✅ **Transaction Cards** menampilkan:
  - Transaction ID (TRX001, TRX002, dll)
  - Date & Time
  - Status badge (Selesai=green, Pending=yellow)
  - List items dengan quantity dan harga
  - Subtotal, Discount (jika ada), PPN, Total
  - Payment method icon dan text
  - Nama kasir

- ✅ **Empty state** jika tidak ada transaksi

**Test IDs:**
- `transaction-search-input`
- `filter-all`
- `filter-completed`
- `filter-pending`

---

### 6. 📦 Inventory Screen

**Status:** Coming Soon
- Icon cube
- Title: "Fitur Inventory"
- Text: "Sedang dalam pengembangan"

---

### 7. 💰 Finance Screen

**Status:** Coming Soon
- Icon cash
- Title: "Fitur Keuangan"
- Text: "Sedang dalam pengembangan"

---

## 🎨 Design System

### Color Palette
```javascript
primary: '#0066CC'        // Blue - untuk buttons, prices, highlights
primaryDark: '#0052A3'    // Dark Blue
secondary: '#FF6B00'      // Orange - untuk prices, badges
background: '#F5F5F7'     // Light Gray - background
white: '#FFFFFF'          // White
black: '#000000'          // Black
text: '#1A1A1A'          // Dark Gray - primary text
textGray: '#666666'       // Medium Gray - secondary text
textLight: '#999999'      // Light Gray - tertiary text
border: '#E0E0E0'        // Border color
success: '#4CAF50'        // Green - success states
error: '#F44336'          // Red - error states
warning: '#FFC107'        // Yellow - warning states
```

### Typography
- **Header Title**: 20-24px, Bold (700)
- **Section Title**: 16-18px, SemiBold (600)
- **Body Text**: 14px, Regular (400)
- **Small Text**: 12px, Regular (400)
- **Price**: 16-20px, Bold (700)

### Spacing
- Container padding: 16-20px
- Card margin: 8-16px
- Element margin: 4-12px

### Border Radius
- Cards: 12px
- Buttons: 8px
- Small elements: 4-6px

---

## 📊 Data Structure

### Product
```javascript
{
  id: string
  name: string
  variant: string
  price: number
  originalPrice?: number
  category: string[]
  image: string
  badge?: string
  badgeNumber?: number
  stock: number
  variants: Variant[]
  toppings: Topping[]
}
```

### Variant
```javascript
{
  id: string
  name: string
  price: number
  stock: number
}
```

### Topping
```javascript
{
  id: string
  name: string
  price: number
  stock: number
}
```

### Order Item
```javascript
{
  product: Product
  quantity: number
  variant: Variant
  toppings: Topping[]
  notes: string
  discount: number
  total: number
}
```

---

## 🔧 Helper Functions

### formatCurrency(amount)
Format angka ke Rupiah
```javascript
formatCurrency(15000) // "Rp. 15.000"
```

### calculateTax(amount, taxRate = 0.1)
Hitung pajak 10%
```javascript
calculateTax(100000) // 10000
```

### roundAmount(amount)
Pembulatan ke ratusan terdekat
```javascript
roundAmount(112400) // 112400
roundAmount(112450) // 112500
```

---

## 📱 Responsive Breakpoints

| Device Type | Width Range | Product Columns |
|-------------|-------------|-----------------|
| Mobile      | < 600px     | 2 columns       |
| Tablet      | 600-900px   | 3 columns       |
| Desktop     | 900-1200px  | 4 columns       |
| Large       | > 1200px    | 5 columns       |

---

## ✅ Implementasi Checklist

### Components
- ✅ Sidebar - Navigation menu dengan 5 items
- ✅ Header - Logo, location, search, profile
- ✅ CategoryTabs - 6 kategori dengan scroll horizontal
- ✅ ProductCard - Dengan badge, image, name, price
- ✅ ProductDetailModal - Full featured dengan varian & topping
- ✅ PaymentModal - 3 metode pembayaran dengan summary
- ✅ CartSidebar - Menampilkan order items dengan actions

### Screens
- ✅ HomeScreen - Dashboard dengan statistik
- ✅ POSScreen - Main screen dengan grid produk + cart
- ✅ TransactionScreen - Riwayat transaksi dengan filter
- ✅ InventoryScreen - Coming soon placeholder
- ✅ FinanceScreen - Coming soon placeholder

### Data
- ✅ 10 dummy products dengan images
- ✅ 6 categories
- ✅ 3 variants per product
- ✅ 5 toppings per product
- ✅ 2 sample transactions

### Navigation
- ✅ React Navigation setup
- ✅ Stack Navigator
- ✅ Sidebar navigation integration
- ✅ Active route highlighting

### Features
- ✅ Search functionality
- ✅ Category filtering
- ✅ Add to cart
- ✅ Remove from cart
- ✅ Variant selection
- ✅ Multiple topping selection
- ✅ Notes input
- ✅ Discount/promo code
- ✅ Payment method selection
- ✅ Cash payment with change calculation
- ✅ Payment summary with tax & rounding
- ✅ Transaction filtering
- ✅ Responsive grid layout

---

## 🚀 Next Steps untuk Production

### Backend Integration (Optional)
- [ ] Setup REST API atau GraphQL
- [ ] Real-time inventory sync
- [ ] User authentication
- [ ] Order history persistence
- [ ] Receipt printing integration

### Advanced Features (Future)
- [ ] Multi-branch support
- [ ] Employee management
- [ ] Advanced reports & analytics
- [ ] Customer loyalty program
- [ ] Offline mode dengan sync
- [ ] Receipt printer integration
- [ ] Barcode scanner support

---

## 📞 Support

Untuk pertanyaan atau bantuan teknis, hubungi developer.

**Stack:**
- React Native 0.81.5
- Expo SDK 54
- React Navigation 7
- Node.js 18+

**Build Command:**
```bash
eas build --platform android --profile preview
```
