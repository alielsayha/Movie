import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import useFetch from "./hooks/useFetch";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  const { data } = useFetch("/configuration");
 

  useEffect(() => {
    const url = {
      backdrop: `${data && data.images.base_url}original`,
      poster: `${data && data.images.base_url}original`,
      profile: `${data && data.images.base_url}original`,
    };
    dispatch(getApiConfiguration(url));
    genresCall()
  }, [data ]);

  const genresCall = async()=>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.map(item => promises.push(fetchDataFromApi(`/genre/${item}/list`)))

    const data = await Promise.all(promises)
    data.map(({genres})=> genres.map(item => allGenres[item.id] = item))
    dispatch(getGenres(allGenres))
  }




  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
