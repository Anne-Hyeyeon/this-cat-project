import { useDispatch } from 'react-redux';
import { AppBar, Box, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/system';
import { IconButton } from '@mui/material';
import { setStep } from '../../store/store';

const MainAppBar = () => {
  const dispatch = useDispatch();
  const handleHomeBtnOnclick = () => {
    dispatch(setStep(0));
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.main',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="sm">
          <Box
            height={70}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container>
              <Grid
                item
                xs={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton color="secondary" onClick={handleHomeBtnOnclick}>
                  <HomeIcon fontSize="medium" />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center" m={3}>
                  <Typography
                    bgcolor="primary.main"
                    fontFamily="IBM Plex Sans KR"
                    fontWeight={500}
                    variant="body2"
                    color="secondary.main"
                  >
                    Have you ever seen this cat?
                  </Typography>
                  <Typography
                    bgcolor="secondary.main"
                    fontFamily="IBM Plex Sans KR"
                    fontWeight={700}
                    variant="body2"
                    color="primary.main"
                    padding="2px"
                  >
                    😺 이 고양이를 보신 적 있나요? 🤷‍♀️
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <HomeIcon fontSize="small" sx={{ color: 'primary.main' }} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
