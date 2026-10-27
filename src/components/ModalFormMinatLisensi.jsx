import React, { useState } from "react";
import {
  X,
  Send,
  Building2,
  User,
  Mail,
  FileText,
  CheckCircle2,
  Tag,
} from "lucide-react";

export default function ModalFormMinatLisensi({ asset, onClose }) {
  const [formData, setFormData] = useState({
    namaMitra: "",
    pic: "",
    email: "",
    kategoriKI: "Hak Cipta",
    pesan: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // 5 KATEGORI KEKAYAAN INTELEKTUAL RESMI SESUAI RPP PBL
  const officialCategories = [
    "Hak Cipta",
    "Paten",
    "Merek",
    "Desain Industri",
    "DTLST",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.namaMitra || !formData.pic || !formData.email) {
      alert("Mohon lengkapi seluruh data formulir!");
      return;
    }

    // Ambil data minat lisensi yang sudah ada di localStorage
    const savedInquiries =
      JSON.parse(localStorage.getItem("polibatam_minat_lisensi")) || [];

    const newInquiry = {
      id: Date.now(),
      namaMitra: formData.namaMitra,
      pic: formData.pic,
      email: formData.email,
      asetDiinginkan: asset?.title || "Aset Kekayaan Intelektual Polibatam",
      kategoriKI: formData.kategoriKI,
      pesan:
        formData.pesan ||
        "Berminat untuk menjalin kerjasama komersialisasi lisensi KI.",
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Menunggu Tanggapan",
    };

    // Simpan data baru ke localStorage
    localStorage.setItem(
      "polibatam_minat_lisensi",
      JSON.stringify([newInquiry, ...savedInquiries]),
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 text-xs font-sans">
        {/* HEADER MODAL */}
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Formulir Kerjasama Komersial
            </span>
            <h3 className="text-base font-bold text-slate-800 mt-0.5">
              Ajukan Minat Lisensi Aset KI
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INFO ASET YANG DIMINATI */}
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-[10px] text-blue-600 font-bold uppercase">
            Aset KI yang Diminati:
          </p>
          <p className="font-bold text-slate-800 text-sm">
            {asset?.title || "Sistem Presensi AI Real-Time"}
          </p>
          <p className="text-[11px] text-slate-500">
            Inventor: {asset?.creator || asset?.inventor || "Dosen Polibatam"}
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">
              Formulir Minat Berhasil Terkirim!
            </h4>
            <p className="text-slate-500 text-[11px]">
              Tim Sentra HKI Polibatam akan merespons pengajuan Anda melalui
              email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Nama Perusahaan / Instansi / Mitra Industri:
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Teknologi Batam Mandiri"
                  value={formData.namaMitra}
                  onChange={(e) =>
                    setFormData({ ...formData, namaMitra: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Person in Charge (PIC):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ir. Haryanto"
                    value={formData.pic}
                    onChange={(e) =>
                      setFormData({ ...formData, pic: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email Perusahaan / Kontak:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="haryanto@batam-tech.co.id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* PILIHAN KATEGORI KI YANG SUDAH DIBERSIHKAN (HANYA 5 KATEGORI RESMI) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Kategori Kekayaan Intelektual (KI):
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <select
                  value={formData.kategoriKI}
                  onChange={(e) =>
                    setFormData({ ...formData, kategoriKI: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium appearance-none cursor-pointer"
                >
                  {officialCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Pesan / Rencana Skema Lisensi Kerjasama:
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <textarea
                  rows="3"
                  placeholder="Tuliskan gambaran rencana penggunaan atau produksi massal inovasi ini..."
                  value={formData.pesan}
                  onChange={(e) =>
                    setFormData({ ...formData, pesan: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                ></textarea>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Kirim Formulir Minat
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
