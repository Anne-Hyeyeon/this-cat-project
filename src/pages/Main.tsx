import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <div>이 고양이를 보신 적 있나요?</div>
      <div>당신만의 고양이 포스터를 만들어보세요.</div>
      <div>
        다른 애완동물이나 최애 연예인, 친구나 물건을 자랑하는 것도 가능합니다.
      </div>
      <Link to="/photo">
        <button>시작하기</button>
      </Link>
    </>
  );
};

export default Main;
