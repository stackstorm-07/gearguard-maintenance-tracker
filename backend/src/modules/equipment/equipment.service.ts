import { db } from "../../config/firebase";
import { Equipment } from "./equipment.model";

const equipment = db.collection("equipment");

export const EquipmentService = {
  async create(data: Equipment) {
    const doc = await equipment.add({
      ...data,
      createdAt: Date.now(),
    });
    return { id: doc.id };
  },

  async getAll(companyId: string) {
    const snap = await equipment.where("companyId", "==", companyId).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
};
