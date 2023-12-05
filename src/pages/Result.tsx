import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteObject } from 'firebase/storage';
import EmphasizedPoster from '../common/components/Poster/EmphasizedPoster';
import { State, init } from '../store/store';
import SimplePoster from '../common/components/Poster/SimplePoster';
import MainWrapper from '../common/components/MainWrapper';
import { getPosterWidth } from '../common/function/getPosterWidth';
import { Box, Button } from '@mui/material';
import { toJpeg } from 'html-to-image';

const Result = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const ref = useRef<HTMLBRElement>(null);

  const { fileRef, posterType } = state;

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    const actualHeight = ref.current.offsetHeight;

    toJpeg(ref.current, {
      width: 795,
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

  const onShowFullPageClick = useCallback(() => {
    window.open('https://link.coupang.com/a/OqysD', '_blank');
    sessionStorage.setItem('showFullPage', 'true');
    setShowFullPage(true);
  }, []);

  const storedValue = sessionStorage.getItem('showFullPage');
  const initialShowFullPage = storedValue === 'true';
  const [showFullPage, setShowFullPage] = useState(initialShowFullPage);
  const [posterWidth, setPosterWidth] = useState(getPosterWidth(60, 100));

  const displayPreviewPoster = () => {
    if (posterType === 'emphasized')
      return <EmphasizedPoster preview styles={{ width: posterWidth }} />;
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
      setPosterWidth(getPosterWidth(100, 100));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {!showFullPage ? (
        <>
          <Box ref={ref}>{displayPreviewPoster()}</Box>
          <>
            <button onClick={onButtonClick}>Click me</button>
            <button
              onClick={() => {
                dispatch(init());
              }}
            >
              다시 하기
            </button>
          </>
        </>
      ) : (
        <Box height="100vh">
          <MainWrapper>
            <Box>
              <Box
                style={{
                  position: 'relative',
                }}
              >
                <Box>{displayPreviewPoster()}</Box>
              </Box>
              <Button onClick={onShowFullPageClick}>
                쿠팡 보고 포스터 결과물 보기
              </Button>
            </Box>
          </MainWrapper>
        </Box>
      )}
    </>
  );
};

export default Result;
