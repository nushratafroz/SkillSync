const mongoose = require('mongoose');

// Check if the model is already defined to prevent overwriting
const Job = mongoose.models.Job || mongoose.model('Job', new mongoose.Schema({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobCategory: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    jobType: {
        type: String,
        enum: ['fulltime', 'parttime', 'remote', 'freelance'],
        required: true
    },
    skillsRequired: { type: [String], required: true },
    employer:{ type: String, required: true },  
    createdAt: { type: Date, default: Date.now },
}));

module.exports = Job;
