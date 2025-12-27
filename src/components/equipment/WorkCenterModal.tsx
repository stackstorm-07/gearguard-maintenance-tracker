import React, { useState, useEffect } from 'react';
import { WorkCenter } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: WorkCenter | null;
  onSave: (data: WorkCenter) => void;
}

const WorkCenterModal: React.FC<Props> = ({ isOpen, onClose, initialData, onSave }) => {
  // Initialize with default values to avoid uncontrolled input warnings
  const [formData, setFormData] = useState<Partial<WorkCenter>>({
    name: '', code: '', tag: '', alternativeWorkcenter: '', 
    costPerHour: 0, capacityEfficiency: 100, oeeTarget: 90
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '', code: '', tag: '', alternativeWorkcenter: '', 
        costPerHour: 0, capacityEfficiency: 100, oeeTarget: 90
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Math.random().toString(36).substr(2, 9),
    } as WorkCenter);
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>{initialData ? 'Edit Work Center' : 'New Work Center'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div className="form-group">
            <label style={labelStyle}>Work Center Name</label>
            <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} required placeholder="e.g. Assembly Line 1" />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Code</label>
            <input name="code" value={formData.code} onChange={handleChange} style={inputStyle} required placeholder="e.g. WC-001" />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Tag</label>
            <input name="tag" value={formData.tag} onChange={handleChange} style={inputStyle} placeholder="e.g. Standard" />
          </div>

          <div className="form-group">
            <label style={labelStyle}>Alternative Workcenter</label>
            <input name="alternativeWorkcenter" value={formData.alternativeWorkcenter} onChange={handleChange} style={inputStyle} />
          </div>

          {/* KPI Section */}
          <div style={{ gridColumn: 'span 2', marginTop: '10px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#4b5563' }}>Performance Targets</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={labelStyle}>Cost per Hour ($)</label>
                    <input type="number" name="costPerHour" value={formData.costPerHour} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Capacity Eff. (%)</label>
                    <input type="number" name="capacityEfficiency" value={formData.capacityEfficiency} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>OEE Target (%)</label>
                    <input type="number" name="oeeTarget" value={formData.oeeTarget} onChange={handleChange} style={inputStyle} />
                </div>
            </div>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" style={saveBtnStyle}>{initialData ? 'Save Changes' : 'Create Work Center'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const overlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle: React.CSSProperties = { backgroundColor: 'white', width: '700px', borderRadius: '8px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', cursor: 'pointer' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 'bold' };

export default WorkCenterModal;