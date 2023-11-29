import { Grid, Container, Typography } from '@mui/material';
import BodyTypography from '../common/components/BodyTypoGraphy';
import MainButton from '../common/components/MainButton';
import MainWrapper from '../common/components/MainWrapper';
import TitleTypography from '../common/components/TitleTypography';
import PosterSlider from '../common/components/PosterSlider';

const Start = () => {
  return (
    <Container sx={{ padding: '10px' }}>
      <Grid container textAlign="center" rowGap={3}>
        <Grid item xs={12}>
          <MainWrapper>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                <TitleTypography>이 고양이를 보신 적 있습니까?</TitleTypography>
                <Typography variant="h1">😽</Typography>
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
            <Grid container rowGap={1}>
              <Grid item xs={12} textAlign="center">
                <TitleTypography>😻이렇게 만들어 보세요!</TitleTypography>
              </Grid>
              <Grid item xs={12}>
                <PosterSlider />
              </Grid>
            </Grid>
          </MainWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
