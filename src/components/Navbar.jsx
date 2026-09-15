import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-900/80 backdrop-blur-md text-white sticky top-0 z-50 border-b border-purple-900/30">
      {/* Logo & Judul */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20 text-lg tracking-wider">
          IP
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          IP Assets Catalog
        </span>
      </Link>

      {/* Menu Navigasi (Perpindahan Halaman) */}
      <ul className="flex space-x-6 text-gray-300 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-400 transition">
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-purple-400 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </li>
      </ul>

      {/* Tombol Login */}
      <Link
        to="/contact"
        className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        Login
      </Link>
    </nav>
  );
}
