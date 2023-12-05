import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { State } from '../../store/store';
import { Container } from '@mui/system';
import './MainStepper.scss';

const steps = ['사진 선택', '디자인 선택', '문구 입력', '컬러 설정', '완성'];

const MainStepper = () => {
  const state = useSelector((state: State) => state);
  const { step } = state;

  return (
    <Container maxWidth="sm">
      <Box my={3}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Container>
  );
};

export default MainStepper;
