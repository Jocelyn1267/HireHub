import { Box, Button } from '@mui/material';
import '../../App.css';
import Profile from '../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Account() {



  return (
    <div className='account'>
      <Box
        sx={{
          width: '50%',
          height: '97%',
          margin: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '16px',
          p: 2
        }}
      >

        <Box
          sx={{
            width: '100%',
            height: '100%',
            margin: 'auto',
            bgcolor: 'rgba(245, 229, 193, 0.7)',
            borderRadius: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4
          }}
        >
          <Button
            component="label"
            variant="contained"
            size="small"
            color="error"
            startIcon={<FontAwesomeIcon icon={faTrash} />}
          > Delete  Account
          </Button>
          <Profile />

        </Box>

      </Box>
    </div>
  );
}