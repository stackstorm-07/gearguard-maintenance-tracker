import { db } from "../../config/firebase";

const users = db.collection("users");

export const UserService = {
  async create(data: any) {
    const doc = await users.add({
      ...data,
      createdAt: Date.now(),
    });
    return { id: doc.id };
  },

  async findByEmail(email: string) {
    const snap = await users.where("email", "==", email).get();
    if (snap.empty) return null;

    const doc = snap.docs[0];
    return { id: doc.id, ...doc.data() };
  },
};
