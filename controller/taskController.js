import { Task } from "../models/taskSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createTask = catchAsyncError(async (req, res, next) => {
  const { title, description, dueDate, category } = req.body;
  if (!title) {
    return next(new ErrorHandler("Task title is required!", 400));
  }
  
  const task = await Task.create({
    title,
    description,
    dueDate,
    category,
  });

  res.status(201).json({
    success: true,
    message: "Task Created Successfully!",
    task,
  });
});

export const getAllTasks = catchAsyncError(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    success: true,
    tasks,
  });
});

export const updateTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 404));
  }

  task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Task Updated!",
    task,
  });
});

export const markTaskComplete = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 404));
  }

  if (task.completed) {
    return next(new ErrorHandler("Task is already completed!", 400));
  }

  task.completed = true;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task marked as completed!",
    task,
  });
});

export const deleteTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 404));
  }
  
  await task.deleteOne();
  
  res.status(200).json({
    success: true,
    message: "Task deleted!",
  });
});
