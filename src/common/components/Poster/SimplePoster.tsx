import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../../store/store';
import {
  objectCaseSelector,
  subjectCaseSelector,
} from '../../function/endingSelector';
import ScaleWrapper from './common/ScaleWrapper';
import { initialWidth, marginTop } from './common/initialStyles';

interface Styles {
  width?: number;
  height?: number;
}

interface Props {
  styles?: Styles;
}

interface Header {
  petType: string;
  headerColor: string;
}

interface FirstLine {
  petName: string;
  firstLineColor: string;
}

interface SecondLine {
  petType: string;
  secondLineColor: string;
}

const Wrapper = styled.div<{ bgColor: string }>`
  width: ${initialWidth}mm;
  height: ${initialWidth * 1.414}mm;
  border: 1px solid black;
  background-color: ${(props) => props.bgColor};
  padding: 50px 0px;
  font-family: 'Jua', sans-serif;
  box-sizing: border-box;
`;

const Header = styled.div<Header>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  font-size: ${({ petType }) => {
    if (petType.length <= 3) {
      return '90px';
    } else if (petType.length === 4) {
      return '80px';
    }
    return '80px';
  }};
  line-height: 80px;
  color: ${(props) => props.headerColor};
  padding-top: 10px;
`;

const Photo = styled.div<{ photoUrl?: string }>`
  background-image: url(${(props) => props.photoUrl});
  width: 100%;
  height: 148mm;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: ${marginTop}px;
`;

const FirstLine = styled.div<FirstLine>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${marginTop}px;
  font-size: ${({ petName }) => {
    if (petName.length <= 4) {
      return '65px';
    } else if (petName.length >= 5) {
      return '55px';
    }
    return '65px';
  }};
  color: ${(props) => props.firstLineColor};
`;

const SecondLine = styled.div<SecondLine>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100;
  margin-top: ${marginTop}px;
  color: ${(props) => props.secondLineColor};
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

const SimplePoster = (props: Props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName, colors } = state;
  const { simplePosterColors } = colors;
  const { bgColor, headerColor, firstLineColor, secondLineColor } =
    simplePosterColors;
  return (
    <ScaleWrapper styles={props.styles}>
      <Wrapper bgColor={bgColor}>
        <Header {...props.styles} petType={petType} headerColor={headerColor}>
          <div className="first-line">
            잠깐! 이 {petType}
            {objectCaseSelector(petType)}
          </div>
          <div className="second-line">보신 적 있습니까?</div>
        </Header>
        <Photo {...props.styles} photoUrl={photoUrl} />
        <FirstLine
          {...props.styles}
          petName={petName}
          firstLineColor={firstLineColor}
        >
          왜냐면 {petName}
          {subjectCaseSelector(petName)} 졸귀거든요.
        </FirstLine>
        <SecondLine
          {...props.styles}
          petType={petType}
          secondLineColor={secondLineColor}
        >
          <div>잃어버린 {petType} 아니고요,</div>
          <div>그냥 보여드리고 싶어서요.</div>
        </SecondLine>
      </Wrapper>
    </ScaleWrapper>
  );
};

export default SimplePoster;
