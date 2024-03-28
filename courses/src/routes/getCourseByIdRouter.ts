import { Router } from "express";

const router = Router();

router.get("/api/courses/:id", (req, res) => {
  res.send("Hello from getCourseByIdRouter");
});

export { router as getCourseByIdRouter };
