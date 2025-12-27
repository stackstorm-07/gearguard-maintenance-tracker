import { db } from "../../config/firebase";
import { Team } from "./team.model";

const teams = db.collection("teams");

export const TeamService = {
  async create(data: Team) {
    const doc = await teams.add({
      ...data,
      createdAt: Date.now(),
    });
    return { id: doc.id };
  },

  async getAll(companyId: string) {
    const snap = await teams.where("companyId", "==", companyId).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
};
