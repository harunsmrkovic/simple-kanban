import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './state';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
