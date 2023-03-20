import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/system';
import { IconButton } from '@mui/material';
import { setStep } from '../../store/store';

const MainAppBar = () => {
  const theme = useTheme();
  const { secondary } = theme.palette;
  const dispatch = useDispatch();
  const handleHomeBtnOnclick = () => {
    dispatch(setStep(0));
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: secondary.light,
          boxShadow: 'none',
          borderBottom: `1px solid ${secondary.main}`,
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
            <IconButton color="primary" onClick={handleHomeBtnOnclick}>
              <HomeIcon fontSize="medium" />
            </IconButton>
            <Box textAlign="center" m={3}>
              <Typography
                fontFamily="IBM Plex Sans KR"
                fontWeight={500}
                variant="body2"
                color="#c63f3b"
              >
                Have you ever seen this cat?
              </Typography>
              <Typography
                fontFamily="IBM Plex Sans KR"
                fontWeight={700}
                variant="h6"
                color="#c63f3b"
              >
                이 고양이를 보신 적 있습니까?
              </Typography>
            </Box>
            <HomeIcon sx={{ color: '#fff' }} />
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
