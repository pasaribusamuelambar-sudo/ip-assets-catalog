import React, { useState, useEffect } from "react";

// Data Awal Dummy Dosen Inventor
const initialUsers = [
  {
    id: "123456780",
    nama: "Samuel Ambar Pasaribu, M.Kom.",
    email: "pasaribusamuelambar@gmail.com",
    jurusan: "Teknik Informatika",
    role: "Dosen Inventor",
    status: "Aktif",
    passwordTerakhir: "12345678",
    riwayatPassword: [{ tanggal: "2026-01-01", status: "Dibuat Sistem" }],
    historyKarya: [
      {
        idKarya: "HKI-001",
        judul: "Sistem Informasi Pengelolaan & Katalog Aset HKI",
        tahun: "2026",
        jenis: "Hak Cipta (Software)",
      },
    ],
  },
  {
    id: "198803122019031001",
    nama: "Dr. Eng. Widya Putri, M.T.",
    email: "widya@polibatam.ac.id",
    jurusan: "Teknik Informatika",
    role: "Dosen Inventor",
    status: "Non-Aktif",
    passwordTerakhir: "Batam2026!#",
    riwayatPassword: [
      { tanggal: "2026-01-10", status: "Dibuat Sistem" },
      { tanggal: "2026-05-14", status: "Diubah oleh Dosen" },
    ],
    historyKarya: [
      {
        idKarya: "HKI-002",
        judul: "IoT Monitoring Lingkungan Kampus",
        tahun: "2025",
        jenis: "Paten Sederhana",
      },
    ],
  },
  {
    id: "199105202020122002",
    nama: "Ahmad Hamim Thohari, S.S.T., M.T.",
    email: "ahmad.hamim@polibatam.ac.id",
    jurusan: "Teknik Elektro",
    role: "Dosen Inventor",
    status: "Aktif",
    passwordTerakhir: "P3M_Polibatam2026",
    riwayatPassword: [{ tanggal: "2026-02-01", status: "Dibuat Sistem" }],
    historyKarya: [
      {
        idKarya: "HKI-003",
        judul: "Rangkaian Kontrol Daya Otomatis",
        tahun: "2024",
        jenis: "Paten",
      },
    ],
  },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("users"); // 'users' atau 'archived'

  // Load state users
  const [users, setUsers] = useState(() => {
    const savedData = localStorage.getItem("ip_catalog_users");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem("ip_catalog_users", JSON.stringify(initialUsers));
    return initialUsers;
  });

  // Load state deleted/archived users
  const [archivedUsers, setArchivedUsers] = useState(() => {
    const savedArchived = localStorage.getItem("ip_catalog_archived_users");
    if (savedArchived) {
      try {
        return JSON.parse(savedArchived);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  // State Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // modal profil
  const [editUser, setEditUser] = useState(null); // modal edit

  // Form Data Tambah Pengguna
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    email: "",
    jurusan: "Teknik Informatika",
    passwordAwal: "",
  });

  // Form Data Edit Pengguna
  const [editFormData, setEditFormData] = useState({
    id: "",
    nama: "",
    email: "",
    jurusan: "Teknik Informatika",
    status: "Aktif",
    passwordBaru: "",
  });

  useEffect(() => {
    localStorage.setItem("ip_catalog_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "ip_catalog_archived_users",
      JSON.stringify(archivedUsers),
    );
  }, [archivedUsers]);

  // Handle Input Tambah
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Input Edit
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah User Baru
  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !formData.id ||
      !formData.nama ||
      !formData.email ||
      !formData.passwordAwal
    ) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    const newUser = {
      id: formData.id.trim(),
      nama: formData.nama.trim(),
      email: formData.email.trim(),
      jurusan: formData.jurusan,
      role: "Dosen Inventor",
      status: "Aktif",
      passwordTerakhir: formData.passwordAwal.trim(),
      riwayatPassword: [
        {
          tanggal: new Date().toISOString().split("T")[0],
          status: "Dibuat Sistem (Admin)",
        },
      ],
      historyKarya: [],
    };

    const updatedList = [newUser, ...users];
    setUsers(updatedList);

    setFormData({
      id: "",
      nama: "",
      email: "",
      jurusan: "Teknik Informatika",
      passwordAwal: "",
    });
    setShowAddModal(false);
  };

  // Buka Modal Edit
  const openEditModal = (user) => {
    setEditUser(user);
    setEditFormData({
      id: user.id,
      nama: user.nama,
      email: user.email,
      jurusan: user.jurusan,
      status: user.status,
      passwordBaru: "",
    });
  };

  // Simpan Edit User
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) => {
      if (u.id === editUser.id) {
        const isPasswordChanged = editFormData.passwordBaru.trim() !== "";
        const newPassword = isPasswordChanged
          ? editFormData.passwordBaru.trim()
          : u.passwordTerakhir;

        const updatedHistory = isPasswordChanged
          ? [
              {
                tanggal: new Date().toISOString().split("T")[0],
                status: "Diubah oleh Admin",
              },
              ...(u.riwayatPassword || []),
            ]
          : u.riwayatPassword;

        return {
          ...u,
          id: editFormData.id.trim(),
          nama: editFormData.nama.trim(),
          email: editFormData.email.trim(),
          jurusan: editFormData.jurusan,
          status: editFormData.status,
          passwordTerakhir: newPassword,
          riwayatPassword: updatedHistory,
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    setEditUser(null);
  };

  // Toggle Status Aktif / Non-Aktif
  const toggleUserStatus = (id) => {
    const updatedUsers = users.map((u) => {
      if (u.id === id) {
        return { ...u, status: u.status === "Aktif" ? "Non-Aktif" : "Aktif" };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  // Hapus User & Arsipkan Data Karya
  const handleDeleteUser = (userToDelete) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus akun "${userToDelete.nama}"? \n\nAkun akan diblokir total dari login web, namun history karya KI akan tetap tersimpan di Arsip Admin.`,
      )
    ) {
      const archivedRecord = {
        ...userToDelete,
        status: "Dihapus (Akses Diblokir)",
        tanggalDihapus: new Date().toISOString().split("T")[0],
      };

      setArchivedUsers([archivedRecord, ...archivedUsers]);

      const filtered = users.filter((u) => u.id !== userToDelete.id);
      setUsers(filtered);
    }
  };

  // Filter Data User
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* Header & Tab Selector */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Kelola Pengguna</h1>
          <p className="text-xs text-slate-500">
            Manajemen akun Dosen Inventor, monitoring kredensial, dan arsip hak
            kekayaan intelektual.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === "users"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Daftar Dosen Inventor ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === "archived"
                ? "bg-white text-rose-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Arsip Akun Dihapus ({archivedUsers.length})
          </button>
        </div>
      </div>

      {activeTab === "users" ? (
        <>
          {/* Action Bar (Pencarian, Filter, Tambah Dosen) */}
          <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Cari ID, Nama, atau Email Dosen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
                <svg
                  className="w-5 h-5 text-slate-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full sm:w-auto"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition text-sm cursor-pointer"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Dosen Inventor
            </button>
          </div>

          {/* Tabel Data Dosen Inventor */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 font-semibold">
                      DOSEN INVENTOR
                    </th>
                    <th className="py-3.5 px-4 font-semibold">ID</th>
                    <th className="py-3.5 px-4 font-semibold">JURUSAN</th>
                    <th className="py-3.5 px-4 font-semibold">STATUS AKUN</th>
                    <th className="py-3.5 px-4 font-semibold">
                      MONITORING PASSWORD
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-center">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/80 transition"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">
                            {user.nama}
                          </div>
                          <div className="text-xs text-slate-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-700">
                          {user.id}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {user.jurusan}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === "Aktif"
                                ? "bg-emerald-100/80 text-emerald-800"
                                : "bg-rose-100/80 text-rose-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs text-slate-800">
                            {user.passwordTerakhir}
                          </span>
                        </td>

                        {/* Kolom Aksi dengan Ikon Simbol Modern & Compact */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex justify-center items-center gap-1.5">
                            {/* Tombol Lihat Profil */}
                            <button
                              onClick={() => setSelectedUser(user)}
                              title="Lihat Profil"
                              className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                            >
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>

                            {/* Tombol Edit Data */}
                            <button
                              onClick={() => openEditModal(user)}
                              title="Edit Data"
                              className="p-2 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 transition cursor-pointer"
                            >
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            {/* Tombol Toggle Aktif / Nonaktifkan */}
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              title={
                                user.status === "Aktif"
                                  ? "Nonaktifkan Akun"
                                  : "Aktifkan Akun"
                              }
                              className={`p-2 rounded-lg transition cursor-pointer ${
                                user.status === "Aktif"
                                  ? "text-slate-600 bg-slate-100 hover:bg-slate-200"
                                  : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                              }`}
                            >
                              {user.status === "Aktif" ? (
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
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                              ) : (
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
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              )}
                            </button>

                            {/* Tombol Hapus */}
                            <button
                              onClick={() => handleDeleteUser(user)}
                              title="Hapus Akun & Arsipkan Karya"
                              className="p-2 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-8 text-center text-slate-400"
                      >
                        Tidak ada data dosen yang sesuai dengan
                        pencarian/filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Tabel Arsip Akun Dihapus & History Karya */
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
          <div className="p-4 bg-amber-50/60 border-b border-amber-200 text-xs text-amber-800">
            <strong>Catatan Keamanan:</strong> Akun di bawah ini telah dihapus.
            Pengguna terkait <strong>TIDAK BISA LOGIN</strong> ke sistem, namun
            seluruh riwayat karya kekayaan intelektual (HKI) tetap diarsipkan
            secara permanen untuk kepentingan administrasi perguruan tinggi.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 font-semibold">
                    DOSEN INVENTOR (DIHAPUS)
                  </th>
                  <th className="py-3.5 px-4 font-semibold">ID</th>
                  <th className="py-3.5 px-4 font-semibold">JURUSAN</th>
                  <th className="py-3.5 px-4 font-semibold">TGL DIHAPUS</th>
                  <th className="py-3.5 px-4 font-semibold">
                    HISTORY KARYA HKI TERDAFTAR
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {archivedUsers.length > 0 ? (
                  archivedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-slate-50/50 hover:bg-slate-100/50 transition"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 line-through">
                          {user.nama}
                        </div>
                        <div className="text-xs text-slate-400">
                          {user.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {user.id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {user.jurusan}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-rose-600">
                        {user.tanggalDihapus}
                      </td>
                      <td className="py-3.5 px-4">
                        {user.historyKarya && user.historyKarya.length > 0 ? (
                          <div className="space-y-1">
                            {user.historyKarya.map((k) => (
                              <div
                                key={k.idKarya}
                                className="bg-white p-2 rounded-lg border border-slate-200 text-xs"
                              >
                                <div className="font-bold text-slate-800">
                                  [{k.idKarya}] {k.judul}
                                </div>
                                <div className="text-slate-500">
                                  Jenis: {k.jenis} ({k.tahun})
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            Belum ada riwayat karya HKI yang tercatat.
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      Belum ada akun yang dihapus/diarsipkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Detail Profil & Keamanan */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Profil & Keamanan Dosen Inventor
                </h3>
                <p className="text-xs text-slate-500">
                  Detail akun dan catatan keamanan sistem Sentra HKI
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500">Nama Lengkap:</span>
                <span className="col-span-2 font-medium text-slate-800">
                  {selectedUser.nama}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500">ID:</span>
                <span className="col-span-2 font-mono text-slate-800">
                  {selectedUser.id}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500">Email Instansi:</span>
                <span className="col-span-2 text-slate-800">
                  {selectedUser.email}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500">Jurusan:</span>
                <span className="col-span-2 text-slate-800">
                  {selectedUser.jurusan}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500">Password Aktif:</span>
                <span className="col-span-2 font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md w-max">
                  {selectedUser.passwordTerakhir}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Riwayat Perubahan Password:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 max-h-32 overflow-y-auto">
                  {selectedUser.riwayatPassword?.map((log, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-slate-50 p-2 rounded-lg border border-slate-100"
                    >
                      <span>{log.status}</span>
                      <span className="text-slate-400 font-mono">
                        {log.tanggal}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium px-4 py-2 rounded-xl text-sm transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Data Kelola Pengguna */}
      {editUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Data Dosen Inventor
              </h3>
              <button
                onClick={() => setEditUser(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ID (NIP / NIDN)
                </label>
                <input
                  type="text"
                  name="id"
                  value={editFormData.id}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  name="nama"
                  value={editFormData.nama}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jurusan
                </label>
                <select
                  name="jurusan"
                  value={editFormData.jurusan}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Teknik Elektro">Teknik Elektro</option>
                  <option value="Teknik Mesin">Teknik Mesin</option>
                  <option value="Manajemen Bisnis">Manajemen Bisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Akun
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ubah Password (Monitoring Password)
                </label>
                <input
                  type="text"
                  name="passwordBaru"
                  value={editFormData.passwordBaru}
                  onChange={handleEditInputChange}
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Password saat ini: {editUser.passwordTerakhir}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition shadow-xs cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Form Tambah Dosen Inventor Baru */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Tambah Akun Dosen Inventor
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Buat kredensial akun baru untuk Dosen Inventor Polibatam.
            </p>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ID (NIP / NIDN)
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Contoh: 198803122019031001"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Contoh: Dr. Eng. Widya Putri, M.T."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Polibatam
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="dosen@polibatam.ac.id"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jurusan
                </label>
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Teknik Elektro">Teknik Elektro</option>
                  <option value="Teknik Mesin">Teknik Mesin</option>
                  <option value="Manajemen Bisnis">Manajemen Bisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password Awal Akun
                </label>
                <input
                  type="text"
                  name="passwordAwal"
                  value={formData.passwordAwal}
                  onChange={handleInputChange}
                  placeholder="Buat password default..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-xs cursor-pointer"
                >
                  Simpan Akun Dosen Inventor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
