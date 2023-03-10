import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../store/store';
import { Container, Box } from '@mui/material';
import {
  objectCaseSelector,
  subjectCaseSelector,
} from '../function/endingSelector';

interface Styles {
  width?: number;
  height?: number;
}

interface Props {
  styles?: Styles;
}

const initialStyles: { initialWidth: number; marginTop: number } = {
  initialWidth: 210,
  marginTop: 10,
};

const { initialWidth, marginTop } = initialStyles;

const Wrapper = styled.div<Styles>`
  width: ${({ width }) => {
    return `${width ?? initialWidth}mm`;
  }};
  height: ${({ height }) => {
    return `${height ?? initialWidth * 1.414}mm`;
  }};
  border: 1px solid black;
  background-color: white;
  font-family: 'Black Han Sans', sans-serif;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div<Styles>`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  width: 100%;
  }};
  height: ${({ height }) => {
    return `${height ? height / 6 : 49.5}mm`;
  }};
  font-size: 90px;
  background-color: #C63F3B;
  color: #E5D45E;
  -webkit-text-stroke: 5px #1A1A1A;
  line-height:80px;
`;

const Photo = styled.div<Styles & { photoUrl?: string }>`
  background-image: ${({ photoUrl }) => {
    return `url(${photoUrl})`;
  }}};
  width: 100%;
  height: ${({ height }) => {
    return `${height ? height / 2 : 148}mm`;
  }};
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  margin-top: ${marginTop}px;
`;

const FirstLine = styled.div<Styles & { petName?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => {
    return `${height ? height / 9 : 33}mm`;
  }};
  margin-top: ${marginTop}px;
  font-size: ${({ petName }) => {
    if (petName?.length === 1) return '80px';
    if (petName?.length === 2) return '73px';
    if (petName?.length === 3) return '60px';
    return '60px';
  }};
  background-color: #cf423d;
  color: #1a1a1a;
  -webkit-text-stroke: 2px #fff;
`;

const SecondLine = styled.div<Styles>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => {
    return `${height ? height / 6.2 : 48}mm`;
  }};
  margin-top: ${marginTop}px;
  font-size: 60px;
  color: #1a1a1a;
  line-height: 70px;
  letter-spacing: 8px;
`;

const Poster: React.FC<Props> = (props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName } = state;
  return (
    <>
      <Wrapper {...props.styles}>
        <Header {...props.styles}>
          <div className="first-line">
            ??????! ??? {petType}
            {objectCaseSelector(petType)}
          </div>
          <div className="second-line" style={{ letterSpacing: 10 }}>
            ?????? ??? ?????????????
          </div>
        </Header>
        <Photo {...props.styles} photoUrl={photoUrl} />
        <FirstLine {...props.styles} petName={petName}>
          ????????? {petName}
          {subjectCaseSelector(petName)} ???????????????.
        </FirstLine>
        <SecondLine {...props.styles}>
          <div>???????????? {petType} ????????????,</div>
          <div>?????? ??????????????? ????????????.</div>
        </SecondLine>
      </Wrapper>
    </>
  );
};

export default Poster;
