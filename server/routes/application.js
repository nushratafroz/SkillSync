const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); // Import the AppliedJob model
const Job = require('../models/Job'); // Import the Job model (to get job details)
const User = require('../models/User'); // Import the User model (if you need user info)
const OngoingJob = require('../models/OngoingJob'); // Import OngoingJob model
const moment = require('moment'); // Import moment for date handling
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware

router.post('/job/apply', authMiddleware, async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user.id; // Get userId from the authenticated user

        // Check if the user already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Fetch job details from the Job model
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // **Directly use job.employer (registrationId)** since it's already a string (employer's registrationId)
        const employerRegistrationId = job.employer; // This is already a string, no need to query the User model

        // Fetch user details (optional, depending on your needs)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new application entry
        const newApplication = new Application({
            job: job._id,
            applicant: user._id,
            registrationId: employerRegistrationId, // Use employer's registrationId directly from job.employer
            status: 'applied',
            appliedAt: moment().toISOString(), // Current date and time
        });

        // Save the application
        await newApplication.save();

        res.status(201).json({ message: 'Job application submitted successfully', newApplication });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/job/applied', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Get userId from the authenticated user
    try {
        // Fetch all applied jobs for the user
        const applications = await Application.find({ applicant: userId })
            .populate('job') // Populate job details
            .sort({ appliedAt: -1 }) // Sort by applied date (latest first)

        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// approving the application (which updates its status and moves it to ongoing jobs) 
// Approve Application Route
router.put('/approve-application/:applicationId', async (req, res) => {
    try {
        // Fetch and populate application data
        const application = await Application.findById(req.params.applicationId)
            .populate('job')
            .populate('applicant');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Create the OngoingJob using the populated data
        const ongoingJob = new OngoingJob({
            job: application.job,
            applicant: application.applicant,
            registrationId: application.registrationId,
            jobTitle: application.job.title,  // Get job title
            employeeRegistrationId: application.registrationId,
        });

        // Save ongoing job and remove the application
        await ongoingJob.save();
        await application.deleteOne();

        res.status(200).json({ message: 'Application approved and moved to ongoing jobs' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint to withdraw an application
router.delete('/withdraw-job/:id', authMiddleware, async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json({ message: 'Application withdrawn successfully' });
    } catch (error) {
        console.error('Error withdrawing application:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
