const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Import the Job model
const User = require('../models/User'); // User model (Employee)
const Application = require('../models/Application'); // Import the Application model
const OngoingJob = require('../models/OngoingJob'); // Import the OngoingJob model
const authMiddleware = require('../middleware/authMiddleware'); 

// POST route for creating a new job

router.post('/create', async (req, res) => {
    try {
        const {
            title, companyName, location, jobCategory, description, salary, jobType, skillsRequired, employer
        } = req.body;

        // Split skillsRequired into an array (assuming it's a comma-separated string)
        const skillsArray = skillsRequired.split(',').map(skill => skill.trim());

        // Create a new job object
        const newJob = new Job({
            title,
            companyName,
            location,
            jobCategory,
            description,
            salary,
            jobType,
            skillsRequired: skillsArray,  // Store as an array
            employer,  // Employer ObjectId from the frontend
        });

        // Save the job to MongoDB
        await newJob.save();

        // Respond with success and include the generated Job ID (_id)
        res.status(201).json({ message: 'Job created successfully', jobId: newJob._id });
    } catch (error) {
        console.error("Error creating job:", error);  // Log error to console for debugging
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
});

// GET route to fetch all jobs
router.get('/', async (req, res) => {
    try {
        // Fetch all jobs from the database
        const jobs = await Job.find();

        // Send the jobs data as a response
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
});///DON"T TOUCH

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const jobId = req.params.id;
        const employerId = req.user.id; // Get the employer ID from the token

        const employer = await User.findById(employerId); // Find the employer by ID
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }

        const job = await Job.findOne({ _id: jobId, employer: employer.registrationId }); // Check if the job belongs to the employer
        if (!job) {
            return res.status(404).json({ message: 'Job not found or does not belong to the employer' });
        }

        // Find and delete all applications for this job
        const applications = await Application.find({ job: jobId });
        if (applications.length > 0) {
            await Application.deleteMany({ job: jobId });
        }

        const OngoingJobs = await OngoingJob.find({ job: jobId });
        if (OngoingJobs.length > 0) {
            await OngoingJob.deleteMany({ job: jobId });
        } 

        // Delete the job
        await Job.deleteOne({ _id: jobId });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
});

// Route to fetch jobs posted by the employer
/*router.get('/posted', authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find({ 
            employer: mongoose.Types.ObjectId(req.user.id) // Use `id` not `_id`
          });
        res.json(jobs);
    } catch (error) {
        console.log('User ID from token:', req.user._id); // Check if this matches the job's employer ID
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});*/

module.exports = router;
