// server/controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role, skills } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create registration ID
        const registrationId = `REG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            skills,
            registrationId,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({
            message: "User registered successfully",
            registrationId: newUser.registrationId,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


    
module.exports = { registerUser };
