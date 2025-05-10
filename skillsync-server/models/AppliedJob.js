const mongoose = require('mongoose');

const AppliedJobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    }
});

const AppliedJob = mongoose.model('AppliedJob', AppliedJobSchema);

module.exports = AppliedJob;
