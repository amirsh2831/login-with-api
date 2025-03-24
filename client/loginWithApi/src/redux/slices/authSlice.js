import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_START: (state) => {
      state.currentUser = null;
      state.isError = false;
      state.isLoading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    LOGIN_FAILURE: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = true;
    },
    LOG_OUT: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { LOG_OUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } =
  authSlice.actions;
export default authSlice.reducer;
