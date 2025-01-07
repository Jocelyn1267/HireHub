import React, { useState } from 'react';
// import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

/**
 * Registration Page Rendering
 */

function RegistrationPage() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '', // Role field for selecting user type
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for feedback
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.username) newErrors.username = 'Username is required.';
        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Valid email is required.';
        if (!user.password) newErrors.password = 'Password is required.';
        if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        if (!user.role) newErrors.role = 'Selecting a role is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const submitUser = async (username, email, password, role) => {
        const url = 'http://127.0.0.1:5000/register';
        const requestBody = {
            username,
            email,
            password,
            is_staff: role === 'instructor',
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 201) {
                const data = await response.json();
                alert('User created successfully!');
                console.log('Success:', data);
                navigate('/');
            } else {
                const errorData = await response.json();
                setErrors(errorData); // Set errors based on backend response
                // alert(`Failed to create user: ${errorData.message || 'Unknown error occurred.'}`);
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('Network error. Please try again later.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true); // Set loading state
            await submitUser(user.username, user.email, user.password, user.role);
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className='registration'>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {Object.keys(errors).length > 0 && (
                <div className="error-message">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <div className="form-input">
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="input-box"
                    required
                />
            </div>

            <div className="form-input">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="input-box"
                    required
                />
            </div>

            <div className="form-input">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="input-box"
                    required
                />
                
            </div>

            <div className="form-input">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className="input-box"
                    required
                />
            </div>

            <div className="form-input">
                <label>Role:</label>
                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="input-box"
                    required
                >
                    <option value="">Select a role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
            </div>

            <Button
                     type="submit"
                     // className={`btn ${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
                     variant='contained'
                     disabled={isSubmitting}
                     size='small'
                     sx={{margin:1}}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
            {/* <Button
                        type="submit"
                        buttonStyle="btn--withbox"
                        buttonSize="btn--medium"
                        disabled={isSubmitting} // Disable button during submission
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
            </Button> */}
        </form>
    </div>

    </div>
    );
}

export default RegistrationPage;


