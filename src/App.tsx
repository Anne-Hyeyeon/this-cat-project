import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';

const App = () => {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
