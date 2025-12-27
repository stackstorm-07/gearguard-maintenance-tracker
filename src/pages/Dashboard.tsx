import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import RecentList from '../components/dashboard/RecentList';

// MOCK DATA
const stats = [
  { label: 'Total Requests', value: 102, color: '#e0f2fe', textColor: '#0284c7' }, 
  { label: 'Open', value: 12, color: '#dcfce7', textColor: '#16a34a' }, 
  { label: 'Assigned', value: 383, color: '#f3e8ff', textColor: '#9333ea' }, 
  { label: 'Overdue', value: 5, color: '#fee2e2', textColor: '#dc2626' } 
];

const workOrders = [
  { id: 'WO-50681', title: 'CNC Machine Repair', assignedTo: 'Amir Mohammad', time: '01:18 pm', status: 'Medium' },
  { id: 'WO-50680', title: 'Laptop Screen Fix', assignedTo: 'John Doe', time: '01:16 pm', status: 'High' },
  { id: 'WO-50676', title: 'Generator Service', assignedTo: 'Amir Mohammad', time: '01:06 pm', status: 'High' },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--bg)', minHeight: '100vh', transition: 'background 0.3s ease' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--text)' }}>Dashboard</h2>
      
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
          
          {/* Chart Placeholder 1 */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
             <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'var(--text)' }}>Maintenance Leads</h3>
             <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '80%', backgroundColor: 'var(--subtext)', borderRadius: '4px', opacity: 0.5 }}></div>
                <div style={{ width: '40px', height: '60%', backgroundColor: 'var(--subtext)', borderRadius: '4px', opacity: 0.7 }}></div>
                <div style={{ width: '40px', height: '30%', backgroundColor: 'var(--subtext)', borderRadius: '4px', opacity: 0.3 }}></div>
                <div style={{ width: '40px', height: '50%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
             </div>
             <p style={{ fontSize: '12px', color: 'var(--subtext)', marginTop: '10px' }}>Open • Processing • Closed • Won</p>
          </div>

           {/* Chart Placeholder 2 */}
           <div style={{ backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
             <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: 'var(--text)' }}>Asset Health</h3>
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '10px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'var(--text)' }}>98%</span>
                </div>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div>
           <RecentList orders={workOrders} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;