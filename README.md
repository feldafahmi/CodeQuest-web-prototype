# 🚀 CodeQuest

**CodeQuest** adalah prototipe platform pembelajaran pemrograman dan dasar Artificial Intelligence (AI) tergamifikasi (*gamified learning platform*) yang dirancang khusus untuk meningkatkan minat belajar siswa sekolah menengah dalam ilmu komputer. 

Aplikasi ini menggunakan estetika desain modern dengan perpaduan *glassmorphism*, gradasi warna yang cerah, mikro-animasi dinamis.

---

## 📂 Arsitektur Proyek

Proyek ini menggunakan struktur monorepo terpisah antara bagian frontend dan backend:

1. **`codequest-frontend/`**: Aplikasi antarmuka pengguna berbasis **React** dan **Vite** yang mengelola seluruh halaman prototipe, interaksi logika, simulasi playground, kuis, dan dasbor.
2. **`codequest-backend/`**: Aplikasi server-side berbasis **Laravel 11** yang disiapkan sebagai REST API untuk autentikasi, penyimpanan data progress belajar siswa, manajemen kelas, dan pencatatan nilai.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (SPA framework)
- **Vite** (Build tool & development server)
- **Lucide React** (Set ikon minimalis & modern)
- **Vanilla CSS + CSS Custom Variables** (Sistem tema adaptif gelap/terang & animasi halus)
- **Google Fonts** (*Space Grotesk* untuk aksen/header & *Inter* untuk tulisan konten)

### Backend
- **Laravel 11** (PHP framework)
- **Composer** (PHP dependency manager)
- **Vite & Tailwind CSS v4** (Asset bundling & styling bawaan Laravel)
- **MySQL/SQLite** (Rencana database relasional)

---

## ✨ Fitur Utama

### 1. Area Siswa (Student Dashboard)
*   **Peta Petualangan (Worlds Map)**: Belajar terbagi dalam 4 dunia tematik:
    *   🏰 **Algorithm Island**: Urutan & langkah logis (Misi: Urutan Robot).
    *   🌲 **Logic Forest**: Percabangan & kondisi (Misi: Pilih Jalan yang Benar).
    *   ⛰️ **Loop Valley**: Perulangan/loop (Misi: Kumpulkan Koin).
    *   🔌 **AI Lab**: Dasar AI & machine learning (Misi: Klasifikasi Gambar).
*   **Kuis Interaktif**: Evaluasi pemahaman materi dengan pilihan ganda, instan *feedback* beserta penjelasan jawaban, dan animasi ketika berhasil menjawab benar.
*   **Code Playground**: Area menulis dan mengeksekusi kode JavaScript langsung di peramban secara *real-time*.
*   **AI Tutor**: Fitur asisten cerdas virtual untuk membantu siswa jika mengalami kesulitan dalam menyelesaikan kode atau memahami konsep.
*   **Papan Peringkat (Leaderboard)**: Mendorong jiwa kompetitif yang sehat melalui peringkat berbasis perolehan XP dan *Daily Streak*.
*   **Pencapaian (Achievements / Badges)**: Reward sistem berupa lencana digital setelah menyelesaikan misi/dunia tertentu.

### 2. Area Guru (Teacher Dashboard)
*   **Manajemen Kelas**: Membuat kelas baru (misalnya XI IPA 1) dan secara otomatis mendapatkan kode kelas unik (format: `CQ-XXXXX`) untuk dibagikan ke siswa.
*   **Daftar Siswa & Rapor**: Memantau progress individual siswa (XP, tingkat level, *daily streak*, dan persentase penyelesaian belajar).
*   **Laporan Kelas Lengkap**: Statistik kelas seperti rata-rata progress belajar secara keseluruhan, siswa paling aktif, dan visualisasi diagram persentase penyelesaian untuk tiap dunia pembelajaran.
*   **Ekspor Data**: Fitur ekspor laporan nilai/progress siswa untuk kebutuhan administrasi guru.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Pastikan Anda sudah menginstal alat-alat berikut di komputer Anda:
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- [PHP](https://www.php.net/) (versi 8.2 ke atas)
- [Composer](https://getcomposer.org/)
- Web server lokal seperti [Laragon](https://laragon.org/) (Sangat direkomendasikan untuk Windows) atau XAMPP.

---

### 1. Menjalankan Frontend (React + Vite)

Pindah ke direktori `codequest-frontend`:
```bash
cd codequest-frontend
```

Instal dependensi NPM:
```bash
npm install
```

Jalankan development server:
```bash
npm run dev
```

Aplikasi frontend dapat diakses di browser melalui URL:  
👉 **`http://localhost:5173`** (atau port lain yang ditunjukkan di terminal).

---

### 2. Menjalankan Backend (Laravel)

Pindah ke direktori `codequest-backend`:
```bash
cd ../codequest-backend
```

Instal dependensi PHP melalui Composer:
```bash
composer install
```

Salin file konfigurasi lingkungan (`.env`):
```bash
copy .env.example .env
```

Generate application key:
```bash
php artisan key:generate
```

Jalankan migrasi database (pastikan database Anda di MySQL sudah dibuat dan dikonfigurasi di file `.env`):
```bash
php artisan migrate
```

Jalankan development server Laravel:
```bash
php artisan serve
```

Aplikasi backend Laravel default dapat diakses di:  
👉 **`http://127.0.0.1:8000`**

---

## 📂 Struktur Direktori Penting

```
codequest-app/
├── README.md                  # Dokumentasi proyek (file ini)
│
├── codequest-frontend/        # Sisi Client (React + Vite)
│   ├── src/
│   │   ├── main.jsx           # Entrypoint React
│   │   └── App.jsx            # Berisi seluruh komponen & state UI prototipe
│   ├── package.json           # Dependensi pustaka frontend
│   └── vite.config.js         # Konfigurasi bundler Vite
│
└── codequest-backend/         # Sisi Server (Laravel 11)
    ├── app/                   # Model & Logika Controller
    ├── config/                # Konfigurasi Laravel
    ├── database/              # Migrations & Seeders
    ├── routes/
    │   ├── web.php            # Rute halaman web
    │   └── console.php        # Perintah Artisan kustom
    ├── package.json           # Aset compiler frontend Laravel
    └── composer.json          # Dependensi PHP & Laravel
```

---

## 📝 Catatan Tambahan

*   **Simulasi AI & Misi**: Di dalam prototipe ini, logika eksekusi JavaScript pada Code Playground beneran dieksekusi di browser, sedangkan simulasi Python, Scratch, dan klasifikasi AI masih bersifat simulasi terpandu. Pada pengembangan selanjutnya, backend Laravel akan mengintegrasikan engine Python sandbox atau pustaka eksternal lainnya.
*   **Tema Dinamis**: Pewarnaan elemen di dalam `App.jsx` didefinisikan menggunakan *CSS custom properties* (seperti `--bg`, `--panel`, `--text`) sehingga pergantian mode gelap/terang dapat berlangsung mulus tanpa merusak performa rendering.
