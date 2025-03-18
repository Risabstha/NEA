import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body; 

  try {
    const user = await User.findOne({ username }); 
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "10h" });

    res.json({
      message: "User Logged in Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Register User
export const signupUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user (relying on unique index for username)
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signupUser:", error.message);

    // Handle duplicate username error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Handle validation errors (e.g., schema constraints)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    // Generic server error response
    res.status(500).json({ message: "Internal server error" });
  }
};







