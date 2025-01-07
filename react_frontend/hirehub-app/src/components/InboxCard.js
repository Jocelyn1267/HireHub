import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Stack, Avatar } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';

/**
 * The card to show the inbox message
 * @param  message
 * @returns 
 */
export default function InboxCard({ message }) {
    // Expand to see the long message
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    }

    const getText = (text) => {
        if (!isExpanded) {
            text = text.substring(0, 49) + "..."
        }
        return text
    };


    return (


        <Card sx={{ width: '100%', p: 1 }}>
            <CardActionArea onClick={handleExpandClick}>
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                    <Avatar alt="Sender Image" src="/image/capybara.png" sx={{ width: 56, height: 56 }} />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" noWrap>
                            {message.subject}
                        </Typography>
                        <Typography variant='body2'>
                            {getText(message.text)}
                        </Typography>
                    </CardContent>
                    <Typography variant='body1' sx={{ minWidth: '120px' }}>
                        {new Date(message.receiveTime).toLocaleString()}
                    </Typography>
                </Stack>
            </CardActionArea>
            {/* <Link href={`/message/${message.id}`} underline='none' color='inherit' sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} /> */}
        </Card>
    );
}