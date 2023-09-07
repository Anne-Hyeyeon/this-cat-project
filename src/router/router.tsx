import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Poster from '../common/components/poster/DefaultPoster';
import Main from '../pages/Main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/1" element={<Poster />} />
    </Routes>
  );
};

export default Router;
