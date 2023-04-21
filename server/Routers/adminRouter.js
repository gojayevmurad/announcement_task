import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User, { USER_TYPE } from "../models/userModel.js";
import { checkToken, createToken } from "../middlewares/middlewares.js";
const router = express.Router();

// localhost:5000/admin/login (POST)

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.userType !== USER_TYPE[1]) {
      return res.status(400).json({ message: "You are not an admin" });
    }

    return res.status(200).json({
      admin: user,
      token: createToken(user._id, true),
      message: "ADMIN signed in successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// localhost:5000/admin/admin-page (GET)

router.get("/admin-page", checkToken, async (req, res) => {
  try {
    const admin = await User.findById(req.query.userId);
    if (admin.userType !== USER_TYPE[1]) {
      return res.status(400).json({ message: "You are not an admin" });
    }
    return res.status(200).json({
      admin,
      message: "SUCCESSFULLY",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: "back",
    });
  }
});

export default router;
