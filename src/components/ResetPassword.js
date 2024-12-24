import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Track success state

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password length
        if (newPassword.length < 6) {
            setMessage('Password should be at least 6 characters long.');
            setIsSuccess(false);
            return;
        }

        try {
            const res = await axios.post(
                `https://password-reset-backend-y39v.onrender.com/reset-password/${token}`,
                { newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json', // Explicitly set Content-Type
                    },
                }
            );
            if (res.status === 200) {
                setMessage('Your password has been successfully reset!');
                setIsSuccess(true);
            }
        } catch (err) {
            console.error(err);
            const errorMessage =
                err.response?.data?.error || 'Failed to reset the password. Please try again.';
            setMessage(errorMessage);
            setIsSuccess(false);
        }
    };

    return (
        <div className="card p-4">
            <h2>Reset Password</h2>
            {message && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
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
                <button type="submit" className="btn btn-primary">
                    Reset Password
                </button>
            </form>
            {isSuccess && (
                <div className="mt-3">
                    <Link to="/login" className="btn btn-link">
                        Click here to login after resetting your password!
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
