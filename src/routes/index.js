import express from "express";
import healthCheckRouter from "./health-check.routes.js";
import entitiesRouter from "./entities.routes.js";
import paymentsRouter from "./payments.routes.js";
import propertyRouter from "./property.routes.js";
import authRouter from "./auth.routes.js";

const router = express.Router();

router.use("/api", healthCheckRouter);
router.use("/entity", entitiesRouter);
router.use("/payment", paymentsRouter);
router.use("/property", propertyRouter);
router.use("/auth", authRouter);

export default router;
