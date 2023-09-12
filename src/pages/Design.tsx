import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DefaultPoster } from '../common/components/poster/DefaultPoster';
import { SimplePoster } from '../common/components/poster/SimplePoster';
import MainButton from '../common/components/MainButton';
('../common/components/MainButton');
import MainWrapper from '../common/components/MainWrapper';
import { useTheme } from '@mui/material/styles';
import TitleTypography from '../common/components/TitleTypography';
import BodyTypography from '../common/components/BodyTypoGraphy';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State, setPosterType } from '../store/store';

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
          <Grid
            container
            rowGap={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} textAlign="center">
              <TitleTypography>디자인 선택하기</TitleTypography>
            </Grid>
          </Grid>
          <Grid
            container
            rowGap={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} textAlign="center">
              <BodyTypography>강조형</BodyTypography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              direction="row"
              justifyContent="center"
              onClick={() => handlePosterSelect('emphasized')}
              style={{
                border:
                  selectedPoster === 'emphasized' ? '2px solid gray' : 'none',
              }}
            >
              <img src="https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31" />
            </Grid>
          </Grid>
          <Grid
            container
            rowGap={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} textAlign="center">
              <BodyTypography>심플형</BodyTypography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              direction="row"
              justifyContent="center"
              onClick={() => handlePosterSelect('simple')}
              style={{
                border: selectedPoster === 'simple' ? '2px solid gray' : 'none',
              }}
            >
              <img src="https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31" />
            </Grid>
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
