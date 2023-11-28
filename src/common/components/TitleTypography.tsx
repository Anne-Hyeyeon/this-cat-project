import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: string;
  bgColor?: string;
}

const TitleTypography = ({ bgColor, children }: Props): JSX.Element => {
  const theme = useTheme();
  const { primary } = theme.palette;
  return (
    <Typography
      bgcolor={bgColor}
      variant="h6"
      color="secondary-dark"
      fontWeight={700}
      sx={{ textShadow: `1px 1px 2px ${primary.light}` }}
      fontFamily="Nanum Gothic"
    >
      {children}
    </Typography>
  );
};

export default TitleTypography;
