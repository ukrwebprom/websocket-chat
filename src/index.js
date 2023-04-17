import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { UserProvider } from 'firebase-func';
import { BrowserRouter } from 'react-router-dom';
/* import { HashRouter } from 'react-router-dom'; */
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from 'Theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
