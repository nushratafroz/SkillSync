import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import '../assets/css/style.css';

const JobRegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        location: '',
        jobCategory: '',
        description: '',
        salary: '',
        jobType: 'fulltime',
        skillsRequired: '',
        employer: '',
        registrationId: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handling form data changes
    const handleChange = (e) => {
        if (e.target.name === 'skillsRequired') {
            // Automatically trim spaces around skills
            const value = e.target.value.split(',').map(skill => skill.trim()).join(', ');
            setFormData({
                ...formData,
                [e.target.name]: value
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Job creation failed');
            }

            // Redirect after successful job creation
            navigate('/findjobs');  // Replace with your job list page

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-hero">
            <Navbar /> {/* Include Navbar component */}
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} className="contact-form-wrapper">
                        <h2 className="contact-form-heading">Post a Job</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Job Title"
                                required
                            />

                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                required
                            />

                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Job Location"
                                required
                            />

                            {/* Job Category Dropdown */}
                            <Form.Select
                                className="contact-form-control"
                                name="jobCategory"
                                value={formData.jobCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Job Category</option>
                                <option value="Writing & Content Creation">Writing & Content Creation</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Social Media Management">Social Media Management</option>
                                <option value="Tech & Development">Tech & Development</option>
                            </Form.Select>

                            {/* Job Description */}
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="contact-form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Job Description"
                                required
                            />

                            {/* Salary */}
                            <Form.Control
                                className="contact-form-control"
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Salary"
                                required
                            />

                            {/* Job Status */}
                            <Form.Select
                                className="contact-form-control"
                                name="type"
                                value={formData.jobType}
                                onChange={handleChange}
                            >
                                <option value="fulltime">Full-Time</option>
                                <option value="parttime">Part-Time</option>
                                <option value="remote">Remote</option>
                                <option value="freelance">Freelance</option>
                            </Form.Select>

                            {/* Skills Required */}
                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="skillsRequired"
                                value={formData.skillsRequired}
                                onChange={handleChange}
                                placeholder="Skills Required (comma-separated)"
                                required
                            />

                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="employer"
                                value={formData.employer}
                                onChange={handleChange}
                                placeholder="Employer ID (ObjectId)"
                                required
                            />


                            <Button
                                type="submit"
                                className="contact-submit w-100"
                                disabled={loading}
                            >
                                {loading ? 'Creating Job...' : 'Post Job'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer /> {/* Include Footer component */}
        </div>
    );
};

export default JobRegistrationPage;
