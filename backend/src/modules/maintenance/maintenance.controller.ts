import { Request, Response } from "express";
import { MaintenanceService } from "./maintenance.service";

export const MaintenanceController = {
  async create(req: Request, res: Response) {
    const result = await MaintenanceService.create(req.body);
    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const { companyId } = req.query;
    if (!companyId) {
      return res.status(400).json({ message: "companyId is required" });
    }

    const data = await MaintenanceService.getAll(companyId as string);
    res.json(data);
  },

  async updateStatus(req: Request, res: Response) {
    const { status, duration } = req.body;
    await MaintenanceService.updateStatus(req.params.id, status, duration);
    res.json({ message: "Status updated" });
  },
};
