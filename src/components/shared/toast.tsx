import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { ToastContext } from '../../context/toast-context';

const Toast = () => {
  const { open, closeToast, severity, message } = useContext(ToastContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={closeToast}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
