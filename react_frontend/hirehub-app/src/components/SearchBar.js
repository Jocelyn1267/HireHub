import React, { useState } from 'react';
import {  Button, Stack, TextField} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
/**
 * A Search Bar component used to quickly get the related course list according to the input
 * @returns  courselist
 */
const SearchBar = () => {
  
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/searchResult', { state: { query: searchTerm } }); // Use React Router's navigate function with state
    };
    
    return (

        <Stack direction='row' justifyContent='flex-end'>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextField
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search courses..."
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    sx={{
                        bgcolor: '#fff',
                        borderRadius:'10px'
                    }} 
                />
                <Button
                    type="submit"
                    sx={{
                        borderRadius: '10px', // Rounded corners to match the TextField
                        marginLeft: 1, // Adds margin between the TextField and Button
                        minWidth: 'auto', // Reduces the default width of the button
                        padding: '6px 16px', // Ensures the button is not too large
                    }}
                    startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fff" }} />}
                ></Button>
            </form>
        </Stack>

        

        

    );
  };

export default SearchBar;