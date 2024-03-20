import express from "express";

const app = express();

app.get("/api/word", (req, res) => {
  res.json({ word: "hello" });
});

export default app;
