import { Router } from "express";
import { TeamController } from "./team.controller";

const router = Router();

router.post("/", TeamController.create);
router.get("/", TeamController.list);

export default router;
