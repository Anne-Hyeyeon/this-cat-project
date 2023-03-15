import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';
import './Main.scss';
import backgroundImg from '../assets/img/background.png';

const Main = () => {
  const state = useSelector((state: State) => state);
  const { step } = state;
  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: `no-repeat url(${backgroundImg})`,
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        {step === 0 && <Start />}
        {step === 1 && <Photo />}
        {step === 2 && <Text />}
        {step === 3 && <Result />}
      </Container>
    </Box>
  );
};

export default Main;
