import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../Styles/SearchResultsPage.css";
import { addToCart } from "./Cart";

/* ── Mock data — replace with API call ── */
const RESULTS = [
  {
    id: "p2",
    name: "HealthPlus Pharmacy",
    address: "Bantama, Kumasi",
    price: 3.8,
    distance: 1.2,
    inStock: true,
    hours: "Open now",
  },
  {
    id: "p3",
    name: "Nhyiaeso Drugstore",
    address: "Nhyiaeso, Kumasi",
    price: 4.0,
    distance: 2.4,
    inStock: true,
    hours: "Open now",
  },
  {
    id: "p1",
    name: "Kumasi Central Pharmacy",
    address: "Adum, Kumasi",
    price: 4.5,
    distance: 3.1,
    inStock: false,
    hours: "Closes 9pm",
  },
];

const SORT_OPTIONS = [
  { value: "price", label: "Price" },
  { value: "distance", label: "Distance" },
  { value: "stock", label: "In stock" },
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
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#2a9b6f"
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

function LocationPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#888"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
    </svg>
  );
}

/* ── Component ── */

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

  const lowestPrice = Math.min(...sorted.map((r) => r.price));

  function openDirections(pharmacy) {
    const q = encodeURIComponent(`${pharmacy.name} ${pharmacy.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${q}`;
    window.open(url, "_blank");
  }

  return (
    <div className="search-results-page">
      {/* ── Header ── */}
      <div className="search-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>

          <div className="search-bar">
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/search?q=${query}`)
              }
              placeholder="Search drug name..."
            />
          </div>
        </div>

        {/* Sort chips */}
        <div className="sort-row">
          <span className="sort-label">Sort by</span>
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              className={`sort-chip ${sortBy === value ? "active" : ""}`}
              onClick={() => setSortBy(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Drug summary banner ── */}
      <div className="drug-summary">
        <div className="drug-summary-icon">
          <PillIcon />
        </div>
        <div>
          <div className="drug-summary-name">{query || "Paracetamol"}</div>
          <div className="drug-summary-generic">Acetaminophen 500mg tabs</div>
        </div>
        <div className="drug-summary-right">
          <div className="drug-summary-stores">{sorted.length} stores</div>
          <div className="drug-summary-from">
            from GH₵ {lowestPrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* ── Results list ── */}
      <div className="section">
        <div className="section-title">{sorted.length} pharmacies found</div>

        {sorted.map((pharmacy, index) => (
          <div
            key={pharmacy.id}
            className={`pharmacy-card ${index === 0 ? "best" : ""}`}
            onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
          >
            {index === 0 && <div className="best-badge">Best price</div>}

            <div className="card-top">
              <div>
                <div className="pharmacy-name">{pharmacy.name}</div>
                <div className="pharmacy-address">{pharmacy.address}</div>
              </div>
              <div>
                <div className="price-big">GH₵ {pharmacy.price.toFixed(2)}</div>
                <div className="price-unit">per pack</div>
              </div>
            </div>

            <div className="card-bottom">
              <span
                className={
                  pharmacy.inStock ? "badge-in-stock" : "badge-out-of-stock"
                }
              >
                {pharmacy.inStock ? "In stock" : "Out of stock"}
              </span>

              <div className="dot" />

              <span className="info-pill">
                <LocationPinIcon />
                {pharmacy.distance} km
              </span>

              <div className="dot" />

              <span className="info-pill">{pharmacy.hours}</span>

              <button
                className="btn-directions"
                onClick={(e) => {
                  e.stopPropagation();
                  openDirections(pharmacy);
                }}
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
