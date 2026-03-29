import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Medicines.css";
import { addToCart } from "./Cart";
/* ── Mock data — replace with API call ── */
const MEDICINES = [
  {
    id: 1,
    name: "Paracetamol",
    generic: "Acetaminophen 500mg",
    category: "Pain Relief",
    price: 3.8,
    inStock: true,
    pharmacies: 12,
  },
  {
    id: 2,
    name: "Amoxicillin",
    generic: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 15.0,
    inStock: true,
    pharmacies: 8,
  },
  {
    id: 3,
    name: "Metformin",
    generic: "Metformin HCl 500mg",
    category: "Diabetes",
    price: 12.0,
    inStock: true,
    pharmacies: 6,
  },
  {
    id: 4,
    name: "Artemether",
    generic: "Artemether/Lumefantrine",
    category: "Malaria",
    price: 22.5,
    inStock: true,
    pharmacies: 10,
  },
  {
    id: 5,
    name: "Omeprazole",
    generic: "Omeprazole 20mg",
    category: "Digestive",
    price: 8.5,
    inStock: false,
    pharmacies: 4,
  },
  {
    id: 6,
    name: "Amlodipine",
    generic: "Amlodipine 5mg",
    category: "Hypertension",
    price: 9.0,
    inStock: true,
    pharmacies: 7,
  },
  {
    id: 7,
    name: "Ibuprofen",
    generic: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 5.2,
    inStock: true,
    pharmacies: 11,
  },
  {
    id: 8,
    name: "Ciprofloxacin",
    generic: "Ciprofloxacin 500mg",
    category: "Antibiotics",
    price: 18.0,
    inStock: false,
    pharmacies: 3,
  },
  {
    id: 9,
    name: "Salbutamol",
    generic: "Salbutamol 2mg",
    category: "Respiratory",
    price: 11.0,
    inStock: true,
    pharmacies: 5,
  },
  {
    id: 10,
    name: "Lisinopril",
    generic: "Lisinopril 10mg",
    category: "Hypertension",
    price: 14.0,
    inStock: true,
    pharmacies: 6,
  },
];

const CATEGORIES = [
  "All",
  "Pain Relief",
  "Antibiotics",
  "Malaria",
  "Diabetes",
  "Hypertension",
  "Digestive",
  "Respiratory",
];

/* ── Icons ── */

function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#555"
      strokeWidth={2.2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#bbb"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#2a9b6f"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0
           0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#2a9b6f"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21
           12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/* ── Component ── */

export default function MedicinesPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activecat, setActivecat] = useState("All");
  const [cart, setCart] = useState([]); // array of medicine ids
  const [compareIds, setCompareIds] = useState([]); // max 3

  /* Filtered list */
  const filtered = useMemo(() => {
    return MEDICINES.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.generic.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activecat === "All" || m.category === activecat;
      return matchesSearch && matchesCategory;
    });
  }, [query, activecat]);

  /* ── Handlers ── */

  function toggleCart(med) {
  const alreadyAdded = cart.includes(med.id);

  if (alreadyAdded) {
    // remove from local state
    setCart((prev) => prev.filter((i) => i !== med.id));
  } else {
    // add to local state AND push to cart page
    setCart((prev) => [...prev, med.id]);
    addToCart({
      id: med.id,
      name: med.name,
      unit: med.unit || "per pack",
      price: med.price,
      pharmacyId: med.pharmacyId || "p1",
      pharmacyName: med.pharmacyName || "Pharmacy",
    });
  }
}

  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // cap at 3
      return [...prev, id];
    });
  }

  function handleCompare() {
    const query = compareIds.join(",");
    navigate(`/compare?ids=${query}`);
  }

  function handleViewDetails(id) {
    navigate(`/medicines/${id}`);
  }

  /* ── Render ── */

  return (
    <div className="medicines-page">
      {/* Header */}
      <div className="medicines-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <div>
          <div className="header-title">Medicines</div>
          <div className="header-sub">Browse and compare drug prices</div>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-wrapper">
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name or generic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter chips */}
      <div className="filters-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${activecat === cat ? "active" : ""}`}
            onClick={() => setActivecat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="results-meta">
        <span>{filtered.length}</span> medicine
        {filtered.length !== 1 ? "s" : ""} found
        {compareIds.length > 0 && ` · ${compareIds.length} selected to compare`}
      </div>

      {/* Medicine cards */}
      <div className="medicines-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <EmptyIcon />
            </div>
            <div className="empty-state-title">No medicines found</div>
            <div className="empty-state-sub">
              Try a different name or category filter.
            </div>
          </div>
        ) : (
          filtered.map((med) => (
            <div
              key={med.id}
              className="medicine-card"
              onClick={() => handleViewDetails(med.id)}
            >
              {/* Icon */}
              <div className="medicine-icon">
                <PillIcon />
              </div>

              {/* Info */}
              <div className="medicine-info">
                <div className="medicine-name">{med.name}</div>
                <div className="medicine-generic">{med.generic}</div>
                <div className="medicine-meta">
                  <span
                    className={
                      med.inStock ? "badge-in-stock" : "badge-out-of-stock"
                    }
                  >
                    {med.inStock ? "In stock" : "Out of stock"}
                  </span>
                  <span className="pharmacy-count">
                    {med.pharmacies} pharmacies
                  </span>
                </div>
              </div>
              

              {/* Price + actions */}
              <div
                className="medicine-right"
                onClick={(e) => e.stopPropagation()} // prevent card nav on button clicks
              >
                <div>
                  <div className="medicine-price">
                    GH₵ {med.price.toFixed(2)}
                  </div>
                  <div className="medicine-price-sub">from lowest</div>
                </div>

               <button
  className="btn-add-cart"
  onClick={() => toggleCart(med)}
  style={
    cart.includes(med.id)
      ? { background: "#0c503b" }
      : undefined
  }
>
  <PlusIcon />
  {cart.includes(med.id) ? "Added" : "Add"}
</button>

                <button
                  className="btn-compare-clear"
                  style={{
                    fontSize: "11px",
                    color: compareIds.includes(med.id) ? "#0c503b" : "#bbb",
                    fontWeight: compareIds.includes(med.id) ? 600 : 400,
                  }}
                  onClick={() => toggleCompare(med.id)}
                >
                  {compareIds.includes(med.id) ? "✓ Compare" : "+ Compare"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Compare bar — appears when ≥2 medicines are selected */}
      {compareIds.length >= 2 && (
        <div className="compare-bar">
          <span>{compareIds.length} medicines selected</span>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="btn-compare-clear"
              onClick={() => setCompareIds([])}
            >
              Clear
            </button>
            <button className="btn-compare" onClick={handleCompare}>
              Compare pharmacies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
