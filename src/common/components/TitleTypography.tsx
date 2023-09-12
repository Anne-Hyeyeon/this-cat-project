import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: string;
}

const TitleTypography = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <Typography
      variant="h6"
      color={secondary.dark}
      fontWeight={700}
      sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
    >
      {children}
    </Typography>
  );
};

export default TitleTypography;
