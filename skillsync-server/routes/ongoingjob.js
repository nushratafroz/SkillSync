const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Import the Job model
const User = require('../models/User'); // User model (Employee)
const authMiddleware = require('../middleware/authMiddleware'); 
const Application = require('../models/Application'); // Import the Application model
const OngoingJob = require('../models/OngoingJob'); // Import OngoingJob model
  
router.get('/', async (req, res) => {
    try {
        const ongoingJobs = await OngoingJob.find().populate('job').populate('applicant').populate('jobTitle');
        res.status(200).json(ongoingJobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to mark a job as completed
// Delete ongoing job
// DELETE endpoint to remove an ongoing job
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedJob = await OngoingJob.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting ongoing job:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;