import { Router } from "express";
import { getUserDetails } from "../controllers/authController";

const router = Router();

router.get("/api/users/me", getUserDetails);

export default router;
