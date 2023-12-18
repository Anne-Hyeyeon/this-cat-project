import { useSelector } from 'react-redux';
import { Container, Box, Grid } from '@mui/material';
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

  enum MainStep {
    Start,
    Photo,
    Design,
    Text,
    Detail,
    Result
  }
  const renderComponentBasedOnStep = (
    step: MainStep,
    posterType: 'emphasized' | 'simple',
  ) => {
    switch (step) {
      case MainStep.Start:
        return <Start />;
      case MainStep.Photo:
        return <Photo />;
      case MainStep.Design:
        return <Design />;
      case MainStep.Text:
        return <Text />;
      case MainStep.Detail:
        return posterType === 'emphasized' ? (
          <EmphasizedDetail />
        ) : (
          <SimpleDetail />
        );
      case MainStep.Result:
        return <Result />;
      default:
        return null;
    }
  };

  return (
    <Box
      overflow="auto"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: '50%',
        backgroundRepeat: 'repeat',
      }}
    >
      <MainAppBar />
      <Container maxWidth="sm" sx={{ paddingTop: '70px' }}>
        {step !== 0 && <MainStepper />}
        {renderComponentBasedOnStep(step, posterType)}
      </Container>
    </Box>
  );
};

export default Main;
