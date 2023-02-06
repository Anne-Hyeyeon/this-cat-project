import { url } from 'inspector';
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

const initialStyles = {
  initialWidth: 300,
};

const { initialWidth } = initialStyles;

const Wrapper = styled.div<Styles>`
  width: ${({ width }) => {
    return `${width ?? initialWidth}px`;
  }};
  height: ${({ height }) => {
    return `${height ?? 600}px`;
  }};
  border: 1px solid black;
`;

const Header = styled.div<Styles>`
  width: ${({ width }) => {
    return `${width ?? initialWidth}px`;
  }};
  height: ${({ height }) => {
    return `${height ? height / 3 : 100}px`;
  }}};
  border: 1px solid red;
`;

const Photo = styled.div<Styles & { photoUrl?: string }>`
  background-image: ${({ photoUrl }) => {
    return `url(${photoUrl})`;
  }}};
  width: ${({ width }) => {
    return `${width ?? initialWidth}px`;
  }};
  height: ${({ height }) => {
    return `${height ? height / 1 : 300}px`;
  }}};
  background-repeat: no-repeat;
  background-position: center;
`;

const FirstLine = styled.div<Styles>`
width: ${({ width }) => {
  return `${width ?? initialWidth}px`;
}};
  height: ${({ height }) => {
    return `${height ? height / 3 : 100}px`;
  }}};
  border: 1px solid blue;
`;

const SecondLine = styled.div<Styles>`
width: ${({ width }) => {
  return `${width ?? initialWidth}px`;
}};
    height: ${({ height }) => {
      return `${height ? height / 3 : 100}px`;
    }}};
    border: 1px solid orange;
`;

const Poster: React.FC<Props> = (props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName } = state;
  return (
    <>
      <Wrapper {...props.styles}>
        <Header>
          잠깐! 이 {petType}
          {objectCaseSelector(petType)} 보신 적 있습니까
        </Header>
        <Photo photoUrl={photoUrl} />
        <FirstLine>
          왜냐면 {petName}
          {subjectCaseSelector(petName)} 졸귀거든요.
        </FirstLine>
        <SecondLine>
          잃어버린 {petType} 아니고요, 그냥 여러분들한테 {petName}
          {objectCaseSelector(petName)} 보여드리고 싶어서 전단을 붙입니다.
        </SecondLine>
      </Wrapper>
    </>
  );
};

export default Poster;
