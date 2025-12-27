import React, { useState } from 'react';
import { Equipment, WorkCenter } from '../types';
import EquipmentModal from '../components/equipment/EquipmentModal';
import WorkCenterModal from '../components/equipment/WorkCenterModal'; // 1. Import WorkCenterModal

// --- MOCK DATA (Updated with new fields) ---
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
    scrapDate: '2025-01-01', 
    usedBy: '-',
    location: 'Warehouse B',
    status: 'Scrap',
    workCenter: '-',
    description: 'Decommissioned generator.'
  }
];

// --- MOCK WORK CENTERS ---
const MOCK_WORK_CENTERS: WorkCenter[] = [
  { id: '1', name: 'Assembly 1', code: 'WC-001', tag: 'Standard', alternativeWorkcenter: 'Assembly 2', costPerHour: 50.00, capacityEfficiency: 100.00, oeeTarget: 95.00 },
  { id: '2', name: 'Drill 1', code: 'WC-002', tag: 'Heavy', alternativeWorkcenter: 'Drill 2', costPerHour: 85.00, capacityEfficiency: 100.00, oeeTarget: 90.00 },
];

const EquipmentPage = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'workCenter'>('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  
  // MODAL STATES
  const [isEquipModalOpen, setIsEquipModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  
  const [isWCModalOpen, setIsWCModalOpen] = useState(false); // New State
  const [selectedWC, setSelectedWC] = useState<WorkCenter | null>(null); // New State

  // DATA STATES
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [wcList, setWcList] = useState<WorkCenter[]>(MOCK_WORK_CENTERS);

  // HANDLERS
  const handleAddNew = () => {
    if (activeTab === 'equipment') {
        setSelectedEquipment(null);
        setIsEquipModalOpen(true);
    } else {
        // Open Work Center Modal
        setSelectedWC(null);
        setIsWCModalOpen(true);
    }
  };

  const handleRowClick = (item: any) => {
    if (activeTab === 'equipment') {
        setSelectedEquipment(item as Equipment);
        setIsEquipModalOpen(true);
    } else {
        // Open Work Center Modal
        setSelectedWC(item as WorkCenter);
        setIsWCModalOpen(true);
    }
  };

  const handleSaveEquipment = (data: Equipment) => {
    if (selectedEquipment) {
        setEquipmentList(prev => prev.map(item => item.id === data.id ? data : item));
    } else {
        setEquipmentList(prev => [...prev, data]);
    }
    setIsEquipModalOpen(false);
  };

  const handleSaveWC = (data: WorkCenter) => {
    if (selectedWC) {
        setWcList(prev => prev.map(item => item.id === data.id ? data : item));
    } else {
        setWcList(prev => [...prev, data]);
    }
    setIsWCModalOpen(false);
  };

  // FILTER LOGIC
  const filteredEquipment = equipmentList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.serialNumber && item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredWorkCenters = wcList.filter(item => 
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
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Equipment Name</th>
                            <th style={thStyle}>Used By</th>
                            <th style={thStyle}>Serial Number</th>
                            <th style={thStyle}>Technician</th>
                            <th style={thStyle}>Location</th>
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
                            <td style={tdStyle}>
                                <span style={{
                                    padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                                    backgroundColor: item.status === 'Operational' ? '#dcfce7' : item.status === 'Scrap' ? '#f3f4f6' : '#fee2e2',
                                    color: item.status === 'Operational' ? '#166534' : item.status === 'Scrap' ? '#6b7280' : '#991b1b'
                                }}>
                                    {item.status || 'Unknown'}
                                </span>
                            </td>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.usedBy || item.employee || '-'}</td>
                            <td style={tdStyle}>{item.serialNumber || '-'}</td>
                            <td style={tdStyle}>{item.technician}</td>
                            <td style={tdStyle}>{item.location || '-'}</td>
                        </tr>
                    ))
                ) : (
                    filteredWorkCenters.map(item => (
                        <tr 
                            key={item.id} 
                            onClick={() => handleRowClick(item)} 
                            style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
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

      {/* 4. MODALS */}
      <EquipmentModal 
        isOpen={isEquipModalOpen}
        onClose={() => setIsEquipModalOpen(false)}
        initialData={selectedEquipment}
        onSave={handleSaveEquipment}
      />

      <WorkCenterModal 
        isOpen={isWCModalOpen}
        onClose={() => setIsWCModalOpen(false)}
        initialData={selectedWC}
        onSave={handleSaveWC}
      />

    </div>
  );
};

// Styles
const thStyle = { textAlign: 'left' as const, padding: '12px 16px', fontWeight: '600', color: '#374151' };
const tdStyle = { padding: '12px 16px', color: '#1f2937' };

export default EquipmentPage;