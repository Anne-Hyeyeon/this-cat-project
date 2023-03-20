import { Container } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const MainWrapperRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 3px solid rgb(0, 0, 0, 0.8);
  border-radius: 15px;
  background-color: #fff;
  padding: 30px; 15px; 
`;

const MainWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <MainWrapperRoot>{props.children}</MainWrapperRoot>;
};

export default MainWrapper;
