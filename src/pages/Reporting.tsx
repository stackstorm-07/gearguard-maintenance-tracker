import React, { useEffect, useState } from 'react';
import { requestService } from '../services/requestService';
import { MaintenanceRequest } from '../types';

const ReportingPage = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
        const data = await requestService.getAll();
        setRequests(data);
        setLoading(false);
    };
    fetch();
  }, []);

  // --- REAL TIME CALCULATIONS ---
  const totalRequests = requests.length;
  const completed = requests.filter(r => r.stage === 'Repaired').length;
  const pending = totalRequests - completed;
  
  // Calculate Average Duration (Mock MTTR logic)
  const totalDuration = requests.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const avgDuration = totalRequests > 0 ? (totalDuration / totalRequests).toFixed(1) : 0;

  if (loading) return <div>Loading Reports...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
       <h1 style={{ fontSize: '24px', color: '#1f2937', marginBottom: '24px' }}>Maintenance Reporting</h1>

       {/* KPI Stats */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <StatCard label="Total Maintenance" value={totalRequests} color="#2563eb" />
          <StatCard label="Open Tickets" value={pending} color="#f59e0b" />
          <StatCard label="Completed" value={completed} color="#10b981" />
          <StatCard label="Avg Duration (Hrs)" value={avgDuration} color="#6366f1" />
       </div>

       {/* Detailed Log Book */}
       <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold' }}>
              Maintenance Log Book
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
             <thead style={{ background: '#f9fafb', color: '#6b7280' }}>
                 <tr>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Machine</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Technician</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Duration</th>
                     <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                 </tr>
             </thead>
             <tbody>
                 {requests.map(req => (
                     <tr key={req.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                         <td style={{ padding: '12px' }}>{req.requestDate}</td>
                         <td style={{ padding: '12px', fontWeight: 500 }}>{req.subject}</td>
                         <td style={{ padding: '12px' }}>{req.equipmentId}</td>
                         <td style={{ padding: '12px' }}>{req.technicianId}</td>
                         <td style={{ padding: '12px' }}>{req.duration} hrs</td>
                         <td style={{ padding: '12px' }}>
                             <span style={{ 
                                 padding: '2px 8px', borderRadius: '10px', fontSize: '11px',
                                 background: req.stage === 'Repaired' ? '#dcfce7' : '#fee2e2',
                                 color: req.stage === 'Repaired' ? '#166534' : '#991b1b'
                             }}>
                                 {req.stage}
                             </span>
                         </td>
                     </tr>
                 ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: any) => (
    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', borderLeft: `5px solid ${color}` }}>
        <div style={{ color: '#6b7280', fontSize: '13px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginTop: '5px' }}>{value}</div>
    </div>
);

export default ReportingPage;