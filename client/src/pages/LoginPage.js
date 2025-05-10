import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(process.env.REACT_APP_API_URL+'/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);  // Store token in localStorage

                // Log the stored token to check its content
                console.log('Stored Token:', data.token); // Log token

                // Redirect based on user role
                if (data.user.role === 'jobseeker') {
                    navigate('/myprofile');
                } else {
                    navigate('/employer');
                }
            } else {
                const errData = await response.json();
                setError(errData.message || 'Login failed.');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };


    return (
        <section className="login-hero" style={{ backgroundColor: '#343a40', minHeight: '100vh', padding: '50px 0' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="login-box bg-dark p-4 rounded shadow">
                            <h2 className="text-center text-white mb-4">Login</h2>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-white">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="remember" />
                                    <label className="form-check-label text-white" htmlFor="remember">Remember me</label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning">Login</button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <p className="text-white">
                                    Don't have an account? <a href="/register" className="text-warning">Sign up here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
