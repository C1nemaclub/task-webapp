import { Box, Typography } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/auth-context';

const AuthLayout = () => {
  const { user } = useAuthContext();
  if (user) return <Navigate to='/dashboard' />;

  return (
    <Box
      sx={{
        height: '100%',
        padding: '2rem',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          width: '100%',
          borderRadius: '10px',
          backgroundColor: '#fff',
          maxWidth: '1400px',
        }}>
        <Outlet />
        <Box
          sx={{
            width: '100%',
            display: {
              xs: 'none',
              md: 'flex',
              lg: 'flex',
            },
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'dodgerblue',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}>
            <Typography
              component='h2'
              variant='h5'
              sx={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Connect with every application
            </Typography>
            <Typography
              component='p'
              sx={{
                color: '#cccc',
              }}>
              Everything you need in an easily customizable dashboard.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
