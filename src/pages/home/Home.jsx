import React, { useEffect } from "react";
import "./home.scss";
import HeroBanner from "./herobanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRate from "./topRate/TopRate";


const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRate/>
      {/* <div style={{height : 1000}}></div> */}
    </div>
  );
};

export default Home;
