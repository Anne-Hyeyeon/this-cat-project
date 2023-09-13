import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmphasizedPoster from '../common/components/poster/EmphasizedPoster';
import Main from '../pages/Main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;
