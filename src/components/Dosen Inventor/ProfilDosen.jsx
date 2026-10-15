import React, { useState, useEffect } from "react";
import {
  User,
  Building,
  Mail,
  Award,
  BookOpen,
  Lock,
  FileText,
  Printer,
  Download,
  Shield,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function ProfilDosen() {
  // Sub-Tab Navigation: 'profil' atau 'portofolio'
  const [activeTab, setActiveTab] = useState("profil");

  // Ambil data user aktif yang sedang login dan sinkronkan dengan database kelola pengguna admin
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSession = localStorage.getItem("currentUser");
    if (savedSession) {
      try {
        const sessionUser = JSON.parse(savedSession);
        // Sinkronisasi dengan master data users dari Kelola Pengguna admin
        const allUsers =
          JSON.parse(localStorage.getItem("ip_catalog_users")) || [];
        const found = allUsers.find(
          (u) => String(u.id) === String(sessionUser.id),
        );
        if (found) return found;
        return sessionUser;
      } catch (e) {
        console.error("Gagal parse session", e);
      }
    }
    // Fallback data default sesuai konteks
    return {
      id: "3312511048",
      nama: "Samuel Ambar Pasaribu, M.Kom.",
      email: "pasaribusamuelambar@gmail.com",
      jurusan: "Teknik Informatika",
      role: "Dosen / Inventor",
      status: "Aktif",
      passwordTerakhir: "12345678",
      riwayatPassword: [{ tanggal: "2026-01-01", status: "Dibuat Sistem" }],
      researchInterest:
        "Web Development, Artificial Intelligence & Internet of Things",
    };
  });

  // State untuk ubah password
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Ambil data karya KI terdaftar milik dosen dari sistem aset KI (Portofolio BKD)
  const [portofolioKarya, setPortofolioKarya] = useState(() => {
    const allAssets =
      JSON.parse(localStorage.getItem("polibatam_kelola_aset_ki")) || [];
    // Filter karya yang sesuai dengan nama atau jurusan dosen yang sedang login
    return allAssets.filter(
      (asset) =>
        asset.inventor
          ?.toLowerCase()
          .includes(currentUser.nama?.toLowerCase()) ||
        asset.jurusan === currentUser.jurusan,
    );
  });

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      alert("Password baru tidak boleh kosong!");
      return;
    }

    // Update state local current user
    const updatedUser = {
      ...currentUser,
      passwordTerakhir: newPassword.trim(),
      riwayatPassword: [
        {
          tanggal: new Date().toISOString().split("T")[0],
          status: "Diubah oleh Dosen",
        },
        ...(currentUser.riwayatPassword || []),
      ],
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Sinkronisasi ke master data admin (ip_catalog_users)
    const allUsers = JSON.parse(localStorage.getItem("ip_catalog_users")) || [];
    const updatedAllUsers = allUsers.map((u) =>
      String(u.id) === String(updatedUser.id) ? updatedUser : u,
    );
    localStorage.setItem("ip_catalog_users", JSON.stringify(updatedAllUsers));

    setNewPassword("");
    setSuccessMsg("Kata sandi berhasil diperbarui secara permanen!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-slate-800">
      {/* HEADER UTAMA */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Profil & Portofolio Kinerja BKD Dosen
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pusat manajemen identitas personal (statis) dan rekapitulasi bukti
            kinerja HKI untuk pelaporan BKD / SISTER Polibatam.
          </p>
        </div>

        {/* SUB-TAB NAVIGATION */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
          <button
            onClick={() => setActiveTab("profil")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "profil"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="w-3.5 h-3.5" /> 1. Profil Dosen
          </button>
          <button
            onClick={() => setActiveTab("portofolio")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "portofolio"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Award className="w-3.5 h-3.5" /> 2. Portofolio BKD & HKI
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* KONTEN TAB 1: PROFIL DOSEN */}
      {activeTab === "profil" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {currentUser.nama ? currentUser.nama.charAt(0) : "S"}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {currentUser.nama}
                </h3>
                <p className="text-xs text-blue-600 font-bold font-mono">
                  ID Dosen / NIP: {currentUser.id}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                    Status: {currentUser.status || "Aktif"}
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                    {currentUser.role || "Dosen / Inventor"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" /> Email Instansi
                </span>
                <p className="font-bold text-slate-800 text-sm">
                  {currentUser.email}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600" /> Jurusan &
                  Program Studi
                </span>
                <p className="font-bold text-slate-800 text-sm">
                  {currentUser.jurusan} — Politeknik Negeri Batam
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 md:col-span-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Bidang Keahlian
                  / Research Interest
                </span>
                <p className="font-bold text-slate-800">
                  {currentUser.researchInterest ||
                    "Pengembangan Perangkat Lunak, Sistem Informasi Enterprise & Kecerdasan Buatan."}
                </p>
              </div>
            </div>
          </div>

          {/* KARTU KEAMANAN & PASSWORD */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" /> Pengaturan Kredensial &
              Kata Sandi Akun
            </h3>
            <p className="text-xs text-slate-500">
              Sandi akun ini disinkronkan langsung dengan sistem manajemen
              pengguna administrator. Anda dapat memperbarui sandi akun di sini.
            </p>

            <form
              onSubmit={handleUpdatePassword}
              className="space-y-3 pt-2 max-w-md"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi Aktif Saat Ini
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser.passwordTerakhir || "12345678"}
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan password baru..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer"
              >
                Simpan Perubahan Sandi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* KONTEN TAB 2: PORTOFOLIO BKD & REKAP HKI */}
      {activeTab === "portofolio" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Daftar Kinerja Kekayaan Intelektual (HKI) Terdaftar
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bukti unsur Penelitian & Pengabdian Masyarakat untuk pengisian
                portofolio Beban Kerja Dosen (BKD) / SISTER.
              </p>
            </div>
            <button
              onClick={() =>
                alert(
                  "Mengunduh Rekapitulasi Portofolio BKD dalam format PDF/Excel...",
                )
              }
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Export Rekap BKD (PDF/Excel)
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">ID & No. Sertifikat HKI</th>
                    <th className="p-4">Judul Karya / Invensi</th>
                    <th className="p-4">Kategori KI</th>
                    <th className="p-4">Peran Inventor</th>
                    <th className="p-4">Tahun Terbit</th>
                    <th className="p-4 text-center">Bukti Dokumen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {portofolioKarya.length > 0 ? (
                    portofolioKarya.map((karya, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-mono font-bold text-blue-600">
                          {karya.id}
                          <span className="block text-[10px] text-slate-400 font-normal">
                            Reg: {karya.regNumber || "MENUNGGU_VALIDASI"}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <p className="font-bold text-slate-800 line-clamp-2">
                            {karya.title}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {karya.subCategory}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-100">
                            {karya.category}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">
                          Ketua Inventor / Pengusul
                        </td>
                        <td className="p-4 font-mono font-medium text-slate-600">
                          {karya.regDate ? karya.regDate.split("-")[0] : "2026"}
                        </td>
                        <td className="p-4 text-center">
                          {karya.berkas?.url && karya.berkas.url !== "#" ? (
                            <a
                              href={karya.berkas.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition text-[11px]"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Lampiran
                              Fisik
                            </a>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">
                              Tervalidasi Sistem
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-slate-400 font-medium"
                      >
                        Belum ada riwayat karya HKI tercatat untuk portofolio
                        BKD Anda. Silakan ajukan melalui menu Form Pengajuan
                        HKI.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


