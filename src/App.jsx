import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import DashboardAdmin from "./components/Admin Sentra KI/DashboardAdmin";
import DashboardDosenInventor from "./components/Dosen Inventor/DashboardDosenInventor";

export default function App() {
  // Read current logged-in user synchronously from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Gagal membaca currentUser dari localStorage:", e);
      return null;
    }
  });

  const [isLightTheme, setIsLightTheme] = useState(false);
  const location = useLocation();

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  // Check if current route is part of dashboard area
  const isDashboardRoute =
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/dosen-dashboard") ||
    location.pathname.startsWith("/dosen");

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
        isLightTheme ? "bg-slate-50 text-slate-800" : "bg-[#0b0713] text-white"
      }`}
    >
      {!isDashboardRoute && (
        <Navbar
          user={currentUser}
          onLogout={handleLogout}
          isLightTheme={isLightTheme}
          onToggleTheme={toggleTheme}
        />
      )}

      <main className="flex-grow">
        <Routes>
          {/* Landing Page Utama */}
          <Route path="/" element={<Hero isLightTheme={isLightTheme} />} />
          <Route
            path="/about"
            element={<About isLightTheme={isLightTheme} />}
          />
          <Route
            path="/contact"
            element={<Contact isLightTheme={isLightTheme} />}
          />

          {/* Rute Login: Jika sudah login, otomatis dialihkan ke Dashboard sesuai Role */}
          <Route
            path="/login"
            element={
              currentUser ? (
                currentUser.role === "Admin" ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/dosen/overview" replace />
                )
              ) : (
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  isLightTheme={isLightTheme}
                />
              )
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard/*"
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

          {/* Dosen / Inventor Dashboard */}
          <Route
            path="/dosen/*"
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

          {/* Fallback Rute Dosen Dashboard */}
          <Route
            path="/dosen-dashboard/*"
            element={<Navigate to="/dosen/overview" replace />}
          />
        </Routes>
      </main>

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
