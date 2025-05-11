const express = require('express');
const router = express.Router();
const AppliedJob = require('../models/AppliedJob'); // Import the AppliedJob model
const Job = require('../models/Job'); // Import the Job model (to get job details)
const User = require('../models/User'); // Import the User model (if you need user info)

router.post('/apply', async (req, res) => {
    try {
        const { jobId, userId } = req.body; // Expecting jobId and userId from the frontend

        // Fetch job details from the Job model
        const job = await Job.findById(jobId);
        console.log('Job:', job);  // Log job to check if data is fetched correctly

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Fetch user details (optional, depending on your needs)
        const user = await User.findById(userId);
        console.log('User:', user);  // Log user to check if data is fetched correctly

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new applied job entry with job data and userId
        const newAppliedJob = new AppliedJob({
            jobTitle: job.title,
            companyName: job.companyName,
            location: job.location,
            employer: job.employer,
            jobCategory: job.jobCategory,
            jobType: job.jobType,
            salary: job.salary,
            skillsRequired: job.skillsRequired,
            description: job.description,
            userId: userId
        });

        // Save the applied job to the database
        await newAppliedJob.save();

        res.status(201).json({ message: 'Job application submitted successfully', newAppliedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
