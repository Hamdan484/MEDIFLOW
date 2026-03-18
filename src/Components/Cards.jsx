// Reusable card components — import whichever you need
import "../Styles/Cards.css";

/* ── Shared sub-component ── */

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

/* ════════════════════════════════════════
   1. StatCard — dashboard overview numbers
   ════════════════════════════════════════ */
export function StatCard({
  label,
  value,
  change,
  changeUp = true,
  iconBg = "#e1f5ee",
  icon,
}) {
  return (
    <div className="stat-card">
      {icon && (
        <div className="stat-card-icon" style={{ background: iconBg }}>
          {icon}
        </div>
      )}
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${changeUp ? "up" : "down"}`}>
          {change}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   2. DrugCard — search results & listings
   ════════════════════════════════════════ */
export function DrugCard({ name, generic, price, inStock, stores, onClick }) {
  return (
    <div className="drug-card" onClick={onClick}>
      <div className="drug-card-icon">
        <PillIcon />
      </div>

      <div>
        <div className="drug-card-name">{name}</div>
        <div className="drug-card-generic">{generic}</div>
        <span className={inStock ? "badge-in-stock" : "badge-out-of-stock"}>
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <div className="drug-card-right">
        <div className="drug-card-price">
          GH₵ {parseFloat(price).toFixed(2)}
        </div>
        {stores && (
          <div className="drug-card-stores">
            {stores} store{stores > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   3. PharmacyCard — search results list
   ════════════════════════════════════════ */
export function PharmacyCard({
  name,
  address,
  price,
  distance,
  inStock,
  hours,
  isBest,
  onDirections,
  onClick,
}) {
  return (
    <div className={`pharmacy-card ${isBest ? "best" : ""}`} onClick={onClick}>
      {isBest && <span className="badge-best-price">Best price</span>}

      <div className="pharmacy-card-top">
        <div>
          <div className="pharmacy-card-name">{name}</div>
          <div className="pharmacy-card-address">{address}</div>
        </div>
        <div>
          <div className="pharmacy-card-price">
            GH₵ {parseFloat(price).toFixed(2)}
          </div>
          <div className="pharmacy-card-price-unit">per pack</div>
        </div>
      </div>

      <div className="pharmacy-card-bottom">
        <span className={inStock ? "badge-in-stock" : "badge-out-of-stock"}>
          {inStock ? "In stock" : "Out of stock"}
        </span>

        <span className="pharmacy-card-distance">{distance} km</span>
        <span className="dot" />
        <span className="pharmacy-card-hours">{hours}</span>

        <button
          className="btn-directions"
          onClick={(e) => {
            e.stopPropagation();
            onDirections?.();
          }}
        >
          Directions
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   4. SectionCard — white container with header
   ════════════════════════════════════════ */
export function SectionCard({
  title,
  action,
  actionLabel = "View all",
  children,
}) {
  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-card-title">{title}</div>
        {action && (
          <button className="section-card-action" onClick={action}>
            {actionLabel} →
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
