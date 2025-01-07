import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';


 /**
 * The pop up window to send an email
 * Trigger by the Compose Button rendered in the Inbox menu
 */

export default function ComposeForm({ open, handleClickClose }) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (user && isAuthenticated) {
            setSenderEmail(user.email);
        }
    }, [user, isAuthenticated]);

    console.log(senderEmail);

    const handleSend = async () => {
        if (!senderEmail || !receiverEmail || !message) {
            setAlert({ severity: 'error', message: 'All fields must be filled' });
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/send', {
                sender_email: senderEmail,
                receiver_email: receiverEmail,
                subject: subject,
                text: message
            });
            setAlert({ severity: 'success', message: 'Message Sent' });
            handleClickClose();  // Optionally close the dialog on success
        } catch (error) {
            setAlert({ severity: 'error', message: error.response?.data.message || 'Error sending message' });
        }
    };

    return (

        <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>
                Message
            </DialogTitle>

            <DialogContent>
                {/**
             *  @todo: Change the status depends on the return status from database
             */}
                {/* {showAlert && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Message Sent
              </Alert>
            )}
                <TextField label="receiver" fullWidth margin="dense" />
                <TextField label="Subject" fullWidth margin="dense" />
                <TextField label="Message" fullWidth margin="dense" multiline rows={8}  /> */}




                {alert && (
                    <Alert severity={alert.severity} sx={{ mb: 2 }}>
                        {alert.message}
                    </Alert>
                )}
                <TextField label="Sender Email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} fullWidth margin="dense" disabled={true} />
                <TextField label="Receiver Email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} fullWidth margin="dense" />
                <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth margin="dense" />
                <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} fullWidth margin="dense" multiline rows={8} />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickClose} color="secondary">
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleSend}>
                    Send
                </Button>

            </DialogActions>
        </Dialog>
    );
}