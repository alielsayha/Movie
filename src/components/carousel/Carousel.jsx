import React from "react";
import "./carousel.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import SwiperComponent from "../swiper/Swiper";

const Carousel = ({ data, loading, endpoint, autoplay, title }) => {
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {!loading ? (
          <div className="carouselItems">
            {title && <div className="carouselTitle">{title}</div>}
            <SwiperComponent
              data={data?.results}
              endpoint={endpoint}
              autoplay={autoplay}
              title={title}
            />
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
