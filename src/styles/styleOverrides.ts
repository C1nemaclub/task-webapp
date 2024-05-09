import { createTheme, PaletteColor } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      //   light: '#ff00ff',
      // main: '#bc560a',
      contrastText: '#fff',
      '50': '#eff2fe',
      '100': '#e0e6fe',
      '200': '#c6d2ff',
      '300': '#a5b4fc',
      '400': '#808df8',
      '500': '#6366f1',
      '600': '#6366f1',
      '700': '#4239ca',
      '800': '#3631a3',
      '900': '#312e81',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h5: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
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
        root: ({ theme }) => ({
          background: theme.palette.primary['700' as keyof PaletteColor],
        }),
      },
    },
  },
});
