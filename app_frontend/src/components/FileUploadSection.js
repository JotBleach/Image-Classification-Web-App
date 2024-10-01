import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const FileUploadSection = ({ onSubmit, loading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <Box sx={{ padding: '40px 20px', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Upload an Image for Classification
      </Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Choose Image
        </Button>
      </label>
      {file && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">Selected: {file.name}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit for Classification'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadSection;
