import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = ({ onUploadClick }) => {
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0d47a1 0%, #42a5f5 100%)',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Image Recognition Simplified
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Upload an image to see what our AI model predicts.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onUploadClick}
          sx={{
            backgroundColor: '#fff',
            color: '#0d47a1',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            padding: '10px 30px',
            fontWeight: 'bold',
          }}
        >
          Upload an Image
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
