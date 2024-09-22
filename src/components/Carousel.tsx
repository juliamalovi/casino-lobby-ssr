import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';

const images = [
  { image: 'https://advanced-television.com/wp-content/uploads/2024/01/online-casino.png', title: "Win every day!" },
  { image: 'https://www.habwin.com/uploads/old/noticias/3674/imagenes/Cu%C3%A1l%20es%20el%20juego%20m%C3%A1s%20dif%C3%ADcil%20del%20casino.jpg', title: "Good luck!" },
  { image: 'https://media.nationthailand.com/uploads/images/md/2024/04/mDilaRj5PPRUySEvHDHb.webp', title: "Play now!" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: '100%', height: '300px', marginBottom: '20px', overflow: 'hidden' }}>
      <Slider {...settings}>
        {images.map(({ image, title }, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100%', height: '300px' }}>
            <img
              src={image}
              alt={`casino-lobby-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              <Typography variant="h5">{title}</Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;