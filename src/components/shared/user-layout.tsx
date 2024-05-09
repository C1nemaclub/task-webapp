import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/auth-context';

const UserLayout = () => {
  const { user } = useAuthContext();
  if (!user) return <Navigate to='/auth/sign-in' />;

  return (
    <Box>
      <h1>Main Router</h1>
      <Outlet />
    </Box>
  );
};

export default UserLayout;
