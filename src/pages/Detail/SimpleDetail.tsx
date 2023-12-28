import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  setStep,
  State,
  setHeaderColor,
  setBgColor,
  setFirstLineColor,
  setSecondLineColor,
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
import SimplePoster from '../../common/components/Poster/SimplePoster';
import MainButton from '../../common/components/MainButton';
import { ChromePicker } from 'react-color';
import { getPosterWidth } from '../../common/function/getPosterWidth';

interface Color {
  hex: string;
}

const SimpleDetail = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
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

  const { colors } = state;

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
    <Box minHeight="70vh">
      <Container maxWidth="sm">
        <MainWrapper>
          <Grid container rowGap={2} p={2} sx={{ bgcolor: 'secondary.light' }}>
            <Grid item xs={12} sm={6}>
              <SimplePoster styles={{ width: posterWidth }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" mb={1}>
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
                    horizontal: 'left',
                  }}
                >
                  <ChromePicker
                    color={colors.simplePosterColors.bgColor}
                    onChange={handleBgColorChange}
                  />
                </Popover>
              </Box>
              <Box display="flex" mb={1}>
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
                    horizontal: 'left',
                  }}
                >
                  <ChromePicker
                    color={colors.simplePosterColors.headerColor}
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
                    bgcolor: colors.simplePosterColors.firstLineColor,
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
                    horizontal: 'left',
                  }}
                >
                  <ChromePicker
                    color={colors.simplePosterColors.firstLineColor}
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
                    bgcolor: colors.simplePosterColors.secondLineColor,
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
                    horizontal: 'left',
                  }}
                >
                  <ChromePicker
                    color={colors.simplePosterColors.secondLineColor}
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

export default SimpleDetail;
