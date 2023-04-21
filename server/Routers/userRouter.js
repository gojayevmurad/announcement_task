import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { createToken } from "../middlewares/middlewares.js";

const router = express.Router();

// localhost:5000/users/signup (POST)

router.post("/signup", async (req, res) => {
  try {
    const { fullname, password, phoneNumber, email } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user

    const createdUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// localhost:5000/users/signin (POST)

router.post("/signin", async (req, res) => {
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

    return res.status(200).json({
      user,
      token: createToken(user._id),
      message: "User signed in successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
