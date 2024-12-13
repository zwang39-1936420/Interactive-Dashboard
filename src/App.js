import React from 'react';
import PowerBIDashboard from './components/PowerBIEmbed';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Power BI Analytics</h1>
        <p className="subtitle">Interactive Business Intelligence Dashboard</p>
      </header>
      <main className="dashboard-container">
        <div className="dashboard-frame">
          <PowerBIDashboard />
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 