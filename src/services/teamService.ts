import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Team } from '../types';

const COLLECTION_NAME = 'teams';

export const teamService = {
  getAll: async (): Promise<Team[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
  },
  create: async (team: Omit<Team, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), team);
    return { id: docRef.id, ...team };
  },
  update: async (team: Team) => {
    const docRef = doc(db, COLLECTION_NAME, team.id);
    await updateDoc(docRef, { ...team });
  }
};