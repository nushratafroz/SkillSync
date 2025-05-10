const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');  // Assuming you have an Employee model
const Job = require('../models/Job');  // Assuming you have a Job model
const protect = require('../middleware/authMiddleware');

// Fetch Employee Profile Data

/*router.get('/myprofile', async (req, res) => {
    try {
        const employeeId = req.user.id; // Extracting the user ID from the JWT token
        const employee = await Employee.findById(employeeId); // Use Employee model

        // Only return profile information (no job-related data yet)
        const profileData = {
            _id: employee.id,
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
});*/


// Mark Job as Completed
router.put('/mark-job-complete/:jobId', async (req, res) => {
    try {
        const employeeId = req.user.id;
        const jobId = req.params.jobId;

        const employee = await Employee.findById(employeeId);
        const job = employee.ongoingJobs.find(job => job._id.toString() === jobId);

        if (job) {
            job.status = 'Completed'; // Mark job as completed
            await employee.save();
            res.json({ message: 'Job marked as completed' });
        } else {
            res.status(404).json({ message: 'Job not found in ongoing jobs' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error marking job as completed' });
    }
});

module.exports = router;
