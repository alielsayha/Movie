import React, { useState } from "react";
import "./videosSection.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import LazyLoadImg from "../../../components/lazyLoadImg/Img";
import { PlayIcon } from "../PlayBtn";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const VideosSection = ({ data, loading, autoplay }) => {
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
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
              modules={[Navigation]}
              className="mySwiper"
            >
              {data &&
                data.map((video) => {
                  return (
                    <SwiperSlide key={video.key}>
                      <div
                        className="videoThumbnail"
                        onClick={() => {
                          setShow(true);
                          setVideoKey(video.key);
                        }}
                      >
                        <LazyLoadImg
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        />
                        <PlayIcon />
                      </div>
                      <div className="videoTitle">{video.name}</div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
        <VideoPopup
          show={show}
          setShow={setShow}
          videoKey={videoKey}
          setVideoKey={setVideoKey}
        />
      </ContentWrapper>
    </div>
  );
};

export default VideosSection;
