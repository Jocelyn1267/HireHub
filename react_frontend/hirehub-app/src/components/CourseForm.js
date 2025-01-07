import React, { useState,useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';

 /**
 * The pop up window to add an course
 * Trigger by the Add course Button(This is only accsible to the admin)
 */

function CourseForm({ open, handleClose, hasAlert, handleAlert, title, description, formTitle, postURL, course_id}) {
  const [formData, setFormData] = useState({
    actualTitle: '',
    actualDescription: '',
  });
  const [errors, setErrors] = useState({
    actualTitle: '',
    actualDescription: '',
  });
  
  useEffect(() => {
    if (title || description) {
      setFormData({
        actualTitle: title || '',
        actualDescription: description || '',
      });
    }
  }, [title, description]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Reset errors when the user types
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.actualTitle || typeof formData.actualTitle !== 'string') {
      newErrors.actualTitle = 'Course title must be a valid string.';
    }

    if (
      !formData.actualDescription ||
      formData.actualDescription.length > 1000
    ) {
      newErrors.actualDescription =
        'Course description must be within 1000 characters.';
    }

    return newErrors;
  };


  console.log(postURL);
  const handleSubmit = async () => {
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try{
      const response = await axios.post(postURL,{
        id: course_id,
        course_title: formData.actualTitle,
        course_description: formData.actualDescription
      });
      if (response.status === 200 || response.status === 201){
        console.log("saved");
        handleAlert('Course saved successfully!', 'success');
        handleClose();

      } else {
        // Handle any other statuses if necessary
        handleAlert('Unexpected response from the server. Please try again.', 'error');
      }
    }catch (error) {
      // console.error('Error:', error.response?.data?.message || 'Failed to submit the form');
      handleAlert('Failed to submit the form. Please check your inputs and try again.', 'error');

    }

  };



  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        <TextField
          name="actualTitle"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.actualTitle}
          onChange={handleChange}
          error={Boolean(errors.actualTitle)}
          helperText={errors.actualTitle}
        />
        <TextField
          name="actualDescription"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formData.actualDescription}
          onChange={handleChange}
          error={Boolean(errors.actualDescription)}
          helperText={errors.actualDescription}
        />
        <Typography variant="caption" color="text.secondary">
          Course description must be within 1000 characters.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CourseForm;
