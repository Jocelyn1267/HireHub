
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faVideo, faFileLines, faComments, faComment } from '@fortawesome/free-solid-svg-icons';

/**
 * Generate the Menu of the CoursePage on the left for quickly navigation
 * @param { selectedIndex, handleListItemClick, isEnrolled, handleEnrollment }
 * @returns 
 */

export default function CourseMenu({ selectedIndex, handleListItemClick, isEnrolled, handleEnrollment }) {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 180,
            minHeight: '100vh',
            alignItems: 'flex-start',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
        }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={() => handleListItemClick(0)}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faHouse} style={{ color: "#4e2e09" }} />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                {/* Course content buttons - disabled if not enrolled */}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={() => handleListItemClick(1)}
                        disabled={!isEnrolled}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faVideo} style={{ color: "#4e2e09" }} />
                        </ListItemIcon>
                        <ListItemText primary="Video" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={() => handleListItemClick(2)}
                        disabled={!isEnrolled}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faFileLines} style={{ color: "#4e2e09" }} />
                        </ListItemIcon>
                        <ListItemText primary="Assessment" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={() => handleListItemClick(3)}
                        disabled={!isEnrolled}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faComments} style={{ color: "#4e2e09" }} />
                        </ListItemIcon>
                        <ListItemText primary="Discussion" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={() => handleListItemClick(4)}
                        disabled={!isEnrolled}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faComment} style={{ color: "#4e2e09" }} />
                        </ListItemIcon>
                        <ListItemText primary="Feedback" />
                    </ListItemButton>
                </ListItem>

                {/* Enroll button - hidden if already enrolled */}
                {!isEnrolled && (
                    <>
                        <ListItem sx={{ m: 1 }}>
                            <Button
                                onClick={handleEnrollment}
                                variant='contained'
                            >
                                Enroll Now!
                            </Button>

                        </ListItem>
                        <ListItem>
                            <Alert variant="outlined" severity="warning">
                                Please refresh after enroll
                            </Alert>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );
}
