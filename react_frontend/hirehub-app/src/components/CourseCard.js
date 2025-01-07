import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

/**
 * A Card component to show the course title, image, clickable link
 * @param courseData
 */

export default function CourseCard({courseData}) {
    const courseId = courseData.courseId || courseData.id;
    const link = `/courses/${courseId}`;
    console.log(link);

    return (
        <Card sx={{ maxWidth: 345 }}>
            {/**
             * Data fetch
             */}
            <Link to={link}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="150"
                    image={courseData.image_url}
                    alt={courseData.img_alt}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {courseData.course_title}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}