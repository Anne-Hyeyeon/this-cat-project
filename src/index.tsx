import { Provider } from 'react-redux/es/exports';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
);
