export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tentang <span className="text-purple-400">Proyek Kami</span>
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Sistem katalog aset dirancang untuk mempermudah inventarisasi dan tata
          kelola aset secara efisien, aman, dan terintegrasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-left hover:border-blue-500/50 transition">
            <div className="text-blue-400 text-3xl font-bold mb-3">01</div>
            <h3 className="text-xl font-semibold mb-2">Terorganisir</h3>
            <p className="text-slate-400 text-sm">
              Pencatatan data aset yang terstruktur dan mudah diakses kapan
              saja.
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-left hover:border-purple-500/50 transition">
            <div className="text-purple-400 text-3xl font-bold mb-3">02</div>
            <h3 className="text-xl font-semibold mb-2">Cepat & Responsif</h3>
            <p className="text-slate-400 text-sm">
              Ditempa dengan teknologi React dan Vite untuk performa tinggi.
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-left hover:border-blue-500/50 transition">
            <div className="text-blue-400 text-3xl font-bold mb-3">03</div>
            <h3 className="text-xl font-semibold mb-2">Aman</h3>
            <p className="text-slate-400 text-sm">
              Manajemen akses dan kontrol informasi aset secara terpusat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
