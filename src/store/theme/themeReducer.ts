import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../index';

export interface ThemeState {
  current: string;
}

const initialState: ThemeState = {
  current: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state: { current: string; }, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },

});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.current;

export default themeSlice.reducer;
