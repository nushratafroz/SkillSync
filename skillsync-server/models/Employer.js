const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['employer'],
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationId: {
        type: String,
        required: true,
        unique: true,  // Ensure the registrationId is unique
    },
    companyName: {
        type: String,
        required: true,
    },
    companyWebsite: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
});

module.exports = mongoose.model('Employer', employerSchema);
