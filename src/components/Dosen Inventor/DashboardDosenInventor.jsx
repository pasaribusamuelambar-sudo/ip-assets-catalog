import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SidebarDosen from "./SidebarDosen";
import HeaderDosen from "./HeaderDosen";
import PengajuanHki from "./PengajuanHki";
import KatalogSaya from "./KatalogSaya";
import ProfilDosen from "./ProfilDosen";
import { Award, Clock, CheckCircle2, FileText, ArrowRight, Plus, TrendingUp } from "lucide-react";

export default function DashboardDosenInventor({ user, onLogout }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {/* SIDEBAR DOSEN */}
      <SidebarDosen isOpen={isSidebarOpen} onToggle={toggleSidebar} onLogout={onLogout} />

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <HeaderDosen user={user} onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />

            {/* OVERVIEW / DASHBOARD DOSEN */}
            <Route
              path="overview"
              element={
                <div className="space-y-6">
                  {/* BANNER UTAMA */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">
                        Selamat Datang, {user?.name || "Samuel Ambar Pasaribu, M.Kom."}
                      </h1>
                      <p className="text-xs text-slate-500 mt-1">
                        Portal Inventor Sentra HKI Politeknik Negeri Batam — Kelola usulan & pantau tracking status real-time.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/dosen/pengajuan")}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Ajukan Usulan KI Baru
                    </button>
                  </div>

                  {/* KARTU STATISTIK RINGKASAN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Total Usulan KI</p>
                        <Award className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mt-2">2</p>
                      <span className="text-[10px] text-slate-400">Keseluruhan Berkas</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Dalam Review Admin</p>
                        <Clock className="w-5 h-5 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold text-amber-600 mt-2">1</p>
                      <span className="text-[10px] text-amber-700 font-medium">Menunggu Verifikasi</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Sertifikat Terbit</p>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">1</p>
                      <span className="text-[10px] text-emerald-700 font-medium">Siap Unduh untuk BKD</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Draft Disimpan</p>
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
                      <span className="text-[10px] text-slate-400">Belum Dikirim</span>
                    </div>
                  </div>

                  {/* INFORMASI PANDUAN PENGISIAN */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h3 className="text-base font-bold text-slate-800">Alur Pengajuan Kekayaan Intelektual (KI)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-bold text-blue-600 text-sm">01.</span>
                        <p className="font-bold text-slate-800 mt-1">Isi Formulir</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Pilih salah satu dari 5 kategori KI dan unggah dokumen pendukung.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-bold text-blue-600 text-sm">02.</span>
                        <p className="font-bold text-slate-800 mt-1">Verifikasi Sentra HKI</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Admin memeriksa kelengkapan isian & keabsahan berkas dokumen.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-bold text-blue-600 text-sm">03.</span>
                        <p className="font-bold text-slate-800 mt-1">Tracking Status</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Pantau tahapan real-time (Draft, Diajukan, Revisi, Disetujui).</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-bold text-blue-600 text-sm">04.</span>
                        <p className="font-bold text-slate-800 mt-1">Unduh Sertifikat</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Unduh berkas resmi sertifikat KI untuk kelengkapan BKD Dosen.</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="pengajuan" element={<PengajuanHki user={user} />} />
            <Route path="katalog-saya" element={<KatalogSaya />} />
            <Route path="profil" element={<ProfilDosen user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


dashboard
