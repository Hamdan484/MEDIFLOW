import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useAuthStore } from "../store/authStore";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { role } = useAuthStore(); // automatically get active role

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* Header (hidden on large screens via Header.css) */}
      <Header onMenuClick={() => setSidebarOpen((o) => !o)} />

      <div style={{ display: "flex", minHeight: isMobile ? "calc(100vh - 60px)" : "100vh" }}>
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
          top: isMobile ? "60px" : "0",
          height: isMobile ? "100vh" : "100vh",
          zIndex: 41,
          flexShrink: 0,
          transform: isMobile ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : "none",
          transition: "transform 0.25s ease",
        }}>
          <Sidebar role={role || "buyer"} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px", minWidth: 0, overflowX: "hidden" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
