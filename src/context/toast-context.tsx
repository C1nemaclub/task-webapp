import { AlertColor } from '@mui/material';
import React, { ReactNode, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ToastPayloadType = {
  severity: AlertColor;
  message: string;
  route?: string;
};

type ToastContextType = {
  openToast: (payload: ToastPayloadType) => void;
  closeToast: () => void;
  readonly open: boolean;
  severity: AlertColor;
  message: string;
};

export const ToastContext = createContext<ToastContextType>({
  openToast: () => {},
  closeToast: () => {},
  open: false,
  severity: 'success',
  message: 'This is a message',
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [message, setMessage] = useState('This is a message');
  const [navigateRoute, setNavigateOnClose] = useState<string | null>(null);
  const navigate = useNavigate();

  const openToast = ({ severity, message, route }: ToastPayloadType) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
    if (route) {
      setNavigateOnClose(route);
    }
  };

  const closeToast = () => {
    setOpen(false);
    if (navigateRoute) {
      navigate(navigateRoute);
    }
  };
  return (
    <ToastContext.Provider value={{ openToast, closeToast, open, severity, message }}>
      {children}
    </ToastContext.Provider>
  );
};
