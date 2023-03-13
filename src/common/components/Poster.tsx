import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../store/store';
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
  padding: 20px;
`;

const Header = styled.div<Styles>`
  width: 100%;
  }};
  height: ${({ height }) => {
    return `${height ? height / 6 : 49.5}mm`;
  }};
  border: 1px solid red;
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
  border: 1px solid green;
  margin-top: ${marginTop}px;
`;

const FirstLine = styled.div<Styles>`
  width: 100%;
  height: ${({ height }) => {
    return `${height ? height / 9 : 33}mm`;
  }};
  border: 1px solid blue;
  margin-top: ${marginTop}px;
`;

const SecondLine = styled.div<Styles>`
  width: 100%;
  height: ${({ height }) => {
    return `${height ? height / 6.2 : 48}mm`;
  }};
  border: 1px solid orange;
  margin-top: ${marginTop}px;
`;

const Poster: React.FC<Props> = (props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName } = state;
  return (
    <>
      <Wrapper {...props.styles}>
        <Header {...props.styles}>
          잠깐! 이 {petType}
          {objectCaseSelector(petType)} 보신 적 있습니까
        </Header>
        <Photo {...props.styles} photoUrl={photoUrl} />
        <FirstLine {...props.styles}>
          왜냐면 {petName}
          {subjectCaseSelector(petName)} 졸귀거든요.
        </FirstLine>
        <SecondLine {...props.styles}>
          잃어버린 {petType} 아니고요, 그냥 여러분들한테 {petName}
          {objectCaseSelector(petName)} 보여드리고 싶어서 전단을 붙입니다.
        </SecondLine>
      </Wrapper>
    </>
  );
};

export default Poster;
