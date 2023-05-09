import React from 'react';
import ReactDOM from 'react-dom/client';
import Profile from './pages/profile';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Profile />
  </React.StrictMode>
);

reportWebVitals();
