import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './app/appReducer';
import themeReducer from './theme/themeReducer';
import userReducer from './user/userReducer';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    app: appReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
