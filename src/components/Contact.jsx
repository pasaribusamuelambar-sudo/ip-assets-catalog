import React from "react";

export default function Contact() {
  // Data 3 Admin Pengembang Web
  const admins = [
    {
      nama: "Samuel Ambar Pasaribu",
      nim: "3312511048",
      wa: "6281234567890",
      github: "https://github.com",
      instagram: "https://instagram.com",
      foto: "https://via.placeholder.com/150",
    },
    {
      nama: "Muhammad Hoirul Farhan",
      nim: "3312511034",
      wa: "6281234567891",
      github: "https://github.com",
      instagram: "https://instagram.com",
      foto: "https://via.placeholder.com/150",
    },
    {
      nama: "Indah Suci Yanti",
      nim: "3312511095",
      wa: "6281234567892",
      github: "https://github.com",
      instagram: "https://instagram.com",
      foto: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 bg-slate-950 text-white px-6 min-h-screen"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Tim{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Pengembang
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hubungi salah satu dari administrator kami atau kirimkan pesan
            langsung melalui formulir di bawah ini.
          </p>
        </div>

        {/* 3 Kartu Admin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-purple-900/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:border-purple-500/50 transition-all hover:-translate-y-1 duration-300"
            >
              {/* Foto Profil */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-purple-500/50 p-1 bg-slate-800">
                <img
                  src={admin.foto}
                  alt={admin.nama}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Informasi Admin */}
              <h3 className="text-xl font-bold text-white mb-1">
                {admin.nama}
              </h3>
              <p className="text-xs font-semibold text-purple-400 bg-purple-950/50 px-3 py-1 rounded-full mb-6 border border-purple-800/40">
                NIM: {admin.nim}
              </p>

              {/* Tombol Ikon Sosial Media (GitHub, Instagram, WhatsApp) */}
              <div className="flex items-center justify-center gap-4 w-full mt-auto pt-4 border-t border-slate-800">
                {/* Logo GitHub */}
                <a
                  href={admin.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* Logo Instagram */}
                <a
                  href={admin.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-pink-400 border border-slate-700 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Logo WhatsApp */}
                <a
                  href={`https://wa.me/${admin.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Form Contact Us */}
        <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-2xl border border-purple-900/30 shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-6">
            Kirim <span className="text-blue-400">Pesan</span>
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama kamu"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="email@domain.com"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Pesan</label>
              <textarea
                rows="4"
                placeholder="Tuliskan pesan kamu di sini..."
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-purple-500 text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
