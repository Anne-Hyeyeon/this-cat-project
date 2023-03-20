import React from 'react';
import styled from 'styled-components';

const MainWrapperRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(0, 0, 0, 0.6);
  border-radius: 15px;
  background-color: #fff;
  padding: 30px; 15px; 
`;

const MainWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <MainWrapperRoot>{props.children}</MainWrapperRoot>;
};

export default MainWrapper;
