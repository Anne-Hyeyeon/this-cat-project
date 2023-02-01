import { url } from 'inspector';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../store/store';

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
    return `${height ? height / 2 : 200}px`;
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

const SecondLine = styled.div``;

const Poster: React.FC<Props> = (props) => {
  const photoUrl = useSelector((state: State) => state.photoUrl);
  console.log(photoUrl);
  return (
    <>
      <Wrapper {...props.styles}>
        <Header>잠깐! 이 고양이를 보신 적 있습니까</Header>
        <Photo photoUrl={photoUrl} />
        <FirstLine>왜냐면 얘가 졸귀거든요.</FirstLine>
      </Wrapper>
    </>
  );
};

export default Poster;
