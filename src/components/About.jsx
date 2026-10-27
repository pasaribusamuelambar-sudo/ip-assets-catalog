import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  History,
  Target,
  Award,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export default function About({ isLightTheme }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("sejarah");

  // Membaca URL parameter (?section=sejarah atau ?section=visimisi) dari dropdown Navbar
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section === "visimisi") {
      setActiveSection("visimisi");
    } else {
      setActiveSection("sejarah");
    }
  }, [location]);

  return (
    <section
      id="about"
      className={`py-12 px-4 md:px-8 min-h-screen transition-colors duration-300 font-sans ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 border shadow-xs ${
              isLightTheme
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-purple-950/80 border-purple-500/40 text-emerald-400"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Tentang Sentra KI Polibatam
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">
            Pusat Pelayanan & Pengelolaan{" "}
            <span
              className={
                isLightTheme
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent"
              }
            >
              Kekayaan Intelektual
            </span>
          </h2>
          <p
            className={`mt-2 max-w-2xl mx-auto text-xs md:text-sm ${
              isLightTheme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Mewujudkan ekosistem rekayasa dan inovasi berstandar industri dengan
            perlindungan hukum yang kuat bagi seluruh sivitas akademika.
          </p>
        </div>

        {/* TAMPILAN 1: SEJARAH KI (JIKA DIPILIH DARI NAVBAR DROPDOWN) */}
        {activeSection === "sejarah" && (
          <div
            className={`p-6 md:p-8 rounded-3xl border shadow-xl transition-all duration-300 ${
              isLightTheme
                ? "bg-white border-slate-200"
                : "bg-[#140d24] border-purple-900/40"
            }`}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/50">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  Sejarah Perkembangan KI di Indonesia
                </h3>
                <p className="text-xs text-slate-400">
                  Perjalanan regulasi Hak Kekayaan Intelektual sejak era
                  kolonial hingga modern
                </p>
              </div>
            </div>

            <div
              className={`space-y-4 text-xs md:text-sm leading-relaxed text-justify max-h-[520px] overflow-y-auto pr-3 scrollbar-thin ${
                isLightTheme ? "text-slate-700" : "text-slate-300"
              }`}
            >
              <p>
                Secara historis, peraturan perundang-undangan di bidang HKI di
                Indonesia telah ada sejak tahun 1840-an. Pemerintah Kolonial
                Belanda memperkenalkan undang-undang pertama mengenai
                perlindungan HKI pada tahun 1844. Selanjutnya, Pemerintah
                Belanda mengundangkan UU Merek (1885), UU Paten (1910), dan UU
                Hak Cipta (1912). Indonesia yang pada waktu itu masih bernama
                Netherlands East-Indies telah menjadi anggota Paris Convention
                for the Protection of Industrial Property sejak tahun 1888 dan
                anggota Berne Convention for the Protection of Literary and
                Artistic Works sejak tahun 1914. Pada jaman pendudukan Jepang
                yaitu tahun 1942 s.d. 1945, semua peraturan perundang-undangan
                di bidang HKI tersebut tetap berlaku.
              </p>
              <p>
                Pada tanggal 17 Agustus 1945 bangsa Indonesia memproklamirkan
                kemerdekaannya. Sebagaimana ditetapkan dalam ketentuan peralihan
                UUD 1945, seluruh peraturan perundang-undangan peninggalan
                kolonial Belanda tetap berlaku selama tidak bertentangan dengan
                UUD 1945. UU Hak Cipta dan UU peningggalan Belanda tetap
                berlaku, namun tidak demikian halnya dengan UU Paten yang
                dianggap bertentangan dengan pemerintah Indonesia. Sebagaimana
                ditetapkan dalam UU Paten peninggalan Belanda, permohonan paten
                dapat diajukan di kantor paten yang berada di Batavia (sekarang
                Jakarta), namun pemeriksaan atas permohonan paten tersebut harus
                dilakukan di Octrooiraad yang berada di Belanda.
              </p>
              <p>
                Pada tahun 1953 Menteri Kehakiman RI mengeluarkan pengumuman
                yang merupakan perangkat peraturan nasional pertama yang
                mengatur tentang paten, yaitu Pengumuman Menteri Kehakiman No.
                J.S. 5/41/4, yang mengatur tentang pengajuan sementara
                permintaan paten dalam negeri, dan Pengumuman Menteri Kehakiman
                No. J.G. 1/2/17 yang mengatur tentang pengajuan sementara
                permintaan paten luar negeri.
              </p>
              <p>
                Pada tanggal 11 Oktober 1961 pemerintah RI mengundangkan UU No.
                21 tahun 1961 tentang Merek Perusahaan dan Merek Perniagaan (UU
                Merek 1961) untuk menggantikan UU Merek kolonial Belanda. UU
                Merek 1961 yang merupakan undang-undang Indonesia pertama di
                bidang HKI. Berdasarkan pasal 24, UU No. 21 Th. 1961,
                undang-undang tersebut mulai berlaku tanggal 11 November 1961.
                Penetapan UU Merek 1961 dimaksudkan untuk melindungi masyarakat
                dari barang-barang tiruan/bajakan. Saat ini, setiap tanggal 11
                November yang merupakan tanggal berlakunya UU No. 21 tahun 1961
                juga telah ditetapkan sebagai Hari KI Nasional.
              </p>
              <p>
                Pada tanggal 10 Mei 1979 Indonesia meratifikasi Konvensi Paris
                [Paris Convention for the Protection of Industrial Property
                (Stockholm Revision 1967)] berdasarkan Keputusan Presiden No. 24
                Tahun 1979.
              </p>
              <p>
                Pada tanggal 12 April 1982 Pemerintah mengesahkan UU No. 6 tahun
                1982 tentang Hak Cipta (UU Hak Cipta 1982) untuk menggantikan UU
                Hak Cipta peninggalan Belanda. Pengesahan UU Hak Cipta 1982
                dimaksudkan untuk mendorong dan melindungi penciptaan,
                penyebarluasan hasil kebudayaan di bidang karya ilmu, seni dan
                sastra serta mempercepat pertumbuhan kecerdasan kehidupan
                bangsa.
              </p>
              <p>
                Tahun 1986 dapat disebut sebagai awal era modern sistem HKI di
                tanah air. Pada tanggal 23 Juli 1986 Presiden RI membentuk
                sebuah tim khusus di bidang HKI melalui Keputusan No. 34/1986
                (Tim Keppres 34). Tugas utama Tim Keppres 34 mencakup penyusunan
                kebijakan nasional di bidang HKI, perancangan peraturan
                perundang-undangan di bidang HKI, dan sosialisasi sistem HKI di
                kalangan instansi pemerintah terkait, aparat penegak hukum, dan
                masyarakat luas.
              </p>
              <p>
                Di penghujung tahun 2000, disahkan tiga UU baru di bidang KI,
                yaitu UU No. 30 tahun 2000 tentang Rahasia Dagang, UU No. 31
                tahun 2000 tentang Desain Industri, dan UU No. 32 Tahun 2000
                tentang Desain Tata Letak Sirkuit Terpadu.
              </p>
              <p className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs italic font-medium">
                Catatan: Perubahan Nomenklatur Departemen Hukum dan Hak Asasi
                Manusia menjadi Kementerian Hukum dan Hak Asasi Manusia
                berdasarkan Keputusan Menteri Nomor M.HH-02.OT.01.01 Tahun 2011
                tentang Penyesuaian Penggunaan Nama Kementerian Hukum dan Hak
                Asasi Manusia Republik Indonesia.
              </p>
            </div>
          </div>
        )}

        {/* TAMPILAN 2: VISI & MISI (JIKA DIPILIH DARI NAVBAR DROPDOWN) */}
        {activeSection === "visimisi" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CARD VISI */}
            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 ${
                isLightTheme
                  ? "bg-white border-slate-200"
                  : "bg-[#140d24] border-purple-900/40"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Visi</h3>
                    <p className="text-xs text-slate-400">
                      Sentra HKI Polibatam
                    </p>
                  </div>
                </div>

                <ol className="space-y-4 text-xs md:text-sm list-decimal list-inside leading-relaxed font-medium">
                  <li className="p-3.5 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    Sebagai pusat pelayanan dan pengelolaan hak kekayaan
                    intelektual yang jujur dan profesional.
                  </li>
                  <li className="p-3.5 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    Sebagai Lembaga yang mampu mengembangkan hasil penelitian
                    dan pengabdian kepada masyarakat menjadi inovasi teknologi
                    yang dapat diterapkan di industri.
                  </li>
                </ol>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-emerald-500 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" /> Integritas & Profesionalitas
              </div>
            </div>

            {/* CARD MISI */}
            <div
              className={`p-6 md:p-8 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 ${
                isLightTheme
                  ? "bg-white border-slate-200"
                  : "bg-[#140d24] border-purple-900/40"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Misi</h3>
                    <p className="text-xs text-slate-400">
                      Sentra HKI Polibatam
                    </p>
                  </div>
                </div>

                <ol className="space-y-3 text-xs md:text-sm list-decimal list-inside leading-relaxed font-medium">
                  <li className="p-3 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    Memberikan pelayanan pengurusan kekayaan intelektual secara
                    profesional.
                  </li>
                  <li className="p-3 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    Memacu peneliti untuk memulai penelitian yang didasarkan
                    pada kebutuhan industri.
                  </li>
                  <li className="p-3 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    Menjembatani peneliti dengan industri dalam pengelolaan hak
                    kekayaan intelektual bersama dan memberikan pendampingan
                    dalam kepengurusan royalty.
                  </li>
                </ol>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-purple-500 font-bold text-xs">
                <Building2 className="w-4 h-4" /> Kolaborasi Industri
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
