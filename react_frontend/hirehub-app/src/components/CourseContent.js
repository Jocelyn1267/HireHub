import { Box, Typography, Stack, Button } from '@mui/material';
import '../App.css';
import ContentList from './ContentList';
import FeedbackForm from './FeedbackForm';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext, useEffect } from 'react';
import AssessmentContent from './AssessmentContent';
import UploadFileDialog from './UploadFileDialog';
import CourseForm from './CourseForm';
import { UserContext } from '../userContext';
import { useParams } from 'react-router-dom';

/**
 * To render the video, assessment, discussion, rating, and feedback section of each course
 * @param selectedIndex 
    * Index of each section: 
    * 0 Rating and Comment;
    * 1 Video; 
    * 2 Assessment List;
    * 3 Discussion; 
 * @returns 
 */


export default function CourseContent({ selectedIndex }) {

    const { user } = useContext(UserContext);
    const role = user.role;
    const { id } = useParams();
    const [videos, setVideos] = useState([]); // State to store videos

    useEffect(() => {
        let url = '';
        if (role === 'student' || role === 'instructor') {
            url = `http://127.0.0.1:5000/current_video_list?course_id=${id}&role=${role}`;
        } else if (role === 'admin') {
            url = `http://127.0.0.1:5000/pending_video_list`;
        }

        if (!url) return; // If the role is undefined or not handled, exit the function
        console.log("Fetching url: ", url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                setVideos(data); // Update state with fetched videos
                // console.log("Video List ", data);

            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }, [id, role]);

    // static data
    const assessmentList = [
        { id: 1, title: "Quiz 1: Basics" },
        { id: 2, title: "Assignment 1: Core Concepts" },
        { id: 3, title: "Final Exam" },
        { id: 4, title: "Quiz 1: Basics" },
        { id: 5, title: "Assignment 1: Core Concepts" },
        { id: 6, title: "Final Exam" },
        { id: 7, title: "Quiz 1: Basics" },
        { id: 8, title: "Assignment 1: Core Concepts" },
        { id: 9, title: "Final Exam" },
        { id: 10, title: "Quiz 1: Basics" },
        { id: 11, title: "Assignment 1: Core Concepts" },
        { id: 12, title: "Final Exam" },
        { id: 13, title: "Final Exam" },
        { id: 14, title: "Quiz 1: Basics" },
        { id: 15, title: "Assignment 1: Core Concepts" },
        { id: 16, title: "Final Exam" },
        { id: 17, title: "Quiz 1: Basics" },
        { id: 18, title: "Assignment 1: Core Concepts" },
        { id: 19, title: "Final Exam" },
    ];

    const commentsList = [
        { id: 1, comment: "Quiz 1: Basics", value: 1 },
        { id: 2, comment: "Wow, this course exceeded my expectations! The instructor explained complex topics in such a simple way, and the examples provided were incredibly relevant. I feel much more confident in my skills now, and I'm excited to apply everything I've learned to real-world projects!", value: 4 },
        { id: 3, comment: "Final Exam", value: 5 },
        { id: 4, comment: "Quiz 1: Basics", value: 2 },
        { id: 5, comment: "Assignment 1: Core Concepts", value: 4 },
        { id: 6, comment: "Final Exam", value: 3 },
        { id: 7, comment: "Quiz 1: Basics", value: 3 },
        { id: 8, comment: "Assignment 1: Core Concepts", value: 3 },
        { id: 9, comment: "Final Exam", value: 3 },
        { id: 10, comment: "Quiz 1: Basics", value: 3 },
        { id: 11, comment: "Assignment 1: Core Concepts", value: 3 },
        { id: 12, comment: "Final Exam", value: 3 },
        { id: 13, comment: "Final Exam", value: 3 },
        { id: 14, comment: "Quiz 1: Basics", value: 3 },
        { id: 15, comment: "Assignment 1: Core Concepts", value: 3 },
        { id: 16, comment: "Final Exam", value: 3 },
        { id: 17, comment: "Quiz 1: Basics", value: 3 },
        { id: 18, comment: "Assignment 1: Core Concepts", value: 3 },
        { id: 19, comment: "Final Exam", value: 3 },
    ];

    const discussionList = [
        { id: 1, title: "Understanding Core Concepts" },
        { id: 2, title: "Best Practices in Coding" },
        { id: 3, title: "Troubleshooting Common Issues" },
        { id: 4, title: "Advanced Techniques and Tips" },
        { id: 5, title: "Getting Started with the Project" },
        { id: 6, title: "Recommended Resources" },
        { id: 7, title: "Preparing for the Final Exam" },
        { id: 8, title: "Collaborative Learning and Group Study" },
        { id: 9, title: "Real-World Applications of Skills" },
        { id: 10, title: "Feedback and Suggestions" }
    ];


    var contentList = videos
    var listName = "Video List"
    var text_align = "center"
    let isStudent = role === 'student'

    if (selectedIndex === 2) {
        contentList = assessmentList;
        listName = "Assessment List"
    } else if (selectedIndex === 0) {
        contentList = commentsList
        listName = "Comments"
        text_align = 'left'
        isStudent = true
    } else if (selectedIndex === 3) {
        contentList = discussionList
        listName = "Discussion"
    }

    const [video, setVideo] = useState(false);
    const [assessment, setAssessment] = useState(false);
    const [addContent, setAddContent] = useState(false);
    const handleAddContent = () => {
        setAddContent(!addContent);
    }
    const handleVideo = () => {
        setVideo(!video);
    }
    const handleAssessment = () => {
        setAssessment(!assessment);
    }

    const handleButtonClick = () => {
        if (selectedIndex === 1) {
            handleVideo();
        } else if (selectedIndex === 2) {
            handleAssessment();
        }
    }




    function display() {
        if (selectedIndex === 4) {
            return <FeedbackForm />
        }

        return (
            <>
                {/**
             * A assessment is clicked, show the assessment
             */}
                {assessment ? (<AssessmentContent assessment={contentList[0]} handleAssessment={handleAssessment} />)
                    : (
                        /**
                         * This is for list of video or assessment
                         */
                        <><Stack direction="row">
                            <Typography variant="h4" align={text_align}>
                                {listName}
                            </Typography>
                            {isStudent ? (<></>) :
                                /**
                                 * Add button for add video
                                 */
                                (<Button variant="contained"
                                    sx={{
                                        width: 20, // Set the width of the button
                                        height: 20, // Set the height of the button to match the width
                                        minWidth: 0, // Ensures the button doesn’t expand horizontally
                                        borderRadius: '50%', // Makes the button circular
                                        ml: 2,
                                        padding: 0,
                                    }}
                                    onClick={handleAddContent}
                                >
                                    <FontAwesomeIcon icon={faAdd} />
                                </Button>

                                )}
                            {selectedIndex === 3
                                && addContent
                                && <CourseForm
                                    open={addContent}
                                    handleClose={handleAddContent}
                                    formTitle={"Add Discussion"}
                                    hasAlert={false}
                                    handleAlert={null}

                                />
                            }
                            {selectedIndex !== 3
                                && addContent
                                && <UploadFileDialog open={addContent} handleClose={handleAddContent} />}
                        </Stack><ContentList
                                selectedIndex={selectedIndex}
                                contentList={contentList}
                                handleButtonClick={handleButtonClick}
                                video={video}
                                handleVideo={handleVideo}
                            />
                        </>)}
            </>
        );
    }

    return (

        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                justifyContent: "center",
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                p: 3
            }}

        >
            {display({ selectedIndex })}

        </Box>


    );

}