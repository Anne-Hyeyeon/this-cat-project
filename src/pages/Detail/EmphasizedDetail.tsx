import { Container } from '@mui/system';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import {
  setPetName,
  setPetType,
  setStep,
  State,
  setHeaderColor,
  setAccentColor,
  setFirstLineColor,
  setSecondLineColor,
  setBgColor,
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
  Badge,
  Popover,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MainWrapper from '../../common/components/MainWrapper';
import SimplePoster from '../../common/components/poster/SimplePoster';
import MainButton from '../../common/components/MainButton';
import {
  ChromePicker,
  CirclePicker,
  SketchPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';
import EmphasizedPoster from '../../common/components/poster/EmphasizedPoster';

interface Color {
  hex: string;
}

const EmphasizedDetail = () => {
  const theme = useTheme();
  const { secondary } = theme.palette;

  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { colors } = state;
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

  const handleAccentClick = (event: React.MouseEvent<any>) => {
    setAccentPickerAnchorEl(event.currentTarget);
  };
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

  const handleAccentClose = () => {
    setAccentPickerAnchorEl(null);
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

  const handleAccentColorChange = (color: Color) => {
    dispatch(setAccentColor(color.hex));
  };
  const handleBgColorChange = (color: Color) => {
    dispatch(setBgColor({ type: 'emphasizedPosterColors', color: color.hex }));
  };

  const handleHeaderColorChange = (color: Color) => {
    dispatch(
      setHeaderColor({ type: 'emphasizedPosterColors', color: color.hex }),
    );
  };

  const handleFirstLineColorChange = (color: Color) => {
    dispatch(
      setFirstLineColor({ type: 'emphasizedPosterColors', color: color.hex }),
    );
  };

  const handleSecondLineColorChange = (color: Color) => {
    dispatch(
      setSecondLineColor({ type: 'emphasizedPosterColors', color: color.hex }),
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
              <EmphasizedPoster styles={{ width: 100 }} />
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
                    bgcolor: colors.emphasizedPosterColors.bgColor,
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
                    color={colors.emphasizedPosterColors.bgColor}
                    onChange={handleBgColorChange}
                  />
                </Popover>
              </Box>
            </Grid>
            <Grid display="flex" item xs={12}>
              <Typography variant="h6" marginBottom={1}>
                강조색
              </Typography>
              <Box>
                <Avatar
                  onClick={handleAccentClick}
                  sx={{
                    border: '1px solid #bbb',
                    cursor: 'pointer',
                    bgcolor: colors.emphasizedPosterColors.accentColor,
                  }}
                >
                  {' '}
                </Avatar>
                <Popover
                  id="accent-popover"
                  open={Boolean(accentPickerAnchorEl)}
                  anchorEl={accentPickerAnchorEl}
                  onClose={handleAccentClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.accentColor}
                    onChange={handleAccentColorChange}
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
                    bgcolor: colors.emphasizedPosterColors.headerColor,
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
                    color={colors.emphasizedPosterColors.headerColor}
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
                    bgcolor: colors.emphasizedPosterColors.firstLineColor, // 상태 관리 구조에 따라 적절하게 수정해야 합니다.
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
                    color={colors.emphasizedPosterColors.firstLineColor}
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
                    bgcolor: colors.emphasizedPosterColors.secondLineColor,
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
                    color={colors.emphasizedPosterColors.secondLineColor}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EmphasizedDetail;
