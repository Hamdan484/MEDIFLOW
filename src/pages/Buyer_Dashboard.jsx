import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["All", "Painkillers", "Antibiotics", "Malaria", "Diabetes", "Antacids"];

const DRUGS = [
  { id: 1, name: "Paracetamol", generic: "Acetaminophen 500mg", price: 3.80, stores: 3, inStock: true },
  { id: 2, name: "Artemether", generic: "Artemether/Lumefantrine", price: 22.50, stores: 2, inStock: true },
  { id: 3, name: "Amoxicillin", generic: "Amoxicillin 250mg caps", price: 18.00, stores: 1, inStock: false },
  { id: 4, name: "Metformin", generic: "Metformin HCl 500mg", price: 12.00, stores: 2, inStock: true },
  { id: 5, name: "Omeprazole", generic: "Omeprazole 20mg caps", price: 8.50, stores: 1, inStock: false },
];

const s = {
  page: { minHeight: "100vh", background: "#f0f4f0", fontFamily: "'DM Sans','Segoe UI',sans-serif", paddingBottom: "80px" },
  header: { background: "white", padding: "18px 20px 14px", borderBottom: "1px solid #eee" },
  headerTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" },
  brand: { fontSize: "22px", fontWeight: 700, color: "#0c503b" },
  location: { display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#2a9b6f", fontWeight: 500 },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, color: "#0c503b" },
  greeting: { fontSize: "15px", color: "#555" },
  searchBar: { display: "flex", alignItems: "center", gap: "10px", background: "#f5f5f5", borderRadius: "14px", padding: "11px 14px", marginTop: "14px", cursor: "text", border: "1.5px solid transparent" },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: "15px", color: "#111", width: "100%", fontFamily: "inherit" },
  section: { padding: "20px 20px 0" },
  sectionTitle: { fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "12px" },
  cats: { display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" },
  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "20px 20px 0" },
  statCard: { background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #eee" },
  statLabel: { fontSize: "12px", color: "#888", marginBottom: "4px" },
  statValue: { fontSize: "22px", fontWeight: 700, color: "#0c503b" },
  statSub: { fontSize: "12px", color: "#aaa", marginTop: "2px" },
  drugCard: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "10px", border: "1px solid #eee", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" },
  drugIcon: { width: "44px", height: "44px", borderRadius: "12px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  drugName: { fontSize: "15px", fontWeight: 600, color: "#111" },
  drugGeneric: { fontSize: "12px", color: "#888", marginTop: "2px", marginBottom: "4px" },
  drugRight: { marginLeft: "auto", textAlign: "right" },
  drugPrice: { fontSize: "15px", fontWeight: 700, color: "#2a9b6f" },
  drugStores: { fontSize: "12px", color: "#aaa", marginTop: "2px" },
  badgeIn: { display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", fontWeight: 500, background: "#e1f5ee", color: "#0c503b" },
  badgeOut: { display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", fontWeight: 500, background: "#fdecea", color: "#b71c1c" },
};

function PillIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = DRUGS.filter((d) => {
    const matchCat = activeCategory === "All" || true; // wire up categories later
    const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.generic.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTop}>
          <div>
            <div style={s.brand}>Mediflow</div>
            <div style={s.location}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" fill="#2a9b6f" stroke="none" />
              </svg>
              Kumasi, Ghana
            </div>
          </div>
          <div style={s.avatar}>KA</div>
        </div>
        <div style={s.greeting}>Good morning, <strong>Kofi</strong> 👋</div>
        <div style={s.searchBar}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            style={s.searchInput}
            placeholder="Search drug name or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${query}`)}
          />
        </div>
      </div>

      {/* Categories */}
      <div style={s.section}>
        <div style={s.cats}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: "8px 16px", borderRadius: "20px",
                fontSize: "13px", fontWeight: 500, cursor: "pointer",
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "#2a9b6f" : "#e0e0e0",
                background: activeCategory === cat ? "#2a9b6f" : "white",
                color: activeCategory === cat ? "white" : "#555",
                fontFamily: "inherit",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statLabel}>Pharmacies nearby</div>
          <div style={s.statValue}>12</div>
          <div style={s.statSub}>within 5km</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Drugs listed</div>
          <div style={s.statValue}>340+</div>
          <div style={s.statSub}>updated today</div>
        </div>
      </div>

      {/* Drug list */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Available near you</div>
        {filtered.map((drug) => (
          <div key={drug.id} style={s.drugCard} onClick={() => navigate(`/search?q=${drug.name}`)}>
            <div style={s.drugIcon}><PillIcon /></div>
            <div>
              <div style={s.drugName}>{drug.name}</div>
              <div style={s.drugGeneric}>{drug.generic}</div>
              <span style={drug.inStock ? s.badgeIn : s.badgeOut}>
                {drug.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>
            <div style={s.drugRight}>
              <div style={s.drugPrice}>GH₵ {drug.price.toFixed(2)}</div>
              <div style={s.drugStores}>{drug.stores} store{drug.stores > 1 ? "s" : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}