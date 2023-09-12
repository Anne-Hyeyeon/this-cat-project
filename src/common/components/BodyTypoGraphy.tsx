import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: ReactNode;
}

const BodyTypography = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <Typography variant="body1" color={secondary.dark}>
      {children}
    </Typography>
  );
};

export default BodyTypography;
