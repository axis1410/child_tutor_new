import express, { Express, json } from "express";
import cron from "node-cron";
import prisma from "../prisma/prisma";
import app from "./app";
import { generateWord } from "./gemini/generateWord";

async function start(app: Express) {
  await prisma.$connect;
  console.log("WORD OF THE DAY: Connected to the database");

  app.listen(3003, () => {
    console.log("WORD OF THE DAY: Listening on port 3003");
  });

  cron.schedule(
    "52 10 * * *", // 10:06 PM IST
    () => {
      generateWord();
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
}

start(app);
