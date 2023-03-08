import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import Poster from '../common/components/Poster';
import { setPetName, setPetType, setStep, State } from '../store/store';

const Text = () => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const state = useSelector((state: State) => state);
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

  const handlePetTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetType(e.target.value));
  };

  const handlePetNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPetName(e.target.value));
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
        />
      )}
      <div>
        <input
          type="text"
          value={petName}
          onChange={handlePetNameInputChange}
        />
      </div>
      <Poster />
      <button
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        이전
      </button>
      <button
        onClick={() => {
          dispatch(setStep(3));
        }}
      >
        다음
      </button>
    </>
  );
};

export default Text;
