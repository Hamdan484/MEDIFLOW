import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getCartCount } from "../pages/Cart";
import "../Styles/Sidebar.css";

/* ── Icons ── */

function CloseIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
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

function SalesIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function LowStockIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
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
  pharmacyName = "HealthPlus Pharmacy",
  role = "buyer",
}) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const isMobile = window.innerWidth < 768;
  const cartCount = getCartCount();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Define route arrays for each role
  const NAV_BUYER = [
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/medicines", label: "Medicines", icon: <MedicinesIcon /> },
    { to: "/search", label: "Search", icon: <SearchIcon /> },
    { to: "/cart", label: "Cart", icon: <CartIcon />, badge: cartCount > 0 ? cartCount : null },
    { to: "/prescription", label: "Prescription", icon: <PrescriptionIcon /> },
  ];

  const NAV_SELLER = [
    { to: "/seller/dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { to: "/seller/inventory", label: "Inventory", badge: "24", icon: <InventoryIcon /> },
    { to: "/seller/customers", label: "Customers", icon: <CustomersIcon /> },
    { to: "/seller/sales", label: "Sales", icon: <SalesIcon /> },
  ];

  const NAV_SELLER_ALERTS = [
    { to: "/seller/low-stock", label: "Low stock", badgeWarn: "6", icon: <LowStockIcon /> },
    { to: "/seller/notifications", label: "Notifications", icon: <NotificationsIcon /> },
  ];

  const NAV_ADMIN = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <BuildingIcon /> },
    { to: "/admin/pharmacies", label: "Pharmacies", icon: <BuildingIcon /> },
    { to: "/admin/users", label: "Users", icon: <ProfileIcon /> },
  ];

  const NAV_ACCOUNT = [
    { to: "/profile", label: "Profile", icon: <ProfileIcon /> },
  ];

  // Dynamically select sections based on role
  let sections = [];
  if (role === "buyer") {
    sections = [
      { label: "General", items: NAV_BUYER },
      { label: "Account", items: NAV_ACCOUNT },
    ];
  } else if (role === "seller") {
    sections = [
      { label: "Pharmacy Tools", items: NAV_SELLER },
      { label: "Alerts", items: NAV_SELLER_ALERTS },
      { label: "Account", items: NAV_ACCOUNT },
    ];
  } else if (role === "admin") {
    sections = [
      { label: "Administration", items: NAV_ADMIN },
    ];
  }

  return (
    <aside className="sidebar">
      {/* Brand - Used on Large Screens where Header is hidden */}
      <div className="sidebar-brand">
        Medi<span className="sidebar-brand-accent">flow</span>
      </div>

      {/* Close button — mobile only */}
      {isMobile && (
        <div className="sidebar-top-row">
          <span className="sidebar-menu-label">Menu</span>
          <button className="close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      )}

      {sections.map((section) => (
        <NavSection
          key={section.label}
          label={section.label}
          items={section.items}
          onClose={onClose}
          isMobile={isMobile}
        />
      ))}

      {/* Footer */}
      <div className="sidebar-footer">
        {role === "seller" && (
          <div className="pharmacy-mini">
            <div className="pharmacy-avatar">
              <BuildingIcon />
            </div>
            <div>
              <div className="pharmacy-name">{pharmacyName}</div>
              <div className="pharmacy-status">Open now</div>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="pharmacy-mini">
            <div className="pharmacy-avatar">
              <BuildingIcon />
            </div>
            <div>
              <div className="pharmacy-name">Admin Portal</div>
              <div className="pharmacy-status">Super User</div>
            </div>
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
