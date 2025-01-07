import { Stack, Box, Typography, Button, Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import CourseContent from './CourseContent';
import { useState, useContext } from 'react';
import CourseForm from './CourseForm';
import { UserContext } from '../userContext';

/**
 * To render the course related information of each course(course title, course description)
 * @param courseData 
 * @returns 
 */

export default function CourseInfo({ courseData }) {

    const { user } = useContext(UserContext); // Assuming 'user' contains 'role'

    let visible = user && user.role !== 'student';

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        console.log(edit)
        setEdit(!edit);
    }

    const [showAlert, setShowAlert] = useState(false);

    const handleAlert = () => {
        setShowAlert(!showAlert);
    }
    return (
        <>
            <Stack
                direction="column"
                sx={{
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        justifyContent: "center",
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                        p: 3
                    }}

                >
                    <Stack direction="row">
                        <Typography variant="h3" gutterBottom>
                            {courseData.course_title}
                        </Typography>
                        {/**
                     * Edit button only available for instructor
                     */}
                        {visible && <Button onClick={handleEdit}>Edit</Button>}
                        {showAlert && <Alert severity="success"
                            sx={{ height: '3rem' }}>Changed Successfully!</Alert>}
                    </Stack>
                    <div>
                        {edit && <CourseForm open={edit}
                            handleClose={handleEdit}
                            handleAlert={handleAlert}
                            title={courseData.course_title}
                            description={courseData.course_description}
                            postURL={`http://127.0.0.1:5000/course?course_id=${courseData.id}`}
                            course_id={courseData.id}
                        />}

                    </div>
                    <Typography variant="body1" gutterBottom>
                        {courseData.course_description}
                    </Typography>
                    {/* Read only rating */}
                    <Typography variant='h5'>Course Rating</Typography>
                    <Rating name="read-only" value={4} readOnly />


                </Box>
                <CourseContent selectedIndex={0} />

            </Stack>
        </>

    );
}