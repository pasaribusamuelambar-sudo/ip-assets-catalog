import React, { useState } from "react";
import {
  User,
  Building,
  Mail,
  BookOpen,
  Lock,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

export default function ProfilDosen() {
  // Ambil data user aktif yang sedang login dan sinkronkan dengan database kelola pengguna admin
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSession = localStorage.getItem("currentUser");
    if (savedSession) {
      try {
        const sessionUser = JSON.parse(savedSession);
        const allUsers =
          JSON.parse(localStorage.getItem("ip_catalog_users")) || [];
        const found = allUsers.find(
          (u) => String(u.id) === String(sessionUser.id),
        );
        if (found) return found;
        return sessionUser;
      } catch (e) {
        console.error("Gagal parse session", e);
      }
    }
    return {
      id: "3312511048",
      nama: "Samuel Ambar Pasaribu, M.Kom.",
      email: "pasaribusamuelambar@gmail.com",
      jurusan: "Teknik Informatika",
      role: "Dosen / Inventor",
      status: "Aktif",
      passwordTerakhir: "12345678",
      riwayatPassword: [{ tanggal: "2026-01-01", status: "Dibuat Sistem" }],
      researchInterest:
        "Web Development, Artificial Intelligence & Internet of Things",
    };
  });

  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      alert("Password baru tidak boleh kosong!");
      return;
    }

    const updatedUser = {
      ...currentUser,
      passwordTerakhir: newPassword.trim(),
      password: newPassword.trim(),
      riwayatPassword: [
        {
          tanggal: new Date().toISOString().split("T")[0],
          status: "Diubah oleh Dosen",
        },
        ...(currentUser.riwayatPassword || []),
      ],
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Sinkronisasi ke master data admin (ip_catalog_users)
    const allUsers = JSON.parse(localStorage.getItem("ip_catalog_users")) || [];
    const updatedAllUsers = allUsers.map((u) =>
      String(u.id) === String(updatedUser.id) ? updatedUser : u,
    );
    localStorage.setItem("ip_catalog_users", JSON.stringify(updatedAllUsers));

    setNewPassword("");
    setSuccessMsg(
      "Kata sandi berhasil diperbarui dan tersinkronisasi ke Admin!",
    );
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-slate-100">
      {/* Wallpaper / Background Pattern Elegan Sediakan Sistem */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="space-y-6 max-w-4xl mx-auto relative z-10">
        {/* HEADER UTAMA */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-blue-400" />
              Profil Dosen Inventor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Pusat manajemen identitas personal dan pengaturan keamanan akun di
              Sentra HKI Polibatam.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-xl border border-blue-500/20">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Akun Terverifikasi Sistem
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* PROFIL UTAMA (TANPA TAB) */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {currentUser.nama ? currentUser.nama.charAt(0) : "S"}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">
                {currentUser.nama}
              </h3>
              <p className="text-xs text-blue-400 font-bold font-mono">
                ID Dosen / NIP: {currentUser.id}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold border border-emerald-500/30">
                  Status: {currentUser.status || "Aktif"}
                </span>
                <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-bold border border-blue-500/30">
                  {currentUser.role || "Dosen / Inventor"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-400" /> Email Instansi
              </span>
              <p className="font-bold text-slate-200 text-sm">
                {currentUser.email}
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-400" /> Jurusan & Program
                Studi
              </span>
              <p className="font-bold text-slate-200 text-sm">
                {currentUser.jurusan} — Politeknik Negeri Batam
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1 md:col-span-2">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-400" /> Bidang Keahlian /
                Research Interest
              </span>
              <p className="font-bold text-slate-200">
                {currentUser.researchInterest ||
                  "Pengembangan Perangkat Lunak, Sistem Informasi Enterprise & Kecerdasan Buatan."}
              </p>
            </div>
          </div>
        </div>

        {/* KARTU PENGATURAN KREDENSIAL & PASSWORD (SETTING) */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-lg space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" /> Pengaturan Kredensial &
            Kata Sandi Akun
          </h3>
          <p className="text-xs text-slate-400">
            Sandi akun ini disinkronkan langsung dengan sistem manajemen
            pengguna administrator (Kelola Pengguna Admin).
          </p>

          <form
            onSubmit={handleUpdatePassword}
            className="space-y-3 pt-2 max-w-md text-xs"
          >
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Kata Sandi Aktif Saat Ini
              </label>
              <input
                type="text"
                disabled
                value={
                  currentUser.passwordTerakhir ||
                  currentUser.password ||
                  "12345678"
                }
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl font-mono text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Kata Sandi Baru *
              </label>
              <input
                type="text"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru..."
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md cursor-pointer"
            >
              Simpan Perubahan Sandi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
