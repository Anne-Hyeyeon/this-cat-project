import { Grid, Container } from '@mui/material';
import { Box } from '@mui/system';
import cat from '../assets/img/cat.png';
import BodyTypography from '../common/components/BodyTypoGraphy';
import MainButton from '../common/components/MainButton';
import MainWrapper from '../common/components/MainWrapper';
import TitleTypography from '../common/components/TitleTypography';
import React, { Component } from "react";
import Slider from "react-slick";


const Start = () => {
  return (
    <Container sx={{ padding: '10px' }}>
      <Grid container textAlign="center" rowGap={3}>
        <Grid item xs={12}>
          <MainWrapper>
            <Grid container rowGap={2}>
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
                <MainButton text="시작하기" useIcon />
              </Grid>
            </Grid>
          </MainWrapper>
        </Grid>
        <Grid item xs={12}>
          <MainWrapper>
            <Box width='100px' height='200px' border='1px solid black'>
              Slider
            </Box>
            <img src={cat} alt="example cat" width="90%" />
          </MainWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
