import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Signup request, ", req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User already exists.");
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login request, ", req.body);

  // Find user by email
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password." });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password." });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });

  // Send response with token
  return res.json({ success: true, message: { token } });
});

export default router;
