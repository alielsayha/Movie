import React, { useState } from "react";
import "./detailsBanner.scss";
import LazyLoadImg from "../../../components/lazyLoadImg/Img";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const genres = data?.genres.map((g) => g.id);
  const director = crew?.filter((item) => item.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const toHoursAndMinutes = (min) => {
    const hour = Math.floor(min / 60);
    const Minutes = min % 60;
    return `${hour}h ${Minutes > 0 ? `${Minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <React.Fragment>
              <div className="backdrop-img">
                <LazyLoadImg src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <LazyLoadImg
                        className="posterImg"
                        src={`${url?.poster}${data?.poster_path}`}
                      />
                    ) : (
                      <LazyLoadImg
                        className="posterImg"
                        src={`${PosterFallback}`}
                      />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.title || data?.name} ( ${dayjs(
                        data.release_date
                      ).format("YYYY")} )`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoKey(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span>
                          {director.map((item, i) => {
                            return (
                              <span className="text" key={i}>
                                {item.name}
                                {director.length - 1 !== i && " ,"}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">writer : </span>
                        <span>
                          {writer.map((item, i) => {
                            return (
                              <span className="text" key={i}>
                                {item.name}
                                {writer?.length - 1 !== i && " ,"}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Created by : </span>
                        <span>
                          {data?.created_by.map((item, i) => {
                            return (
                              <span className="text" key={i}>
                                {item.name}
                                {data?.created_by?.length - 1 !== i && " ,"}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoKey={videoKey}
                  setVideoKey={setVideoKey}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
