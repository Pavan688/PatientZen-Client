import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PatientZen } from './components/PatientZen';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientZen />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
