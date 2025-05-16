import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  clearMovieDetails,
} from "../features/api/fetchDetailsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Image, Typography, Spin, Button } from "antd";
import { MOVIE_PATH } from "../routes/paths";

const { Title, Text } = Typography;

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie, loading, error } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, id]);

  if (loading === "loading") return <Spin size="large" />;
  if (loading === "failed")
    return <p>{error || "Failed to load movie details."}</p>;
  if (!movie || Object.keys(movie).length === 0) {
    return <p>Loading movie details...</p>;
  }

  return (
    <Card
      style={{ width: "40%", margin: "20px auto" }}
      cover={
        <Image
          alt={movie.Title}
          src={movie.Poster}
          fallback="https://via.placeholder.com/240x360?text=No+Image"
          style={{ height: "400px", objectFit: "contain" }}
        />
      }
    >
      <Title>{movie.Title}</Title>
      <Text strong>Year: </Text> {movie.Year} <br />
      <Text strong>Genre: </Text> {movie.Genre} <br />
      <Text strong>Director: </Text> {movie.Director} <br />
      <Text strong>Plot: </Text> {movie.Plot} <br />
      <Text strong>Actors: </Text> {movie.Actors} <br />
      <Text strong>Runtime: </Text> {movie.Runtime} <br />
      <Text strong>IMDB Rating: </Text> {movie.imdbRating}
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={() => navigate(MOVIE_PATH)}
      >
        Back to Movies
      </Button>
    </Card>
  );
};

export default MovieDetails;
