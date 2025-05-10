const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
      
        default: 'pending'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    registrationId: {
        type: String,
        required: true // Ensure registrationId is required for each application
    },
    /*employeeRegistrationId: {  // Employee's registration ID (New field)
        type: String,
        required: true
    }*/
    
});


module.exports = mongoose.model('Application', applicationSchema);