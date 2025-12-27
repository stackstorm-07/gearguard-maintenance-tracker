import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export const MaintenanceAPI = {
  create(payload: any) {
    return axios.post(`${API_BASE}/maintenance`, payload);
  },

  getAll(companyId: string) {
    return axios.get(`${API_BASE}/maintenance`, {
      params: { companyId },
    });
  },
};
