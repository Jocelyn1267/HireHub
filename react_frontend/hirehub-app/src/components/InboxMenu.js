import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, List, Button } from '@mui/material';
import { faStar, faPaperPlane, faInbox, faTrashCan, faPencil, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ComposeForm from './ComposeForm';

/**
 * Render the Inbox menu on the left of the Inbox page
 */

export default function InboxMenu({ selectedIndex, handleListItemClick }) {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSend = () => {
    setShowAlert(true);
  }

  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
    setShowAlert(false);

  };



  return (
    <Box
      sx={{
        width: '100%', maxWidth: 180, minHeight: '100vh',
        alignItems: 'flex-start',
        bgcolor: 'rgba(255, 255, 255, 0.7)',
      }}>
      <Box
        sx={{
          alignItems: 'center',
          margin: 'auto',
          pl: 3,
          pt: 1
        }}
      >
        {/**
             * Action for popup form
             */}
        <div>
          <Button variant="contained" startIcon={<FontAwesomeIcon icon={faPencil} />} onClick={handleClickOpen}>
            Compose
          </Button>
          {open && (
            <ComposeForm
              open={open}
              showAlert={showAlert}
              handleClickClose={handleClickClose}
              handleSend={handleSend}
            />
          )}

        </div>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={() => handleListItemClick(0)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faInbox} style={{ color: "#4e2e09", }} />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={() => handleListItemClick(1)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faStar} style={{ color: "#4e2e09", }} />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#4e2e09", }} />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={() => handleListItemClick(3)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#4e2e09", }} />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}