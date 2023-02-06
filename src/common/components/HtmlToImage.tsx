import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import Poster from './Poster';

export const HtmlToImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      width: 300,
      height: 600,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <>
      <div ref={ref}>
        <Poster />
      </div>
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
};
