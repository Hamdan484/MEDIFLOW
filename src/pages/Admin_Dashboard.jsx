import { useState } from "react";
import "../Styles/Buyer_Dashboard.css"; // Reuse dashboard styles

const MOCK_PHARMACIES = [
  { id: 1, name: "HealthPlus Pharmacy", location: "Bantama, Kumasi", status: "Verified", sales: "GH₵ 12,400" },
  { id: 2, name: "City Care Drugs", location: "Adum, Kumasi", status: "Pending", sales: "GH₵ 0" },
  { id: 3, name: "Unity Pharmacy", location: "East Legon, Accra", status: "Verified", sales: "GH₵ 45,200" },
];

const MOCK_BUYERS = [
  { id: 1, name: "Hamdan Ibrahim", phone: "0597788861", orders: 12, spent: "GH₵ 1,250" },
  { id: 2, name: "Kofi Asante", phone: "0241234567", orders: 5, spent: "GH₵ 420" },
  { id: 3, name: "Ama Serwaa", phone: "0209876543", orders: 22, spent: "GH₵ 3,800" },
];

export default function AdminDashboard() {
  return (
    <div className="dashboard-page" style={{padding: '20px'}}>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Command Center</h1>
          <p className="dashboard-sub">Manage platform users and pharmacy verifications</p>
        </div>
      </div>

      <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Total Pharmacies</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2a9b6f'}}>{MOCK_PHARMACIES.length}</div>
        </div>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Total Buyers</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2a9b6f'}}>{MOCK_BUYERS.length}</div>
        </div>
        <div className="stat-card" style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <div style={{color: '#64748b', fontSize: '14px'}}>Pending Approvals</div>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#f59e0b'}}>1</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        {/* Pharmacies Table */}
        <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <h3 style={{marginBottom: '15px'}}>Registered Pharmacies</h3>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{textAlign: 'left', color: '#64748b', borderBottom: '1px solid #eee'}}>
                <th style={{padding: '10px 0'}}>Name</th>
                <th>Status</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PHARMACIES.map(p => (
                <tr key={p.id} style={{borderBottom: '1px solid #f8fafc'}}>
                  <td style={{padding: '12px 0'}}>
                    <div style={{fontWeight: '500'}}>{p.name}</div>
                    <div style={{fontSize: '11px', color: '#94a3b8'}}>{p.location}</div>
                  </td>
                  <td><span style={{padding: '4px 8px', borderRadius: '4px', fontSize: '11px', background: p.status === 'Verified' ? '#ecfdf5' : '#fff7ed', color: p.status === 'Verified' ? '#059669' : '#d97706'}}>{p.status}</span></td>
                  <td style={{fontWeight: '500'}}>{p.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buyers Table */}
        <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee'}}>
          <h3 style={{marginBottom: '15px'}}>Top Buyers</h3>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{textAlign: 'left', color: '#64748b', borderBottom: '1px solid #eee'}}>
                <th style={{padding: '10px 0'}}>User</th>
                <th>Orders</th>
                <th>Spent</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BUYERS.map(b => (
                <tr key={b.id} style={{borderBottom: '1px solid #f8fafc'}}>
                  <td style={{padding: '12px 0'}}>
                    <div style={{fontWeight: '500'}}>{b.name}</div>
                    <div style={{fontSize: '11px', color: '#94a3b8'}}>{b.phone}</div>
                  </td>
                  <td>{b.orders}</td>
                  <td style={{fontWeight: '500'}}>{b.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
