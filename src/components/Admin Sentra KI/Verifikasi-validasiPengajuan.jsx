import React, { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Search,
  Award,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building2,
  ChevronDown,
  Printer
} from "lucide-react";

export default function VerifikasiPengajuan() {
  const [selectedCategory, setSelectedCategory] = useState("Hak Cipta");

  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("Semua");

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Inisialisasi data dengan memuat dari localStorage agar perubahan tidak hilang saat refresh / pindah halaman
  const [pengajuan, setPengajuan] = useState(() => {
    const saved = localStorage.getItem("polibatam_pengajuan_ki_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Gagal parse localStorage", e);
      }
    }
    return [
      {
        id: "HKI-2026-001",
        nama: "Dr. Eng. Ahmad Yani, M.T.",
        jurusan: "Teknik Informatika",
        tglDiajukan: "2026-09-24",
        judul: "Sistem Presensi Deteksi Wajah Real-Time Berbasis AI",
        jenisKI: "Hak Cipta",
        jenis: "Hak Cipta",
        subCiptaan: "Program Komputer / Software",
        status: "Menunggu Verifikasi",
        catatan: "",
        isRead: false,
      },
      {
        id: "HKI-2026-002",
        nama: "Budi Santoso, S.ST., M.T.",
        jurusan: "Teknik Mesin",
        tglDiajukan: "2026-08-15",
        judul: "Desain Ergonomis Meja Kerja Laboratorium Industri",
        jenisKI: "Desain Industri",
        jenis: "Desain Industri",
        subCiptaan: "Furnitur & Peralatan Kerja",
        status: "Perlu Tindak Lanjut",
        catatan: "Dokumen klaim gambar teknik kurang jelas.",
        isRead: false,
      },
      // DATA PERCOBAAN ATAS NAMA ANDA DI KATEGORI DESAIN INDUSTRI
      {
        id: "HKI-2026-SAM",
        nama: "Samuel Ambar Pasaribu",
        jurusan: "Teknik Informatika",
        tglDiajukan: "2026-10-01",
        judul: "Prototype Smart Controller IoT Berbasis Mobile App",
        jenisKI: "Desain Industri",
        jenis: "Desain Industri",
        subCiptaan: "Perangkat Keras & Kontroler",
        status: "Disetujui",
        catatan: "Usulan uji coba berhasil dan valid.",
        isRead: false,
      },
      {
        id: "HKI-2026-003",
        nama: "Dr. Ir. Rina Wijaya, M.Sc.",
        jurusan: "Teknik Elektro",
        tglDiajukan: "2026-09-10",
        judul: "Proses Ekstraksi Gelatin Ikan Lokal Batam",
        jenisKI: "Paten",
        jenis: "Paten",
        subCiptaan: "Paten Sederhana - Teknologi Pangan",
        status: "Disetujui",
        catatan: "Berkas lengkap dan sesuai kriteria.",
        isRead: false,
      },
      {
        id: "HKI-2026-004",
        nama: "Deni Prasetyo, S.Kom., M.Kom.",
        jurusan: "Teknik Informatika",
        tglDiajukan: "2026-09-02",
        judul: "Logo & Brand Portal Edukasi 'Polibatam Digital'",
        jenisKI: "Merek",
        jenis: "Merek",
        subCiptaan: "Merek Jasa Edukasi & Software",
        status: "Disetujui",
        catatan: "Sertifikat diterbitkan.",
        isRead: false,
      },
      {
        id: "HKI-2026-005",
        nama: "Siti Rahmawati, M.T.",
        jurusan: "Teknik Elektro",
        tglDiajukan: "2025-11-12",
        judul: "Tata Letak Sirkuit Terpadu Smart Sensor IoT",
        jenisKI: "DTLST",
        jenis: "DTLST",
        subCiptaan: "Desain Tata Letak Sirkuit Terpadu",
        status: "Disetujui",
        catatan: "Validasi usulan 2025 disetujui.",
        isRead: false,
      },
    ];
  });

  // Simpan permanen ke localStorage setiap kali state pengajuan berubah
  useEffect(() => {
    localStorage.setItem("polibatam_pengajuan_ki_v2", JSON.stringify(pengajuan));
  }, [pengajuan]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [catatanRevisi, setCatatanRevisi] = useState("");
  const [actionTargetStatus, setActionTargetStatus] = useState("");
  const [certificateItem, setCertificateItem] = useState(null);

  const categoriesList = [
    "Hak Cipta",
    "Paten",
    "Desain Industri",
    "Merek",
    "DTLST",
  ];

  const monthsList = [
    { value: "Semua", label: "Semua Bulan" },
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  // SAAT KATEGORI DIKLIK: TANDAI SEBAGAI DIBACA SECARA PERMANEN
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    setPengajuan((prev) =>
      prev.map((item) =>
        item.jenisKI === category ? { ...item, isRead: true } : item
      )
    );
  };

  // FILTER DATA BERDASARKAN KATEGORI, TANGGAL DIAJUKAN, & PENCARIAN
  const filteredData = useMemo(() => {
    return pengajuan.filter((item) => {
      const matchCategory = item.jenisKI === selectedCategory;
      const itemDate = new Date(item.tglDiajukan);
      const itemYear = itemDate.getFullYear().toString();
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");

      const matchYear = selectedYear === "Semua" || itemYear === selectedYear;
      const matchMonth = selectedMonth === "Semua" || itemMonth === selectedMonth;

      const q = searchTerm.toLowerCase();
      const matchSearch =
        item.id.toLowerCase().includes(q) ||
        item.nama.toLowerCase().includes(q) ||
        item.jurusan.toLowerCase().includes(q) ||
        item.judul.toLowerCase().includes(q) ||
        item.subCiptaan.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q);

      return matchCategory && matchYear && matchMonth && matchSearch;
    });
  }, [pengajuan, selectedCategory, selectedYear, selectedMonth, searchTerm]);

  const sortedAndFilteredData = useMemo(() => {
    return [...filteredData].sort(
      (a, b) => new Date(b.tglDiajukan) - new Date(a.tglDiajukan)
    );
  }, [filteredData]);

  // PAGINATION
  const totalEntries = sortedAndFilteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedAndFilteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const openActionModal = (item, targetStatus) => {
    setSelectedItem(item);
    setActionTargetStatus(targetStatus);
    setCatatanRevisi(item.catatan || "");
  };

  const handleVerifikasiSubmit = () => {
    if (
      (actionTargetStatus === "Ditolak" ||
        actionTargetStatus === "Perlu Tindak Lanjut") &&
      !catatanRevisi.trim()
    ) {
      alert("Harap berikan catatan revisi atau alasan penolakan!");
      return;
    }

    setPengajuan((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, status: actionTargetStatus, catatan: catatanRevisi, isRead: true }
          : item
      )
    );
    setSelectedItem(null);
    setActionTargetStatus("");
    setCatatanRevisi("");
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* HEADER UTAMA */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Verifikasi & Validasi Pengajuan Kekayaan Intelektual
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Portal Verifikasi Usulan KI Polibatam. Pengesahan usulan, rekap
          periode tanggal diajukan, dan pembuatan sertifikat penghargaan otomatis.
        </p>
      </div>

      {/* FILTER PERIODE TANGGAL & DROPDOWN KATEGORI KI */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          
          {/* SINGLE DROPDOWN KATEGORI KI */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Pilih Kategori KI:</span>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none bg-blue-600 text-white text-xs font-bold px-4 py-2 pr-9 rounded-xl shadow-md focus:outline-none cursor-pointer hover:bg-blue-700 transition"
              >
                {categoriesList.map((cat) => {
                  const unreadCount = pengajuan.filter(
                    (p) => p.jenisKI === cat && !p.isRead
                  ).length;

                  return (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-white text-slate-800 font-medium"
                    >
                      {cat} {unreadCount > 0 ? `(${unreadCount})` : ""}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-4 h-4 text-white absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* Filter Periode Berdasarkan Tanggal Diajukan */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Tanggal Diajukan:</span>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50 cursor-pointer"
            >
              <option value="Semua">Semua Tahun</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
              <option value="2024">Tahun 2024</option>
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-slate-50 cursor-pointer"
            >
              {monthsList.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="text-xs text-slate-500">
          Kategori Aktif: <strong className="text-slate-800">{selectedCategory}</strong>
        </div>
      </div>

      {/* TOOLBAR SEARCH & DATATABLES ENTRIES */}
      <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <span>Tampilkan</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 rounded-lg border border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer bg-slate-50"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entri per halaman</span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ID, Nama, Jurusan, Judul..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-slate-50 font-medium"
          />
        </div>
      </div>

      {/* TABEL USULAN DENGAN KOLOM AKSI & SERTIFIKAT YANG DIPISAH */}
      <div className="bg-white rounded-b-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200 tracking-wider">
              <tr>
                <th className="p-4">#Id</th>
                <th className="p-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Tgl Diajukan</span>
                  </div>
                </th>
                <th className="p-4">Nama & Jurusan</th>
                <th className="p-4">Judul {selectedCategory}</th>
                <th className="p-4">Jenis & Sub Ciptaan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi Verifikasi</th>
                <th className="p-4 text-center">Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400 font-medium">
                    Tidak ada data usulan {selectedCategory} pada periode tanggal ini.
                  </td>
                </tr>
              ) : (
                currentEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-800">{item.id}</td>

                    <td className="p-4 text-slate-600 whitespace-nowrap font-medium">
                      {item.tglDiajukan}
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-slate-800">{item.nama}</p>
                      <p className="text-[11px] text-blue-600 font-semibold">
                        {item.jurusan}
                      </p>
                    </td>

                    <td className="p-4 max-w-xs">
                      <p className="font-bold text-slate-800 line-clamp-2">
                        {item.judul}
                      </p>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-700 block">
                        {item.jenis}
                      </span>
                      <span className="inline-block mt-0.5 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        {item.subCiptaan}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                          item.status === "Disetujui"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                            : item.status === "Perlu Tindak Lanjut" || item.status === "Ditolak"
                              ? "bg-rose-100 text-rose-700 border border-rose-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* KOLOM AKSI (TOLAK/REVISI & SETUJUI) */}
                    <td className="p-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openActionModal(item, "Perlu Tindak Lanjut")}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg border border-rose-200 transition text-[11px] flex items-center gap-1 cursor-pointer"
                          title="Tolak atau Revisi"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Tolak/Revisi
                        </button>

                        <button
                          onClick={() => openActionModal(item, "Disetujui")}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg border border-emerald-200 transition text-[11px] flex items-center gap-1 cursor-pointer"
                          title="Setujui dan Validasi"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                        </button>
                      </div>
                    </td>

                    {/* KOLOM SERTIFIKAT TERPISAH */}
                    <td className="p-4 text-center whitespace-nowrap">
                      {item.status === "Disetujui" ? (
                        <button
                          onClick={() => setCertificateItem(item)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-[11px] inline-flex items-center gap-1 cursor-pointer shadow-xs"
                          title="Cetak Sertifikat"
                        >
                          <Award className="w-3.5 h-3.5" /> Sertifikat
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Belum Tersedia</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER PAGINATION */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div>
            Menampilkan {indexOfFirstEntry + 1} hingga{" "}
            {Math.min(indexOfLastEntry, totalEntries)} dari {totalEntries} total
            entri usulan
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-bold text-slate-800">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL VERIFIKASI AKSI */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-800">
                  Keputusan Verifikasi: {actionTargetStatus}
                </h3>
                <p className="text-xs text-slate-400">ID Usulan: {selectedItem.id}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Judul Karya / KI:</span>
                <p className="font-bold text-slate-800 text-sm">{selectedItem.judul}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Catatan / Alasan:</span>
                <textarea
                  rows="3"
                  value={catatanRevisi}
                  onChange={(e) => setCatatanRevisi(e.target.value)}
                  placeholder="Tuliskan catatan perbaikan atau alasan verifikasi..."
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700 font-medium"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleVerifikasiSubmit}
                className={`px-4 py-2 font-bold text-white rounded-xl transition cursor-pointer text-xs ${
                  actionTargetStatus === "Disetujui"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                Simpan Keputusan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SERTIFIKAT */}
      {certificateItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border-4 border-amber-400 relative my-8">
            <button
              onClick={() => setCertificateItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 print:hidden text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-4 border-2 border-dashed border-amber-300 p-6 rounded-xl bg-amber-50/20">
              <div className="flex justify-center items-center gap-3">
                <Building2 className="w-10 h-10 text-blue-700" />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 uppercase tracking-widest">
                    POLITEKNIK NEGERI BATAM
                  </h3>
                  <p className="text-xs font-semibold text-blue-800">
                    SENTRA KEKAYAAN INTELEKTUAL (KI) POLIBATAM
                  </p>
                </div>
              </div>

              <div className="py-2">
                <span className="px-4 py-1 bg-amber-100 text-amber-800 text-xs font-black uppercase rounded-full tracking-wider border border-amber-300">
                  SERTIFIKAT PENGHARGAAN KARYA INTELEKTUAL
                </span>
              </div>

              <p className="text-xs text-slate-600 italic">
                Diberikan secara terintegrasi melalui IP Assets Catalog kepada:
              </p>

              <h2 className="text-xl font-black text-slate-900 underline decoration-amber-500 decoration-2">
                {certificateItem.nama}
              </h2>
              <p className="text-xs font-bold text-blue-700">
                {certificateItem.jurusan}
              </p>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Atas dedikasi dan kontribusi nyata menyumbangkan karya
                intelektual terbaiknya berupa usulan{" "}
                <strong>{certificateItem.jenisKI}</strong> dengan judul:
              </p>

              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-bold text-slate-800 shadow-2xs italic">
                "{certificateItem.judul}"
              </div>

              <div className="grid grid-cols-2 gap-4 text-left text-[11px] text-slate-500 pt-4 border-t border-slate-200">
                <div>
                  <p><strong>ID Registrasi:</strong> {certificateItem.id}</p>
                  <p><strong>Tanggal Diajukan:</strong> {certificateItem.tglDiajukan}</p>
                </div>
                <div className="text-right">
                  <p><strong>Status:</strong> Terverifikasi & Terkatalog</p>
                  <p><strong>Sistem:</strong> IP Assets Catalog Polibatam</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 print:hidden">
              <button
                onClick={() => setCertificateItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Cetak / Unduh Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}