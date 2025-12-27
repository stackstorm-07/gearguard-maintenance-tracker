import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import companyRoutes from "./modules/companies/company.routes";
import equipmentRoutes from "./modules/equipment/equipment.routes";
import teamRoutes from "./modules/teams/team.routes";
import categoryRoutes from "./modules/equipmentCategories/equipmentCategory.routes";
import maintenanceRoutes from "./modules/maintenance/maintenance.routes";

const app = express();

app.use(cors());
app.use(express.json());

/* Auth */
app.use("/api/auth", authRoutes);

/* Core Modules */
app.use("/api/companies", companyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/maintenance", maintenanceRoutes);

export default app;
