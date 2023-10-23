import { useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import { State } from '../store/store';
import MainAppBar from '../common/components/MainAppBar';
import MainStepper from '../common/components/MainStepper';
import Start from './Start';
import Photo from './Photo';
import Text from './Text';
import Design from './Design';
import Result from './Result';
import EmphasizedDetail from './Detail/EmphasizedDetail';
import SimpleDetail from './Detail/SimpleDetail';
import background from '../assets/img/background.jpg';

const Main = () => {
  const step = useSelector((state: State) => state.step);
  const posterType = useSelector((state: State) => state.posterType);

  const renderComponentBasedOnStep = (
    step: number,
    posterType: 'emphasized' | 'simple',
  ) => {
    switch (step) {
      case 0:
        return <Start />;
      case 1:
        return <Photo />;
      case 2:
        return <Design />;
      case 3:
        return <Text />;
      case 4:
        return posterType === 'emphasized' ? (
          <EmphasizedDetail />
        ) : (
          <SimpleDetail />
        );
      case 5:
        return <Result />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: '50%',
        backgroundRepeat: 'repeat',
      }}
    >
      <MainAppBar />
      <Container maxWidth="sm" sx={{ padding: '10px' }}>
        {step !== 0 && <MainStepper />}
        {renderComponentBasedOnStep(step, posterType)}
      </Container>
    </Box>
  );
};

export default Main;
