import { useSelector } from 'react-redux';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';
import backgroundImg from '../assets/img/background.png';
import MainAppBar from '../common/components/MainAppBar';
import MainWrapper from '../common/components/MainWrapper';
import MainStepper from '../common/components/MainStepper';

const Main = () => {
  const step = useSelector((state: State) => state.step);

  return (
    <Box bgcolor="#fbf6f0">
      <MainAppBar />
      <Container maxWidth="sm">
        {step !== 0 && <MainStepper />}
        {step === 0 && <Start />}
        {step === 1 && <Photo />}
        {step === 2 && <Text />}
        {step === 3 && <Result />}
      </Container>
    </Box>
  );
};

export default Main;
