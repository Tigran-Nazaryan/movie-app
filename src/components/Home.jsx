import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MOVIE_PATH } from "../routes/paths";
import { Row, Col, Card, Typography, Space, Spin, Image, Divider } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import storageService from "../services/storageService";
import { FAVORITE_KEY } from "../services/constants";
import { fetchTopMovies } from "../features/api/fetchPopularMovies";

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, loading } = useSelector((state) => state.movies);

  const [favorites, setFavorites] = useState(
    storageService.getItem(FAVORITE_KEY) ?? []
  );

  useEffect(() => {
    dispatch(fetchTopMovies());
  }, [dispatch]);

  const isFavorite = (imdbID) => favorites.some((fav) => fav.imdbID === imdbID);

  const toggleFavorite = (movie) => {
    const isFav = isFavorite(movie.imdbID);
    let updatedFavorites;

    if (isFav) {
      updatedFavorites = favorites.filter((f) => f.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    storageService.setItem(FAVORITE_KEY, updatedFavorites);
  };

  if (loading === "loading") return <Spin size="large" />;
  if (loading === "failed") return <Text>Failed to load movies.</Text>;

  return (
    <>
      <div>
        <Image
          src="https://via.placeholder.com/1600x400?text=Movie+Banner"
          alt="Movie Banner"
          preview={false}
        />
        <div>
          <Title level={1} className="text-white">
            Welcome to MovieBase
          </Title>
        </div>
      </div>

      <Space direction="vertical">
        <Paragraph style={{ color: "white" }}>
          Discover the most popular movies of the year, stay updated with the
          latest releases, and explore your favorite genres. MovieBase brings
          you the best of cinema, all in one place.
        </Paragraph>
      </Space>

      <Divider />

      <Space direction="vertical">
        <Title level={2}>Popular Films of {new Date().getFullYear()}</Title>

        <Row
          gutter={[16, 16]}
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", gap: "15px" }}
        >
          {movies.map((movie) => {
            const isFav = isFavorite(movie.imdbID);
            const poster =
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster";

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={movie.imdbID}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={movie.Title}
                      src={poster}
                      height={240}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  }
                  onClick={() => navigate(`${MOVIE_PATH}/${movie.imdbID}`)}
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
                  <Card.Meta
                    title={<Text>{movie.Title ?? "Title Unavailable"}</Text>}
                    description={
                      <Space direction="vertical">
                        <Text type="secondary">
                          Year: {movie.Year ?? "Year Unavailable"}
                        </Text>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Space>
    </>
  );
};

export default HomePage;
