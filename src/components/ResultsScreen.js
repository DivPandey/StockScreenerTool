import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StockTable from './StockTable';
import ThemeToggle from './ThemeToggle';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Query Results</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 dark:text-gray-300">
            {sortedStocks.length} results found: Showing {startIndex + 1}-{Math.min(endIndex, sortedStocks.length)} of {sortedStocks.length}
          </span>
        </div>

        <StockTable
          stocks={currentStocks}
          startIndex={startIndex}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex items-center space-x-2 border dark:border-gray-600 rounded">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="flex items-center space-x-2 border dark:border-gray-600 rounded">
            <span className="text-sm text-gray-600 dark:text-gray-300">Results per page</span>
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
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 flex items-center text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;