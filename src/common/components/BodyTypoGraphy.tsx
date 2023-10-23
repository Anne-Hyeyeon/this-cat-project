import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

const BodyTypography = ({ children }: Props): JSX.Element => {
  return (
    <Typography
      variant="body1"
      color="secondary-dark"
      fontFamily="Nanum Gothic"
    >
      {children}
    </Typography>
  );
};

export default BodyTypography;
