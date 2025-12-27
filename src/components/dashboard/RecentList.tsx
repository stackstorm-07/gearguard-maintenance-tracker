import React from 'react';

interface Order {
  id: string;
  title: string;
  assignedTo: string;
  time: string;
  status: string;
}

const RecentList: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div style={{ 
      backgroundColor: 'var(--card-bg)', 
      padding: '20px', 
      borderRadius: 'var(--radius)', 
      height: '100%', 
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, color: 'var(--text)' }}>Work Order List</h3>
          <button style={{ border: 'none', background: 'none', color: 'var(--subtext)', cursor: 'pointer' }}>✕</button>
      </div>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px', fontSize: '14px', color: 'var(--subtext)' }}>
          <span style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '8px', cursor: 'pointer' }}>Assigned</span>
          <span style={{ cursor: 'pointer' }}>Pending</span>
          <span style={{ cursor: 'pointer' }}>Completed</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--subtext)', marginBottom: '4px' }}>
                <span>Work Order No</span>
                <span>Scheduled Time</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>
                <span>{order.id}</span>
                <span>{order.time}</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>
                <strong>{order.assignedTo}</strong>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--subtext)' }}>
               Airport Rd, Meenambakkam...
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '2px 6px', 
                  borderRadius: '4px', 
                  backgroundColor: order.status === 'High' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(217, 119, 6, 0.1)', // Semi-transparent for dark mode support
                  color: order.status === 'High' ? '#dc2626' : '#d97706' 
                }}>
                    {order.status}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer' }}>View Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;