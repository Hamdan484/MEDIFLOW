import { useState } from "react";
import { useNavigate } from "react-router-dom";

const s = {
  page: { minHeight: "100vh", background: "#f0f4f0", display: "flex", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  left: { width: "420px", background: "#0c503b", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 },
  leftLogo: { fontSize: "26px", fontWeight: 700, color: "white", letterSpacing: "-0.5px" },
  leftAccent: { color: "#6fcfa3" },
  leftHero: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" },
  leftTitle: { fontSize: "32px", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "14px" },
  leftSub: { fontSize: "15px", color: "#9fe1cb", lineHeight: 1.6 },
  leftStats: { display: "flex", gap: "20px", marginTop: "40px" },
  statVal: { fontSize: "24px", fontWeight: 700, color: "white" },
  statLbl: { fontSize: "12px", color: "#9fe1cb", marginTop: "2px" },
  leftFooter: { fontSize: "13px", color: "#6b9e8a" },
  right: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", overflowY: "auto" },
  formBox: { width: "100%", maxWidth: "460px" },
  formTitle: { fontSize: "26px", fontWeight: 700, color: "#111", marginBottom: "4px" },
  formSub: { fontSize: "14px", color: "#888", marginBottom: "28px" },
  tabs: { display: "flex", background: "#f0f0f0", borderRadius: "12px", padding: "4px", marginBottom: "24px" },
  tab: (active) => ({ flex: 1, padding: "9px", textAlign: "center", borderRadius: "9px", fontSize: "14px", fontWeight: active ? 600 : 500, cursor: "pointer", border: "none", fontFamily: "inherit", color: active ? "#0c503b" : "#888", background: active ? "white" : "transparent", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }),
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  field: { marginBottom: "14px" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, color: "#444", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "12px", fontSize: "14px", color: "#111", background: "#fafafa", outline: "none", fontFamily: "inherit" },
  inputFocus: { borderColor: "#2a9b6f", background: "white" },
  hint: { fontSize: "11px", color: "#aaa", marginTop: "4px" },
  passwordWrap: { position: "relative" },
  passwordInput: { width: "100%", padding: "12px 44px 12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "12px", fontSize: "14px", color: "#111", background: "#fafafa", outline: "none", fontFamily: "inherit" },
  eyeBtn: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" },
  divider: { display: "flex", alignItems: "center", gap: "10px", color: "#bbb", fontSize: "13px", margin: "6px 0 14px" },
  dividerLine: { flex: 1, height: "1px", background: "#eee" },
  btnPrimary: { width: "100%", padding: "14px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: "4px" },
  footerLink: { textAlign: "center", marginTop: "18px", fontSize: "14px", color: "#888" },
  link: { color: "#2a9b6f", fontWeight: 600, textDecoration: "none", cursor: "pointer" },
  terms: { fontSize: "12px", color: "#aaa", textAlign: "center", marginTop: "14px", lineHeight: 1.5 },
  // Pharmacist extra fields
  pharmacistNote: { background: "#e1f5ee", borderRadius: "12px", padding: "12px 14px", fontSize: "13px", color: "#0c503b", marginBottom: "14px", lineHeight: 1.5 },
};

const STATS = [
  { val: "340+", lbl: "Drugs listed" },
  { val: "120+", lbl: "Pharmacies" },
  { val: "5k+",  lbl: "Patients served" },
];

export default function SignUp() {
  const [role, setRole] = useState("patient"); // "patient" | "pharmacist"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    password: "", pharmacyName: "", licenseNumber: "", location: "",
  });
  const navigate = useNavigate();

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call your register API here
    // For now just go to login
    navigate("/login");
  }

  return (
    <div style={s.page}>

      {/* ── Left panel ── */}
      <div style={s.left}>
        <div style={s.leftLogo}>Medi<span style={s.leftAccent}>flow</span></div>

        <div style={s.leftHero}>
          <div style={s.leftTitle}>Your pharmacy,<br />connected.</div>
          <div style={s.leftSub}>
            Join thousands of pharmacies and patients already using Mediflow to find drugs faster and manage inventory smarter.
          </div>
          <div style={s.leftStats}>
            {STATS.map((st) => (
              <div key={st.lbl}>
                <div style={s.statVal}>{st.val}</div>
                <div style={s.statLbl}>{st.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.leftFooter}>© 2025 Mediflow · Ghana</div>
      </div>

      {/* ── Right panel ── */}
      <div style={s.right}>
        <div style={s.formBox}>
          <div style={s.formTitle}>Create an account</div>
          <div style={s.formSub}>Get started with Mediflow today</div>

          {/* Role tabs */}
          <div style={s.tabs}>
            {["patient", "pharmacist"].map((r) => (
              <button key={r} style={s.tab(role === r)} onClick={() => setRole(r)}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name row */}
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>First name</label>
                <input style={s.input} type="text" placeholder="Kofi"
                  value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Last name</label>
                <input style={s.input} type="text" placeholder="Asante"
                  value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
              </div>
            </div>

            {/* Phone */}
            <div style={s.field}>
              <label style={s.label}>Phone number</label>
              <input style={s.input} type="tel" placeholder="+233 20 000 0000"
                value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <div style={s.hint}>We'll send a verification code to this number</div>
            </div>

            {/* Email */}
            <div style={s.field}>
              <label style={s.label}>
                Email address{" "}
                <span style={{ color: "#bbb", fontWeight: 400 }}>(optional)</span>
              </label>
              <input style={s.input} type="email" placeholder="kofi@email.com"
                value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>

            {/* Pharmacist-only fields */}
            {role === "pharmacist" && (
              <>
                <div style={s.pharmacistNote}>
                  Your account will be reviewed and verified against the Ghana Pharmacy Council register before going live.
                </div>
                <div style={s.field}>
                  <label style={s.label}>Pharmacy name</label>
                  <input style={s.input} type="text" placeholder="e.g. HealthPlus Pharmacy"
                    value={form.pharmacyName} onChange={(e) => update("pharmacyName", e.target.value)} />
                </div>
                <div style={s.row}>
                  <div style={s.field}>
                    <label style={s.label}>License number</label>
                    <input style={s.input} type="text" placeholder="GPC/2024/XXXX"
                      value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Location</label>
                    <input style={s.input} type="text" placeholder="e.g. Bantama, Kumasi"
                      value={form.location} onChange={(e) => update("location", e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <div style={s.passwordWrap}>
                <input
                  style={s.passwordInput}
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" style={s.btnPrimary}>
              {role === "pharmacist" ? "Submit for verification" : "Create account"}
            </button>
          </form>

          <div style={s.footerLink}>
            Already have an account?{" "}
            <span style={s.link} onClick={() => navigate("/login")}>Log in</span>
          </div>

          <div style={s.terms}>
            By signing up you agree to our{" "}
            <span style={s.link}>Terms of Service</span> and{" "}
            <span style={s.link}>Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}