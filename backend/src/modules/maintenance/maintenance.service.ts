import { db } from "../../config/firebase";
import { RequestStatus } from "../../types/enums";

const requests = db.collection("maintenance_requests");

export const MaintenanceService = {
  async create(data: any) {
    const doc = await requests.add({
      ...data,
      status: RequestStatus.NEW,
      createdAt: Date.now(),
    });
    return { id: doc.id };
  },

  async getAll(companyId: string) {
    const snap = await requests
      .where("companyId", "==", companyId)
      .get();

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
,

  async updateStatus(id: string, status: RequestStatus, duration?: number) {
    await requests.doc(id).update({
      status,
      ...(duration !== undefined && { duration }),
    });
  },
};
