import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Divider, Stack } from '@mui/material';
import CourseMenu from '../CourseMenu';
import CourseContent from '../CourseContent';
import '../../App.css';
import CourseInfo from '../CourseInfo';
import { UserContext } from '../../userContext';

/**
 * Generate the course detail page, showing Course Info, Menu, comment and rating
 * Trigger by clicking on the card component of each course
 * Students can enroll in the courses if not yet
 * Users can be nevigated to video, assessment, discussion, feedback by the menu on the left
 */

export default function CoursePage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { user, isAuthenticated } = useContext(UserContext);

    // Fetch course data
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/courses/${id}`)
            .then(response => {
                setCourse(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching course:', error);
                setLoading(false);
            });
    }, [id]);

    // Check enrollment status
    useEffect(() => {
        if (user && isAuthenticated) {
            if (user.role !== "student"){
                setIsEnrolled(true);
            }else{
            axios.get(`http://127.0.0.1:5000/student_courses?user_id=${user.id}`)
                .then((response) => {
                    const data = response.data;
                    const enrolled = data.some(item => id === item.courseId);
                    setIsEnrolled(enrolled);
                })
                .catch((error) => {
                    console.error('Error fetching enrollment status:', error);
                    setIsEnrolled(false);
                });
            }
        }
    }, [user, isAuthenticated, id]);

    const handleListItemClick = (index) => {
        console.log("Button clicked with index:", index);
        setSelectedIndex(index);
    };

    const handleEnrollment = async () => {
        if (!user || !isAuthenticated) return;

        try {
            const response = await axios.post('http://127.0.0.1:5000/enroll', {
                user_id: user.id,
                course_id: id
            });

            if (response.status === 200) {
                setIsEnrolled(true);
                console.log('User successfully enrolled!');
                // Reset to home view after enrollment
                setSelectedIndex(0);
            }
        } catch (error) {
            console.error('Enrollment error:', error);
        }
    };

    if (loading) return <p>Loading course...</p >;
    if (!course) return <p>Course not found.</p >;

    return (
        <Stack className="coursePage" direction="row" justifyContent={'flex-start'}>
            <CourseMenu
                selectedIndex={selectedIndex}
                handleListItemClick={handleListItemClick}
                isEnrolled={isEnrolled}
                handleEnrollment={handleEnrollment}
            />
            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />
            
            {selectedIndex === 0 ? (
                <CourseInfo courseData={course} />
            ) : (
                <CourseContent selectedIndex={selectedIndex} />
            )}
        </Stack>
    );
}