import { SxProps, Theme, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import React, { FC } from 'react';

export type SectionProps = {
  children: React.ReactNode;
  title?: string;
  sx?: SxProps<Theme>;
};

const Section: FC<SectionProps> = ({ children, title, sx }) => {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        height: '100%',
        padding: {
          sm: '3rem',
          xs: '0.5rem',
        },
        ...sx,
      }}>
      {title && (
        <Typography
          variant='h4'
          fontWeight={600}
          sx={{
            color: (theme) => theme.palette.primary.main,
            marginBottom: '1rem',
          }}>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: (theme) => theme.palette.common.white,
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default Section;
