import React from "react";

export default function HeaderDosen({ user }) {
  const currentUser = user ||
    JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Samuel Ambar Pasaribu, M.Kom.",
      id: "3312511048",
    };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-base md:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse"></span>
          Portal Inventor Sentra HKI Polibatam
        </h1>
        <p className="text-xs text-slate-500 hidden sm:block">
          Sistem Pengelolaan & Pelaporan Aset Kekayaan Intelektual
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-xl border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sistem Online</span>
        </div>

        <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {currentUser.name || currentUser.nama}
            </p>
            <p className="text-[10px] text-blue-600 font-semibold">
              NIP: {currentUser.id}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "D"}
          </div>
        </div>
      </div>
    </header>
  );
}
