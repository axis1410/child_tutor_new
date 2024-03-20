import { Express } from "express";
import app from "./app";

function start(app: Express) {
  app.listen(3003, () => {
    console.log("WORD OF THE DAY: Listening on port 3003");
  });
}

start(app);
