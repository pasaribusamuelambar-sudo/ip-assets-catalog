import React, { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import KelolaPengguna from "./KelolaPengguna";

export default function DashboardAdmin({ onLogout }) {
  // State Buka/Tutup Sidebar (Default: Terbuka)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // State Ringkasan Statistik (FR-10 ADM)
  const [stats] = useState({
    totalAset: 142,
    menungguVerifikasi: 8,
    disetujui: 124,
    ditolak: 10,
  });

  // Data Pengajuan Usulan KI Terbaru oleh Dosen (FR-03 & FR-04 ADM)
  const [submissions, setSubmissions] = useState([
    {
      id: "HKI-2026-001",
      title: "Sistem Presensi Deteksi Wajah Real-Time",
      inventor: "Dr. Eng. Ahmad Yani, M.T.",
      category: "Software",
      date: "24 Sep 2026",
      status: "Menunggu Verifikasi",
    },
    {
      id: "HKI-2026-002",
      title: "Desain Ergonomis Meja Kerja Laboratorium",
      inventor: "Budi Santoso, S.ST., M.T.",
      category: "Desain Industri",
      date: "22 Sep 2026",
      status: "Menunggu Verifikasi",
    },
    {
      id: "HKI-2026-003",
      title: "Alat Pengering Ikan Otomatis Berbasis IoT",
      inventor: "Rina Wijaya, S.T., M.Sc.",
      category: "Paten",
      date: "18 Sep 2026",
      status: "Disetujui",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Disetujui" } : item,
      ),
    );
    alert(`Pengajuan ${id} berhasil disetujui!`);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {/* 1. SIDEBAR TERPISAH */}
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activeMenu={activeMenu}
        onSelectMenu={setActiveMenu}
        onLogout={onLogout}
      />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. HEADER TERPISAH */}
        <HeaderAdmin
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* 3. KONTEN DASHBOARD ADMIN UTAMA */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
          {/* DASHBOARD UTAMA */}
          {activeMenu === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h1 className="text-xl font-bold text-slate-800">
                  Panel Kelola Admin Sentra KI Polibatam
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Sistem Informasi Pengelolaan & Katalog Aset Kekayaan
                  Intelektual
                </p>
              </div>

              {/* Ringkasan Statistik */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500">
                    Total Aset KI
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {stats.totalAset}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500">
                    Menunggu Verifikasi
                  </p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {stats.menungguVerifikasi}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500">
                    Disetujui
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {stats.disetujui}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500">Ditolak</p>
                  <p className="text-2xl font-bold text-rose-600 mt-1">
                    {stats.ditolak}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VERIFIKASI PENGAJUAN */}
          {activeMenu === "verifikasi" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Verifikasi & Validasi Pengajuan KI (FR-03 s.d. FR-06)
              </h2>
              <p className="text-xs text-slate-500">
                Tinjau berkas, periksa keabsahan dokumen, setujui/tolak dengan
                catatan revisi, serta atur akses berkas (Publik/Privat).
              </p>
            </div>
          )}

          {/* KELOLA DATA ASET KI */}
          {activeMenu === "aset" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Kelola Data Aset KI (FR-08 ADM)
              </h2>
              <p className="text-xs text-slate-500">
                Hak akses penuh (CRUD) terhadap seluruh 8 kategori Kekayaan
                Intelektual.
              </p>
            </div>
          )}

          {/* MASTER KATEGORI KI */}
          {activeMenu === "kategori" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Kelola Master Kategori KI (FR-09 ADM)
              </h2>
              <p className="text-xs text-slate-500">
                Kelola master kategori KI (Paten, Hak Cipta, Merek, Desain
                Industri, dll).
              </p>
            </div>
          )}

          {/* KELOLA PENGGUNA / AKUN (MEMANGGIL KOMPONEN KELOLA PENGGUNA) */}
          {activeMenu === "users" && <KelolaPengguna />}

          {/* MINAT LISENSI */}
          {activeMenu === "lisensi" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Pesan Minat Lisensi / Inquiry System
              </h2>
              <p className="text-xs text-slate-500">
                Kelola dan tanggapi formulir minat lisensi dari mitra industri.
              </p>
            </div>
          )}

          {/* CETAK & EXPORT LAPORAN */}
          {activeMenu === "laporan" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Cetak & Export Laporan (FR-11 ADM)
              </h2>
              <p className="text-xs text-slate-500">
                Eksport rekapitulasi data aset KI ke format PDF atau Excel.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
