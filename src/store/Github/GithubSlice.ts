import axios from "axios";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchGithubRepositories = createAsyncThunk<GithubRepositoryData>(
  "github/fetchGithubRepositories",
  async (_, { rejectWithValue }) => {
    try {
      const API_URL: string = process.env.REACT_APP_GITHUB_API_URL!;
      
      const { data } = (await axios.get(`${API_URL}/repositories`)) as GithubRepositoriesResponse;

      return data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

const initialState: GithubState = {
  loading: true,
  data: [],
  repositories: [],
  list: [],
  numberOfPage: 0,
  perPage: 10,
  page: 1,
  searchKeyword: "",
  error: null,
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    updatePageNumber: (state, action: PayloadAction<number>) => {
      const page = action.payload;

      state.page = page;
      state.list = [...state.repositories].slice(
        (page - 1) * state.perPage,
        (page - 1) * state.perPage + state.perPage
      );

      return state;
    },
    searchByKeyword: (state, action: PayloadAction<string>) => {
      const keyword = action.payload;
      let filtered = [...state.data]

      if (!!keyword) {
        filtered = filtered.filter(repo => repo.name.includes(keyword));
      }
      
      state.repositories = filtered;
      state.list = [...filtered].slice(0, state.perPage);
      state.numberOfPage = Math.ceil(filtered.length / state.perPage);
      state.page = 1

      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGithubRepositories.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.repositories = [];
      state.error = null;
    });
    builder.addCase(fetchGithubRepositories.fulfilled, (state, action) => {
      const repositories = action.payload;

      state.loading = false;
      state.data = repositories;
      state.repositories = repositories;
      state.list = [...repositories].slice(0, state.perPage);
      state.numberOfPage = Math.ceil(repositories.length / state.perPage);
      state.error = null;
    });
    builder.addCase(fetchGithubRepositories.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.repositories = [];
      state.error = action.payload;
    });
  },
});

export const { updatePageNumber, searchByKeyword } = githubSlice.actions;

export default githubSlice.reducer;
