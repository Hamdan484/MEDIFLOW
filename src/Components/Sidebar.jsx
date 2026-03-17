import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const NAV_MAIN = [
  {
    to: "/pharmacist/dashboard", label: "Dashboard",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  },
  {
    to: "/pharmacist/inventory", label: "Inventory", badge: "24",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  },
  {
    to: "/pharmacist/customers", label: "Customers",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    to: "/pharmacist/sales", label: "Sales",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
]

const NAV_ALERTS = [
  {
    to: "/pharmacist/low-stock", label: "Low stock", badgeWarn: "6",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>,
  },
  {
    to: "/pharmacist/notifications", label: "Notifications",
    icon: <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
  },
]

const s = {
  sidebar: {
    width: "230px", background: "white", borderRight: "1px solid #eee",
    padding: "20px 12px", display: "flex", flexDirection: "column",
    height: "100%", fontFamily: "'DM Sans','Segoe UI',sans-serif",
    overflowY: "auto",
  },
  topRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" },
  closeBtn: { width: "32px", height: "32px", borderRadius: "8px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  sectionLabel: { fontSize: "10px", fontWeight: 600, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 10px", marginBottom: "4px", marginTop: "12px", display: "block" },
  navItem: (active) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", fontSize: "14px", fontWeight: active ? 600 : 500, color: active ? "#0c503b" : "#666", cursor: "pointer", background: active ? "#e1f5ee" : "transparent", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit", textDecoration: "none" }),
  badge: { marginLeft: "auto", background: "#2a9b6f", color: "white", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px" },
  badgeWarn: { marginLeft: "auto", background: "#fdecea", color: "#e53935", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "20px" },
  footer: { marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f0f0f0" },
  pharmacyMini: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", background: "#f8f8f8", marginBottom: "8px" },
  pharmacyAvatar: { width: "34px", height: "34px", borderRadius: "10px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pharmacyName: { fontSize: "13px", fontWeight: 600, color: "#111" },
  pharmacyStatus: { fontSize: "11px", color: "#2a9b6f", fontWeight: 500 },
  logoutBtn: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, color: "#e53935", cursor: "pointer", background: "transparent", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit" },
}

export default function Sidebar({ onClose, pharmacyName = "HealthPlus Pharmacy" }) {
  const navigate = useNavigate()
  const { logoutPharmacist } = useAuthStore()
  const isMobile = window.innerWidth < 768

  function handleLogout() {
    logoutPharmacist()
    navigate("/login")
  }

  function NavSection({ label, items }) {
    return (
      <div style={{ marginBottom: "6px" }}>
        <span style={s.sectionLabel}>{label}</span>
        {items.map(({ to, label: lbl, icon, badge, badgeWarn: bw }) => (
          <NavLink key={to} to={to} style={{ textDecoration: "none" }} onClick={isMobile ? onClose : undefined}>
            {({ isActive }) => (
              <div style={s.navItem(isActive)}>
                {icon}{lbl}
                {badge && <span style={s.badge}>{badge}</span>}
                {bw && <span style={s.badgeWarn}>{bw}</span>}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    )
  }

  return (
    <aside style={s.sidebar}>

      {/* Close button — mobile only */}
      {isMobile && (
        <div style={s.topRow}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#888", padding: "0 4px" }}>Menu</span>
          <button style={s.closeBtn} onClick={onClose}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <NavSection label="Main" items={NAV_MAIN} />
      <NavSection label="Alerts" items={NAV_ALERTS} />

      <div style={{ marginBottom: "6px" }}>
        <span style={s.sectionLabel}>Account</span>
        <NavLink to="/pharmacist/profile" style={{ textDecoration: "none" }} onClick={isMobile ? onClose : undefined}>
          {({ isActive }) => (
            <div style={s.navItem(isActive)}>
              <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Profile
            </div>
          )}
        </NavLink>
      </div>

      <div style={s.footer}>
        <div style={s.pharmacyMini}>
          <div style={s.pharmacyAvatar}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/>
            </svg>
          </div>
          <div>
            <div style={s.pharmacyName}>{pharmacyName}</div>
            <div style={s.pharmacyStatus}>Open now</div>
          </div>
        </div>
        <button style={s.logoutBtn} onClick={handleLogout}>
          <svg style={{width:18,height:18,flexShrink:0}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Log out
        </button>
      </div>
    </aside>
  )
}