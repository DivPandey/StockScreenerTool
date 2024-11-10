import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, Beaker, Info } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import RangesPopup from './RangesPopup';

function QueryScreen({ onSubmit, onBack }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [includeLatestResults, setIncludeLatestResults] = useState(false);
  const [showRatioGallery, setShowRatioGallery] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRangesPopup, setShowRangesPopup] = useState(false);

  const exampleQuery = `Market Cap < 500 AND
P/E > 15 AND
ROE > 10`;

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

  const financialMetrics = [
    'Market Cap',
    'P/E Ratio',
    'ROE',
    'Debt to Equity',
    'Dividend Yield',
    'Revenue Growth',
    'EPS Growth',
    'Current Ratio',
    'Gross Margin'
  ];

  const operators = ['<', '>', 'AND'];

  const handleMetricClick = (metric) => {
    setQuery(prev => prev + metric + ' ');
  };

  const handleOperatorClick = (operator) => {
    setQuery(prev => prev + operator + ' ');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(exampleQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1F4F8] dark:bg-gray-900 p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl text-gray-900 dark:text-white font-bold mb-6">Create a Search Query</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Query Input */}
          <div className="flex flex-col h-full">
            <label className="block text-gray-700 dark:text-gray-300 text-base font-medium mb-2">
              Query
            </label>
            <div className="flex-1 flex flex-col">
              <textarea
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setError(null);
                }}
                className={`flex-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none dark:bg-gray-900 dark:border-gray-700 dark:text-white ${error ? 'border-red-500' : 'border-gray-400'
                  }`}
                placeholder="Enter your query here..."
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Example */}
          <div className="flex flex-col h-full">
            <h2 className="block text-gray-700 dark:text-gray-300 text-base font-medium mb-2">Custom query example</h2>
            <div className="flex-1 bg-blue-50 dark:bg-gray-700 rounded-lg p-6 border border-blue-300">
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-400 dark:border-gray-600">
                <button
                  onClick={handleCopyClick}
                  className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                <div className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                  <p>Market Cap {'<'} 500 AND</p>
                  <p>P/E {'>'} 15 AND</p>
                  <p>ROE {'>'} 10</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Click the copy icon to copy the example query
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex md:justify-between md:items-center flex-col md:flex-row gap-3 md:gap-0">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center md:justify-start"
          >
            <span className="mr-2">►</span>
            RUN THIS QUERY
          </button>
          <button
            onClick={() => setShowRatioGallery(!showRatioGallery)}
            className="flex items-center justify-center px-6 py-2.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-200"
          >
            <Beaker className="w-4 h-4 mr-2" />
            {showRatioGallery ? 'CLOSE GALLERY' : 'SHOW ALL RATIOS'}
          </button>
        </div>

        {/* Financial Metrics and Operators Gallery */}
        {showRatioGallery && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Financial Metrics
              </h3>
              <button
                onClick={() => setShowRangesPopup(true)}
                className="p-2 text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                title="Show value ranges"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-3 gap-2">
              {financialMetrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => handleMetricClick(metric)}
                  className="text-left px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  {metric}
                </button>
              ))}
            </div>

            {/* Operators */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                {operators.map((operator) => (
                  <button
                    key={operator}
                    onClick={() => handleOperatorClick(operator)}
                    className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors font-mono"
                  >
                    {operator}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t pt-4 dark:border-gray-700">
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      <RangesPopup 
        isOpen={showRangesPopup} 
        onClose={() => setShowRangesPopup(false)} 
      />
    </div>
  );
}

export default QueryScreen;