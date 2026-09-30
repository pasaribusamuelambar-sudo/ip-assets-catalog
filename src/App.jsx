import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";

// Import Dashboard dari folder masing-masing
import DashboardAdmin from "./components/Admin Sentra KI/DashboardAdmin";
import DashboardDosenInventor from "./components/Dosen Inventor/DashboardDosenInventor";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  // Cek apakah halaman saat ini adalah Dashboard (Admin / Dosen)
  const isDashboardRoute =
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/dosen-dashboard");

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      {/* TAMPILKAN NAVBAR HANYA DI HALAMAN PUBLIK (Bukan Dashboard Admin/Dosen) */}
      {!isDashboardRoute && (
        <Navbar
          user={currentUser}
          onLogout={handleLogout}
          isLightTheme={isLightTheme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Rute Halaman */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero isLightTheme={isLightTheme} />} />
          <Route
            path="/about"
            element={<About isLightTheme={isLightTheme} />}
          />
          <Route
            path="/contact"
            element={<Contact isLightTheme={isLightTheme} />}
          />
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={handleLoginSuccess}
                isLightTheme={isLightTheme}
              />
            }
          />

          {/* Rute Terproteksi untuk Dashboard Admin */}
          <Route
            path="/admin-dashboard"
            element={
              currentUser && currentUser.role === "Admin" ? (
                <DashboardAdmin
                  isLightTheme={isLightTheme}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Rute Terproteksi untuk Dashboard Dosen */}
          <Route
            path="/dosen-dashboard/*"
            element={
              currentUser &&
              (currentUser.role === "Dosen" ||
                currentUser.role === "Inventor" ||
                currentUser.role === "Dosen / Inventor") ? (
                <DashboardDosenInventor
                  user={currentUser}
                  isLightTheme={isLightTheme}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>

      {/* TAMPILKAN FOOTER HANYA DI HALAMAN PUBLIK */}
      {!isDashboardRoute && (
        <footer
          className={`py-6 text-center text-sm border-t ${
            isLightTheme
              ? "bg-white text-slate-500 border-slate-200"
              : "bg-[#0d0817] text-slate-400 border-purple-900/40"
          }`}
        >
          © {new Date().getFullYear()} IP Assets Catalog. All rights reserved.
          Polibatam Sentra HKI 2026
        </footer>
      )}
    </div>
  );
}
