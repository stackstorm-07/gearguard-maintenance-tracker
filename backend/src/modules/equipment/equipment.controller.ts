import { Request, Response } from "express";
import { EquipmentService } from "./equipment.service";

export const EquipmentController = {
  async create(req: Request, res: Response) {
    const result = await EquipmentService.create(req.body);
    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const { companyId } = req.query;
    const data = await EquipmentService.getAll(companyId as string);
    res.json(data);
  },
};
