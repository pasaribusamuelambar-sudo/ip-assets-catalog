import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarAdmin({
  isOpen,
  onToggle,
  onLogout,
  currentUser,
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

  // DAFTAR MENU UTAMA ADMIN (DENGAN "VERIFIKASI PENGAJUAN" YANG SUDAH DIHAPUS)
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin-dashboard",
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "users",
      label: "Kelola Pengguna",
      path: "/admin-dashboard/users",
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 100 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      id: "aset",
      label: "Kelola Data Aset KI",
      path: "/admin-dashboard/aset",
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: "lisensi",
      label: "Minat Lisensi",
      path: "/admin-dashboard/lisensi",
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "laporan",
      label: "Cetak & Export Laporan",
      path: "/admin-dashboard/laporan",
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800/80 transition-all duration-300 h-screen sticky top-0 z-40 select-none ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* BRAND HEADER */}
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
                  Sentra KI Polibatam
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
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

        {/* LIST NAVIGASI */}
        <nav className="p-3 space-y-1 text-xs font-medium overflow-y-auto flex-1 scrollbar-thin">
          {isOpen && (
            <p className="px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">
              Menu Utama Admin
            </p>
          )}
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/admin-dashboard"}
              title={!isOpen ? item.label : ""}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                }`
              }
            >
              {item.icon}
              {isOpen && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* FOOTER ADMIN PROFILE */}
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
          title={!isOpen ? "Logout" : ""}
          className="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent text-xs font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
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
