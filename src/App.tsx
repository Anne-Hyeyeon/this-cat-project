import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Router from './router/router';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Router />
    </BrowserRouter>
  );
};

export default App;
