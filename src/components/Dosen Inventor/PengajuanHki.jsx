import React, { useState } from "react";
import {
  FileText,
  Upload,
  Send,
  CheckCircle2,
  AlertCircle,
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
    linkDrive: "",
    berkas: {},
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

  // Mengubah file menjadi Base64 agar tersimpan secara permanen di localStorage
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(
          "Ukuran file terlalu besar! Harap unggah file di bawah 2 MB agar dapat tersimpan permanen di penyimpanan lokal.",
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          berkas: {
            ...prev.berkas,
            [key]: {
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
              url: reader.result, // Base64 permanen
            },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setFormData((prev) => ({
      ...prev,
      kategori: cat,
      berkas: {},
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const b = formData.berkas;
    const primaryFile = Object.values(b)[0];

    const berkasKarya =
      formData.metodeLampiran === "file" && primaryFile
        ? {
            namaFile: primaryFile.name,
            tipe: primaryFile.name.endsWith(".zip") ? "zip" : "pdf",
            ukuran: primaryFile.size,
            url: primaryFile.url,
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
      catatanRevisi: "",
      deskripsi: formData.deskripsi,
      berkas: berkasKarya,
      lampiranDetail: b,
      kontak: {
        email: formData.email,
        whatsapp: formData.noWhatsapp,
        nip: formData.nipNidn,
      },
    };

    try {
      const existingAssets =
        JSON.parse(localStorage.getItem("polibatam_kelola_aset_ki")) || [];
      localStorage.setItem(
        "polibatam_kelola_aset_ki",
        JSON.stringify([newAsset, ...existingAssets]),
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
        linkDrive: "",
        berkas: {},
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert(
        "Gagal menyimpan data ke storage. Kapasitas penyimpanan browser penuh.",
      );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-800">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Formulir Pengajuan Usulan Aset KI Baru (Dosen Inventor)
        </h2>
        <p className="text-xs text-slate-500">
          Sesuai ketentuan Sentra KI Polibatam, berkas wajib diunggah
          berdasarkan kategori KI sebelum masuk tahap verifikasi-validasi.
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
                  Nama Lengkap & Gelar *
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
                  NIP / NIDN *
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
                  Email & WhatsApp *
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
                  Jenis Kekayaan Intelektual *
                </label>
                <select
                  value={formData.kategori}
                  onChange={handleCategoryChange}
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
                  Sub-Kategori / Bidang Ciptaan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subKategori}
                  onChange={(e) =>
                    setFormData({ ...formData, subKategori: e.target.value })
                  }
                  placeholder="Contoh: Program Komputer / Logo / Paten Sederhana"
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
                  Judul Lengkap KI *
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
                  Abstrak / Deskripsi Singkat / Latar Belakang *
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

          <div className="p-4 bg-blue-50/60 border-2 border-blue-200 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold border-b border-blue-200 pb-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
              <span>Berkas & Lampiran Wajib Kategori: {formData.kategori}</span>
            </div>

            {formData.kategori === "Hak Cipta" && (
              <div className="flex flex-col space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Formulir Permohonan Pendaftaran (.doc/.docx) *
                  </label>
                  <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) => handleFileChange(e, "formPermohonan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.formPermohonan && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.formPermohonan.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Scan KTP Semua Pencipta (.pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "scanKtp")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.scanKtp && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.scanKtp.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    3. Scan NPWP Pencipta (.pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "scanNpwp")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.scanNpwp && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.scanNpwp.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    4. Contoh Ciptaan / Master Karya *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "contohCiptaan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.contohCiptaan && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.contohCiptaan.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    5. Surat Pernyataan Hak Cipta (ttd Direktur, .pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "suratPernyataan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.suratPernyataan && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.suratPernyataan.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    6. Surat Pengalihan Hak Cipta (ttd Direktur, .pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "suratPengalihan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.suratPengalihan && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.suratPengalihan.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    7. Salinan PKS / Perjanjian Kerja Sama (Jika Mitra, .pdf)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "salinanPks")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                  {formData.berkas.salinanPks && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Terunggah: {formData.berkas.salinanPks.name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {formData.kategori === "Merek" && (
              <div className="flex flex-col space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Label / Logo Merek (.jpg, .png, .svg, .pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg,.pdf"
                    onChange={(e) => handleFileChange(e, "labelLogo")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Formulir Data Permohonan Merek (.pdf/.doc) *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "formMerek")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    3. Surat Pernyataan Kepemilikan Merek (Bermaterai) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "suratPernyataan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    4. Surat Pengalihan Hak (.pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "suratPengalihan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    5. Identitas Pemohon / KTP Seluruh Tim (.pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "identitasPemohon")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}

            {formData.kategori === "Paten" && (
              <div className="flex flex-col space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Dokumen Spesifikasi Paten (.doc/.docx/.pdf) *
                  </label>
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    onChange={(e) => handleFileChange(e, "spesifikasiPaten")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Gambar Teknik / Draughting (PDF) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "gambarTeknik")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    3. Surat Pernyataan Kepemilikan Invensi (Bermaterai) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "suratPernyataan")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}

            {formData.kategori === "Desain Industri" && (
              <div className="flex flex-col space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. Gambar / Foto Desain 7 Sudut Pandang (.pdf/.zip) *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "gambar7Sudut")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2. Uraian / Deskripsi Kebaruan Estetis (.pdf/.doc) *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "uraianDesain")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}

            {formData.kategori === "DTLST" && (
              <div className="flex flex-col space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1. File Layout / Tata Letak (.pdf, .gds, .oasis, CAD) *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "fileLayout")}
                    className="w-full text-xs bg-white p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Ajukan ke Sentra KI Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
