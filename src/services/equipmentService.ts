import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Equipment, WorkCenter } from '../types';

export const equipmentService = {
  // MACHINES
  getAllEquipment: async (): Promise<Equipment[]> => {
    const q = query(collection(db, 'equipment'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Equipment));
  },
  createEquipment: async (data: Omit<Equipment, 'id'>) => {
    const docRef = await addDoc(collection(db, 'equipment'), data);
    return { id: docRef.id, ...data };
  },
  updateEquipment: async (data: Equipment) => {
    const docRef = doc(db, 'equipment', data.id);
    await updateDoc(docRef, { ...data });
  },

  // WORK CENTERS
  getAllWorkCenters: async (): Promise<WorkCenter[]> => {
    const q = query(collection(db, 'workCenters'), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkCenter));
  },
  createWorkCenter: async (data: Omit<WorkCenter, 'id'>) => {
    const docRef = await addDoc(collection(db, 'workCenters'), data);
    return { id: docRef.id, ...data };
  },
  updateWorkCenter: async (data: WorkCenter) => {
    const docRef = doc(db, 'workCenters', data.id);
    await updateDoc(docRef, { ...data });
  }
};