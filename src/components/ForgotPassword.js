import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://password-reset-backend-y39v.onrender.com/forgot-password', { email });

            if (res.status === 200) {

                setMessage('A reset link has been sent to your email.');
            }
        } catch (err) {
            setMessage('EmailId is not registered Or invalid credentials.');
        }
    };

    return (
        <div className="card p-4">
            <h2>Forgot Password</h2>
            {message && <div className="alert alert-info">{message}</div>}
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
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
