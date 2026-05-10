import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { roleMiddleware } from "../middleware/role.middleware.js";

import { createFeatureFlag, getFeatureFlags, updateFeatureFlag, deleteFeatureFlag } from "../controllers/featureFlag.controller.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("ORG_ADMIN"), createFeatureFlag);

router.get("/", authMiddleware, roleMiddleware("ORG_ADMIN"), getFeatureFlags);

router.put("/:id", authMiddleware, roleMiddleware("ORG_ADMIN"), updateFeatureFlag);

router.delete("/:id", authMiddleware, roleMiddleware("ORG_ADMIN"), deleteFeatureFlag);

export default router;