import React, { useState } from 'react';
import { MaintenanceRequest } from '../types';

// --- MOCK DATA: ALL HISTORY (Active + Completed) ---
const MOCK_HISTORY: MaintenanceRequest[] = [
  { 
    id: 'REQ-001', subject: 'Conveyor Belt Snap', equipmentId: 'Conv-01', 
    stage: 'Repaired', type: 'Corrective', duration: 4, 
    requestDate: '2024-12-01', scheduledDate: '2024-12-02', 
    teamId: 'Internal Maintenance', technicianId: 'Marc Demo', priority: 'High', 
    createdBy: 'Admin', maintenanceFor: 'Equipment', category: 'Belts', company: 'My Company'
  },
  { 
    id: 'REQ-002', subject: 'Monthly Oil Change', equipmentId: 'Gen-X2', 
    stage: 'Repaired', type: 'Preventive', duration: 1.5, 
    requestDate: '2024-12-05', scheduledDate: '2024-12-05', 
    teamId: 'Internal Maintenance', technicianId: 'Anas Makari', priority: 'Low',
    createdBy: 'Admin', maintenanceFor: 'Equipment', category: 'Generators', company: 'My Company'
  },
  { 
    id: 'REQ-003', subject: 'Screen Flicker', equipmentId: 'Mon-15', 
    stage: 'Scrap', type: 'Corrective', duration: 0, 
    requestDate: '2024-12-10', scheduledDate: '2024-12-11', 
    teamId: 'IT Support', technicianId: 'Mitchel Admin', priority: 'Low',
    createdBy: 'Admin', maintenanceFor: 'Equipment', category: 'Electronics', company: 'My Company'
  },
  { 
    id: 'REQ-004', subject: 'Hydraulic Leak', equipmentId: 'Press-09', 
    stage: 'In Progress', type: 'Corrective', duration: 0, 
    requestDate: '2024-12-28', scheduledDate: '2024-12-28', 
    teamId: 'Internal Maintenance', technicianId: 'Marc Demo', priority: 'High',
    createdBy: 'Admin', maintenanceFor: 'Equipment', category: 'Hydraulics', company: 'My Company'
  }
];

const ReportingPage = () => {
  const [filter, setFilter] = useState<'All' | 'Repaired' | 'Scrap'>('All');

  // 1. DATA PROCESSING FOR KPI
  const completedTickets = MOCK_HISTORY.filter(t => t.stage === 'Repaired' || t.stage === 'Scrap');
  const totalDuration = completedTickets.reduce((acc, curr) => acc + curr.duration, 0);
  const avgDuration = completedTickets.length ? (totalDuration / completedTickets.length).toFixed(1) : 0;
  
  // Count by Type
  const preventiveCount = MOCK_HISTORY.filter(t => t.type === 'Preventive').length;
  const correctiveCount = MOCK_HISTORY.filter(t => t.type === 'Corrective').length;

  // 2. FILTER LOGIC FOR TABLE
  const tableData = filter === 'All' 
    ? completedTickets 
    : completedTickets.filter(t => t.stage === filter);

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      <h1 style={{ margin: '0 0 24px 0', fontSize: '24px', color: '#1f2937' }}>Reporting & Analytics</h1>

      {/* --- KPI SECTION (Visuals) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        {/* KPI 1 */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px' }}>Maintenance Velocity</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{completedTickets.length} Tickets</div>
          <p style={{ margin: '5px 0 0', color: '#10b981', fontSize: '12px' }}>Completed this month</p>
        </div>

        {/* KPI 2 */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px' }}>Avg. Repair Time</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{avgDuration} hrs</div>
          <p style={{ margin: '5px 0 0', color: '#2563eb', fontSize: '12px' }}>Per request</p>
        </div>

        {/* KPI 3 (Simple Bar Chart Visualization) */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px', color: '#6b7280', fontSize: '14px' }}>Request Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Preventive Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <span style={{ width: '70px' }}>Preventive</span>
              <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${(preventiveCount / MOCK_HISTORY.length) * 100}%`, backgroundColor: '#3b82f6', height: '100%' }} />
              </div>
              <span style={{ width: '20px' }}>{preventiveCount}</span>
            </div>

            {/* Corrective Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <span style={{ width: '70px' }}>Corrective</span>
              <div style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${(correctiveCount / MOCK_HISTORY.length) * 100}%`, backgroundColor: '#ef4444', height: '100%' }} />
              </div>
              <span style={{ width: '20px' }}>{correctiveCount}</span>
            </div>

          </div>
        </div>
      </div>

      {/* --- LOG BOOK SECTION --- */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '20px', margin: 0 }}>Maintenance Log Book</h2>
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
            {['All', 'Repaired', 'Scrap'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                style={{
                  padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                  backgroundColor: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#2563eb' : '#6b7280',
                  boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Equipment</th>
                <th style={thStyle}>Technician</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No records found in log.</td>
                </tr>
              ) : (
                tableData.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={tdStyle}>{t.requestDate}</td>
                    <td style={tdStyle}>{t.subject}</td>
                    <td style={tdStyle}>{t.equipmentId}</td>
                    <td style={tdStyle}>{t.technicianId}</td>
                    <td style={tdStyle}>{t.duration} hrs</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                        backgroundColor: t.stage === 'Repaired' ? '#dcfce7' : '#fee2e2',
                        color: t.stage === 'Repaired' ? '#166534' : '#991b1b'
                      }}>
                        {t.stage.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

// Styles
const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  backgroundColor: 'white'
};

const thStyle = { textAlign: 'left' as const, padding: '12px 16px', color: '#4b5563', fontWeight: 600 };
const tdStyle = { padding: '12px 16px', color: '#1f2937' };

export default ReportingPage;