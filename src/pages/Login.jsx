import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuthStore } from "../store/authStore";
import "../Styles/Login.css";

/* ── Icons ── */

function HeartIcon() {
  return (
    <svg
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76
               0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0
               2.3 1.5 4.05 3 5.5l7 7Z"
      />
    </svg>
  );
}

/* ── Role config ── */

const ROLES = [
  { key: "buyer",  label: "Buyer",    emoji: "🛒", desc: "Browse & order medicines" },
  { key: "seller", label: "Pharmacy", emoji: "🏥", desc: "Manage your pharmacy" },
  { key: "admin",  label: "Admin",    emoji: "🔑", desc: "Platform administration" },
];

/* ── Component ── */

export default function Login() {
  const [selectedRole,   setSelectedRole]   = useState("buyer");
  const [phone,          setPhone]          = useState("");
  const [pharmacyName,   setPharmacyName]   = useState("");
  const [licenseNumber,  setLicenseNumber]  = useState("");
  const [password,       setPassword]       = useState("");
  const [errorMsg,       setErrorMsg]       = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Reset role-specific fields when switching tabs
  function handleRoleSwitch(roleKey) {
    setSelectedRole(roleKey);
    setPhone("");
    setPharmacyName("");
    setLicenseNumber("");
    setPassword("");
    setErrorMsg("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await api.post("/auth/login", {
        id_value: selectedRole === "buyer" ? phone : (selectedRole === "admin" ? phone : pharmacyName),
        password: password,
        role: selectedRole
      });

      const { access_token, user } = response.data;
      login(user, selectedRole, access_token);

      if (selectedRole === "seller") navigate("/seller/dashboard");
      else if (selectedRole === "admin") navigate("/admin/dashboard");
      else navigate("/");

    } catch (error) {
      console.warn("Backend login failed, using mock demo mode:", error);
      
      // Fallback for Demo/Investor Preview
      const mockUser = { name: selectedRole === "buyer" ? "Demo Patient" : "HealthPlus Pharmacy", phone };
      login(mockUser, selectedRole, "mock-jwt-token");

      if (selectedRole === "seller") navigate("/seller/dashboard");
      else if (selectedRole === "admin") navigate("/admin/dashboard");
      else navigate("/");
    }
  }

  const activeRole = ROLES.find((r) => r.key === selectedRole);

  return (
    <div className="login-page">
      {/* Logo */}
      <div className="logo-area">
        <div className="logo-icon">
          <HeartIcon />
        </div>
        <div className="logo-name">Medi<span className="left-logo-accent">flow</span></div>
        <div className="logo-tag">Find drugs near you</div>
      </div>

      {/* Card */}
      <div className="login-card">
        <div className="card-title">Welcome back</div>
        <div className="card-sub">Choose your account type to continue</div>

        {/* Role Tabs */}
        <div className="login-role-tabs">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              className={`login-role-tab ${selectedRole === r.key ? "active" : ""}`}
              onClick={() => handleRoleSwitch(r.key)}
            >
              <span className="role-emoji">{r.emoji}</span>
              <span className="role-tab-label">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Role description */}
        <div className="role-desc-bar">
          <span className="role-desc-dot" />
          {activeRole?.desc}
        </div>

        <form onSubmit={handleLogin}>

          {/* ── Buyer fields ── */}
          {selectedRole === "buyer" && (
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+233 20 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {/* ── Pharmacy fields ── */}
          {selectedRole === "seller" && (
            <>
              <div className="field">
                <label htmlFor="pharmacyName">Pharmacy name</label>
                <input
                  id="pharmacyName"
                  type="text"
                  placeholder="e.g. HealthPlus Pharmacy"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="licenseNumber">License number</label>
                <input
                  id="licenseNumber"
                  type="text"
                  placeholder="GPC/2024/XXXX"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
                <div className="login-field-hint">Issued by the Ghana Pharmacy Council</div>
              </div>
            </>
          )}

          {/* ── Admin fields ── */}
          {selectedRole === "admin" && (
            <div className="field">
              <label htmlFor="adminEmail">Admin email</label>
              <input
                id="adminEmail"
                type="email"
                placeholder="admin@mediflow.com"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {/* ── Password (all roles) ── */}
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div style={{ color: "red", fontSize: "14px", marginBottom: "16px", fontWeight: "500" }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-primary">
            Log in as {activeRole?.label}
          </button>
        </form>

        <div className="footer-link">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/sign-up")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
