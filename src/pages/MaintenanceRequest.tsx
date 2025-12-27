import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { equipmentService } from '../services/equipmentService';
import { teamService } from '../services/teamService';
import { requestService } from '../services/requestService';
import { Equipment, Team, MaintenanceRequest } from '../types';

const MaintenanceRequestPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // 1. Loading State
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 2. Dropdown Data State
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [teamList, setTeamList] = useState<Team[]>([]);

  // 3. Form State
  const [formData, setFormData] = useState<Partial<MaintenanceRequest>>({
    subject: '',
    maintenanceFor: 'Equipment', // Default
    equipmentId: '', // Selected Equipment ID
    type: 'Corrective',
    priority: 'Medium',
    duration: 1,
    teamId: '',
    requestDate: new Date().toISOString().split('T')[0], // Today
    scheduledDate: '',
    description: '',
    stage: 'New Request'
  });

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [equipData, teamData] = await Promise.all([
          equipmentService.getAllEquipment(),
          teamService.getAll()
        ]);
        setEquipmentList(equipData);
        setTeamList(teamData);
      } catch (error) {
        console.error("Failed to load dropdowns:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDropdowns();
  }, []);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Find the actual names for display purposes
      const selectedEquipment = equipmentList.find(e => e.id === formData.equipmentId);
      const selectedTeam = teamList.find(t => t.id === formData.teamId);

      // 2. Construct the full object
      const newRequest: Omit<MaintenanceRequest, 'id'> = {
        subject: formData.subject!,
        createdBy: currentUser?.displayName || 'Unknown User', // Auto-fill User
        maintenanceFor: formData.maintenanceFor as 'Equipment',
        equipmentId: selectedEquipment ? selectedEquipment.name : 'Unknown Equipment', // Store Name for easy reading
        category: selectedEquipment ? selectedEquipment.category : 'General',
        requestDate: formData.requestDate!,
        type: formData.type as any,
        teamId: selectedTeam ? selectedTeam.name : 'Unassigned', // Store Team Name
        technicianId: selectedEquipment?.technician || 'Unassigned', // Auto-assign tech from equipment
        scheduledDate: formData.scheduledDate || new Date().toISOString(),
        duration: Number(formData.duration),
        priority: formData.priority as any,
        company: 'My Company', // Hardcoded or from User profile
        stage: 'New Request',
        description: formData.description
      };

      // 3. Send to Firebase
      await requestService.create(newRequest);
      
      alert('Ticket Created Successfully!');
      navigate('/'); // Go back to Dashboard

    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Form...</div>;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h1 style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>New Maintenance Request</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        
        {/* Subject */}
        <div className="form-group">
           <label style={labelStyle}>Subject</label>
           <input name="subject" value={formData.subject} onChange={handleChange} style={inputStyle} required placeholder="e.g. Conveyor Belt Stopped" />
        </div>

        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
                <label style={labelStyle}>Maintenance For</label>
                <select name="maintenanceFor" value={formData.maintenanceFor} onChange={handleChange} style={inputStyle}>
                    <option value="Equipment">Machine / Equipment</option>
                    <option value="Work Center">Work Center</option>
                </select>
            </div>
            
            <div>
                <label style={labelStyle}>Select Equipment</label>
                <select name="equipmentId" value={formData.equipmentId} onChange={handleChange} style={inputStyle} required>
                    <option value="">-- Select Machine --</option>
                    {equipmentList.map(eq => (
                        <option key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
                <label style={labelStyle}>Assigned Team</label>
                <select name="teamId" value={formData.teamId} onChange={handleChange} style={inputStyle} required>
                    <option value="">-- Select Team --</option>
                    {teamList.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <div>
                 <label style={labelStyle}>Request Date</label>
                 <input type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} style={inputStyle} />
            </div>
        </div>

        {/* Row 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
                <label style={labelStyle}>Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} style={inputStyle}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <label style={labelStyle}>Type</label>
                <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                    <option value="Corrective">Corrective</option>
                    <option value="Preventive">Preventive</option>
                </select>
            </div>
            <div>
                <label style={labelStyle}>Duration (Hours)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} style={inputStyle} />
            </div>
        </div>

        {/* Description */}
        <div>
            <label style={labelStyle}>Description / Notes</label>
            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
            <button type="button" onClick={() => navigate('/')} style={{ padding: '10px 20px', background: 'white', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={submitting} style={{ padding: '10px 30px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                {submitting ? 'Creating...' : 'Create Ticket'}
            </button>
        </div>

      </form>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };

export default MaintenanceRequestPage;