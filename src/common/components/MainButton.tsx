import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, State } from '../../store/store';
import PetsIcon from '@mui/icons-material/Pets';

const MainButton = ({ text, useIcon }: { text: string; useIcon?: boolean }) => {
  const theme = useTheme();
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const { step } = state;
  const { secondary } = theme.palette;
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor: secondary.dark,
        color: secondary.light,
        height: '50px',
      }}
      onClick={() => {
        dispatch(setStep(step + 1));
      }}
    >
      {useIcon && <PetsIcon />}
      <Typography ml={useIcon ? 1 : 0}>{text}</Typography>
    </Button>
  );
};

export default MainButton;
