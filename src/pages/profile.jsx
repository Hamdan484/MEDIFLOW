import { useParams, useNavigate } from "react-router-dom";

const PHARMACY = {
  id: "p2",
  name: "HealthPlus Pharmacy",
  address: "Bantama, Kumasi, Ashanti",
  phone: "+233 24 987 6543",
  hours: "Mon–Fri 8am–8pm, Sat 9am–6pm",
  distance: 1.2,
  license: "GPC/2020/0112",
  verified: true,
  lat: 6.7056,
  lng: -1.6300,
  drugs: [
    { id: 1, name: "Paracetamol",  unit: "500mg tabs · pack of 24",  price: 3.80,  inStock: true },
    { id: 2, name: "Metformin",    unit: "500mg tabs · pack of 30",  price: 12.00, inStock: true },
    { id: 3, name: "Artemether",   unit: "20/120mg tabs · pack of 6", price: 22.50, inStock: true },
    { id: 4, name: "Omeprazole",   unit: "20mg caps · pack of 14",   price: 8.50,  inStock: false },
  ],
};

const s = {
  page: { minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", paddingBottom: "80px" },
  hero: { background: "white", padding: "16px 20px 20px", borderBottom: "1px solid #eee" },
  heroTop: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  backBtn: { width: "36px", height: "36px", borderRadius: "10px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  heroIcon: { width: "52px", height: "52px", borderRadius: "14px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pharmacyName: { fontSize: "18px", fontWeight: 700, color: "#111" },
  pharmacyAddress: { fontSize: "13px", color: "#888", marginTop: "2px" },
  verified: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#2a9b6f", fontWeight: 600, marginTop: "4px" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" },
  infoItem: { background: "#f8f8f8", borderRadius: "12px", padding: "12px 14px" },
  infoLabel: { fontSize: "11px", color: "#aaa", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" },
  infoValue: { fontSize: "14px", fontWeight: 600, color: "#111" },
  actionRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "14px" },
  btnDirections: { padding: "13px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  btnCall: { padding: "13px", background: "white", color: "#2a9b6f", border: "1.5px solid #2a9b6f", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  mapBox: { background: "#e8f0e8", borderRadius: "16px", height: "140px", margin: "14px 20px 0", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #d0e0d0", cursor: "pointer" },
  mapText: { fontSize: "13px", color: "#3a8a65", fontWeight: 500 },
  section: { padding: "16px 20px 0" },
  sectionTitle: { fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "12px" },
  drugRow: { background: "white", borderRadius: "14px", padding: "14px 16px", marginBottom: "8px", border: "1px solid #eee", display: "flex", alignItems: "center", gap: "12px" },
  drugIcon: { width: "38px", height: "38px", borderRadius: "10px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  drugName: { fontSize: "14px", fontWeight: 600, color: "#111" },
  drugUnit: { fontSize: "12px", color: "#888", marginTop: "1px" },
  drugRight: { marginLeft: "auto", textAlign: "right" },
  drugPrice: { fontSize: "16px", fontWeight: 700, color: "#2a9b6f" },
  badgeIn: { display: "inline-block", fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "#e1f5ee", color: "#0c503b", fontWeight: 500, marginTop: "3px" },
  badgeOut: { display: "inline-block", fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "#fdecea", color: "#b71c1c", fontWeight: 500, marginTop: "3px" },
  license: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#aaa", margin: "14px 20px 0" },
};

function PillIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
}

export default function PharmacyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pharmacy = PHARMACY; // TODO: fetch by id from API

  function openDirections() {
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`;
    window.open(url, "_blank");
  }

  function callPharmacy() {
    window.location.href = `tel:${pharmacy.phone}`;
  }

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroTop}>
          <button style={s.backBtn} onClick={() => navigate(-1)}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div style={s.heroIcon}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <div style={s.pharmacyName}>{pharmacy.name}</div>
            <div style={s.pharmacyAddress}>{pharmacy.address}</div>
            {pharmacy.verified && (
              <div style={s.verified}>
                <svg width="12" height="12" fill="#2a9b6f" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified by Ghana FDA
              </div>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div style={s.infoGrid}>
          <div style={s.infoItem}>
            <div style={s.infoLabel}>Status</div>
            <div style={{ ...s.infoValue, color: "#2a9b6f" }}>Open now</div>
          </div>
          <div style={s.infoItem}>
            <div style={s.infoLabel}>Distance</div>
            <div style={s.infoValue}>{pharmacy.distance} km away</div>
          </div>
          <div style={s.infoItem}>
            <div style={s.infoLabel}>Hours</div>
            <div style={{ ...s.infoValue, fontSize: "13px" }}>{pharmacy.hours}</div>
          </div>
          <div style={s.infoItem}>
            <div style={s.infoLabel}>Drugs listed</div>
            <div style={s.infoValue}>{pharmacy.drugs.length} drugs</div>
          </div>
        </div>

        {/* Actions */}
        <div style={s.actionRow}>
          <button style={s.btnDirections} onClick={openDirections}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get directions
          </button>
          <button style={s.btnCall} onClick={callPharmacy}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call pharmacy
          </button>
        </div>
      </div>

      {/* Map tap area */}
      <div style={s.mapBox} onClick={openDirections}>
        <span style={s.mapText}>Tap to open in Google Maps</span>
      </div>

      {/* Drug listings */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Available drugs</div>
        {pharmacy.drugs.map((drug) => (
          <div key={drug.id} style={s.drugRow}>
            <div style={s.drugIcon}><PillIcon /></div>
            <div>
              <div style={s.drugName}>{drug.name}</div>
              <div style={s.drugUnit}>{drug.unit}</div>
            </div>
            <div style={s.drugRight}>
              <div style={s.drugPrice}>GH₵ {drug.price.toFixed(2)}</div>
              <span style={drug.inStock ? s.badgeIn : s.badgeOut}>
                {drug.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* License */}
      <div style={s.license}>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        License: {pharmacy.license} · Registered with Ghana Pharmacy Council
      </div>
    </div>
  );
}