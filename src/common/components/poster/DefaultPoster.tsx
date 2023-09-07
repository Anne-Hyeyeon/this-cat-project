import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../../store/store';
import {
  objectCaseSelector,
  subjectCaseSelector,
} from '../../function/endingSelector';

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

const Wrapper = styled.div`
  width: ${initialWidth}mm;
  height: ${initialWidth * 1.414}mm;
  border: 1px solid black;
  background-color: white;
  font-family: 'Black Han Sans', sans-serif;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div<{ petType: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 49.5mm;
  font-size: ${({ petType }) => {
    if (petType.length <= 3) {
      return '100px';
    } else if (petType.length === 4) {
      return '90px';
    }
    return '90px';
  }};
  line-height: 80px;
  background-color: #c63f3b;
  color: #e5d45e;
  -webkit-text-stroke: 2px #1a1a1a;
  padding-top: 10px;
`;

const Photo = styled.div<{ photoUrl?: string }>`
  background-image: url(${(props) => props.photoUrl});
  width: 100%;
  height: 148mm;
  border: 1px solid black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: ${marginTop}px;
`;

const FirstLine = styled.div<{ petName: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33mm;
  margin-top: ${marginTop}px;
  font-size: ${({ petName }) => {
    if (petName.length <= 4) {
      return '65px';
    } else if (petName.length >= 5) {
      return '55px';
    }
    return '65px';
  }};
  background-color: #cf423d;
  color: #1a1a1a;
  -webkit-text-stroke: 1px #fff;
`;

const SecondLine = styled.div<{ petType: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100;
  height: 48mm;
  margin-top: ${marginTop}px;
  color: #1a1a1a;
  font-size: ${({ petType }) => {
    if (petType.length <= 3) {
      return '70px';
    } else if (petType.length === 4) {
      return '65px';
    }
    return '90px';
  }};
  line-height: 70px;
`;

const ScaleWrapper = styled.div<Styles>`
  transform: ${({ width }) =>
    width ? `scale(${width / initialWidth})` : 'none'};
  transform-origin: top left;
  width: ${({ width }) => (width ? `${width}mm` : `${initialWidth}mm`)};
  height: ${({ width }) =>
    width ? `${width * 1.414}mm` : `${initialWidth * 1.414}mm`};
`;

const DefaultPoster: React.FC<Props> = (props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName } = state;

  return (
    <ScaleWrapper {...props.styles}>
      <Wrapper>
        <Header {...props.styles} petType={petType}>
          <div className="first-line">
            잠깐! 이 {petType}
            {objectCaseSelector(petType)}
          </div>
          <div className="second-line">보신 적 있습니까?</div>
        </Header>
        <Photo {...props.styles} photoUrl={photoUrl} />
        <FirstLine {...props.styles} petName={petName}>
          왜냐면 {petName}
          {subjectCaseSelector(petName)} 졸귀거든요.
        </FirstLine>
        <SecondLine {...props.styles} petType={petType}>
          <div>잃어버린 {petType} 아니고요,</div>
          <div>그냥 보여드리고 싶어서요.</div>
        </SecondLine>
      </Wrapper>
    </ScaleWrapper>
  );
};

export default DefaultPoster;
