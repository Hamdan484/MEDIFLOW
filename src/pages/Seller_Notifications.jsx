import "../Styles/Seller_Dashboard.css";

const NOTIFS = [
  { id: 1, title: "New Order Received", body: "Kofi Asante ordered 2x Paracetamol", time: "2 mins ago", icon: "🛒", color: "#e8f4fd" },
  { id: 2, title: "Low Stock Alert", body: "Artemether is below 15 units", time: "1 hour ago", icon: "⚠️", color: "#fff7ed" },
  { id: 3, title: "Payment Confirmed", body: "Order #ORD-9279 payment received", time: "Yesterday", icon: "💰", color: "#e1f5ee" },
  { id: 4, title: "New Customer", body: "Yaw Darko just registered at your pharmacy", time: "2 days ago", icon: "👤", color: "#f3e8ff" },
];

export default function SellerNotifications() {
  return (
    <div className="seller-dashboard">
      <div className="page-title">Notifications</div>
      <div className="page-sub">Stay updated with your pharmacy activity</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
        {NOTIFS.map(n => (
          <div key={n.id} style={{ 
            background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #eee',
            display: 'flex', gap: '16px', alignItems: 'center'
          }}>
            <div style={{ 
              width: '44px', height: '44px', borderRadius: '12px', background: n.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
            }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>{n.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{n.body}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 500 }}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
