import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "../features/api/fetchSlice";
import authReducer from "../features/auth/authSlice";
import movieDetailsReducer from "../features/api/fetchDetailsSlice";
import PopularMoviesReducer from "../features/api/fetchPopularMovies";

export const store = configureStore({
  reducer: {
    movies: fetchReducer,
    auth: authReducer,
    movieDetails: movieDetailsReducer,
    fetchTopMOvies: PopularMoviesReducer,
  },
});
