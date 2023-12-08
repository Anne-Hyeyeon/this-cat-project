import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { State, setShowFullPage } from '../../../store/store';
import {
  objectCaseSelector,
  subjectCaseSelector,
} from '../../function/endingSelector';
import ScaleWrapper from './common/ScaleWrapper';
import { initialWidth, marginTop } from './common/initialStyles';
import { Box, Button, Typography } from '@mui/material';

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
`;

const PreviewWrapper = styled.div<{ preview?: boolean }>`
  width: 95%;
  height: 95%;
  position: absolute;
  display: ${(props) =>
    props.preview ? 'flex' : 'none'}; /* 미리 보기 모드일 때만 표시 */
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const PreviewArea = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  background-color: white;
  text-color: black;
  z-index: 2;
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
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const { photoUrl, petType, petName, petDesc, colors } = state;
  const { emphasizedPosterColors } = colors;
  const { bgColor, accentColor, headerColor, firstLineColor, secondLineColor } =
    emphasizedPosterColors;
  const { preview, styles } = props;

  const handlePreviewClick = () => {
    window.open('https://link.coupang.com/a/OqysD', '_blank');
    sessionStorage.setItem('showFullPage', 'true');
    dispatch(setShowFullPage(true));
  };

  return (
    <ScaleWrapper styles={styles}>
      <Wrapper preview={preview} bgColor={bgColor}>
        <Box onClick={handlePreviewClick}>
          <PreviewWrapper preview={preview}>
            <PreviewArea>
              <Typography variant="h3" color="#CC3D44" fontWeight="700" mb={2}>
                쿠팡 방문하고 최종 결과물 보기
              </Typography>
              <Button
                variant="contained"
                color="info"
                onClick={handlePreviewClick}
                fullWidth
                sx={{ height: '20%', fontSize: 40 }}
              >
                쿠팡 방문하기
              </Button>
              <Typography
                variant="h4"
                color="secondary.dark"
                fontWeight="700"
                mt={2}
              >
                🙇‍♀️ 개발자에게 커피를 사 주셔서 감사합니다!
              </Typography>
              <Typography
                variant="h5"
                color="secondary.dark"
                fontWeight="700"
                mt={2}
              >
                ☕ 여러분이 사 주신 커피를 먹고 힘내서
              </Typography>
              <Typography
                variant="h5"
                color="secondary.dark"
                fontWeight="700"
                mt={2}
              >
                더 재밌는 프로그램을 많이 만들겠습니다!🏃‍♀️으랏차차!
              </Typography>
              <Typography variant="h5" color="secondary.dark" mt={3}>
                방문을 원치 않으실 경우, '뒤로 가기'를 눌러주세요.
              </Typography>
            </PreviewArea>
          </PreviewWrapper>
        </Box>
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
