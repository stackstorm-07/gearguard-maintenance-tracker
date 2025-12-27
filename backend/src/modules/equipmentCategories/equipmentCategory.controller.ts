import { Request, Response } from "express";
import { EquipmentCategoryService } from "./equipmentCategory.service";

export const EquipmentCategoryController = {
  async create(req: Request, res: Response) {
    const result = await EquipmentCategoryService.create(req.body);
    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const { companyId } = req.query;
    const data = await EquipmentCategoryService.getAll(companyId as string);
    res.json(data);
  },
};
