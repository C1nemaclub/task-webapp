import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/auth/auth-context';
import { ToastProvider } from './context/toast-context.tsx';
import { theme } from './styles/styleOverrides.ts';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
