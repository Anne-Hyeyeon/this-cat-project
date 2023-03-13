import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../store/store';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Start = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  return (
    <Box padding={5} textAlign="center">
      <Typography variant="h4" color={primary.dark}>
        이 고양이를 보신 적 있나요?
      </Typography>
      <Typography>귀여운 포스터를 통해</Typography>
      <Typography>사랑스러운 내 애완동물, 최애를 자랑해 보세요!</Typography>
      <button
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        시작하기
      </button>
    </Box>
  );
};

export default Start;
