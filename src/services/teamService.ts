import { 
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Team } from '../types';

const COLLECTION_NAME = 'teams';

export const teamService = {
  // 1. Fetch all teams
  getAll: async (): Promise<Team[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
  },

  // 2. Create a new team
  create: async (team: Omit<Team, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), team);
    return { id: docRef.id, ...team };
  },

  // 3. Update a team
  update: async (team: Team) => {
    const docRef = doc(db, COLLECTION_NAME, team.id);
    await updateDoc(docRef, { ...team });
  },

  // 4. Delete a team (THIS WAS MISSING)
  delete: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};