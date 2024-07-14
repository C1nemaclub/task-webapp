import { Box } from '@mui/material';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import Sidebar from './sidebar';
import Navbar from './navbar';

const UserLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to='/auth/sign-in' />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
      }}>
      <Sidebar />
      <Box
        component='main'
        width='100%'
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
        }}>
        <Navbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserLayout;
