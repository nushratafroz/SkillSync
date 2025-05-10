const mongoose = require('mongoose');

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
    },
    phone: {
        type: String,
    },
    location: {
        type: String,
    },
    experience: {
        type: String, // Could be "1-2 years", "2-3 years", etc.
    },
    workType: {
        type: String, // Remote, Onsite, Hybrid
    },
    languages: {
        type: [String], // An array of languages
    },
    education: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    bio: {
        type: String,
    },
    jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Jobs the employee has applied to
    currentJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // The job the employee is currently hired for
});

module.exports = mongoose.model('Employee', employeeSchema);
