# Stock Screener

<<<<<<< HEAD
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://stock-screener-demo.vercel.app)
[![Watch Demo Video](https://img.shields.io/badge/Watch-Demo_Video-red.svg)](https://youtu.be/your-demo-video)

[🌐 Live Demo](https://stock-screener-demo.vercel.app) | [📺 Watch Demo Video](https://youtu.be/your-demo-video)
=======
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://stock-screener-tool-rosy.vercel.app/)
[![Watch Demo Video](https://img.shields.io/badge/Watch-Demo_Video-red.svg)](https://youtu.be/your-demo-video)

[🌐 Live Demo](https://stock-screener-tool-rosy.vercel.app/) | [📺 Watch Demo Video](https://youtu.be/your-demo-video)


A modern web application for screening stocks based on financial metrics. Built with React and Next.js, this tool provides an intuitive interface for creating custom stock filters and analyzing market data.

## 🎯 Quick Preview

<div align="center">
  <img src="/api/placeholder/800/400" alt="Stock Screener Demo" />
  <p><i>Interactive stock screening with real-time filtering</i></p>
</div>

## Features

### Query Builder
- Create custom screening criteria using multiple financial metrics
- Intuitive syntax with support for multiple conditions
- Real-time validation and results
- Quick metric insertion through the "Show All Ratios" gallery

### Supported Metrics
- Market Capitalization
- Price to Earnings (P/E) Ratio
- Return on Equity (ROE)
- And many more financial indicators

### Results View
- Sortable columns for easy data analysis
- Adjustable pagination controls
- Interactive column headers with metric descriptions
- Dark/light mode theme toggle

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stock-screener.git
```

2. Install dependencies:
```bash
cd stock-screener
npm install
```

3. Start the development server:
```bash
npm start
```

## Usage

### Creating a Query
1. Click "Create New Screen" on the landing page
2. Enter your query using the following format:
   ```
   Market Cap < 500 AND P/E > 15 AND ROE > 10
   ```

### Query Syntax
- Use `AND` to combine multiple conditions
- Supported operators: <, >, >=, <=
- Spaces between metrics, operators, and values are required
- Example: `Market Cap < 500 AND P/E > 15`

## Project Structure

```
stock-screener/
├── src/
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   ├── pages/       # Next.js pages
│   └── styles/      # CSS styles
└── public/
```

## Development

The application is built with:
- React for the frontend
- Next.js for page routing and server-side rendering
- Modern JavaScript features
- Responsive design principles
<<<<<<< HEAD

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

