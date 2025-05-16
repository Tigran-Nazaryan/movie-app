import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_API, REACT_APP_FOR_DETAILS } from "./constant";

const initialState = {
  movie: {},
  loading: "idle",
  error: null,
};

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetch",
  async (id) => {
    try {
      const response = await fetch(`${REACT_APP_FOR_DETAILS}${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw new Error(error.message || "Failed to fetch movie details.");
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    clearMovieDetails: (state) => {
      state.movie = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
