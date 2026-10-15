import React, { useState, useEffect } from "react";

export default function HeaderAdmin({ onToggleSidebar, isSidebarOpen }) {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Ambil data dari Backend Express (Port 8000)
  useEffect(() => {
    fetch("http://localhost:8000/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setMessages(data.data);
      })
      .catch((err) => console.error("Gagal memuat pesan:", err));

    fetch("http://localhost:8000/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setNotifications(data.data);
      })
      .catch((err) => console.error("Gagal memuat notifikasi:", err));
  }, []);

  const unreadMessageCount = messages.filter((m) => !m.isRead).length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  // Fungsi Tandai Semua Pesan Dibaca Sekaligus Tanpa Scroll
  const handleMarkAllMessagesAsRead = () => {
    fetch("http://localhost:8000/api/messages/read-all", { method: "PATCH" })
      .then(() => {
        setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
      })
      .catch((err) => console.error(err));
  };

  // Fungsi Tandai Semua Notifikasi Dibaca Sekaligus Tanpa Scroll
  const handleMarkAllNotifsAsRead = () => {
    fetch("http://localhost:8000/api/notifications/read-all", {
      method: "PATCH",
    })
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      })
      .catch((err) => console.error(err));
  };

  const handleReplyViaGmail = (email, nama, pesanAwal) => {
    const subject = encodeURIComponent(
      `Tanggapan Sentra HKI Polibatam: Mengenai Pesan Anda`,
    );
    const body = encodeURIComponent(
      `Halo ${nama},\n\nTerima kasih telah menghubungi Sentra HKI Polibatam.\n\nMengenai pesan Anda:\n"${pesanAwal}"\n\n---\nTanggapan Admin:\n`,
    );
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailWebUrl, "_blank");
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition cursor-pointer"
          title="Buka / Tutup Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-ping"></span>
            Panel Kelola Admin Sentra KI Polibatam
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Sistem Informasi Pengelolaan & Katalog Aset Kekayaan Intelektual
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 1. IKON LONCENG NOTIFIKASI SISTEM */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifModalOpen((prev) => !prev);
              setIsMessageModalOpen(false);
            }}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition relative flex items-center justify-center cursor-pointer"
            title="Notifikasi Aktivitas & Pengajuan KI"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* DROPDOWN NOTIFIKASI */}
          {isNotifModalOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-800">
                    Notifikasi Sistem
                  </h3>
                  {unreadNotifCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                      {unreadNotifCount} Baru
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsNotifModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Tombol Cepat: Tandai Semua Dibaca */}
              {unreadNotifCount > 0 && (
                <div className="px-4 py-2 bg-amber-50/50 border-b border-slate-100 flex justify-end">
                  <button
                    onClick={handleMarkAllNotifsAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Tandai semua sudah dibaca
                  </button>
                </div>
              )}

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Belum ada notifikasi baru.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 transition flex items-start gap-3 ${!item.isRead ? "bg-amber-50/40" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-slate-800">
                            {item.judul}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {item.waktu}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. IKON KOTAK SURAT / PESAN */}
        <div className="relative">
          <button
            onClick={() => {
              setIsMessageModalOpen((prev) => !prev);
              setIsNotifModalOpen(false);
            }}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition relative flex items-center justify-center cursor-pointer"
            title="Pesan & Inquiry Pengguna"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {unreadMessageCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {unreadMessageCount}
              </span>
            )}
          </button>

          {/* DROPDOWN PESAN */}
          {isMessageModalOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-800">
                    Pesan Masuk (Inquiry)
                  </h3>
                  {unreadMessageCount > 0 && (
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                      {unreadMessageCount} Baru
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Tombol Cepat: Tandai Semua Pesan Dibaca */}
              {unreadMessageCount > 0 && (
                <div className="px-4 py-2 bg-blue-50/50 border-b border-slate-100 flex justify-end">
                  <button
                    onClick={handleMarkAllMessagesAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Tandai semua sudah dibaca
                  </button>
                </div>
              )}

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Belum ada pesan dari pengguna.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition flex items-start gap-3 ${!msg.isRead ? "bg-blue-50/50" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {msg.nama ? msg.nama.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {msg.nama}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {msg.tanggal}
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-600 font-medium truncate">
                          {msg.email}
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                          {msg.pesan}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* MODAL DETAIL PESAN */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-800">
                    Detail Pesan Pengguna
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dikirim pada {selectedMessage.tanggal}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-medium">
                    Pengirim:
                  </label>
                  <p className="font-bold text-slate-800 text-sm">
                    {selectedMessage.nama}
                  </p>
                </div>
                <div>
                  <label className="text-slate-400 font-medium">
                    Email Pengguna:
                  </label>
                  <p className="font-semibold text-blue-600">
                    {selectedMessage.email}
                  </p>
                </div>
                <div>
                  <label className="text-slate-400 font-medium">
                    Isi Pesan:
                  </label>
                  <div className="mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 whitespace-pre-line leading-relaxed">
                    {selectedMessage.pesan}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={() =>
                    handleReplyViaGmail(
                      selectedMessage.email,
                      selectedMessage.nama,
                      selectedMessage.pesan,
                    )
                  }
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  Balas via Gmail
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-xl border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sistem Online</span>
        </div>

        <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1.5 rounded-xl font-semibold">
          Super Admin
        </span>
      </div>
    </header>
  );
}
