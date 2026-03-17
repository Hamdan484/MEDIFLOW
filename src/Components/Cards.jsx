// Reusable card components — import whichever you need

// ── 1. Stat card (for dashboard overview numbers) ──
export function StatCard({ label, value, change, changeUp = true, iconBg = "#e1f5ee", icon }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", padding: "18px", border: "1px solid #eee", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {icon && (
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
          {icon}
        </div>
      )}
      <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "26px", fontWeight: 700, color: "#111", lineHeight: 1 }}>{value}</div>
      {change && (
        <div style={{ fontSize: "12px", color: changeUp ? "#2a9b6f" : "#e53935", marginTop: "6px" }}>
          {change}
        </div>
      )}
    </div>
  );
}

// ── 2. Drug card (for search results and listings) ──
export function DrugCard({ name, generic, price, inStock, stores, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "10px", border: "1px solid #eee", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2a9b6f" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>{name}</div>
        <div style={{ fontSize: "12px", color: "#888", marginTop: "2px", marginBottom: "4px" }}>{generic}</div>
        <span style={{ display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", fontWeight: 500, background: inStock ? "#e1f5ee" : "#fdecea", color: inStock ? "#0c503b" : "#b71c1c" }}>
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#2a9b6f" }}>GH₵ {parseFloat(price).toFixed(2)}</div>
        {stores && <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>{stores} store{stores > 1 ? "s" : ""}</div>}
      </div>
    </div>
  );
}

// ── 3. Pharmacy card (for search results map/list) ──
export function PharmacyCard({ name, address, price, distance, inStock, hours, isBest, onDirections, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "10px", border: isBest ? "2px solid #2a9b6f" : "1px solid #eee", cursor: "pointer", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      {isBest && (
        <span style={{ display: "inline-block", fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: "#2a9b6f", color: "white", fontWeight: 600, marginBottom: "8px" }}>
          Best price
        </span>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>{name}</div>
          <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>{address}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#2a9b6f" }}>GH₵ {parseFloat(price).toFixed(2)}</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>per pack</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f0f0f0" }}>
        <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "20px", fontWeight: 500, background: inStock ? "#e1f5ee" : "#fdecea", color: inStock ? "#0c503b" : "#b71c1c" }}>
          {inStock ? "In stock" : "Out of stock"}
        </span>
        <span style={{ fontSize: "12px", color: "#666" }}>{distance} km</span>
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ddd" }} />
        <span style={{ fontSize: "12px", color: "#666" }}>{hours}</span>
        <button
          style={{ marginLeft: "auto", padding: "6px 14px", background: "#e1f5ee", color: "#0c503b", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          onClick={(e) => { e.stopPropagation(); onDirections && onDirections(); }}
        >
          Directions
        </button>
      </div>
    </div>
  );
}

// ── 4. Section card wrapper (white container with header) ──
export function SectionCard({ title, action, actionLabel = "View all", children }) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #eee", overflow: "hidden", marginBottom: "16px", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>{title}</div>
        {action && (
          <button onClick={action} style={{ fontSize: "13px", color: "#2a9b6f", fontWeight: 500, border: "none", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
            {actionLabel} →
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}