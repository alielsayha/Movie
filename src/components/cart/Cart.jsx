import React from "react";
import "./cart.scss";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";
import noPoster from "../../assets/no-poster.png";
import Genres from "../genres/Genres";

const Cart = ({ item }) => {
  let imgTitle = item.poster_path
    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
    : noPoster;

  return (
    <div className="cart">
      <img src={imgTitle} />

      <CircleRating rating={item?.vote_average?.toFixed(1)} />

      <Genres data={item?.genre_ids?.slice(0, 2)} />

      <div className="body">
        <div className="title">
          {item?.name?.length > 15 ? item.name.slice(0, 14) + "..." : item.name}
        </div>
        <div className="date">
          {dayjs(item.release_date).format("MMM D ,YYYY")}
        </div>
      </div>
    </div>
  );
};

export default Cart;
