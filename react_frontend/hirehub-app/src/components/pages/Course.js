
import { Button, Box, Alert, Stack} from '@mui/material';
import '../../App.css';
import CardList from '../CardList';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState, useEffect} from 'react';
import CourseForm from '../CourseForm';
import { UserContext } from '../../userContext';

/**
 * Course page for user
 * List all courses in our system for reference
 */
export default function Course() {
    const [add, SetAdd] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { user, isAuthenticated } = useContext(UserContext)
    const [showAddButton, setShowAddButton] = useState(false);

    useEffect(() => {
        if (user && isAuthenticated) {
            if (user.role==="admin"){
                setShowAddButton(true);
            }
        }else{
            setShowAddButton(false);
        }
    }, [user, isAuthenticated]); 


    const handleAlert=()=>{
        setShowAlert(!showAlert);
    }
    const handleAdd = ()=>{
        SetAdd(!add);
    }
    return (
        <div className='course'>
        <Stack sx={{ width: '90%',
                height:'100%',
                margin:'auto',
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                p:13
            }}>
            <Box
            sx={{
                position: 'relative', // Allow absolute positioning for the button
                width: '100%',
                minHeight: '100%', // Optional, ensure the container takes full height
                
                
            }}
            >
            
            {/* Button positioned absolutely */}
            {showAddButton && <Button
                variant="contained"
                onClick={handleAdd}
                startIcon={<FontAwesomeIcon icon={faAdd} />}
                sx={{
                position: 'absolute', // Absolute positioning
                top: '-5%', // Distance from the top
                right: '10%', // Distance from the right
                zIndex: 1, // Ensure it is above other elements
                }}
            >
                Add Course
            </Button>}
            
            {add && (
                <CourseForm
                open={add}
                postURL = "http://127.0.0.1:5000/course"
                handleClose={handleAdd}
                hasAlert={true}
                handleAlert={handleAlert}
                formTitle={"Add Course"}
                />
            )}

            {showAlert && <Alert severity="success">Added Successfully! Please refresh your page</Alert>}

            {/* CardList below */}
            <CardList fetchUrl="http://127.0.0.1:5000/courses" />
            
         </Box>

         </Stack>
        </div>

        
    );
       
   
}