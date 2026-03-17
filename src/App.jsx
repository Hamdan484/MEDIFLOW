import { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

import Login from "./pages/Login";
import Sign_up from "./pages/Sign_up";
import BuyerDashboard from "./pages/Buyer_Dashboard";
import SearchResult_page from "./pages/searchResult_page";
import Profile from "./pages/profile";
import Medicines from "./pages/Medicines";
import SellerDashboard from "./pages/Seller_Dashboard";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

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

        {/* ── SWAP THIS TO TEST DIFFERENT PAGES ── */}
        <main style={{ flex: 1, padding: "28px", minWidth: 0, overflowX: "hidden" }}>
          <SellerDashboard />
          
<BuyerDashboard />    
<SearchResult_page /> 
<Profile />           
<BuyerDashboard />         
           
<Medicines />       
<Login />             
<Sign_up />           
        </main>

      </div>
    </div>
  );
}