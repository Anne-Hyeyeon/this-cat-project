import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';

const Main = () => {
  const state = useSelector((state: State) => state);
  const { step } = state;

  return (
    <>
      {step === 0 && <Start />}
      {step === 1 && <Photo />}
      {step === 2 && <Text />}
      {step === 3 && <Result />}
    </>
  );
};

export default Main;
