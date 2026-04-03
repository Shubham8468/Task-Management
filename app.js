import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./router/taskRouter.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", taskRouter);

app.use(errorMiddleware);

export default app;
