import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import Poster from '../common/components/poster/DefaultPoster';
import DefaultPoster from '../common/components/poster/DefaultPoster';
import SimplePoster from '../common/components/poster/SimplePoster';

function Design() {
  return (
    <Box height="100vh">
      <Container maxWidth="sm">
        <Grid
          container
          sx={{ bgcolor: 'secondary.light', p: 2 }}
          rowSpacing={3}
        >
          <Grid item xs={12}>
            <DefaultPoster styles={{ width: 100 }} />
          </Grid>
          <Grid item xs={12}>
            <SimplePoster styles={{ width: 100 }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Design;
