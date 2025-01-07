
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faFilm } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useEffect } from 'react';
import CommentItem from './commentItem';
import VideoPopup from './VideoPopup';
import { UserContext } from '../userContext';


const ITEMS_PER_PAGE = 10;
/**
 * A component to generate the list of the content listed on each CoursePage
 * Is used by Video, Assessment, Comment, Discussion
 * @param selectedIndex : which type of list to render(Video, Assessment, Comment, Discussion)
 * @param contentList : the specific content of the list
 * @param handleButtonClick
 * @param video : is video or not
 * @param handleVideo
 */

function ContentList({ selectedIndex, contentList, handleButtonClick, video, handleVideo }) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [showApproval, setApproval] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated) {
      if (user.role === 'admin') {
        setApproval(true);
      } else {
        setApproval(false);
      }
    }
  }, [user, isAuthenticated]);


  // Calculate the number of pages based on data length and items per page
  const totalPages = Math.ceil(contentList.length / ITEMS_PER_PAGE);

  // Get current items for the page
  const currentItems = contentList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
  };



  function icon() {
    let icon;
    if (selectedIndex === 1) {
      icon = faFilm
    }
    else if (selectedIndex === 2 || selectedIndex === 3) {
      icon = faFilePen
    }

    return (<ListItemIcon sx={{ minWidth: 25 }}>
      <FontAwesomeIcon icon={icon} />
    </ListItemIcon>);

  }



  const handleApprove = async (videoId) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoid: videoId,
          status: false, // Change the status to "false" (approved)
        }),
      });

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text(); // Get the response as text for debugging
        throw new Error(`Unexpected response type. Response text: ${text}`);
      }

      const result = await response.json();

      if (response.ok) {
        console.log('Video approved successfully:', result);
      } else {
        console.error('Error approving video:', result.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <>
      <List>
        {currentItems.map((content) => (
          <ListItem key={content.id}>
            {selectedIndex === 0 ? (
              <CommentItem comment={content.comment} rating={content.value} />
            ) : (
              // If user clicked assessment, display the AssessmentDetail Page
              <ListItemButton onClick={handleButtonClick}>
                {icon({ selectedIndex })}
                <ListItemText primary={content.video_title} />
                {/**
                 * If user want to play one of the video
                 */}
                {video && (
                  <VideoPopup
                    open={video}
                    handleVideo={handleVideo}
                  />
                )}
              </ListItemButton>
            )}
            {/**
             * Approvel button only shows if user is admin
             * @todo: need to add one more condition, if video is not approved
             */}
            {showApproval && content.status === 'pending' && (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleApprove(content.videoid)}>
                Approve
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}

export default ContentList;