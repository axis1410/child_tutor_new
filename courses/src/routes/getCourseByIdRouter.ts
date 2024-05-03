import { Router } from "express";
import prisma from "../../prisma/prisma";

const router = Router();

router.get("/api/courses/:id", async (req, res) => {
  const course = await prisma.course.findMany({});

  res.send(course);
});

export { router as getCourseByIdRouter };
