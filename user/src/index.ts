import { Express } from "express";
import prisma from "../prisma/prisma";
import app from "./app";

async function start(app: Express) {
  try {
    await prisma.$connect();
    console.log("Connected to DB: auth_db");
    app.listen(3000, () => {
      console.log("USER SERVICE: Listening on port 3000");
    });
  } catch (error) {}
}

start(app);
