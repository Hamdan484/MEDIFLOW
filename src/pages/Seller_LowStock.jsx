import { useState } from "react";
import "../Styles/Seller_Dashboard.css";

const LOW_STOCK_DATA = [
  { id: 3, name: "Artemether",    generic: "Artemether/Lumefantrine",category: "Malaria",    price: 22.5, stockCount: 12, threshold: 20 },
  { id: 4, name: "Omeprazole",    generic: "Omeprazole 20mg caps", category: "Antacid",    price: 8.5,  stockCount: 5,  threshold: 25 },
  { id: 5, name: "Amoxicillin",   generic: "Amoxicillin 250mg caps",category: "Antibiotic", price: 18.0, stockCount: 0,  threshold: 50 },
];

export default function SellerLowStock() {
  return (
    <div className="seller-dashboard">
      <div className="page-title">Low Stock Alerts ⚠️</div>
      <div className="page-sub">Drugs that are below your set reorder threshold</div>

      <div className="inventory-card" style={{ border: '1.5px solid #fecaca' }}>
        <div className="card-header" style={{ background: '#fef2f2' }}>
          <div className="card-title" style={{ color: '#b91c1c' }}>Critical Stock Warnings</div>
        </div>
        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Current Stock</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {LOW_STOCK_DATA.map(drug => (
                <tr key={drug.id}>
                  <td>
                    <div className="drug-cell-name">{drug.name}</div>
                    <div className="drug-cell-generic">{drug.generic}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: drug.stockCount === 0 ? '#b71c1c' : '#ea580c' }}>
                    {drug.stockCount} units
                  </td>
                  <td style={{ color: '#64748b' }}>{drug.threshold} units</td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                      background: drug.stockCount === 0 ? '#fdecea' : '#fff7ed',
                      color: drug.stockCount === 0 ? '#b71c1c' : '#9a3412'
                    }}>
                      {drug.stockCount === 0 ? "Out of Stock" : "Low Stock"}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action" style={{ background: '#0c503b', color: 'white', border: 'none' }}>Order Stock</button>
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
