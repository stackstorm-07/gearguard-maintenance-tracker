import React, { useState, useEffect } from 'react';
import { Team } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Team | null;
  onSave: (data: Team) => void;
}

const TeamModal: React.FC<Props> = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState<Partial<Team>>({ name: '', company: 'My Company', members: [] });
  const [newMemberName, setNewMemberName] = useState('');

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ name: '', company: 'My Company', members: [] });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setFormData(prev => ({
        ...prev,
        members: [...(prev.members || []), newMemberName.trim()]
      }));
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Math.random().toString(36).substr(2, 9),
    } as Team);
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 20px', color: '#1f2937' }}>{initialData ? 'Edit Team' : 'New Maintenance Team'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Team Name</label>
            <input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                style={inputStyle} 
                required 
                placeholder="e.g. Electrical Support" 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Company</label>
            <input 
                value={formData.company} 
                onChange={e => setFormData({...formData, company: e.target.value})} 
                style={inputStyle} 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Team Members</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input 
                value={newMemberName} 
                onChange={e => setNewMemberName(e.target.value)} 
                placeholder="Add member name..." 
                style={inputStyle}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
              />
              <button type="button" onClick={handleAddMember} style={addBtnStyle}>Add</button>
            </div>
            
            {/* Members List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.members?.map((member, idx) => (
                <div key={idx} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {member}
                  <span onClick={() => handleRemoveMember(idx)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>×</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" style={saveBtnStyle}>{initialData ? 'Save Changes' : 'Create Team'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles (Reused)
const overlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle: React.CSSProperties = { backgroundColor: 'white', width: '500px', borderRadius: '8px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };
const addBtnStyle: React.CSSProperties = { padding: '8px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', cursor: 'pointer' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 'bold' };

export default TeamModal;