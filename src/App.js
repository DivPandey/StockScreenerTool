import React, { useState, useEffect } from 'react';
import LandingScreen from './components/LandingScreen';
import QueryScreen from './components/QueryScreen.js';
import ResultsScreen from './components/ResultsScreen';
import { parseCSV, filterStocks } from './lib/utils';
import { ThemeProvider } from 'next-themes'

function App() {
  const [screen, setScreen] = useState('landing');
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [executedQuery, setExecutedQuery] = useState('');

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await parseCSV('/data/stocks.csv');
        setStocks(data);
      } catch (error) {
        console.error('Error loading stocks:', error);
        setStocks([]);
      }
    };
    loadStocks();
  }, []);

  const handleQuerySubmit = (query) => {
    const filtered = filterStocks(stocks, query);
    setFilteredStocks(filtered);
    setExecutedQuery(query);
    setScreen('results');
  };

  return (
    <ThemeProvider attribute="class">
      <main>
        {screen === 'landing' && (
          <LandingScreen onStart={() => setScreen('query')} />
        )}
        {screen === 'query' && (
          <QueryScreen 
            onSubmit={handleQuerySubmit}
            onBack={() => setScreen('landing')}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            stocks={filteredStocks}
            query={executedQuery}
            onBack={() => setScreen('query')}
          />
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;