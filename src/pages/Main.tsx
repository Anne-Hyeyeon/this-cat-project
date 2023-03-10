import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';

const Main = () => {
  const state = useSelector((state: State) => state);
  const { step } = state;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        {step === 0 && <Start />}
        {step === 1 && <Photo />}
        {step === 2 && <Text />}
        {step === 3 && <Result />}
      </Box>
    </Container>
  );
};

export default Main;
