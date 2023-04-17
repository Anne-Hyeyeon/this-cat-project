import React from 'react';
import { Typography, Grid, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import cat from '../assets/img/cat.png';
import MainWrapper from '../common/components/MainWrapper';
import MainButton from '../common/components/MainButton';

const Start = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <Container maxWidth="sm" sx={{ padding: '30px' }}>
      <MainWrapper>
        <Grid container textAlign="center" rowGap={3}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color={secondary.dark}
              fontWeight={700}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              이 고양이를 보신 적 있습니까?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color={secondary.dark}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              혼자만 보기 아까운 <br /> 우리집 세젤예 강아지, 고양이를
            </Typography>
            <Typography
              variant="body2"
              color={secondary.dark}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              나만의 포스터를 통해 <br />
              사람들한테 자랑해 보세요.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={cat} alt="example cat" width="90%" />
          </Grid>
        </Grid>
      </MainWrapper>
      <Grid container textAlign="center" marginTop={2}>
        <Grid item xs={12}>
          <MainButton text="시작하기" useIcon />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
