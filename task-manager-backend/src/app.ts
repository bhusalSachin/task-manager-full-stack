import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Mongo URI = ", process.env.MONGO_URI!);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
