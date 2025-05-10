import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Reuse Navbar component
import Footer from '../components/Footer'; // Reuse Footer component
import '../assets/css/style.css'; // Import your CSS file
import moment from 'moment'; // For displaying time ago
import { useNavigate } from 'react-router-dom';

const FindJobPage = () => {
    const [jobs, setJobs] = useState([]); // All jobs data fetched from the backend
    const [loading, setLoading] = useState(true); // Manage the loading state
    const [error, setError] = useState(null); // Manage error state
    const navigate = useNavigate();

    // Fetch job data from the backend (all jobs)
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/api/jobs') // GET route to fetch all jobs
            .then(response => {
                setJobs(response.data); // Set jobs data
                setLoading(false); // Stop loading after jobs are fetched
                console.log('Jobs:', response.data); // Log jobs to check if data is fetched correctly
            })
            .catch(error => {
                console.error('Error fetching job data', error);
                setError('Failed to fetch jobs');
                setLoading(false);

            });
    }, []);
    function handleApplyNow(jobId) {
        const token = localStorage.getItem('authToken'); // Get the token from local storage
        if (!token) {
            navigate('/login'); // Redirect to login if no token
            return;
        }

        axios.post(process.env.REACT_APP_API_URL+'/api/job/apply', { jobId }, {
            headers: { Authorization: `Bearer ${token}` } // Include token in headers
        })
            .then(response => {
                console.log('Job application submitted successfully', response.data);
                alert('Job application submitted successfully!');
                navigate('/myprofile'); // Redirect to My Profile page after applying
            })
            .catch(error => {
                console.error('Error applying for job', error);
                alert('Failed to apply for job. Please try again.');
            });
    }

    return (
        <div className="page-div">
            <Navbar />

            {/* Hero Section */}
            <div className="find-job-hero">
                <div className="find-job-hero-overlay"></div>
                <div className="find-job-hero-content">
                    <h1>Find Your Dream Job</h1>
                    <p>Explore thousands of job opportunities across industries and locations</p>
                </div>
            </div>

            {/* Display Error if any */}
            {error && <div className="error-message">{error}</div>}

            <div className="job-cards-container">
                {loading ? (
                    <h2>Loading...</h2>
                ) : jobs.length === 0 ? (
                    <h2>No jobs available.</h2>
                ) : (
                        jobs.map((job, index) => (
                            <div className="job-card-find" key={index}>
                                <h2>{job.title}</h2>
                                <p>{job.companyName} • 📍 {job.location}</p>
                                <p><strong>Employer ID:</strong> {job.employer}</p> {/* Display Employer's ObjectId */}
                                <p><strong>Job Category:</strong> {job.jobCategory}</p>
                                <p><strong>Job Type:</strong> {job.jobType}</p>
                                <p><strong>Salary:</strong> ${job.salary.toLocaleString()}</p>
                                <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
                                <p><strong>Description:</strong> {job.description}</p>
                                <span><strong>Posted:</strong> {moment(job.createdAt).fromNow()}</span>
                                <button onClick={()=>{handleApplyNow(job._id)}} className="btn btn-primary">Apply Now</button>

                            </div>
                        ))
                    )}
            </div>

            <Footer />
        </div>
    );
};

export default FindJobPage;
