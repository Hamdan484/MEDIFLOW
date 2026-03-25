import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

/* ── Component ── */

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // TODO: call your auth API here
    navigate("/");
  }

  function handleOtp() {
    // TODO: send OTP then navigate to OTP screen
    navigate("/otp");
  }

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
        <div className="card-sub">Log in to your account</div>

        <form onSubmit={handleLogin}>
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

          <button type="button" className="btn-primary" onClick={() => navigate("/profile")}>
            Log in
          </button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          or
          <div className="divider-line" />
        </div>

        <button className="btn-otp" onClick={handleOtp}>
          Log in with OTP (SMS)
        </button>

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
