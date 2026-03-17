import { useState } from "react";

const INITIAL_DRUGS = [
  { id: 1, name: "Paracetamol",  generic: "Acetaminophen 500mg",    category: "Painkiller", price: 3.80,  inStock: true },
  { id: 2, name: "Metformin",    generic: "Metformin HCl 500mg",    category: "Diabetes",   price: 12.00, inStock: true },
  { id: 3, name: "Artemether",   generic: "Artemether/Lumefantrine", category: "Malaria",    price: 22.50, inStock: true },
  { id: 4, name: "Omeprazole",   generic: "Omeprazole 20mg caps",   category: "Antacid",    price: 8.50,  inStock: false },
  { id: 5, name: "Amoxicillin",  generic: "Amoxicillin 250mg caps", category: "Antibiotic", price: 18.00, inStock: false },
]

const s = {
  pageTitle: { fontSize: "22px", fontWeight: 700, color: "#111", marginBottom: "4px", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  pageSub: { fontSize: "14px", color: "#888", marginBottom: "24px", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "24px" },
  statCard: { background: "white", borderRadius: "16px", padding: "18px", border: "1px solid #eee" },
  statIcon: (bg) => ({ width: "40px", height: "40px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }),
  statLabel: { fontSize: "12px", color: "#888", marginBottom: "4px" },
  statValue: { fontSize: "26px", fontWeight: 700, color: "#111", lineHeight: 1 },
  statChange: (up) => ({ fontSize: "12px", color: up ? "#2a9b6f" : "#e53935", marginTop: "6px" }),
  card: { background: "white", borderRadius: "16px", border: "1px solid #eee", overflow: "hidden", marginBottom: "16px" },
  cardHeader: { padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: "15px", fontWeight: 700, color: "#111" },
  btnAdd: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px 20px", textAlign: "left", fontSize: "12px", color: "#aaa", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", background: "#fafafa", borderBottom: "1px solid #f0f0f0" },
  td: { padding: "14px 20px", fontSize: "14px", color: "#333", borderBottom: "1px solid #f5f5f5" },
  drugCell: { fontWeight: 600, color: "#111" },
  drugGeneric: { fontSize: "12px", color: "#888", fontWeight: 400 },
  badgeIn: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: "#e1f5ee", color: "#0c503b", fontWeight: 500, cursor: "pointer" },
  badgeOut: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: "#fdecea", color: "#b71c1c", fontWeight: 500, cursor: "pointer" },
  dotIn: { width: "6px", height: "6px", borderRadius: "50%", background: "#2a9b6f" },
  dotOut: { width: "6px", height: "6px", borderRadius: "50%", background: "#e53935" },
  actionBtn: { padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", border: "1px solid #e0e0e0", background: "white", color: "#555", marginRight: "4px" },
  dangerBtn: { padding: "5px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", border: "1px solid #fecaca", background: "white", color: "#e53935" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modal: { background: "white", borderRadius: "20px", padding: "28px", width: "100%", maxWidth: "420px", margin: "0 16px" },
  modalTitle: { fontSize: "18px", fontWeight: 700, color: "#111", marginBottom: "20px" },
  field: { marginBottom: "14px" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, color: "#444", marginBottom: "6px" },
  input: { width: "100%", padding: "11px 14px", border: "1.5px solid #e0e0e0", borderRadius: "12px", fontSize: "14px", color: "#111", background: "#fafafa", outline: "none", fontFamily: "inherit" },
  modalBtns: { display: "flex", gap: "10px", marginTop: "20px" },
  btnSave: { flex: 1, padding: "12px", background: "#2a9b6f", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  btnCancel: { flex: 1, padding: "12px", background: "white", color: "#555", border: "1px solid #e0e0e0", borderRadius: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
}

export default function SellerDashboard() {
  const [drugs, setDrugs] = useState(INITIAL_DRUGS)
  const [showModal, setShowModal] = useState(false)
  const [editDrug, setEditDrug] = useState(null)
  const [form, setForm] = useState({ name: "", generic: "", category: "", price: "", inStock: true })

  const inStockCount = drugs.filter((d) => d.inStock).length

  function openAdd() {
    setEditDrug(null)
    setForm({ name: "", generic: "", category: "", price: "", inStock: true })
    setShowModal(true)
  }

  function openEdit(drug) {
    setEditDrug(drug)
    setForm({ name: drug.name, generic: drug.generic, category: drug.category, price: drug.price, inStock: drug.inStock })
    setShowModal(true)
  }

  function handleSave() {
    if (!form.name || !form.price) return
    if (editDrug) {
      setDrugs(drugs.map((d) => d.id === editDrug.id ? { ...d, ...form, price: parseFloat(form.price) } : d))
    } else {
      setDrugs([...drugs, { id: Date.now(), ...form, price: parseFloat(form.price) }])
    }
    setShowModal(false)
  }

  function handleRemove(id) { setDrugs(drugs.filter((d) => d.id !== id)) }
  function toggleStock(id) { setDrugs(drugs.map((d) => d.id === id ? { ...d, inStock: !d.inStock } : d)) }

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <div style={s.pageTitle}>Good morning, HealthPlus 👋</div>
      <div style={s.pageSub}>Here's your pharmacy overview for today</div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {[
          { label: "Total drugs",   value: drugs.length,           change: "↑ 2 this week",     up: true,  iconBg: "#e1f5ee", iconColor: "#2a9b6f" },
          { label: "In stock",      value: inStockCount,           change: `${Math.round(inStockCount / drugs.length * 100)}% of listings`, up: true, iconBg: "#e1f5ee", iconColor: "#2a9b6f" },
          { label: "Out of stock",  value: drugs.length - inStockCount, change: "Needs restocking", up: false, iconBg: "#fdecea", iconColor: "#e53935" },
          { label: "Profile views", value: 142,                    change: "↑ 18% this week",   up: true,  iconBg: "#e8f4fd", iconColor: "#1976d2" },
        ].map((stat) => (
          <div key={stat.label} style={s.statCard}>
            <div style={s.statIcon(stat.iconBg)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={stat.iconColor} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div style={s.statLabel}>{stat.label}</div>
            <div style={s.statValue}>{stat.value}</div>
            <div style={s.statChange(stat.up)}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div style={s.cardTitle}>Drug inventory</div>
          <button style={s.btnAdd} onClick={openAdd}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add drug
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={s.table}>
            <thead>
              <tr>{["Drug name","Category","Price (GH₵)","Status","Actions"].map((h) => <th key={h} style={s.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug.id}>
                  <td style={s.td}><div style={s.drugCell}>{drug.name}</div><div style={s.drugGeneric}>{drug.generic}</div></td>
                  <td style={s.td}>{drug.category}</td>
                  <td style={{ ...s.td, fontWeight: 600, color: "#0c503b" }}>{parseFloat(drug.price).toFixed(2)}</td>
                  <td style={s.td}>
                    <span style={drug.inStock ? s.badgeIn : s.badgeOut} onClick={() => toggleStock(drug.id)} title="Click to toggle">
                      <div style={drug.inStock ? s.dotIn : s.dotOut} />
                      {drug.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button style={s.actionBtn} onClick={() => openEdit(drug)}>Edit</button>
                    <button style={s.dangerBtn} onClick={() => handleRemove(drug.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalTitle}>{editDrug ? "Edit drug" : "Add new drug"}</div>
            {[
              { label: "Drug name",    key: "name",     type: "text",   placeholder: "e.g. Paracetamol" },
              { label: "Generic name", key: "generic",  type: "text",   placeholder: "e.g. Acetaminophen 500mg" },
              { label: "Category",     key: "category", type: "text",   placeholder: "e.g. Painkiller" },
              { label: "Price (GH₵)",  key: "price",    type: "number", placeholder: "e.g. 4.50" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} style={s.field}>
                <label style={s.label}>{label}</label>
                <input style={s.input} type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Stock status</label>
              <select style={s.input} value={form.inStock ? "true" : "false"} onChange={(e) => setForm({ ...form, inStock: e.target.value === "true" })}>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
              </select>
            </div>
            <div style={s.modalBtns}>
              <button style={s.btnCancel} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={s.btnSave} onClick={handleSave}>{editDrug ? "Save changes" : "Add drug"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}