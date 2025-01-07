// import { Button } from '../Button'
import { Button } from '@mui/material';
import React, { useContext, useState }from 'react'
// import { UserContext } from '../../userContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../userContext';

/**
 * Login Page Rendering
 */
function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for feedback
    const [error, setError] = useState('');

    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(''); // Clear any previous errors

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password,
            });

            // Navigate only if the response status is 200
            if (response.status === 200) {
                login(response.data); // Utilize the login function from UserContext
                navigate('/home');
                
            } else {
                setError('Unexpected response from server. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your email and password.');
            // setIsAuthenticated(false);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        // <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
        <div className='login'>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                 {error && <p style={{ color: 'red' }}>{error}</p >}
                {/* <div style={{ marginBottom: '10px' }}> */}
                <div className='form-input'>
                    <label>Email:</label>
                    <input
                        className = "input-box"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* <div style={{ marginBottom: '10px' }}> */}
                <div className='form-input'>
                    <label>Password:</label>
                    <input
                        className = "input-box"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button
                    type="submit"
                    // className={`btn ${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
                    variant='contained'
                    disabled={isSubmitting}
                    size='small'
                    sx={{margin:1}}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont't have an account? 

                {/* <Button  onClick = {handleButtonClick} toLink="/Registration" buttonStyle="btn--withbox">
                    Sign up
                </Button> */}

            <Link to="/registration" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small" sx={{ margin: 1 }}>
                    Sign up
                </Button>
                </Link>
                {/* Dont't have an account? {button && <Button buttonStyle='btn--outline' toLink = './Registration'>ign-up</Button>} */}
                {/* Don't have an account? <a href=" " class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a > */}
              </p >
            </form>
        </div>
        </div>
    );
}

export default LoginPage;