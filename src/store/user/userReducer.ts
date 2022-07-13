import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "..";

export interface UserState {
  token: String | null;
  userId: String | null;
  username: String | null;
}

const initialState: UserState = {
  token: "",
  userId: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state: { token: String | null }, action: PayloadAction<String | null>) => {
      state.token = action.payload;
    },
    setUserId: (state: {userId: String | null }, action: PayloadAction<String | null>) => {
        state.userId = action.payload;
    },
    setUsername: (state: { username: String | null }, action: PayloadAction<String | null>) => {
        state.username = action.payload;
    }
  },
});

export const { setToken, setUserId, setUsername } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
