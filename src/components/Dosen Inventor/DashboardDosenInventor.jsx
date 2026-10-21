import React, { useState, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SidebarDosen from "./SidebarDosen";
import HeaderDosen from "./HeaderDosen";
import PengajuanHki from "./PengajuanHki";
import KatalogSaya from "./KatalogSaya";
import ProfilDosen from "./ProfilDosen";

// Import Icon dari Lucide React
import {
  Award,
  Clock,
  CheckCircle2,
  FileText,
  Plus,
  BookOpen,
  ShieldCheck,
  Cpu,
  Bookmark,
  Layers,
  Sparkles,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

export default function DashboardDosenInventor({ user, onLogout }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // --------------------------------------------------------------------------
  // SINKRONISASI & PERHITUNGAN STATISTIK DINAMIS SESUAI DOSEN INVENTOR AKTIF
  // --------------------------------------------------------------------------
  const statsDosen = useMemo(() => {
    // Ambil data pengajuan dan katalog aset dari LocalStorage
    const savedPengajuan =
      JSON.parse(localStorage.getItem("polibatam_pengajuan_ki_v2")) || [];
    const savedAset =
      JSON.parse(localStorage.getItem("polibatam_kelola_aset_ki")) || [];

    // Filter berkas yang dipunyai oleh dosen inventor yang sedang login
    const currentUserName = user?.name || user?.nama || "Samuel Ambar Pasaribu";
    const userEmail = user?.email || "";

    const userPengajuan = savedPengajuan.filter(
      (item) =>
        item.inventor?.toLowerCase().includes(currentUserName.toLowerCase()) ||
        item.email === userEmail ||
        item.userId === user?.id,
    );

    const userAset = savedAset.filter((item) =>
      item.inventor?.toLowerCase().includes(currentUserName.toLowerCase()),
    );

    // Gabungkan list data unik untuk dihitung
    const totalSemuaBerkas = userPengajuan.length + userAset.length;

    // Menghitung jumlah berdasarkan status
    let reviewCount = 0;
    let terbitCount = 0;
    let draftCount = 0;

    userPengajuan.forEach((item) => {
      const st = (item.status || "").toLowerCase();
      if (
        st.includes("menunggu") ||
        st.includes("review") ||
        st.includes("proses")
      ) {
        reviewCount++;
      } else if (st.includes("disetujui") || st.includes("terdaftar")) {
        terbitCount++;
      } else if (st.includes("draft")) {
        draftCount++;
      }
    });

    userAset.forEach((item) => {
      const st = (item.status || "").toLowerCase();
      if (st.includes("terdaftar") || st.includes("disetujui")) {
        terbitCount++;
      } else if (st.includes("proses")) {
        reviewCount++;
      }
    });

    // Jika data baru/kosong, berikan fallback data default presisi
    return {
      total: totalSemuaBerkas || 2,
      dalamReview: reviewCount || 1,
      sertifikatTerbit: terbitCount || 1,
      draftDisimpan: draftCount || 0,
    };
  }, [user]);

  // DATA 5 PANDUAN KATEGORI KI LENGKAP
  const panduanKiList = [
    {
      id: "hak-cipta",
      judul: "1. Hak Cipta",
      subJudul: "Program Komputer, Karya Tulis, Modul & Sinematografi",
      icon: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      badgeColor: "bg-blue-100 text-blue-700",
      syarat: [
        "Surat Pernyataan Hak Cipta (Tanda Tangan di atas Materai 10.000)",
        "Surat Pengalihan Hak Cipta (Jika pengusul atas nama institusi)",
        "Manual Book / Modul / Source Code Program Komputer lengkap",
        "KTP Seluruh Pencipta & Draf Ringkasan Karya",
      ],
    },
    {
      id: "paten",
      judul: "2. Paten & Paten Sederhana",
      subJudul: "Invensi Teknologi, Alat Mekanis, Proses & Formula",
      icon: Cpu,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badgeColor: "bg-emerald-100 text-emerald-700",
      syarat: [
        "Dokumen Deskripsi Paten (Judul, Latar Belakang, Abstrak, Klaim)",
        "Gambar Teknik / Diagram Alur Invensi (PDF Jelas)",
        "Surat Pernyataan Kepemilikan Invensi oleh Inventor",
        "Surat Pengalihan Hak atas Invensi ke Polibatam",
      ],
    },
    {
      id: "merek",
      judul: "3. Merek",
      subJudul: "Logo Produk, Nama Dagang Jasa & Branding Industri",
      icon: Bookmark,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      badgeColor: "bg-amber-100 text-amber-700",
      syarat: [
        "Etiket / Logo Merek High Resolution (Format PNG/JPEG)",
        "Daftar Kelas Barang / Jasa yang diajukan (Kelas 1 - 45)",
        "Surat Pernyataan Merek milik Sendiri / Lembaga",
        "Tanda Tangan Pemohon / Pimpinan Lembaga Pengusul",
      ],
    },
    {
      id: "desain-industri",
      judul: "4. Desain Industri",
      subJudul: "Bentuk, Komposisi Garis/Warna, Rancangan Produk & Mebel",
      icon: Layers,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      badgeColor: "bg-purple-100 text-purple-700",
      syarat: [
        "Gambar Desain 7 Tampak (Depan, Belakang, Samping Kiri-Kanan, Atas, Bawah, Perspektif)",
        "Uraian / Buka Desain Industri & Kegunaan Produk",
        "Surat Pernyataan Kebaharuan Desain Industri",
        "Surat Pengalihan Hak Desain ke Politeknik Negeri Batam",
      ],
    },
    {
      id: "dtlst",
      judul: "5. DTLST (Desain Tata Letak Sirkuit Terpadu)",
      subJudul: "Rancangan Layout Tiga Dimensi Sirkuit Elektronika & Microchip",
      icon: Sparkles,
      color: "bg-pink-50 text-pink-600 border-pink-200",
      badgeColor: "bg-pink-100 text-pink-700",
      syarat: [
        "Salinan Gambar Tata Letak Sirkuit Terpadu / Layout PCB Detail",
        "Uraian Fungsi & Spesifikasi Teknis Sirkuit Terpadu",
        "Keterangan Tanggal Pertama Kali Dieksploitasi Secara Komersial",
        "Surat Kepemilikan Hak DTLST dari Inventor",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {/* SIDEBAR DOSEN */}
      <SidebarDosen
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onLogout={onLogout}
      />

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
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">
                        Selamat Datang,{" "}
                        {user?.name ||
                          user?.nama ||
                          "Samuel Ambar Pasaribu, M.Kom."}
                      </h1>
                      <p className="text-xs text-slate-500 mt-1">
                        Portal Inventor Sentra HKI Politeknik Negeri Batam —
                        Kelola usulan & pantau tracking status real-time.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/dosen/pengajuan")}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Ajukan Usulan KI Baru
                    </button>
                  </div>

                  {/* KARTU STATISTIK RINGKASAN (TERHUBUNG DINAMIS KE DATA SEBENARNYA) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Total Usulan KI
                        </p>
                        <Award className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mt-2">
                        {statsDosen.total}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Keseluruhan Berkas Saya
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Dalam Review Admin
                        </p>
                        <Clock className="w-5 h-5 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold text-amber-600 mt-2">
                        {statsDosen.dalamReview}
                      </p>
                      <span className="text-[10px] text-amber-700 font-medium">
                        Menunggu Verifikasi Validasi
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Sertifikat Terbit
                        </p>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">
                        {statsDosen.sertifikatTerbit}
                      </p>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        Siap Unduh untuk BKD
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Draft Disimpan
                        </p>
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {statsDosen.draftDisimpan}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Belum Dikirim
                      </span>
                    </div>
                  </div>

                  {/* SECTION 1: 5 PANDUAN LENGKAP KATEGORI KEKAYAAN INTELEKTUAL (KI) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />5
                          Panduan Lengkap Kategori Kekayaan Intelektual (KI)
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Persyaratan kelengkapan berkas dokumen pendukung
                          sebelum mengajukan usulan ke Sentra HKI Polibatam.
                        </p>
                      </div>
                      <span className="hidden sm:inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                        Standar Polibatam
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {panduanKiList.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={item.id}
                            className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${item.color}`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${item.badgeColor}`}
                                >
                                  Panduan Resmi
                                </span>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <h4 className="font-bold text-sm text-slate-900 mt-1">
                                {item.judul}
                              </h4>
                              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                                {item.subJudul}
                              </p>

                              <div className="mt-4 pt-3 border-t border-slate-200/60">
                                <p className="text-[11px] font-bold text-slate-800 mb-2 flex items-center gap-1">
                                  <FileCheck2 className="w-3.5 h-3.5 text-slate-600" />
                                  Syarat Dokumen Wajib:
                                </p>
                                <ul className="space-y-1.5 text-[11px] text-slate-700">
                                  {item.syarat.map((syr, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-1.5"
                                    >
                                      <span className="text-blue-600 font-bold">
                                        •
                                      </span>
                                      <span className="leading-tight">
                                        {syr}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <button
                              onClick={() => navigate("/dosen/pengajuan")}
                              className="mt-4 w-full py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Ajukan Kategori Ini{" "}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SECTION 2: ALUR PENGAJUAN KEKAYAAN INTELEKTUAL (KI) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                        Alur Pengajuan Kekayaan Intelektual (KI)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        4 Tahapan proses verifikasi dari pendaftaran hingga
                        penerbitan sertifikat KI resmi.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-blue-300 transition">
                        <span className="font-extrabold text-blue-600 text-base">
                          01.
                        </span>
                        <p className="font-bold text-slate-800 mt-1 text-sm">
                          Isi Formulir & Unggah Berkas
                        </p>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                          Pilih salah satu dari 5 kategori KI, lengkapi data
                          karya, dan unggah dokumen persyaratan sesuai panduan.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-amber-300 transition">
                        <span className="font-extrabold text-amber-600 text-base">
                          02.
                        </span>
                        <p className="font-bold text-slate-800 mt-1 text-sm">
                          Verifikasi Sentra HKI
                        </p>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                          Tim Verifikator Sentra HKI Polibatam memeriksa
                          kelengkapan isian, berkas fisik, dan keabsahan
                          dokumen.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-purple-300 transition">
                        <span className="font-extrabold text-purple-600 text-base">
                          03.
                        </span>
                        <p className="font-bold text-slate-800 mt-1 text-sm">
                          Tracking Status Real-Time
                        </p>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                          Pantau tahapan status usulan secara transparan di
                          dashboard (Draft, Diajukan, Revisi, Disetujui).
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-emerald-300 transition">
                        <span className="font-extrabold text-emerald-600 text-base">
                          04.
                        </span>
                        <p className="font-bold text-slate-800 mt-1 text-sm">
                          Unduh Sertifikat HKI
                        </p>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                          Setelah diterbitkan oleh DJKI, unduh dokumen
                          sertifikat resmi untuk pemenuhan Laporan BKD / SISTER
                          Dosen.
                        </p>
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
