import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DefaultPoster } from '../common/components/poster/DefaultPoster';
import Main from '../pages/Main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/1" element={<DefaultPoster />} />
    </Routes>
  );
};

export default Router;
