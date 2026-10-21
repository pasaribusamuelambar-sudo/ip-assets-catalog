import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Calendar,
  Globe,
  Lock,
  FileArchive,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

export default function KelolaAsetKI() {
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem("polibatam_kelola_aset_ki");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Gagal parse data kelola aset", e);
      }
    }
    return [
      {
        id: "KT-2026-104",
        title: "Logo Polibatam angkatan 25",
        category: "Merek",
        subCategory: "Logo 25 polibatam IF",
        inventor: "Ir Jokowi",
        jurusan: "Teknik Mesin",
        regNumber: "MEREK-2026-104",
        regDate: "2026-10-20",
        status: "Ditolak",
        isPublic: false,
        sertifikatTerbit: false,
        berkas: { namaFile: "IP_ASSETS_CATALOG.pdf", url: "#" },
        lampiranDetail: {
          labelLogo: { name: "IP_ASSETS_CATALOG.pdf", url: "#" },
          formMerek: { name: "IP_ASSETS_CATALOG.pdf", url: "#" },
          suratPernyataan: { name: "IP_ASSETS_CATALOG.pdf", url: "#" },
          suratPengalihan: { name: "Tugas_Mandiri_1(1).pdf", url: "#" },
          identitasPemohon: {
            name: "Rekap_Presensi_September_2026(1).pdf",
            url: "#",
          },
        },
      },
      {
        id: "KI-2026-972",
        title: "Logo Polibatam angkatan 25",
        category: "Merek",
        subCategory: "Logo Polibatam",
        inventor: "Ir Jokowi",
        jurusan: "Teknik Mesin",
        regNumber: "EC00202612345",
        regDate: "2026-10-20",
        status: "Terdaftar",
        isPublic: true,
        sertifikatTerbit: true,
        berkas: { namaFile: "Logo_Polibatam.pdf", url: "#" },
      },
      {
        id: "KI-2026-784",
        title: "Game Bola digital",
        category: "Hak Cipta",
        subCategory: "Program Komputer / Software",
        inventor: "Cristiano Ronaldo, S.T",
        jurusan: "Teknik Elektro",
        regNumber: "-",
        regDate: "2026-10-20",
        status: "Ditolak",
        isPublic: false,
        sertifikatTerbit: false,
        berkas: { namaFile: "Game_Bola.pdf", url: "#" },
      },
      {
        id: "KT-2026-617",
        title: "Desain Tata Letak Sirkuit Terpadu...",
        category: "DTLST",
        subCategory: "Tata Letak Chip Mikroprosesor & Pengendali",
        inventor: "Ir Jokowi",
        jurusan: "Teknik Elektro",
        regNumber: "DTLST-2026-08",
        regDate: "2026-10-20",
        status: "Terdaftar",
        isPublic: true,
        sertifikatTerbit: true,
        berkas: { namaFile: "DTLST_Chip.pdf", url: "#" },
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("polibatam_kelola_aset_ki", JSON.stringify(assets));
  }, [assets]);

  // Mode Tampilan Dropdown di Banner Atas
  const [viewMode, setViewMode] = useState("status_ki"); // Options: "status_ki" | "berkas_lengkap"

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedYear, setSelectedYear] = useState("Semua");
  const [selectedJurusan, setSelectedJurusan] = useState("Semua");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    "Hak Cipta",
    "Merek",
    "Paten",
    "Desain Industri",
    "DTLST",
  ];
  const jurusans = [
    "Teknik Informatika",
    "Teknik Elektro",
    "Teknik Mesin",
    "Manajemen Bisnis",
    "Teknik Sipil",
  ];
  const years = ["2026", "2025", "2024", "2023"];

  // Pengaturan Privasi Publikasi (Publik / Privat)
  const handleTogglePrivacy = (id) => {
    const updated = assets.map((a) =>
      a.id === id ? { ...a, isPublic: !a.isPublic } : a,
    );
    setAssets(updated);
  };

  // Pemberian Sertifikat Otomatis saat Berkas Lengkap / Status Disetujui
  const handleUpdateStatus = (id, newStatus) => {
    const updated = assets.map((a) => {
      if (a.id === id) {
        const isApproved = newStatus === "Terdaftar";
        return {
          ...a,
          status: newStatus,
          sertifikatTerbit: isApproved,
          regNumber: isApproved
            ? a.regNumber !== "-"
              ? a.regNumber
              : `REG-${Date.now().toString().slice(-8)}`
            : "-",
        };
      }
      return a;
    });
    setAssets(updated);
    setActiveDropdown(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data aset KI ini?")) {
      setAssets(assets.filter((a) => a.id !== id));
    }
    setActiveDropdown(null);
  };

  // Unduh Berkas ZIP setelah Direview pada Modal
  const handleDownloadZipPackage = (asset) => {
    const cleanName = asset.inventor.replace(/[^a-zA-Z0-9]/g, "_");
    const zipFileName = `[ZIP]_Review_Berkas_${asset.id}_${cleanName}.zip`;

    const element = document.createElement("a");
    const fileContent = `PK\x03\x04... [Sistem KI Polibatam - ZIP Paket Berkas Pengajuan KI & Sertifikat Resmi Inventor: ${asset.inventor} | Judul: ${asset.title}]`;
    const file = new Blob([fileContent], { type: "application/zip" });
    element.href = URL.createObjectURL(file);
    element.download = zipFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert(`Mengunduh Berkas ZIP Hasil Review:\n${zipFileName}`);
  };

  const handleOpenFile = (fileObj) => {
    alert(
      `Pratinjau Berkas: ${fileObj?.name || fileObj?.namaFile || "Dokumen.pdf"}`,
    );
  };

  // Filtering Logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.inventor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || asset.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "Semua" || asset.status === selectedStatus;
    const matchesYear =
      selectedYear === "Semua" ||
      (asset.regDate && asset.regDate.startsWith(selectedYear));
    const matchesJurusan =
      selectedJurusan === "Semua" || asset.jurusan === selectedJurusan;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesYear &&
      matchesJurusan
    );
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredAssets.slice(
    indexOfFirstEntry,
    indexOfLastEntry,
  );
  const totalPages = Math.ceil(filteredAssets.length / entriesPerPage) || 1;

  return (
    <div className="space-y-6 text-slate-800 font-sans">
      {/* BANNER HEADER DENGAN DROPDOWN SESUAI TANDA MERAH */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Kelola Data Aset KI & Persetujuan Admin
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Admin dapat meninjau, melihat, mengunduh lampiran, serta mengelola
            status permohonan KI dosen secara real-time.
          </p>
        </div>

        {/* DROPDOWN PILIHAN TAMPILAN SESUAI PERMINTAAN TANDA MERAH */}
        <div className="relative flex-shrink-0">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 shadow-xs">
            <span>Tampilan Mode:</span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="bg-transparent font-extrabold text-blue-900 focus:outline-none cursor-pointer pr-1"
            >
              <option value="status_ki">1. Status KI</option>
              <option value="berkas_lengkap">
                2. Berkas Lengkap & Sertifikat
              </option>
            </select>
            <ChevronDown className="w-4 h-4 text-blue-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* FILTER PENCARIAN */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari Judul KI, ID KI, atau Nama Inventor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Terdaftar">Terdaftar (Disetujui)</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Ditolak">Ditolak / Revisi</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Semua">Semua Tahun</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <select
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Semua">Semua Jurusan / Prodi</option>
                {jurusans.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Tampilkan:</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
            >
              <option value={10}>10 entri</option>
              <option value={50}>50 entri</option>
              <option value={100}>100 entri</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABEL UTAMA ASET KI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">ID KI</th>
                <th className="p-4">Tanggal Di Ajukan</th>
                <th className="p-4">Judul Asset KI</th>
                <th className="p-4">Kategori KI</th>
                <th className="p-4">Nama Dosen Inventor & Jurusan</th>
                <th className="p-4 text-center">Dokumen KI</th>
                <th className="p-4">Jenis & Sub Ciptaan KI</th>

                {/* DYNAMIC HEADER BERDASARKAN DROPDOWN BANNER */}
                {viewMode === "status_ki" ? (
                  <th className="p-4">Status KI</th>
                ) : (
                  <>
                    <th className="p-4">Berkas & Sertifikat Dosen</th>
                    <th className="p-4 text-center">Akses Masyarakat</th>
                  </>
                )}

                <th className="p-4 text-center">Kelola Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {currentEntries.length > 0 ? (
                currentEntries.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                      {asset.id}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {asset.regNumber || "-"}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-slate-600 font-medium">
                      {asset.regDate || "2026-10-20"}
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-semibold text-slate-800 line-clamp-2">
                        {asset.title}
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-100">
                        {asset.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-bold text-slate-800">
                        {asset.inventor}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {asset.jurusan}
                      </p>
                    </td>

                    {/* DOKUMEN KI: HANYA ADA 1 TOMBOL "LIHAT" (TANPA UNDUH BERTUMPUK) */}
                    <td className="p-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          setSelectedAsset(asset);
                          setIsDetailOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 transition text-[11px] cursor-pointer"
                        title="Lihat Detail & Review Berkas"
                      >
                        <Eye className="w-3.5 h-3.5" /> Lihat
                      </button>
                    </td>

                    <td className="p-4 font-medium text-slate-600 whitespace-nowrap">
                      {asset.subCategory || "Program Komputer / Software"}
                    </td>

                    {/* MODE TAMPILAN 1: STATUS KI */}
                    {viewMode === "status_ki" && (
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${
                            asset.status === "Terdaftar"
                              ? "bg-emerald-100 text-emerald-700"
                              : asset.status === "Dalam Proses"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {asset.status === "Terdaftar" && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          {asset.status === "Dalam Proses" && (
                            <Clock className="w-3 h-3" />
                          )}
                          {asset.status === "Ditolak" && (
                            <XCircle className="w-3 h-3" />
                          )}
                          {asset.status}
                        </span>
                      </td>
                    )}

                    {/* MODE TAMPILAN 2: BERKAS LENGKAP & SERTIFIKAT DOSEN */}
                    {viewMode === "berkas_lengkap" && (
                      <>
                        <td className="p-4 whitespace-nowrap">
                          {asset.sertifikatTerbit ? (
                            <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                              Sertifikat Terbit Dosen
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">
                              Belum Diberikan Sertifikat
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleTogglePrivacy(asset.id)}
                            className={`px-3 py-1 rounded-xl text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer transition ${
                              asset.isPublic
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {asset.isPublic ? (
                              <Globe className="w-3 h-3" />
                            ) : (
                              <Lock className="w-3 h-3" />
                            )}
                            {asset.isPublic ? "Publik" : "Privat"}
                          </button>
                        </td>
                      </>
                    )}

                    <td className="p-4 text-center whitespace-nowrap relative">
                      <div className="flex items-center justify-center gap-2">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === asset.id ? null : asset.id,
                              )
                            }
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {activeDropdown === asset.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-20 py-1 text-left">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(asset.id, "Terdaftar")
                                }
                                className="w-full px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Berkas
                                Lengkap (Beri Sertifikat)
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(asset.id, "Ditolak")
                                }
                                className="w-full px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Ditolak /
                                Belum Lengkap
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-slate-400">
                    Tidak ada data aset KI yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Menampilkan {filteredAssets.length > 0 ? indexOfFirstEntry + 1 : 0}{" "}
            sampai {Math.min(indexOfLastEntry, filteredAssets.length)} dari{" "}
            {filteredAssets.length} entri
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-50 cursor-pointer"
            >
              Sebelumnya
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold disabled:opacity-50 cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PRATINJAU REVIEW & UNDUH ZIP */}
      {isDetailOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-100 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">
                  {selectedAsset.category} • {selectedAsset.subCategory}
                </span>
                <h3 className="text-base font-bold text-slate-800">
                  {selectedAsset.title}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>ID KI:</strong> {selectedAsset.id}
              </p>
              <p>
                <strong>Tanggal Diajukan:</strong> {selectedAsset.regDate}
              </p>
              <p>
                <strong>Inventor / Dosen:</strong> {selectedAsset.inventor} (
                {selectedAsset.jurusan})
              </p>
              <p>
                <strong>Status:</strong> {selectedAsset.status}
              </p>

              {/* REVIEW LAMPIRAN BERKAS */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <p className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                  Daftar Berkas & Lampiran Wajib Kategori (
                  {selectedAsset.category}):
                </p>

                {selectedAsset.lampiranDetail &&
                Object.keys(selectedAsset.lampiranDetail).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(selectedAsset.lampiranDetail).map(
                      ([key, fileObj]) =>
                        fileObj?.name ? (
                          <div
                            key={key}
                            className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span className="font-semibold text-slate-700 capitalize truncate">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </span>
                              <span className="text-blue-600 truncate">
                                {fileObj.name}
                              </span>
                            </div>
                            <button
                              onClick={() => handleOpenFile(fileObj)}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded hover:bg-blue-100 text-[10px] cursor-pointer"
                            >
                              Lihat
                            </button>
                          </div>
                        ) : null,
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 italic">
                    Tidak ada lampiran detail tambahan.
                  </p>
                )}
              </div>

              {/* SERTIFIKAT DIBERIKAN KE DOSEN */}
              {selectedAsset.sertifikatTerbit && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />{" "}
                    Sertifikat Resmi Telah Diterbitkan ke Dosen Inventor
                  </span>
                </div>
              )}

              {/* TOMBOL UNDUH ZIP DI MODAL SETELAH REVIEW */}
              <div className="pt-2">
                <button
                  onClick={() => handleDownloadZipPackage(selectedAsset)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer text-xs"
                >
                  <FileArchive className="w-4 h-4" /> Unduh Arsip ZIP Hasil
                  Review ({selectedAsset.inventor})
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  handleUpdateStatus(selectedAsset.id, "Ditolak");
                  setIsDetailOpen(false);
                }}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl cursor-pointer"
              >
                Ubah Status: Ditolak
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedAsset.id, "Terdaftar");
                  setIsDetailOpen(false);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Ubah Status: Disetujui & Beri Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
