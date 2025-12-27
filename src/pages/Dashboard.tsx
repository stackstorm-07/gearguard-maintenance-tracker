import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestService } from '../services/requestService';
import { MaintenanceRequest } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- 1. FETCH REAL DATA ---
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await requestService.getAll();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // --- 2. CALCULATE KPIs ---
  // A. Critical: Count of "High" priority requests
  const criticalCount = requests.filter(r => r.priority === 'High' && r.stage !== 'Repaired').length;
  
  // B. Open Requests: Count of anything not 'Repaired' or 'Scrap'
  const openRequestsCount = requests.filter(r => r.stage !== 'Repaired' && r.stage !== 'Scrap').length;
  const overdueCount = requests.filter(r => {
      if (r.stage === 'Repaired') return false;
      const targetDate = new Date(r.scheduledDate || r.requestDate);
      return targetDate < new Date(); // If target date is in the past
  }).length;

  // C. Technician Load (Mock Logic based on active count)
  const techLoad = openRequestsCount > 5 ? 'High' : 'Normal';
  const techUtil = openRequestsCount > 5 ? 85 : 40; 

  // --- 3. FILTER LIST ---
  const filteredRequests = requests.filter(req => 
    req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '24px' }}>Loading Dashboard...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/requests/new')}
          style={{ 
            backgroundColor: 'white', border: '1px solid #374151', borderRadius: '6px', 
            padding: '8px 24px', fontWeight: '600', cursor: 'pointer', fontSize: '16px' 
        }}>
          New Request
        </button>
        
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '10px', top: '9px', color: '#9ca3af' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search Subject or Asset..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '9px 12px 9px 36px', borderRadius: '4px', border: '1px solid #d1d5db', 
              width: '300px', outline: 'none', fontSize: '14px' 
            }} 
          />
        </div>
      </div>

      {/* KPI CARDS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '50px' }}>
        
        {/* Card 1: Critical Equipment (Red) */}
        <div style={{ border: '1px solid #f87171', borderRadius: '12px', padding: '24px', textAlign: 'center', backgroundColor: '#fff5f5' }}>
          <h3 style={{ color: '#ef4444', margin: '0 0 16px', fontSize: '16px', fontWeight: 'normal' }}>High Priority / Critical</h3>
          <p style={{ fontSize: '24px', fontWeight: '500', color: '#ef4444', margin: '0 0 4px' }}>{criticalCount} Units</p>
          <span style={{ color: '#ef4444', fontSize: '14px' }}>(Needs Attention)</span>
        </div>

        {/* Card 2: Technician Load (Blue) */}
        <div style={{ border: '1px solid #60a5fa', borderRadius: '12px', padding: '24px', textAlign: 'center', backgroundColor: '#eff6ff' }}>
          <h3 style={{ color: '#3b82f6', margin: '0 0 16px', fontSize: '16px', fontWeight: 'normal' }}>Technician Load</h3>
          <p style={{ fontSize: '24px', fontWeight: '500', color: '#3b82f6', margin: '0 0 4px' }}>{techUtil}% Utilized</p>
          <span style={{ color: '#3b82f6', fontSize: '14px' }}>({techLoad} Load)</span>
        </div>

        {/* Card 3: Open Requests (Green) */}
        <div style={{ border: '1px solid #4ade80', borderRadius: '12px', padding: '24px', textAlign: 'center', backgroundColor: '#f0fdf4' }}>
          <h3 style={{ color: '#22c55e', margin: '0 0 16px', fontSize: '16px', fontWeight: 'normal' }}>Open Requests</h3>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#16a34a', margin: '0 0 4px' }}>{openRequestsCount} Pending</p>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#15803d', margin: '0' }}>{overdueCount} Overdue</p>
        </div>
      </div>

      {/* RECENT TICKETS TABLE */}
      <div style={{ marginTop: '20px' }}>
        
        {/* Table Header */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 1fr', 
          borderTop: '1px dashed #374151', borderBottom: '1px dashed #374151',
          padding: '12px 0', fontSize: '13px', fontWeight: 'bold', color: '#000'
        }}>
          <div>Subjects</div>
          <div>Employee</div>
          <div>Technician</div>
          <div>Category</div>
          <div>Stage</div>
          <div>Company</div>
        </div>

        {/* Table Body */}
        {filteredRequests.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No tickets found. Click "New Request" to create one.</div>
        ) : (
            filteredRequests.map((req) => (
            <div key={req.id} style={{ 
                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 1fr 1fr', 
                borderBottom: '1px dashed #9ca3af',
                padding: '16px 0', fontSize: '13px', color: '#1f2937'
            }}>
                <div style={{ fontWeight: 500 }}>{req.subject}</div>
                <div>{req.createdBy}</div>
                <div>{req.technicianId}</div>
                <div>{req.category}</div>
                <div>
                    <span style={{ 
                        padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                        backgroundColor: req.stage === 'New Request' ? '#dbeafe' : req.stage === 'In Progress' ? '#fef3c7' : '#dcfce7',
                        color: req.stage === 'New Request' ? '#1e40af' : req.stage === 'In Progress' ? '#92400e' : '#166534'
                    }}>
                        {req.stage}
                    </span>
                </div>
                <div>{req.company}</div>
            </div>
            ))
        )}
        
        {/* Bottom Dashed Line Closure */}
        <div style={{ borderBottom: '1px dashed #374151', marginTop: '2px' }}></div>
      </div>
    </div>
  );
};

export default Dashboard;