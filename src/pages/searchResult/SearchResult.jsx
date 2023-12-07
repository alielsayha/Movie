import React, { useEffect, useState } from "react";
import "./searchResult.scss";
import { Link, useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { fetchDataFromApi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCart from "../../components/movie cart/MovieCart";
import Spinner from "../../components/spiner/Spiner";
import LazyLoadImg from "../../components/lazyLoadImg/Img";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setLoading(false);
        setPageNum((prev) => prev + 1);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div>
      {loading && <Spinner />}

      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="search">
                <div className="pageTitle">
                  {`Search ${
                    data?.total_results > 0 ? "Results" : "Result"
                  } ${query}`}
                </div>

                <InfiniteScroll
                  className="content"
                  dataLength={data?.results.length}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  <div className="searchResults">
                    {data?.results.map((item, i) => {
                      if (item.media_type === "person") return;
                      return <MovieCart item={item} />;
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            </>
          ) : (
            <div className="resultNotFound">
              <img src={noResults} />
              <span>
                Sorry, Results ' <b>{query}</b> ' not found!
              </span>
              <Link to="/" className="goHome">
                {" "}
                Go To Home{" "}
              </Link>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
