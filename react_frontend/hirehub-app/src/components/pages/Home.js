import { Typography, Stack } from '@mui/material'; // Import UI components from Material-UI
import '../../App.css'; // Import global styles
import CardList from '../CardList'; // Import a custom component for displaying a list of cards
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React
import React, { useContext } from 'react'; // Import useContext hook from React
import { UserContext } from '../../userContext'; // Import UserContext for user-related data

/**
 * Home page for user
 * if the user is a student, the home page will show the course list that he/she enrolled;
 * if the user is an instructor, the home page will show the course list that he/she have;
 * if the user is an admin, the home page will show the course list of all courses of our system
 */
function Home() {
    const { user, isAuthenticated } = useContext(UserContext); // Retrieve user and authentication status from context
    const [loading, setLoading] = useState(true); // State to manage loading status of the component
    const [error, setError] = useState(''); // State to store any error messages
    const [coursesUrl, setCoursesUrl] = useState(''); // State to store the URL for fetching course data based on user role

    useEffect(() => {
        if (user && isAuthenticated) { // Check if user is authenticated
            let url = '';
            switch (user.role) { // Determine API URL based on user role
                case 'student':
                    url = `http://127.0.0.1:5000/student_courses?user_id=${user.id}`;
                    break;
                case 'instructor':
                    url = `http://127.0.0.1:5000/instructor_courses?user_id=${user.id}`;
                    break;
                case 'admin':
                default:
                    url = 'http://127.0.0.1:5000/courses'; // Default URL for admin or undefined roles
                    break;
            }
            setCoursesUrl(url); // Update state with the determined URL
        }
    }, [user, isAuthenticated]); // Re-run effect when user or authentication status changes

    useEffect(() => {
        if (coursesUrl) { // Check if a URL has been set
            const fetchData = async () => {
                try {
                    const response = await fetch(coursesUrl); // Attempt to fetch data from the API
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`); // Throw error if response is not OK
                    }
                    console.log('Get courses List:', response);
                } catch (error) {
                    console.error('Failed to fetch courses:', error);
                    setError('Failed to load courses'); // Set error state if fetching fails
                } finally {
                    setLoading(false); // Set loading state to false after fetch attempt
                }
            };

            fetchData(); // Call fetch function
        } else {
            setLoading(false); // Set loading state to false if no URL is set
        }
    }, [coursesUrl]); // Re-run effect when coursesUrl changes

    if (loading) {
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
                Loading... // Display loading message
            </Typography>
        );
    }

    if (!isAuthenticated) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                User not logged in. Please log in to access this page. // Display login prompt if user is not authenticated
            </Typography>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
            {error} // Display error message if there is an error
        </Typography>;
    }

    return (
        <div className='home'>
            <Stack
                direction='column'
                sx={{
                    width: '90%',
                    height: '100%',
                    margin: 'auto',
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    p: 13
                }}
            >
                <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center' }}>
                    Welcome to HireHub Home
                </Typography>
                 {/* Render CardList if a coursesUrl is available */}
                {coursesUrl && <CardList fetchUrl={coursesUrl} />} 
            </Stack>
        </div>
    );
}

export default Home; // Export the Home component for use in other parts of the application
