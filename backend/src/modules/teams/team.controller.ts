import { Request, Response } from "express";
import { TeamService } from "./team.service";

export const TeamController = {
  async create(req: Request, res: Response) {
    const result = await TeamService.create(req.body);
    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const { companyId } = req.query;
    const data = await TeamService.getAll(companyId as string);
    res.json(data);
  },
};
