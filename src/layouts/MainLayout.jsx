import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useAuthStore } from "../store/authStore";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { role } = useAuthStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter','DM Sans',sans-serif", display: "flex" }}>
      
      {/* Mobile Menu Trigger (Only visible when sidebar is closed on mobile) */}
      {isMobile && !sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed", top: "16px", left: "16px", zIndex: 100,
            width: "42px", height: "42px", borderRadius: "12px",
            background: "white", border: "1px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", cursor: "pointer"
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Mobile backdrop */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 101 }}
        />
      )}

      {/* Sidebar Container */}
      <div style={{
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        height: "100vh",
        zIndex: 102,
        flexShrink: 0,
        width: isMobile && !sidebarOpen ? "0" : "auto",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
      }}>
        <Sidebar role={role || "buyer"} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
      </div>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        padding: isMobile ? "72px 20px 40px 20px" : "32px 40px", 
        minWidth: 0, 
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
