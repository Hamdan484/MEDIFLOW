import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Prescription.css";


const MOCK_OCR_RESULTS = [
  { id: 1, name: "Paracetamol", generic: "Acetaminophen 500mg" },
  { id: 2, name: "Amoxicillin", generic: "Amoxicillin 250mg" },
  { id: 3, name: "Metformin", generic: "Metformin HCl 500mg" },
];

const STEPS = ["Upload", "Review", "Search"];

export default function PrescriptionPage() {
  const [step, setStep] = useState(1); // 1=upload, 2=review, 3=done
  const [imageUrl, setImageUrl] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const cameraRef = useRef();
  const navigate = useNavigate();

  /* ── Handlers ── */

  function handleFile(file) {
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
    setLoading(true);
    // TODO: replace with real Google Vision API call
    setTimeout(() => {
      setDrugs(MOCK_OCR_RESULTS);
      setLoading(false);
      setStep(2);
    }, 1500);
  }

  function removeDrug(id) {
    setDrugs((prev) => prev.filter((d) => d.id !== id));
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

  /* ── Render helpers ── */

  function renderSteps() {
    return (
      <div className="steps-row">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = stepState(n);
          return (
            <div key={label} className="step-wrapper">
              <div className="step-item">
                <div className={`step-circle ${state}`}>
                  {state === "done" ? "✓" : n}
                </div>
                <div
                  className={`step-label ${state === "active" ? "active" : ""}`}
                >
                  {label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`step-line ${state === "done" ? "done" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function renderUploadStep() {
    return (
      <>
        {/* Drop zone */}
        <div className="upload-box" onClick={() => fileRef.current.click()}>
          <div className="upload-icon">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2a9b6f"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0
                   012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0
                   01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="upload-title">Drop your prescription here</div>
          <div className="upload-sub">
            Tap to browse a file from your phone or computer
          </div>
        </div>

        <div className="or-row">
          <div className="or-line" /> or <div className="or-line" />
        </div>

        {/* Camera capture */}
        <button
          className="btn-camera"
          onClick={() => cameraRef.current.click()}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0
                 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0
                 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <circle cx="12" cy="13" r="3" />
          </svg>
          Take a photo
        </button>

        {/* Gallery pick */}
        <button className="btn-gallery" onClick={() => fileRef.current.click()}>
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2a9b6f"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                 a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2
                 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Choose from gallery
        </button>

        {/* Hidden file inputs */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </>
    );
  }

  function renderReviewStep() {
    if (loading) {
      return <div className="loading-text">Reading prescription…</div>;
    }

    return (
      <>
        <div className="preview-box">
          {/* Prescription image */}
          {imageUrl ? (
            <img src={imageUrl} alt="Prescription" className="preview-img" />
          ) : (
            <div className="preview-placeholder">Prescription preview</div>
          )}

          {/* OCR results header */}
          <div className="ocr-header">
            <div className="ocr-title">Drugs found in prescription</div>
            <span className="ocr-badge">{drugs.length} detected</span>
          </div>

          {/* Drug list */}
          {drugs.map((drug) => (
            <div key={drug.id} className="drug-extract">
              <div className="extract-check">
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2a9b6f"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="extract-info">
                <div className="extract-name">{drug.name}</div>
                <div className="extract-generic">{drug.generic}</div>
              </div>

              <button
                className="extract-remove"
                onClick={() => removeDrug(drug.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="info-box">
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#7a5c00"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Please confirm the drug names above are correct before searching. OCR
          may occasionally misread handwriting.
        </div>

        <button
          className="btn-search"
          disabled={drugs.length === 0}
          onClick={handleSearch}
        >
          Search for{" "}
          {drugs.length > 0 ? `these ${drugs.length} drugs` : "drugs"}
        </button>
      </>
    );
  }

  /* ── Main render ── */

  return (
    <div className="prescription-page">
      {/* Header */}
      <div className="prescription-header">
        <button
          className="back-btn"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#555"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <div className="header-title">Upload Prescription</div>
          <div className="header-sub">We'll find your drugs automatically</div>
        </div>
      </div>

      {renderSteps()}

      <div className="section">
        {step === 1 && renderUploadStep()}
        {step === 2 && renderReviewStep()}
      </div>
    </div>
  );
}
