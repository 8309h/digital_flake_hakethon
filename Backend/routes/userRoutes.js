const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const TokenModel =  require('../models/tokenModel')
const UserRouter = express.Router();

UserRouter.use(express.json());

UserRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserModel({
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    // Check if token exists in the database
    const existingToken = await TokenModel.findOne({ userId: user._id });
    if (existingToken) {
      existingToken.token = token;
      await existingToken.save();
    } else {
      await TokenModel.create({ token, userId: user._id });
    }

    res.status(200).json({ "msg": "Login successful",token, "user":user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.post("/logout", async (req, res) => {
  try {
    const token = req.body.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    await deleteTokenFromDatabase(token);

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function deleteTokenFromDatabase(token) {
  
  await TokenModel.deleteOne({ token });
}

module.exports = UserRouter;






