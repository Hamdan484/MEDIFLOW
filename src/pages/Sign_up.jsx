import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";

/* ── Constants ── */

const STATS = [
  { val: "340+", lbl: "Drugs listed"    },
  { val: "120+", lbl: "Pharmacies"      },
  { val: "5k+",  lbl: "Patients served" },
];

const EMPTY_FORM = {
  firstName:     "",
  lastName:      "",
  phone:         "",
  email:         "",
  password:      "",
  pharmacyName:  "",
  licenseNumber: "",
  location:      "",
};

/* ── Icons ── */

function EyeOffIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97
           9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242
           4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59
           3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025
           10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
      stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542
           7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

/* ── Component ── */

export default function SignUp() {
  const [role,         setRole]         = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const navigate = useNavigate();

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call your register API here, then navigate on success
    navigate("/login");
  }

  return (
    <div className="signup-page">

      {/* ── Left panel ── */}
      <div className="left-panel">
        <div className="left-logo">
          Medi<span className="left-logo-accent">flow</span>
        </div>

        <div className="left-hero">
          <div className="left-title">Your pharmacy,<br />connected.</div>
          <div className="left-sub">
            Join thousands of pharmacies and patients already using Mediflow to
            find drugs faster and manage inventory smarter.
          </div>
          <div className="left-stats">
            {STATS.map((st) => (
              <div key={st.lbl}>
                <div className="stat-val">{st.val}</div>
                <div className="stat-lbl">{st.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="left-footer">© 2025 Mediflow · Ghana</div>
      </div>

      {/* ── Right panel ── */}
      <div className="right-panel">
        <div className="form-box">
          <div className="form-title">Create an account</div>
          <div className="form-sub">Get started with Mediflow today</div>

          {/* Role tabs */}
          <div className="role-tabs">
            {["patient", "pharmacist"].map((r) => (
              <button
                key={r}
                className={`role-tab ${role === r ? "active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name row */}
            <div className="field-row">
              <div className="field">
                <label>First name</label>
                <input type="text" placeholder="Kofi"
                  value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
              </div>
              <div className="field">
                <label>Last name</label>
                <input type="text" placeholder="Asante"
                  value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
              </div>
            </div>

            {/* Phone */}
            <div className="field">
              <label>Phone number</label>
              <input type="tel" placeholder="+233 20 000 0000"
                value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <div className="field-hint">We'll send a verification code to this number</div>
            </div>

            {/* Email */}
            <div className="field">
              <label>
                Email address <span className="optional">(optional)</span>
              </label>
              <input type="email" placeholder="kofi@email.com"
                value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>

            {/* Pharmacist-only fields */}
            {role === "pharmacist" && (
              <>
                <div className="pharmacist-note">
                  Your account will be reviewed and verified against the Ghana
                  Pharmacy Council register before going live.
                </div>

                <div className="field">
                  <label>Pharmacy name</label>
                  <input type="text" placeholder="e.g. HealthPlus Pharmacy"
                    value={form.pharmacyName} onChange={(e) => update("pharmacyName", e.target.value)} />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>License number</label>
                    <input type="text" placeholder="GPC/2024/XXXX"
                      value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Location</label>
                    <input type="text" placeholder="e.g. Bantama, Kumasi"
                      value={form.location} onChange={(e) => update("location", e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                <button type="button" className="eye-btn"
                  onClick={() => setShowPassword((v) => !v)}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="button" className="btn-primary" onClick={() => navigate("/profile")} >
              {role === "pharmacist" ? "Submit for verification" : "Create account"}
            </button>

          </form>

          <div className="footer-link">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/Login")}>Log in</span>
          </div>

          <div className="terms">
            By signing up you agree to our{" "}
            <span className="link">Terms of Service</span> and{" "}
            <span className="link">Privacy Policy</span>
          </div>
        </div>
      </div>

    </div>
  );
}