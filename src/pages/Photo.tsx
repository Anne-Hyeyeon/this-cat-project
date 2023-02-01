import React, { useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import store, { setPhotoUrl } from '../store/store';
import Poster from '../components/Poster';
import { useDispatch } from 'react-redux/es/exports';

const Photo = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
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
        });
      },
    );
  };
  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {progress > 0 && <progress value={progress} max="100" />}
        {url && <img src={url} alt="uploaded" />}
      </div>
      <Link to="/text">
        <button>다음으로</button>
      </Link>
      <Poster />
    </>
  );
};

export default Photo;
