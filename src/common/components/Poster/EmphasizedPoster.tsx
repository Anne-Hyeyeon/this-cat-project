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
  preview?: boolean;
  styles?: Styles;
}

interface Wrapper {
  bgColor: string;
  preview?: boolean;
}

interface Header {
  petType: string;
  accentColor: string;
  headerColor: string;
}

interface FirstLine {
  petName: string;
  petDesc: string;
  accentColor: string;
  firstLineColor: string;
}

interface SecondLine {
  petType: string;
  secondLineColor: string;
}

const Wrapper = styled.div<Wrapper>`
  position: relative;
  width: ${initialWidth}mm;
  height: ${initialWidth * 1.414}mm;
  border: 1px solid black;
  background-color: ${(props) => props.bgColor};
  font-family: 'Black Han Sans', sans-serif;
  padding: 20px;
  box-sizing: border-box;
  opacity: ${(props) => (props.preview ? 0.5 : 1)};
`;

const PreviewText = styled.div<{ preview?: boolean }>`
  height: 95%;
  font-family: 'Black Han Sans', sans-serif;
  width: 95%;
  line-height: 1000px;
  position: absolute;
  color: white;
  font-size: 100px;
  text-align: center;
  background-color: black;
  padding: 30px;
  opacity: 0.8;
  z-index: 99; /* 다른 컨텐츠 위에 레이어를 배치하기 위한 z-index 설정 */
  display: ${(props) =>
    props.preview ? 'block' : 'none'}; /* 미리 보기 모드일 때만 표시 */
`;

const Header = styled.div<Header>`
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
  background-color: ${(props) => props.accentColor};
  color: ${(props) => props.headerColor};
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

const FirstLine = styled.div<FirstLine>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33mm;
  margin-top: ${marginTop}px;
  font-size: ${({ petName, petDesc }) => {
    const totalLength = petName.length + petDesc.length;

    if (totalLength === 10) {
      return '49px';
    } else if (totalLength >= 6 && totalLength <= 9) {
      return '55px';
    } else if (totalLength === 4 || totalLength === 5) {
      return '65px';
    } else if (totalLength >= 1 && totalLength <= 3) {
      return '70px';
    }
    return '55px'; // 기본값
  }};
  background-color: ${(props) => props.accentColor};
  color: ${(props) => props.firstLineColor};
  -webkit-text-stroke: 0.5px #fff;
`;

const SecondLine = styled.div<SecondLine>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100;
  height: 48mm;
  margin-top: ${marginTop}px;
  color: ${(props) => props.secondLineColor};
  font-size: ${({ petType }) => {
    if (petType.length <= 3) {
      return '70px';
    } else if (petType.length === 4) {
      return '65px';
    }
    return '65px';
  }};
  line-height: 70px;
`;

const EmphasizedPoster: React.FC<Props> = (props) => {
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName, petDesc, colors } = state;
  const { emphasizedPosterColors } = colors;
  const { bgColor, accentColor, headerColor, firstLineColor, secondLineColor } =
    emphasizedPosterColors;
  const { preview } = props;
  return (
    <ScaleWrapper styles={props.styles}>
      <Wrapper preview={preview} bgColor={bgColor}>
        <PreviewText preview={preview}>미리 보기 😻</PreviewText>
        <Header
          {...props.styles}
          petType={petType}
          accentColor={accentColor}
          headerColor={headerColor}
        >
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
          petDesc={petDesc}
          accentColor={accentColor}
          firstLineColor={firstLineColor}
        >
          왜냐면 {petName}
          {subjectCaseSelector(petName)} {petDesc}거든요.
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

export default EmphasizedPoster;
