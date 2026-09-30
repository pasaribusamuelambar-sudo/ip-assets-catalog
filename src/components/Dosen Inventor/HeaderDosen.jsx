import React from "react";

export default function HeaderDosen({ user, isLightTheme, toggleSidebar }) {
  return (
    <header
      className={`h-16 px-6 flex items-center justify-between border-b transition-colors duration-300 ${
        isLightTheme
          ? "bg-white border-slate-200 text-slate-800"
          : "bg-[#140d24] border-purple-900/40 text-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg bg-slate-800/10 hover:bg-slate-800/20 text-current"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <h1 className="text-sm font-bold tracking-wide hidden sm:block text-purple-300">
          Portal Inventor Sentra HKI Polibatam
        </h1>
      </div>

      {/* Profil Dosen di Kanan */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-xs font-bold leading-tight">
            {user?.name || "Samuel Ambar Pasaribu, M.Kom."}
          </div>
          <div className="text-[10px] text-purple-400 font-medium">
            NIP / ID: {user?.id || "3312511048"}
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md border border-purple-400/30">
          {user?.name ? user.name.charAt(0) : "S"}
        </div>
      </div>
    </header>
  );
}
