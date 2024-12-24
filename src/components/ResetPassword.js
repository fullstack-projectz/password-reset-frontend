import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the new password meets the length requirement
        if (newPassword.length < 6) {
            setMessage('Password should be at least 6 characters long.');
            return;
        }

        try {
            const res = await axios.post(`https://password-reset-backend-y39v.onrender.com/reset-password/${token}`, { newPassword });

            if (res.status === 200) {
                setMessage('Your password has been successfully reset!');
            }
        } catch (err) {
            console.error(err);
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
                <br></br>
                <Link to="/">If you changed your Password, click this!!!</Link>
            </form>
        </div>
    );
};

export default ResetPassword;
