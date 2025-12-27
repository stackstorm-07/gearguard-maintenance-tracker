import React, { useState } from 'react';
import { MaintenanceRequest, PriorityLevel } from '../types';

const MaintenanceRequestPage = () => {
  // Mock Data / Form State
  const [formData, setFormData] = useState<MaintenanceRequest>({
    id: 'REQ-NEW',
    subject: 'Test activity',
    createdBy: 'Mitchell Admin',
    maintenanceFor: 'Equipment',
    equipmentId: 'Acer Laptop/LP/203/19281928',
    category: 'Computers',
    requestDate: new Date().toISOString().split('T')[0], // Auto-filled today
    type: 'Corrective',
    teamId: 'Internal Maintenance',
    technicianId: 'Aka Foster',
    scheduledDate: '2025-12-28T14:30',
    duration: 0,
    priority: 'Medium',
    company: 'My Company (San Francisco)',
    stage: 'New Request',
    notes: '',
    instructions: ''
  });

  const [activeTab, setActiveTab] = useState<'notes' | 'instructions'>('notes');

  // Handle Text/Select Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Priority Diamond Click Logic
  const handlePriorityClick = (level: PriorityLevel) => {
    setFormData(prev => ({ ...prev, priority: level }));
  };

  return (
    <div className="page-container">
      
      {/* HEADER: Title & Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
           <div style={{ fontSize: '14px', color: '#6b7280' }}>Maintenance Requests / {formData.subject}</div>
           <h1 style={{ margin: '4px 0 0', fontSize: '28px' }}>{formData.subject}</h1>
        </div>
        
        {/* Status Bar (Visual Only for now) */}
        <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
          {['New Request', 'In Progress', 'Repaired', 'Scrap'].map((stage) => (
            <div key={stage} style={{ 
              padding: '8px 16px', 
              backgroundColor: formData.stage === stage ? '#2563eb' : '#f9fafb',
              color: formData.stage === stage ? 'white' : '#4b5563',
              borderRight: '1px solid #d1d5db',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {stage}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN FORM CARD */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* LEFT COLUMN */}
          <div>
             <div className="form-group">
                <label className="form-label">Created By</label>
                <input name="createdBy" value={formData.createdBy} onChange={handleChange} className="form-input" />
             </div>

             <div className="form-group">
                <label className="form-label">Maintenance For</label>
                <select name="maintenanceFor" value={formData.maintenanceFor} onChange={handleChange} className="form-select">
                  <option value="Equipment">Equipment</option>
                  <option value="Work Center">Work Center</option>
                </select>
             </div>

             <div className="form-group">
                <label className="form-label">Equipment</label>
                {/* Clicking mimics opening a popup */}
                <div className="form-input" style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => alert('Open Equipment Popup')}>
                  {formData.equipmentId} ▼
                </div>
             </div>

             <div className="form-group">
                <label className="form-label">Category</label>
                <input name="category" value={formData.category} onChange={handleChange} className="form-input" />
             </div>

             <div className="form-group">
                <label className="form-label">Request Date</label>
                <input type="date" name="requestDate" value={formData.requestDate} disabled className="form-input" style={{ backgroundColor: '#f3f4f6' }} />
             </div>

             <div className="form-group">
                <label className="form-label">Maintenance Type</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="type" value="Corrective" checked={formData.type === 'Corrective'} onChange={handleChange} /> Corrective
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input type="radio" name="type" value="Preventive" checked={formData.type === 'Preventive'} onChange={handleChange} /> Preventive
                  </label>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="form-group">
                <label className="form-label">Team</label>
                <div className="form-input" style={{ cursor: 'pointer' }} onClick={() => alert('Open Team Popup')}>
                  {formData.teamId} ▼
                </div>
             </div>

             <div className="form-group">
                <label className="form-label">Technician</label>
                <input name="technicianId" value={formData.technicianId} onChange={handleChange} className="form-input" />
             </div>

             <div className="form-group">
                <label className="form-label">Scheduled Date</label>
                <input type="datetime-local" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="form-input" />
             </div>

             <div className="form-group">
                <label className="form-label">Duration (hours)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-input" />
             </div>

             {/* PRIORITY DIAMONDS */}
             <div className="form-group">
                <label className="form-label">Priority</label>
                <div className="diamond-container">
                  {/* Logic: If priority is Medium, Low and Med diamonds are lit */}
                  <div className={`diamond ${['Low', 'Medium', 'High'].includes(formData.priority) ? 'active' : ''}`} onClick={() => handlePriorityClick('Low')} />
                  <div className={`diamond ${['Medium', 'High'].includes(formData.priority) ? 'active' : ''}`} onClick={() => handlePriorityClick('Medium')} />
                  <div className={`diamond ${formData.priority === 'High' ? 'active' : ''}`} onClick={() => handlePriorityClick('High')} />
                  <span style={{ marginLeft: '10px', fontSize: '13px', color: '#666' }}>({formData.priority})</span>
                </div>
             </div>

             <div className="form-group">
                <label className="form-label">Company</label>
                <input name="company" value={formData.company} onChange={handleChange} className="form-input" />
             </div>
          </div>
        </div>

        {/* FOOTER TABS (Notes & Instructions) */}
        <div style={{ marginTop: '40px' }}>
          <div className="tab-header">
            <button className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Notes</button>
            <button className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`} onClick={() => setActiveTab('instructions')}>Instructions</button>
          </div>
          
          <textarea 
            name={activeTab}
            value={activeTab === 'notes' ? formData.notes : formData.instructions}
            onChange={handleChange}
            className="form-input"
            rows={4}
            placeholder={`Add ${activeTab} here...`}
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

      </div>
    </div>
  );
};

export default MaintenanceRequestPage;