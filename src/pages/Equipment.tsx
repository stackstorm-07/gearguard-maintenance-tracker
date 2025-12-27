import React, { useState, useEffect } from 'react';
import { Equipment, WorkCenter } from '../types';
import EquipmentModal from '../components/equipment/EquipmentModal';
import WorkCenterModal from '../components/equipment/WorkCenterModal';
import { equipmentService } from '../services/equipmentService';

const EquipmentPage = () => {
  const [activeTab, setActiveTab] = useState<'equipment' | 'workCenter'>('equipment');
  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [wcList, setWcList] = useState<WorkCenter[]>([]);
  
  // Modals
  const [equipModal, setEquipModal] = useState(false);
  const [selEquip, setSelEquip] = useState<Equipment | null>(null);
  const [wcModal, setWcModal] = useState(false);
  const [selWc, setSelWc] = useState<WorkCenter | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const [eData, wData] = await Promise.all([equipmentService.getAllEquipment(), equipmentService.getAllWorkCenters()]);
      setEquipmentList(eData);
      setWcList(wData);
      setLoading(false);
  };

  const handleSaveEquip = async (data: Equipment) => {
      if (selEquip) {
          await equipmentService.updateEquipment(data);
          setEquipmentList(prev => prev.map(i => i.id === data.id ? data : i));
      } else {
          const { id, ...rest } = data; 
          const created = await equipmentService.createEquipment(rest);
          setEquipmentList(prev => [...prev, created as Equipment]);
      }
      setEquipModal(false);
  };
  
  // (Add similar handleSaveWC for WorkCenters...)

  if (loading) return <div>Loading Assets...</div>;

  return (
    <div style={{ padding: '24px' }}>
       {/* Use same Header/Tabs code from previous steps */}
       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Assets</h1>
          <button onClick={() => { setSelEquip(null); setEquipModal(true); }} style={{ background: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}>+ New Equipment</button>
       </div>

       {/* Render List */}
       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
           <thead>
               <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                   <th style={{ padding: '10px' }}>Name</th>
                   <th style={{ padding: '10px' }}>Technician</th>
                   <th style={{ padding: '10px' }}>Status</th>
               </tr>
           </thead>
           <tbody>
               {equipmentList.map(item => (
                   <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                       <td style={{ padding: '10px' }}>{item.name}</td>
                       <td style={{ padding: '10px' }}>{item.technician}</td>
                       <td style={{ padding: '10px' }}>{item.status}</td>
                   </tr>
               ))}
           </tbody>
       </table>

       <EquipmentModal isOpen={equipModal} onClose={() => setEquipModal(false)} initialData={selEquip} onSave={handleSaveEquip} />
    </div>
  );
};
export default EquipmentPage;