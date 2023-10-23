import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, State } from '../../store/store';
import PetsIcon from '@mui/icons-material/Pets';

const MainButton = ({ text, useIcon }: { text: string; useIcon?: boolean }) => {
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const { step } = state;
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor: 'secondary.dark',
        color: 'secondary.main',
        height: '50px',
      }}
      onClick={() => {
        dispatch(setStep(step + 1));
      }}
    >
      {useIcon && <PetsIcon />}
      <Typography ml={useIcon ? 1 : 0}>{text}</Typography>
    </Button>
  );
};

export default MainButton;
