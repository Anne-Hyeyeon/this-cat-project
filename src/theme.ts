import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C63F3B',
      dark: '#C63F3B',
      light: '#F6E9DB',
      contrastText: '#C63F3B',
    },
    secondary: {
      main: '#fff',
      dark: 'rgba(0,0,0,0.8)',
      light: '#ddd',
    },
  },
  typography: {
    fontFamily: 'IBM Plex Sans KR',
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
