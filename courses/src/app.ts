import express from "express";

const app = express();

app.get("/api/courses", (req, res) => {
  res.send("Hello from courses service");
});

export default app;
