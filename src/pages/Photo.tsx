import React, { useState } from 'react';
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable } from 'firebase/storage';

const Photo = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const fileRef = ref(storage, `photos/${file}`);
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
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
};

export default Photo;
