import { useState } from "react";
import "../Styles/Seller_Dashboard.css";

/* ── Mock data — replace with API call ── */
const INITIAL_DRUGS = [
  {
    id: 1,
    name: "Paracetamol",
    generic: "Acetaminophen 500mg",
    category: "Painkiller",
    price: 3.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Metformin",
    generic: "Metformin HCl 500mg",
    category: "Diabetes",
    price: 12.0,
    inStock: true,
  },
  {
    id: 3,
    name: "Artemether",
    generic: "Artemether/Lumefantrine",
    category: "Malaria",
    price: 22.5,
    inStock: true,
  },
  {
    id: 4,
    name: "Omeprazole",
    generic: "Omeprazole 20mg caps",
    category: "Antacid",
    price: 8.5,
    inStock: false,
  },
  {
    id: 5,
    name: "Amoxicillin",
    generic: "Amoxicillin 250mg caps",
    category: "Antibiotic",
    price: 18.0,
    inStock: false,
  },
];

const EMPTY_FORM = {
  name: "",
  generic: "",
  category: "",
  price: "",
  inStock: true,
};

const FORM_FIELDS = [
  {
    label: "Drug name",
    key: "name",
    type: "text",
    placeholder: "e.g. Paracetamol",
  },
  {
    label: "Generic name",
    key: "generic",
    type: "text",
    placeholder: "e.g. Acetaminophen 500mg",
  },
  {
    label: "Category",
    key: "category",
    type: "text",
    placeholder: "e.g. Painkiller",
  },
  {
    label: "Price (GH₵)",
    key: "price",
    type: "number",
    placeholder: "e.g. 4.50",
  },
];

/* ── Icons ── */

function ChartIcon({ color }) {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
           002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2
           2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2
           2 0 01-2-2z"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

/* ── Sub-components ── */

function StatCard({ label, value, change, up, iconColorClass, iconStroke }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconColorClass}`}>
        <ChartIcon color={iconStroke} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${up ? "up" : "down"}`}>{change}</div>
    </div>
  );
}

function DrugRow({ drug, onEdit, onRemove, onToggleStock }) {
  return (
    <tr>
      <td className="inventory-table td">
        <div className="drug-cell-name">{drug.name}</div>
        <div className="drug-cell-generic">{drug.generic}</div>
      </td>
      <td>{drug.category}</td>
      <td className="td-price">{parseFloat(drug.price).toFixed(2)}</td>
      <td>
        <span
          className={drug.inStock ? "badge-in-stock" : "badge-out-of-stock"}
          onClick={() => onToggleStock(drug.id)}
          title="Click to toggle stock"
        >
          <div className={drug.inStock ? "dot-in" : "dot-out"} />
          {drug.inStock ? "In stock" : "Out of stock"}
        </span>
      </td>
      <td>
        <button className="btn-action" onClick={() => onEdit(drug)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => onRemove(drug.id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

/* ── Main component ── */

export default function SellerDashboard() {
  const [drugs, setDrugs] = useState(INITIAL_DRUGS);
  const [showModal, setShowModal] = useState(false);
  const [editDrug, setEditDrug] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const inStockCount = drugs.filter((d) => d.inStock).length;
  const outOfStockCount = drugs.length - inStockCount;
  const stockPercent = drugs.length
    ? Math.round((inStockCount / drugs.length) * 100)
    : 0;

  /* ── Modal helpers ── */

  function openAdd() {
    setEditDrug(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(drug) {
    setEditDrug(drug);
    setForm({
      name: drug.name,
      generic: drug.generic,
      category: drug.category,
      price: drug.price,
      inStock: drug.inStock,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name || !form.price) return;
    if (editDrug) {
      setDrugs((prev) =>
        prev.map((d) =>
          d.id === editDrug.id
            ? { ...d, ...form, price: parseFloat(form.price) }
            : d,
        ),
      );
    } else {
      setDrugs((prev) => [
        ...prev,
        { id: Date.now(), ...form, price: parseFloat(form.price) },
      ]);
    }
    setShowModal(false);
  }

  function handleRemove(id) {
    setDrugs((prev) => prev.filter((d) => d.id !== id));
  }
  function toggleStock(id) {
    setDrugs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, inStock: !d.inStock } : d)),
    );
  }
  function updateForm(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  /* ── Stat data ── */
  const STATS = [
    {
      label: "Total drugs",
      value: drugs.length,
      change: "↑ 2 this week",
      up: true,
      iconColorClass: "green",
      iconStroke: "#2a9b6f",
    },
    {
      label: "In stock",
      value: inStockCount,
      change: `${stockPercent}% of listings`,
      up: true,
      iconColorClass: "green",
      iconStroke: "#2a9b6f",
    },
    {
      label: "Out of stock",
      value: outOfStockCount,
      change: "Needs restocking",
      up: false,
      iconColorClass: "red",
      iconStroke: "#e53935",
    },
    {
      label: "Profile views",
      value: 142,
      change: "↑ 18% this week",
      up: true,
      iconColorClass: "blue",
      iconStroke: "#1976d2",
    },
  ];

  return (
    <div className="seller-dashboard">
      <div className="page-title">Good morning, HealthPlus 👋</div>
      <div className="page-sub">Here's your pharmacy overview for today</div>

      {/* ── Stats ── */}
      <div className="stats-grid">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* ── Drug inventory table ── */}
      <div className="inventory-card">
        <div className="card-header">
          <div className="card-title">Drug inventory</div>
          <button className="btn-add" onClick={openAdd}>
            <PlusIcon /> Add drug
          </button>
        </div>

        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                {[
                  "Drug name",
                  "Category",
                  "Price (GH₵)",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <DrugRow
                  key={drug.id}
                  drug={drug}
                  onEdit={openEdit}
                  onRemove={handleRemove}
                  onToggleStock={toggleStock}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              {editDrug ? "Edit drug" : "Add new drug"}
            </div>

            {FORM_FIELDS.map(({ label, key, type, placeholder }) => (
              <div key={key} className="field">
                <label>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => updateForm(key, e.target.value)}
                />
              </div>
            ))}

            <div className="field">
              <label>Stock status</label>
              <select
                value={form.inStock ? "true" : "false"}
                onChange={(e) =>
                  updateForm("inStock", e.target.value === "true")
                }
              >
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
              </select>
            </div>

            <div className="modal-btns">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                {editDrug ? "Save changes" : "Add drug"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
