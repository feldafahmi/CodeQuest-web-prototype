# CodeQuest Prototype

Prototype UI untuk platform belajar coding & AI bergaya gamifikasi (CodeQuest) —
dibuat dengan React + Vite.

## Cara menjalankan di VS Code

1. Buka folder ini di VS Code (`code .` dari terminal, atau File > Open Folder).
2. Buka terminal di VS Code (`` Ctrl+` ``), lalu jalankan:

   ```bash
   npm install
   npm run dev
   ```

3. Vite akan menampilkan URL lokal, biasanya:

   ```
   http://localhost:5173
   ```

   Buka link itu di browser. Setiap perubahan di `src/App.jsx` akan otomatis
   ter-reload (hot reload).

## Struktur folder

```
codequest-app/
├── index.html          # entry HTML
├── package.json        # daftar dependency & script
├── vite.config.js       # konfigurasi Vite
└── src/
    ├── main.jsx         # render App ke DOM
    └── App.jsx          # seluruh UI prototype (landing, login, dashboard, dst)
```

## Catatan

- Semua styling pakai inline style (bukan Tailwind/CSS terpisah), jadi tidak perlu
  konfigurasi CSS tambahan.
- Icon pakai library `lucide-react`.
- Tab **JavaScript** di Code Playground beneran mengeksekusi kode di browser.
  Tab Python & Scratch masih simulasi (butuh runtime tambahan seperti Pyodide/Blockly
  kalau mau dibuat asli).
- Untuk build versi production: `npm run build`, hasilnya ada di folder `dist/`.
