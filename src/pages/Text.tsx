import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import Poster from '../common/components/Poster';
import { setPetName, setPetType, setStep, State } from '../store/store';
import { initialState } from '../store/store';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

const Text = () => {
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
    <Container maxWidth="sm">
      <Select
        value={showInput ? '직접 입력' : petType}
        onChange={handlePetTypeSelectChange}
        size="small"
      >
        <MenuItem value="고양이">고양이</MenuItem>
        <MenuItem value="강아지">강아지</MenuItem>
        <MenuItem value="이구아나">이구아나</MenuItem>
        <MenuItem value="직접 입력">직접 입력</MenuItem>
      </Select>
      {showInput && (
        <Box display="flex" flexDirection="row" alignItems="center">
          <TextField
            sx={{ width: 150 }}
            size="small"
            inputProps={{ maxLength: 4 }}
            variant="filled"
            value={petType}
            onChange={handlePetTypeInputChange}
          />
          <Typography
            variant="body2"
            align="center"
            style={{ marginLeft: '8px' }}
          >
            최대 4글자까지 입력 가능합니다.
          </Typography>
        </Box>
      )}
      <Box>
        <TextField
          sx={{ width: 150 }}
          size="small"
          inputProps={{ maxLength: 6 }}
          variant="filled"
          value={petName}
          onChange={handlePetNameInputChange}
        />
      </Box>
      <Box sx={{ alignItems: 'center' }}>
        <Poster styles={{ width: 100 }} />
      </Box>
      <Button
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        이전
      </Button>

      <Button onClick={handleNextBtnOnclick}>다음</Button>
    </Container>
  );
};

export default Text;
