import { Box, Typography } from '@mui/material';

const MainFooter = () => {
  const currentYear = new Date().getFullYear();
  const CREATER_NAME = 'Anne';
  return (
    <Box
      height={100}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="secondary.light"
    >
      <Typography variant="body2" color="secondary.dark">
        dlswptkfkd@gmail.com
      </Typography>
      <Typography variant="body2" color="secondary.dark">
        This cat © {currentYear} | Created by {CREATER_NAME}. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default MainFooter;
