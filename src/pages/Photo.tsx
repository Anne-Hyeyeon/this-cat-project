import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Box, Button, Grid, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

import { storage } from '../firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { State, setFileRefPath, setPhotoUrl, setStep } from '../store/store';

import MainWrapper from '../common/components/MainWrapper';
import ImagePreview from '../common/components/ImagePreview';
import MainButton from '../common/components/MainButton';

import './Photo.scss';
import TitleTypography from '../common/components/TitleTypography';

const Photo = () => {
  const { fileRefPath } = useSelector((state: State) => state);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const fileRef = ref(storage, fileRefPath);

  const handleDeleteObject = async () => {
    if (fileRef) {
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error('File deletion error:', error);
      }
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    const resetFileInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    if (!selectedFile) {
      return;
    }

    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 4MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('파일 크기는 8MB 이하여야 합니다.');
      resetFileInput();
      return;
    }

    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      alert('jpg, jpeg, png, gif 파일만 업로드할 수 있습니다.');
      resetFileInput();
      return;
    }

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
          dispatch(setFileRefPath(fileRef.fullPath));
        });
      },
    );
  };

  const handleUploadBtnOnclick = () => {
    file ? handleUpload() : alert('파일을 등록해 주세요.');
  };

  const handleResetBtnOnclick = () => {
    setFile(null);
    setUrl('');
    setProgress(0);
  };

  return (
    <Box minHeight="70vh">
      <MainWrapper>
        <Grid container rowGap={1} textAlign="center">
          <Grid item xs={12}>
            <TitleTypography>사진 선택하기</TitleTypography>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} textAlign="center">
            <ImagePreview imageUrl={url} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            {url ? (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleResetBtnOnclick();
                    handleDeleteObject();
                  }}
                  sx={{ bgcolor: '#ddd', color: 'rgba(0,0,0,0.8)' }}
                >
                  이미지 다시 선택하기
                </Button>
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  rowGap={1}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    className="upload-btn"
                    onClick={handleUploadBtnOnclick}
                    sx={{
                      height: 40,
                      backgroundColor: 'secondary.dark',
                    }}
                  >
                    업로드하기
                  </Button>
                </Box>
                <Box
                  component="span"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <PetsIcon />
                  <Typography mt={1} ml={1} variant="body2" textAlign="left">
                    4MB 이하의 사진 업로드를 권장합니다. <br />
                    (첨부 가능 최대 용량 : 8MB)
                  </Typography>
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
            {!!url && <MainButton useIcon text="다음으로" />}
          </Grid>
        </Grid>
      </MainWrapper>
    </Box>
  );
};

export default Photo;
