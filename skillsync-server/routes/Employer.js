const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer'); // Employer model
const Job = require('../models/Job'); // Job model
const protect = require('../middleware/authMiddleware'); // Authentication middleware
const User = require('../models/User'); // User model (Employee)
const Application = require('../models/Application'); // Employer model



// Fetch jobs posted by the employer
// Employer route
router.get('/:id/jobs', async (req, res) => {
    try {
        const employerId = req.params.id;  // employer's registrationId
        const employer = await User.findOne({ registrationId: employerId }); // Find the user by registrationId

        if (!employer) {
            return res.status(404).send("Employer not found.");
        }

        // Now fetch the jobs where the employer's registrationId matches
        const jobs = await Job.find({ employer: employer.registrationId });

        if (!jobs.length) {
            return res.status(404).send("No jobs found for this employer.");
        }

        res.json(jobs); // Return the jobs as response
    } catch (error) {
        res.status(500).send("Server error.");
    }
});

// Employer route to fetch applications
router.get('/:id/applications', async (req, res) => {
    try {
        const employerId = req.params.id;  // employer's registrationId
        const employer = await User.findOne({ registrationId: employerId }); // Find the user by registrationId

        if (!employer) {
            return res.status(404).send("Employer not found.");
        }

        // Now fetch the applications where the employer's registrationId matches
        const applications = await Application.find({ registrationId: employer.registrationId })
            .populate('job') // Populate job details for the applications
            .populate('applicant') // Populate applicant details for the applications

        if (!applications.length) {
            return res.status(404).send("No applications found for this employer.");
        }

        res.json(applications); // Return the applications as response
    } catch (error) {
        res.status(500).send("Server error while fetching applications.");
    }
});




// Approve or Reject Job Application
router.put('/approve-job-application/:applicationId', protect, async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const { status } = req.body; // Status can be 'approve' or 'reject'

        const jobApplication = await Job.findById(applicationId);

        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        if (status === 'approve') {
            jobApplication.status = 'approved'; // Mark as approved
            await jobApplication.save();
            res.json({ message: 'Job application approved!' });
        } else if (status === 'reject') {
            jobApplication.status = 'rejected'; // Mark as rejected
            await jobApplication.save();
            res.json({ message: 'Job application rejected!' });
        } else {
            res.status(400).json({ message: 'Invalid status' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating job application', error: err.message });
    }
});

module.exports = router;
