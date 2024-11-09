import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function StockTable({ stocks, startIndex, onSort, sortField, sortDirection }) {
  const columns = [
    { key: 'ticker', label: 'Name', sortable: false, fullName: 'Name' },
    { key: 'marketCap', label: 'Market Cap Rs.Cr.', sortable: true, fullName: 'Market Capitalization in Crores (Rs.)' },
    { key: 'peRatio', label: 'P/E', sortable: true, fullName: 'Price to Earnings Ratio' },
    { key: 'roe', label: 'ROE %', sortable: true, fullName: 'Return on Equity Percentage' },
    { key: 'debtToEquity', label: 'Debt/Equity', sortable: true, fullName: 'Debt to Equity Ratio' },
    { key: 'dividendYield', label: 'Div Yld %', sortable: true, fullName: 'Dividend Yield Percentage' },
    { key: 'revenueGrowth', label: 'Revenue Growth %', sortable: true, fullName: 'Revenue Growth Percentage' },
    { key: 'epsGrowth', label: 'EPS Growth %', sortable: true, fullName: 'Earnings Per Share Growth Percentage' },
    { key: 'currentRatio', label: 'Current Ratio', sortable: true, fullName: 'Current Ratio' },
    { key: 'grossMargin', label: 'Gross Margin %', sortable: true, fullName: 'Gross Margin Percentage' }
  ];

  const renderSortIndicator = (columnKey) => {
    if (columnKey !== sortField) {
      return <span className="text-gray-400 ml-1"></span>;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1 text-indigo-500" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1 text-indigo-500" />
    );
  };

  const formatValue = (value, column) => {
    if (typeof value !== 'number') return value;
    
    if (column.key === 'marketCap') {
      return value.toFixed(2);
    } else if (['roe', 'dividendYield', 'revenueGrowth', 'epsGrowth', 'grossMargin'].includes(column.key)) {
      return value.toFixed(2) + '%';
    } else {
      return value.toFixed(2);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              S.No.
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && onSort(column.key)}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider group relative ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
                }`}
                title={column.sortable ? column.fullName : ''}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && renderSortIndicator(column.key)}
                  {column.sortable && (
                    <div className="invisible group-hover:visible absolute top-full left-0 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                      {column.fullName}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {stocks.map((stock, idx) => (
            <tr key={stock.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                {startIndex + idx + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 text-sm ${
                    column.key === 'ticker' 
                      ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {formatValue(stock[column.key], column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;