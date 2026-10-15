import React, { useState } from "react";
import { FolderKanban, Download, CheckCircle, Clock, Eye } from "lucide-react";

export default function KatalogSaya() {
  const [listAset] = useState([
    {
      id: "HKI-2026-001",
      judul: "Sistem Presensi Deteksi Wajah Real-Time Berbasis AI",
      jenis: "Hak Cipta (Program Komputer)",
      tanggal: "24 Sep 2026",
      status: "Disetujui",
      regNumber: "EC00202612345",
    },
    {
      id: "HKI-2026-004",
      judul: "Alat Pengering Ikan Otomatis Berbasis IoT",
      jenis: "Paten Sederhana",
      tanggal: "10 Okt 2026",
      status: "Menunggu Verifikasi",
      regNumber: "-",
    },
  ]);

  const handleDownloadSertifikat = (item) => {
    alert(
      `Mengunduh berkas sertifikat resmi untuk: ${item.judul} (Kelengkapan BKD Dosen).`,
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Aset & Hak Cipta Saya
        </h2>
        <p className="text-xs text-slate-500">
          Daftar usulan karya dan HKI Anda. Unduh berkas sertifikat KI resmi
          untuk kelengkapan pelaporan Beban Kerja Dosen (BKD).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">ID & No. Reg</th>
                <th className="p-4">Judul Aset KI</th>
                <th className="p-4">Jenis KI</th>
                <th className="p-4">Tanggal Usulan</th>
                <th className="p-4">Status Tracking</th>
                <th className="p-4 text-center">Aksi Sertifikat BKD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {listAset.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-mono font-medium">
                    <span className="text-blue-600 block font-bold">
                      {item.id}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.regNumber}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-semibold text-slate-800">{item.judul}</p>
                  </td>
                  <td className="p-4 text-slate-600">{item.jenis}</td>
                  <td className="p-4 text-slate-500 font-mono">
                    {item.tanggal}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${
                        item.status === "Disetujui"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status === "Disetujui" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {item.status === "Disetujui" ? (
                      <button
                        onClick={() => handleDownloadSertifikat(item)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5 mx-auto shadow-sm cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Unduh Sertifikat
                        BKD
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Sertifikat belum terbit
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
