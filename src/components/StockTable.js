import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function StockTable({ stocks, startIndex, onSort, sortField, sortDirection }) {
  const columns = [
    { key: 'ticker', label: 'Name' },
    { key: 'marketCap', label: 'Market Cap Rs.Cr.' },
    { key: 'peRatio', label: 'P/E' },
    { key: 'roe', label: 'ROE %' },
    { key: 'debtToEquity', label: 'Debt/Equity' },
    { key: 'dividendYield', label: 'Div Yld %' },
    { key: 'revenueGrowth', label: 'Revenue Growth %' },
    { key: 'epsGrowth', label: 'EPS Growth %' },
    { key: 'currentRatio', label: 'Current Ratio' },
    { key: 'grossMargin', label: 'Gross Margin %' }
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.No.
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => onSort(column.key)}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  {column.label}
                  {renderSortIndicator(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock, idx) => (
            <tr key={stock.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">
                {startIndex + idx + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 text-sm ${
                    column.key === 'ticker' ? 'text-indigo-600 hover:text-indigo-900' : 'text-gray-900'
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