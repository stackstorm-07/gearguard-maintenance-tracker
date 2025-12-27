// src/pages/Dashboard.tsx

import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import RecentList from '../components/dashboard/RecentList';

// MOCK DATA based on GearGuard PDF [cite: 8, 26]
const stats = [
  { label: 'Total Requests', value: 102, color: '#e0f2fe', textColor: '#0284c7' }, // Blue
  { label: 'Open', value: 12, color: '#dcfce7', textColor: '#16a34a' }, // Green
  { label: 'Assigned', value: 383, color: '#f3e8ff', textColor: '#9333ea' }, // Purple
  { label: 'Overdue', value: 5, color: '#fee2e2', textColor: '#dc2626' } // Red
];

// Mocking "Work Orders" from your reference image [cite: 27]
const workOrders = [
  { id: 'WO-50681', title: 'CNC Machine Repair', assignedTo: 'Amir Mohammad', time: '01:18 pm', status: 'Medium' },
  { id: 'WO-50680', title: 'Laptop Screen Fix', assignedTo: 'John Doe', time: '01:16 pm', status: 'High' },
  { id: 'WO-50676', title: 'Generator Service', assignedTo: 'Amir Mohammad', time: '01:06 pm', status: 'High' },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Dashboard</h2>
      
      {/* TOP STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* LEFT COLUMN: Charts/Graphs placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Chart Placeholder 1: Requests Overview */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
             <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Maintenance Leads</h3>
             {/* Simple CSS Bar Chart Mockup to avoid installing chart libraries */}
             <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                <div style={{ width: '40px', height: '80%', backgroundColor: '#374151', borderRadius: '4px' }}></div>
                <div style={{ width: '40px', height: '60%', backgroundColor: '#4b5563', borderRadius: '4px' }}></div>
                <div style={{ width: '40px', height: '30%', backgroundColor: '#9ca3af', borderRadius: '4px' }}></div>
                <div style={{ width: '40px', height: '50%', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
             </div>
             <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '10px' }}>Open • Processing • Closed • Won</p>
          </div>

           {/* Chart Placeholder 2: Equipment Status */}
           <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
             <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Asset Health</h3>
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '10px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>98%</span>
                </div>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Work Orders (The Side Panel in your image) */}
        <div>
           <RecentList orders={workOrders} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;