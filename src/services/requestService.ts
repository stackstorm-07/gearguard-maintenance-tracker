import { 
  collection, addDoc, updateDoc, doc, getDocs, query, orderBy, where 
} from 'firebase/firestore';
import { db } from '../firebase';
import { MaintenanceRequest } from '../types';

const COLLECTION = 'maintenanceRequests';

export const requestService = {
  // 1. Get All Requests (For Dashboard/Calendar)
  getAll: async (): Promise<MaintenanceRequest[]> => {
    const q = query(collection(db, COLLECTION), orderBy('requestDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MaintenanceRequest));
  },

  // 2. Create New Request
  create: async (data: Omit<MaintenanceRequest, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTION), data);
    return { id: docRef.id, ...data };
  },

  // 3. Update Status (For Drag & Drop or Completion)
  update: async (id: string, updates: Partial<MaintenanceRequest>) => {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, updates);
  },

  // 4. Get Requests by Team (Optional useful filter)
  getByTeam: async (teamId: string) => {
    const q = query(collection(db, COLLECTION), where('teamId', '==', teamId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MaintenanceRequest));
  }
};