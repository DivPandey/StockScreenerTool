import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

function QueryScreen({ onSubmit, onBack }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [includeLatestResults, setIncludeLatestResults] = useState(false);

  const handleSubmit = () => {
    try {
      setError(null);
      if (!query.trim()) {
        setError('Please enter a query');
        return;
      }
      onSubmit(query);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl text-gray-900 font-semibold mb-6">Create a Search Query</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Query Input */}
          <div className="space-y-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Query
            </label>
            <textarea
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError(null);
              }}
              className={`w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                error ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your query here..."
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">
                {error}
              </div>
            )}
          </div>

          {/* Right Column - Example */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Custom query example</h2>
            <div className="space-y-2 text-gray-700">
              <p>Market Cap {'<'} 450 AND</p>
              <p>P/E {'<'} 15 AND</p>
              <p>ROE {'>'} 22</p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-2">Available Fields:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Market Cap (Market Capitalization)</li>
                <li>P/E (Price to Earnings Ratio)</li>
                <li>ROE (Return on Equity)</li>
                <li>Debt to Equity</li>
                <li>Dividend Yield</li>
                <li>Revenue Growth</li>
                <li>EPS Growth</li>
                <li>Current Ratio</li>
                <li>Gross Margin</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checkbox and Buttons */}
        <div className="mt-6 space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeLatestResults}
              onChange={(e) => setIncludeLatestResults(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">Only companies with Sep 2024 results</span>
          </label>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
            >
              <span className="mr-2">►</span>
              RUN THIS QUERY
            </button>

            <button
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              SHOW ALL RATIOS
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 border-t pt-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueryScreen;