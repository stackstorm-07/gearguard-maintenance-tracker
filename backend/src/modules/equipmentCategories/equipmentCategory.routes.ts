import { Router } from "express";
import { EquipmentCategoryController } from "./equipmentCategory.controller";

const router = Router();

router.post("/", EquipmentCategoryController.create);
router.get("/", EquipmentCategoryController.list);

export default router;
