const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const connectDB = require('./db');  // MongoDB connection handled in db.js
require('dotenv').config();  // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const listEndpoints = require('express-list-endpoints'); // Import express-list-endpoints to list all endpoints

const app = express();
app.use(express.json()); // Middleware to parse JSON requests


// Import Routes
const authRoutes = require('./routes/auth');  // Authentication routes
const employerRoutes = require('./routes/employer'); // Employer routes
const employeeRoutes = require('./routes/employee'); // Employee routes
const jobRoutes = require('./routes/job'); // Job routes
const userRoutes = require('./routes/user'); //User routes
const appliedJobsRoute = require('./routes/appliedJobs'); // Import the new route
const applicationRoute = require('./routes/application'); // Import the new route
const ongoingJobRoute = require('./routes/ongoingjob'); // Import the new route


// Middleware - Order matters!
app.use(cors({
  origin: true,         // Allow all origins dynamically
  credentials: true     // Required for cookies or auth headers
}));
app.use(express.json());  // Parse JSON data from requests
//app.use(fileUpload());  // Handle file uploads
//app.use('/uploads/resumes', express.static(path.join(__dirname, 'uploads/resumes')));  // Serve resume files

// Database connection
connectDB();  // MongoDB connection (handled in db.js)

// Authentication routes
app.use('/api/auth', authRoutes);  // Use authentication routes for login and register

// Employer routes

app.use('/api/employer', employerRoutes);  // Employer related routes


// Employee routes
app.use('/api/employee', employeeRoutes);  // Employee related routes

// Job routes
app.use('/api/jobs', jobRoutes);  // Job related routes

// User route
app.use('/api', userRoutes);

// Use the applied jobs route
app.use('/api/applied-jobs', appliedJobsRoute);

// Use the application route
app.use('/api', applicationRoute); // Import and use the application route

// Use the Ongoing Job route
app.use('/api/ongoing-jobs', ongoingJobRoute); // Import and use the ongoing job route

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    const endpoints = listEndpoints(app); // List all endpoints
    console.log('Available Endpoints:'); // Log the available Endpoints
    console.log(endpoints); // Log the endpoints to check if they are set correctly
});
