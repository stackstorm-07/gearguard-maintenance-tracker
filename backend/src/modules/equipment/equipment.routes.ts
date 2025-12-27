import { Router } from "express";
import { EquipmentController } from "./equipment.controller";

const router = Router();

router.post("/", EquipmentController.create);
router.get("/", EquipmentController.list);

export default router;
