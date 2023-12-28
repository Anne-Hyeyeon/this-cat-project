import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toJpeg } from 'html-to-image';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Avatar, Box, Button } from '@mui/material';

import { State, init } from '../store/store';
import { getPosterWidth } from '../common/function/getPosterWidth';
import handleShareOnKakao from '../common/function/handleShareOnKakao';

import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainWrapper from '../common/components/MainWrapper';
import TitleTypography from '../common/components/TitleTypography';
import LoadingOverlay from '../common/components/LoadingOverlay';

import KaKaoShareIcon from '../assets/img/ShareButtonImages/kakaotalk.png';
import { deleteObject, ref as fireBaseRef } from 'firebase/storage';
import { storage } from '../firebase';

const Result = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const ref = useRef<HTMLBRElement>(null);
  const [posterWidth, setPosterWidth] = useState(getPosterWidth(80, 120));
  const [isGenerating, setIsGenerating] = useState(false);

  const { fileRefPath, posterType, showFullPage } = state;
  const fileRef = fireBaseRef(storage, fileRefPath);

  const URL_TO_COPY = 'https://this-cat-project.vercel.app/';

  // 페이지 언로드 시, 로컬 스토리지에서 'showFullPage' 항목 제거
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('showFullPage');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // '다시 하기' 클릭 시 파일 삭제
  const handleBeforeUnload = async () => {
    if (fileRef) {
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error('File deletion error:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      handleBeforeUnload();
    };
  }, []);

  // 브라우저 창 크기 조정 시, 포스터의 너비 업데이트
  useEffect(() => {
    const handleResize = () => {
      setPosterWidth(getPosterWidth(80, 120));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setIsGenerating(true);

    const actualHeight = ref.current.offsetHeight;
    const actualWidth = ref.current.offsetWidth;

    toJpeg(ref.current, {
      width: actualWidth,
      height: actualHeight,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'this-cat';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, [ref]);

  const displayPreviewPoster = () => {
    if (posterType === 'emphasized')
      return <EmphasizedPoster preview styles={{ width: posterWidth }} />;

    if (posterType === 'simple')
      return <SimplePoster preview styles={{ width: posterWidth }} />;
  };

  const displayOriginalPoster = () => {
    if (posterType === 'emphasized')
      return <EmphasizedPoster styles={{ width: posterWidth }} />;

    if (posterType === 'simple')
      return <SimplePoster styles={{ width: posterWidth }} />;
  };

  const handleUrlClick = () => {
    alert('URL이 복사되었습니다 😽');
  };

  return (
    <Box>
      <MainWrapper>
        <LoadingOverlay isGenerating={isGenerating} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rowGap={3}
        >
          <TitleTypography> 🐱 결과 보기 🐱 </TitleTypography>
          {/* {showFullPage ? ( */}
          <>
            <Box
              ref={ref}
              className="poster-area"
              onClick={onButtonClick}
              sx={{ cursor: 'pointer' }}
            >
              {displayOriginalPoster()}
            </Box>
            <Box width="100%">
              <Button
                onClick={onButtonClick}
                variant="contained"
                fullWidth
                sx={{
                  fontSize: 25,
                  height: 50,
                  backgroundColor: 'secondary.dark',
                  marginBottom: 1,
                }}
              >
                🐈 이미지 다운로드 🐈
              </Button>
              <Button
                onClick={() => {
                  dispatch(init());
                }}
                variant="contained"
                fullWidth
                sx={{
                  fontSize: 25,
                  height: 50,
                  backgroundColor: '#989898',
                }}
              >
                다시 하기
              </Button>
            </Box>
            <TitleTypography>
              친구랑 같이 하기 (This Cat 페이지 공유하기) 🔽
            </TitleTypography>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Button onClick={handleShareOnKakao}>
                <Avatar src={KaKaoShareIcon} />
              </Button>
              <Button onClick={handleUrlClick}>
                <CopyToClipboard text={URL_TO_COPY}>
                  <Avatar alt="URL" sx={{ bgcolor: '#427D9D' }}>
                    URL
                  </Avatar>
                </CopyToClipboard>
              </Button>
            </Box>
          </>
          {/* : (
            <>{displayPreviewPoster()}</>
          )} */}
        </Box>
      </MainWrapper>
    </Box>
  );
};

export default Result;
