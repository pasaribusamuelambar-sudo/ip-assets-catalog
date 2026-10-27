import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, History, Target, ExternalLink } from "lucide-react";

export default function Navbar({
  user,
  onLogout,
  isLightTheme,
  onToggleTheme,
}) {
  const navigate = useNavigate();
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  // Tutup dropdown jika mengklik di luar area menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 sticky top-0 z-50 transition-colors duration-300 border-b ${
        isLightTheme
          ? "bg-white/95 text-slate-800 border-slate-200 backdrop-blur-md shadow-sm"
          : "bg-[#0d0817]/95 text-white border-purple-900/40 backdrop-blur-md"
      }`}
    >
      {/* Logo & Brand */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-900/30 text-lg tracking-wider">
          IP
        </div>
        <div>
          <span
            className={`text-lg font-bold block leading-tight ${
              isLightTheme
                ? "bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent"
            }`}
          >
            IP Assets Catalog
          </span>
          <span
            className={`text-[10px] tracking-wider font-semibold ${
              isLightTheme ? "text-emerald-600" : "text-emerald-400"
            }`}
          >
            SENTRA KI POLIBATAM
          </span>
        </div>
      </Link>

      {/* Navigasi Utama */}
      <ul
        className={`hidden md:flex space-x-8 font-medium text-sm items-center ${
          isLightTheme ? "text-slate-600" : "text-slate-200"
        }`}
      >
        <li>
          <Link
            to="/"
            className={
              isLightTheme
                ? "hover:text-blue-600 transition"
                : "hover:text-emerald-400 transition"
            }
          >
            Beranda
          </Link>
        </li>

        {/* MENU DROPDOWN TENTANG SENTRA KI (HANYA SEJARAH & VISI MISI) */}
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
            className={`flex items-center gap-1 py-1 cursor-pointer transition font-medium ${
              isLightTheme
                ? "hover:text-blue-600 text-slate-700"
                : "hover:text-emerald-400 text-slate-200"
            }`}
          >
            <span>Tentang Sentra KI</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isAboutDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* SUBMENU DROPDOWN */}
          {isAboutDropdownOpen && (
            <div
              className={`absolute top-full left-0 mt-2 w-60 rounded-2xl shadow-2xl border p-2 z-50 transition-all duration-200 ${
                isLightTheme
                  ? "bg-white border-slate-200 text-slate-800"
                  : "bg-[#140d24] border-purple-800/50 text-white"
              }`}
            >
              <Link
                to="/about?section=sejarah"
                onClick={() => setIsAboutDropdownOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                  isLightTheme
                    ? "hover:bg-slate-100 text-slate-700"
                    : "hover:bg-purple-900/40 text-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-500" />
                  Sejarah KI
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/about?section=visimisi"
                onClick={() => setIsAboutDropdownOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                  isLightTheme
                    ? "hover:bg-slate-100 text-slate-700"
                    : "hover:bg-purple-900/40 text-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  Visi Misi Sentra KI
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link
            to="/contact"
            className={
              isLightTheme
                ? "hover:text-emerald-600 transition"
                : "hover:text-emerald-400 transition"
            }
          >
            Kontak Admin
          </Link>
        </li>
      </ul>

      {/* Area Aksi */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          title="Ubah Warna Tema Website"
          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
            isLightTheme
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              : "bg-[#1d1233] hover:bg-purple-900/60 text-emerald-300 border-purple-800/50"
          }`}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 11c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1.5 rounded-xl font-medium border ${
                isLightTheme
                  ? "bg-slate-100 border-slate-300 text-slate-800"
                  : "bg-[#1a102f] border-purple-700/50 text-emerald-300"
              }`}
            >
              {user.nama || user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 px-6 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
