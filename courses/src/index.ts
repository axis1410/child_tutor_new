import "dotenv/config";

import { Express } from "express";
import { listenToAmqp } from "../amqp/amqpListen";
import prisma from "../prisma/prisma";
import app from "./app";
import { populate } from "./db/populate";

async function start(app: Express) {
  try {
    await prisma.$connect();
    console.log("Connected to courses_db");

    const courses = await prisma.course.findMany();

    if (courses.length === 0) {
      await populate();
      console.log("Database populated");
    }

    console.log(courses);

    app.listen(3001, () => {
      console.log("COURSES: Listening on port 3001");
    });

    listenToAmqp();
    console.log("Listening to RabbitMQ");
  } catch (error) {
    console.log(error);
  }
}

start(app);
