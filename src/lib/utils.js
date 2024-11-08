import Papa from 'papaparse';

export const parseCSV = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const stocks = results.data.map((row, index) => ({
            id: index + 1,
            ticker: row.Ticker,
            marketCap: parseFloat(row['Market Capitalization (B)']),
            peRatio: parseFloat(row['P/E Ratio']),
            roe: parseFloat(row['ROE (%)']),
            debtToEquity: parseFloat(row['Debt-to-Equity Ratio']),
            dividendYield: parseFloat(row['Dividend Yield (%)']),
            revenueGrowth: parseFloat(row['Revenue Growth (%)']),
            epsGrowth: parseFloat(row['EPS Growth (%)']),
            currentRatio: parseFloat(row['Current Ratio']),
            grossMargin: parseFloat(row['Gross Margin (%)'])
          }));
          resolve(stocks);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};

// Field name mappings with multiple variations
const fieldMappings = {
  'market': 'marketCap',
  'marketcap': 'marketCap',
  'marketcapitalization': 'marketCap',
  'mcap': 'marketCap',
  'pe': 'peRatio',
  'peratio': 'peRatio',
  'p/eratio': 'peRatio',
  'p/e': 'peRatio',
  'pricetoearnings': 'peRatio',
  'roe': 'roe',
  'returnonequity': 'roe',
  'debt': 'debtToEquity',
  'debttoequity': 'debtToEquity',
  'de': 'debtToEquity',
  'dividend': 'dividendYield',
  'dividendyield': 'dividendYield',
  'yield': 'dividendYield',
  'revenue': 'revenueGrowth',
  'revenuegrowth': 'revenueGrowth',
  'eps': 'epsGrowth',
  'epsgrowth': 'epsGrowth',
  'current': 'currentRatio',
  'currentratio': 'currentRatio',
  'gross': 'grossMargin',
  'grossmargin': 'grossMargin',
  'margin': 'grossMargin'
};

const normalizeFieldName = (field) => {
  // Remove special characters, spaces and convert to lowercase
  const normalized = field.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();

  // Check each possible field mapping
  for (const [key, value] of Object.entries(fieldMappings)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  return normalized;
};

export const parseQuery = (query) => {
  if (!query || !query.trim()) {
    return [];
  }

  return query
    .split('AND')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      try {
        // More lenient regex that handles field names with special characters
        const matches = line.match(/^([a-zA-Z][a-zA-Z\s/]*?)(?:\s+|)(>=|<=|>|<|=)\s*(-?\d+\.?\d*)$/);
        
        if (!matches) {
          throw new Error(`Invalid query format. Please use format like "Market Cap > 500"`);
        }

        const [, field, operator, value] = matches;
        const mappedField = normalizeFieldName(field.trim());

        // Valid field names in your data
        const validFields = {
          marketCap: 'Market Cap',
          peRatio: 'P/E Ratio',
          roe: 'ROE',
          debtToEquity: 'Debt to Equity',
          dividendYield: 'Dividend Yield',
          revenueGrowth: 'Revenue Growth',
          epsGrowth: 'EPS Growth',
          currentRatio: 'Current Ratio',
          grossMargin: 'Gross Margin'
        };

        if (!validFields[mappedField]) {
          const availableFields = Object.values(validFields).join(', ');
          throw new Error(`Unknown field: "${field}". Available fields: ${availableFields}`);
        }

        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          throw new Error(`Invalid numeric value: "${value}"`);
        }

        return {
          field: mappedField,
          operator,
          value: parsedValue
        };
      } catch (error) {
        throw new Error(`Error in query line "${line}": ${error.message}`);
      }
    });
};

export const filterStocks = (stocks, query) => {
  try {
    if (!query.trim()) return stocks;

    const conditions = parseQuery(query);
    if (conditions.length === 0) return stocks;

    return stocks.filter(stock => 
      conditions.every(condition => evaluateCondition(stock, condition))
    );
  } catch (error) {
    console.error('Error filtering stocks:', error.message);
    throw error;
  }
};

export const evaluateCondition = (stock, condition) => {
  const value = stock[condition.field];
  
  if (value === undefined || value === null) return false;
  
  const targetValue = Number(condition.value);
  
  if (isNaN(value) || isNaN(targetValue)) return false;

  switch (condition.operator) {
    case '>': return value > targetValue;
    case '<': return value < targetValue;
    case '=': return value === targetValue;
    case '>=': return value >= targetValue;
    case '<=': return value <= targetValue;
    default: return true;
  }
};