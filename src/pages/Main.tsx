import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';
import { useTheme } from '@mui/material/styles';
import './Main.scss';
import backgroundImg from '../assets/img/background.png';

const Main = () => {
  const state = useSelector((state: State) => state);
  const theme = useTheme();
  const { step } = state;
  const { primary, secondary } = theme.palette;
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
          height: 'calc(var(--vh, 1vh) * 100)',
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
