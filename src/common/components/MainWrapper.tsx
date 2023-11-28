import React from 'react';
import styled from 'styled-components';

const MainWrapperRoot = styled.div`
  border: 2px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px; 15px; 
`;

const MainWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <MainWrapperRoot>{props.children}</MainWrapperRoot>;
};

export default MainWrapper;
