import { Router } from "express";
import { MaintenanceController } from "./maintenance.controller";

const router = Router();

router.post("/", MaintenanceController.create);
router.get("/", MaintenanceController.list);
router.patch("/:id/status", MaintenanceController.updateStatus);

export default router;
