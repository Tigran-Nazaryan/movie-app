import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/api/fetchSlice";
import { Card, Col, Image, Input, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { MOVIE_PATH } from "../routes/paths";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { REACT_APP_API } from "../features/api/constant";
import useDebounce from "../hooks/useDebounce";
import storageService from "../services/storageService";
import { FAVORITE_KEY } from "../services/constants";

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading } = useSelector((state) => state.movies);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 1000);
  const [favorites, setFavorites] = useState(
    storageService.getItem(FAVORITE_KEY) ?? []
  );
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);
    let updFav;
    if (isFavorite) {
      updFav = favorites.filter((f) => f.imdbID !== movie.imdbID);
    } else {
      updFav = [...favorites, movie];
    }
    setFavorites(updFav);
    storageService.setItem(FAVORITE_KEY, updFav);
  };
  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };
  useEffect(() => {
    if (debounceSearch) {
      dispatch(fetchMovies(debounceSearch));
    } else {
      dispatch(fetchMovies("harry"));
    }
  }, [dispatch, debounceSearch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (loading === "failed") return <p>Failed to load movies.</p>;

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Input
        style={{ width: 200, marginTop: 25 }}
        placeholder="Search movies..."
        value={searchValue}
        onChange={handleChange}
      />
      <h2>Movies List</h2>

      <Row
        style={{
          marginBottom: 30,
          gap: 40,
        }}
        gutter={[50, 50]}
        justify="center"
      >
        {movies.map((movie) => {
          const isFav = isFavorite(movie.imdbID);
          return (
            <Col
              key={movie.imdbID}
              xs={{ span: 8 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                onClick={() => navigate(`${MOVIE_PATH}/${movie.imdbID}`)}
                style={{ width: 300 }}
                cover={
                  <Image
                    alt={movie.Title}
                    src={movie.Poster}
                    fallback="https://via.placeholder.com/240x360?text=No+Image"
                    style={{ height: "360px", objectFit: "cover" }}
                  />
                }
                actions={[
                  isFav ? (
                    <HeartFilled
                      style={{ color: "red" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie);
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie);
                      }}
                    />
                  ),
                ]}
              >
                <Meta title={movie.Title} description={`Year: ${movie.Year}`} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};

export default Movie;
