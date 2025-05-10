import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Reuse Navbar component
import Footer from '../components/Footer'; // Reuse Footer component
import '../assets/css/style.css';
import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeProfilePage = () => {
    const [employeeData, setEmployeeData] = useState({});
    const [ongoingJobs, setOngoingJobs] = useState([]); // Ongoing jobs state
    const [applications, setApplications] = useState([]); // To store applied jobs
    const [message, setMessage] = useState(null); // For alert message
    const navigate = useNavigate();

    // Fetch employee data and applied jobs
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');  // Redirect to login if no token
        } else {
            // Fetch employee profile and applied jobs
            axios.get(process.env.REACT_APP_API_URL+'/api/myprofile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setEmployeeData(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee profile data', error);
            });

            axios.get(process.env.REACT_APP_API_URL+'/api/job/applied', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log('Applied Jobs:', response.data); // Log the response data
                setApplications(response.data); // Ensure applications is always an array
            })
            .catch(error => {
                console.error('Error fetching applied jobs', error);
            });
        }
    }, []);



    // Check if job data is passed via state (from Apply Now button)
    const location = useLocation();
    const appliedJob = location.state?.job;

    // Add the applied job to the applications state
    useEffect(() => {
        if (appliedJob) {
            setApplications((prevJobs) => [...prevJobs, appliedJob]); // Add new job to applications array
        }
    }, [appliedJob]);

    //fetch ongoing jobs for the employer
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/api/ongoing-jobs')
            .then(response => {
                setOngoingJobs(response.data); // Set ongoing jobs after fetching
            })
            .catch(error => {
                console.error('Error fetching ongoing jobs:', error);
            });
    }, []);  // This runs on component mount, so ongoing jobs will be displayed

    // Handle Withdraw Job
    // Function to handle job withdrawal
    const handleWithdrawJob = (applicationId) => {
        axios.delete(`http://localhost:5000/api/withdraw-job/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(response => {
            // Remove the withdrawn application from the state
            setApplications(applications.filter(app => app._id !== applicationId));
            setMessage('Job application withdrawn!');
            setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
        })
        .catch(error => {
            console.error('Error withdrawing job', error);
            setMessage('Failed to withdraw application');
            setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
        });
    };
    // Fetch ongoing jobs for the employer
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/api/ongoing-jobs')
            .then(response => {
                setOngoingJobs(response.data); // Set ongoing jobs after fetching
                console.log('Ongoing Jobs:', response.data); // Log the ongoing jobs data
            })
            .catch(error => {
                console.error('Error fetching ongoing jobs:', error);
            });
    }, []); 
    // Mark the job as completed
       // Mark the job as completed
       const handleMarkComplete = (ongoingJobId) => {
        if (!window.confirm('Are you sure you want to mark this job as complete?')) return;
    
        axios.delete(`http://localhost:5000/api/ongoing-jobs/${ongoingJobId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(() => {
            // Assuming you have a state updater for ongoingJobs:
            setOngoingJobs(currJobs => currJobs.filter(job => job._id !== ongoingJobId));
            handleAlert('Ongoing job marked as complete!');
        })
        .catch(error => {
            console.error('Error marking job complete:', error);
            handleAlert('Failed to mark job complete.');
        });
    };
    // Handle Logout
    const handleLogout = () => {
        // Clear the auth token from localStorage
        localStorage.removeItem('authToken');
        setMessage('You have logged out.');

        // Redirect to login page after logout
        navigate('/login');  // Correct usage of navigate here
    };

    // Handle Delete Account
    const handleDeleteAccount = () => {
        axios.delete(process.env.REACT_APP_API_URL+'/api/delete-account')
            .then(() => {
                setMessage('Your account has been deleted.');
                setTimeout(() => {
                    window.location.href = '/';  // Redirect to homepage after account deletion
                }, 3000); // Wait for alert before redirecting
            })
            .catch(error => {
                console.error('Error deleting account', error);
            });
    };
    const handleAlert = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    console.log('Hello My profile'); // Log the employee data
    return (
        <div className="page-div">
            <Navbar />
            <section className="employee-hero">
                <div className="hero-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2 employee-title">
                                <h1>Welcome Back, <span style={{ color: '#8b92dd' }}>{employeeData.fullName}</span></h1>
                                <h3 style={{ color: '#ffffff' }}>Your SkillSync Dashboard</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Display the message (Alert) */}
            {message && <div className="alert">{message}</div>}

            <section className="employer-profile-section">
                <div className="container">
                    <div className="text-center employer-title">
                        <h2>Employee Dashboard</h2>
                    </div>

                    {/* Employer Basic Info */}
                    <div className="employer-info-card">
                        <div className="employer-profile-img" style={{ backgroundColor: '#ff6347', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                            {employeeData.name ? employeeData.name.charAt(0).toUpperCase() : 'J'}
                        </div>

                        <div className="employer-details">
                            <h3>{employeeData.name}</h3>
                            <h4>Profile ID: {employeeData._id}</h4>
                            <h4>Email: {employeeData.email}</h4>
                            <h4>Phone: {employeeData.phone}</h4>
                            <h4>Location: {employeeData.location}</h4>
                            <h4>Experience: {employeeData.experience}</h4>
                            <h4>Preferred Work: {employeeData.preferredWork}</h4>
                            <h4>Languages: {employeeData.languages}</h4>
                            <h4>Education: {employeeData.education}</h4>
                            <h4>LinkedIn: <a href={employeeData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a></h4>
                            <h4>Bio:{employeeData.bio}</h4>
                        </div>
                    </div>

                    {/*Ongoing Jobs Section*/}
                    <div className="ongoing-jobs-section">
                        <h3>Ongoing Jobs</h3>
                        {ongoingJobs.map((job) => {
                              
                            return (
                                <div className="ongoing-job-card" key={job._id}>
                                    <h4>{job.jobTitle}</h4>
                                    <h4>Employee: {job.applicantName}</h4>
                                    <h4>Employee ID: {job.employeeRegistrationId}</h4>
                                    <button className="btn-complete" onClick={() => handleMarkComplete(job._id)}>Mark Complete</button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Applied Jobs */}
                    <div className="applied-jobs-section">
                        <h3>Applied Jobs</h3>
                        {applications && applications.length === 0 ? (
                            <p>No jobs applied yet.</p>
                        ) : (
                            applications.map((application) => (
                                // Render only if job exists
                                application.job && (
                                    <div className="applied-job-card" key={application._id}>
                                        <p>Job Title:{application.job.title}</p>
                                        <p>Company Name:{application.job.companyName}</p>
                                        <p>Employer:{application.job.employer}</p>
                                        <p>Job Category:{application.job.jobCategory} | Type: ${application.job.jobType}</p>
                                        <p>Location: {application.job.location} | Salary: ${application.job.salary}</p>
                                        {/* Withdraw Button */}
                                        <div className="job-actions">
                                            <button className="btn-cancel-job" onClick={() => handleWithdrawJob(application._id)}>
                                                Withdraw Application
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))
                        )}
                    </div>



                    {/* Employee Actions */}
                    <div className="employee-actions mt-5">
                        <button className="btn-logout" id="logoutBtn" onClick={handleLogout}>Logout</button>
                        <button className="btn-delete" id="deleteAccountBtn" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EmployeeProfilePage;
