import React, { useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import store, { setFileRef, setPhotoUrl, setStep } from '../store/store';
import Poster from '../common/components/Poster';
import { useDispatch } from 'react-redux/es/exports';

const Photo = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setUrl('');
  };

  const handleUpload = () => {
    const randomFileName = Math.random().toString(36).substring(2, 15);
    const fileRef = ref(storage, `photos/${randomFileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file as any);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(ref(storage, `photos/${randomFileName}`)).then((url) => {
          setUrl(url);
          dispatch(setPhotoUrl(url));
          dispatch(setFileRef(fileRef));
        });
      },
    );
  };

  const handleUploadBtnOnclick = () => {
    file ? handleUpload() : alert('파일을 등록해 주세요.');
  };

  const handleNextBtnOnclick = () => {
    url ? dispatch(setStep(2)) : alert('이미지를 등록해 주세요.');
  };

  const handleResetBtnOnclick = () => {
    setFile(null);
    setUrl('');
    setProgress(0);
  };

  return (
    <>
      <div>
        {url ? (
          <button onClick={handleResetBtnOnclick}>이미지 다시 선택하기</button>
        ) : (
          <>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadBtnOnclick}>Upload</button>
            {progress > 0 && <progress value={progress} max="100" />}
          </>
        )}
        {url && <img src={url} alt="uploaded" />}
      </div>
      <button
        onClick={() => {
          dispatch(setStep(0));
        }}
      >
        이전
      </button>
      <button onClick={handleNextBtnOnclick}>다음</button>
      <Poster />
    </>
  );
};

export default Photo;
