import cors, { CorsOptions } from "cors";
import express, { json } from "express";
import {
  meRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
  verifyEmailRouter,
} from "./routes/index";

const app = express();

const corsOptions: CorsOptions = {
  origin: "*",
};

app.use(json());
app.use(cors(corsOptions));

app.use(meRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(verifyEmailRouter);

app.get("/", (req, res) => {
  res.send("Hello from auth service");
});

app.post("/api/users/login", (req, res) => {
  console.log("Login request received");

  res.status(201).json({ message: "OK" });
});

export default app;
