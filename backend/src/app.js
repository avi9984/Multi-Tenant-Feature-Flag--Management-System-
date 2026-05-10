import express from "express";
import cors from "cors";

import superAdminRoutes from "./routes/superAdmin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import featureRoutes from "./routes/featureFlag.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/super-admin", superAdminRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/feature-flags", featureRoutes);

app.use("/api/user", userRoutes);

export default app;