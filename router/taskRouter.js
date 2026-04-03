import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask, markTaskComplete } from "../controller/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.patch("/:id/complete", markTaskComplete);
router.delete("/:id", deleteTask);

export default router;
