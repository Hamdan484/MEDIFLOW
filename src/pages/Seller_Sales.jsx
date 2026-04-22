import { useState } from "react";
import "../Styles/Seller_Dashboard.css";

const SALES_DATA = [
  { id: "ORD-9281", customer: "Kofi Asante",    items: "Paracetamol (2), ORS (1)", amount: 15.6, status: "completed", time: "10:32 AM" },
  { id: "ORD-9280", customer: "Ama Boateng",    items: "Artemether (1)",           amount: 22.5, status: "pending",   time: "09:15 AM" },
  { id: "ORD-9279", customer: "Yaw Darko",      items: "Metformin (3)",            amount: 36.0, status: "completed", time: "Yesterday" },
  { id: "ORD-9278", customer: "Kwame Mensah",   items: "Amlodipine (1)",           amount: 15.2, status: "cancelled", time: "Yesterday" },
  { id: "ORD-9277", customer: "Akosua Owusu",   items: "Ibuprofen (2)",            amount: 11.0, status: "completed", time: "2 days ago" },
];

export default function SellerSales() {
  return (
    <div className="seller-dashboard">
      <div className="page-title">Sales Tracking</div>
      <div className="page-sub">Monitor your revenue and order history</div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Daily Revenue</div>
          <div className="stat-value">GH₵ 342.50</div>
          <div className="stat-change up">↑ 12% from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">128</div>
          <div className="stat-change up">↑ 8 new today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Order Value</div>
          <div className="stat-value">GH₵ 42.10</div>
          <div className="stat-change down">↓ 2% from last week</div>
        </div>
      </div>

      <div className="inventory-card">
        <div className="card-header">
          <div className="card-title">Recent Orders</div>
        </div>
        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {SALES_DATA.map(sale => (
                <tr key={sale.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#64748b' }}>{sale.id}</td>
                  <td style={{ fontWeight: 600 }}>{sale.customer}</td>
                  <td style={{ fontSize: '13px', color: '#555' }}>{sale.items}</td>
                  <td style={{ fontWeight: 700, color: '#0c503b' }}>GH₵ {sale.amount.toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                      background: sale.status === 'completed' ? '#e1f5ee' : (sale.status === 'pending' ? '#fff8e1' : '#fdecea'),
                      color: sale.status === 'completed' ? '#0c503b' : (sale.status === 'pending' ? '#92400e' : '#b71c1c')
                    }}>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#888' }}>{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
