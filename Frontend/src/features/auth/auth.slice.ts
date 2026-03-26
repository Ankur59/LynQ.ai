import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    role: null,
    isAuthenticated: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setIsAutheticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setloading, setError, setIsAutheticated, setRole } =
  authSlice.actions;
export default authSlice.reducer;
