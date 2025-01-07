import { Stack, Box, Typography, Divider, Button, Alert} from '@mui/material';
import { useState } from 'react';
import AssessmentDetail from './AssessmentDetail';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * The content of the Assessment
 */
export default function AssessmentContent({assessment, handleAssessment}){

    const dueDate = "12/01/2024"
    const num_question = 20
    const time_limit = "30 min"
    const [start, setStart] = useState(false)
    const [submit, setSubmit] = useState(false);
    const handleStart=()=>{
        setStart(!start);
    }
    const handleSubmit=()=>{
        setSubmit(!submit);
        handleStart();
    }
    function AssessmentInfo(){
        return(
            <Stack direction='row' spacing={2} alignItems='center'>
                <Typography variant='h5'>
                    Due 
                </Typography>
                <Typography variant='body'>
                    {dueDate}
                </Typography>
                <Typography variant='h5'>
                    Questions 
                </Typography>
                <Typography variant='body'>
                    {num_question}
                </Typography>
                <Typography variant='h5'>
                    Time Limit 
                </Typography>
                <Typography variant='body'>
                    {time_limit}
                </Typography>
            </Stack>
        );
    }

    return(
        <>
            <Box 
            sx={{ width: '80%',
                justifyContent:"center",
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                p:4
            }}>
                <Button color="error" onClick={handleAssessment} startIcon={<FontAwesomeIcon icon={faCircleLeft} />}/>
                <Typography variant='h4'>
                    {assessment.title}
                </Typography>
                <Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 2, bgcolor:'#242424'} } />
                {<AssessmentInfo/>}
                <Divider orientation="horizontal" flexItem sx={{ borderRightWidth: 2, bgcolor:'#242424'} } />

                {start? (<AssessmentDetail handleSubmit={handleSubmit}/>)
                 :(
                    <Box 
                    sx={{
                        display: 'flex',         
                        justifyContent: 'center',  
                        alignItems: 'center',      
                        minHeight: '10vh'          
                      }}
                    >
                        {
                        /**
                         * If user clicked submit. return to current assessment
                         * and display success message
                         */
                        }
                        {!submit?
                        (<Button variant="contained" onClick={handleStart}>Start</Button>)
                        :
                        <>
                        <Alert severity="success">Submit success</Alert>
                        </>
                        }
                    </Box>
                 )
                }
            </Box>
        </>
    );
}