import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteObject } from 'firebase/storage';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import { State, init, setShowFullPage } from '../store/store';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainWrapper from '../common/components/MainWrapper';
import { getPosterWidth } from '../common/function/getPosterWidth';
import { Box, Button, Typography } from '@mui/material';
import { toJpeg } from 'html-to-image';
import TitleTypography from '../common/components/TitleTypography';

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
                <Button variant="contained" fullWidth onClick={onButtonClick}>
                  이미지 다운로드
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    dispatch(init());
                  }}
                  sx={{ backgroundColor: 'secondary.dark' }}
                >
                  다시 하기
                </Button>
              </>
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
