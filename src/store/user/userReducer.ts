import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "..";

export interface UserState {
  token: String | null;
  userId: String | null;
}

const initialState: UserState = {
  token: "",
  userId: "",
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
    }
  },
});

export const { setToken, setUserId } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
