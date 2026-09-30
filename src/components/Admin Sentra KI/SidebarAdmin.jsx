import React from "react";

export default function SidebarAdmin({
  isOpen,
  onToggle,
  activeMenu,
  onSelectMenu,
  onLogout,
  currentUser, // Propopsional jika dikirim dari parent
}) {
 
  const loggedInUser = currentUser ||
    JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Admin Sentra KI",
      role: "Super Admin",
    };

  const getInitials = (name) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard Utama" },
    { id: "verifikasi", label: "Verifikasi Pengajuan", badge: "8" },
    { id: "aset", label: "Kelola Data Aset KI" },
    { id: "kategori", label: "Master Kategori KI" },
    { id: "users", label: "Kelola Pengguna" },
    { id: "lisensi", label: "Minat Lisensi (Inquiry)" },
    { id: "laporan", label: "Cetak & Export Laporan" },
  ];

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800/80 transition-all duration-300 h-screen sticky top-0 z-40 select-none ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Branding Logo & Toggle */}
        <div className="h-16 px-4 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 flex items-center justify-center font-black text-white text-sm shadow-md flex-shrink-0">
              IP
            </div>
            {isOpen && (
              <div className="truncate">
                <h2 className="font-bold text-sm text-white truncate">
                  IP Assets Catalog
                </h2>
                <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase block">
                  Sentra HKI Polibatam
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                !isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="p-3 space-y-1 text-xs font-medium overflow-y-auto flex-1 scrollbar-thin">
          {isOpen && (
            <p className="px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">
              Menu Utama Admin
            </p>
          )}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectMenu(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition duration-200 cursor-pointer ${
                activeMenu === item.id
                  ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
              }`}
            >
              {isOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Profil Dinamis Berdasarkan User Login & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex-shrink-0">
        {isOpen && (
          <div className="mb-3 px-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
              {getInitials(loggedInUser.name)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {loggedInUser.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {loggedInUser.role || "Admin Sentra KI"}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            if (onLogout) onLogout();
          }}
          className="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent text-xs font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
