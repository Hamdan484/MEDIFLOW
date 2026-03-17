import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_OCR_RESULTS = [
  { id: 1, name: "Paracetamol",  generic: "Acetaminophen 500mg" },
  { id: 2, name: "Amoxicillin",  generic: "Amoxicillin 250mg" },
  { id: 3, name: "Metformin",    generic: "Metformin HCl 500mg" },
];

const STEPS = ["Upload", "Review", "Search"];

const s = {
  page: { minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", paddingBottom: "80px" },
  header: { background: "white", padding: "16px 20px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: "12px" },
  backBtn: { width: "36px", height: "36px", borderRadius: "10px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  headerTitle: { fontSize: "17px", fontWeight: 700, color: "#111" },
  headerSub: { fontSize: "13px", color: "#888" },
  stepsRow: { display: "flex", alignItems: "center", padding: "20px" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
  stepLine: (done) => ({ flex: 1, height: "2px", background: done ? "#2a9b6f" : "#e0e0e0", marginBottom: "18px" }),
  stepCircle: (state) => ({
    width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700,
    background: state === "done" ? "#2a9b6f" : state === "active" ? "#0c503b" : "#e0e0e0",
    color: state === "idle" ? "#aaa" : "white",
  }),
  stepLabel: (active) => ({ fontSize: "11px", color: active ? "#0c503b" : "#888", marginTop: "5px", fontWeight: active ? 600 : 500 }),
  section: { padding: "0 20px" },
  uploadBox: { border: "2px dashed #b0d8c4", borderRadius: "20px", background: "white", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: "16px" },
  uploadIcon: { width: "64px", height: "64px", borderRadius: "16px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" },
  uploadTitle: { fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" },
  uploadSub: { fontSize: "13px", color: "#888", textAlign: "center", lineHeight: 1.5 },
  orRow: { display: "flex", alignItems: "center", gap: "10px", color: "#bbb", fontSize: "13px", margin: "16px 0" },
  orLine: { flex: 1, height: "1px", background: "#eee" },
  btnCamera: { width: "100%", padding: "14px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" },
  btnGallery: { width: "100%", padding: "13px", background: "white", color: "#2a9b6f", border: "1.5px solid #2a9b6f", borderRadius: "14px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  previewBox: { background: "white", borderRadius: "16px", border: "1px solid #eee", overflow: "hidden", marginBottom: "16px" },
  previewImg: { width: "100%", height: "160px", objectFit: "cover" },
  previewPlaceholder: { width: "100%", height: "160px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center" },
  ocrHeader: { padding: "14px 16px 10px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  ocrTitle: { fontSize: "14px", fontWeight: 700, color: "#111" },
  ocrBadge: { fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: "#e1f5ee", color: "#0c503b", fontWeight: 600 },
  drugExtract: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderBottom: "1px solid #f5f5f5" },
  extractCheck: { width: "22px", height: "22px", borderRadius: "6px", background: "#e1f5ee", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  extractName: { fontSize: "14px", fontWeight: 600, color: "#111" },
  extractGeneric: { fontSize: "12px", color: "#888" },
  extractRemove: { padding: "4px 10px", borderRadius: "8px", fontSize: "12px", color: "#e53935", background: "#fdecea", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 },
  infoBox: { background: "#fff8e1", borderRadius: "12px", padding: "12px 14px", marginBottom: "16px", display: "flex", gap: "10px", fontSize: "13px", color: "#7a5c00", lineHeight: 1.5 },
  btnSearch: { width: "100%", padding: "14px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  btnPrimary: { width: "100%", padding: "14px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "14px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" },
};

export default function PrescriptionPage() {
  const [step, setStep] = useState(1);          // 1=upload, 2=review, 3=done
  const [imageUrl, setImageUrl] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();

  function handleFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setLoading(true);
    // Simulate OCR call — replace with real Google Vision API call
    setTimeout(() => {
      setDrugs(MOCK_OCR_RESULTS);
      setLoading(false);
      setStep(2);
    }, 1500);
  }

  function removeDrug(id) {
    setDrugs(drugs.filter((d) => d.id !== id));
  }

  function handleSearch() {
    const query = drugs.map((d) => d.name).join(",");
    navigate(`/search?q=${query}`);
  }

  function stepState(n) {
    if (n < step) return "done";
    if (n === step) return "active";
    return "idle";
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <div style={s.headerTitle}>Upload Prescription</div>
          <div style={s.headerSub}>We'll find your drugs automatically</div>
        </div>
      </div>

      {/* Steps indicator */}
      <div style={s.stepsRow}>
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = stepState(n);
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={s.stepItem}>
                <div style={s.stepCircle(state)}>
                  {state === "done" ? "✓" : n}
                </div>
                <div style={s.stepLabel(state === "active")}>{label}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={s.stepLine(state === "done")} />
              )}
            </div>
          );
        })}
      </div>

      <div style={s.section}>

        {/* ── Step 1: Upload ── */}
        {step === 1 && (
          <>
            <div style={s.uploadBox} onClick={() => fileRef.current.click()}>
              <div style={s.uploadIcon}>
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div style={s.uploadTitle}>Drop your prescription here</div>
              <div style={s.uploadSub}>Tap to browse a file from your phone or computer</div>
            </div>

            <div style={s.orRow}>
              <div style={s.orLine} /> or <div style={s.orLine} />
            </div>

            {/* Camera capture */}
            <button style={s.btnCamera} onClick={() => cameraRef.current.click()}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Take a photo
            </button>

            {/* Gallery pick */}
            <button style={s.btnGallery} onClick={() => fileRef.current.click()}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose from gallery
            </button>

            {/* Hidden inputs */}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])} />
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])} />
          </>
        )}

        {/* ── Step 2: Review OCR results ── */}
        {step === 2 && (
          <>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#2a9b6f", fontSize: "15px", fontWeight: 500 }}>
                Reading prescription...
              </div>
            ) : (
              <>
                <div style={s.previewBox}>
                  {imageUrl
                    ? <img src={imageUrl} alt="Prescription" style={s.previewImg} />
                    : <div style={s.previewPlaceholder}><span style={{ fontSize: "13px", color: "#3a8a65" }}>Prescription preview</span></div>
                  }
                  <div style={s.ocrHeader}>
                    <div style={s.ocrTitle}>Drugs found in prescription</div>
                    <span style={s.ocrBadge}>{drugs.length} detected</span>
                  </div>
                  {drugs.map((drug, i) => (
                    <div key={drug.id} style={{ ...s.drugExtract, borderBottom: i === drugs.length - 1 ? "none" : "1px solid #f5f5f5" }}>
                      <div style={s.extractCheck}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={s.extractName}>{drug.name}</div>
                        <div style={s.extractGeneric}>{drug.generic}</div>
                      </div>
                      <button style={s.extractRemove} onClick={() => remove药(drug.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div style={s.infoBox}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7a5c00" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Please confirm the drug names above are correct before searching. OCR may occasionally misread handwriting.
                </div>

                <button
                  style={{ ...s.btnSearch, opacity: drugs.length === 0 ? 0.5 : 1 }}
                  disabled={drugs.length === 0}
                  onClick={handleSearch}
                >
                  Search for {drugs.length > 0 ? `these ${drugs.length} drugs` : "drugs"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}