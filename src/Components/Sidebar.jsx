import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getCartCount } from "../pages/Cart";
import "../Styles/Sidebar.css";

/* ── Icons ── */

function HeartIcon() {
  return (
    <svg
      width="24"
      height="24"
      fill="#2a9b6f"
      viewBox="0 0 24 24"
      stroke="#2a9b6f"
      strokeWidth={0.5}
    >
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76
               0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0
               2.3 1.5 4.05 3 5.5l7 7Z"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function MedicinesIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function PrescriptionIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function NotificationsIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ── Sub-components ── */

function NavSection({ label, items, onClose, isMobile }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="nav-section">
      <span className="section-label">{label}</span>
      {items.map(({ to, label: lbl, icon, badge, badgeWarn }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          onClick={isMobile ? onClose : undefined}
          end={to === "/"}
        >
          {icon}
          {lbl}
          {badge && <span className="badge">{badge}</span>}
          {badgeWarn && <span className="badge-warn">{badgeWarn}</span>}
        </NavLink>
      ))}
    </div>
  );
}

/* ── Main component ── */

export default function Sidebar({
  onClose,
  isMobile,
  pharmacyName = "HealthPlus Pharmacy",
  role = "buyer",
}) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const cartCount = getCartCount();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Navigation Links
  const NAV_BUYER = [
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/medicines", label: "Medicines", icon: <MedicinesIcon /> },
    { to: "/cart", label: "My Cart", icon: <CartIcon />, badge: cartCount > 0 ? cartCount : null },
    { to: "/prescription", label: "Prescription", icon: <PrescriptionIcon /> },
  ];

  const NAV_SELLER = [
    { to: "/seller/dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { to: "/seller/inventory", label: "Inventory", badge: "24", icon: <InventoryIcon /> },
    { to: "/seller/customers", label: "Customers", icon: <CustomersIcon /> },
    { to: "/seller/notifications", label: "Notifications", icon: <NotificationsIcon />, badgeWarn: "3" },
  ];

  const NAV_ADMIN = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <BuildingIcon /> },
    { to: "/admin/pharmacies", label: "Pharmacies", icon: <BuildingIcon /> },
    { to: "/admin/users", label: "Users", icon: <ProfileIcon /> },
  ];

  const NAV_ACCOUNT = [
    { to: "/profile", label: "Settings", icon: <ProfileIcon /> },
  ];

  let sections = [];
  if (role === "buyer") {
    sections = [
      { label: "General", items: NAV_BUYER },
      { label: "Account", items: NAV_ACCOUNT },
    ];
  } else if (role === "seller") {
    sections = [
      { label: "Pharmacy Tools", items: NAV_SELLER },
      { label: "Account", items: NAV_ACCOUNT },
    ];
  } else if (role === "admin") {
    sections = [
      { label: "Administration", items: NAV_ADMIN },
    ];
  }

  return (
    <aside className="sidebar">
      
      {/* Header with Brand & Close */}
      <div className="sidebar-header">
        <div className="sidebar-brand-group" onClick={() => navigate("/")}>
          <div className="sidebar-logo-icon">
            <HeartIcon />
          </div>
          <div className="sidebar-brand">
            Medi<span className="sidebar-brand-accent">flow</span>
          </div>
        </div>
        
        {/* Force render button if onClose is provided, CSS will hide it on desktop */}
        {onClose && (
          <button 
            className="close-btn-sidebar mobile-only" 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("DEBUG: X Button clicked in Sidebar.jsx");
              onClose();
            }} 
            aria-label="Close sidebar"
            style={{ pointerEvents: 'auto' }}
          >
            <div style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CloseIcon />
            </div>
          </button>
        )}
      </div>

      {/* Embedded Search */}
      <div className="sidebar-search">
        <div className="search-icon-fixed">
          <SearchIcon />
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          onKeyDown={(e) => e.key === 'Enter' && navigate('/search')}
        />
      </div>

      {/* Nav Content */}
      <div className="sidebar-nav-content" style={{flex: 1}}>
        {sections.map((section) => (
          <NavSection
            key={section.label}
            label={section.label}
            items={section.items}
            onClose={onClose}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {role === "seller" && (
          <div className="pharmacy-mini" style={{background: 'transparent', padding: '0 12px 12px 12px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9'}}>
            <div className="pharmacy-name" style={{fontSize: '12px', color: '#64748b'}}>{pharmacyName}</div>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <LogoutIcon />
          Log out
        </button>
      </div>
    </aside>
  );
}
