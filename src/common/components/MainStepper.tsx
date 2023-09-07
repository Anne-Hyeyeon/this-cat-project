import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { State } from '../../store/store';
import { Container } from '@mui/system';

const steps = [
  '사진 선택하기',
  '문구 입력하기',
  '디자인 고르기',
  '디자인 세부 설정하기',
  '완성',
];

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
