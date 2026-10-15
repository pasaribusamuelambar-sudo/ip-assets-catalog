// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware CORS
app.use(cors());
app.use(express.json());

// Database Sementara Pesan Inquiry (Kontak)
let messagesDB = [
  {
    id: 1,
    nama: "Dr. Eng. Ahmad Yani, M.T.",
    email: "ahmad.yani@polibatam.ac.id",
    pesan: "Mohon kejelasan revisi berkas klaim paten alat presensi.",
    tanggal: "04 Okt 2026",
    isRead: false,
  },
];

// Database Sementara Notifikasi Lonceng (Tracking Status, Revisi, Usulan Baru)
let notificationsDB = [
  {
    id: 1,
    judul: "Pengajuan HKI Baru",
    deskripsi: "Dr. Eng. Widya Putri mengajukan Paten Sederhana baru.",
    waktu: "10 menit yang lalu",
    isRead: false,
    type: "pending",
  },
  {
    id: 2,
    judul: "Revisi Berkas Diterima",
    deskripsi: "Ahmad Hamim telah mengunggah ulang dokumen Hak Cipta.",
    waktu: "1 jam yang lalu",
    isRead: false,
    type: "revision",
  },
];

// --- ENDPOINT MESSAGES (KONTAK PESAN) ---
app.post("/api/messages", (req, res) => {
  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({
      status: "error",
      message: "Semua kolom (nama, email, pesan) wajib diisi!",
    });
  }

  const newMessage = {
    id: Date.now(),
    nama,
    email,
    pesan,
    tanggal: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    isRead: false,
  };

  messagesDB.unshift(newMessage);

  return res.status(201).json({
    status: "success",
    message: "Pesan berhasil terkirim ke server!",
    data: newMessage,
  });
});

app.get("/api/messages", (req, res) => {
  res.json({ status: "success", data: messagesDB });
});

// Endpoint Tandai Pesan Dibaca (Satu per satu atau Semua Sekaligus)
app.patch("/api/messages/read-all", (req, res) => {
  messagesDB = messagesDB.map((m) => ({ ...m, isRead: true }));
  res.json({ status: "success", message: "Semua pesan ditandai telah dibaca" });
});

// --- ENDPOINT NOTIFICATIONS (LONCENG SISTEM) ---
app.get("/api/notifications", (req, res) => {
  res.json({ status: "success", data: notificationsDB });
});

// Endpoint Tandai Semua Notifikasi Dibaca Secara Langsung
app.patch("/api/notifications/read-all", (req, res) => {
  notificationsDB = notificationsDB.map((n) => ({ ...n, isRead: true }));
  res.json({
    status: "success",
    message: "Semua notifikasi ditandai telah dibaca",
  });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Backend Express running at http://localhost:${PORT}`);
});
