import { Box, Grow, Link, Typography } from '@mui/material';
import React from 'react';

const ForgotPassword = () => {
  return (
    <Grow in>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
          padding: '2rem',
        }}>
        <h1>Forgot Password</h1>
        <Typography mt='1.5rem'>
          Already have an Account?
          <Link href='/sign-in' ml='1rem' underline='hover'>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Grow>
  );
};

export default ForgotPassword;
