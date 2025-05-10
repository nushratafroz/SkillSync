const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures the email is unique
    },
    password: {
        type: String,
        required: true,
    },
    registrationId: {
        type: String, 
        required: true
    },
    phone: String,
    location: String,
    experience: String,
    workType: String,
    languages: [String],
    education: String,
    linkedin: String,
    bio: String,
    companyName: String,
    companyWebsite: String,
    companyDescription: String,
});

module.exports = mongoose.model('User', userSchema);
