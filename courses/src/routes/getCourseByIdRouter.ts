import { Router } from "express";
import prisma from "../../prisma/prisma";

const router = Router();

router.get("/api/courses/:category", async (req, res) => {
  const courseId = req.params.category;

  const course = await prisma.courseContent.findMany({
    where: {
      courseId: parseInt(courseId),
    },
  });

  if (course.length === 0) {
    return res.status(404).send("Course not found");
  }

  res.send(course).status(200);
});

export { router as getCourseByIdRouter };
