import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
/**
 * A conponent inside the video upload popup window for video uploading
 * @param {*} param0 
 * @returns 
 */
function UploadFileDialog({ open, handleClose }) {
  const [formData, setFormData] = useState({
    title: '',
    selectedFile: null,
  });
  const [errors, setErrors] = useState({
    title: '',
    file: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validFormats = ['video/mp4', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!file) {
      setFormData({ ...formData, selectedFile: null });
      setErrors({ ...errors, file: '' });
      return;
    }

    if (validFormats.includes(file.type)) {
      setFormData({ ...formData, selectedFile: file });
      setErrors({ ...errors, file: '' });
    } else {
      setFormData({ ...formData, selectedFile: null });
      setErrors({ ...errors, file: 'Unsupported file format. Please upload a video, PDF, or Word document.' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'title is required.';
    }

    if (!formData.selectedFile) {
      newErrors.file = 'Please select a file.';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Perform file upload logic here
    console.log('Form submitted:', formData);

    // Close dialog and reset form
    handleClose();
    setFormData({ title: '', selectedFile: null });
    setErrors({ title: '', file: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <Box>
          {/* title Input */}
          <TextField
            name="title"
            label="title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleInputChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />

          {/* File Input */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please upload a video, PDF, or Word document.
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: 'video/mp4,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' }}
            onChange={handleFileChange}
            fullWidth
            sx={{ mt: 1 }}
            error={Boolean(errors.file)}
            helperText={errors.file}
            data-testid="file-input"
          />

          {/* Display Selected File */}
          {formData.selectedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {formData.selectedFile.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UploadFileDialog;
