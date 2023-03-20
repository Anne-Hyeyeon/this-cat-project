import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

const MainAppBar = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: secondary.main,
          boxShadow: 'none',
          borderBottom: `1px solid ${secondary.light}`,
        }}
      >
        <Box
          height={80}
          maxWidth="sm"
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <HomeIcon fontSize="medium" />
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
          <HomeIcon color="secondary" />
        </Box>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
