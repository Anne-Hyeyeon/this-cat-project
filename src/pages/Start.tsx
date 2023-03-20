import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../store/store';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import mingming from '../assets/img/mingming.png';
import cat from '../assets/img/cat.png';
import banner from '../assets/img/banner.png';
import MainWrapper from '../common/components/MainWrapper';
import { Container } from '@mui/system';

const Start = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <MainWrapper>
        <Grid container textAlign="center" rowGap={3}>
          <Grid xs={12}>
            <Typography
              variant="h4"
              color={secondary.dark}
              fontWeight={700}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              이 고양이를 보신 적 있습니까?
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h6"
              color={secondary.dark}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              혼자만 보기 아까운 우리집 세젤예 강아지, 고양이를
            </Typography>
            <Typography
              variant="h6"
              color={secondary.dark}
              sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
            >
              나만의 포스터를 통해 사람들한테 자랑해 보세요.
            </Typography>
          </Grid>
          <Grid xs={12}>
            <img src={cat} alt="example cat" width="90%" />
          </Grid>
        </Grid>
      </MainWrapper>
      <Grid container textAlign="center" marginTop={2}>
        <Grid xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: secondary.dark,
              color: secondary.main,
              height: '50px',
            }}
            onClick={() => {
              dispatch(setStep(1));
            }}
          >
            <PetsIcon fontSize="small" />
            <Typography ml={1}> 시작하기</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
