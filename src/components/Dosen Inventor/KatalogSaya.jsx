import React, { useState, useEffect } from "react";
import {
  Download,
  CheckCircle,
  Clock,
  Globe,
  Lock,
  Award,
  ShieldCheck,
  Eye,
  X,
  FileCheck2,
} from "lucide-react";

export default function KatalogSaya() {
  const [listAset, setListAset] = useState(() => {
    const saved = localStorage.getItem("polibatam_kelola_aset_ki");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Gagal membaca data aset KI", e);
      }
    }
    // Data bawaan presisi jika local storage masih kosong
    return [
      {
        id: "KI-2026-104",
        title: "Logo Polibatam angkatan 25",
        category: "Merek",
        regDate: "2026-10-20",
        status: "Terdaftar",
        regNumber: "MEREK-2026-104",
        isPublic: false,
        inventor: "Ir Jokowi",
      },
      {
        id: "KI-2026-972",
        title: "Logo Polibatam angkatan 25",
        category: "Merek",
        regDate: "2026-10-20",
        status: "Terdaftar",
        regNumber: "EC00202612345",
        isPublic: true,
        inventor: "Ir Jokowi",
      },
      {
        id: "KI-2026-637",
        title:
          "Desain Tata Letak Sirkuit Terpadu Pengontrol Konsumsi Daya Berbasis Microcontroller Kustom untuk Perangkat Sensor IoT Kelautan",
        category: "DTLST",
        regDate: "2026-10-20",
        status: "Terdaftar",
        regNumber: "DTLST-2026-08",
        isPublic: false,
        inventor: "Ir Jokowi",
      },
      {
        id: "KI-2026-574",
        title: "bansos",
        category: "Hak Cipta",
        regDate: "2026-10-15",
        status: "Terdaftar",
        regNumber: "EC002026574",
        isPublic: false,
        inventor: "Ir Jokowi",
      },
      {
        id: "KI-2026-001",
        title: "Sistem Presensi Deteksi Wajah Real-Time Berbasis AI",
        category: "Hak Cipta",
        regDate: "2026-01-15",
        status: "Terdaftar",
        regNumber: "EC00202612345",
        isPublic: false,
        inventor: "Dr. Eng. Ahmad Yani, M.T.",
      },
      {
        id: "KI-2026-002",
        title: "Desain Ergonomis Meja Kerja Laboratorium Industri",
        category: "Desain Industri",
        regDate: "2026-03-01",
        status: "Terdaftar",
        regNumber: "IDD000054321",
        isPublic: false,
        inventor: "Samuel Ambar Pasaribu",
      },
      {
        id: "KI-2026-546",
        title: "apa ya",
        category: "Hak Cipta",
        regDate: "2026-10-15",
        status: "Dalam Proses",
        regNumber: "-",
        isPublic: false,
        inventor: "Ir Jokowi",
      },
    ];
  });

  const [previewSertifikat, setPreviewSertifikat] = useState(null);

  // Simpan perubahan privasi publikasi ke LocalStorage
  useEffect(() => {
    localStorage.setItem("polibatam_kelola_aset_ki", JSON.stringify(listAset));
  }, [listAset]);

  // Toggle Privasi Publik / Privat dari Dosen Inventor
  const handleTogglePrivacy = (id) => {
    const updated = listAset.map((item) =>
      item.id === id ? { ...item, isPublic: !item.isPublic } : item,
    );
    setListAset(updated);
  };

  // FUNGSI PENGUNDUHAN BERKAS SERTIFIKAT KEKAYAAN INTELEKTUAL (PDF)
  const handleDownloadSertifikat = (item) => {
    const fileName = `Sertifikat_KI_${item.id}_${item.category.replace(/\s+/g, "_")}.pdf`;

    // Membuat file dummy PDF untuk diunduh langsung di browser
    const content = `%PDF-1.4 ... [Sertifikat Kekayaan Intelektual Resmi Sentra HKI Polibatam | ID: ${item.id} | Judul: ${item.title} | No Reg: ${item.regNumber}]`;
    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const asetProses = listAset.filter((a) => a.status === "Dalam Proses");
  const asetDisetujui = listAset.filter(
    (a) => a.status === "Terdaftar" || a.status === "Disetujui",
  );

  return (
    <div className="space-y-6 text-slate-800 font-sans">
      {/* BANNER HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" /> Asset Kekayaan Intelektual
          Saya
        </h2>
        <p className="text-xs text-slate-500">
          Kelola berkas KI yang sedang dalam proses verifikasi, lihat portofolio
          berkontribusi Anda, serta lihat dan unduh sertifikat resmi KI.
        </p>
      </div>

      {/* 1. BERKAS DALAM PROSES VERIFIKASI ADMIN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" /> Berkas KI Dalam Proses
          Verifikasi Admin
        </h3>
        {asetProses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/60 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-3">ID Usulan</th>
                  <th className="p-3">Judul KI</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Tanggal Pengajuan</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {asetProses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-600">
                      {item.id}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {item.title}
                    </td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3 font-mono text-slate-500">
                      {item.regDate}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold">
                        Dalam Proses Verifikasi
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Tidak ada usulan KI yang sedang dalam proses.
          </p>
        )}
      </div>

      {/* 2. PORTOFOLIO ASSET TERVERIFIKASI & SERTIFIKAT KI */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Portofolio Asset
          Disetujui & Sertifikat KI
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">ID & No. Sertifikat</th>
                <th className="p-4">Judul Karya / Invensi</th>
                <th className="p-4">Kategori KI</th>
                <th className="p-4">Akses Publikasi</th>
                <th className="p-4 text-center">Kelola & Unduh Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {asetDisetujui.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-mono font-bold text-blue-600">
                    {item.id}
                    <span className="block text-[10px] text-slate-400 font-normal uppercase">
                      {item.regNumber || "MENUNGGU_VALIDASI"}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-800 max-w-xs">
                    {item.title}
                  </td>
                  <td className="p-4 font-semibold">{item.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePrivacy(item.id)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer transition ${
                        item.isPublic
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                      title="Klik untuk mengubah status akses publikasi masyarakat"
                    >
                      {item.isPublic ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                      {item.isPublic ? "Publik" : "Privat"}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* TOMBOL PRATINJAU / LIHAT SERTIFIKAT */}
                      <button
                        onClick={() => setPreviewSertifikat(item)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition inline-flex items-center gap-1 cursor-pointer text-[11px]"
                        title="Lihat fisik sertifikat resmi"
                      >
                        <Eye className="w-3.5 h-3.5" /> Lihat
                      </button>

                      {/* TOMBOL UNDUH SERTIFIKAT */}
                      <button
                        onClick={() => handleDownloadSertifikat(item)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs text-[11px]"
                        title="Unduh file Sertifikat PDF"
                      >
                        <Download className="w-3.5 h-3.5" /> Unduh Sertifikat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PRATINJAU DOKUMEN SERTIFIKAT HKI RESMI */}
      {previewSertifikat && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-xs">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Sertifikat Resmi
                  Diterbitkan
                </span>
                <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                  {previewSertifikat.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewSertifikat(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORMAL CERTIFICATE DISPLAY BOX */}
            <div className="p-6 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl space-y-4 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                <Award className="w-48 h-48 text-emerald-900" />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  REPUBLIK INDONESIA • SENTRA KI POLIBATAM
                </p>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                  SURAT PENCATATAN KEKAYAAN INTELEKTUAL
                </h2>
                <p className="text-[11px] font-mono text-emerald-700 font-bold">
                  Nomor Registrasi:{" "}
                  {previewSertifikat.regNumber || "EC00202612345"}
                </p>
              </div>

              <div className="py-3 px-4 bg-white rounded-xl border border-slate-200 text-left space-y-1.5 shadow-2xs">
                <p>
                  <strong>Nama Kategori KI:</strong>{" "}
                  {previewSertifikat.category}
                </p>
                <p>
                  <strong>Judul Invensi / Ciptaan:</strong>{" "}
                  {previewSertifikat.title}
                </p>
                <p>
                  <strong>Nama Dosen Inventor:</strong>{" "}
                  {previewSertifikat.inventor || "Ir. Jokowi"}
                </p>
                <p>
                  <strong>Tanggal Terbit Sertifikat:</strong>{" "}
                  {previewSertifikat.regDate}
                </p>
              </div>

              <p className="text-[10px] text-slate-500 italic">
                Sertifikat ini terdaftar secara sah pada pangkalan data Sentra
                Kekayaan Intelektual Politeknik Negeri Batam.
              </p>
            </div>

            {/* MODAL FOOTER */}
            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setPreviewSertifikat(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
              >
                Tutup Pratinjau
              </button>
              <button
                onClick={() => handleDownloadSertifikat(previewSertifikat)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" /> Unduh Berkas Sertifikat (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
