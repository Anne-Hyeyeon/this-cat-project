import { useSelector } from 'react-redux';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Start from './Start';
import Photo from './Photo';
import Text from './Text';
import Design from './Design';
import Result from './Result';
import MainAppBar from '../common/components/MainAppBar';
import MainStepper from '../common/components/MainStepper';
import Detail from './Detail';

const Main = () => {
  const step = useSelector((state: State) => state.step);

  return (
    <Box bgcolor="#fbf6f0" height="100vh">
      <MainAppBar />
      <Container maxWidth="sm">
        {step !== 0 && <MainStepper />}
        {step === 0 && <Start />}
        {step === 1 && <Photo />}
        {step === 2 && <Design />}
        {step === 3 && <Text />}
        {step === 4 && <Detail />}
        {step === 5 && <Result />}
      </Container>
    </Box>
  );
};

export default Main;
