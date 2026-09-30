import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import 4 Gambar
import poltekImg from "../assets/poltek.jpeg";
import technopreneurImg from "../assets/Technopreneur-Polibatam-1.jpg";
import pblImg from "../assets/PBL-Master-Plan-3-D-0.jpg";
import photoImg from "../assets/Photo-768x432.jpg";

export default function Hero({ isLightTheme }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sliderImages = [
    {
      src: poltekImg,
      title: "Gedung Utama Politeknik Negeri Batam",
      desc: "Pusat inovasi dan pengembangan Kekayaan Intelektual.",
    },
    {
      src: technopreneurImg,
      title: "Technopreneurship Polibatam",
      desc: "Mendukung komersialisasi riset dan produk inovasi mahasiswa & dosen.",
    },
    {
      src: pblImg,
      title: "Project-Based Learning (PBL)",
      desc: "Inovasi berbasis proyek nyata yang menghasilkan karya cipta dan paten.",
    },
    {
      src: photoImg,
      title: "Galeri Riset & Kekayaan Intelektual",
      desc: "Katalog terlengkap untuk inventarisasi aset digital Polibatam.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length,
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const ipCategories = [
    "Hak Cipta",
    "Paten",
    "Merek",
    "Desain Industri",
    "Software",
    "Utility Model",
    "Trade Secret",
    "Geographical Indication",
  ];

  const dummyAssets = [
    {
      id: 1,
      title: "Sistem Presensi Berbasis Machine Learning",
      type: "Software",
      creator: "Dr. Ahmad Yani, M.T. & Tim",
      year: "2026",
      status: "Terverifikasi",
    },
    {
      id: 2,
      title: "Desain Ergonomis Kursi Laboratorium Komputer",
      type: "Desain Industri",
      creator: "Budi Santoso, S.ST., M.T.",
      year: "2025",
      status: "Terverifikasi",
    },
    {
      id: 3,
      title: "Metode Pengolahan Citra Medis Otomatis",
      type: "Paten",
      creator: "Prof. Hendra Wijaya",
      year: "2026",
      status: "Terverifikasi",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      {/* Hero Header & Carousel */}
      <section className="relative pt-10 pb-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border shadow-sm ${
              isLightTheme
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-purple-950/80 border-purple-500/40 text-emerald-400"
            }`}
          >
            Unit Sentra Kekayaan Intelektual Polibatam
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold max-w-4xl mx-auto leading-tight">
            Katalog Inventaris & Portofolio{" "}
            <span
              className={
                isLightTheme
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent"
              }
            >
              Kekayaan Intelektual
            </span>
          </h1>

          <p
            className={`mt-4 max-w-2xl mx-auto text-sm md:text-base ${
              isLightTheme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Jelajahi karya cipta, paten, dan riset terverifikasi buatan civitas
            akademika Politeknik Negeri Batam.
          </p>

          {/* Slider 4 Gambar Otomatis */}
          <div
            className={`mt-8 max-w-4xl mx-auto relative rounded-2xl overflow-hidden border shadow-2xl ${
              isLightTheme
                ? "border-slate-300 bg-white"
                : "border-purple-800/40 bg-[#130b21]"
            }`}
          >
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="bg-emerald-500/80 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded w-fit mb-1 backdrop-blur-sm">
                      Informasi IP Assets
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-white drop-shadow-md">
                      {image.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-200 drop-shadow">
                      {image.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Indikator Dots */}
            <div className="absolute bottom-3 right-6 z-20 flex gap-2">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex
                      ? "w-8 bg-emerald-400"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bar Pencarian */}
          <div
            className={`mt-8 max-w-2xl mx-auto border rounded-2xl p-2 shadow-xl flex flex-col md:flex-row gap-2 ${
              isLightTheme
                ? "bg-white border-slate-300"
                : "bg-[#140d24]/90 border-purple-800/50"
            }`}
          >
            <input
              type="text"
              placeholder="Cari judul KI, nama pencipta, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-grow bg-transparent px-4 py-3 text-sm focus:outline-none ${
                isLightTheme
                  ? "text-slate-800 placeholder-slate-400"
                  : "text-white placeholder-slate-400"
              }`}
            />
            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 px-6 py-3 rounded-xl font-medium text-sm text-white hover:opacity-90 transition shadow-md">
              Cari Asset
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 border px-6 py-2.5 rounded-xl text-sm font-medium transition ${
                isLightTheme
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  : "border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40"
              }`}
            >
              Hubungi Admin Sentra KI
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Kategori */}
      <section
        className={`py-6 px-6 border-y ${
          isLightTheme
            ? "bg-slate-100 border-slate-200"
            : "bg-[#10091d] border-purple-900/40"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className={`text-xs uppercase tracking-wider font-semibold mb-4 text-center md:text-left ${
              isLightTheme ? "text-slate-500" : "text-purple-300"
            }`}
          >
            Filter Berdasarkan Jenis KI:
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <button
              onClick={() => setSelectedCategory("Semua")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                selectedCategory === "Semua"
                  ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md"
                  : isLightTheme
                    ? "bg-white text-slate-600 border border-slate-200 hover:bg-slate-200"
                    : "bg-[#1d1233] text-slate-300 hover:bg-[#281947] hover:text-white"
              }`}
            >
              Semua
            </button>
            {ipCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md"
                    : isLightTheme
                      ? "bg-white text-slate-600 border border-slate-200 hover:bg-slate-200"
                      : "bg-[#1d1233] text-slate-300 hover:bg-[#281947] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Katalog */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Katalog Aset Publik</h2>
            <p
              className={`text-sm ${isLightTheme ? "text-slate-500" : "text-purple-200/70"}`}
            >
              Menampilkan KI terverifikasi yang siap diakses publik.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyAssets.map((asset) => (
            <div
              key={asset.id}
              className={`border rounded-2xl p-6 flex flex-col justify-between transition duration-300 shadow-md ${
                isLightTheme
                  ? "bg-white border-slate-200 hover:border-emerald-500"
                  : "bg-[#140d24] border-purple-900/40 hover:border-emerald-500/50"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-600 font-medium">
                    {asset.type}
                  </span>
                  <span className="text-xs text-slate-400">{asset.year}</span>
                </div>
                <h3 className="font-semibold text-lg leading-snug">
                  {asset.title}
                </h3>
                <p
                  className={`mt-3 text-xs ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}
                >
                  <strong>Pencipta:</strong> {asset.creator}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/40 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-medium">
                  ✓ {asset.status}
                </span>
                <button className="text-xs text-blue-600 hover:text-emerald-600 transition font-medium">
                  Detail & Dokumen →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
