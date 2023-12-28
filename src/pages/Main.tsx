import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Button } from '@mui/material';

import { State } from '../store/store';
import MainAppBar from '../common/components/MainAppBar';
import MainStepper from '../common/components/MainStepper';
import MainFooter from '../common/components/MainFooter';
import Start from './Start';
import Photo from './Photo';
import Text from './Text';
import Design from './Design';
import Result from './Result';
import EmphasizedDetail from './Detail/EmphasizedDetail';
import SimpleDetail from './Detail/SimpleDetail';

import background from '../assets/img/background.jpg';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebase';

// 페이지 이탈 전, firebase에서 업로드 파일 삭제 처리
const Main = () => {
  const { step, posterType, fileRefPath } = useSelector(
    (state: State) => state,
  );
  const fileRef = ref(storage, fileRefPath);

  const handleBeforeUnload = async () => {
    if (fileRef) {
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error('File deletion error:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      handleBeforeUnload();
    };
  }, []);

  enum MainStep {
    Start,
    Photo,
    Design,
    Text,
    Detail,
    Result,
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
      height="100vh"
      overflow="auto"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: '50%',
        backgroundRepeat: 'repeat',
      }}
    >
      <MainAppBar />
      <Container
        maxWidth="sm"
        sx={{ paddingTop: '80px', paddingBottom: '30px' }}
      >
        {step !== 0 && <MainStepper />}
        {renderComponentBasedOnStep(step, posterType)}
      </Container>
      <MainFooter />
    </Box>
  );
};

export default Main;
