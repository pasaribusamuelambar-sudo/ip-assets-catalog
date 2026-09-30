import React from "react";

export default function SidebarDosen({
  activeMenu,
  setActiveMenu,
  isLightTheme,
  onLogout,
}) {
  const menuItems = [
    {
      id: "overview",
      label: "Dashboard & Ringkasan",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
    },
    {
      id: "pengajuan",
      label: "Pengajuan HKI Baru",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
    },
    {
      id: "katalog-saya",
      label: "Aset & Hak Cipta Saya",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
        </svg>
      ),
    },
    {
      id: "profil",
      label: "Profil & Keamanan",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`w-64 flex-shrink-0 border-r flex flex-col justify-between min-h-screen transition-colors duration-300 ${
        isLightTheme
          ? "bg-white border-slate-200 text-slate-800"
          : "bg-[#0f091c] border-purple-900/40 text-white"
      }`}
    >
      <div>
        {/* Brand Header Sidebar */}
        <div className="p-5 border-b border-purple-900/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            IP
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide">SENTRA HKI</div>
            <div className="text-[10px] text-purple-400">
              Politeknik Negeri Batam
            </div>
          </div>
        </div>

        {/* Daftar Menu Utama */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : isLightTheme
                      ? "text-slate-600 hover:bg-slate-100"
                      : "text-slate-400 hover:bg-[#19102e] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Area Bawah Sidebar: Tombol Keluar */}
      <div className="p-4 border-t border-purple-900/30">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-white hover:bg-red-600/80 transition duration-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </aside>
  );
}
