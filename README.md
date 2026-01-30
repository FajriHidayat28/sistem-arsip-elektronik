# 📂 Sistem Arsip Elektronik

Aplikasi **Sistem Arsip Elektronik** berbasis web yang dibangun menggunakan **Next.js**, **Prisma ORM**, dan **MySQL**. Sistem ini dirancang untuk membantu pengelolaan arsip secara digital agar lebih **terstruktur, aman, dan mudah diakses**.

---

## 🚀 Teknologi yang Digunakan

* **Next.js** – Framework React untuk aplikasi web
* **Prisma ORM** – Manajemen database modern
* **MySQL** – Database relasional
* **Tailwind CSS** – Styling UI
* **Node.js** – Runtime JavaScript

---

## 📁 Struktur Folder Utama

```
SistemArsipElektronik/
├── app/                # Routing & halaman (Next.js App Router)
├── components/         # Reusable UI components
├── context/            # Context API / state global
├── global/             # Konfigurasi/global helper
├── prisma/             # Prisma schema & migrations
├── public/             # Asset publik
├── styles/             # Global styles
├── utils/              # Helper / utility functions
├── .env.example        # Contoh environment variable
├── .gitignore          # File & folder yang diabaikan Git
├── package.json        # Dependency & script
└── README.md           # Dokumentasi project
```

---

## ⚙️ Instalasi & Menjalankan Project

### 1️⃣ Clone repository

```bash
git clone https://github.com/USERNAME_KAMU/sistem-arsip-elektronik.git
cd sistem-arsip-elektronik
```

### 2️⃣ Install dependency

```bash
npm install
```

### 3️⃣ Konfigurasi environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Lalu sesuaikan konfigurasi database MySQL:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/NAMA_DATABASE"
```

---

## 🗄️ Setup Database (Prisma)

Jalankan perintah berikut untuk migrasi database:

```bash
npx prisma migrate dev
```

Opsional (melihat database):

```bash
npx prisma studio
```

---

## ▶️ Menjalankan Aplikasi

```bash
npm run dev
```

Akses aplikasi di browser:

```
http://localhost:3000
```

---

## 🔐 Keamanan

* File `.env` **tidak diupload ke GitHub**
* Credential database disimpan secara lokal
* Gunakan `.env.example` sebagai template

---

## 📌 Catatan

* Pastikan MySQL sudah berjalan
* Pastikan database sudah dibuat sebelum migrasi

---

## 👤 Pengembang

**Nama**: Fajri Hidayat  
**Project**: Sistem Arsip Elektronik  
**Tujuan**: Tugas Kerja Praktek / Pengembangan sistem informasi manajemen arsip surat 

---

## 📄 Lisensi

Belum ditentukan.

---

✨ Dokumentasi ini dibuat untuk memudahkan pengembangan dan penggunaan aplikasi Sistem Arsip Elektronik.

