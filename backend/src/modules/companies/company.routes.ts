import { Router } from "express";
import { CompanyController } from "./company.controller";

const router = Router();

router.post("/", CompanyController.create);
router.get("/", CompanyController.list);
router.get("/:id", CompanyController.get);

export default router;
