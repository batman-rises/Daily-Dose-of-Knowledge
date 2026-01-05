import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "All fields required" });
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (e) {
    console.log("Error in Signing Up", e.message);
    res.status(500).json({ error: "Server error" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (e) {
    console.log("Error in Logging In", e.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
