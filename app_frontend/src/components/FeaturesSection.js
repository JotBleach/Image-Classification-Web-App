import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const features = [
  { title: 'Fast Transactions', description: 'Process payments quickly and securely.', icon: <SpeedIcon fontSize="large" /> },
  { title: 'Secure Payments', description: 'We keep your payments safe and secure.', icon: <SecurityIcon fontSize="large" /> },
  { title: 'Multiple Payment Methods', description: 'Accept a wide variety of payment options.', icon: <PaymentIcon fontSize="large" /> },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f9fafb' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
        Why Choose Us
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', gap: 4 }}>
        {features.map((feature, index) => (
          <Card key={index} sx={{ width: 300, padding: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturesSection;
