import { Request, Response, Router } from "express";
import { verifyUserFromEmail } from "../controllers/authController";

const router = Router();

router.get("/api/users/verify/:token", verifyUserFromEmail);

export default router;
