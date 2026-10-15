import React, { useState } from "react";
import { Mail, ExternalLink, CheckCircle } from "lucide-react";

export default function MinatLisensi() {
  const [inquiryList, setInquiryList] = useState([
    {
      id: 1,
      namaMitra: "PT Teknologi Batam Mandiri",
      pic: "Ir. Haryanto, M.Eng",
      email: "haryanto@batam-tech.co.id",
      asetDiinginkan: "Sistem Presensi Deteksi Wajah Real-Time",
      pesan: "Kami tertarik untuk mengkomersialkan teknologi presensi ini untuk kebutuhan pabrik manufaktur kami.",
      tanggal: "02 Okt 2026",
      status: "Menunggu Tanggapan",
    },
    {
      id: 2,
      namaMitainer: "CV Inovasi Kreatif Nusantara",
      pic: "Siti Aminah, S.Kom",
      email: "siti@inovasi.id",
      asetDiinginkan: "Alat Pengering Ikan Otomatis Berbasis IoT",
      pesan: "Ingin berdiskusi terkait skema lisensi produksi massal alat pengering ikan.",
      tanggal: "28 Sep 2026",
      status: "Sudah Ditanggapi",
    },
  ]);

  const handleBalasEmail = (item) => {
    const subject = encodeURIComponent(`Tanggapan Kerjasama Lisensi Aset KI: ${item.asetDiinginkan}`);
    const body = encodeURIComponent(
      `Halo ${item.pic},\n\nTerima kasih atas minat PT/CV ${item.namaMitra} terhadap aset Intelektual Polibatam (${item.asetDiinginkan}).\n\nBerikut tanggapan dari Sentra HKI Polibatam:\n`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=${subject}&body=${body}`, "_blank");
    
    setInquiryList((prev) =>
      prev.map((inq) => (inq.id === item.id ? { ...inq, status: "Sudah Ditanggapi" } : inq))
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Minat Lisensi / Inquiry System
        </h2>
        <p className="text-xs text-slate-500">
          Kelola dan tanggapi formulir minat kerja sama komersialisasi aset KI dari mitra industri.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase">
              <tr>
                <th className="p-4">Mitra Industri / PIC</th>
                <th className="p-4">Aset KI yang Diminati</th>
                <th className="p-4">Pesan Inquiry</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiryList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.namaMitra}</p>
                    <p className="text-[11px] text-blue-600 font-medium">{item.pic} ({item.email})</p>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{item.asetDiinginkan}</td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">{item.pesan}</td>
                  <td className="p-4 text-slate-500">{item.tanggal}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        item.status === "Sudah Ditanggapi"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleBalasEmail(item)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5 mx-auto cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Balas Email
                    </button>
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