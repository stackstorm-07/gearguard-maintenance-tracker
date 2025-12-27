// src/components/dashboard/RecentList.tsx
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
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 style={{ margin: 0 }}>Work Order List</h3>
          <button style={{ border: 'none', background: 'none', color: '#6b7280', cursor: 'pointer' }}>✕</button>
      </div>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', fontSize: '14px', color: '#6b7280' }}>
          <span style={{ color: '#10b981', borderBottom: '2px solid #10b981', paddingBottom: '8px', cursor: 'pointer' }}>Assigned</span>
          <span style={{ cursor: 'pointer' }}>Pending</span>
          <span style={{ cursor: 'pointer' }}>Completed</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                <span>Work Order No</span>
                <span>Scheduled Time</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                <span>{order.id}</span>
                <span>{order.time}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                <strong>{order.assignedTo}</strong>
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
               Airport Rd, Meenambakkam...
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: order.status === 'High' ? '#fee2e2' : '#fef3c7', color: order.status === 'High' ? '#dc2626' : '#d97706' }}>
                    {order.status}
                </span>
                <span style={{ fontSize: '12px', color: '#10b981', cursor: 'pointer' }}>View Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;