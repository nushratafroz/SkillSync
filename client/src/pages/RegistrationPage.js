import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';


const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: '',
        fullName: '',
        email: '',
        password: '',
        phone: '',
        location: '',
        experience: '',
        workType: '',
        languages: '',
        education: '',
        linkedin: '',
        bio: '',
        companyName: '',
        companyWebsite: '',
        companyDescription: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store the JWT token in localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token); // Store token in localStorage
            }

            // Redirect based on the role of the user
            if (data.user.role === 'jobseeker') {
                navigate('/myprofile');
            } else {
                navigate('/employer');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="contact-hero">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} className="contact-form-wrapper">
                        <h2 className="contact-form-heading">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Select
                                className="contact-form-control"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="employer">Employer</option>
                                <option value="jobseeker">Job Seeker</option>
                            </Form.Select>

                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />

                            <Form.Control
                                className="contact-form-control"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />

                            <Form.Control
                                className="contact-form-control"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />

                            {formData.role === 'employer' && (
                                <>
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
                                        type="url"
                                        name="companyWebsite"
                                        value={formData.companyWebsite}
                                        onChange={handleChange}
                                        placeholder="Company Website"
                                    />

                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="contact-form-control"
                                        name="companyDescription"
                                        value={formData.companyDescription}
                                        onChange={handleChange}
                                        placeholder="Company Description"
                                    />
                                </>
                            )}

                            {formData.role === 'jobseeker' && (
                                <>
                                    <Form.Control
                                        className="contact-form-control"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                    />

                                    <Form.Control
                                        className="contact-form-control"
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Location"
                                    />

                                    <Form.Select
                                        className="contact-form-control"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    >
                                        <option value="">Experience Level</option>
                                        <option value="1-2">1-2 years</option>
                                        <option value="2-3">2-3 years</option>
                                        <option value="3-6">3-6 years</option>
                                        <option value="6-more">6+ years</option>
                                    </Form.Select>

                                    <Form.Select
                                        className="contact-form-control"
                                        name="workType"
                                        value={formData.workType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Work Type</option>
                                        <option value="remote">Remote</option>
                                        <option value="onsite">On-site</option>
                                        <option value="hybrid">Hybrid</option>
                                    </Form.Select>

                                    <Form.Control
                                        className="contact-form-control"
                                        type="text"
                                        name="languages"
                                        value={formData.languages}
                                        onChange={handleChange}
                                        placeholder="Languages (comma-separated)"
                                    />

                                    <Form.Control
                                        className="contact-form-control"
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="Education"
                                    />

                                    <Form.Control
                                        className="contact-form-control"
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="LinkedIn Profile"
                                    />

                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="contact-form-control"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Short Bio"
                                    />
                                </>
                            )}

                            <Button
                                type="submit"
                                className="contact-submit w-100"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Create Account'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegistrationPage;