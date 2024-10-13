import React from 'react';

export const FileUploader = ({ setSelectedFiles }) => {
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Select PDF Folder
      </label>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p className="mt-2 text-sm text-gray-500">Only PDF files are supported.</p>
    </div>
  );
};
