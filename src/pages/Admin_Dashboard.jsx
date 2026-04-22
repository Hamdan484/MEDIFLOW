import { useState } from "react";
import "../Styles/Seller_Dashboard.css";
import "../Styles/Customers.css";

/* ════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════ */

const PHARMACIES = [
  { id: "ph1", name: "HealthPlus Pharmacy",      owner: "Dr. Kweku Mensah",   license: "GPC/2023/0041", location: "Bantama, Kumasi",     drugs: 48, revenue: "GH₵ 12,400", status: "approved",  joined: "Jan 2024" },
  { id: "ph2", name: "Nhyiaeso Drugstore",        owner: "Mrs. Ama Boateng",   license: "GPC/2022/0189", location: "Nhyiaeso, Kumasi",    drugs: 35, revenue: "GH₵ 8,750",  status: "approved",  joined: "Mar 2023" },
  { id: "ph3", name: "Kumasi Central Pharmacy",  owner: "Mr. Yaw Asante",     license: "GPC/2024/0302", location: "Adum, Kumasi",        drugs: 62, revenue: "GH₵ 19,100", status: "approved",  joined: "Feb 2024" },
  { id: "ph4", name: "Oforikrom Meds",           owner: "Ms. Akosua Frimpong",license: "GPC/2024/0415", location: "Oforikrom, Kumasi",   drugs: 27, revenue: "GH₵ 4,200",  status: "pending",   joined: "Apr 2024" },
  { id: "ph5", name: "Asokwa PharmaCare",        owner: "Mr. Fiifi Aidoo",    license: "GPC/2023/0290", location: "Asokwa, Kumasi",      drugs: 41, revenue: "GH₵ 9,800",  status: "approved",  joined: "Jun 2023" },
  { id: "ph6", name: "Takoradi MedHub",          owner: "Dr. Abena Sarpong",  license: "GPC/2024/0511", location: "Takoradi, Western",   drugs: 19, revenue: "GH₵ 2,100",  status: "pending",   joined: "Apr 2024" },
  { id: "ph7", name: "Circle Pharmacy",          owner: "Mr. Kofi Darko",     license: "GPC/2021/0073", location: "Accra, Greater Accra",drugs: 88, revenue: "GH₵ 31,500", status: "approved",  joined: "May 2021" },
  { id: "ph8", name: "Tema PharmaPlus",          owner: "Mrs. Efua Owusu",    license: "GPC/2022/0145", location: "Tema, Greater Accra", drugs: 54, revenue: "GH₵ 15,700", status: "approved",  joined: "Sep 2022" },
];

const BUYERS = [
  { id: "b1",  name: "Kofi Asante",    phone: "+233 20 123 4567", email: "kofi@gmail.com",   region: "Kumasi",  orders: 12, spent: "GH₵ 148.50", joined: "Feb 2024", status: "active"   },
  { id: "b2",  name: "Ama Boateng",    phone: "+233 24 987 6543", email: "ama@gmail.com",    region: "Kumasi",  orders: 7,  spent: "GH₵ 89.20",  joined: "Mar 2024", status: "active"   },
  { id: "b3",  name: "Yaw Darko",      phone: "+233 55 444 3210", email: "yaw@yahoo.com",    region: "Kumasi",  orders: 2,  spent: "GH₵ 24.00",  joined: "Apr 2024", status: "new"      },
  { id: "b4",  name: "Akosua Owusu",   phone: "+233 20 555 7890", email: "akosua@gmail.com", region: "Accra",   orders: 5,  spent: "GH₵ 72.30",  joined: "Jan 2024", status: "active"   },
  { id: "b5",  name: "Kwame Mensah",   phone: "+233 24 111 2233", email: "kwame@gmail.com",  region: "Kumasi",  orders: 9,  spent: "GH₵ 120.00", joined: "Nov 2023", status: "active"   },
  { id: "b6",  name: "Abena Sarpong",  phone: "+233 55 999 0011", email: "abena@gmail.com",  region: "Takoradi",orders: 3,  spent: "GH₵ 41.80",  joined: "Mar 2024", status: "inactive" },
  { id: "b7",  name: "Fiifi Aidoo",    phone: "+233 20 777 4455", email: "fiifi@yahoo.com",  region: "Kumasi",  orders: 1,  spent: "GH₵ 22.50",  joined: "Apr 2024", status: "new"      },
  { id: "b8",  name: "Efua Hammond",   phone: "+233 24 333 5566", email: "efua@gmail.com",   region: "Accra",   orders: 14, spent: "GH₵ 210.00", joined: "Oct 2023", status: "active"   },
  { id: "b9",  name: "Nana Osei",      phone: "+233 55 222 9988", email: "nana@gmail.com",   region: "Tema",    orders: 6,  spent: "GH₵ 93.40",  joined: "Jan 2024", status: "active"   },
  { id: "b10", name: "Adwoa Frimpong", phone: "+233 20 888 1122", email: "adwoa@gmail.com",  region: "Kumasi",  orders: 4,  spent: "GH₵ 58.00",  joined: "Feb 2024", status: "inactive" },
];

const PLATFORM_STATS = [
  { label: "Total Pharmacies",  value: "8",        change: "↑ 2 this month",  up: true,  color: "#e1f5ee", stroke: "#2a9b6f" },
  { label: "Registered Buyers", value: "1,240",    change: "↑ 84 this month", up: true,  color: "#e8f4fd", stroke: "#1976d2" },
  { label: "Orders This Month", value: "3,812",    change: "↑ 12% vs last",   up: true,  color: "#f3e8ff", stroke: "#7c3aed" },
  { label: "Platform Revenue",  value: "GH₵ 103k", change: "↑ 18% vs last",  up: true,  color: "#fff8e1", stroke: "#ba7517" },
];

const AVATAR_COLORS = ["#e1f5ee", "#e8f4fd", "#fff8e1", "#fdecea", "#f3e8ff"];
function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* ════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════ */

export default function AdminDashboard({ defaultTab = "pharmacies" }) {
  const [tab, setTab]             = useState(defaultTab); // 'pharmacies' | 'buyers'
  const [pharmQuery, setPharmQuery] = useState("");
  const [buyerQuery, setBuyerQuery] = useState("");
  const [pharmFilter, setPharmFilter] = useState("all"); // 'all' | 'approved' | 'pending'
  const [selectedPharm, setSelectedPharm] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [pharmacies, setPharmacies] = useState(PHARMACIES);

  const filteredPharma = pharmacies.filter(p => {
    const matchQ = p.name.toLowerCase().includes(pharmQuery.toLowerCase()) ||
                   p.owner.toLowerCase().includes(pharmQuery.toLowerCase());
    const matchStatus = pharmFilter === "all" || p.status === pharmFilter;
    return matchQ && matchStatus;
  });

  const filteredBuyers = BUYERS.filter(b =>
    b.name.toLowerCase().includes(buyerQuery.toLowerCase()) ||
    b.phone.includes(buyerQuery)
  );

  function approvePharmacy(id) {
    setPharmacies(prev => prev.map(p => p.id === id ? { ...p, status: "approved" } : p));
    setSelectedPharm(prev => prev ? { ...prev, status: "approved" } : prev);
  }

  function suspendPharmacy(id) {
    setPharmacies(prev => prev.map(p => p.id === id ? { ...p, status: "suspended" } : p));
    setSelectedPharm(prev => prev ? { ...prev, status: "suspended" } : prev);
  }

  function statusColor(status) {
    if (status === "approved")  return { bg: "#e1f5ee", color: "#0c503b" };
    if (status === "pending")   return { bg: "#fff8e1", color: "#92400e" };
    if (status === "suspended") return { bg: "#fdecea", color: "#b71c1c" };
    return { bg: "#f1f5f9", color: "#475569" };
  }

  return (
    <div className="seller-dashboard">

      {/* ── Page header ── */}
      <div className="page-title">Super Admin Dashboard 🔑</div>
      <div className="page-sub">Platform overview — Mediflow Ghana</div>

      {/* ── Platform stats ── */}
      <div className="stats-grid" style={{ marginBottom: 28 }}>
        {PLATFORM_STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.color }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={s.stroke} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { key: "pharmacies", label: "🏥 Pharmacies" },
          { key: "buyers",     label: "🛒 Buyers" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "9px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14,
              border: tab === t.key ? "none" : "1.5px solid #e2e8f0",
              background: tab === t.key ? "#0c503b" : "white",
              color: tab === t.key ? "white" : "#475569",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════
          PHARMACIES TAB
      ════════════════════════════ */}
      {tab === "pharmacies" && (
        <div className="inventory-card">
          <div className="card-header">
            <div className="card-title">Registered Pharmacies ({filteredPharma.length})</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* Filter chips */}
              {["all", "approved", "pending"].map(f => (
                <button key={f} onClick={() => setPharmFilter(f)} style={{
                  padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: pharmFilter === f ? "none" : "1.5px solid #e2e8f0",
                  background: pharmFilter === f ? "#0c503b" : "white",
                  color: pharmFilter === f ? "white" : "#555",
                  cursor: "pointer", fontFamily: "inherit"
                }}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              {/* Search */}
              <div style={{ display: "flex", alignItems: "center", gap: 6,
                background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "6px 12px" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                </svg>
                <input placeholder="Search pharmacy..." value={pharmQuery}
                  onChange={e => setPharmQuery(e.target.value)}
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: "inherit", width: 160 }} />
              </div>
            </div>
          </div>

          <div className="table-scroll">
            <table className="inventory-table">
              <thead>
                <tr>
                  {["Pharmacy", "Owner", "License No.", "Location", "Drugs", "Revenue", "Status", "Joined", "Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPharma.map((p, i) => {
                  const sc = statusColor(p.status);
                  return (
                    <tr key={p.id} onClick={() => setSelectedPharm(p)} style={{ cursor: "pointer" }}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 10,
                            background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 12, color: "#0c503b", flexShrink: 0 }}>
                            {getInitials(p.name)}
                          </div>
                          <div className="drug-cell-name">{p.name}</div>
                        </div>
                      </td>
                      <td>{p.owner}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 12, color: "#475569" }}>{p.license}</td>
                      <td style={{ fontSize: 13, color: "#555" }}>{p.location}</td>
                      <td style={{ fontWeight: 600, color: "#0c503b" }}>{p.drugs}</td>
                      <td style={{ fontWeight: 600 }}>{p.revenue}</td>
                      <td>
                        <span style={{ background: sc.bg, color: sc.color, padding: "3px 10px",
                          borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "#888" }}>{p.joined}</td>
                      <td onClick={e => e.stopPropagation()}>
                        {p.status === "pending" && (
                          <button className="btn-action" onClick={() => approvePharmacy(p.id)}>Approve</button>
                        )}
                        {p.status === "approved" && (
                          <button className="btn-danger" onClick={() => suspendPharmacy(p.id)}>Suspend</button>
                        )}
                        {p.status === "suspended" && (
                          <button className="btn-action" onClick={() => approvePharmacy(p.id)}>Reinstate</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════
          BUYERS TAB
      ════════════════════════════ */}
      {tab === "buyers" && (
        <div className="customers-card">
          <div className="card-head">
            <div className="card-title">Registered Buyers ({filteredBuyers.length})</div>
            <div className="search-bar">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              <input placeholder="Search name or phone..." value={buyerQuery}
                onChange={e => setBuyerQuery(e.target.value)} />
            </div>
          </div>

          <div className="customers-table-wrap">
            <table className="customers-table">
              <thead>
                <tr>
                  {["Buyer", "Phone", "Email", "Region", "Orders", "Total Spent", "Joined", "Status"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.map((b, i) => (
                  <tr key={b.id} onClick={() => setSelectedBuyer(b)} style={{ cursor: "pointer" }}>
                    <td>
                      <div className="customer-cell">
                        <div className="avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                          {getInitials(b.name)}
                        </div>
                        <div>
                          <div className="cust-name">{b.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{b.phone}</td>
                    <td style={{ fontSize: 12, color: "#555" }}>{b.email}</td>
                    <td>{b.region}</td>
                    <td style={{ fontWeight: 600, color: "#0c503b" }}>{b.orders}</td>
                    <td style={{ fontWeight: 600 }}>{b.spent}</td>
                    <td style={{ fontSize: 12, color: "#888" }}>{b.joined}</td>
                    <td>
                      <span className={`badge badge-${b.status}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Pharmacy detail modal ── */}
      {selectedPharm && (
        <div className="modal-overlay" onClick={() => setSelectedPharm(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-avatar">{getInitials(selectedPharm.name)}</div>
              <div>
                <div className="modal-name">{selectedPharm.name}</div>
                <div className="modal-phone">{selectedPharm.location}</div>
              </div>
              <span style={{
                background: statusColor(selectedPharm.status).bg,
                color: statusColor(selectedPharm.status).color,
                padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600
              }}>
                {selectedPharm.status.charAt(0).toUpperCase() + selectedPharm.status.slice(1)}
              </span>
            </div>
            <div className="modal-section">
              <div className="modal-label">Pharmacy details</div>
              {[
                { key: "Owner",          val: selectedPharm.owner },
                { key: "License No.",    val: selectedPharm.license },
                { key: "Location",       val: selectedPharm.location },
                { key: "Drugs listed",   val: selectedPharm.drugs },
                { key: "Revenue",        val: selectedPharm.revenue },
                { key: "Joined",         val: selectedPharm.joined },
              ].map(({ key, val }) => (
                <div key={key} className="info-row">
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {selectedPharm.status === "pending" && (
                <button className="btn-action" style={{ flex: 1, padding: "10px" }}
                  onClick={() => approvePharmacy(selectedPharm.id)}>
                  ✓ Approve
                </button>
              )}
              {selectedPharm.status === "approved" && (
                <button className="btn-danger" style={{ flex: 1, padding: "10px" }}
                  onClick={() => suspendPharmacy(selectedPharm.id)}>
                  Suspend
                </button>
              )}
              <button className="close-btn" style={{ flex: 1 }} onClick={() => setSelectedPharm(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Buyer detail modal ── */}
      {selectedBuyer && (
        <div className="modal-overlay" onClick={() => setSelectedBuyer(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-avatar">{getInitials(selectedBuyer.name)}</div>
              <div>
                <div className="modal-name">{selectedBuyer.name}</div>
                <div className="modal-phone">{selectedBuyer.phone}</div>
              </div>
              <span className={`badge badge-${selectedBuyer.status}`}>
                {selectedBuyer.status.charAt(0).toUpperCase() + selectedBuyer.status.slice(1)}
              </span>
            </div>
            <div className="modal-section">
              <div className="modal-label">Buyer details</div>
              {[
                { key: "Email",        val: selectedBuyer.email },
                { key: "Region",       val: selectedBuyer.region },
                { key: "Total orders", val: selectedBuyer.orders },
                { key: "Total spent",  val: selectedBuyer.spent },
                { key: "Joined",       val: selectedBuyer.joined },
              ].map(({ key, val }) => (
                <div key={key} className="info-row">
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setSelectedBuyer(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
