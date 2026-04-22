import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Buyer_Dashboard.css";
import { addToCart } from "./Cart";

/* ── Mock data — replace with API call ── */
const CATEGORIES = [
  "All",
  "Painkillers",
  "Antibiotics",
  "Malaria",
  "Diabetes",
  "Antacids",
];

const DRUGS = [
  {
    id: 1,
    name: "Paracetamol",
    generic: "Acetaminophen 500mg",
    category: "Painkillers",
    price: 3.8,
    stores: 3,
    inStock: true,
  },
  {
    id: 2,
    name: "Ibuprofen",
    generic: "Ibuprofen 400mg",
    category: "Painkillers",
    price: 5.5,
    stores: 2,
    inStock: true,
  },
  {
    id: 3,
    name: "Artemether",
    generic: "Artemether/Lumefantrine",
    category: "Malaria",
    price: 22.5,
    stores: 2,
    inStock: true,
  },
  {
    id: 4,
    name: "Chloroquine",
    generic: "Chloroquine Phosphate 250mg",
    category: "Malaria",
    price: 9.0,
    stores: 1,
    inStock: false,
  },
  {
    id: 5,
    name: "Amoxicillin",
    generic: "Amoxicillin 250mg caps",
    category: "Antibiotics",
    price: 18.0,
    stores: 1,
    inStock: false,
  },
  {
    id: 6,
    name: "Azithromycin",
    generic: "Azithromycin 500mg",
    category: "Antibiotics",
    price: 25.0,
    stores: 3,
    inStock: true,
  },
  {
    id: 7,
    name: "Metformin",
    generic: "Metformin HCl 500mg",
    category: "Diabetes",
    price: 12.0,
    stores: 2,
    inStock: true,
  },
  {
    id: 8,
    name: "Glibenclamide",
    generic: "Glibenclamide 5mg",
    category: "Diabetes",
    price: 8.0,
    stores: 2,
    inStock: true,
  },
  {
    id: 9,
    name: "Omeprazole",
    generic: "Omeprazole 20mg caps",
    category: "Antacids",
    price: 8.5,
    stores: 1,
    inStock: false,
  },
  {
    id: 10,
    name: "Ranitidine",
    generic: "Ranitidine 150mg",
    category: "Antacids",
    price: 6.0,
    stores: 2,
    inStock: true,
  },
];

/* ── Icons ── */

function LocationIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#2a9b6f"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.5" fill="#2a9b6f" stroke="none" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#aaa"
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
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

/* ── Component ── */

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = DRUGS.filter((d) => {
    const matchCat = activeCategory === "All" || d.category === activeCategory;
    const matchQ =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.generic.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="home-page">
      {/* ── Header ── */}
      <div className="home-header">
        <div className="header-top">
          <div>
            <div className="brand">Mediflow</div>
            <div className="location">
              <LocationIcon />
              Kumasi, Ghana
            </div>
          </div>
          <div className="avatar">KA</div>
        </div>

        <div className="greeting">
          Good morning, <strong>Kofi</strong> 👋
        </div>

        <div className="search-bar">
          <SearchIcon />
          <input
            placeholder="Search drug name or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/search?q=${query}`)
            }
          />
        </div>
      </div>

      {/* ── Category chips ── */}
      <div className="section">
        <div className="cats-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Pharmacies nearby</div>
          <div className="stat-value">12</div>
          <div className="stat-sub">within 5km</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Drugs listed</div>
          <div className="stat-value">340+</div>
          <div className="stat-sub">updated today</div>
        </div>
      </div>

      {/* ── Drug list ── */}
      <div className="section">
        <div className="section-title">Available near you</div>

        {filtered.map((drug) => (
          <div
            key={drug.id}
            className="drug-card"
            onClick={() => navigate(`/search?q=${drug.name}`)}
          >
            <div className="drug-icon">
              <PillIcon />
            </div>

            <div>
              <div className="drug-name">{drug.name}</div>
              <div className="drug-generic">{drug.generic}</div>
              <span
                className={
                  drug.inStock ? "badge-in-stock" : "badge-out-of-stock"
                }
              >
                {drug.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <div className="drug-right">
              <div className="drug-price">GH₵ {drug.price.toFixed(2)}</div>
              <div className="drug-stores">
                {drug.stores} store{drug.stores > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
