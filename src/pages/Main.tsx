import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from '../store/store';
import { Container, Box } from '@mui/material';
import Photo from './Photo';
import Start from './Start';
import Text from './Text';
import Result from './Result';
import './Main.scss';
import { useTheme } from '@mui/material/styles';

const Main = () => {
  const state = useSelector((state: State) => state);
  const theme = useTheme();
  const { step } = state;
  const { primary, secondary } = theme.palette;
  return (
    <Box
      height="100vh"
      sx={{ backgroundColor: primary.light }}
      id="this-cat-container"
    >
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: secondary.main, height: '100vh' }}
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
