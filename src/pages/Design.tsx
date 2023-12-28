import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Grid, Typography } from '@mui/material';

import { setPosterType } from '../store/store';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainButton from '../common/components/MainButton';
import MainWrapper from '../common/components/MainWrapper';
import TitleTypography from '../common/components/TitleTypography';

const Design = () => {
  const dispatch = useDispatch();
  const [selectedPoster, setSelectedPoster] = useState('');

  const handlePosterSelect = (type: string) => {
    setSelectedPoster(type);
    dispatch(setPosterType(type));
  };

  return (
    <Box>
      <MainWrapper>
        <Container maxWidth="sm">
          <Grid container rowGap={3}>
            <Grid container>
              <Grid item xs={12} textAlign="center">
                <TitleTypography>😻 디자인 선택하기</TitleTypography>
              </Grid>
            </Grid>
            <Grid
              container
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
                animation: '1 ease-out',
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  transition: 'background-color 0.3s ease-in-out',
                },
              }}
            >
              <EmphasizedPoster styles={{ width: 50 }} />
              <Typography variant="h5" fontFamily="jua" fontWeight={500}>
                💖 강조형 💖
              </Typography>
              <Typography variant="body2" textAlign="center">
                😸 오리지널 '이 고양이를 보셨나요?' 포스터를 만들고 싶다면!
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
                animation: '1 ease-out',
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  transition: 'background-color 0.3s ease-in-out',
                },
              }}
            >
              <SimplePoster styles={{ width: 50 }} />
              <Typography variant="h5" fontFamily="jua" fontWeight={500}>
                💖 심플형 💖
              </Typography>
              <Typography variant="body2" textAlign="center">
                😸 테두리 없는 사진과 문구만으로 이루어진 심플한 포스터를
                원한다면!
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
