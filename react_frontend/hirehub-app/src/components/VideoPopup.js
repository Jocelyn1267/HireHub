import { Dialog, DialogTitle, DialogContent, TextField, Stack, Card, Button, CardMedia, DialogActions} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import CommentItem from './commentItem'
export default function VideoPopup({open, handleVideo}) { 
    const videoTitle = 'Video Title'
    return(

        <Dialog open={open} 
            onClose={handleVideo}
            fullWidth
            maxWidth="lg"
        >
        <Stack direction='column' alignItems='center' justifyContent='space-evenly' 
            sx={{bgcolor: 'rgba(245, 229, 193, 0.7)'}}
        >
        {/**
         * Getting the title from the database
         */}
         <Stack 
            direction='row' 
            alignItems='center' 
            justifyContent='flex-end' 
            sx={{ width: '100%'}}
            
        >
            <DialogTitle  sx={{flexBasis:'74%',}}>
                {videoTitle}
            </DialogTitle>
            <DialogActions sx={{ flexBasis: '20%' }}>
            <Button onClick={handleVideo} color="error" startIcon={<FontAwesomeIcon icon={faCircleXmark} />}/>
          
            </DialogActions>
        </Stack>

        <DialogContent>
            <Card sx={{ width: 1000, height:500,  borderRadius:'10px'}}>
            <CardMedia 
             sx={{ height:'100%', objectFit: "contain",  borderRadius:'10px'}}
             component='iframe'
             title='video'
             src='https://www.youtube.com/embed/K1iu1kXkVoA'
            />
            </Card>


            <TextField label="Leave a comment" fullWidth margin="dense" />
            <CommentItem comment={"comment1"} rating={3}/>
            <CommentItem comment={"comment2"} rating={4}/>
            <CommentItem comment={"comment3"} rating={2}/>
            
        </DialogContent>
        </Stack>
        </Dialog>
    );  
}