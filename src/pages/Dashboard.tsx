import React from 'react';

const Dashboard = () => {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '24px' }}>Dashboard</h1>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* 1. Critical Equipment (Red) */}
        <div className="card" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}>
          <h3 style={{ color: '#991b1b', margin: '0 0 10px' }}>Critical Equipment</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7f1d1d' }}>5 Units</div>
          <p style={{ margin: '5px 0 0', color: '#b91c1c', fontSize: '14px' }}>Health &lt; 30% (Action Required)</p>
        </div>

        {/* 2. Technician Load (Blue) */}
        <div className="card" style={{ backgroundColor: '#eff6ff', borderColor: '#93c5fd' }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 10px' }}>Technician Load</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a' }}>85%</div>
          <p style={{ margin: '5px 0 0', color: '#1d4ed8', fontSize: '14px' }}>Workforce Utilization</p>
        </div>

        {/* 3. Open Requests (Green) */}
        <div className="card" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac' }}>
          <h3 style={{ color: '#166534', margin: '0 0 10px' }}>Open Requests</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#14532d' }}>12 Pending</div>
              <div style={{ fontSize: '14px', color: '#15803d' }}>Active Tasks</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>3</div>
              <div style={{ fontSize: '14px', color: '#991b1b' }}>Overdue</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;