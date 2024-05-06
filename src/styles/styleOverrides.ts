import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ff00ff',
      main: '#161616',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          paddingTop: '.6rem',
          paddingBottom: '.6rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& span': {
            color: 'red',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          color: 'blue',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: '#161616',
        },
      },
    },
  },
});
