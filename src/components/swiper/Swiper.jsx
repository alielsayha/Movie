import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";

const SwiperComponent = ({ data, endpoint, autoplay, title }) => {
  // console.log(genres);

  const navigate = useNavigate();
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      navigation={true}
      autoplay={{
        delay: autoplay,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {data &&
        data.map((item) => {
          // console.log(item);
          return (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                navigate(`/${item.media_type || endpoint}/${item.id}`);
              }}
            >
              <Cart item={item} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperComponent;
