const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // JWT validation middleware

// GET /api/myprofile - Get user profile (jobseeker or employer)
router.get('/myprofile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Send user data
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/employer - Get employer profile
router.get('/employer', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Send employer data
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
