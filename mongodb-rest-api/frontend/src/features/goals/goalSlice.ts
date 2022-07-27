import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import goalService from "./goalService";

export type Goal = {
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type GoalState = {
  goals: Goal[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

const initialState: GoalState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

type ThunkConfig = {
  state: RootState;
  rejectValue: any;
};

export const getGoals = createAsyncThunk<any, undefined, ThunkConfig>(
  "goals/getGoals",
  async (_, thunkApi) => {
    try {
      const userToken = thunkApi.getState().auth.user.token;
      return await goalService.getGoals(userToken);
    } catch (err: any) {
      const message: string =
        err.response?.data?.message || err.message || err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createGoal = createAsyncThunk<Goal, Partial<Goal>, ThunkConfig>(
  "goals/createGoal",
  async (goal, thunkApi) => {
    try {
      const userToken = thunkApi.getState().auth.user.token;
      return await goalService.createGoal(userToken, goal);
    } catch (err: any) {
      const message: string =
        err.response?.data?.message || err.message || err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk<Goal, Goal, ThunkConfig>(
  "goals/deleteGoal",
  async (goal, thunkApi) => {
    try {
      const userToken = thunkApi.getState().auth.user.token;
      return await goalService.deleteGoal(userToken, goal);
    } catch (err: any) {
      const message: string =
        err.response?.data?.message || err.message || err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.goals = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload._id
        );
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
