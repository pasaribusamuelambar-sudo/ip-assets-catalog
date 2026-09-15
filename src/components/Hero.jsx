export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl leading-tight">
        Kelola & Jelajahi Aset Digital dengan{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          IP Assets Catalog
        </span>
      </h1>
      <p className="mt-6 text-lg text-slate-400 max-w-2xl">
        Platform modern berbasis web untuk mengatalogkan, memantau, dan
        mengelola seluruh aset kekayaan intelektual serta infrastruktur digital
        dalam satu tempat.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#about"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition"
        >
          Pelajari Lebih Lanjut
        </a>
        <a
          href="#contact"
          className="border border-purple-500/40 text-purple-300 px-8 py-3 rounded-xl font-medium hover:bg-purple-950/40 transition"
        >
          Hubungi Kami
        </a>
      </div>
    </section>
  );
}
