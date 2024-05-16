import { Box } from '@mui/material';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import Sidebar from './sidebar';

const UserLayout = () => {
  const { user } = useContext(AuthContext);
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
      <Box component='main' p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
