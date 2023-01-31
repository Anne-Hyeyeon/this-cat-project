import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import store, { setText } from '../store/store';

const Text = () => {
  const [value, setValue] = useState('고양이');
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setShowInput(e.target.value === '직접 입력');
    if (value !== '직접 입력') store.dispatch(setText(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    store.dispatch(setText(e.target.value));
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="고양이">고양이</option>
        <option value="강아지">강아지</option>
        <option value="이구아나">이구아나</option>
        <option value="직접 입력">직접 입력</option>
      </select>
      {showInput && (
        <input type="text" value={inputValue} onChange={handleInputChange} />
      )}
    </div>
  );
};

export default Text;
