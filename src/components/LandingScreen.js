import React from 'react';

function LandingScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Stock Screening Tool
        </h1>
        <p className="text-lg text-gray-600">
          Filter and analyze stocks based on multiple criteria
        </p>
        <button
          onClick={onStart}
          className="bg-indigo-500 text-white px-8 py-3 rounded-md hover:bg-indigo-600 transition-all"
        >
          Create New Screen
        </button>
      </div>
    </div>
  );
}

export default LandingScreen;