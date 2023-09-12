import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import cat from '../assets/img/cat.png';
import MainWrapper from '../common/components/MainWrapper';
import MainButton from '../common/components/MainButton';
('../common/components/MainButton');

import { useDispatch } from 'react-redux';
import { setStep } from '../store/store';
import TitleTypography from '../common/components/TitleTypography';
import BodyTypography from '../common/components/BodyTypoGraphy';

const Start = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <Container maxWidth="sm" sx={{ padding: '30px' }}>
      <MainWrapper>
        <Grid container textAlign="center" rowGap={3}>
          <Grid item xs={12}>
            <TitleTypography>이 고양이를 보신 적 있습니까?</TitleTypography>
          </Grid>
          <Grid item xs={12}>
            <BodyTypography>혼자만 보기 아까운</BodyTypography>
            <BodyTypography>우리집 세젤예 강아지, 고양이를</BodyTypography>
            <BodyTypography>나만의 포스터를 통해</BodyTypography>
            <BodyTypography>사람들한테 자랑해 보세요.</BodyTypography>
          </Grid>
          <Grid item xs={12}>
            <img src={cat} alt="example cat" width="90%" />
          </Grid>
        </Grid>
      </MainWrapper>
      <Grid container textAlign="center" marginTop={2}>
        <Grid item xs={12}>
          <MainButton text="시작하기" useIcon />
          <button
            onClick={() => {
              dispatch(setStep(2));
            }}
          >
            하하
          </button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
