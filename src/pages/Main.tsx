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
import EmphasizedDetail from './detail/EmphasizedDetail';
import SimpleDetail from './detail/SimpleDetail';

const Main = () => {
  const step = useSelector((state: State) => state.step);
  const posterType = useSelector((state: State) => state.posterType);

  return (
    <Box bgcolor="#fbf6f0" height="100vh">
      <MainAppBar />
      <Container maxWidth="sm">
        {step !== 0 && <MainStepper />}
        {step === 0 && <Start />}
        {step === 1 && <Photo />}
        {step === 2 && <Design />}
        {step === 3 && <Text />}
        {step === 4 && posterType === 'emphasized' && <EmphasizedDetail />}
        {step === 4 && posterType === 'simple' && <SimpleDetail />}
        {step === 5 && <Result />}
      </Container>
    </Box>
  );
};

export default Main;
