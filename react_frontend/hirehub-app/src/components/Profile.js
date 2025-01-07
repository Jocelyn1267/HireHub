import { Stack, Avatar, Button, FormControl, TextField} from '@mui/material';
/*
*User Profile
*/
export default function Profile(){
    const handleImageUpload=() =>{
        console.log("upload clicked")
      }
    return(
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
          <Avatar
            alt="User Capybara"
            src="/image/capybara.png"
            sx={{ width: '18%', height: '18%' }}
          />
          <Button
            component="label"
            variant="contained"
            size="small"
          >
            Upload Image

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </Button>
          <Stack
            width='30%'

          >
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue="Current password"
                variant="filled"
                size="small"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue="New password"
                variant="filled"
                size="small"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue="Re-enter new password"
                variant="filled"
                size="small"
              />
            </FormControl>
          </Stack>

          <Button
           component="label"
           variant="contained"
           size="small"
          >
            Submit
          </Button>
        </Stack>
    );
}