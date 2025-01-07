import { Stack, Rating, Typography, ListItemButton } from '@mui/material';
import { useState } from 'react'
export default function CommentItem({ comment, rating }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    }

    const displayComment = isExpanded
        ? comment :
        comment.length > 100
            ? comment.substring(0, 100) + "..."
            : comment;

    return (

        <Stack direction="row" spacing={10} justifyContent="space-betweens">
            <ListItemButton onClick={handleExpandClick} >
                <Typography>{displayComment}</Typography>
            </ListItemButton>
            <Rating name="read-only" value={rating} readOnly />

        </Stack>

    );
}
