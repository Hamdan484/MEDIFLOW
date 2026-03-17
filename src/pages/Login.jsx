import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  logoArea: { textAlign: "center", marginBottom: "32px" },
  logoIcon: {
    width: "56px", height: "56px", background: "#2a9b6f",
    borderRadius: "16px", display: "flex", alignItems: "center",
    justifyContent: "center", margin: "0 auto 12px",
  },
  logoName: { fontSize: "26px", fontWeight: 700, color: "#0c503b", letterSpacing: "-0.5px" },
  logoTag: { fontSize: "13px", color: "#888", marginTop: "2px" },
  card: {
    background: "white", borderRadius: "20px", padding: "28px 24px",
    width: "100%", maxWidth: "400px", border: "1px solid #e8ede8",
  },
  cardTitle: { fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "4px" },
  cardSub: { fontSize: "14px", color: "#888", marginBottom: "24px" },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, color: "#444", marginBottom: "6px" },
  input: {
    width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0",
    borderRadius: "12px", fontSize: "15px", color: "#111",
    background: "#fafafa", outline: "none", fontFamily: "inherit",
  },
  btnPrimary: {
    width: "100%", padding: "14px", background: "#2a9b6f", color: "white",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600,
    cursor: "pointer", marginTop: "8px", fontFamily: "inherit",
  },
  divider: {
    display: "flex", alignItems: "center", gap: "10px",
    margin: "20px 0", color: "#bbb", fontSize: "13px",
  },
  dividerLine: { flex: 1, height: "1px", background: "#eee" },
  btnOtp: {
    width: "100%", padding: "13px", background: "white", color: "#2a9b6f",
    border: "1.5px solid #2a9b6f", borderRadius: "12px", fontSize: "15px",
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  footerLink: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#888" },
  link: { color: "#2a9b6f", fontWeight: 600, textDecoration: "none", cursor: "pointer" },
};

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
    <div style={styles.page}>
      {/* Logo */}
      <div style={styles.logoArea}>
        <div style={styles.logoIcon}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"
            stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
        <div style={styles.logoName}>Mediflow</div>
        <div style={styles.logoTag}>Find drugs near you</div>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>Welcome back</div>
        <div style={styles.cardSub}>Log in to your account</div>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Phone number</label>
            <input style={styles.input} type="tel" placeholder="+233 20 000 0000"
              value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={styles.btnPrimary}>Log in</button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          or
          <div style={styles.dividerLine} />
        </div>

        <button style={styles.btnOtp} onClick={handleOtp}>
          Log in with OTP (SMS)
        </button>

        <div style={styles.footerLink}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/sign-up")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}