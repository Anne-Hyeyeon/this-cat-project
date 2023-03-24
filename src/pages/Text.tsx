import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import Poster from '../common/components/Poster';
import { setPetName, setPetType, setStep, State } from '../store/store';
import { initialState } from '../store/store';

const Text = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const [showInput, setShowInput] = useState(false);
  const { petName, petType } = state;

  const handlePetTypeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setShowInput(e.target.value === '직접 입력');
    dispatch(setPetType(e.target.value));
    if (e.target.value === '직접 입력') {
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
    <>
      <select
        value={showInput ? '직접 입력' : petType}
        onChange={handlePetTypeSelectChange}
      >
        <option value="고양이">고양이</option>
        <option value="강아지">강아지</option>
        <option value="이구아나">이구아나</option>
        <option value="직접 입력">직접 입력</option>
      </select>
      {showInput && (
        <input
          type="text"
          value={petType}
          onChange={handlePetTypeInputChange}
          maxLength={4}
        />
      )}
      <div>
        <input
          type="text"
          value={petName}
          onChange={handlePetNameInputChange}
          maxLength={6}
        />
      </div>
      <button
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        이전
      </button>
      <Container maxWidth="sm">
        <Poster styles={{ width: 100 }} />
      </Container>

      <button onClick={handleNextBtnOnclick}>다음</button>
    </>
  );
};

export default Text;
