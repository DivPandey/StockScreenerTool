import React from 'react';

const RangesPopup = ({ isOpen, onClose }) => {
  const ranges = [
    { metric: 'Market Cap', range: '3.53B - 496.49B' },
    { metric: 'P/E Ratio', range: '5.21 - 49.99' },
    { metric: 'ROE', range: '-19.70% to 39.96%' },
    { metric: 'Debt to Equity', range: '0.01 - 2.00' },
    { metric: 'Dividend Yield', range: '0.01% - 4.97%' },
    { metric: 'Revenue Growth', range: '-10.00% to 29.91%' },
    { metric: 'EPS Growth', range: '-9.84% to 19.97%' },
    { metric: 'Current Ratio', range: '0.50 - 3.00' },
    { metric: 'Gross Margin', range: '10.00% - 79.76%' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Value Ranges</h2>
        <div className="space-y-2">
          {ranges.map(({ metric, range }) => (
            <div key={metric} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">{metric}</span>
              <span className="text-gray-600 dark:text-gray-400 font-mono">{range}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RangesPopup; 