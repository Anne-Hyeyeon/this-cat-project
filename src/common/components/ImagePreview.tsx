import { Box } from '@mui/material';

interface Props {
  imageUrl?: string;
}

const ImagePreview: React.FC<Props> = ({ imageUrl }) => {
  return (
    <Box
      height={450}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid black"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
      }}
    >
      {!imageUrl && <Box color="black">미리 보기</Box>}
    </Box>
  );
};

export default ImagePreview;
