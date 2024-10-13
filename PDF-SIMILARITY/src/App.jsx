import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from './components/FileUploader';
import { SimilarityResults } from './components/SimilarityResults';
import { Spinner } from './components/Spinner';

const PdfSimilarityApp = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [similarityData, setSimilarityData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!selectedFiles || selectedFiles.length === 0) {
      setErrorMessage('Please select a folder containing PDF files.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/pdf-similarity', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSimilarityData(response.data.similarity_data);
    } catch (error) {
      setErrorMessage('Error processing the request. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          PDF Similarity Checker
        </h1>

        <FileUploader setSelectedFiles={setSelectedFiles} />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Check Similarity
        </button>

        {loading && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center font-semibold">{errorMessage}</p>
        )}

        {similarityData && <SimilarityResults data={similarityData} />}
      </div>
    </div>
  );
};

export default PdfSimilarityApp;
