import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import Container from '@mui/material/Container'
// import cardData from "./constant.js";
import CourseCard from "./CourseCard";
import Stack from '@mui/material/Stack'
import { Pagination, PaginationItem } from "@mui/material";
import axios from 'axios';

/**
 * A component to list all the Cards of the course on the page
 * used in Home, Course, SearchResult
 * @param fetchUrl from the backend
 */

const ITEMS_PER_PAGE = 6;

export default function CardList({ fetchUrl }){
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    if (fetchUrl) {
      setLoading(true);
      axios
          .get(fetchUrl)
        .then((response) => {
          setCourses(response.data);
          setLoading(false);
          setError('');
        })
        .catch((error) => {
          // console.error('Error fetching courses:', error);
          setError('Failed to load courses. Please try again.');
          setLoading(false);
        });
    }
  }, [fetchUrl]);

  
  

  
  // Calculate the number of pages based on data length and items per page
//   const totalPages = Math.ceil(cardData.length / ITEMS_PER_PAGE);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  
  // Get current items for the page
//   const currentItems = cardData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const currentItems = courses.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (courses.length === 0) {
    return <p>No courses found.</p>;
}

    return(
        
        <Container sx={{ mt: 5 }}>     {/* Adds margin-top of 5 units */}
            <Grid container spacing={2}>
                


                {currentItems.map((data) => {
                    // Fallback to either courseId or id
                    const courseId = data.courseId || data.id;

                    return (
                        <Grid size={4} key={courseId}>
                            <Link to={`/courses/${courseId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CourseCard courseData={data} />
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>

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
        </Container>
        
        
    );
}