import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "..";

export interface UserState {
  token: string | null;
  userId: string | null;
  username: string | null;
  email: string | null;
  avatar: string;
}

const initialState: UserState = {
  token: "",
  userId: "",
  username: "",
  email: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state: { token: string | null }, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state: {userId: string | null }, action: PayloadAction<string | null>) => {
        state.userId = action.payload;
    },
    setUsername: (state: { username: string | null }, action: PayloadAction<string | null>) => {
        state.username = action.payload;
    },
    setEmail: (state: { email: string | null }, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setAvatar: (state: { avatar: string}, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const { setToken, setUserId, setUsername, setEmail, setAvatar } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectAvatar = (state: RootState) => state.user.avatar;

export default userSlice.reducer;
