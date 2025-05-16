import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_API } from "./constant";

const initialState = {
  movies: [],
  loading: "idle",
  error: null,
};

export const fetchTopMovies = createAsyncThunk("movies/fetch", async () => {
  const currentYear = new Date().getFullYear();
  try {
    const response = await fetch(`${REACT_APP_API}&s=the last of us`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    throw new Error("Failed to fetch movies.");
  }
});

const fetchTopMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopMovies.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default fetchTopMoviesSlice.reducer;
