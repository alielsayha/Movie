import React, { useEffect, useState } from "react";
import "./heroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Img from "./../../../components/lazyLoadImg/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, lading } = useFetch("/movie/top_rated");

  useEffect(() => {
    const bg = `https://image.tmdb.org/t/p/original${
      data && data.results[Math.floor(Math.random() * 20)].backdrop_path
    }`;
    setBackground(bg);
  }, [data]);

  const searchQueryHandel = (e) => {
    if (e.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!lading ? (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      ) : (
        "Loading...."
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies , Tv Shows and people to discover. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movies or Tv Show....."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandel}
            />
            <button onClick={()=> navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
