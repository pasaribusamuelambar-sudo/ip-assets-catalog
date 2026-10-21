import React, { useState, useEffect, useMemo } from "react";
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
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Menentukan menu aktif berdasarkan path URL
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

  const handleSelectMenu = (menuId) => {
    if (menuId === "dashboard") {
      navigate("/admin-dashboard");
    } else {
      navigate(`/admin-dashboard/${menuId}`);
    }
  };

  const [selectedKiFilter, setSelectedKiFilter] = useState("semua");
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

  // --------------------------------------------------------------------------
  // SINKRONISASI DATA UTAMA DARI LOCALSTORAGE
  // --------------------------------------------------------------------------
  const [asetData, setAsetData] = useState(() => {
    const saved = localStorage.getItem("polibatam_kelola_aset_ki");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "KI-2026-001",
        title: "Sistem Presensi Deteksi Wajah Real-Time Berbasis AI",
        category: "Hak Cipta",
        subCategory: "Program Komputer",
        inventor: "Dr. Eng. Ahmad Yani, M.T.",
        jurusan: "Teknik Informatika",
        regNumber: "EC00202612345",
        regDate: "2026-08-15",
        status: "Terdaftar",
      },
      {
        id: "KI-2026-002",
        title: "Alat Pengering Ikan Otomatis Berbasis IoT Energi Surya",
        category: "Paten",
        subCategory: "Paten Sederhana",
        inventor: "Rina Wijaya, S.T., M.Sc.",
        jurusan: "Teknik Elektro",
        regNumber: "S00202600891",
        regDate: "2026-08-10",
        status: "Terdaftar",
      },
      {
        id: "KI-2026-003",
        title: "Desain Ergonomis Meja Kerja Laboratorium Industri",
        category: "Desain Industri",
        subCategory: "Mebel & Perabot",
        inventor: "Budi Santoso, S.ST., M.T.",
        jurusan: "Teknik Mesin",
        regNumber: "IDD000054321",
        regDate: "2026-08-01",
        status: "Dalam Proses",
      },
      {
        id: "KI-2026-004",
        title: "Logo & Branding Sentra HKI Polibatam Digital Catalog",
        category: "Merek",
        subCategory: "Merek Jasa",
        inventor: "Tim Humas Polibatam",
        jurusan: "Manajemen Bisnis",
        regNumber: "DMB202609912",
        regDate: "2026-08-12",
        status: "Terdaftar",
      },
    ];
  });

  // MENGHITUNG STATISTIK UTAMA SECARA OTOMATIS
  const stats = useMemo(() => {
    const totalAsetKI = asetData.length;
    const totalHakCipta = asetData.filter(
      (a) => a.category === "Hak Cipta",
    ).length;
    const totalPaten = asetData.filter((a) => a.category === "Paten").length;
    const totalMerek = asetData.filter((a) => a.category === "Merek").length;
    const totalDesain = asetData.filter(
      (a) => a.category === "Desain Industri",
    ).length;
    const totalDtlst = asetData.filter((a) => a.category === "DTLST").length;

    return {
      totalAsetKI,
      totalHakCipta,
      totalPaten,
      totalMerek,
      totalDesain,
      totalDtlst,
      totalJurusan: 5, // Total Jurusan Resmi Polibatam
    };
  }, [asetData]);

  // MENGHITUNG STATUS PENGAJUAN PER KATEGORI KI (URUTAN: HAK CIPTA, MEREK, PATEN, DESAIN INDUSTRI, DTLST)
  const statusPengajuanPerKI = useMemo(() => {
    const calcStatus = (list) => {
      let menungguVerifikasi = 0;
      let tindakLanjut = 0;
      let disetujui = 0;
      let ditolak = 0;

      list.forEach((item) => {
        const st = item.status || "";
        if (st === "Terdaftar" || st === "Disetujui") disetujui++;
        else if (st === "Dalam Proses" || st === "Menunggu Verifikasi")
          menungguVerifikasi++;
        else if (st === "Perlu Tindak Lanjut") tindakLanjut++;
        else if (st === "Ditolak") ditolak++;
        else disetujui++;
      });

      return { menungguVerifikasi, tindakLanjut, disetujui, ditolak };
    };

    return {
      semua: calcStatus(asetData),
      hakCipta: calcStatus(asetData.filter((a) => a.category === "Hak Cipta")),
      merek: calcStatus(asetData.filter((a) => a.category === "Merek")),
      paten: calcStatus(asetData.filter((a) => a.category === "Paten")),
      desainIndustri: calcStatus(
        asetData.filter((a) => a.category === "Desain Industri"),
      ),
      dtlst: calcStatus(asetData.filter((a) => a.category === "DTLST")),
    };
  }, [asetData]);

  // DATA GRAFIK PER JURUSAN LENGKAP 5 JURUSAN RESMI POLIBATAM
  const jurusanStats = useMemo(() => {
    const daftarJurusanPolibatam = [
      "Teknik Informatika",
      "Teknik Elektro",
      "Teknik Mesin",
      "Manajemen Bisnis",
      "Teknik Sipil",
    ];

    const mapJurusan = {};
    daftarJurusanPolibatam.forEach((jur) => {
      mapJurusan[jur] = {
        nama: jur,
        HakCipta: 0,
        Merek: 0,
        Paten: 0,
        DesainIndustri: 0,
        DTLST: 0,
        Total: 0,
      };
    });

    asetData.forEach((item) => {
      const jur = item.jurusan;
      if (jur && mapJurusan[jur]) {
        if (item.category === "Hak Cipta") mapJurusan[jur].HakCipta += 1;
        else if (item.category === "Merek") mapJurusan[jur].Merek += 1;
        else if (item.category === "Paten") mapJurusan[jur].Paten += 1;
        else if (item.category === "Desain Industri")
          mapJurusan[jur].DesainIndustri += 1;
        else if (item.category === "DTLST") mapJurusan[jur].DTLST += 1;
        mapJurusan[jur].Total += 1;
      }
    });

    return Object.values(mapJurusan);
  }, [asetData]);

  // DATA GRAFIK PIE DISTRIBUSI KI
  const jenisKiData = useMemo(() => {
    const counts = {
      "Hak Cipta": 0,
      Merek: 0,
      Paten: 0,
      "Desain Industri": 0,
      DTLST: 0,
    };
    asetData.forEach((a) => {
      if (counts[a.category] !== undefined) {
        counts[a.category] += 1;
      }
    });

    return [
      { name: "Hak Cipta", value: counts["Hak Cipta"], color: "#3B82F6" },
      { name: "Merek", value: counts["Merek"], color: "#F59E0B" },
      { name: "Paten", value: counts["Paten"], color: "#10B981" },
      {
        name: "Desain Industri",
        value: counts["Desain Industri"],
        color: "#8B5CF6",
      },
      { name: "DTLST", value: counts["DTLST"], color: "#EC4899" },
    ];
  }, [asetData]);

  // DATA GRAFIK TREN PERTAHUN & BULAN (DINAMIS 2026 BULAN AGUSTUS)
  const trendPertahunData = [
    {
      tahun: "2022",
      HakCipta: 4,
      Merek: 2,
      Paten: 1,
      DesainIndustri: 1,
      DTLST: 0,
    },
    {
      tahun: "2023",
      HakCipta: 7,
      Merek: 3,
      Paten: 3,
      DesainIndustri: 2,
      DTLST: 1,
    },
    {
      tahun: "2024",
      HakCipta: 10,
      Merek: 5,
      Paten: 4,
      DesainIndustri: 3,
      DTLST: 2,
    },
    {
      tahun: "2025",
      HakCipta: 14,
      Merek: 6,
      Paten: 6,
      DesainIndustri: 4,
      DTLST: 3,
    },
    {
      tahun: "Agu 2026",
      HakCipta: stats.totalHakCipta,
      Merek: stats.totalMerek,
      Paten: stats.totalPaten,
      DesainIndustri: stats.totalDesain,
      DTLST: stats.totalDtlst,
    },
  ];

  const currentStatusStats =
    statusPengajuanPerKI[selectedKiFilter] || statusPengajuanPerKI.semua;

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
    { status: "Ditolak", Jumlah: currentStatusStats.ditolak, color: "#F43F5E" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {/* 1. SIDEBAR ADMIN */}
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeMenu={activeMenu}
        onSelectMenu={handleSelectMenu}
        onLogout={onLogout}
      />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. HEADER ADMIN */}
        <HeaderAdmin
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          messages={messages}
          onReadMessage={handleReadMessage}
        />

        {/* 3. KONTEN DASHBOARD UTAMA */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  {/* BANNER JUDUL */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
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
                      Periode: Agustus 2026
                    </div>
                  </div>

                  {/* KARTU STATISTIK UTAMA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        Total Aset KI
                      </p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">
                        {stats.totalAsetKI}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        Aktif
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        Hak Cipta
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {stats.totalHakCipta}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Kategori 1
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        Merek
                      </p>
                      <p className="text-2xl font-bold text-amber-600 mt-1">
                        {stats.totalMerek}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Kategori 2
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        Paten
                      </p>
                      <p className="text-2xl font-bold text-emerald-600 mt-1">
                        {stats.totalPaten}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Kategori 3
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        Desain Industri
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {stats.totalDesain}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Kategori 4
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-500">
                        DTLST
                      </p>
                      <p className="text-2xl font-bold text-pink-600 mt-1">
                        {stats.totalDtlst}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Kategori 5
                      </span>
                    </div>
                  </div>

                  {/* STATISTIK STATUS PENGAJUAN KI (URUTAN SESUAI PERMINTAAN) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                          <BarChart2 className="w-5 h-5 text-indigo-600" />
                          Statistik Status Pengajuan KI
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Pemantauan tahapan verifikasi berdasarkan kategori
                          Kekayaan Intelektual.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-auto bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                        <Filter className="w-4 h-4 text-slate-500 ml-1" />
                        <select
                          value={selectedKiFilter}
                          onChange={(e) => setSelectedKiFilter(e.target.value)}
                          className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2"
                        >
                          <option value="semua">Semua Kategori KI</option>
                          <option value="hakCipta">1. Hak Cipta</option>
                          <option value="merek">2. Merek</option>
                          <option value="paten">3. Paten</option>
                          <option value="desainIndustri">
                            4. Desain Industri
                          </option>
                          <option value="dtlst">5. DTLST</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3.5 p-4 bg-amber-50/70 rounded-xl border border-amber-200/80">
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

                      <div className="flex items-center gap-3.5 p-4 bg-orange-50/70 rounded-xl border border-orange-200/80">
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

                      <div className="flex items-center gap-3.5 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
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

                      <div className="flex items-center gap-3.5 p-4 bg-rose-50/70 rounded-xl border border-rose-200/80">
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
                          Grafik Visual Perbandingan Status (Filter:{" "}
                          {selectedKiFilter})
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

                  {/* GRAFIK TREN PERTAHUN DENGAN WARNA BERBEDA PER KATEGORI KI */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-800">
                          Grafik Pertumbuhan KI Pertahun & Per Bulan
                        </h3>
                        <p className="text-xs text-slate-500">
                          Data otomatis diperbarui hingga periode Agustus 2026
                          dengan warna garis kategori berbeda.
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
                            <Legend wrapperStyle={{ fontSize: "11px" }} />
                            <Line
                              type="monotone"
                              dataKey="HakCipta"
                              name="Hak Cipta"
                              stroke="#3B82F6"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="Merek"
                              name="Merek"
                              stroke="#F59E0B"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="Paten"
                              name="Paten"
                              stroke="#10B981"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="DesainIndustri"
                              name="Desain Industri"
                              stroke="#8B5CF6"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="DTLST"
                              name="DTLST"
                              stroke="#EC4899"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">
                          Distribusi Jenis KI
                        </h3>
                        <p className="text-xs text-slate-500">
                          Persentase pembagian 5 jenis Kekayaan Intelektual
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

                  {/* GRAFIK PEROLEHAN KI PER JURUSAN (LENGKAP 5 JURUSAN POLIBATAM) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-slate-800">
                        Grafik Perolehan KI per Jurusan (Politeknik Negeri
                        Batam)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Distribusi lengkap seluruh 5 jurusan pengusul aset KI di
                        Polibatam.
                      </p>
                    </div>

                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={jurusanStats}
                          margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="nama"
                            tick={{ fontSize: 10, fill: "#475569" }}
                            interval={0}
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
                            dataKey="HakCipta"
                            fill="#3B82F6"
                            stackId="a"
                            name="Hak Cipta"
                          />
                          <Bar
                            dataKey="Merek"
                            fill="#F59E0B"
                            stackId="a"
                            name="Merek"
                          />
                          <Bar
                            dataKey="Paten"
                            fill="#10B981"
                            stackId="a"
                            name="Paten"
                          />
                          <Bar
                            dataKey="DesainIndustri"
                            fill="#8B5CF6"
                            stackId="a"
                            name="Desain Industri"
                          />
                          <Bar
                            dataKey="DTLST"
                            fill="#EC4899"
                            stackId="a"
                            name="DTLST"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* TABEL PENGAJUAN TERBARU */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <h3 className="text-base font-bold text-slate-800 mb-3">
                      Pengajuan Usulan KI Terbaru
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 uppercase">
                          <tr>
                            <th className="p-3">ID Usulan</th>
                            <th className="p-3">Judul KI</th>
                            <th className="p-3">Pengusul & Jurusan</th>
                            <th className="p-3">Jenis Kategori</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {asetData.slice(0, 5).map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50">
                              <td className="p-3 font-semibold text-slate-700">
                                {sub.id}
                              </td>
                              <td className="p-3 font-medium text-slate-800">
                                {sub.title}
                              </td>
                              <td className="p-3 text-slate-600">
                                {sub.inventor}{" "}
                                <span className="block text-[10px] text-slate-400">
                                  {sub.jurusan}
                                </span>
                              </td>
                              <td className="p-3 text-slate-600">
                                {sub.category}
                              </td>
                              <td className="p-3 text-slate-500">
                                {sub.regDate}
                              </td>
                              <td className="p-3">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${sub.status === "Terdaftar" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
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

            {/* ROUTING LAINNYA */}
            <Route path="/users" element={<KelolaPengguna />} />
            <Route path="/aset" element={<KelolaAsetKI />} />
            <Route path="/verifikasi" element={<VerifikasiPengajuan />} />
            <Route path="/lisensi" element={<MinatLisensi />} />
            <Route path="/laporan" element={<CetakLaporan />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
