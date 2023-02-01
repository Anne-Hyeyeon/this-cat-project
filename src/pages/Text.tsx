import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import store, { setPetName, setPetType } from '../store/store';

const Text = () => {
  const [value, setValue] = useState('고양이');
  const [petTypeinputValue, setPetTypeInputValue] = useState('');
  const [petNameinputValue, setPetNameInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setShowInput(e.target.value === '직접 입력');
    if (e.target.value !== '직접 입력') {
      store.dispatch(setPetType(e.target.value));
    }
  };

  const handlePetTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetTypeInputValue(e.target.value);
    dispatch(setPetType(e.target.value));
  };

  const handlePetNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetNameInputValue(e.target.value);
    dispatch(setPetName(e.target.value));
  };

  return (
    <>
      <select value={value} onChange={handleChange}>
        <option value="고양이">고양이</option>
        <option value="강아지">강아지</option>
        <option value="이구아나">이구아나</option>
        <option value="직접 입력">직접 입력</option>
      </select>
      {showInput && (
        <input
          type="text"
          value={petTypeinputValue}
          onChange={handlePetTypeInputChange}
        />
      )}
      <div>
        <input
          type="text"
          value={petNameinputValue}
          onChange={handlePetNameInputChange}
        />
      </div>
    </>
  );
};

export default Text;
