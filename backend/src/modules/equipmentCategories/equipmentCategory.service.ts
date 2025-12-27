import { db } from "../../config/firebase";

const categories = db.collection("equipment_categories");

export const EquipmentCategoryService = {
  async create(data: any) {
    const doc = await categories.add({
      ...data,
      createdAt: Date.now(),
    });
    return { id: doc.id };
  },

  async getAll(companyId: string) {
    const snap = await categories.where("companyId", "==", companyId).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
};
