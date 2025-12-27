import React, { useState } from 'react';
import { Equipment, WorkCenter } from '../types';

// --- MOCK DATA: EQUIPMENT ---
const MOCK_EQUIPMENT: Equipment[] = [
  { id: '1', name: 'Samsung Monitor 15"', employee: 'Tejas Modi', department: 'Admin', serialNumber: 'MT/125/22778837', technician: 'Mitchell Admin', category: 'Monitors', company: 'My Company (San Francisco)' },
  { id: '2', name: 'Acer Laptop', employee: 'Bhaumik P', department: 'Technician', serialNumber: 'MT/122/11112222', technician: 'Marc Demo', category: 'Computers', company: 'My Company (San Francisco)' },
  { id: '3', name: 'CNC Lathe Machine', employee: 'Rahul V', department: 'Production', serialNumber: 'CNC/99/882211', technician: 'Aka Foster', category: 'Machinery', company: 'My Company (San Francisco)' },
];

// --- MOCK DATA: WORK CENTERS ---
const MOCK_WORK_CENTERS: WorkCenter[] = [
  { id: '1', name: 'Assembly 1', code: 'WC-001', tag: 'Standard', alternativeWorkcenter: 'Assembly 2', costPerHour: 50.00, capacityEfficiency: 100.00, oeeTarget: 95.00 },
  { id: '2', name: 'Drill 1', code: 'WC-002', tag: 'Heavy', alternativeWorkcenter: 'Drill 2', costPerHour: 85.00, capacityEfficiency: 100.00, oeeTarget: 90.00 },
  { id: '3', name: 'Painting Booth', code: 'WC-003', tag: 'Finish', alternativeWorkcenter: '-', costPerHour: 120.00, capacityEfficiency: 80.00, oeeTarget: 85.00 },
];

const EquipmentPage = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'workCenter'>('equipment');
  const [searchTerm, setSearchTerm] = useState('');

  // FILTER LOGIC
  const filteredEquipment = MOCK_EQUIPMENT.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
            {/* Tab Switcher Pills */}
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

            <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}>
                + New
            </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input 
            type="text" 
            placeholder={`Search ${activeTab === 'equipment' ? 'Equipment Name, Serial Number...' : 'Work Center, Code...'}`} 
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
                    {/* Dynamic Headers based on Tab */}
                    {activeTab === 'equipment' ? (
                        <>
                            <th style={thStyle}>Equipment Name</th>
                            <th style={thStyle}>Employee</th>
                            <th style={thStyle}>Department</th>
                            <th style={thStyle}>Serial Number</th>
                            <th style={thStyle}>Technician</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Company</th>
                        </>
                    ) : (
                        <>
                            <th style={thStyle}>Work Center</th>
                            <th style={thStyle}>Code</th>
                            <th style={thStyle}>Tag</th>
                            <th style={thStyle}>Alt. Workcenter</th>
                            <th style={thStyle}>Cost / Hour</th>
                            <th style={thStyle}>Capacity Eff.</th>
                            <th style={thStyle}>OEE Target</th>
                        </>
                    )}
                    <th style={thStyle}></th> {/* Actions Column */}
                </tr>
            </thead>
            <tbody>
                {activeTab === 'equipment' ? (
                    filteredEquipment.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.employee}</td>
                            <td style={tdStyle}>{item.department}</td>
                            <td style={tdStyle}>{item.serialNumber}</td>
                            <td style={tdStyle}>{item.technician}</td>
                            <td style={tdStyle}>{item.category}</td>
                            <td style={tdStyle}>{item.company}</td>
                            <td style={tdStyle}>
                                <button style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    filteredWorkCenters.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.code}</td>
                            <td style={tdStyle}>{item.tag}</td>
                            <td style={tdStyle}>{item.alternativeWorkcenter}</td>
                            <td style={tdStyle}>${item.costPerHour.toFixed(2)}</td>
                            <td style={tdStyle}>{item.capacityEfficiency.toFixed(2)}</td>
                            <td style={tdStyle}>{item.oeeTarget.toFixed(2)}</td>
                            <td style={tdStyle}>
                                <button style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>

        {/* Empty State */}
        {((activeTab === 'equipment' && filteredEquipment.length === 0) || 
          (activeTab === 'workCenter' && filteredWorkCenters.length === 0)) && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                No records found.
            </div>
        )}
      </div>

    </div>
  );
};

// --- STYLES ---
const thStyle = {
    textAlign: 'left' as const,
    padding: '12px 16px',
    fontWeight: '600',
    color: '#374151',
    whiteSpace: 'nowrap' as const
};

const tdStyle = {
    padding: '12px 16px',
    color: '#1f2937',
    borderBottom: '1px solid #f3f4f6'
};

export default EquipmentPage;