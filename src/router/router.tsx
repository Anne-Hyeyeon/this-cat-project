import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Photo from '../pages/Photo';
import Result from '../pages/Result';
import Text from '../pages/Text';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/test" element={<Text />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default Router;
