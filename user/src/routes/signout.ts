import { Router } from "express";
import { signoutUser } from "../controllers/authController";

const router = Router();

router.post("/api/users/signout", signoutUser);

export { router as signoutRouter };
