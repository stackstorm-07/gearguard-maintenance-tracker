import React, { useState } from 'react';
import { Equipment, WorkCenter } from '../types';
import EquipmentModal from '../components/equipment/EquipmentModal';

// --- MOCK DATA (Updated with new fields) ---
// --- UPDATED MOCK DATA ---
// Now includes all fields: status, location, usedBy, scrapDate, etc.
const INITIAL_EQUIPMENT: Equipment[] = [
  { 
    id: '1', 
    name: 'Samsung Monitor 15"', 
    category: 'Monitors', 
    company: 'My Company (San Francisco)', 
    serialNumber: 'MT/125/22778837', 
    technician: 'Mitchell Admin', 
    employee: 'Tejas Modi', 
    department: 'Admin', 
    maintenanceTeam: 'Internal Maintenance', 
    assignedDate: '2024-01-15',
    usedBy: 'Tejas Modi',
    location: 'Building A, Floor 2',
    status: 'Operational',
    workCenter: 'WC-Admin',
    description: 'Standard issue monitor for admin staff.'
  },
  { 
    id: '2', 
    name: 'Acer Laptop', 
    category: 'Computers', 
    company: 'My Company (San Francisco)', 
    serialNumber: 'MT/122/11112222', 
    technician: 'Marc Demo', 
    employee: 'Bhaumik P', 
    department: 'Technician', 
    maintenanceTeam: 'IT Support',
    assignedDate: '2024-02-10',
    usedBy: 'Bhaumik P',
    location: 'Field Operations',
    status: 'Under Maintenance',
    workCenter: '-',
    description: 'High-performance laptop for field technicians.'
  },
  { 
    id: '3', 
    name: 'CNC Lathe Machine', 
    category: 'Machinery', 
    company: 'My Company (San Francisco)', 
    serialNumber: 'CNC-998877', 
    technician: 'Aka Foster', 
    employee: '-', 
    department: 'Production', 
    maintenanceTeam: 'Internal Maintenance',
    assignedDate: '2023-11-05',
    usedBy: 'Production Team',
    location: 'Factory Floor, Zone 4',
    status: 'Operational',
    workCenter: 'WC-002',
    description: 'Heavy duty lathe for metal working.'
  },
  { 
    id: '4', 
    name: 'Old Generator', 
    category: 'Power', 
    company: 'My Company (San Francisco)', 
    serialNumber: 'GEN-OLD-001', 
    technician: 'Marc Demo', 
    employee: '-', 
    department: 'Utility', 
    maintenanceTeam: 'Internal Maintenance',
    assignedDate: '2020-01-01',
    scrapDate: '2025-01-01', // Example of scrapped item
    usedBy: '-',
    location: 'Warehouse B',
    status: 'Scrap',
    workCenter: '-',
    description: 'Decommissioned generator.'
  }
];

// ... Keep MOCK_WORK_CENTERS as is ...
const MOCK_WORK_CENTERS: WorkCenter[] = [
  { id: '1', name: 'Assembly 1', code: 'WC-001', tag: 'Standard', alternativeWorkcenter: 'Assembly 2', costPerHour: 50.00, capacityEfficiency: 100.00, oeeTarget: 95.00 },
  { id: '2', name: 'Drill 1', code: 'WC-002', tag: 'Heavy', alternativeWorkcenter: 'Drill 2', costPerHour: 85.00, capacityEfficiency: 100.00, oeeTarget: 90.00 },
];

const EquipmentPage = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'workCenter'>('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  
  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);

  // HANDLERS
  const handleAddNew = () => {
    if (activeTab === 'workCenter') {
        alert('Work Center creation coming soon!');
        return;
    }
    setSelectedEquipment(null); // Clear selection for new entry
    setIsModalOpen(true);
  };

  const handleRowClick = (item: Equipment) => {
    if (activeTab === 'equipment') {
        setSelectedEquipment(item);
        setIsModalOpen(true);
    }
  };

  const handleSaveEquipment = (data: Equipment) => {
    if (selectedEquipment) {
        // Edit Mode: Update existing
        setEquipmentList(prev => prev.map(item => item.id === data.id ? data : item));
    } else {
        // Create Mode: Add new
        setEquipmentList(prev => [...prev, data]);
    }
    setIsModalOpen(false);
  };

  // FILTER LOGIC
  const filteredEquipment = equipmentList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.serialNumber && item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredWorkCenters = MOCK_WORK_CENTERS.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {/* 1. Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1f2937' }}>
          {activeTab === 'equipment' ? 'Machines & Tools' : 'Work Centers'}
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
            {/* Tab Switcher */}
            <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
                <button 
                    onClick={() => setActiveTab('equipment')}
                    style={{
                        padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 500,
                        backgroundColor: activeTab === 'equipment' ? '#fff' : 'transparent',
                        color: activeTab === 'equipment' ? '#2563eb' : '#6b7280',
                        boxShadow: activeTab === 'equipment' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    Machines & Tools
                </button>
                <button 
                    onClick={() => setActiveTab('workCenter')}
                    style={{
                        padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 500,
                        backgroundColor: activeTab === 'workCenter' ? '#fff' : 'transparent',
                        color: activeTab === 'workCenter' ? '#2563eb' : '#6b7280',
                        boxShadow: activeTab === 'workCenter' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    Work Centers
                </button>
            </div>

            <button 
                onClick={handleAddNew}
                style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}
            >
                + New
            </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input 
            type="text" 
            placeholder={`Search...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                width: '100%', maxWidth: '400px', padding: '10px 12px', borderRadius: '6px',
                border: '1px solid #d1d5db', fontSize: '14px', outline: 'none'
            }}
        />
      </div>

      {/* 3. Data Tables */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                    {activeTab === 'equipment' ? (
                        <>
                            <th style={thStyle}>Equipment Name</th>
                            <th style={thStyle}>Employee</th>
                            <th style={thStyle}>Serial Number</th>
                            <th style={thStyle}>Technician</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Company</th>
                        </>
                    ) : (
                        <>
                            <th style={thStyle}>Work Center</th>
                            <th style={thStyle}>Code</th>
                            <th style={thStyle}>Cost / Hour</th>
                            <th style={thStyle}>Capacity Eff.</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {activeTab === 'equipment' ? (
                    filteredEquipment.map(item => (
                        <tr 
                            key={item.id} 
                            onClick={() => handleRowClick(item)}
                            style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.employee}</td>
                            <td style={tdStyle}>{item.serialNumber || '-'}</td>
                            <td style={tdStyle}>{item.technician}</td>
                            <td style={tdStyle}>{item.category}</td>
                            <td style={tdStyle}>{item.company}</td>
                        </tr>
                    ))
                ) : (
                    filteredWorkCenters.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.code}</td>
                            <td style={tdStyle}>${item.costPerHour.toFixed(2)}</td>
                            <td style={tdStyle}>{item.capacityEfficiency.toFixed(2)}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>

      {/* 4. EQUIPMENT MODAL */}
      <EquipmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedEquipment}
        onSave={handleSaveEquipment}
      />

    </div>
  );
};

// Styles
const thStyle = { textAlign: 'left' as const, padding: '12px 16px', fontWeight: '600', color: '#374151' };
const tdStyle = { padding: '12px 16px', color: '#1f2937' };

export default EquipmentPage;