import { createTheme, PaletteColor } from '@mui/material';
export const theme = createTheme({
  palette: {
    primary: {
      // light: '#ff00ff',
      main: '#6366f1',
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
    text: {
      // primary: '#fff',
      // secondary: '#fff',
      // disabled: '#00ff00',
    },
    secondary: {
      main: '#ffcc80',
      // pick shades of orange
      '50': '#fff3e0',
      '100': '#ffe0b2',
      '200': '#ffcc80',
      '300': '#ffb74d',
      '400': '#ffa726',
      '500': '#ff9800',
      '600': '#fb8c00',
      '700': '#f57c00',
      '800': '#ef6c00',
      '900': '#e65100',
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
          // borderRadius: '0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& span': {
            color: 'red',
          },
          '& .MuiOutlinedInput-root': {
            // borderRadius: '0',
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
        colorSecondary: ({ theme }) => ({
          backgroundColor: theme.palette.secondary['200' as keyof PaletteColor],
          color: theme.palette.secondary['900' as keyof PaletteColor],
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.primary['700' as keyof PaletteColor],
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {},
    },
  },
});
