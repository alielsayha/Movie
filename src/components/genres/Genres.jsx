import React from "react";
import "./genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data &&
        data.map((item) => {
          return (
            <div key={item} className="genre">
              {genres[item]?.name}
            </div>
          );
        })}
    </div>
  );
};

export default Genres;
