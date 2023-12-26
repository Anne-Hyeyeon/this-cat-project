import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import {
  setPetDesc,
  setPetName,
  setPetType,
  setStep,
  State,
} from '../store/store';

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

import MainWrapper from '../common/components/MainWrapper';
import SimplePoster from '../common/components/Poster/SimplePoster';
import { getPosterWidth } from '../common/function/getPosterWidth';

const Text = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const [showInput, setShowInput] = useState(false);
  const [posterWidth, setPosterWidth] = useState(getPosterWidth(60, 50));
  const { petName, petType, posterType, petDesc } = state;

  useEffect(() => {
    const handleResize = () => {
      setPosterWidth(getPosterWidth(60, 50));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePetTypeSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value as string;

    setShowInput(selectedValue === '직접 입력');
    dispatch(setPetType(selectedValue));
    if (selectedValue === '직접 입력') {
      dispatch(setPetType(petType));
    }
  };

  const handlePetTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetType(e.target.value));
    const inputValue = e.target.value;
    if (inputValue.length > 4) {
      alert('4글자까지만 입력 가능합니다. 🙏');
      return;
    }
  };

  const handlePetNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetName(e.target.value));
    const inputValue = e.target.value;
    if (inputValue.length > 6) {
      alert('6글자까지만 입력 가능합니다. 🙏');
      return;
    }
  };

  const handlePetDescInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetDesc(e.target.value));
    const inputValue = e.target.value;
    if (inputValue.length > 4) {
      alert('4글자까지만 입력 가능합니다. 🙏');
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petType || !petName || !petDesc) {
      alert('모든 필드를 채워주세요!');
      return;
    }
    dispatch(setStep(state.step + 1));
  };

  return (
    <Box minHeight="70vh">
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <MainWrapper>
            <Grid
              container
              rowGap={2}
              sx={{ bgcolor: 'secondary.light', p: 2 }}
            >
              <Grid item xs={12} sm={6} p={1}>
                {posterType === 'emphasized' ? (
                  <EmphasizedPoster styles={{ width: posterWidth }} />
                ) : (
                  <SimplePoster styles={{ width: posterWidth }} />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      sx={{ width: 150, mb: 1 }}
                      value={showInput ? '직접 입력' : petType}
                      onChange={handlePetTypeSelectChange}
                      size="small"
                    >
                      <MenuItem value="고양이">고양이</MenuItem>
                      <MenuItem value="강아지">강아지</MenuItem>
                      <MenuItem value="이구아나">이구아나</MenuItem>
                      <MenuItem value="직접 입력">직접 입력</MenuItem>
                    </Select>
                    <FormHelperText sx={{ m: 0 }}>
                      찾을 대상 ex) 고양이, 남자, 아내
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {showInput && (
                  <Grid item>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                      <TextField
                        sx={{ width: 150, mb: 1 }}
                        size="small"
                        inputProps={{ maxLength: 4 }}
                        value={petType}
                        onChange={handlePetTypeInputChange}
                        required
                      />
                      <FormHelperText sx={{ m: 0 }}>
                        최대 4글자까지 입력 가능합니다 <br />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}
                <Grid item>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <TextField
                      sx={{ width: 150, mb: 1 }}
                      size="small"
                      inputProps={{ maxLength: 6 }}
                      value={petName}
                      onChange={handlePetNameInputChange}
                    />
                    <FormHelperText sx={{ m: 0 }}>
                      동물, 또는 최애의 이름을 입력해주세요. <br />
                      ex) 저희집 별이, 제 아내 <br /> 최대 6글자까지 입력
                      가능합니다.
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl sx={{ m: 1, mb: 5, minWidth: 120 }}>
                    <TextField
                      sx={{ width: 150, mb: 1 }}
                      size="small"
                      inputProps={{ maxLength: 4 }}
                      value={petDesc}
                      onChange={handlePetDescInputChange}
                    />
                    <FormHelperText sx={{ m: 0 }}>
                      대상을 설명하는 말을 넣어 주세요. <br />
                      ex) 존귀, 졸귀, 존예. <br />
                      최대 <span style={{ color: 'primary-main' }}>4글자</span>
                      까지 입력 가능합니다.
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </MainWrapper>
          <Grid container justifyContent="space-between" mt={4}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: 'secondary.dark',
                  color: 'secondary.light',
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

export default Text;
