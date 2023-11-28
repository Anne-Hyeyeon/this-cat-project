import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainButton from '../common/components/MainButton';
import MainWrapper from '../common/components/MainWrapper';
import { useTheme } from '@mui/material/styles';
import TitleTypography from '../common/components/TitleTypography';
import BodyTypography from '../common/components/BodyTypoGraphy';
import { useDispatch } from 'react-redux';
import { setPosterType } from '../store/store';
('../common/components/MainButton');

const Design = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedPoster, setSelectedPoster] = useState('');

  const handlePosterSelect = (type: string) => {
    setSelectedPoster(type);
    dispatch(setPosterType(type));
  };

  return (
    <Box height="100vh">
      <MainWrapper>
        <Container maxWidth="sm">
          <Grid container rowGap={3}>
            <Grid container>
              <Grid item xs={12} textAlign="center">
                <TitleTypography>😻 디자인 선택하기</TitleTypography>
              </Grid>
            </Grid>
            <Grid
              item
              rowGap={1}
              xs={12}
              display="flex"
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={2}
              onClick={() => handlePosterSelect('emphasized')}
              sx={{
                cursor: 'pointer',
                border:
                  selectedPoster === 'emphasized' ? '2px solid #ddd' : 'none',
                backgroundColor:
                  selectedPoster === 'emphasized' ? 'secondary.light' : 'none',
              }}
            >
              <EmphasizedPoster styles={{ width: 50 }} />
              <Typography variant="h5" fontFamily="jua" fontWeight={500}>
                💖 강조형 💖
              </Typography>
            </Grid>
            <Grid
              item
              rowGap={1}
              xs={12}
              display="flex"
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={2}
              onClick={() => handlePosterSelect('simple')}
              sx={{
                cursor: 'pointer',
                border: selectedPoster === 'simple' ? '2px solid #ddd' : 'none',
                backgroundColor:
                  selectedPoster === 'simple' ? 'secondary.light' : 'none',
              }}
            >
              <SimplePoster styles={{ width: 50 }} />
              <Typography variant="h5" fontFamily="jua" fontWeight={500}>
                💖 심플형 💖
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center"></Grid>
          </Grid>
        </Container>
      </MainWrapper>
      <Grid item xs={12} mt={2}>
        <MainButton useIcon text="다음으로" />
      </Grid>
    </Box>
  );
};

export default Design;
