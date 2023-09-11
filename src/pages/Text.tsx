import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { DefaultPoster } from '../common/components/poster/DefaultPoster';
import { setPetName, setPetType, setStep, State } from '../store/store';
import { initialState } from '../store/store';
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
import MainButton from '../common/components/MainButton';
import MainWrapper from '../common/components/MainWrapper';

const Text = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const [showInput, setShowInput] = useState(false);
  const { petName, petType } = state;

  const handlePetTypeSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value as string;

    setShowInput(selectedValue === '직접 입력');
    dispatch(setPetType(selectedValue));
    if (selectedValue === '직접 입력') {
      dispatch(setPetType(petType));
    }
  };

  const handleConfirm = () => {
    if (confirm('변경된 내용이 없습니다. 다음으로 넘어가시겠습니까?')) {
      dispatch(setStep(3));
    } else null;
  };

  const handlePetTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetType(e.target.value));
  };

  const handlePetNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetName(e.target.value));
  };

  const handleNextBtnOnclick = () => {
    petName === initialState.petName && petType === initialState.petType
      ? handleConfirm()
      : dispatch(setStep(3));
  };

  return (
    <Box height="100vh">
      <Container maxWidth="sm">
        <MainWrapper>
          <Grid container sx={{ bgcolor: 'secondary.light', p: 2 }}>
            <Grid item xs={6}>
              <Grid
                container
                justifyContent="center"
                direction="column"
                spacing={2}
              >
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
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <TextField
                        sx={{ width: 150, mb: 1 }}
                        size="small"
                        inputProps={{ maxLength: 4 }}
                        value={petType}
                        onChange={handlePetTypeInputChange}
                      />
                      <FormHelperText sx={{ m: 0 }}>
                        최대 4글자까지 입력 가능합니다 <br />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                )}
                <Grid item>
                  <FormControl sx={{ m: 1, mb: 5, minWidth: 120 }}>
                    <TextField
                      sx={{ width: 150, mb: 1 }}
                      size="small"
                      inputProps={{ maxLength: 6 }}
                      value={petName}
                      onChange={handlePetNameInputChange}
                    />
                    <FormHelperText sx={{ m: 0 }}>
                      동물, 또는 최애의 이름을 입력해주세요. <br />
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" marginBottom={1}>
                *미리보기*
              </Typography>
              <DefaultPoster styles={{ width: 55 }} />
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Text;
