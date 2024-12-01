import express from "express";
import Task from "../models/Task";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Create Task
router.post("/add-task", authMiddleware, async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  console.log("Got add task request", req.body);

  //   if (!task) {
  //     return res.status(400).json({ message: "Task is required" });
  //   }

  try {
    // Create a new task with userId from decoded JWT
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
    });

    await newTask.save();

    return res.status(201).json({ message: "Task added", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to add task" });
  }
});
// Get Tasks (with pagination)
router.get("/", authMiddleware, async (req, res) => {
  console.log("got fetch task request");
  const { page = 1, limit = 10 } = req.query;
  const tasks = await Task.find()
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));
  res.json(tasks);
});

export default router;
