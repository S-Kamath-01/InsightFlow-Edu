/**
 * Application entry point
 * Initializes MSW and renders the App
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/index.css';

const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true';

async function enableMocking() {
  if (!MOCK_MODE) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
