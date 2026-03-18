import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

import Login from "./pages/Login";
import SignUp from "./pages/Sign_up";
import BuyerDashboard from "./pages/Buyer_Dashboard";
import SearchResultPage from "./pages/searchResult_page";
import Profile from "./pages/profile";
import Medicines from "./pages/Medicines";
import SellerDashboard from "./pages/Seller_Dashboard";
import PrescriptionPage from "./pages/Prescription";

/* ── Pages that show the Header + Sidebar shell ── */
const SHELL_ROUTES = [
  "/",
  "/search",
  "/medicines",
  "/profile",
  "/prescription",
  "/pharmacist/dashboard",
];

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.innerWidth < 768;
  const { pathname } = useLocation();

  /* Hide the shell on auth pages */
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login"   element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen((o) => !o)} />

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

        {/* Mobile backdrop */}
        {sidebarOpen && isMobile && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, top: "60px", background: "rgba(0,0,0,0.4)", zIndex: 40 }}
          />
        )}

        {/* Sidebar */}
        <div style={{
          position: isMobile ? "fixed" : "sticky",
          top: "60px",
          height: isMobile ? "100vh" : "calc(100vh - 60px)",
          zIndex: 41,
          flexShrink: 0,
          transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : "none",
          transition: "transform 0.25s ease",
        }}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px", minWidth: 0, overflowX: "hidden" }}>
          <Routes>
            <Route path="/"                      element={<BuyerDashboard />} />
            <Route path="/search"                element={<SearchResultPage />} />
            <Route path="/medicines"             element={<Medicines />} />
            <Route path="/profile"               element={<Profile />} />
            <Route path="/prescription"          element={<PrescriptionPage />} />
            <Route path="/pharmacist/dashboard"  element={<SellerDashboard />} />

            {/* Catch-all → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
    
      <Routes>
        {/* Auth pages — no shell */}
        <Route path="/login"   element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Default: redirect root to sign-up */}
        <Route path="/" element={<Navigate to="/sign-up" replace />} />

        {/* All other pages get the Header + Sidebar shell */}
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </>
  );
}