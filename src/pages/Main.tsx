import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';
import './Main.scss';
import backgroundImg from '../assets/img/background.png';
import MainAppBar from '../common/components/MainAppBar';
import MainWrapper from '../common/components/MainWrapper';

const Main = () => {
  const state = useSelector((state: State) => state);
  const { step } = state;
  return (
    <Box height="100%" bgcolor="#fbf6f0">
      <MainAppBar />
      {step === 0 && <Start />}
      {step === 1 && <Photo />}
      {step === 2 && <Text />}
      {step === 3 && <Result />}
    </Box>
  );
};

export default Main;
