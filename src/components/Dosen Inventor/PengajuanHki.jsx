import React, { useState } from "react";
import {
  FileText,
  Upload,
  Send,
  CheckCircle2,
  AlertCircle,
  Link2,
} from "lucide-react";

export default function PengajuanHki() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nipNidn: "",
    programStudi: "Teknik Informatika",
    email: "",
    noWhatsapp: "",
    judul: "",
    kategori: "Hak Cipta",
    subKategori: "Program Komputer / Software",
    deskripsi: "",
    metodeLampiran: "file",
    fileUtama: null,
    filePendukung1: null,
    filePendukung2: null,
    filePendukung3: null,
    linkDrive: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          url: fileUrl,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.kategori === "Hak Cipta" &&
      (!formData.fileUtama ||
        !formData.filePendukung1 ||
        !formData.filePendukung2)
    ) {
      alert(
        "Mohon lengkapi semua dokumen wajib untuk kategori Hak Cipta (File Karya/Modul, Surat Pernyataan Hak Cipta, dan Scan KTP Pencipta)!",
      );
      return;
    }
    if (
      formData.kategori === "Merek" &&
      (!formData.fileUtama || !formData.filePendukung1)
    ) {
      alert(
        "Mohon unggah Etiket/Logo Merek dan Surat Pernyataan Kepemilikan Merek!",
      );
      return;
    }
    if (
      formData.kategori === "Paten" &&
      (!formData.fileUtama || !formData.filePendukung1)
    ) {
      alert(
        "Mohon unggah Dokumen Spesifikasi Paten Lengkap dan Gambar Teknis Invensi!",
      );
      return;
    }
    if (
      formData.kategori === "Desain Industri" &&
      (!formData.fileUtama || !formData.filePendukung1)
    ) {
      alert(
        "Mohon unggah Gambar Visual Tampak Desain dan Surat Pernyataan Pengalihan Hak!",
      );
      return;
    }
    if (
      formData.kategori === "DTLST" &&
      (!formData.fileUtama || !formData.filePendukung1)
    ) {
      alert(
        "Mohon unggah Gambar/Foto Tata Letak Sirkuit dan Surat Pernyataan Keaslian DTLST!",
      );
      return;
    }

    const berkasKarya =
      formData.metodeLampiran === "file" && formData.fileUtama
        ? {
            namaFile: formData.fileUtama.name,
            tipe: "file",
            ukuran: formData.fileUtama.size,
            url: formData.fileUtama.url,
          }
        : {
            namaFile: "Link Google Drive / Cloud Repository",
            tipe: "drive",
            ukuran: "-",
            url: formData.linkDrive.startsWith("http")
              ? formData.linkDrive
              : `https://${formData.linkDrive}`,
          };

    const newAsset = {
      id: `KI-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.judul,
      category: formData.kategori,
      subCategory: formData.subKategori,
      inventor: formData.namaLengkap,
      jurusan: formData.programStudi,
      regNumber: "MENUNGGU_VALIDASI",
      regDate: new Date().toISOString().split("T")[0],
      status: "Dalam Proses",
      deskripsi: formData.deskripsi,
      berkas: berkasKarya,
      berkasPendukung1: formData.filePendukung1?.name || null,
      berkasPendukung2: formData.filePendukung2?.name || null,
      berkasPendukung3: formData.filePendukung3?.name || null,
      kontak: {
        email: formData.email,
        whatsapp: formData.noWhatsapp,
        nip: formData.nipNidn,
      },
    };

    const existingAssets =
      JSON.parse(localStorage.getItem("polibatam_kelola_aset_ki")) || [];
    localStorage.setItem(
      "polibatam_kelola_aset_ki",
      JSON.stringify([newAsset, ...existingAssets]),
    );

    const existingVerif =
      JSON.parse(localStorage.getItem("polibatam_pengajuan_ki_v2")) || [];
    const newVerifItem = {
      id: `HKI-2026-${Math.floor(100 + Math.random() * 900)}`,
      nama: formData.namaLengkap,
      jurusan: formData.programStudi,
      tglDiajukan: new Date().toISOString().split("T")[0],
      judul: formData.judul,
      jenisKI: formData.kategori,
      jenis: formData.kategori,
      subCiptaan: formData.subKategori,
      status: "Menunggu Verifikasi",
      catatan: "",
      isRead: false,
    };
    localStorage.setItem(
      "polibatam_pengajuan_ki_v2",
      JSON.stringify([newVerifItem, ...existingVerif]),
    );

    setSuccessMessage(
      "Usulan Aset KI berhasil diajukan dan terhubung langsung ke Sistem Admin Sentra HKI Polibatam!",
    );

    setFormData({
      namaLengkap: "",
      nipNidn: "",
      programStudi: "Teknik Informatika",
      email: "",
      noWhatsapp: "",
      judul: "",
      kategori: "Hak Cipta",
      subKategori: "Program Komputer / Software",
      deskripsi: "",
      metodeLampiran: "file",
      fileUtama: null,
      filePendukung1: null,
      filePendukung2: null,
      filePendukung3: null,
      linkDrive: "",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Formulir Pengajuan Usulan Aset KI Baru (Dosen Inventor)
        </h2>
        <p className="text-xs text-slate-500">
          Sesuai ketentuan Sentra KI Polibatam, berkas wajib diunggah
          berdasarkan kategori sebelum masuk tahap verifikasi-validasi.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              1. Informasi Utama Dosen Inventor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaLengkap}
                  onChange={(e) =>
                    setFormData({ ...formData, namaLengkap: e.target.value })
                  }
                  placeholder="Contoh: Dr. Eng. Ahmad Yani, M.T."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  NIP / NIDN
                </label>
                <input
                  type="text"
                  required
                  value={formData.nipNidn}
                  onChange={(e) =>
                    setFormData({ ...formData, nipNidn: e.target.value })
                  }
                  placeholder="Nomor Induk Pegawai..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Program Studi / Jurusan
                </label>
                <select
                  value={formData.programStudi}
                  onChange={(e) =>
                    setFormData({ ...formData, programStudi: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  {jurusans.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email & WhatsApp
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    value={formData.noWhatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, noWhatsapp: e.target.value })
                    }
                    placeholder="No. WA..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              2. Pemilihan Jenis & Sub-Kategori KI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jenis Kekayaan Intelektual
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-blue-600 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Sub-Kategori / Bidang Ciptaan
                </label>
                <input
                  type="text"
                  required
                  value={formData.subKategori}
                  onChange={(e) =>
                    setFormData({ ...formData, subKategori: e.target.value })
                  }
                  placeholder="Contoh: Program Komputer / Buku Ajar / Paten Sederhana"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              3. Detail Invensi / Karya Intelektual
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Judul Lengkap Invensi / Karya
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  placeholder="Judul karya..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Abstrak / Deskripsi Singkat / Latar Belakang
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  placeholder="Ringkasan atau spesifikasi teknis karya..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* BERKAS WAJIB DINAMIS SESUAI KATEGORI KI */}
          <div className="p-4 bg-blue-50/60 border-2 border-blue-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
              <span>Unggah Dokumen Wajib: {formData.kategori}</span>
            </div>

            {/* KATEGORI: HAK CIPTA */}
            {formData.kategori === "Hak Cipta" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-600">
                  Ketentuan: Lampirkan file master/source code/modul/naskah PDF,
                  Surat Pernyataan Hak Cipta, dan Scan KTP Pencipta.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. File Master / Source Code / Naskah PDF / Gambar *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileUtama")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.fileUtama && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.fileUtama.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Surat Pernyataan & Pengalihan Hak Cipta (PDF) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung1")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung1 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung1.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    3. Scan KTP Seluruh Tim Pencipta (ZIP/PDF) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung2")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung2 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung2.name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* KATEGORI: MEREK */}
            {formData.kategori === "Merek" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-600">
                  Ketentuan: Etiket/Logo Merek (JPG/PNG resolusi tinggi), Kelas
                  Barang/Jasa, dan Surat Pernyataan Kepemilikan Merek.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Etiket / Logo Merek (JPG/PNG/PDF) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileUtama")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.fileUtama && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.fileUtama.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Surat Pernyataan Kepemilikan Merek & Tanda Tangan *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung1")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung1 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung1.name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* KATEGORI: PATEN */}
            {formData.kategori === "Paten" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-600">
                  Ketentuan: Dokumen Spesifikasi Paten (Latar belakang, Uraian
                  lengkap, Klaim) serta Gambar Teknis Invensi.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Dokumen Spesifikasi Paten Lengkap (PDF) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileUtama")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.fileUtama && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.fileUtama.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Gambar Skema / Garis Teknis Invensi (PDF/ZIP) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung1")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung1 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung1.name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* KATEGORI: DESAIN INDUSTRI */}
            {formData.kategori === "Desain Industri" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-600">
                  Ketentuan: Gambar visual tampak (depan, belakang, samping,
                  perspektif 3D) dan Surat Pernyataan Kepemilikan.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Gambar Visual Tampak Desain (PDF/ZIP) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileUtama")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.fileUtama && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.fileUtama.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Surat Pernyataan Kepemilikan & Pengalihan Hak *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung1")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung1 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung1.name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* KATEGORI: DTLST */}
            {formData.kategori === "DTLST" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-600">
                  Ketentuan: Gambar atau Foto Tata Letak Sirkuit 3D/IC serta
                  Surat Pernyataan Keaslian DTLST.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Gambar Tata Letak Sirkuit Terpadu (PDF/ZIP) *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileUtama")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.fileUtama && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.fileUtama.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Surat Pernyataan Keaslian DTLST *Wajib
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "filePendukung1")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.filePendukung1 && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terpilih: {formData.filePendukung1.name}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Ajukan ke Sentra HKI Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
