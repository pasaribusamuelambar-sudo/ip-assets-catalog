import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  FileText,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  X,
  ExternalLink,
  Download,
  FileArchive,
  Link2,
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
        id: "KI-2026-001",
        title: "Sistem Presensi Deteksi Wajah Real-Time Berbasis AI",
        category: "Hak Cipta",
        subCategory: "Program Komputer",
        inventor: "Dr. Eng. Ahmad Yani, M.T.",
        jurusan: "Teknik Informatika",
        regNumber: "EC00202612345",
        regDate: "2026-01-15",
        status: "Terdaftar",
        berkas: { namaFile: "dokumen_presensi_ai.pdf", tipe: "pdf", url: "#" },
      },
      {
        id: "KI-2026-002",
        title: "Desain Ergonomis Meja Kerja Laboratorium Industri",
        category: "Desain Industri",
        subCategory: "Mebel & Perabot",
        inventor: "Samuel Ambar Pasaribu",
        jurusan: "Teknik Informatika",
        regNumber: "IDD000054321",
        regDate: "2026-03-01",
        status: "Dalam Proses",
        berkas: { namaFile: "desain_meja_lab_3d.zip", tipe: "zip", url: "#" },
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("polibatam_kelola_aset_ki", JSON.stringify(assets));
  }, [assets]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const categories = [
    "Hak Cipta",
    "Merek",
    "Paten",
    "Desain Industri",
    "DTLST",
  ];

  const handleUpdateStatus = (id, newStatus) => {
    setAssets(
      assets.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data aset KI ini?")) {
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.inventor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.regNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || asset.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "Semua" || asset.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Kelola Data Aset KI & Persetujuan Admin
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Admin dapat meninjau berkas karya (PDF/ZIP/Drive) dengan mengklik
            tombol akses di bawah.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari Judul KI, Pengusul, atau No. Registrasi..."
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
            <option value="Semua">Semua Kategori KI</option>
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
            <option value="Dalam Proses">Dalam Proses (Menunggu)</option>
            <option value="Ditolak">Ditolak / Revisi</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">ID & No. Reg</th>
                <th className="p-4">Judul Aset KI</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Inventor / Dosen</th>
                <th className="p-4">Dokumen Karya</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Kelola / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4 font-mono font-medium">
                      <span className="text-blue-600 block font-bold">
                        {asset.id}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {asset.regNumber || "-"}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-semibold text-slate-800 line-clamp-2">
                        {asset.title}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {asset.subCategory}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-100">
                        {asset.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">
                        {asset.inventor}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {asset.jurusan}
                      </p>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {asset.berkas?.tipe === "drive" ? (
                        <a
                          href={asset.berkas.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition text-[11px]"
                        >
                          <Link2 className="w-3.5 h-3.5 text-blue-600" /> Buka
                          Drive
                        </a>
                      ) : asset.berkas?.tipe === "zip" ? (
                        <a
                          href={
                            asset.berkas?.url && asset.berkas.url !== "#"
                              ? asset.berkas.url
                              : "#"
                          }
                          download={asset.berkas?.namaFile || "karya.zip"}
                          onClick={(e) => {
                            if (
                              !asset.berkas?.url ||
                              asset.berkas.url === "#"
                            ) {
                              e.preventDefault();
                              alert(
                                `File ZIP "${asset.berkas?.namaFile || "arsip"}" siap diunduh.`,
                              );
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg border border-purple-200 hover:bg-purple-100 transition text-[11px]"
                        >
                          <FileArchive className="w-3.5 h-3.5 text-purple-600" />{" "}
                          Download ZIP
                        </a>
                      ) : (
                        <a
                          href={
                            asset.berkas?.url && asset.berkas.url !== "#"
                              ? asset.berkas.url
                              : "#"
                          }
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => {
                            if (
                              !asset.berkas?.url ||
                              asset.berkas.url === "#"
                            ) {
                              e.preventDefault();
                              alert(
                                `Membuka dokumen PDF: ${asset.berkas?.namaFile || "Naskah_Karya.pdf"}`,
                              );
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 hover:bg-emerald-100 transition text-[11px]"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />{" "}
                          Buka PDF
                        </a>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${
                          asset.status === "Terdaftar"
                            ? "bg-emerald-100 text-emerald-700"
                            : asset.status === "Dalam Proses"
                              ? "bg-amber-100 text-amber-800 animate-pulse"
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

                    <td className="p-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() =>
                            handleUpdateStatus(asset.id, "Terdaftar")
                          }
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-md text-[10px] transition cursor-pointer"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(asset.id, "Ditolak")
                          }
                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-md text-[10px] transition cursor-pointer"
                        >
                          Revisi
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAsset(asset);
                            setIsDetailOpen(true);
                          }}
                          className="p-1 hover:bg-slate-100 text-slate-500 rounded-lg"
                          title="Detail Berkas"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-1 hover:bg-slate-100 text-slate-500 hover:text-rose-600 rounded-lg"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    Belum ada data usulan aset KI dari dosen inventor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDetailOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4 text-xs">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">
                  {selectedAsset.category}
                </span>
                <h3 className="text-base font-bold text-slate-800">
                  {selectedAsset.title}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Inventor:</strong> {selectedAsset.inventor} (
                {selectedAsset.jurusan})
              </p>
              <p>
                <strong>Status:</strong> {selectedAsset.status}
              </p>
              <p>
                <strong>Deskripsi:</strong>{" "}
                {selectedAsset.deskripsi || "Tidak ada deskripsi rinci."}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-3 space-y-1.5">
                <p className="font-bold text-slate-700">Berkas Utama Karya:</p>
                <p className="text-blue-600 font-semibold">
                  {selectedAsset.berkas?.namaFile || "Naskah_Dokumen_KI.pdf"}
                </p>
                {selectedAsset.berkas?.url &&
                  selectedAsset.berkas.url !== "#" && (
                    <a
                      href={selectedAsset.berkas.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-1 text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      🔗 Buka Tautan Berkas Langsung
                    </a>
                  )}

                {selectedAsset.berkasPendukung1 && (
                  <div className="pt-2 border-t border-slate-200">
                    <p className="font-bold text-amber-800">
                      Dokumen Pendukung:
                    </p>
                    <p className="text-slate-600">
                      • {selectedAsset.berkasPendukung1}
                    </p>
                    {selectedAsset.berkasPendukung2 && (
                      <p className="text-slate-600">
                        • {selectedAsset.berkasPendukung2}
                      </p>
                    )}
                    {selectedAsset.berkasPendukung3 && (
                      <p className="text-slate-600">
                        • {selectedAsset.berkasPendukung3}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
