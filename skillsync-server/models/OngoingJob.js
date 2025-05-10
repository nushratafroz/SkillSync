const mongoose = require('mongoose');

const ongoingJobSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',  // Reference to the Job model
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (applicant)
        required: true
    },
    registrationId: {
        type: String,
        required: true  // Registration ID for the applicant
    },
    jobTitle: {
        type: String,
        required: true  // Job title from the Job model
    },
    employeeRegistrationId: {
        type: String,
        required: true  // Assuming employee's registrationId (same as applicant)
    },
    createdAt: {
        type: Date,
        default: Date.now  // Timestamp when the ongoing job was created
    }
});

module.exports = mongoose.model('OngoingJob', ongoingJobSchema);
