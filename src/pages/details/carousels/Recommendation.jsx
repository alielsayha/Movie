import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  //   console.log(data?.results);
  return (
    <Carousel
      data={data}
      loading={loading}
      endpoint={mediaType}
      title={"Recommendation"}
      autoplay={3000}
    />
  );
};

export default Recommendation;
