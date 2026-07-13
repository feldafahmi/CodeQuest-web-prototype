import React, { useState } from "react";
import {
  Rocket, Star, Flame, Trophy, Award, Code2, Bot, Users, BarChart3,
  Settings, Search, Bell, Play, RotateCcw, Lock, CheckCircle2,
  Sparkles, Mail, KeyRound, Plus, GraduationCap, Copy, ArrowUp, ArrowRight,
  ArrowLeft as ArrowLeftIcon, Send, X, Castle, TreePine, Mountain, Cpu,
  CloudRain, Sun, Umbrella, Cat, Dog, Minus, Home, ClipboardList,
  FileBarChart2, TrendingUp, ToggleLeft, ToggleRight, User, BookOpen,
} from "lucide-react";

/* ---------------------------------------------------------------
   DESIGN TOKENS
--------------------------------------------------------------- */
const C = {
  bg: "#0A0D18",
  bgSoft: "#0D1120",
  panel: "#121732",
  panel2: "#1A2140",
  panelBorder: "rgba(255,255,255,0.07)",
  text: "#EFF1FB",
  muted: "#8D93B5",
  mutedSoft: "#6B7196",
  violet: "#8B6CFF",
  violetSoft: "rgba(139,108,255,0.14)",
  emerald: "#3ED9A0",
  emeraldSoft: "rgba(62,217,160,0.14)",
  amber: "#F5A93F",
  amberSoft: "rgba(245,169,63,0.14)",
  sky: "#4FC3F7",
  skySoft: "rgba(79,195,247,0.14)",
  rose: "#FF7A9E",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');`;

/* ---------------------------------------------------------------
   WORLD BASE DATA
--------------------------------------------------------------- */
const WORLDS = [
  { id: "algo", name: "Algorithm Island", tagline: "Urutan & langkah logis", icon: Castle, color: C.violet, soft: C.violetSoft, xp: 250, num: 1, mission: "Urutan Instruksi Robot" },
  { id: "logic", name: "Logic Forest", tagline: "Percabangan & kondisi", icon: TreePine, color: C.emerald, soft: C.emeraldSoft, xp: 130, num: 2, mission: "Pilih Jalan yang Benar" },
  { id: "loop", name: "Loop Valley", tagline: "Perulangan (loop)", icon: Mountain, color: C.amber, soft: C.amberSoft, xp: 150, num: 3, mission: "Kumpulkan Semua Koin" },
  { id: "ai", name: "AI Lab", tagline: "Dasar AI & machine learning", icon: Cpu, color: C.sky, soft: C.skySoft, xp: 130, num: 4, mission: "Klasifikasi Gambar" },
];

/* Setiap dunia punya 4 level. 3 level berupa quiz (2 soal / level, bisa dibuka ulang
   kalau sudah lolos), 1 level berupa misi interaktif khas dunia itu. */
const LEVELS = {
  algo: [
    { name: "Pengenalan Algoritma", type: "quiz", questions: [
        { q: "Apa itu algoritma?", options: ["Urutan langkah logis untuk menyelesaikan masalah", "Bahasa pemrograman", "Jenis komputer", "Nama aplikasi"], correct: 0, explain: "Algoritma adalah urutan langkah logis dan sistematis untuk menyelesaikan suatu masalah." },
        { q: "Manakah contoh algoritma dalam kehidupan sehari-hari?", options: ["Resep membuat mie instan", "Warna baju", "Merk sepatu", "Judul film"], correct: 0, explain: "Resep masakan adalah contoh algoritma: urutan langkah yang jelas dari awal sampai selesai." },
      ] },
    { name: "Flowchart Dasar", type: "quiz", questions: [
        { q: "Simbol apa yang dipakai untuk keputusan (decision) dalam flowchart?", options: ["Belah ketupat", "Lingkaran", "Persegi panjang", "Segitiga"], correct: 0, explain: "Belah ketupat (diamond) melambangkan titik keputusan/percabangan di flowchart." },
        { q: "Simbol oval/elips pada flowchart menandakan?", options: ["Mulai atau selesai", "Proses", "Input data", "Percabangan"], correct: 0, explain: "Oval dipakai untuk menandai titik mulai (start) dan selesai (end) sebuah flowchart." },
      ] },
    { name: "Urutan Langkah", type: "interactive" },
    { name: "Latihan Soal", type: "quiz", questions: [
        { q: "Urutan yang benar untuk membuat teh manis adalah?", options: ["Rebus air → masukkan teh → tambahkan gula → aduk", "Tambahkan gula → rebus air → aduk → masukkan teh", "Aduk → rebus air → masukkan teh → tambahkan gula", "Masukkan teh → aduk → rebus air → tambahkan gula"], correct: 0, explain: "Urutan langkah menentukan hasil akhir — air harus direbus dulu sebelum bahan lain dimasukkan." },
        { q: "Kenapa urutan langkah penting dalam algoritma?", options: ["Karena hasil bisa salah kalau urutannya keliru", "Karena biar keliatan panjang", "Tidak penting, bebas urutan apa saja", "Karena aturan baku pemrograman semata"], correct: 0, explain: "Algoritma bersifat sekuensial — kalau urutan diubah, hasil akhirnya bisa berbeda atau salah." },
      ] },
  ],
  logic: [
    { name: "Kondisi IF", type: "quiz", questions: [
        { q: "Kapan blok kode di dalam IF akan dijalankan?", options: ["Saat kondisi bernilai benar (true)", "Selalu dijalankan", "Saat kondisi salah", "Setiap detik"], correct: 0, explain: "Blok IF hanya dieksekusi kalau kondisinya bernilai true." },
        { q: "Contoh kondisi IF yang tepat dalam bahasa sehari-hari?", options: ["Jika hujan, maka bawa payung", "Selalu bawa payung", "Jangan pernah bawa payung", "Bawa payung kalau bosan"], correct: 0, explain: "\"Jika hujan, maka...\" adalah struktur kondisional IF yang jelas." },
      ] },
    { name: "IF - ELSE", type: "interactive" },
    { name: "Nested IF", type: "quiz", questions: [
        { q: "Nested IF artinya?", options: ["IF di dalam IF lainnya", "IF yang diulang terus", "IF tanpa kondisi", "IF khusus untuk loop"], correct: 0, explain: "Nested IF adalah IF yang diletakkan di dalam blok IF lainnya, untuk kondisi bertingkat." },
        { q: "Kapan nested IF berguna dipakai?", options: ["Saat ada lebih dari 2 kemungkinan kondisi bertingkat", "Saat cuma butuh 1 kondisi sederhana", "Saat program tidak butuh logika", "Saat ingin menghapus variabel"], correct: 0, explain: "Nested IF cocok untuk kondisi bertingkat, misalnya kategori nilai A/B/C/D." },
      ] },
    { name: "Logika Kompleks", type: "quiz", questions: [
        { q: "Operator apa yang butuh kedua kondisi sama-sama benar?", options: ["AND", "OR", "NOT", "EQUAL"], correct: 0, explain: "AND hanya bernilai true kalau kedua kondisi di kiri dan kanan sama-sama true." },
        { q: "Operator OR akan bernilai benar jika?", options: ["Salah satu dari kondisinya benar", "Kedua kondisi harus benar", "Tidak ada kondisi yang benar", "Selalu bernilai salah"], correct: 0, explain: "OR bernilai true kalau minimal salah satu kondisinya true." },
      ] },
  ],
  loop: [
    { name: "Pengantar Loop", type: "quiz", questions: [
        { q: "Loop digunakan untuk?", options: ["Mengulang instruksi tanpa menulis ulang kode", "Menghapus kode", "Membuat variabel baru", "Menghentikan program"], correct: 0, explain: "Loop membuat kita bisa menjalankan instruksi yang sama berulang kali secara efisien." },
        { q: "Apa risiko kalau loop tidak punya kondisi berhenti?", options: ["Infinite loop (berjalan selamanya)", "Program otomatis lebih cepat", "Tidak ada efek apa pun", "Program otomatis berhenti sendiri"], correct: 0, explain: "Tanpa kondisi berhenti yang jelas, loop bisa berjalan tanpa henti dan membuat program macet." },
      ] },
    { name: "For Loop", type: "quiz", questions: [
        { q: "For loop paling cocok dipakai saat?", options: ["Jumlah perulangan sudah diketahui", "Jumlah perulangan tidak diketahui", "Kita tidak butuh perulangan", "Hanya untuk kondisi IF"], correct: 0, explain: "For loop ideal saat kita sudah tahu persis berapa kali harus mengulang." },
        { q: "\"for i in range(5):\" akan mengulang sebanyak?", options: ["5 kali", "4 kali", "6 kali", "Tak terbatas"], correct: 0, explain: "range(5) menghasilkan 0,1,2,3,4 — total 5 kali perulangan." },
      ] },
    { name: "While Loop", type: "interactive" },
    { name: "Nested Loop", type: "quiz", questions: [
        { q: "Nested loop adalah?", options: ["Loop di dalam loop lainnya", "Loop tanpa kondisi", "Loop yang otomatis dihapus", "Loop khusus untuk AI"], correct: 0, explain: "Nested loop adalah loop yang diletakkan di dalam loop lain." },
        { q: "Nested loop sering dipakai untuk?", options: ["Mengolah data berbentuk grid/tabel (baris & kolom)", "Menghapus variabel", "Mengganti warna tampilan", "Menutup program"], correct: 0, explain: "Kombinasi loop luar & dalam pas untuk memproses struktur baris-kolom seperti tabel atau papan catur." },
      ] },
  ],
  ai: [
    { name: "Pengenalan AI", type: "quiz", questions: [
        { q: "AI (Artificial Intelligence) adalah?", options: ["Kecerdasan buatan yang meniru cara berpikir manusia", "Jenis loop dalam pemrograman", "Bahasa pemrograman baru", "Nama aplikasi chatting"], correct: 0, explain: "AI adalah sistem/program yang dirancang untuk meniru kemampuan berpikir dan belajar seperti manusia." },
        { q: "Contoh penerapan AI yang sering kita temui sehari-hari?", options: ["Rekomendasi video di YouTube", "Kalkulator biasa", "Kalender dinding", "Mesin tik manual"], correct: 0, explain: "Sistem rekomendasi berbasis AI mempelajari kebiasaan kita untuk menyarankan konten yang relevan." },
      ] },
    { name: "Data & Pola", type: "quiz", questions: [
        { q: "Mengapa data penting untuk melatih model AI?", options: ["Model belajar mengenali pola dari data", "Data tidak berpengaruh ke AI", "AI tidak pernah butuh data", "Data hanya untuk penyimpanan arsip"], correct: 0, explain: "Model AI belajar dengan mencari pola berulang di dalam data yang diberikan." },
        { q: "Data training yang banyak & variatif biasanya membuat model?", options: ["Lebih akurat mengenali pola baru", "Lebih lambat tanpa manfaat", "Tidak berubah sama sekali", "Otomatis menjadi error"], correct: 0, explain: "Semakin variatif datanya, semakin baik model mengenali kasus-kasus baru yang belum pernah dilihat." },
      ] },
    { name: "Machine Learning", type: "interactive" },
    { name: "Proyek AI", type: "quiz", questions: [
        { q: "Langkah pertama membuat proyek AI sederhana adalah?", options: ["Mengumpulkan & menyiapkan data", "Langsung deploy ke pengguna", "Menghapus semua kode", "Membeli komputer baru"], correct: 0, explain: "Proyek AI selalu dimulai dari mengumpulkan dan membersihkan data sebelum melatih model." },
        { q: "Akurasi model AI mengukur?", options: ["Seberapa sering prediksi model benar", "Kecepatan koneksi internet", "Warna tampilan aplikasi", "Jumlah baris kode"], correct: 0, explain: "Akurasi adalah persentase prediksi yang tepat dibanding total prediksi yang dilakukan model." },
      ] },
  ],
};

const STUDENTS = [
  { name: "Alex Putra", level: 12, progress: 82, xp: 3300, streak: 7 },
  { name: "Citra Dewi", level: 10, progress: 74, xp: 2890, streak: 12 },
  { name: "Bima Saputra", level: 9, progress: 68, xp: 2510, streak: 3 },
  { name: "Dinda Ayu", level: 8, progress: 61, xp: 2100, streak: 5 },
  { name: "Eka Wardana", level: 7, progress: 54, xp: 1870, streak: 1 },
];

const CLASSES = [
  { name: "XI IPA 1", code: "CQ-8X4K2", students: 30, avg: 85 },
  { name: "XI IPA 2", code: "CQ-3F9L1", students: 28, avg: 79 },
  { name: "XI IPA 3", code: "CQ-7R2Q8", students: 26, avg: 88 },
];

/* ---------------------------------------------------------------
   PRIMITIVES
--------------------------------------------------------------- */
function Btn({ children, variant = "primary", color = C.violet, style, disabled, ...props }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
    borderRadius: 12, padding: "10px 18px", cursor: disabled ? "not-allowed" : "pointer", border: "none",
    opacity: disabled ? 0.45 : 1, transition: "transform .15s ease, opacity .15s ease", ...style,
  };
  const variants = {
    primary: { background: color, color: "#0A0D18" },
    outline: { background: "transparent", color: C.text, border: `1px solid ${C.panelBorder}` },
    ghost: { background: "transparent", color: C.muted },
    soft: { background: `${color}22`, color },
  };
  return (
    <button {...props} disabled={disabled} style={{ ...base, ...variants[variant] }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      {children}
    </button>
  );
}

function XPBar({ value, color = C.violet, height = 8 }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", borderRadius: height, background: `linear-gradient(90deg, ${color}99, ${color})`, transition: "width .4s ease" }} />
    </div>
  );
}

function Card({ children, style, ...props }) {
  return (
    <div {...props} style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 18, padding: 20, ...style }}>
      {children}
    </div>
  );
}

function Badge({ children, color = C.violet }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color, background: `${color}1F`, padding: "4px 10px", borderRadius: 999 }}>
      {children}
    </span>
  );
}

function NumSquare({ n, color, size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: color, color: "#0A0D18", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: size * 0.5, flexShrink: 0 }}>
      {n}
    </div>
  );
}

function Logo({ size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: size + 12, height: size + 12, borderRadius: 10, background: `linear-gradient(135deg, ${C.violet}, ${C.sky})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Rocket size={size} color="#0A0D18" strokeWidth={2.4} />
      </div>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 0.2 }}>CodeQuest</span>
    </div>
  );
}

function Robot({ size = 90, color = C.violet }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${color}55, transparent 60%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Bot size={size * 0.55} color={color} strokeWidth={1.6} />
    </div>
  );
}

function WorldIcon({ world, size = 20 }) {
  const Icon = world.icon;
  return <Icon size={size} color={world.color} />;
}

function pct(worldId, unlocked) {
  return Math.round((unlocked[worldId] / LEVELS[worldId].length) * 100);
}

/* ---------------------------------------------------------------
   APP SHELL
--------------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("landing");

  // studentView: 'dashboard' | worldId | 'playground' | 'tutor' | 'leaderboard' | 'badge' | 'settings'
  const [studentView, setStudentView] = useState("dashboard");
  // teacherView: 'dashboard' | 'kelas' | 'misi' | 'siswa' | 'laporan' | 'pengaturan'
  const [teacherView, setTeacherView] = useState("dashboard");

  // progress = jumlah level yang sudah selesai per dunia (0..4)
  const [unlocked, setUnlocked] = useState({ algo: 2, logic: 1, loop: 2, ai: 2 });
  function advance(worldId, newCount) {
    setUnlocked((u) => ({ ...u, [worldId]: Math.max(u[worldId], Math.min(newCount, LEVELS[worldId].length)) }));
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, color: C.text, minHeight: 660, borderRadius: 20, overflow: "hidden", position: "relative" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }
        input:focus { outline: none; }
        button { font-family: inherit; }
      `}</style>

      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 50, display: "flex", gap: 6, background: "rgba(10,13,24,0.92)", border: `1px solid ${C.panelBorder}`, borderRadius: 999, padding: 4 }}>
        {[{ id: "landing", label: "Landing" }, { id: "login", label: "Login" }, { id: "student", label: "Siswa" }, { id: "teacher", label: "Guru" }].map((p) => (
          <button key={p.id} onClick={() => setPage(p.id)} style={{
            fontSize: 11, fontWeight: 600, padding: "6px 10px", borderRadius: 999, border: "none", cursor: "pointer",
            background: page === p.id ? C.violet : "transparent", color: page === p.id ? "#0A0D18" : C.muted, fontFamily: "'Space Grotesk', sans-serif",
          }}>{p.label}</button>
        ))}
      </div>

      {page === "landing" && <Landing onStart={() => setPage("login")} />}
      {page === "login" && <Login onLogin={(role) => setPage(role)} />}
      {page === "student" && <StudentArea view={studentView} setView={setStudentView} unlocked={unlocked} advance={advance} />}
      {page === "teacher" && <TeacherArea view={teacherView} setView={setTeacherView} unlocked={unlocked} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   LANDING
--------------------------------------------------------------- */
function Landing({ onStart }) {
  return (
    <div>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px" }}>
        <Logo />
        <div style={{ display: "flex", gap: 28, fontSize: 14, color: C.muted, fontWeight: 500 }}>
          <span>Fitur</span><span>Dunia</span><span>Tentang</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" onClick={onStart}>Masuk</Btn>
          <Btn onClick={onStart}>Daftar Gratis</Btn>
        </div>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, padding: "20px 40px 60px", alignItems: "center" }}>
        <div>
          <Badge color={C.violet}><Sparkles size={13} /> 4 dunia • 50+ misi interaktif</Badge>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, lineHeight: 1.08, margin: "18px 0", fontWeight: 700 }}>
            Belajar Coding & AI<br /><span style={{ color: C.violet }}>jadi Petualangan Seru</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 16, maxWidth: 460, lineHeight: 1.6 }}>
            Jelajahi 4 dunia dengan tantangan yang beda-beda: susun logika robot, pilih jalan yang tepat,
            kumpulkan koin dengan loop, sampai latih model AI kamu sendiri.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <Btn onClick={onStart}><Rocket size={16} /> Mulai Petualangan</Btn>
            <Btn variant="outline">Lihat Fitur</Btn>
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 40 }}>
            {[["4", "Dunia Petualangan"], ["50+", "Misi Interaktif"], ["1", "AI Tutor Siap Bantu"], ["∞", "Badge Dikoleksi"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 12, color: C.mutedSoft }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: `radial-gradient(circle at 50% 30%, ${C.violetSoft}, transparent 65%)`, borderRadius: 24, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, border: `1px solid ${C.panelBorder}` }}>
          <Robot size={110} />
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Halo, aku Codi 👋</div>
          <p style={{ color: C.muted, fontSize: 13, textAlign: "center", maxWidth: 260 }}>
            AI Tutor yang bakal nemenin kamu di setiap misi — nanya apa aja soal coding & AI, kapan aja.
          </p>
        </div>
      </div>

      <div style={{ padding: "0 40px 60px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, marginBottom: 18 }}>4 Fitur Utama</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {WORLDS.map((w) => (
            <Card key={w.id} style={{ borderColor: `${w.color}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <NumSquare n={w.num} color={w.color} />
                <div style={{ width: 34, height: 34, borderRadius: 9, background: w.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <WorldIcon world={w} size={18} />
                </div>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{w.name}</div>
              <div style={{ fontSize: 13, color: C.muted, margin: "6px 0 14px" }}>{w.tagline}</div>
              <XPBar value={50} color={w.color} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   LOGIN / REGISTER
--------------------------------------------------------------- */
function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 660 }}>
      <div style={{ padding: "48px 56px", display: "flex", flexDirection: "column" }}>
        <Logo />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 380 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
            {mode === "login" ? "Selamat Datang Kembali!" : "Buat Akun Baru"}
          </h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>
            {mode === "login" ? "Masuk untuk melanjutkan petualanganmu" : "Mulai petualangan coding-mu hari ini"}
          </p>

          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            {["student", "teacher"].map((r) => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: "10px 0", borderRadius: 12, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13,
                border: `1px solid ${role === r ? C.violet : C.panelBorder}`, background: role === r ? C.violetSoft : "transparent", color: role === r ? C.violet : C.muted,
              }}>{r === "student" ? "Siswa" : "Guru"}</button>
            ))}
          </div>

          <label style={{ fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>Email atau Username</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
            <Mail size={16} color={C.mutedSoft} />
            <input placeholder="Masukkan email atau username" style={{ background: "transparent", border: "none", color: C.text, fontSize: 14, width: "100%" }} />
          </div>

          <label style={{ fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>Password</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "12px 14px", marginBottom: 22 }}>
            <KeyRound size={16} color={C.mutedSoft} />
            <input type="password" placeholder="Masukkan password" style={{ background: "transparent", border: "none", color: C.text, fontSize: 14, width: "100%" }} />
          </div>

          <Btn style={{ width: "100%", padding: "13px 0" }} onClick={() => onLogin(role)}>
            {mode === "login" ? "Masuk" : "Daftar"} <ArrowRight size={15} />
          </Btn>

          <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: C.muted }}>
            {mode === "login" ? (
              <>Belum punya akun? <span onClick={() => setMode("register")} style={{ color: C.violet, cursor: "pointer", fontWeight: 600 }}>Daftar di sini</span></>
            ) : (
              <>Sudah punya akun? <span onClick={() => setMode("login")} style={{ color: C.violet, cursor: "pointer", fontWeight: 600 }}>Masuk di sini</span></>
            )}
          </div>
        </div>
      </div>

      <div style={{ background: `radial-gradient(circle at 50% 40%, ${C.violetSoft}, ${C.bgSoft} 70%)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 18, borderLeft: `1px solid ${C.panelBorder}` }}>
        <Robot size={140} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20 }}>
          {role === "student" ? "Siap lanjut misi hari ini?" : "Pantau progres kelasmu"}
        </div>
        <p style={{ color: C.muted, fontSize: 13, maxWidth: 260, textAlign: "center" }}>
          {role === "student" ? "Selesaikan tantangan, kumpulkan XP, dan naik ke level berikutnya." : "Buat kode kelas, lihat progres tiap siswa, dan beri misi baru."}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARED SIDEBAR (satu-satunya navigasi, tidak ada bottom bar lagi)
--------------------------------------------------------------- */
function SidebarItem({ icon: Icon, label, active, onClick, color }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 500,
      background: active ? `${color || C.violet}1F` : "transparent", color: active ? (color || C.violet) : C.muted,
    }}>
      <Icon size={15} /> {label}
    </div>
  );
}

function StudentSidebar({ view, setView }) {
  return (
    <div style={{ width: 212, background: C.bgSoft, borderRight: `1px solid ${C.panelBorder}`, padding: 18, display: "flex", flexDirection: "column", minHeight: 660, flexShrink: 0 }}>
      <Logo size={16} />
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 2 }}>
        <SidebarItem icon={Home} label="Dashboard" active={view === "dashboard"} onClick={() => setView("dashboard")} />
      </div>
      <div style={{ fontSize: 11, color: C.mutedSoft, margin: "14px 4px 4px", fontWeight: 600, letterSpacing: 0.4 }}>DUNIA</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {WORLDS.map((w) => (
          <SidebarItem key={w.id} icon={w.icon} label={w.name} color={w.color} active={view === w.id} onClick={() => setView(w.id)} />
        ))}
      </div>
      <div style={{ height: 1, background: C.panelBorder, margin: "14px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <SidebarItem icon={Code2} label="Code Playground" active={view === "playground"} onClick={() => setView("playground")} />
        <SidebarItem icon={Bot} label="AI Tutor" active={view === "tutor"} onClick={() => setView("tutor")} />
        <SidebarItem icon={Trophy} label="Leaderboard" active={view === "leaderboard"} onClick={() => setView("leaderboard")} />
        <SidebarItem icon={Award} label="Badge" active={view === "badge"} onClick={() => setView("badge")} />
        <SidebarItem icon={Settings} label="Pengaturan" active={view === "settings"} onClick={() => setView("settings")} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, background: C.panel }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.violetSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={15} color={C.violet} />
        </div>
        <div><div style={{ fontSize: 12, fontWeight: 600 }}>Alex</div><div style={{ fontSize: 10, color: C.mutedSoft }}>Level 12</div></div>
      </div>
    </div>
  );
}

function TeacherSidebar({ view, setView }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "kelas", label: "Kelas", icon: GraduationCap },
    { id: "misi", label: "Misi", icon: ClipboardList },
    { id: "siswa", label: "Siswa", icon: Users },
    { id: "laporan", label: "Laporan", icon: FileBarChart2 },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];
  return (
    <div style={{ width: 212, background: C.bgSoft, borderRight: `1px solid ${C.panelBorder}`, padding: 18, display: "flex", flexDirection: "column", minHeight: 660, flexShrink: 0 }}>
      <Logo size={16} />
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {items.map((it) => (
          <SidebarItem key={it.id} icon={it.icon} label={it.label} active={view === it.id} onClick={() => setView(it.id)} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, background: C.panel }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.skySoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GraduationCap size={15} color={C.sky} />
        </div>
        <div><div style={{ fontSize: 12, fontWeight: 600 }}>Bapak Andi</div><div style={{ fontSize: 10, color: C.mutedSoft }}>Guru</div></div>
      </div>
    </div>
  );
}

function TopBar({ right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "16px 24px", borderBottom: `1px solid ${C.panelBorder}`, gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 999, padding: "8px 14px" }}>
        <Search size={14} color={C.mutedSoft} />
        <input placeholder="Cari..." style={{ background: "transparent", border: "none", color: C.text, fontSize: 13, width: 110 }} />
      </div>
      <Bell size={18} color={C.muted} />
      {right}
    </div>
  );
}

/* ---------------------------------------------------------------
   STUDENT AREA
--------------------------------------------------------------- */
function StudentArea({ view, setView, unlocked, advance }) {
  const world = WORLDS.find((w) => w.id === view);
  return (
    <div style={{ display: "flex" }}>
      <StudentSidebar view={view} setView={setView} />
      <div style={{ flex: 1, minHeight: 660, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <div style={{ flex: 1, padding: "22px 26px", overflowY: "auto", maxHeight: 610 }}>
          {view === "dashboard" && <StudentHome unlocked={unlocked} onOpenWorld={setView} />}
          {view === "leaderboard" && <Leaderboard />}
          {view === "tutor" && <AiTutor />}
          {view === "badge" && <BadgePage unlocked={unlocked} />}
          {view === "settings" && <SettingsPage role="student" />}
          {view === "playground" && <CodePlayground color={C.violet} />}
          {world && <WorldPage key={world.id} world={world} unlocked={unlocked} advance={advance} />}
        </div>
      </div>
    </div>
  );
}

function StudentHome({ unlocked, onOpenWorld }) {
  return (
    <>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, background: `linear-gradient(120deg, ${C.violetSoft}, transparent)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Robot size={64} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Halo, Alex! 👋</div>
            <div style={{ fontSize: 13, color: C.muted }}>Level 12 • Code Explorer</div>
          </div>
        </div>
        <div style={{ textAlign: "right", minWidth: 160 }}>
          <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 6 }}>2.450 / 3.300 XP</div>
          <XPBar value={74} color={C.amber} />
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
        <StatCard icon={Flame} label="Streak" value="7 Hari" color={C.rose} />
        <StatCard icon={Award} label="Badge" value="7 Koleksi" color={C.emerald} />
        <StatCard icon={Trophy} label="Peringkat Kelas" value="#3" color={C.sky} />
      </div>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 12 }}>Misi Hari Ini</div>
        {["Selesaikan misi di Algorithm Island", "Kerjakan quiz di Logic Forest", "Tanya AI Tutor tentang loop"].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.panelBorder}` : "none" }}>
            <div style={{ width: 18, height: 18, borderRadius: 6, border: `1.5px solid ${C.muted}` }} />
            <span style={{ fontSize: 14 }}>{m}</span>
          </div>
        ))}
      </Card>

      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 12 }}>Pilih Dunia Petualangan</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {WORLDS.map((w) => {
          const p = pct(w.id, unlocked);
          return (
            <Card key={w.id} onClick={() => onOpenWorld(w.id)} style={{ cursor: "pointer", borderColor: `${w.color}33` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: w.soft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <WorldIcon world={w} size={19} />
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14 }}>{w.name}</div>
              <div style={{ fontSize: 12, color: C.mutedSoft, margin: "3px 0 10px" }}>{w.mission}</div>
              <div style={{ margin: "0 0 6px" }}><XPBar value={p} color={w.color} /></div>
              <div style={{ fontSize: 12, color: C.mutedSoft }}>{p}% selesai</div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={19} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>{value}</div>
      </div>
    </Card>
  );
}

function Leaderboard() {
  const sorted = [...STUDENTS].sort((a, b) => b.xp - a.xp);
  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Leaderboard Kelas XI IPA 1</div>
      {sorted.map((s, i) => (
        <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 8px", borderRadius: 12, background: i === 0 ? C.violetSoft : "transparent", marginBottom: 4 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13,
            background: i < 3 ? C.amber : "rgba(255,255,255,0.08)", color: i < 3 ? "#0A0D18" : C.muted,
          }}>{i + 1}</div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.panel2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={16} color={C.muted} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: C.mutedSoft }}>Level {s.level} • Streak {s.streak} hari</div>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: C.amber, fontSize: 14 }}>{s.xp} XP</div>
        </div>
      ))}
    </Card>
  );
}

function AiTutor() {
  const topics = ["Algoritma", "Loop", "Percabangan", "AI", "Python", "JavaScript"];
  const [messages, setMessages] = useState([
    { from: "bot", text: "Halo! Tanyakan apa saja tentang coding & AI." },
    { from: "user", text: "Kenapa kita menggunakan loop?" },
    { from: "bot", text: "Loop digunakan untuk menjalankan perintah berulang kali tanpa harus menulis ulang kode. Contoh: for, while, dan repeat." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }, { from: "bot", text: "Pertanyaan bagus! Coba mulai dari contoh sederhana dulu, lalu kita bahas step by step ya 🙂" }]);
    setInput("");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 16 }}>
      <Card style={{ display: "flex", flexDirection: "column", height: 440 }}>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 6 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.5, background: m.from === "user" ? C.violet : C.panel2, color: m.from === "user" ? "#0A0D18" : C.text }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Tulis pertanyaanmu..." style={{ flex: 1, background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "10px 14px", color: C.text, fontSize: 13 }} />
          <Btn onClick={send}><Send size={15} /></Btn>
        </div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Topik Populer</div>
        {topics.map((t) => (
          <div key={t} onClick={() => setInput(`Jelaskan tentang ${t}`)} style={{ fontSize: 13, color: C.muted, padding: "8px 4px", cursor: "pointer" }}>{t}</div>
        ))}
      </Card>
    </div>
  );
}

function BadgePage({ unlocked }) {
  const badges = [
    { name: "Code Explorer", desc: "Selesaikan level pertama di dunia manapun", earned: true, color: C.violet },
    { name: "Logic Master", desc: "Selesaikan semua level di Logic Forest", earned: unlocked.logic >= LEVELS.logic.length, color: C.emerald },
    { name: "Loop Champion", desc: "Selesaikan semua level di Loop Valley", earned: unlocked.loop >= LEVELS.loop.length, color: C.amber },
    { name: "AI Explorer", desc: "Selesaikan semua level di AI Lab", earned: unlocked.ai >= LEVELS.ai.length, color: C.sky },
    { name: "7 Hari Beruntun", desc: "Login dan belajar 7 hari berturut-turut", earned: true, color: C.rose },
    { name: "Algorithm Master", desc: "Selesaikan semua level di Algorithm Island", earned: unlocked.algo >= LEVELS.algo.length, color: C.violet },
  ];
  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 4 }}>Badge & Achievement</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 18 }}>{badges.filter((b) => b.earned).length} dari {badges.length} badge terkumpul</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {badges.map((b) => (
          <div key={b.name} style={{ border: `1px solid ${C.panelBorder}`, borderRadius: 14, padding: 16, textAlign: "center", opacity: b.earned ? 1 : 0.45 }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: `${b.color}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              {b.earned ? <Award size={24} color={b.color} /> : <Lock size={20} color={C.mutedSoft} />}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
            <div style={{ fontSize: 11, color: C.mutedSoft }}>{b.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SettingsPage({ role }) {
  const [notif, setNotif] = useState(true);
  const [weekly, setWeekly] = useState(true);
  const [publicProfile, setPublicProfile] = useState(role === "student");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Profil</div>
        <label style={{ fontSize: 12, color: C.muted }}>Nama</label>
        <input defaultValue={role === "student" ? "Alex Putra" : "Andi Wijaya"} style={{ width: "100%", background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 13, margin: "6px 0 14px" }} />
        <label style={{ fontSize: 12, color: C.muted }}>Email</label>
        <input defaultValue={role === "student" ? "alex.putra@email.com" : "andi.wijaya@sekolah.sch.id"} style={{ width: "100%", background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 13, margin: "6px 0 14px" }} />
        <label style={{ fontSize: 12, color: C.muted }}>{role === "student" ? "Sekolah" : "Mata Pelajaran"}</label>
        <input defaultValue={role === "student" ? "SMA Negeri 1" : "Informatika"} style={{ width: "100%", background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 13, margin: "6px 0 18px" }} />
        <Btn>Simpan Perubahan</Btn>
      </Card>
      <Card>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Preferensi</div>
        <ToggleRow label="Notifikasi misi harian" value={notif} onChange={setNotif} />
        <ToggleRow label="Ringkasan progress mingguan" value={weekly} onChange={setWeekly} />
        <ToggleRow label={role === "student" ? "Tampilkan profil di leaderboard" : "Profil publik untuk siswa"} value={publicProfile} onChange={setPublicProfile} />
      </Card>
    </div>
  );
}

function ToggleRow({ label, value, onChange }) {
  const Icon = value ? ToggleRight : ToggleLeft;
  return (
    <div onClick={() => onChange(!value)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 4px", borderTop: `1px solid ${C.panelBorder}`, cursor: "pointer" }}>
      <span style={{ fontSize: 13 }}>{label}</span>
      <Icon size={30} color={value ? C.violet : C.mutedSoft} />
    </div>
  );
}

/* ---------------------------------------------------------------
   WORLD PAGE (materi + soal per level, bisa diakses ulang)
--------------------------------------------------------------- */
function WorldPage({ world, unlocked, advance }) {
  const levels = LEVELS[world.id];
  const currentUnlocked = unlocked[world.id];
  const [selected, setSelected] = useState(Math.min(currentUnlocked, levels.length - 1));

  function selectLevel(i) {
    if (i > currentUnlocked) return; // masih terkunci
    setSelected(i);
  }

  function handleComplete() {
    if (selected === currentUnlocked && currentUnlocked < levels.length) {
      const next = currentUnlocked + 1;
      advance(world.id, next);
      if (next < levels.length) setSelected(next);
    }
  }

  const p = pct(world.id, unlocked);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NumSquare n={world.num} color={world.color} size={34} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22 }}>{world.name}</div>
            <div style={{ color: C.muted, fontSize: 13 }}>{world.tagline}</div>
          </div>
        </div>
        <Badge color={world.color}><Star size={13} /> {world.xp} XP</Badge>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 18 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Progress Kamu</div>
          <XPBar value={p} color={world.color} />
          <div style={{ fontSize: 12, color: C.mutedSoft, margin: "6px 0 16px" }}>{p}%</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Materi</div>
          {levels.map((l, i) => {
            const done = i < currentUnlocked;
            const isCurrent = i === currentUnlocked && i < levels.length;
            const locked = i > currentUnlocked;
            const isSelected = i === selected;
            return (
              <div key={l.name} onClick={() => selectLevel(i)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 6px", borderRadius: 8, marginTop: 2,
                cursor: locked ? "not-allowed" : "pointer",
                background: isSelected ? `${world.color}14` : "transparent",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: done ? world.color : "rgba(255,255,255,0.05)",
                  border: isCurrent ? `1.5px solid ${world.color}` : "none",
                  color: done ? "#0A0D18" : isCurrent ? world.color : C.mutedSoft, fontSize: 11, fontWeight: 700,
                }}>
                  {done ? <CheckCircle2 size={13} /> : locked ? <Lock size={11} /> : i + 1}
                </div>
                <span style={{ fontSize: 13, color: locked ? C.mutedSoft : C.text, fontWeight: isSelected ? 600 : 400, flex: 1 }}>{l.name}</span>
                {l.type === "quiz" && !locked && <BookOpen size={12} color={C.mutedSoft} />}
              </div>
            );
          })}
        </Card>

        <div>
          <LevelContent world={world} levelIndex={selected} onComplete={handleComplete} isCurrent={selected === currentUnlocked} />
          <div style={{ marginTop: 16 }}><CodePlayground color={world.color} /></div>
        </div>
      </div>
    </div>
  );
}

function LevelContent({ world, levelIndex, onComplete, isCurrent }) {
  const level = LEVELS[world.id][levelIndex];
  if (!level) return null;

  if (level.type === "quiz") {
    return <QuizLevel key={`${world.id}-${levelIndex}`} level={level} color={world.color} onComplete={onComplete} isCurrent={isCurrent} />;
  }
  // interactive — beda tiap dunia
  if (world.id === "algo") return <MissionSequence world={world} onComplete={onComplete} />;
  if (world.id === "logic") return <MissionBranch world={world} onComplete={onComplete} />;
  if (world.id === "loop") return <MissionLoop world={world} onComplete={onComplete} />;
  if (world.id === "ai") return <MissionAI world={world} onComplete={onComplete} />;
  return null;
}

function QuizLevel({ level, color, onComplete, isCurrent }) {
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const q = level.questions[qi];

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (qi < level.questions.length - 1) {
      setQi(qi + 1);
      setSelected(null);
    } else {
      setDone(true);
      if (isCurrent) onComplete && onComplete();
    }
  }

  function restart() {
    setQi(0); setSelected(null); setDone(false); setCorrectCount(0);
  }

  if (done) {
    return (
      <Card>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 6 }}>Materi: {level.name}</div>
        <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}1F`, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color, marginBottom: 4 }}>Selesai! 🎉</div>
          <div style={{ fontSize: 13, color: C.muted }}>Skor kamu: {correctCount}/{level.questions.length} benar.</div>
        </div>
        <Btn variant="outline" onClick={restart}><RotateCcw size={14} /> Ulangi Materi Ini</Btn>
      </Card>
    );
  }

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Materi: {level.name}</div>
        <span style={{ fontSize: 12, color: C.mutedSoft }}>Soal {qi + 1}/{level.questions.length}</span>
      </div>
      <div style={{ fontSize: 15, margin: "14px 0" }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isRight = selected !== null && i === q.correct;
          const isWrong = isSelected && i !== q.correct;
          return (
            <div key={i} onClick={() => choose(i)} style={{
              padding: "10px 14px", borderRadius: 10, fontSize: 13.5, cursor: selected === null ? "pointer" : "default",
              border: `1.5px solid ${isRight ? color : isWrong ? C.rose : C.panelBorder}`,
              background: isRight ? `${color}14` : isWrong ? `${C.rose}14` : "transparent",
            }}>{opt}</div>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: C.panel2, fontSize: 13, color: C.muted }}>
          💡 {q.explain}
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <Btn color={color} disabled={selected === null} onClick={next}>
          {qi < level.questions.length - 1 ? "Soal Berikutnya" : "Selesai"} <ArrowRight size={14} />
        </Btn>
      </div>
    </Card>
  );
}

/* --- Mission: Algorithm Island — sequencing --- */
function MissionSequence({ world, onComplete }) {
  const [seq, setSeq] = useState([]);
  const [ran, setRan] = useState(false);
  const options = [
    { l: "Maju", icon: ArrowUp },
    { l: "Belok Kanan", icon: ArrowRight },
    { l: "Belok Kiri", icon: ArrowLeftIcon },
  ];
  function run() {
    setRan(true);
    onComplete && onComplete();
  }
  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 4 }}>Misi: {world.mission}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Susun langkah-langkah berikut agar robot sampai ke rumah.</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 18, maxWidth: 300 }}>
        {["🤖", "", "🌳", "", "🏠"].map((e, i) => (
          <div key={i} style={{ height: 42, borderRadius: 8, background: C.panel2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{e}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Instruksi Tersedia</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {options.map((o) => (
              <Btn key={o.l} variant="soft" color={world.color} onClick={() => { setSeq((s) => [...s, o.l]); setRan(false); }} style={{ justifyContent: "flex-start" }}>
                <o.icon size={14} /> {o.l}
              </Btn>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Urutan Kamu</div>
          <div style={{ background: C.panel2, borderRadius: 12, padding: 12, minHeight: 140, display: "flex", flexDirection: "column", gap: 6 }}>
            {seq.length === 0 && <span style={{ fontSize: 12, color: C.mutedSoft }}>Klik instruksi di sebelah kiri...</span>}
            {seq.map((s, i) => <div key={i} style={{ fontSize: 13, background: C.panel, borderRadius: 8, padding: "6px 10px" }}>{i + 1}. {s}</div>)}
          </div>
        </div>
      </div>

      {ran && <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: `${world.color}1F`, color: world.color, fontSize: 13, fontWeight: 600 }}>🎉 Benar! Robot berhasil mencapai rumah.</div>}

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Btn variant="outline" onClick={() => { setSeq([]); setRan(false); }}><RotateCcw size={14} /> Reset</Btn>
        <Btn color={world.color} disabled={seq.length === 0} onClick={run}><Play size={14} /> Jalankan</Btn>
      </div>
    </Card>
  );
}

/* --- Mission: Logic Forest — if/else branching --- */
function MissionBranch({ world, onComplete }) {
  const [choice, setChoice] = useState(null);
  const correct = "payung";
  function pick(id) {
    setChoice(id);
    if (id === correct) onComplete && onComplete();
  }
  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 4 }}>Misi: {world.mission}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Bantu karakter memilih jalan yang benar berdasarkan kondisi.</div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.panel2, borderRadius: 12, padding: 14, marginBottom: 18 }}>
        <CloudRain size={22} color={world.color} />
        <span style={{ fontSize: 14 }}>Jika <b>hujan</b>, apa yang harus dilakukan karakter?</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[{ id: "payung", label: "Pakai Payung", icon: Umbrella }, { id: "topi", label: "Pakai Topi", icon: Sun }].map((o) => (
          <div key={o.id} onClick={() => pick(o.id)} style={{
            border: `1.5px solid ${choice === o.id ? world.color : C.panelBorder}`, borderRadius: 14, padding: 20,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer",
            background: choice === o.id ? `${world.color}14` : "transparent",
          }}>
            <o.icon size={30} color={choice === o.id ? world.color : C.muted} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{o.label}</span>
          </div>
        ))}
      </div>

      {choice && (
        <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, background: choice === correct ? `${world.color}1F` : `${C.rose}1F`, fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: choice === correct ? world.color : C.rose, marginBottom: 4 }}>{choice === correct ? "Benar! 🎉" : "Coba lagi"}</div>
          <div style={{ color: C.muted }}>Penjelasan: karena kondisi hujan = benar, maka pilih "Pakai Payung".</div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Btn variant="outline" onClick={() => setChoice(null)}><RotateCcw size={14} /> Reset</Btn>
      </div>
    </Card>
  );
}

/* --- Mission: Loop Valley — repeat block collects coins --- */
function MissionLoop({ world, onComplete }) {
  const total = 5;
  const [count, setCount] = useState(3);
  const [ran, setRan] = useState(false);
  const collected = ran ? Math.min(count, total) : 0;

  function run() {
    setRan(true);
    if (count >= total) onComplete && onComplete();
  }

  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 4 }}>Misi: {world.mission}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Gunakan loop untuk membantu karakter mengumpulkan semua koin.</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            background: i < collected ? `${world.color}22` : C.panel2, opacity: i < collected ? 0.4 : 1,
          }}>🪙</div>
        ))}
      </div>

      <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Blok Kode</div>
      <div style={{ background: C.panel2, borderRadius: 12, padding: 14, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${world.color}22`, color: world.color, borderRadius: 8, padding: "8px 12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, width: "fit-content" }}>
          repeat
          <button onClick={() => { setCount((c) => Math.max(1, c - 1)); setRan(false); }} style={{ background: "rgba(0,0,0,0.2)", border: "none", borderRadius: 6, width: 20, height: 20, color: world.color, cursor: "pointer" }}><Minus size={12} /></button>
          <span>{count}</span>
          <button onClick={() => { setCount((c) => Math.min(total, c + 1)); setRan(false); }} style={{ background: "rgba(0,0,0,0.2)", border: "none", borderRadius: 6, width: 20, height: 20, color: world.color, cursor: "pointer" }}><Plus size={12} /></button>
          times
        </div>
        <div style={{ marginLeft: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ background: C.panel, borderRadius: 8, padding: "6px 12px", fontSize: 13, width: "fit-content" }}>Maju</div>
          <div style={{ background: C.panel, borderRadius: 8, padding: "6px 12px", fontSize: 13, width: "fit-content" }}>Ambil Koin</div>
        </div>
      </div>

      {ran && (
        <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: `${world.color}1F`, color: world.color, fontSize: 13, fontWeight: 600 }}>
          {collected >= total ? "🎉 Semua koin terkumpul!" : `Terkumpul ${collected}/${total} koin — tambah jumlah repeat biar semua koin keambil.`}
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <Btn variant="outline" onClick={() => setRan(false)}><RotateCcw size={14} /> Reset</Btn>
        <Btn color={world.color} onClick={run}><Play size={14} /> Jalankan</Btn>
      </div>
    </Card>
  );
}

/* --- Mission: AI Lab — image classification --- */
function MissionAI({ world, onComplete }) {
  const [tab, setTab] = useState("data");
  const [prediction, setPrediction] = useState(null);

  function guess(label) {
    setPrediction(label);
    if (label === "Kucing") onComplete && onComplete();
  }

  return (
    <Card>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 4 }}>Misi: {world.mission}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Latih model untuk membedakan kucing dan anjing.</div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[{ id: "data", label: "Data Training" }, { id: "uji", label: "Uji Model" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 999, cursor: "pointer",
            border: `1px solid ${tab === t.id ? world.color : C.panelBorder}`,
            background: tab === t.id ? `${world.color}22` : "transparent", color: tab === t.id ? world.color : C.muted,
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "data" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Kucing</div>
            <div style={{ display: "flex", gap: 8 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ width: 48, height: 48, borderRadius: 10, background: `${world.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cat size={22} color={world.color} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Anjing</div>
            <div style={{ display: "flex", gap: 8 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ width: 48, height: 48, borderRadius: 10, background: `${C.amber}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Dog size={22} color={C.amber} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "uji" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Gambar Uji</div>
            <div style={{ width: 110, height: 110, borderRadius: 14, background: `${world.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Cat size={48} color={world.color} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="soft" color={world.color} onClick={() => guess("Kucing")}>Kucing</Btn>
              <Btn variant="outline" onClick={() => guess("Anjing")}>Anjing</Btn>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.mutedSoft, marginBottom: 8 }}>Hasil Prediksi</div>
            <div style={{ background: C.panel2, borderRadius: 12, padding: 16 }}>
              {!prediction ? <span style={{ fontSize: 12, color: C.mutedSoft }}>Pilih klasifikasi di sebelah kiri...</span> : (
                <>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: prediction === "Kucing" ? world.color : C.rose, fontSize: 15, marginBottom: 4 }}>
                    Prediksi: {prediction}
                  </div>
                  <div style={{ fontSize: 12, color: C.muted }}>{prediction === "Kucing" ? "Benar! Akurasi model: 87%" : "Kurang tepat, ini sebenarnya kucing. Coba lagi."}</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ---------------------------------------------------------------
   CODE PLAYGROUND — beneran run JavaScript
--------------------------------------------------------------- */
const DEFAULT_SNIPPETS = {
  JavaScript: `// Program sederhana — coba edit lalu klik Jalankan
for (let i = 0; i < 5; i++) {
  console.log("Hello CodeQuest!", i);
}`,
  Python: `# Python belum bisa dieksekusi langsung di browser.
# Tampilan ini simulasi — kode JavaScript di tab sebelah beneran jalan.
for i in range(5):
    print("Hello CodeQuest!", i)`,
  Scratch: `// Mode blok (Scratch) belum tersedia di prototype ini.
// Nanti akan pakai library block-based seperti Blockly.`,
};

function CodePlayground({ color = C.violet }) {
  const [lang, setLang] = useState("JavaScript");
  const [code, setCode] = useState(DEFAULT_SNIPPETS.JavaScript);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(false);

  function switchLang(l) {
    setLang(l);
    setCode(DEFAULT_SNIPPETS[l]);
    setOutput(null);
    setError(false);
  }

  function run() {
    if (lang !== "JavaScript") {
      setOutput(["⚠️ Bahasa ini belum didukung untuk eksekusi asli di prototype ini.", "Ganti ke tab JavaScript untuk coba jalanin kode sungguhan."]);
      setError(true);
      return;
    }
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map((a) => {
        try { return typeof a === "object" ? JSON.stringify(a) : String(a); }
        catch { return String(a); }
      }).join(" "));
    };
    try {
      const fn = new Function(code);
      fn();
      setError(false);
    } catch (e) {
      logs.push("Error: " + e.message);
      setError(true);
    } finally {
      console.log = originalLog;
    }
    setOutput(logs.length ? logs : ["(tidak ada output — coba pakai console.log(...))"]);
  }

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Code Playground</div>
        <div style={{ display: "flex", gap: 6 }}>
          {["JavaScript", "Python", "Scratch"].map((l) => (
            <button key={l} onClick={() => switchLang(l)} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: `1px solid ${lang === l ? color : C.panelBorder}`, background: lang === l ? `${color}22` : "transparent", color: lang === l ? color : C.muted }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{
            background: C.panel2, borderRadius: 12, padding: 14, fontFamily: "monospace", fontSize: 13, lineHeight: 1.7,
            color: C.text, border: `1px solid ${C.panelBorder}`, resize: "vertical", minHeight: 130, width: "100%",
          }}
        />
        <div style={{ background: C.panel2, borderRadius: 12, padding: 14, fontFamily: "monospace", fontSize: 13, color: error ? C.rose : C.emerald, lineHeight: 1.7, minHeight: 130, overflowY: "auto" }}>
          {output ? output.map((o, i) => <div key={i}>{o}</div>) : <span style={{ color: C.mutedSoft }}>Output akan muncul di sini...</span>}
        </div>
      </div>
      <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
        <Btn color={color} onClick={run}><Play size={14} /> Jalankan</Btn>
        <Btn variant="outline" onClick={() => { setOutput(null); setError(false); }}><RotateCcw size={14} /> Bersihkan Output</Btn>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------
   TEACHER AREA — semua menu terisi
--------------------------------------------------------------- */
function TeacherArea({ view, setView, unlocked }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <TeacherSidebar view={view} setView={setView} />
      <div style={{ flex: 1, minHeight: 660, display: "flex", flexDirection: "column" }}>
        <TopBar right={<Btn onClick={() => setShowModal(true)}><Plus size={14} /> Buat Kelas</Btn>} />
        <div style={{ flex: 1, padding: "22px 26px", overflowY: "auto", maxHeight: 610 }}>
          {view === "dashboard" && <TeacherHome unlocked={unlocked} />}
          {view === "kelas" && <TeacherKelas onCreate={() => setShowModal(true)} />}
          {view === "misi" && <TeacherMisi unlocked={unlocked} />}
          {view === "siswa" && <TeacherSiswa />}
          {view === "laporan" && <TeacherLaporan unlocked={unlocked} />}
          {view === "pengaturan" && <SettingsPage role="teacher" />}
        </div>
      </div>
      {showModal && <CreateClassModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function TeacherHome({ unlocked }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.skySoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GraduationCap size={26} color={C.sky} />
        </div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Halo, Bapak Andi 👋</div>
          <div style={{ fontSize: 13, color: C.muted }}>Kelas XI IPA 1</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        <StatCard icon={Users} label="Jumlah Siswa" value="30" color={C.violet} />
        <StatCard icon={BarChart3} label="Rata-rata Kelas" value="85%" color={C.emerald} />
        <StatCard icon={Trophy} label="Total XP Kelas" value="120K" color={C.amber} />
        <StatCard icon={Rocket} label="Dunia Aktif" value="4" color={C.sky} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Progress per Dunia</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 22, height: 140 }}>
            {WORLDS.map((w) => {
              const p = pct(w.id, unlocked);
              return (
                <div key={w.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 11, color: C.mutedSoft }}>{p}%</div>
                  <div style={{ width: "100%", maxWidth: 34, height: `${Math.max(p, 4)}%`, borderRadius: 8, background: `linear-gradient(180deg, ${w.color}, ${w.color}66)` }} />
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>{w.name.split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Aktivitas Terbaru</div>
          {[["Bima menyelesaikan misi di Loop Valley", "10 menit lalu", C.emerald], ["Citra mendapatkan badge Code Explorer", "15 menit lalu", C.amber], ["Dinda menyelesaikan quiz di AI Lab", "20 menit lalu", C.sky]].map(([t, time, c], i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.panelBorder}` : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, marginTop: 5 }} />
              <div><div style={{ fontSize: 13 }}>{t}</div><div style={{ fontSize: 11, color: C.mutedSoft }}>{time}</div></div>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Daftar Siswa</div>
        <StudentTable />
      </Card>
    </>
  );
}

function StudentTable() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "0 8px 10px", fontSize: 12, color: C.mutedSoft, borderBottom: `1px solid ${C.panelBorder}` }}>
        <div>Nama</div><div>Level</div><div>Progress</div><div>XP</div><div>Streak</div>
      </div>
      {STUDENTS.map((s) => (
        <div key={s.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "12px 8px", fontSize: 13, borderBottom: `1px solid ${C.panelBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.panel2, display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={14} color={C.muted} /></div>
            {s.name}
          </div>
          <div>{s.level}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 60 }}><XPBar value={s.progress} height={6} /></div>
            <span style={{ fontSize: 11, color: C.mutedSoft }}>{s.progress}%</span>
          </div>
          <div style={{ color: C.amber, fontWeight: 600 }}>{s.xp}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.rose }}><Flame size={13} /> {s.streak}</div>
        </div>
      ))}
    </>
  );
}

function TeacherKelas({ onCreate }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18 }}>Kelas Saya</div>
        <Btn onClick={onCreate}><Plus size={14} /> Buat Kelas</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {CLASSES.map((c, i) => (
          <Card key={c.name}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: [C.violetSoft, C.emeraldSoft, C.skySoft][i % 3], display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap size={20} color={[C.violet, C.emerald, C.sky][i % 3]} />
              </div>
              <Badge color={C.amber}>{c.avg}% rata-rata</Badge>
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: C.muted, margin: "4px 0 14px" }}>{c.students} siswa terdaftar</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panel2, borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: 1, fontSize: 13 }}>{c.code}</span>
              <Copy size={14} color={C.violet} style={{ cursor: "pointer" }} />
            </div>
            <Btn variant="outline" style={{ width: "100%" }}>Kelola Kelas</Btn>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeacherMisi({ unlocked }) {
  return (
    <div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Misi & Materi</div>
      {WORLDS.map((w) => (
        <Card key={w.id} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: w.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <WorldIcon world={w} size={17} />
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{w.name}</div>
            <Badge color={w.color}>{unlocked[w.id]}/{LEVELS[w.id].length} level rata-rata kelas</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0 4px 8px", fontSize: 11, color: C.mutedSoft, borderBottom: `1px solid ${C.panelBorder}` }}>
            <div>Level</div><div>Tipe</div><div>Siswa Selesai</div>
          </div>
          {LEVELS[w.id].map((l, i) => {
            const finishedPct = Math.max(20, 90 - i * 18);
            return (
              <div key={l.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", alignItems: "center", padding: "9px 4px", fontSize: 13, borderBottom: i < LEVELS[w.id].length - 1 ? `1px solid ${C.panelBorder}` : "none" }}>
                <div>{l.name}</div>
                <div><Badge color={l.type === "interactive" ? w.color : C.mutedSoft}>{l.type === "interactive" ? "Misi Interaktif" : "Quiz"}</Badge></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 60 }}><XPBar value={finishedPct} height={6} color={w.color} /></div>
                  <span style={{ fontSize: 11, color: C.mutedSoft }}>{finishedPct}%</span>
                </div>
              </div>
            );
          })}
        </Card>
      ))}
    </div>
  );
}

function TeacherSiswa() {
  const [q, setQ] = useState("");
  const filtered = STUDENTS.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Daftar Siswa — Kelas XI IPA 1</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 999, padding: "8px 14px" }}>
          <Search size={14} color={C.mutedSoft} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama siswa..." style={{ background: "transparent", border: "none", color: C.text, fontSize: 13, width: 160 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "0 8px 10px", fontSize: 12, color: C.mutedSoft, borderBottom: `1px solid ${C.panelBorder}` }}>
        <div>Nama</div><div>Level</div><div>Progress</div><div>XP</div><div>Streak</div>
      </div>
      {filtered.map((s) => (
        <div key={s.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "12px 8px", fontSize: 13, borderBottom: `1px solid ${C.panelBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.panel2, display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={14} color={C.muted} /></div>
            {s.name}
          </div>
          <div>{s.level}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 60 }}><XPBar value={s.progress} height={6} /></div>
            <span style={{ fontSize: 11, color: C.mutedSoft }}>{s.progress}%</span>
          </div>
          <div style={{ color: C.amber, fontWeight: 600 }}>{s.xp}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.rose }}><Flame size={13} /> {s.streak}</div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: C.mutedSoft, fontSize: 13 }}>Siswa tidak ditemukan.</div>}
    </Card>
  );
}

function TeacherLaporan({ unlocked }) {
  const avgClass = Math.round(WORLDS.reduce((sum, w) => sum + pct(w.id, unlocked), 0) / WORLDS.length);
  const topStudent = [...STUDENTS].sort((a, b) => b.xp - a.xp)[0];
  return (
    <div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Laporan Kelas</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
        <StatCard icon={TrendingUp} label="Rata-rata Progress" value={`${avgClass}%`} color={C.emerald} />
        <StatCard icon={Trophy} label="Siswa Paling Aktif" value={topStudent.name} color={C.amber} />
        <StatCard icon={Users} label="Total Siswa" value={STUDENTS.length} color={C.violet} />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 14 }}>Penyelesaian per Dunia</div>
        {WORLDS.map((w) => {
          const p = pct(w.id, unlocked);
          return (
            <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${C.panelBorder}` }}>
              <WorldIcon world={w} size={16} />
              <span style={{ fontSize: 13, width: 130 }}>{w.name}</span>
              <div style={{ flex: 1 }}><XPBar value={p} color={w.color} /></div>
              <span style={{ fontSize: 12, color: C.mutedSoft, width: 36, textAlign: "right" }}>{p}%</span>
            </div>
          );
        })}
      </Card>

      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Ranking Siswa</div>
          <Btn variant="outline"><FileBarChart2 size={14} /> Export Laporan</Btn>
        </div>
        <StudentTable />
      </Card>
    </div>
  );
}

function CreateClassModal({ onClose }) {
  const code = "CQ-8X4K2";
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
      <Card style={{ width: 360, position: "relative" }}>
        <X size={18} onClick={onClose} style={{ position: "absolute", top: 16, right: 16, cursor: "pointer", color: C.muted }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>Buat Kelas Baru</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Bagikan kode ini ke siswa supaya bisa join kelas.</div>
        <input placeholder="Nama kelas (contoh: XI IPA 2)" style={{ width: "100%", background: C.panel2, border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: "10px 12px", color: C.text, fontSize: 13, marginBottom: 16 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.panel2, borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: 1 }}>{code}</span>
          <Copy size={15} color={C.violet} style={{ cursor: "pointer" }} />
        </div>
        <Btn style={{ width: "100%" }} onClick={onClose}>Buat Kelas</Btn>
      </Card>
    </div>
  );
}
