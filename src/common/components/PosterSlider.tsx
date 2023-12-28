import Slider from 'react-slick';
import exampleByeol from '../../assets/img/Mypets/byeol.jpeg';
import exampleHusband from '../../assets/img/Mypets/husband.jpeg';
import exampleLatte from '../../assets/img/Mypets/latte.jpeg';
import exampleMilk from '../../assets/img/Mypets/milk.jpeg';
import exampleMong from '../../assets/img/Mypets/mong.jpeg';
import examplePhantom from '../../assets/img/Mypets/phantom.jpeg';
import exmampleSiru from '../../assets/img/Mypets/siru.jpeg';
import './PosterSlider.scss';
import { Box } from '@mui/material';

const PosterSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box className="poster-slider">
      <Slider {...settings}>
        <Box className="image-container">
          <img src={exampleByeol} alt="Byeol" />
        </Box>
        <Box className="image-container">
          <img src={exampleHusband} alt="Husband" />
        </Box>
        <Box className="image-container">
          <img src={exampleLatte} alt="Latte" />
        </Box>
        <Box className="image-container">
          <img src={exampleMilk} alt="Milk" />
        </Box>
        <Box className="image-container">
          <img src={exampleMong} alt="Mong" />
        </Box>
        <Box className="image-container">
          <img src={examplePhantom} alt="Phantom" />
        </Box>
        <Box className="image-container">
          <img src={exmampleSiru} alt="Siru" />
        </Box>
      </Slider>
    </Box>
  );
};

export default PosterSlider;
