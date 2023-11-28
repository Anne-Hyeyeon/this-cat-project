import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CC3D44',
      dark: '#C63F3B',
      light: '#F6E9DB',
      contrastText: '#D9626A',
    },
    secondary: {
      main: '#fff',
      dark: 'rgba(0,0,0,0.7)',
      light: 'rgba(0,0,0,0.2)',
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
