import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar Tv Show" : "Similar Movies Show";
  return (
    <Carousel
      data={data}
      loading={loading}
      endpoint={mediaType}
      title={title}
      autoplay={3000}
    />
  );
};

export default Similar;
