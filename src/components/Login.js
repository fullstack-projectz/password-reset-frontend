import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://password-reset-backend-y39v.onrender.com/login', { email, password });
            if (res.status === 200) {
                setSuccessMessage('Login successful!');
                setMessage(''); // Clear any error messages
                setTimeout(() => {
                    navigate('/'); // Redirect after 2 seconds
                }, 2000);
            }
        } catch (err) {
            // Check if err.response is defined and handle accordingly
            if (err.response) {
                if (err.response.status === 400) {
                    setMessage('Your email is not registered. Please sign up.');
                } else {
                    setMessage('Invalid credentials, please try again.');
                }
            } else {
                setMessage('An error occurred. Please try again later.');
            }
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    return (
        <div className="card p-4">
            <h2>Login</h2>
            {message && <div className="alert alert-danger">{message}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <br />
                <a href="/forgot-password">Forgot Password?</a>
                <br />
                {/* Use Link from react-router-dom for navigation */}
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;
