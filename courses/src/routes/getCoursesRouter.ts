import { Request, Response, Router } from "express";
import prisma from "../../prisma/prisma";

const router = Router();

router.get("/api/courses", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const listOfCourses = await prisma.course.findMany();

  return res.status(200).json(listOfCourses);
});

export { router as getCoursesRouter };
