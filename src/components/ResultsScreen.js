import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StockTable from './StockTable';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 25, 50];

function ResultsScreen({ stocks, query, onBack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortField, setSortField] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortedStocks, setSortedStocks] = useState(stocks);

  React.useEffect(() => {
    const sorted = [...stocks].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return sortDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
    
    setSortedStocks(sorted);
  }, [stocks, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStocks = sortedStocks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(current => {
      if (field === sortField) {
        return current === 'asc' ? 'desc' : 'asc';
      }
      return 'asc';
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Query Results</h1>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
            SAVE THIS QUERY
          </button>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">Executed Query:</h2>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200">
            {query.split('AND').map((condition, index) => (
              <div key={index} className="text-sm text-gray-800">
                {condition.trim()}
                {index < query.split('AND').length - 1 && (
                  <span className="text-gray-500"> AND</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">
            {sortedStocks.length} results found: Showing {startIndex + 1}-{Math.min(endIndex, sortedStocks.length)} of {sortedStocks.length}
          </span>
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-50">
              EXPORT
            </button>
            <button className="border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-50">
              EDIT COLUMNS
            </button>
          </div>
        </div>

        <StockTable
          stocks={currentStocks}
          startIndex={startIndex}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md min-w-[32px] ${
                  currentPage === pageNum
                    ? 'bg-indigo-500 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Results per page</span>
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setItemsPerPage(option);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-md min-w-[32px] ${
                  itemsPerPage === option
                    ? 'bg-indigo-500 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 flex items-center text-indigo-500 hover:text-indigo-600"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;