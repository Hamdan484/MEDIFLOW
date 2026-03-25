import { useState } from "react";
import "../Styles/Customers.css";

const CUSTOMERS = [
  {
    id: 1,
    name: "Kofi Asante",
    phone: "+233 20 123 4567",
    lastPurchase: "Today, 10:32am",
    drugs: ["Paracetamol", "ORS Sachet"],
    spent: 48.5,
    status: "active",
    purchases: 8,
  },
  {
    id: 2,
    name: "Ama Boateng",
    phone: "+233 24 987 6543",
    lastPurchase: "Yesterday, 3:15pm",
    drugs: ["Artemether", "Amoxicillin"],
    spent: 40.5,
    status: "active",
    purchases: 5,
  },
  {
    id: 3,
    name: "Yaw Darko",
    phone: "+233 55 444 3210",
    lastPurchase: "2 days ago",
    drugs: ["Metformin"],
    spent: 12.0,
    status: "new",
    purchases: 1,
  },
  {
    id: 4,
    name: "Akosua Owusu",
    phone: "+233 20 555 7890",
    lastPurchase: "1 week ago",
    drugs: ["Ciprofloxacin", "Omeprazole"],
    spent: 38.5,
    status: "inactive",
    purchases: 3,
  },
  {
    id: 5,
    name: "Kwame Mensah",
    phone: "+233 24 111 2233",
    lastPurchase: "1 week ago",
    drugs: ["Amlodipine"],
    spent: 22.0,
    status: "active",
    purchases: 6,
  },
  {
    id: 6,
    name: "Abena Sarpong",
    phone: "+233 55 999 0011",
    lastPurchase: "2 weeks ago",
    drugs: ["Paracetamol", "Amoxicillin"],
    spent: 19.8,
    status: "inactive",
    purchases: 2,
  },
  {
    id: 7,
    name: "Fiifi Aidoo",
    phone: "+233 20 777 4455",
    lastPurchase: "3 weeks ago",
    drugs: ["Artemether"],
    spent: 22.5,
    status: "new",
    purchases: 1,
  },
];

const STATS = [
  {
    label: "Total customers",
    value: "84",
    change: "↑ 6 this month",
    up: true,
    iconBg: "#e1f5ee",
    iconColor: "#2a9b6f",
  },
  {
    label: "New this month",
    value: "12",
    change: "↑ 3 this week",
    up: true,
    iconBg: "#e8f4fd",
    iconColor: "#1976d2",
  },
  {
    label: "Total revenue",
    value: "GH₵ 4,280",
    change: "↑ 14% this month",
    up: true,
    iconBg: "#e1f5ee",
    iconColor: "#2a9b6f",
  },
  {
    label: "Returning customers",
    value: "61%",
    change: "↑ 5% vs last month",
    up: true,
    iconBg: "#fff8e1",
    iconColor: "#ba7517",
  },
];

const AVATAR_COLORS = ["#e1f5ee", "#e8f4fd", "#fff8e1", "#fdecea", "#f3e8ff"];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getBadgeClass(status) {
  return `badge badge-${status}`;
}

export default function Customers() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query),
  );

  return (
    <div className="customers-page">
      {/* Top */}
      <div className="customers-top">
        <div>
          <div className="page-title">Customers</div>
          <div className="page-sub">
            People who have purchased from your pharmacy
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: stat.iconBg }}>
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke={stat.iconColor}
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.up ? "up" : "down"}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="customers-card">
        <div className="card-head">
          <div className="card-title">All customers</div>
          <div className="search-bar">
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#aaa"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Search name or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="customers-table-wrap">
          <table className="customers-table">
            <thead>
              <tr>
                {[
                  "Customer",
                  "Last purchase",
                  "Drugs bought",
                  "Total spent",
                  "Purchases",
                  "Status",
                  "",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} onClick={() => setSelected(c)}>
                  <td>
                    <div className="customer-cell">
                      <div
                        className="avatar"
                        style={{
                          background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                        }}
                      >
                        {getInitials(c.name)}
                      </div>
                      <div>
                        <div className="cust-name">{c.name}</div>
                        <div className="cust-phone">{c.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.lastPurchase}</td>
                  <td>
                    <div className="drug-list">{c.drugs.join(", ")}</div>
                  </td>
                  <td className="amount">GH₵ {c.spent.toFixed(2)}</td>
                  <td>
                    {c.purchases} order{c.purchases > 1 ? "s" : ""}
                  </td>
                  <td>
                    <span className={getBadgeClass(c.status)}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(c);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={7}>No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-avatar">{getInitials(selected.name)}</div>
              <div>
                <div className="modal-name">{selected.name}</div>
                <div className="modal-phone">{selected.phone}</div>
              </div>
              <span className={`badge modal-badge badge-${selected.status}`}>
                {selected.status.charAt(0).toUpperCase() +
                  selected.status.slice(1)}
              </span>
            </div>

            <div className="modal-section">
              <div className="modal-label">Purchase summary</div>
              {[
                { key: "Last purchase", val: selected.lastPurchase },
                {
                  key: "Total orders",
                  val: `${selected.purchases} order${selected.purchases > 1 ? "s" : ""}`,
                },
                { key: "Total spent", val: `GH₵ ${selected.spent.toFixed(2)}` },
                { key: "Drugs purchased", val: selected.drugs.join(", ") },
              ].map(({ key, val }) => (
                <div key={key} className="info-row">
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
