import React from "react";
import "./cast.scss";
import avatar from "../../../assets/avatar.png";
import LazyLoadImg from "../../../components/lazyLoadImg/Img";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const Cast = ({ data, loading, autoplay }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
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
              data?.map((item) => {
                let name = item.name.split(" ");

                let imgUrl = item.profile_path
                  ? url.profile + item.profile_path
                  : avatar;
                // console.log(item);
                return (
                  <SwiperSlide key={item.id}>
                    <div key={item.id} className="listItem">
                      <div className="profileImg">
                        <LazyLoadImg src={imgUrl} />
                      </div>
                      <div className="body">
                        <div className="name">{`${name[0].slice(0, 2)}.${
                          name[1]
                        }`}</div>
                        <div className="character">{item.character}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
