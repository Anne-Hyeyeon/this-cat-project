import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F1A661',
      dark: '#E38B29',
      light: '#FDEEDC',
    },
    secondary: {
      main: '#fff',
      dark: '#414141',
    },
  },
  typography: {
    fontFamily: 'Yeon Sung',
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
