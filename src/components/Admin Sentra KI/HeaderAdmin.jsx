import React from "react";

export default function HeaderAdmin({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        {/* Tombol Toggle Sidebar */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition"
          title="Buka / Tutup Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-ping"></span>
            Panel Kelola Admin Sentra KI Polibatam
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Sistem Informasi Pengelolaan & Katalog Aset Kekayaan Intelektual
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-xl border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sistem Online</span>
        </div>

        <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Super Admin
        </span>
      </div>
    </header>
  );
}
