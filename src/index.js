import React from 'react';
import ReactDOM from 'react-dom';
import { QlikProvider } from './context/QlikContext'
import App from './App'
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <QlikProvider>
     <App />
    </QlikProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


