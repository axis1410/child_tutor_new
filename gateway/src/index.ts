import "dotenv/config";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use("/api/users", createProxyMiddleware({ target: "http://user:3000" }));
app.use("/api/courses", createProxyMiddleware({ target: "http://courses:3001" }));
app.use("/api/tests", createProxyMiddleware({ target: "http://tests:3002" }));
app.use("/api/word", createProxyMiddleware({ target: "http://word_of_the_day:3003" }));

function start() {
  app.listen(3333, () => {
    console.log("Gateway is running on port 3333");
  });
}

start();
