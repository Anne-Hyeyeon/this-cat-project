import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import EmphasizedPoster from '../../common/components/Poster/EmphasizedPoster';
import {
  setStep,
  State,
  setHeaderColor,
  setAccentColor,
  setFirstLineColor,
  setSecondLineColor,
  setBgColor,
  initColor,
} from '../../store/store';

import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Avatar,
  Popover,
} from '@mui/material';

import MainWrapper from '../../common/components/MainWrapper';
import MainButton from '../../common/components/MainButton';
import { SketchPicker } from 'react-color';
import { getPosterWidth } from '../../common/function/getPosterWidth';

interface Color {
  hex: string;
}

const EmphasizedDetail = () => {
  const [posterWidth, setPosterWidth] = useState(getPosterWidth(60, 50));

  useEffect(() => {
    const handleResize = () => {
      setPosterWidth(getPosterWidth(60, 50));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <Box minHeight="70vh">
      <Container maxWidth="sm">
        <MainWrapper>
          <Grid container rowGap={2} p={2} sx={{ bgcolor: 'secondary.light' }}>
            <Grid item xs={12} sm={6}>
              <EmphasizedPoster styles={{ width: posterWidth }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" mb={1}>
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
                <Typography variant="h6" mb={1} ml={1}>
                  배경색
                </Typography>
                <Popover
                  id="second-line-popover"
                  open={Boolean(bgPickerAnchorEl)}
                  anchorEl={bgPickerAnchorEl}
                  onClose={handleBgClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.bgColor}
                    onChange={handleBgColorChange}
                  />
                </Popover>
              </Box>
              <Box display="flex" mb={1}>
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
                <Typography variant="h6" mb={1} ml={1}>
                  강조색
                </Typography>
                <Popover
                  id="accent-popover"
                  open={Boolean(accentPickerAnchorEl)}
                  anchorEl={accentPickerAnchorEl}
                  onClose={handleAccentClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.accentColor}
                    onChange={handleAccentColorChange}
                  />
                </Popover>
              </Box>
              <Box display="flex" mb={1}>
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
                <Typography variant="h6" mb={1} ml={1}>
                  헤더
                </Typography>
                <Popover
                  id="header-popover"
                  open={Boolean(headerPickerAnchorEl)}
                  anchorEl={headerPickerAnchorEl}
                  onClose={handleHeaderClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.headerColor}
                    onChange={handleHeaderColorChange}
                  />
                </Popover>
              </Box>
              <Box display="flex" mb={1}>
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
                <Typography variant="h6" mb={1} ml={1}>
                  첫 번째 라인
                </Typography>

                <Popover
                  id="first-line-popover"
                  open={Boolean(firstLinePickerAnchorEl)}
                  anchorEl={firstLinePickerAnchorEl}
                  onClose={handleFirstLineClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.firstLineColor}
                    onChange={handleFirstLineColorChange}
                  />
                </Popover>
              </Box>
              <Box display="flex" mb={1}>
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
                <Typography variant="h6" mb={1} ml={1}>
                  두 번째 라인
                </Typography>
                <Popover
                  id="second-line-popover"
                  open={Boolean(secondLinePickerAnchorEl)}
                  anchorEl={secondLinePickerAnchorEl}
                  onClose={handleSecondLineClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <SketchPicker
                    color={colors.emphasizedPosterColors.secondLineColor}
                    onChange={handleSecondLineColorChange}
                  />
                </Popover>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(initColor());
                  }}
                >
                  색깔 초기화
                </Button>
              </Box>
            </Grid>
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

export default EmphasizedDetail;
