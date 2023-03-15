import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#414141',
      dark: '#B96C1F',
      light: '#F6E9DB',
      contrastText: '#844201',
    },
    secondary: {
      main: '#fff',
      dark: '#414141',
    },
  },
  typography: {
    fontFamily: 'Jua',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
