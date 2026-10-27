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
  ExternalLink,
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

  // URL LINK PANDUAN UTAMA & PER KATEGORI SHAREPOINT SENTRA HKI POLIBATAM
  const sharepointPanduanUtamaUrl =
    "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsentrahki%5Fpolibatam%5Fac%5Fid%2FDocuments%2F00%20DOKUMEN%20SentralAkses%5FPUBLIC%20SHARE%2F02%20PANDUAN%20TEKNIS%20PENDAFTARAN%20KI%20INTERNAL%20SIMP3M&ga=1";

  // DATA 5 PANDUAN KATEGORI KI LENGKAP DENGAN LINK MASING-MASING
  const panduanKiList = [
    {
      id: "hak-cipta",
      judul: "1. Hak Cipta",
      subJudul: "Program Komputer, Karya Tulis, Modul & Sinematografi",
      icon: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      link: "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsentrahki%5Fpolibatam%5Fac%5Fid%2FDocuments%2F00%20DOKUMEN%20SentralAkses%5FPUBLIC%20SHARE%2F02%20PANDUAN%20TEKNIS%20PENDAFTARAN%20KI%20INTERNAL%20SIMP3M%2F01%20HAK%20CIPTA&viewid=6b665f33%2Dc0b1%2D41cb%2Db12c%2D521c07e17b90&ga=1",
    },
    {
      id: "paten",
      judul: "2. Paten & Paten Sederhana",
      subJudul: "Invensi Teknologi, Alat Mekanis, Proses & Formula",
      icon: Cpu,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      link: "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsentrahki%5Fpolibatam%5Fac%5Fid%2FDocuments%2F00%20DOKUMEN%20SentralAkses%5FPUBLIC%20SHARE%2F02%20PANDUAN%20TEKNIS%20PENDAFTARAN%20KI%20INTERNAL%20SIMP3M%2F02%20PATEN%20%26%20PATEN%20SEDERHANA&viewid=6b665f33%2Dc0b1%2D41cb%2Db12c%2D521c07e17b90&ga=1",
    },
    {
      id: "merek",
      judul: "3. Merek",
      subJudul: "Logo Produk, Nama Dagang Jasa & Branding Industri",
      icon: Bookmark,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      link: "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/Doc.aspx?sourcedoc=%7B871975D5-92F2-4350-AB1F-29C562BF3B0E%7D&file=Panduan%20Pengajuan%20Merek%20-%20Polibatam.docx&action=default&mobileredirect=true",
    },
    {
      id: "desain-industri",
      judul: "4. Desain Industri",
      subJudul: "Bentuk, Komposisi Garis/Warna, Rancangan Produk & Mebel",
      icon: Layers,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      link: "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsentrahki%5Fpolibatam%5Fac%5Fid%2FDocuments%2F00%20DOKUMEN%20SentralAkses%5FPUBLIC%20SHARE%2F02%20PANDUAN%20TEKNIS%20PENDAFTARAN%20KI%20INTERNAL%20SIMP3M%2F03%20DESAIN%20INDUSTRI&viewid=6b665f33%2Dc0b1%2D41cb%2Db12c%2D521c07e17b90&ga=1",
    },
    {
      id: "dtlst",
      judul: "5. DTLST (Desain Tata Letak Sirkuit Terpadu)",
      subJudul: "Rancangan Layout Tiga Dimensi Sirkuit Elektronika & Microchip",
      icon: Sparkles,
      color: "bg-pink-50 text-pink-600 border-pink-200",
      link: "https://polbat-my.sharepoint.com/personal/sentrahki_polibatam_ac_id/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsentrahki%5Fpolibatam%5Fac%5Fid%2FDocuments%2F00%20DOKUMEN%20SentralAkses%5FPUBLIC%20SHARE%2F02%20PANDUAN%20TEKNIS%20PENDAFTARAN%20KI%20INTERNAL%20SIMP3M%2F04%20DTLST&viewid=6b665f33%2Dc0b1%2D41cb%2Db12c%2D521c07e17b90&ga=1",
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

                  {/* KARTU STATISTIK RINGKASAN */}
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
                          Klik tautan di bawah untuk melihat dokumen panduan
                          teknis pendaftaran dari setiap kategori KI.
                        </p>
                      </div>
                      <a
                        href={sharepointPanduanUtamaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition cursor-pointer"
                      >
                        Link Panduan Lengkap{" "}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
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
                              <div className="flex items-center justify-end mb-2">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <h4 className="font-bold text-sm text-slate-900 mt-1">
                                {item.judul}
                              </h4>
                              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                                {item.subJudul}
                              </p>
                            </div>

                            <div className="mt-6 space-y-2">
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                Lihat Link Panduan KI{" "}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => navigate("/dosen/pengajuan")}
                                className="w-full py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                Ajukan Kategori Ini{" "}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
