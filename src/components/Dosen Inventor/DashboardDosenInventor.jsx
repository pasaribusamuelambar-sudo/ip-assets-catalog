import React, { useState } from "react";
import SidebarDosen from "./SidebarDosen";
import HeaderDosen from "./HeaderDosen";

export default function DashboardDosenInventor({
  user,
  isLightTheme,
  onLogout,
}) {
  const [activeMenu, setActiveMenu] = useState("overview");

  // Sample data pelacakan usulan HKI
  const listUsulan = [
    {
      id: "HKI-2026-001",
      judul: "Sistem Informasi Katalog Aset Kekayaan Intelektual Polibatam",
      jenis: "Hak Cipta (Program Komputer)",
      tanggal: "12 Sep 2026",
      status: "Sertifikat Terbit",
      badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "HKI-2026-004",
      judul: "Sistem Pelacakan Kehadiran Berbasis RFID & IoT",
      jenis: "Paten Sederhana",
      tanggal: "25 Sep 2026",
      status: "Proses Review",
      badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      id: "HKI-2026-008",
      judul: "Buku Ajar: Pengembangan Aplikasi Web dengan Laravel & React",
      jenis: "Hak Cipta (Buku)",
      tanggal: "28 Sep 2026",
      status: "Draft",
      badgeClass: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    },
  ];

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isLightTheme ? "bg-slate-100 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      {/* Sidebar Khusus Dosen */}
      <SidebarDosen
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isLightTheme={isLightTheme}
        onLogout={onLogout}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderDosen user={user} isLightTheme={isLightTheme} />

        <main className="p-6 flex-1 overflow-y-auto space-y-6">
          {activeMenu === "overview" && (
            <>
              {/* Banner Sapaan & Quick Action */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-blue-900/40 border border-purple-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Selamat Datang,{" "}
                    {user?.name || "Samuel Ambar Pasaribu, M.Kom."}!
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Kelola dan pantau seluruh usulan Hak Cipta, Paten, maupun
                    Desain Industri Anda di Sentra HKI Polibatam.
                  </p>
                </div>
                <button
                  onClick={() => setActiveMenu("pengajuan")}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-900/40 transition whitespace-nowrap"
                >
                  + Ajukan HKI Baru
                </button>
              </div>

              {/* Ringkasan Statistik */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#140d24] border border-purple-900/40">
                  <div className="text-xs text-slate-400 font-medium">
                    Total Usulan HKI
                  </div>
                  <div className="text-2xl font-bold mt-2 text-white">
                    3 Usulan
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#140d24] border border-amber-500/30">
                  <div className="text-xs text-amber-400 font-medium">
                    Dalam Review Admin
                  </div>
                  <div className="text-2xl font-bold mt-2 text-white">
                    1 Berkas
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#140d24] border border-emerald-500/30">
                  <div className="text-xs text-emerald-400 font-medium">
                    Sertifikat Terbit
                  </div>
                  <div className="text-2xl font-bold mt-2 text-white">
                    1 Sertifikat
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#140d24] border border-slate-500/30">
                  <div className="text-xs text-slate-400 font-medium">
                    Draft Disimpan
                  </div>
                  <div className="text-2xl font-bold mt-2 text-white">
                    1 Draft
                  </div>
                </div>
              </div>

              {/* Tabel Status Usulan Terbaru */}
              <div className="p-6 rounded-2xl bg-[#140d24] border border-purple-900/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">
                    Status Pengajuan HKI Saya
                  </h3>
                  <button
                    onClick={() => setActiveMenu("katalog-saya")}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-purple-900/40 text-slate-400">
                        <th className="py-3 px-4">ID Usulan</th>
                        <th className="py-3 px-4">Judul Karya / Invensi</th>
                        <th className="py-3 px-4">Jenis HKI</th>
                        <th className="py-3 px-4">Tanggal Usulan</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/20">
                      {listUsulan.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-purple-900/10 transition">
                          <td className="py-3.5 px-4 font-mono font-medium text-slate-300">
                            {item.id}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                            {item.judul}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {item.jenis}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {item.tanggal}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${item.badgeClass}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="px-2.5 py-1 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 rounded-lg text-[11px] font-medium transition">
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeMenu === "pengajuan" && (
            <div className="p-6 bg-[#140d24] border border-purple-900/40 rounded-2xl space-y-4">
              <h2 className="text-base font-bold">
                Formulir Pengajuan HKI Baru
              </h2>
              <p className="text-xs text-slate-400">
                Silakan lengkapi formulir usulan dan unggah berkas pendukung
                (Draft Karya, Surat Pernyataan, Scan KTP).
              </p>
            </div>
          )}

          {activeMenu === "katalog-saya" && (
            <div className="p-6 bg-[#140d24] border border-purple-900/40 rounded-2xl space-y-4">
              <h2 className="text-base font-bold">Aset & Hak Cipta Saya</h2>
              <p className="text-xs text-slate-400">
                Daftar seluruh karya yang sudah terdaftar resmi maupun dalam
                proses pengajuan.
              </p>
            </div>
          )}

          {activeMenu === "profil" && (
            <div className="p-6 bg-[#140d24] border border-purple-900/40 rounded-2xl space-y-4">
              <h2 className="text-base font-bold">
                Pengaturan Akun & Keamanan
              </h2>
              <p className="text-xs text-slate-400">
                Perbarui biodata dosen, NIP, serta kata sandi akun Anda.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
