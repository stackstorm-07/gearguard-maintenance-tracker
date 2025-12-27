import { Request, Response } from "express";
import { CompanyService } from "./company.service";

export const CompanyController = {
  async create(req: Request, res: Response) {
    const result = await CompanyService.create(req.body);
    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const companies = await CompanyService.getAll();
    res.json(companies);
  },

  async get(req: Request, res: Response) {
    const company = await CompanyService.getById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  },
};
