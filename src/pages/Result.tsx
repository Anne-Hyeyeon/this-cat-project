import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteObject } from 'firebase/storage';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import { State, init } from '../store/store';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainWrapper from '../common/components/MainWrapper';
import { getPosterWidth } from '../common/function/getPosterWidth';
import { Avatar, Box, Button } from '@mui/material';
import { toJpeg } from 'html-to-image';
import TitleTypography from '../common/components/TitleTypography';
import ShareOnKakao from '../common/function/ShareOnKakao';
import KaKaoShareIcon from '../assets/img/ShareButtonImages/kakaotalk.png';
import BodyTypography from '../common/components/BodyTypoGraphy';

const Result = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const ref = useRef<HTMLBRElement>(null);

  const { fileRef, posterType, showFullPage } = state;

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
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
      });
  }, [ref]);

  const [posterWidth, setPosterWidth] = useState(getPosterWidth(80, 120));

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

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('showFullPage');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (fileRef) {
        deleteObject(fileRef).catch((error) => {
          console.error(error);
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [fileRef]);

  useEffect(() => {
    const handleResize = () => {
      setPosterWidth(getPosterWidth(80, 120));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box height="100vh">
      <MainWrapper>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          rowGap={2}
        >
          <TitleTypography> 🐱 결과 보기 🐱 </TitleTypography>
          {showFullPage ? (
            <>
              <Box ref={ref} className="poster-area">
                {displayOriginalPoster()}
              </Box>
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onButtonClick}
                  sx={{
                    fontSize: 25,
                    height: 50,
                    backgroundColor: 'secondary.dark',
                  }}
                >
                  🐈 이미지 다운로드 🐈
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    dispatch(init());
                  }}
                  sx={{
                    fontSize: 25,
                    height: 50,
                    backgroundColor: 'secondary.dark',
                  }}
                >
                  다시 하기
                </Button>
              </>
              <BodyTypography>친구랑 같이 하기 (공유하기) 🔽</BodyTypography>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Button onClick={ShareOnKakao}>
                  <Avatar src={KaKaoShareIcon} />
                </Button>
                <Button>
                  <Avatar alt="URL" sx={{ bgcolor: '#427D9D' }}>
                    URL
                  </Avatar>
                </Button>
              </Box>
            </>
          ) : (
            <>{displayPreviewPoster()}</>
          )}
        </Box>
      </MainWrapper>
    </Box>
  );
};

export default Result;
