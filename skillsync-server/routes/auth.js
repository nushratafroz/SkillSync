const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');


// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const {
            role,
            fullName,
            email,
            password,
            phone,
            location,
            experience,
            workType,
            languages,
            education,
            linkedin,
            bio,
            companyName,
            companyWebsite,
            companyDescription
        } = req.body;

        // Basic validation
        if (!role || !email || !password || !fullName) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the user data
        const userData = {
            role,
            fullName,
            email,
            password: hashedPassword
        };

        // Generate registration ID
        const registrationId = `REG-${Math.random().toString(36).slice(-6).toUpperCase()}`

        // Add role-specific data to the user object
        if (role === 'jobseeker') {
            Object.assign(userData, {
                phone,
                location,
                experience,
                workType,
                languages,
                education,
                linkedin,
                bio
            });
        }

        if (role === 'employer') {
            Object.assign(userData, {
                companyName,
                companyWebsite,
                companyDescription
            });
        }

        // Add registration ID to user data
        userData.registrationId = registrationId;

        // Create new user
        const newUser = new User(userData);
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, role: newUser.role, fullName: newUser.fullName }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                role: newUser.role,
                fullName: newUser.fullName,
                email: newUser.email,
                registrationId: newUser.registrationId // Include registrationId in the response
            },
            token
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role, fullName: user.fullName }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Send back response with token and user data
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                role: user.role,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//
router.get('/myprofile', async (req, res) => {
    try {
        const employeeId = req.user.id; // Extracting the user ID from the JWT token
        const user = await User.findById(employeeId);  // Use Employee model

        // Only return profile information (no job-related data yet)
        const profileData = {
            fullName: employee.fullName,
            email: employee.email,
            phone: employee.phone,
            location: employee.location,
            education: employee.education,
            languages: employee.languages,
            bio: employee.bio,
        };

        res.json(profileData); // Send the profile data back
    } catch (err) {
        console.error('Error fetching profile data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
