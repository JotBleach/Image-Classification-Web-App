import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ResultsSection = ({ predictions, imageUrl }) => {
  if (!predictions || predictions.length === 0) return null;

  return (
    <Box sx={{ padding: '40px 20px', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Classification Results
      </Typography>
      <img src={imageUrl} alt="Uploaded" style={{ maxHeight: 300, marginBottom: '20px' }} />
      {predictions.map((prediction, index) => (
        <Card key={index} sx={{ maxWidth: 400, margin: '0 auto', mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{prediction.label}</Typography>
            <Typography variant="body2" color="text.secondary">
              Probability: {(prediction.probability * 100).toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ResultsSection;
