const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = asyncHandler( async (req, res) => {
    try {
      const { firstName, lastName, userName, email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        roleType: 'user',
      });
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  const loginUser = asyncHandler( async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, email: user.email, role: user.roleType }, JWT_SECRET, {
        expiresIn: "7d",
      });
  
      user.lastLogin = new Date();
      await user.save();
  
      res.json({ message: "Login successful", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  module.exports = { registerUser, loginUser };