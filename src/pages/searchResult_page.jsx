import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RESULTS = [
  { id: "p2", name: "HealthPlus Pharmacy", address: "Bantama, Kumasi", price: 3.80, distance: 1.2, inStock: true,  hours: "Open now" },
  { id: "p3", name: "Nhyiaeso Drugstore",  address: "Nhyiaeso, Kumasi", price: 4.00, distance: 2.4, inStock: true,  hours: "Open now" },
  { id: "p1", name: "Kumasi Central Pharmacy", address: "Adum, Kumasi", price: 4.50, distance: 3.1, inStock: false, hours: "Closes 9pm" },
];

const s = {
  page: { minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", paddingBottom: "80px" },
  header: { background: "white", padding: "16px 20px 14px", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 },
  headerTop: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
  backBtn: { width: "36px", height: "36px", borderRadius: "10px", background: "#f5f5f5", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  searchBar: { display: "flex", alignItems: "center", gap: "10px", background: "#f5f5f5", borderRadius: "14px", padding: "10px 14px", flex: 1, border: "1.5px solid #2a9b6f" },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: "15px", color: "#111", width: "100%", fontFamily: "inherit" },
  sortRow: { display: "flex", alignItems: "center", gap: "8px" },
  sortLabel: { fontSize: "13px", color: "#888" },
  drugSummary: { background: "#e1f5ee", borderRadius: "14px", padding: "14px 16px", margin: "14px 20px 0", display: "flex", alignItems: "center", gap: "12px" },
  drugSummaryIcon: { width: "40px", height: "40px", background: "white", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  drugSummaryName: { fontSize: "16px", fontWeight: 700, color: "#0c503b" },
  drugSummaryGeneric: { fontSize: "12px", color: "#3a8a65", marginTop: "1px" },
  drugSummaryRight: { marginLeft: "auto", textAlign: "right" },
  drugSummaryStores: { fontSize: "13px", fontWeight: 600, color: "#0c503b" },
  drugSummaryFrom: { fontSize: "12px", color: "#3a8a65" },
  section: { padding: "16px 20px 0" },
  sectionTitle: { fontSize: "14px", fontWeight: 600, color: "#888", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" },
  card: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "10px", cursor: "pointer" },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  pharmacyName: { fontSize: "15px", fontWeight: 700, color: "#111" },
  pharmacyAddress: { fontSize: "13px", color: "#888", marginTop: "2px" },
  priceBig: { fontSize: "22px", fontWeight: 700, color: "#2a9b6f" },
  priceUnit: { fontSize: "12px", color: "#aaa", marginTop: "1px", textAlign: "right" },
  cardBottom: { display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0f0f0" },
  infoPill: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#666" },
  dot: { width: "4px", height: "4px", borderRadius: "50%", background: "#ddd" },
  badgeIn: { display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: "#e1f5ee", color: "#0c503b", fontWeight: 500 },
  badgeOut: { display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: "#fdecea", color: "#b71c1c", fontWeight: 500 },
  bestBadge: { display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: "#2a9b6f", color: "white", fontWeight: 600, marginBottom: "8px" },
  directionsBtn: { marginLeft: "auto", padding: "6px 14px", background: "#e1f5ee", color: "#0c503b", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
};

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("price");
  const navigate = useNavigate();

  const sorted = [...RESULTS].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "stock") return b.inStock - a.inStock;
    return 0;
  });

  function openDirections(pharmacy) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacy.name + " " + pharmacy.address)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTop}>
          <button style={s.backBtn} onClick={() => navigate(-1)}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div style={s.searchBar}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              style={s.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${query}`)}
            />
          </div>
        </div>

        {/* Sort buttons */}
        <div style={s.sortRow}>
          <span style={s.sortLabel}>Sort by</span>
          {[["price", "Price"], ["distance", "Distance"], ["stock", "In stock"]].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSortBy(val)}
              style={{
                padding: "6px 14px", borderRadius: "20px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                border: "1.5px solid",
                borderColor: sortBy === val ? "#2a9b6f" : "#e0e0e0",
                background: sortBy === val ? "#2a9b6f" : "white",
                color: sortBy === val ? "white" : "#555",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Drug summary banner */}
      <div style={s.drugSummary}>
        <div style={s.drugSummaryIcon}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
          </svg>
        </div>
        <div>
          <div style={s.drugSummaryName}>{query || "Paracetamol"}</div>
          <div style={s.drugSummaryGeneric}>Acetaminophen 500mg tabs</div>
        </div>
        <div style={s.drugSummaryRight}>
          <div style={s.drugSummaryStores}>{sorted.length} stores</div>
          <div style={s.drugSummaryFrom}>from GH₵ {Math.min(...sorted.map(r => r.price)).toFixed(2)}</div>
        </div>
      </div>

      {/* Results */}
      <div style={s.section}>
        <div style={s.sectionTitle}>{sorted.length} pharmacies found</div>

        {sorted.map((pharmacy, index) => (
          <div
            key={pharmacy.id}
            style={{ ...s.card, border: index === 0 ? "2px solid #2a9b6f" : "1px solid #eee" }}
            onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
          >
            {index === 0 && <div style={s.bestBadge}>Best price</div>}
            <div style={s.cardTop}>
              <div>
                <div style={s.pharmacyName}>{pharmacy.name}</div>
                <div style={s.pharmacyAddress}>{pharmacy.address}</div>
              </div>
              <div>
                <div style={s.priceBig}>GH₵ {pharmacy.price.toFixed(2)}</div>
                <div style={s.priceUnit}>per pack</div>
              </div>
            </div>
            <div style={s.cardBottom}>
              <span style={pharmacy.inStock ? s.badgeIn : s.badgeOut}>
                {pharmacy.inStock ? "In stock" : "Out of stock"}
              </span>
              <div style={s.dot} />
              <span style={s.infoPill}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                {pharmacy.distance} km
              </span>
              <div style={s.dot} />
              <span style={s.infoPill}>{pharmacy.hours}</span>
              <button
                style={s.directionsBtn}
                onClick={(e) => { e.stopPropagation(); openDirections(pharmacy); }}
              >
                Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}