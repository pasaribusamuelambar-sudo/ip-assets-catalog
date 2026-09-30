import React from "react";

export default function About({ isLightTheme }) {
  return (
    <section
      id="about"
      className={`py-20 px-6 min-h-screen transition-colors duration-300 ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tentang{" "}
          <span
            className={
              isLightTheme
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent"
            }
          >
            Proyek Kami
          </span>
        </h2>
        <p
          className={`max-w-3xl mx-auto leading-relaxed text-sm md:text-base ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}
        >
          Sistem katalog aset dirancang untuk mempermudah inventarisasi dan tata
          kelola aset secara efisien, aman, dan terintegrasi di Sentra HKI
          Politeknik Negeri Batam.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div
            className={`p-6 rounded-2xl border text-left shadow-md transition ${
              isLightTheme
                ? "bg-white border-slate-200"
                : "bg-[#140d24] border-purple-900/40"
            }`}
          >
            <div className="text-blue-500 text-3xl font-bold mb-3">01</div>
            <h3 className="text-xl font-semibold mb-2">Terorganisir</h3>
            <p
              className={`text-sm ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}
            >
              Pencatatan data aset yang terstruktur dan mudah diakses kapan
              saja.
            </p>
          </div>
          <div
            className={`p-6 rounded-2xl border text-left shadow-md transition ${
              isLightTheme
                ? "bg-white border-slate-200"
                : "bg-[#140d24] border-purple-900/40"
            }`}
          >
            <div className="text-emerald-500 text-3xl font-bold mb-3">02</div>
            <h3 className="text-xl font-semibold mb-2">Cepat & Responsif</h3>
            <p
              className={`text-sm ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}
            >
              Ditempa dengan teknologi React dan Vite untuk performa tinggi.
            </p>
          </div>
          <div
            className={`p-6 rounded-2xl border text-left shadow-md transition ${
              isLightTheme
                ? "bg-white border-slate-200"
                : "bg-[#140d24] border-purple-900/40"
            }`}
          >
            <div className="text-purple-500 text-3xl font-bold mb-3">03</div>
            <h3 className="text-xl font-semibold mb-2">Aman</h3>
            <p
              className={`text-sm ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}
            >
              Manajemen akses dan kontrol informasi aset secara terpusat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
