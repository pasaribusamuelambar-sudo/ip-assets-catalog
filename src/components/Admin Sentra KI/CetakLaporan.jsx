import React, { useState } from "react";
import { FileDown, Printer, FileSpreadsheet, Calendar } from "lucide-react";

export default function CetakLaporan() {
  const [bulanPilihan, setBulanPilihan] = useState("Oktober 2026");

  const [dataRekap] = useState([
    {
      no: 1,
      id: "HKI-2026-001",
      judul: "Sistem Presensi Deteksi Wajah",
      jenis: "Hak Cipta",
      jurusan: "Teknik Informatika",
      status: "Disetujui",
      tanggal: "24 Sep 2026",
    },
    {
      no: 2,
      id: "HKI-2026-002",
      judul: "Desain Meja Lab Ergonomis",
      jenis: "Desain Industri",
      jurusan: "Teknik Mesin",
      status: "Perlu Tindak Lanjut",
      tanggal: "22 Sep 2026",
    },
    {
      no: 3,
      id: "HKI-2026-003",
      judul: "Alat Pengering Ikan IoT",
      jenis: "Paten",
      jurusan: "Teknik Elektro",
      status: "Disetujui",
      tanggal: "18 Sep 2026",
    },
    {
      no: 4,
      id: "HKI-2026-004",
      judul: "Modul Pembelajaran AI Dasar",
      jenis: "Hak Cipta",
      jurusan: "Teknik Informatika",
      status: "Disetujui",
      tanggal: "10 Sep 2026",
    },
  ]);

  // Fungsi Export ke Excel (Format CSV Simulation)
  const handleExportExcel = () => {
    let csvContent =
      "data:text/csv;charset=utf-8,No,ID Permohonan,Judul KI,Jenis KI,Jurusan,Status,Tanggal\n";
    dataRekap.forEach((row) => {
      csvContent += `${row.no},${row.id},"${row.judul}",${row.jenis},${row.jurusan},${row.status},${row.tanggal}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Rekap_Aset_KI_${bulanPilihan.replace(" ", "_")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi Cetak / Export ke PDF menggunakan window.print()
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            Cetak & Export Laporan Rekapitulasi Aset KI
          </h2>
          <p className="text-xs text-slate-500">
            Eksport rekapitulasi data aset Kekayaan Intelektual per bulan ke
            format Excel atau cetak PDF (FR-10-ADM).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-slate-500" />
            <select
              value={bulanPilihan}
              onChange={(e) => setBulanPilihan(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Oktober 2026">Oktober 2026</option>
              <option value="September 2026">September 2026</option>
              <option value="Agustus 2026">Agustus 2026</option>
            </select>
          </div>

          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </button>

          <button
            onClick={handlePrintPDF}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / PDF
          </button>
        </div>
      </div>

      {/* TABEL PREVIEW LAPORAN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="text-center border-b border-slate-100 pb-4">
          <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wide">
            Laporan Rekapitulasi Bulanan Aset Kekayaan Intelektual
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Sentra HKI Politeknik Negeri Batam — Periode: {bulanPilihan}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="p-3.5 rounded-l-lg">No</th>
                <th className="p-3.5">ID Usulan</th>
                <th className="p-3.5">Judul Aset KI</th>
                <th className="p-3.5">Jenis KI</th>
                <th className="p-3.5">Jurusan Pengusul</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-lg">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataRekap.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-medium text-slate-600">
                    {item.no}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {item.id}
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">
                    {item.judul}
                  </td>
                  <td className="p-3.5 text-slate-600">{item.jenis}</td>
                  <td className="p-3.5 text-slate-600">{item.jurusan}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{item.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
