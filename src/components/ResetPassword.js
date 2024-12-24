import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            setMessage('Password should be at least 6 characters long.');
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
            if (res.status === 200) {
                setMessage('Your password has been successfully reset!');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after reset
                }, 2000);
            }
        } catch (err) {
            setMessage('Failed to reset the password. Please try again.');
        }
    };

    return (
        <div className="card p-4">
            <h2>Reset Password</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
