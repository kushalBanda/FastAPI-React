import React from 'react';

export const SimilarityResults = ({ data }) => {
  const { files, similarity_matrix } = data;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Similarity Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200">Files</th>
              {files.map((file, index) => (
                <th key={index} className="px-6 py-3 border-b border-gray-200 text-left">{file}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {similarity_matrix.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <th className="px-6 py-3 border-b border-gray-200 text-left">{files[rowIndex]}</th>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="px-6 py-3 border-b border-gray-200 text-center">
                    {cell.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
