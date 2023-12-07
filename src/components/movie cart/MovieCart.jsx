import React from "react";
import "./movieCart.scss";
import LazyLoadImg from "../lazyLoadImg/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import dayjs from "dayjs";
import noPoster from "../../assets/no-poster.png";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MovieCart = ({ item, mediaType }) => {
  // console.log(item);
  const { query } = useParams();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  return (
    <div
      className="movieCart"
      onClick={() => {
        navigate(
          `/${item?.media_type ? item?.media_type : mediaType}/${item?.id}`
        );
      }}
    >
      <div className="img">
        <LazyLoadImg
          src={`${
            item?.poster_path ? url.poster + item?.poster_path : noPoster
          }`}
        />
        <CircleRating rating={item?.vote_average?.toFixed(1)} />
        <Genres data={item?.genre_ids?.slice(0, 2)} />
      </div>
      <div className="body">
        <div className="title">
          {item?.title
            ? item?.title?.length > 15
              ? `${item?.title.slice(0, 14)}...`
              : item?.title
            : `Default name ${query}`}
        </div>
        <div className="date">
          {dayjs(item?.release_date).format("MMM D , YYYY")}
        </div>
      </div>
    </div>
  );
};

export default MovieCart;
