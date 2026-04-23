import { useState } from "react";
import "../Styles/Buyer_Dashboard.css";

const MOCK_SALES = [
  { id: 1, drug: "Paracetamol", qty: 12, total: "GH₵ 45.60", time: "2 mins ago" },
  { id: 2, drug: "Amoxicillin", qty: 2, total: "GH₵ 30.00", time: "15 mins ago" },
  { id: 3, drug: "Artemether", qty: 1, total: "GH₵ 22.50", time: "1 hour ago" },
];

export default function SellerDashboard() {
  return (
    <div className="dashboard-page" style={{padding: '20px'}}>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Pharmacy Dashboard</h1>
          <p className="dashboard-sub">Monitor your sales and inventory in real-time</p>
        </div>
        <button className="btn-primary" style={{padding: '10px 20px', fontSize: '14px'}}>Add New Drug</button>
      </div>

      <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Today's Sales</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2a9b6f'}}>GH₵ 1,240.00</div>
          <div style={{fontSize: '12px', color: '#059669', marginTop: '4px'}}>↑ 12% from yesterday</div>
        </div>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Orders Pending</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2a9b6f'}}>8</div>
        </div>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Low Stock Alerts</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#ef4444'}}>3</div>
        </div>
      </div>

      <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
        <h3 style={{marginBottom: '15px'}}>Recent Transactions</h3>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{textAlign: 'left', color: '#64748b', borderBottom: '1px solid #eee'}}>
              <th style={{padding: '10px 0'}}>Drug Name</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SALES.map(sale => (
              <tr key={sale.id} style={{borderBottom: '1px solid #f8fafc'}}>
                <td style={{padding: '12px 0', fontWeight: '500'}}>{sale.drug}</td>
                <td>{sale.qty}</td>
                <td style={{fontWeight: '500'}}>{sale.total}</td>
                <td style={{color: '#94a3b8', fontSize: '13px'}}>{sale.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
