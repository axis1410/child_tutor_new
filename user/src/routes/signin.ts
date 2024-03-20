import { Router } from "express";
import { loginUser } from "../controllers/authController";

const router = Router();

router.post("/api/users/signin", loginUser);

export default router;
