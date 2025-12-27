import React from 'react';
import { MaintenanceRequest } from '../../types';

interface Props {
  request: MaintenanceRequest;
  onClose: () => void;
}

const RequestModal: React.FC<Props> = ({ request, onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white', padding: '24px', borderRadius: '8px', width: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{request.subject}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
          <div>
            <label style={{ color: '#666', fontSize: '12px' }}>Status</label>
            <div style={{ 
              display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', marginLeft: '10px',
              backgroundColor: request.stage === 'New Request' ? '#dbeafe' : '#dcfce7',
              color: request.stage === 'New Request' ? '#1e40af' : '#166534'
            }}>
              {request.stage}
            </div>
          </div>
          
          <div>
            <label style={{ color: '#666', fontSize: '12px' }}>Equipment</label>
            <div style={{ fontWeight: 500 }}>{request.equipmentId}</div>
          </div>

          <div>
            <label style={{ color: '#666', fontSize: '12px' }}>Technician</label>
            <div style={{ fontWeight: 500 }}>{request.technicianId}</div>
          </div>

          <div>
            <label style={{ color: '#666', fontSize: '12px' }}>Scheduled Time</label>
            <div style={{ fontWeight: 500 }}>
              {/* FIX: Use requestDate as fallback if scheduledDate is missing */}
              {new Date(request.scheduledDate || request.requestDate).toLocaleString()} ({request.duration || 0} hrs)
            </div>
          </div>
          
          <div>
             <label style={{ color: '#666', fontSize: '12px' }}>Priority</label>
             <div style={{ fontWeight: 500, color: request.priority === 'High' ? 'red' : 'black' }}>{request.priority}</div>
          </div>

          {request.description && (
            <div>
               <label style={{ color: '#666', fontSize: '12px' }}>Description</label>
               <div style={{ marginTop: '4px', color: '#374151' }}>{request.description}</div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Close</button>
          <button style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: '#2563eb', color: 'white', cursor: 'pointer' }}>Edit</button>
        </div>

      </div>
    </div>
  );
};

export default RequestModal;