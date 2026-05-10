import express from "express";

import { superAdminLogin, createOrganization, getOrganizations } from "../controllers/superAdmin.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/login", superAdminLogin);

router.post("/organization", authMiddleware, roleMiddleware("SUPER_ADMIN"), createOrganization);

router.get("/organizations", authMiddleware, roleMiddleware("SUPER_ADMIN"), getOrganizations);

export default router;