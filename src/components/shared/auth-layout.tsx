import { Box, Container, Grow, Typography } from '@mui/material';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import HeroImage from '../../assets/hero.svg';
import useWindowSize from '../../hooks/use-window-size';

const AuthLayout = () => {
  const { user } = useContext(AuthContext);
  const {
    windowSize: { width },
  } = useWindowSize();
  if (user) return <Navigate to='/overview' />;

  return (
    <Box
      sx={{
        height: '100%',
        padding: width > 800 ? '2rem' : '0',
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
        <Grow in>
          <Box
            p={4}
            width='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            gap={2}>
            <Outlet />
          </Box>
        </Grow>
        <Container
          sx={{
            width: '100%',
            display: {
              xs: 'none',
              md: 'flex',
              lg: 'flex',
            },
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}>
            <Box
              component='img'
              sx={{
                height: '100%',
                width: 350,
              }}
              alt='Clipboard'
              src={HeroImage}
            />
            <Typography
              mt={2}
              component='h2'
              variant='h5'
              textAlign='center'
              sx={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Start using Tasky now!
            </Typography>
            <Typography
              mt={1}
              component='p'
              sx={{
                color: '#cccc',
              }}>
              Manage your Tasks in an easy and more efficient way!
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
