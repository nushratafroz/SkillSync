import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Reuse NavE component
import Footer from '../components/Footer'; // Reuse Footer component
import '../assets/css/style.css';
import { useNavigate } from 'react-router-dom';

const EmployerPage = () => {
    const [employerData, setEmployerData] = useState({});
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ongoingJobs, setOngoingJobs] = useState([]); // Ongoing jobs state
    const [applications, setApplications] = useState([]); // Applications state
    const [postedJobs, setPostedJobs] = useState([]); // State for posted jobs
    const [message, setMessage] = useState(null);
    

    // Fetch employer data
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        } else {
            axios.get(process.env.REACT_APP_API_URL+'/api/employer', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setEmployerData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching employer profile data', error);
                    setErrorMessage('Error fetching employer profile data');
                });
        }
    }, [navigate]);

    // Fetch posted jobs for the employer
    useEffect(() => {
        if (employerData.registrationId) {
            axios.get(process.env.REACT_APP_API_URL+`/api/employer/${employerData.registrationId}/jobs`)
                .then(response => {
                    setPostedJobs(response.data);
                })
                .catch(err => {
                    setErrorMessage('Error fetching posted jobs.');
                    console.error('Error fetching posted jobs', err);
                });
        }
    }, [employerData.registrationId]);

    // Fetch applications received for the employer
    useEffect(() => {
        if (employerData.registrationId) {
            axios.get(process.env.REACT_APP_API_URL+`/api/employer/${employerData.registrationId}/applications`)
                .then(response => {
                    setApplications(response.data);
                    console.log('Applications:', response.data); // Log the applications data
                    setLoading(false);
                })
                .catch(err => {
                    setErrorMessage('Error fetching applications.');
                    setLoading(false);
                    console.error('Error fetching applications:', err);
                });
        }
    }, [employerData.registrationId]);

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
    }, []);  // This runs on component mount, so ongoing jobs will be displayed

    const handleApprove = (applicationId) => {
        axios.put(process.env.REACT_APP_API_URL+`/api/approve-application/${applicationId}`)
            .then(response => {
                // Update ongoing jobs state with the new job
                const approvedApp = applications.find(app => app._id === applicationId);
                setOngoingJobs([...ongoingJobs, {
                    jobTitle: approvedApp.job.title,
                    registrationId: approvedApp.registrationId,
                    applicantName: approvedApp.applicant.fullName,
                    job: approvedApp.job,
                    employeeRegistrationId: approvedApp.registrationId,
                }]);
    
                // Remove the application from the list
                setApplications(applications.filter(app => app._id !== applicationId));
    
                handleAlert('Application approved!');
            })
            .catch(error => {
                console.error('Error approving application:', error);
            });
    };
    

    // Mark the job as completed
    const handleMarkComplete = (ongoingJobId) => {
        if (!window.confirm('Are you sure you want to mark this job as complete?')) return;
    
        axios.delete(process.env.REACT_APP_API_URL+`/api/ongoing-jobs/${ongoingJobId}`, {
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
        
        
    
    

    const handleReject = (applicationId) => {
        axios.put(process.env.REACT_APP_API_URL+`/api/reject-application/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}` // Send the auth token
            }
        })
            .then(() => {
                setApplications(applications.filter(app => app._id !== applicationId)); // Remove from applications
                handleAlert('Application rejected!');
            })
            .catch(err => console.error(err));
    };
    // Cancel the job posting
    const handleCancelJob = (jobId) => {
        axios.delete(process.env.REACT_APP_API_URL+`/api/jobs/${jobId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}` // Send the auth token
            }
        })
            .then(() => {
                setPostedJobs(postedJobs.filter(job => job._id !== jobId)); // Remove canceled job from the state
                handleAlert('Job canceled and removed from posted jobs');
            })
            .catch(error => {
                console.error('Error canceling job', error);
                handleAlert('Failed to cancel job');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setMessage('You have logged out.');
        navigate('/login');
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

    return (
        <div className="page-div">
            <Navbar/>
            <section className="employee-hero">
                <div className="hero-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2 employee-title">
                                <h1>Welcome Back, <span style={{ color: '#8b92dd' }}>{employerData.fullName}</span></h1>
                                <h3 style={{ color: '#ffffff' }}>Your SkillSync Employer Dashboard</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {message && <div className="alert">{message}</div>}

            <section className="employer-profile-section">
                <div className="container">
                    <div className="text-center employer-title">
                        <h2>Employer Dashboard</h2>
                    </div>

                    <div className="employer-info-card">
                        <div className="employer-profile-img" style={{ backgroundColor: '#8b92dd', width: '100px', height: '100px', borderRadius: '50%' }}>
                            {employerData.fullName ? employerData.fullName.charAt(0).toUpperCase() : 'E'}
                        </div>
                        <div className="employer-details">
                            <h4>Profile ID: {employerData._id}</h4>
                            <h3>{employerData.fullName}</h3>
                            <h4>Company: {employerData.companyName}</h4>
                            <h4>Email: <a href={employerData.companyWebsite} target="_blank" rel="noopener noreferrer">{employerData.companyWebsite}</a></h4>
                            <h4>Website: {employerData.companyWebsite}</h4>
                            <p>Description: {employerData.companyDescription}</p>
                        </div>
                    </div>

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


                    <div className="posted-jobs-section">
                        <h3>Posted Jobs</h3>
                        {postedJobs.length > 0 ? (
                            postedJobs.map((job) => (
                                <div key={job._id} className="posted-job-card">
                                    <h4>{job.title}</h4>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Job Category:</strong> {job.jobCategory}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    <p><strong>Job Type:</strong> {job.jobType}</p>
                                    <div className="job-actions">
                                        <button className="btn-cancel-job" onClick={() => handleCancelJob(job._id)}>Cancel Job</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No job found for this employer.</p>
                        )}
                    </div>

                    <div className="applications-received-section">
                        <h3>Applications Received</h3>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <div key={application._id} className="application-card">
                                    <h4>Applicant: {application.applicant.fullName}</h4>
                                    <p><strong>Job Title:</strong> {application.job.title}</p>
                                    <p><strong>Status:</strong> {application.status}</p>
                                    <div className="application-actions">
                                        <button className="btn-approve" onClick={() => handleApprove(application._id)}>Approve</button>
                                        <button className="btn-reject" onClick={() => handleReject(application._id)}>Reject</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No applications found for this employer.</p>
                        )}
                    </div>

                    <div className="employee-actions mt-5">
                        <button className="btn-logout" onClick={handleLogout}>Logout</button>
                        <button className="btn-delete" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EmployerPage;
