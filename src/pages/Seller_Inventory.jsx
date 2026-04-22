import { useState } from "react";
import "../Styles/Seller_Dashboard.css";

/* ── Mock data ── */
const INITIAL_DRUGS = [
  { id: 1, name: "Paracetamol",   generic: "Acetaminophen 500mg", category: "Painkiller",  price: 3.8,  inStock: true,  stockCount: 120 },
  { id: 2, name: "Metformin",     generic: "Metformin HCl 500mg",  category: "Diabetes",    price: 12.0, inStock: true,  stockCount: 45 },
  { id: 3, name: "Artemether",    generic: "Artemether/Lumefantrine",category: "Malaria",    price: 22.5, inStock: true,  stockCount: 12 },
  { id: 4, name: "Omeprazole",    generic: "Omeprazole 20mg caps", category: "Antacid",    price: 8.5,  inStock: false, stockCount: 0 },
  { id: 5, name: "Amoxicillin",   generic: "Amoxicillin 250mg caps",category: "Antibiotic", price: 18.0, inStock: false, stockCount: 0 },
  { id: 6, name: "Amlodipine",    generic: "Amlodipine 5mg tabs",   category: "Hypertension",price: 15.2, inStock: true,  stockCount: 30 },
  { id: 7, name: "Ibuprofen",     generic: "Ibuprofen 400mg tabs",  category: "Painkiller",  price: 5.5,  inStock: true,  stockCount: 85 },
];

export default function SellerInventory() {
  const [drugs, setDrugs] = useState(INITIAL_DRUGS);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'instock', 'outofstock'

  const filtered = drugs.filter(d => {
    const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.generic.toLowerCase().includes(query.toLowerCase());
    const matchF = filter === "all" ? true : (filter === "instock" ? d.inStock : !d.inStock);
    return matchQ && matchF;
  });

  return (
    <div className="seller-dashboard">
      <div className="page-title">Inventory Management</div>
      <div className="page-sub">Manage your drug listings and stock levels</div>

      <div className="inventory-card">
        <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
             <div className="card-title">All Drugs ({filtered.length})</div>
             <button className="btn-add">+ Add New Drug</button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 12px' }}>
               <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
               </svg>
               <input 
                 placeholder="Search by name or generic..." 
                 value={query} 
                 onChange={e => setQuery(e.target.value)}
                 style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', width: '100%' }}
               />
            </div>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' }}
            >
              <option value="all">All Status</option>
              <option value="instock">In Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Drug Details</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price (GH₵)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(drug => (
                <tr key={drug.id}>
                  <td>
                    <div className="drug-cell-name">{drug.name}</div>
                    <div className="drug-cell-generic">{drug.generic}</div>
                  </td>
                  <td>{drug.category}</td>
                  <td style={{ fontWeight: 600 }}>{drug.stockCount} units</td>
                  <td className="td-price">{drug.price.toFixed(2)}</td>
                  <td>
                    <span className={drug.inStock ? "badge-in-stock" : "badge-out-of-stock"}>
                      <div className={drug.inStock ? "dot-in" : "dot-out"} />
                      {drug.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action">Edit</button>
                    <button className="btn-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
