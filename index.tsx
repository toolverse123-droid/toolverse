// toolverse123-droid/toolverse/toolverse-8e21c08f808538925b7d76b20c163902921ced90/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocalizationProvider } from './i18n';
import { BrowserRouter } from 'react-router-dom'; // 새로 추가

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <BrowserRouter> {/* <App />을 감싸줍니다 */}
        <App />
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);