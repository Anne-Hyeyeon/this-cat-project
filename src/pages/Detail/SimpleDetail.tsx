import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import EmphasizedPoster from '../../common/components/Poster/EmphasizedPoster';
import {
  setPetName,
  setPetType,
  setStep,
  State,
  setHeaderColor,
  setAccentColor,
  setBgColor,
  setFirstLineColor,
  setSecondLineColor,
  initColor,
} from '../../store/store';
import { initialState } from '../../store/store';
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
  Avatar,
  Popover,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MainWrapper from '../../common/components/MainWrapper';
import SimplePoster from '../../common/components/Poster/SimplePoster';
import MainButton from '../../common/components/MainButton';
import {
  ChromePicker,
  CirclePicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';

interface Color {
  hex: string;
}

const SimpleDetail = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { petName, petType, posterType, colors } = state;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [accentPickerAnchorEl, setAccentPickerAnchorEl] = useState<any | null>(
    null,
  );
  const [bgPickerAnchorEl, setBgPickerAnchorEl] = useState<any | null>(null);
  const [headerPickerAnchorEl, setHeaderPickerAnchorEl] = useState<any | null>(
    null,
  );
  const [firstLinePickerAnchorEl, setFirstLinePickerAnchorEl] = useState<
    any | null
  >(null);
  const [secondLinePickerAnchorEl, setSecondLinePickerAnchorEl] = useState<
    any | null
  >(null);

  const handleBgClick = (event: React.MouseEvent<any>) => {
    setBgPickerAnchorEl(event.currentTarget);
  };

  const handleHeaderClick = (event: React.MouseEvent<any>) => {
    setHeaderPickerAnchorEl(event.currentTarget);
  };

  const handleFirstLineClick = (event: React.MouseEvent<any>) => {
    setFirstLinePickerAnchorEl(event.currentTarget);
  };

  const handleSecondLineClick = (event: React.MouseEvent<any>) => {
    setSecondLinePickerAnchorEl(event.currentTarget);
  };

  const handleBgClose = () => {
    setBgPickerAnchorEl(null);
  };

  const handleHeaderClose = () => {
    setHeaderPickerAnchorEl(null);
  };

  const handleFirstLineClose = () => {
    setFirstLinePickerAnchorEl(null);
  };

  const handleSecondLineClose = () => {
    setSecondLinePickerAnchorEl(null);
  };

  const handleBgColorChange = (color: Color) => {
    console.log(color);
    dispatch(setBgColor({ type: 'simplePosterColors', color: color.hex }));
  };

  const handleHeaderColorChange = (color: Color) => {
    dispatch(setHeaderColor({ type: 'simplePosterColors', color: color.hex }));
  };

  const handleFirstLineColorChange = (color: Color) => {
    dispatch(
      setFirstLineColor({ type: 'simplePosterColors', color: color.hex }),
    );
  };

  const handleSecondLineColorChange = (color: Color) => {
    dispatch(
      setSecondLineColor({ type: 'simplePosterColors', color: color.hex }),
    );
  };

  return (
    <Box height="100vh">
      <Container maxWidth="sm">
        <MainWrapper>
          <Grid container sx={{ bgcolor: 'secondary.light', p: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                *미리보기*
              </Typography>
              <SimplePoster styles={{ width: 100 }} />
            </Grid>
            <Grid display="flex" item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                배경색
              </Typography>
              <Box>
                <Avatar
                  onClick={handleBgClick}
                  sx={{
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                    bgcolor: colors.simplePosterColors.bgColor,
                  }}
                >
                  {' '}
                </Avatar>
                <Popover
                  id="second-line-popover"
                  open={Boolean(bgPickerAnchorEl)}
                  anchorEl={bgPickerAnchorEl}
                  onClose={handleBgClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <SketchPicker
                    color={colors.simplePosterColors.bgColor}
                    onChange={handleBgColorChange}
                  />
                </Popover>
              </Box>
            </Grid>
            <Grid display="flex" item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                헤더
              </Typography>
              <Box>
                <Avatar
                  onClick={handleHeaderClick}
                  sx={{
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                    bgcolor: colors.simplePosterColors.headerColor,
                  }}
                >
                  {' '}
                </Avatar>
                <Popover
                  id="header-popover"
                  open={Boolean(headerPickerAnchorEl)}
                  anchorEl={headerPickerAnchorEl}
                  onClose={handleHeaderClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <SketchPicker
                    color={colors.simplePosterColors.headerColor}
                    onChange={handleHeaderColorChange}
                  />
                </Popover>
              </Box>
            </Grid>
            <Grid display="flex" item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                첫 번째 라인
              </Typography>
              <Box>
                <Avatar
                  onClick={handleFirstLineClick}
                  sx={{
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                    bgcolor: colors.simplePosterColors.firstLineColor,
                  }}
                >
                  {' '}
                </Avatar>
                <Popover
                  id="first-line-popover"
                  open={Boolean(firstLinePickerAnchorEl)}
                  anchorEl={firstLinePickerAnchorEl}
                  onClose={handleFirstLineClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <SketchPicker
                    color={colors.simplePosterColors.firstLineColor}
                    onChange={handleFirstLineColorChange}
                  />
                </Popover>
              </Box>
            </Grid>
            <Grid display="flex" item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                두 번째 라인
              </Typography>
              <Box>
                <Avatar
                  onClick={handleSecondLineClick}
                  sx={{
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                    bgcolor: colors.simplePosterColors.secondLineColor,
                  }}
                >
                  {' '}
                </Avatar>
                <Popover
                  id="second-line-popover"
                  open={Boolean(secondLinePickerAnchorEl)}
                  anchorEl={secondLinePickerAnchorEl}
                  onClose={handleSecondLineClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <SketchPicker
                    color={colors.simplePosterColors.secondLineColor}
                    onChange={handleSecondLineColorChange}
                  />
                </Popover>
              </Box>
            </Grid>
            <Button
              onClick={() => {
                dispatch(initColor());
              }}
            >
              원래대로
            </Button>
          </Grid>
        </MainWrapper>
        <Grid container justifyContent="space-between" mt={4}>
          <Grid item xs={12}>
            <MainButton useIcon text="다음으로" />
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
            <Button
              onClick={() => {
                dispatch(setStep(3));
              }}
            >
              * 문구 수정하기
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SimpleDetail;
