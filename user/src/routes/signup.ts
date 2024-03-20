// import { signupUser } from "controllers/authController";
import { Router } from "express";
import { signupUser } from "../controllers/authController";

const router = Router();

router.post("/api/users/signup", signupUser);

export default router;
