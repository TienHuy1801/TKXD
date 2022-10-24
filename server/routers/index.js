import express from "express";

import personRoutes from "./person.js";
import householdRoutes from "./household.js";
import moneyRoutes from "./money.js";
import authRoutes from "./auth.js";

const router = express.Router();
router.use("/person", personRoutes);
router.use("/household", householdRoutes);
router.use("/money", moneyRoutes);
router.use("/auth", authRoutes);

export default router;
