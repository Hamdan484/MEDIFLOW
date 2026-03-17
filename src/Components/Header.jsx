import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const s = {
  header: { background: "white", borderBottom: "1px solid #eee", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  left: { display: "flex", alignItems: "center", gap: "14px" },
  menuBtn: { width: "36px", height: "36px", borderRadius: "10px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  brand: { fontSize: "20px", fontWeight: 700, color: "#0c503b", letterSpacing: "-0.3px" },
  brandAccent: { color: "#2a9b6f" },
  right: { display: "flex", alignItems: "center", gap: "10px" },
  notifBtn: { width: "36px", height: "36px", borderRadius: "10px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" },
  notifDot: { position: "absolute", top: "7px", right: "7px", width: "8px", height: "8px", borderRadius: "50%", background: "#e53935", border: "2px solid white" },
  avatarBtn: { width: "36px", height: "36px", borderRadius: "50%", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#0c503b", border: "none", cursor: "pointer" },
};

export default function Header({ onMenuClick, pharmacyName = "HP", hasNotif = true }) {
  const navigate = useNavigate();
  const { logoutPharmacist } = useAuthStore();

  const initials = pharmacyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header style={s.header}>
      <div style={s.left}>
        {onMenuClick && (
          <button style={s.menuBtn} onClick={onMenuClick}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div style={s.brand}>
          Medi<span style={s.brandAccent}>flow</span>
        </div>
      </div>

      <div style={s.right}>
        <button style={s.notifBtn} onClick={() => navigate("/notifications")}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {hasNotif && <div style={s.notifDot} />}
        </button>

        <button style={s.avatarBtn} onClick={() => navigate("/pharmacist/profile")}>
          {initials}
        </button>
      </div>
    </header>
  );
}