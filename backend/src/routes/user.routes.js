import express from "express";

import { checkFeature } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/check-feature", checkFeature);

export default router;