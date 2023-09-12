import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { DefaultPoster } from '../common/components/poster/DefaultPoster';
import {
  setPetName,
  setPetType,
  setStep,
  State,
  setHeaderColor,
  setAccentColor,
} from '../store/store';
import { initialState } from '../store/store';
import { useFormControl } from '@mui/material/FormControl';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MainWrapper from '../common/components/MainWrapper';
import { SimplePoster } from '../common/components/poster/SimplePoster';
import MainButton from '../common/components/MainButton';
import {
  ChromePicker,
  CirclePicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';

// interface color {

// }

const Detail = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { petName, petType, posterType, colors } = state;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    console.log(color.hex);
    dispatch(setAccentColor(color.hex));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petType || !petName) {
      alert('모든 필드를 채워주세요!');
      return;
    }
    dispatch(setStep(state.step + 1));
  };

  return (
    <Box height="100vh">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <MainWrapper>
            <Grid container sx={{ bgcolor: 'secondary.light', p: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h6" marginBottom={1}>
                  *미리보기*
                </Typography>
                {posterType === 'emphasized' ? (
                  <DefaultPoster styles={{ width: 100 }} />
                ) : (
                  <SimplePoster styles={{ width: 100 }} />
                )}
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div onClick={handleClick}>
                    <div>ㅋㅋㅋ</div>
                  </div>
                  {displayColorPicker ? (
                    <div>
                      <div onClick={handleClose}>안녕</div>
                      <SketchPicker
                        color={colors.emphasizedPosterColors.accentColor}
                        onChange={handleChange}
                      />
                    </div>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </MainWrapper>
          <Grid container justifyContent="space-between" mt={4}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: secondary.dark,
                  color: secondary.light,
                  height: '50px',
                }}
                type="submit"
              >
                다음으로
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  dispatch(setStep(1));
                }}
              >
                * 사진 다시 선택하기
              </Button>
              <Button
                onClick={() => {
                  dispatch(setStep(2));
                }}
              >
                * 디자인 다시 선택하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default Detail;
