import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      {/* Navbar tetap berada di atas di semua halaman */}
      <Navbar />

      {/* Tempat perpindahan halaman */}
      <main className="flex-grow">
        <Routes>
          {/* Halaman Beranda / Home */}
          <Route path="/" element={<Hero />} />

          {/* Halaman About */}
          <Route path="/about" element={<About />} />

          {/* Halaman Contact */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer tetap di bawah */}
      <footer className="py-6 text-center text-slate-500 border-t border-slate-900 text-sm">
        © {new Date().getFullYear()} IP Assets Catalog. All rights
        reserved.polibatam 2026
      </footer>
    </div>
  );
}
