import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../store/store';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import mingming from '../assets/img/mingming.png';
import cat from '../assets/img/cat.png';
import banner from '../assets/img/banner.png';

const Start = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  return (
    <Box>
      <Grid container rowGap={5} textAlign="center">
        <Grid xs={12}>
          <Box>
            <img src={banner} alt="banner" />
          </Box>
        </Grid>
        <Grid xs={6} textAlign="right" p={1}>
          <img src={mingming} alt="example ming" width={200} />
        </Grid>
        <Grid xs={6} textAlign="left" p={1}>
          <img src={cat} alt="example cat" width={200} />
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5" color={secondary.dark}>
            귀여운 포스터를 통해
          </Typography>
          <Typography variant="h5" color={secondary.dark}>
            사랑스러운 내 애완동물, 최애를 자랑해 보세요!
          </Typography>
        </Grid>
        <Grid xs={12}>
          <button
            onClick={() => {
              dispatch(setStep(1));
            }}
          >
            시작하기
          </button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;
