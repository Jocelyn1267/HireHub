
import '../../App.css';
import CardList from '../CardList';
import { useLocation } from 'react-router-dom';
import { Stack, Typography, Box} from '@mui/material';

/**
 * Search Result Page Rendering
 * @returns related course list according to the keyword
 */

export default function SearchResult() {

    const location = useLocation();
    const searchQuery = location.state?.query || '';

    // Construct the fetch URL based on whether there's a search query
    const fetchUrl = searchQuery
        ? `http://127.0.0.1:5000/search_courses?keyword=${encodeURIComponent(searchQuery)}`
        : 'http://127.0.0.1:5000/courses';

    return (
        <div className='search'>
        <Stack   
            direction='column'
            alignItems='center'
           
            sx={{ width: '90%',
                margin:'auto',
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                p:13
            }}
        
        >
            <Typography variant='h3'
                sx={{display:'flex', justifyContent:'center'}}
            > Search Results</Typography>
            {searchQuery && (
                <Typography variant="subtitle1">
                    Showing results for: "{searchQuery}"
                </Typography>
            )}
            <CardList fetchUrl={fetchUrl} />
            <Box sx={{minHeight:100}}></Box>
        </Stack> 
        
        </div>
    );
    

}
