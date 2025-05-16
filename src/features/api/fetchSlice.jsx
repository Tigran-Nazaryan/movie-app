import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_API } from "./constant";

const initialState = {
  movies: [],
  loading: "idle",
};

export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async (searchTerm) => {
    try {
      const response = await fetch(`${REACT_APP_API}&s=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      return data.Search || [];
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

const fetchSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export default fetchSlice.reducer;
