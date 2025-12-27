import { Request, Response } from "express";
import { UserService } from "./users.service";

export const UserController = {
  async register(req: Request, res: Response) {
    const result = await UserService.create(req.body);
    res.status(201).json(result);
  },
};
