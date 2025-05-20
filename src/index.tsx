import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import AltitudeCalculatorApp from './components/AltitudeCalculatorApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AltitudeCalculatorApp />
  </React.StrictMode>
);