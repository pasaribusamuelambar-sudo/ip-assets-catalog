import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import KelolaPengguna from "./KelolaPengguna";
import KelolaAsetKI from "./KelolaAsetKI";
import VerifikasiPengajuan from "./Verifikasi-validasiPengajuan";
import MinatLisensi from "./MinatLisensi";
import CetakLaporan from "./CetakLaporan";

// Import Recharts untuk Grafik Visual
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Import Icon dari Lucide React
import {
  Award,
  FileCheck,
  Building2,
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Filter,
  BarChart2,
} from "lucide-react";

export default function DashboardAdmin({ onLogout }) {
  // Routing React Router DOM untuk sinkronisasi URL
  const location = useLocation();
  const navigate = useNavigate();

  // State Buka/Tutup Sidebar (Default: Terbuka)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Menentukan menu aktif berdasarkan sub-path URL
  const getActiveMenuFromPath = () => {
    const path = location.pathname;
    if (path.includes("/admin-dashboard/users")) return "users";
    if (path.includes("/admin-dashboard/aset")) return "aset";
    if (path.includes("/admin-dashboard/verifikasi")) return "verifikasi";
    if (path.includes("/admin-dashboard/lisensi")) return "lisensi";
    if (path.includes("/admin-dashboard/laporan")) return "laporan";
    return "dashboard";
  };

  const activeMenu = getActiveMenuFromPath();

  // Handler navigasi URL saat memilih menu di sidebar
  const handleSelectMenu = (menuId) => {
    if (menuId === "dashboard") {
      navigate("/admin-dashboard");
    } else {
      navigate(`/admin-dashboard/${menuId}`);
    }
  };

  // State Filter Jenis KI untuk Statistik Pengajuan Detail
  const [selectedKiFilter, setSelectedKiFilter] = useState("semua");

  // State Pesan Masuk yang Diambil Secara Real-time dari Backend API
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/messages");
      const result = await response.json();
      if (result.status === "success") {
        setMessages(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil pesan dari backend:", error);
    }
  };

  const handleReadMessage = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isRead: true } : msg,
      ),
    );
  };

  // 1. Data Ringkasan Statistik Angka Utama
  const [stats] = useState({
    totalAsetKI: 142,
    totalJurusan: 5,
    totalPaten: 38,
    totalHakCipta: 84,
    totalMerekDesain: 20,
  });

  // 2. Data Detail Statistik Status Pengajuan Per Jenis KI
  const [statusPengajuanPerKI] = useState({
    semua: {
      menungguVerifikasi: 8,
      tindakLanjut: 5,
      disetujui: 124,
      ditolak: 5,
    },
    paten: {
      menungguVerifikasi: 3,
      tindakLanjut: 3,
      disetujui: 30,
      ditolak: 2,
    },
    hakCipta: {
      menungguVerifikasi: 4,
      tindakLanjut: 1,
      disetujui: 77,
      ditolak: 2,
    },
    merekDesain: {
      menungguVerifikasi: 1,
      tindakLanjut: 1,
      disetujui: 17,
      ditolak: 1,
    },
  });

  // 3. Data Statistik Per Jurusan (Untuk Grafik Visual)
  const [jurusanStats] = useState([
    { nama: "Teknik Informatika", Paten: 18, HakCipta: 42, Total: 60 },
    { nama: "Teknik Elektro", Paten: 12, HakCipta: 15, Total: 27 },
    { nama: "Teknik Mesin", Paten: 6, HakCipta: 10, Total: 16 },
    { nama: "Manajemen Bisnis", Paten: 1, HakCipta: 12, Total: 13 },
    { nama: "Teknik Sipil", Paten: 1, HakCipta: 5, Total: 6 },
  ]);

  // 4. Data Grafik Tren Pertahun (2021 - 2026)
  const [trendPertahunData] = useState([
    { tahun: "2021", Paten: 4, HakCipta: 12, Total: 16 },
    { tahun: "2022", Paten: 6, HakCipta: 18, Total: 24 },
    { tahun: "2023", Paten: 8, HakCipta: 22, Total: 30 },
    { tahun: "2024", Paten: 10, HakCipta: 28, Total: 38 },
    { tahun: "2025", Paten: 12, HakCipta: 35, Total: 47 },
    { tahun: "2026", Paten: 15, HakCipta: 40, Total: 55 },
  ]);

  // 5. Data Distribusi Jenis KI (Pie Chart)
  const [jenisKiData] = useState([
    { name: "Hak Cipta", value: 84, color: "#3B82F6" },
    { name: "Paten", value: 38, color: "#10B981" },
    { name: "Merek", value: 12, color: "#F59E0B" },
    { name: "Desain Industri", value: 8, color: "#8B5CF6" },
  ]);

  // 6. Data Kategori Bidang KI
  const [kategoriBidangData] = useState([
    { bidang: "Software & AI", jumlah: 45 },
    { bidang: "IoT & Robotika", jumlah: 28 },
    { bidang: "Manufaktur & Energi", jumlah: 22 },
    { bidang: "Kewirausahaan & Media", jumlah: 18 },
    { bidang: "Material & Alat Kesehatan", jumlah: 15 },
  ]);

  // Data Pengajuan Usulan KI Terbaru
  const [submissions] = useState([
    {
      id: "HKI-2026-001",
      title: "Sistem Presensi Deteksi Wajah Real-Time",
      inventor: "Dr. Eng. Ahmad Yani, M.T.",
      category: "Software (Hak Cipta)",
      date: "24 Sep 2026",
      status: "Menunggu Verifikasi",
    },
    {
      id: "HKI-2026-002",
      title: "Desain Ergonomis Meja Kerja Laboratorium",
      inventor: "Budi Santoso, S.ST., M.T.",
      category: "Desain Industri",
      date: "22 Sep 2026",
      status: "Perlu Tindak Lanjut",
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

  const currentStatusStats = statusPengajuanPerKI[selectedKiFilter];

  const chartStatusData = [
    {
      status: "Menunggu Verifikasi",
      Jumlah: currentStatusStats.menungguVerifikasi,
      color: "#F59E0B",
    },
    {
      status: "Perlu Tindak Lanjut",
      Jumlah: currentStatusStats.tindakLanjut,
      color: "#F97316",
    },
    {
      status: "Disetujui / Terdaftar",
      Jumlah: currentStatusStats.disetujui,
      color: "#10B981",
    },
    {
      status: "Ditolak",
      Jumlah: currentStatusStats.ditolak,
      color: "#F43F5E",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {/* 1. SIDEBAR ADMIN */}
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activeMenu={activeMenu}
        onSelectMenu={handleSelectMenu}
        onLogout={onLogout}
      />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. HEADER ADMIN */}
        <HeaderAdmin
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          messages={messages}
          onReadMessage={handleReadMessage}
        />

        {/* 3. KONTEN DASHBOARD UTAMA */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
          <Routes>
            {/* ROUTE UTAMA DASHBOARD */}
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  {/* BANNER JUDUL */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">
                        Panel Kelola Admin Sentra KI Polibatam
                      </h1>
                      <p className="text-xs text-slate-500 mt-1">
                        Sistem Informasi Pengelolaan & Katalog Aset Kekayaan
                        Intelektual
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Update 2026
                    </div>
                  </div>

                  {/* BARIS 1: KARTU STATISTIK UTAMA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Total Aset KI
                        </p>
                        <Award className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mt-2">
                        {stats.totalAsetKI}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        Terverifikasi & Aktif
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Total Hak Cipta
                        </p>
                        <FileCheck className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {stats.totalHakCipta}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Paling Dominan
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Total Paten
                        </p>
                        <Layers className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-600 mt-2">
                        {stats.totalPaten}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Paten Biasa & Sederhana
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Total Jurusan
                        </p>
                        <Building2 className="w-5 h-5 text-purple-500" />
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        {stats.totalJurusan}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Unit Pengusul
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Merek & Desain
                        </p>
                        <Award className="w-5 h-5 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold text-amber-600 mt-2">
                        {stats.totalMerekDesain}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Aset Industri
                      </span>
                    </div>
                  </div>

                  {/* BARIS 2: DETAIL STATISTIK & GRAFIK STATUS PENGAJUAN PER JENIS KI */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                          <BarChart2 className="w-5 h-5 text-indigo-600" />
                          Statistik Status Pengajuan KI Berdasarkan Jenis
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Pemantauan tahapan verifikasi & tindak lanjut untuk
                          pengajuan Paten, Hak Cipta, dan Jenis KI lainnya.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-auto bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                        <Filter className="w-4 h-4 text-slate-500 ml-1" />
                        <select
                          value={selectedKiFilter}
                          onChange={(e) => setSelectedKiFilter(e.target.value)}
                          className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2"
                        >
                          <option value="semua">Semua Jenis KI</option>
                          <option value="paten">Khusus Paten</option>
                          <option value="hakCipta">Khusus Hak Cipta</option>
                          <option value="merekDesain">
                            Merek & Desain Industri
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3.5 p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 hover:shadow-sm transition-all">
                        <div className="p-2.5 bg-amber-100 rounded-lg shrink-0">
                          <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-amber-800 font-semibold truncate">
                            Menunggu Verifikasi
                          </p>
                          <p className="text-2xl font-bold text-amber-900 mt-0.5">
                            {currentStatusStats.menungguVerifikasi}
                          </p>
                          <span className="text-[10px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                            <ArrowRight className="w-3 h-3" /> Perlu diperiksa
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 p-4 bg-orange-50/70 rounded-xl border border-orange-200/80 hover:shadow-sm transition-all">
                        <div className="p-2.5 bg-orange-100 rounded-lg shrink-0">
                          <AlertTriangle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-orange-800 font-semibold truncate">
                            Perlu Tindak Lanjut
                          </p>
                          <p className="text-2xl font-bold text-orange-900 mt-0.5">
                            {currentStatusStats.tindakLanjut}
                          </p>
                          <span className="text-[10px] text-orange-700 font-medium flex items-center gap-1 mt-0.5">
                            <ArrowRight className="w-3 h-3" /> Revisi / Catatan
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 hover:shadow-sm transition-all">
                        <div className="p-2.5 bg-emerald-100 rounded-lg shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-emerald-800 font-semibold truncate">
                            Disetujui / Terdaftar
                          </p>
                          <p className="text-2xl font-bold text-emerald-900 mt-0.5">
                            {currentStatusStats.disetujui}
                          </p>
                          <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                            <ArrowRight className="w-3 h-3" /> Siap Terbit /
                            Sertifikat
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 p-4 bg-rose-50/70 rounded-xl border border-rose-200/80 hover:shadow-sm transition-all">
                        <div className="p-2.5 bg-rose-100 rounded-lg shrink-0">
                          <XCircle className="w-6 h-6 text-rose-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-rose-800 font-semibold truncate">
                            Ditolak
                          </p>
                          <p className="text-2xl font-bold text-rose-900 mt-0.5">
                            {currentStatusStats.ditolak}
                          </p>
                          <span className="text-[10px] text-rose-700 font-medium flex items-center gap-1 mt-0.5">
                            <ArrowRight className="w-3 h-3" /> Berkas Tidak
                            Sesuai
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Grafik Visual Perbandingan Status (
                          {selectedKiFilter === "semua"
                            ? "Semua KI"
                            : selectedKiFilter === "paten"
                              ? "Paten"
                              : selectedKiFilter === "hakCipta"
                                ? "Hak Cipta"
                                : "Merek & Desain"}
                          )
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          Total:{" "}
                          <b>
                            {currentStatusStats.menungguVerifikasi +
                              currentStatusStats.tindakLanjut +
                              currentStatusStats.disetujui +
                              currentStatusStats.ditolak}
                          </b>{" "}
                          Pengajuan
                        </span>
                      </div>
                      <div className="h-52 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chartStatusData}
                            margin={{
                              top: 10,
                              right: 20,
                              left: -10,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              stroke="#E2E8F0"
                            />
                            <XAxis
                              dataKey="status"
                              tick={{ fontSize: 11, fill: "#475569" }}
                            />
                            <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                            <Tooltip />
                            <Bar
                              dataKey="Jumlah"
                              radius={[6, 6, 0, 0]}
                              barSize={40}
                            >
                              {chartStatusData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* BARIS 3: GRAFIK TREN PERTAHUN & DISTRIBUSI JENIS KI */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-800">
                          Grafik Pertumbuhan KI Pertahun
                        </h3>
                        <p className="text-xs text-slate-500">
                          Perkembangan jumlah Paten & Hak Cipta terdaftar (2021
                          - 2026)
                        </p>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendPertahunData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis dataKey="tahun" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="HakCipta"
                              name="Hak Cipta"
                              stroke="#3B82F6"
                              strokeWidth={2}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="Paten"
                              name="Paten"
                              stroke="#10B981"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">
                          Distribusi Jenis KI
                        </h3>
                        <p className="text-xs text-slate-500">
                          Persentase pembagian jenis Kekayaan Intelektual
                        </p>
                      </div>
                      <div className="h-48 w-full my-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={jenisKiData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {jenisKiData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {jenisKiData.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center space-x-2"
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="text-slate-600 font-medium truncate">
                              {item.name}: <b>{item.value}</b>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BARIS 4: KATEGORI BIDANG & GRAFIK STATISTIK PER JURUSAN */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* GRAFIK 1: KATEGORI BIDANG */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-800">
                          Jumlah Berdasarkan Kategori Bidang
                        </h3>
                        <p className="text-xs text-slate-500">
                          Klasifikasi aset KI dalam bidang teknologi & sains
                        </p>
                      </div>
                      <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={kategoriBidangData} layout="vertical">
                            <CartesianGrid
                              strokeDasharray="3 3"
                              horizontal={false}
                            />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis
                              dataKey="bidang"
                              type="category"
                              width={130}
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="jumlah"
                              fill="#6366F1"
                              radius={[0, 6, 6, 0]}
                              name="Jumlah KI"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* GRAFIK 2: GRAFIK STATISTIK JURUSAN */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">
                          Grafik Perolehan KI per Jurusan
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">
                          Perbandingan jumlah Paten & Hak Cipta yang dihasilkan
                          oleh tiap Jurusan
                        </p>
                      </div>

                      <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={jurusanStats}
                            margin={{
                              top: 10,
                              right: 10,
                              left: -20,
                              bottom: 25,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                            />
                            <XAxis
                              dataKey="nama"
                              tick={{ fontSize: 9, fill: "#475569" }}
                              interval={0}
                              angle={-15}
                              textAnchor="end"
                            />
                            <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
                            <Tooltip />
                            <Legend
                              wrapperStyle={{
                                fontSize: "11px",
                                paddingTop: "8px",
                              }}
                            />
                            <Bar
                              dataKey="Paten"
                              fill="#10B981"
                              stackId="a"
                              radius={[0, 0, 0, 0]}
                            />
                            <Bar
                              dataKey="HakCipta"
                              fill="#3B82F6"
                              stackId="a"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* BARIS 5: PENGAJUAN USULAN KI TERBARU */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-bold text-slate-800 mb-3">
                      Pengajuan Usulan KI Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 uppercase">
                          <tr>
                            <th className="p-3">ID Usulan</th>
                            <th className="p-3">Judul KI</th>
                            <th className="p-3">Pengusul</th>
                            <th className="p-3">Jenis/Kategori</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {submissions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50">
                              <td className="p-3 font-semibold text-slate-700">
                                {sub.id}
                              </td>
                              <td className="p-3 font-medium text-slate-800">
                                {sub.title}
                              </td>
                              <td className="p-3 text-slate-600">
                                {sub.inventor}
                              </td>
                              <td className="p-3 text-slate-600">
                                {sub.category}
                              </td>
                              <td className="p-3 text-slate-500">{sub.date}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                                    sub.status === "Disetujui"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : sub.status === "Perlu Tindak Lanjut"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            />

            {/* ROUTE-ROUTE KONTEN SUB-HALAMAN YANG DIPERBAIKI (MEMANGGIL FILE KOMPONEN ASLI) */}
            <Route path="/users" element={<KelolaPengguna />} />
            <Route path="/aset" element={<KelolaAsetKI />} />
            <Route path="/Verifikasi" element={<VerifikasiPengajuan />} />
            <Route path="/lisensi" element={<MinatLisensi />} />
            <Route path="/laporan" element={<CetakLaporan />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
