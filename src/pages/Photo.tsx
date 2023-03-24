import React, { useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { setFileRef, setPhotoUrl, setStep } from '../store/store';
import { useDispatch } from 'react-redux/es/exports';
import { Box, Button, Grid, Typography } from '@mui/material';
import MainWrapper from '../common/components/MainWrapper';
import ImagePreview from '../common/components/ImagePreview';
import PetsIcon from '@mui/icons-material/Pets';
import MainButton from '../common/components/MainButton';
import './Photo.scss';

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
    <Box height="100vh">
      <MainWrapper>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <Box
              component="span"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <PetsIcon />
              <Typography ml={1} variant="body2">
                2MB 이하의 사진 업로드를 권장합니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <ImagePreview imageUrl={url} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            {url ? (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleResetBtnOnclick}
                  sx={{ bgcolor: '#ddd', color: 'rgba(0,0,0,0.8)' }}
                >
                  이미지 다시 선택하기
                </Button>
              </>
            ) : (
              <>
                <Box display="flex" justifyContent="space-between">
                  <input type="file" onChange={handleFileChange} />
                  <button
                    className="upload-btn"
                    onClick={handleUploadBtnOnclick}
                  >
                    Upload
                  </button>
                </Box>
                <Box mt={1}>
                  {progress > 0 && (
                    <progress
                      className="progressbar"
                      value={progress}
                      max="100"
                    />
                  )}
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {!!url && <MainButton text="다음으로" />}
          </Grid>
        </Grid>
      </MainWrapper>
    </Box>
  );
};

export default Photo;
