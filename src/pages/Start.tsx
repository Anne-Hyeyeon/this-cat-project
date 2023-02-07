import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../store/store';

const Start = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>이 고양이를 보신 적 있나요?</div>
      <div>당신만의 고양이 포스터를 만들어보세요.</div>
      <div>
        다른 애완동물이나 최애 연예인, 친구나 물건을 자랑하는 것도 가능합니다.
      </div>
      <button
        onClick={() => {
          dispatch(setStep(1));
        }}
      >
        시작하기
      </button>
    </>
  );
};

export default Start;
