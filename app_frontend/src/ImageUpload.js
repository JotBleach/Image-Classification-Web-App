import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Typography, Box, Card, CardContent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPredictions([]);
  };

  const handleSubmit = () => {
    if (!file) return;

    setLoading(true);
    const url = 'http://localhost:5000/predict'; // Update with your backend URL
    const formData = new FormData();
    formData.append('file', file);

    axios.post(url, formData)
      .then((response) => {
        setPredictions(response.data.predictions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Image Classification
      </Typography>
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </Button>
      </Box>
      {file && (
        <Card>
          <CardContent>
            <Typography variant="h6">Selected Image:</Typography>
            <img src={URL.createObjectURL(file)} alt="Selected" height="300" />
          </CardContent>
        </Card>
      )}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!file}
        >
          Classify Image
        </Button>
      </Box>
      {loading && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {predictions.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Predictions:</Typography>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {prediction.label}: {(prediction.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
