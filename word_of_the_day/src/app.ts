import express, { json } from "express";
import prisma from "../prisma/prisma";

const app = express();

app.use(json());

app.get("/api/word/current", async (_, res) => {
  try {
    const mostRecentWord = await prisma.word.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const capitalizedWord =
      mostRecentWord?.word?.charAt(0).toUpperCase()! + mostRecentWord?.word?.slice(1);
    const capitalizedMeaning =
      mostRecentWord?.meaning?.charAt(0).toUpperCase()! + mostRecentWord?.meaning?.slice(1);
    const capitalizedExample =
      mostRecentWord?.example?.charAt(0).toUpperCase()! + mostRecentWord?.example?.slice(1);

    res.json({
      word: capitalizedWord,
      meaning: capitalizedMeaning,
      example: capitalizedExample,
    });
  } catch (error) {
    console.error("Error retrieving most recent word:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
