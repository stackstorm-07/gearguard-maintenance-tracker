import { db } from "../../config/firebase";
import { Company } from "./company.model";

const companies = db.collection("companies");

export const CompanyService = {
  async create(data: Company) {
    const doc = await companies.add({
      ...data,
      createdAt: Date.now(),
    });

    return { id: doc.id };
  },

  async getAll() {
    const snapshot = await companies.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getById(id: string) {
    const doc = await companies.doc(id).get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
  },
};
