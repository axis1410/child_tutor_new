import express, { json } from "express";
import { getCourseByIdRouter, getCoursesRouter } from "./routes";

const app = express();

app.use(json());

app.use(getCoursesRouter);
app.use(getCourseByIdRouter);

export default app;
