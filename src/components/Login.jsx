import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess, isLightTheme }) {
  const navigate = useNavigate();

  // State Form Login
  const [userType, setUserType] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Data Admin Frontend (Statis Akun PBL)
  const adminUsers = [
    {
      id: "3312511048",
      password: "12345678",
      role: "Admin",
      name: "Samuel Ambar Pasaribu",
      email: "samuel@polibatam.ac.id",
    },
    {
      id: "3312511034",
      password: "12345678",
      role: "Admin",
      name: "Muhammad Hoirul Farhan",
      email: "hoirul@polibatam.ac.id",
    },
    {
      id: "3312511095",
      password: "12345678",
      role: "Admin",
      name: "Indah Suci Yanti",
      email: "indah@polibatam.ac.id",
    },
  ];

  // Mengambil Data Dosen/Inventor secara Dinamis dari LocalStorage
  const getDosenList = () => {
    const defaultDosen = [
      {
        id: "198803122019031001",
        password: "Batam2026!#",
        role: "Dosen / Inventor",
        name: "Dr. Eng. Widya Putri, M.T.",
        email: "widya@polibatam.ac.id",
        status: "Aktif",
      },
      {
        id: "199105202020122002",
        password: "P3M_Polibatam2026",
        role: "Dosen / Inventor",
        name: "Ahmad Hamim Thohari, S.S.T., M.T.",
        email: "ahmad.hamim@polibatam.ac.id",
        status: "Aktif",
      },
      // Menambahkan ID contoh agar bisa dicoba langsung jika diinginkan
      {
        id: "123456780",
        password: "12345678",
        role: "Dosen / Inventor",
        name: "Dosen Penguji / Contoh",
        email: "dosen.test@polibatam.ac.id",
        status: "Aktif",
      },
    ];

    try {
      const storedUsers = localStorage.getItem("ip_catalog_users");
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          const localDosen = parsedUsers
            .filter((item) => {
              const r = String(item.role || "").toLowerCase();
              return !r || r.includes("dosen") || r.includes("inventor");
            })
            .map((item) => ({
              id: String(item.id || item.nip || item.nidn || item.username || "").trim(),
              password: item.passwordTerakhir || item.password || "12345678",
              role: item.role || "Dosen / Inventor",
              name: item.nama || item.name || "Dosen Inventor",
              email: item.email || "",
              status: item.status || "Aktif",
            }));

          const combined = [...defaultDosen];
          localDosen.forEach((ld) => {
            if (ld.id && !combined.some((d) => String(d.id).trim() === ld.id)) {
              combined.push(ld);
            }
          });

          return combined;
        }
      }
    } catch (error) {
      console.error("Gagal membaca data dosen dari localStorage:", error);
    }

    return defaultDosen;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validasi Pilihan Jenis User
    if (!userType) {
      setErrorMessage("Silakan pilih jenis user terlebih dahulu!");
      return;
    }

    // Validasi Form Kosong
    if (!id.trim() || !password.trim()) {
      setErrorMessage("ID dan Password tidak boleh kosong!");
      return;
    }

    const inputId = id.trim();

    // 1. Process Login Role Admin
    if (userType === "admin") {
      const foundAdmin = adminUsers.find((u) => u.id === inputId);

      if (!foundAdmin) {
        setErrorMessage("ID tidak terdaftar sebagai Admin Sentra KI!");
        return;
      }

      if (foundAdmin.password !== password) {
        setErrorMessage("Password Admin yang Anda masukkan salah!");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(foundAdmin));
      if (onLoginSuccess) onLoginSuccess(foundAdmin);

      navigate("/admin-dashboard");
    }
    // 2. Process Login Role Dosen (Inventor)
    else if (userType === "dosen") {
      const dosenUsers = getDosenList();
      const foundDosen = dosenUsers.find((u) => String(u.id).trim() === inputId);

      if (!foundDosen) {
        setErrorMessage(
          "ID Dosen tidak terdaftar! Pastikan Admin telah menambahkan data di menu Kelola Pengguna."
        );
        return;
      }

      // Cek Status Akun
      if (foundDosen.status === "Non-Aktif") {
        setErrorMessage(
          "Akun Dosen Anda dalam status Non-Aktif. Silakan hubungi Admin Sentra KI!"
        );
        return;
      }

      if (foundDosen.password !== password) {
        setErrorMessage("Password Dosen yang Anda masukkan salah!");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(foundDosen));
      if (onLoginSuccess) onLoginSuccess(foundDosen);

      navigate("/dosen-dashboard");
    }
  };

  return (
    <div
      className={`min-h-[85vh] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl transition-all duration-300 ${
          isLightTheme
            ? "bg-white border-slate-200"
            : "bg-[#140d24] border-purple-900/40"
        }`}
      >
        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-900/40 mx-auto mb-3">
            IP
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Masuk Portal Sentra HKI
          </h2>
          <p
            className={`text-xs mt-1 ${
              isLightTheme ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Sistem Informasi Pengelolaan & Katalog Aset Polibatam
          </p>
        </div>

        {/* Notifikasi Pesan Error */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 flex items-start gap-3 text-red-500 text-xs font-medium">
            <svg
              className="w-5 h-5 flex-shrink-0 fill-current mt-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <div>
              <span className="font-bold block">Gagal Masuk!</span>
              {errorMessage}
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Select Dropdown Jenis User */}
          <div>
            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setErrorMessage("");
              }}
              className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none transition ${
                isLightTheme
                  ? "bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500"
                  : "bg-[#1a102f] border-purple-800/50 text-white focus:border-emerald-500"
              }`}
            >
              <option value="" disabled>
                Pilih Jenis User
              </option>
              <option value="admin">Admin Sentra KI</option>
              <option value="dosen">Dosen (Inventor)</option>
            </select>
          </div>

          {/* Input ID */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`w-full pl-4 pr-11 py-3 text-sm rounded-xl border focus:outline-none transition ${
                isLightTheme
                  ? "bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500"
                  : "bg-[#1a102f] border-purple-800/50 text-white focus:border-emerald-500"
              }`}
            />
            <div className="absolute right-3.5 pointer-events-none text-slate-400">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          {/* Input Password */}
          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-4 pr-11 py-3 text-sm rounded-xl border focus:outline-none transition ${
                isLightTheme
                  ? "bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500"
                  : "bg-[#1a102f] border-purple-800/50 text-white focus:border-emerald-500"
              }`}
            />
            <div className="absolute right-3.5 pointer-events-none text-slate-400">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:opacity-90 transition shadow-lg shadow-purple-900/30 active:scale-[0.99] cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Panduan Pengguna PDF */}
        <div className="mt-6 pt-4 border-t border-purple-900/30 text-center">
          <a
            href="/panduan-pengguna.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Panduan Pengguna IP ASSETS CATALOG (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}