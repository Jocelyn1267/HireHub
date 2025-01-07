import '../../App.css';
import {Divider, Stack} from '@mui/material';
import InboxMenu from '../InboxMenu';
import { useState, useEffect, useContext } from 'react';
import InboxList from '../InboxList';
import axios from 'axios';
import { UserContext } from '../../userContext';

/**
 * Rendering the inbox page
 * All the messages that the user received are shown
 * Users can read the long message by click on the list item to expand it
 * User can also send message by clicking the button composed
 * @returns 
 */
export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState(0);
    // const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { user } = useContext(UserContext);

    const [error, setError] = useState(null);

  
    useEffect(() => {

          if (user?.email) {
            setLoading(true);
            const encodedEmail = encodeURIComponent(user.email);
            axios.get(`http://127.0.0.1:5000/inbox?receiver_email=${encodedEmail}`)
                .then(response => {
                    setMessages(response.data);
                    console.log('Response data: ', response.data);
                    console.log('Messages: ', messages);
                    setLoading(false);
                    
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setError('Failed to fetch messages.');
                    setLoading(false);
                });
        } else {
            // setError('User email is not available.');
            setLoading(false);
        }
  }, [user?.email]);  

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>{error}</p>;  // Display error message if error state is set
    // if (!messages.length) return <p>No messages found.</p>;  // Check if messages array is empty


  const handleListItemClick = (index) => {
      console.log("Button clicked with index:", index); 
      setSelectedIndex(index);
  }

  return(
    <Stack className="coursePage" direction="row"  justifyContent={'flex-start'}>
        <InboxMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}/>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />
        <InboxList selectedIndex={selectedIndex} messageList={messages}/>
    </Stack>
  );

}