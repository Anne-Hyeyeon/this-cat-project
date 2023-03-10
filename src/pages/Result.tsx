import { toPng } from 'html-to-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../firebase';
import { deleteObject } from 'firebase/storage';
import Poster from '../common/components/Poster';
import { State, init } from '../store/store';

const Result = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const ref = useRef<HTMLDivElement>(null);
  const { fileRef } = state;

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      width: 793.7,
      height: 1122.5,
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

  if (!showFullPage) {
    return (
      <div style={{ height: '300px', width: '150px', margin: 'auto' }}>
        <div
          style={{
            height: '300px',
            width: '300px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Poster />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          ></div>
        </div>
        <button onClick={onShowFullPageClick}>
          ?????? ?????? ????????? ????????? ??????
        </button>
      </div>
    );
  }

  return (
    <>
      <div ref={ref}>
        <Poster />
      </div>
      <button onClick={onButtonClick}>Click me</button>
      <button
        onClick={() => {
          dispatch(init());
        }}
      >
        ?????? ??????
      </button>
    </>
  );
};

export default Result;
