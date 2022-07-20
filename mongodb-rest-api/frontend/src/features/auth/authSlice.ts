import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginUserData, UserData } from "./types";

// Get user from local storage
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export type Auth = typeof initialState;

// Register User
export const register = createAsyncThunk<any, UserData, { rejectValue: any }>(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (err: any) {
      const message: string =
        err.response?.data?.message || err.message || err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login User
export const login = createAsyncThunk<any, LoginUserData, { rejectValue: any }>(
  "auth/login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (err: any) {
      const message: string =
        err.response?.data?.message || err.message || err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
