import { FormControl, Typography, Rating,TextField, Box, Button} from '@mui/material';
import { useState } from 'react';

/**
 * Form for Feedback
 */
function FeedbackForm() {
    const [value, setValue] = useState(3);
    const handleSubmit = ()=>{
        console.log('submit');
    }
    return(
        <>
            <Box 
                sx={{ width: '80%',
                    height: '80%',
                    margin: 'auto',
                    justifyContent:"center",
                    bgcolor: 'rgba(255, 255, 255, 1)',
                    p:10
                }}
            >
            <Typography variant='h4'>Rate Course</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
            />
           

                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    
                >
                    <Typography variant='h4'>Leave a feedback</Typography>
                    <FormControl fullWidth margin="normal" sx={{height:'500'}}>
                        <TextField id="outlined-basic" label="Enter Feedback" variant="outlined"/>
                    </FormControl>
                    <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
                        <Button variant="contained" color="primary" type="submit" >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );


}export default FeedbackForm;