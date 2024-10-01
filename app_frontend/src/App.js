import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import FileUploadSection from './components/FileUploadSection';
import ResultsSection from './components/ResultsSection';
import axios from 'axios';

function App() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    // Send file to the backend
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then((response) => {
        setPredictions(response.data.predictions);
        setImageUrl(URL.createObjectURL(file));
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <HeroSection />
      <FileUploadSection onSubmit={handleFileUpload} loading={loading} />
      <ResultsSection predictions={predictions} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
