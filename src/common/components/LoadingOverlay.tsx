import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

type LoadingOverlayProps = {
  isGenerating: boolean;
  progress?: number;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isGenerating,
  progress,
}) => {
  if (!isGenerating) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
      {progress !== undefined && (
        <Typography
          sx={{
            position: 'absolute',
            marginTop: '4rem',
          }}
        >
          {progress}%
        </Typography>
      )}
    </Box>
  );
};

export default LoadingOverlay;
